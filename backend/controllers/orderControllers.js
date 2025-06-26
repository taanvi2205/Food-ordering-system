import orderModel from "../models/orderModels.js"
import productModel from "../models/productModels.js"
import userModel from '../models/userModel.js'


const placeOrder = async (req, res) => {
  try {
    const { userId, amount, address } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const items = await Promise.all(
      Object.entries(userData.cartData).map(async ([itemId, quantity]) => {
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

const placeOrderGpay = async (req, res) => {

}

const allOrder = async (req, res) => {
    try {
        const order = await orderModel.find({})
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

export { placeOrder, placeOrderGpay, allOrder, userOrder, updateStatus }