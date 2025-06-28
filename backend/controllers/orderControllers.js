import orderModel from "../models/orderModels.js"
import productModel from "../models/productModels.js"
import userModel from '../models/userModel.js'
import Order from '../models/orderModels.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const currency = '₹'
const deliveryCharge = 120
const placeOrder = async (req, res) => {
  try {
    const { userId, amount, address } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const items = await Promise.all(
      Object.entries(userData.cartData)
        .filter(([itemId]) => itemId.match(/^[a-f\d]{24}$/i)) 
        .map(async ([itemId, quantity]) => {
          const product = await productModel.findById(itemId);
          if (!product) {
            throw new Error("No product found for itemId " + itemId);
          }

          return {
            itemId,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity
          };
        })
    );


    if (items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      status: "Placed"
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Order could not be placed" });
  }
};

const verifyStripe = async (req,res) => {
    const {orderId, success, userId} = req.body;

    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success:true})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: false})
        }
    } catch (error) {
      console.log(error)
      res.json({success: false, message: error.message})
    }
}

const placeOrderGpay = async (req, res) => {
  try {
    const { userId, amount, address } = req.body;
    const { origin } = req.headers;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const items = await Promise.all(
      Object.entries(userData.cartData)
        .filter(([itemId]) => itemId.match(/^[a-f\d]{24}$/i)) // ensure valid ObjectId
        .map(async ([itemId, quantity]) => {
          const product = await productModel.findById(itemId);
          if (!product) throw new Error("Invalid product in cart");

          return {
            itemId,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity
          };
        })
    );

    if (items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "GPay",
      payment: false,
      date: Date.now(),
      status: "Placed"
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // ✅ Define and fill line_items
    const line_items = items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 // convert ₹ to paise
      },
      quantity: item.quantity
    }));

    // ✅ Add delivery charge as separate item
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charge" },
        unit_amount: deliveryCharge * 100
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
      payment_method_types: ["card"] // This enables GPay on supported devices
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



const allOrder = async (req, res) => {
  try {
    const order = await orderModel.find({})
    const orders = await Order.find();
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Could not fetch order" })
  }
}

const userOrder = async (req, res) => {
  try {
    const { userId } = req.body
    const orders = await orderModel.find({ userId }).sort({ date: -1 })
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Could not fetch order" })
  }
}

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: "Order Status updated" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

export { placeOrder,verifyStripe, placeOrderGpay, allOrder, userOrder, updateStatus }