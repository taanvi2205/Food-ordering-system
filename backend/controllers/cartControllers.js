import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        const cartData = { ...userData.cartData };

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Product added to cart", cartData });

    } catch (error) {
        console.log("AddToCart Error:", error);
        res.json({ success: false, message: error.message });
    }
};



const updateCart = async (req, res) => {
    try {
        const { userId } = req.user || req.body; 
        const { itemId, quantity } = req.body;

        if (!itemId || typeof quantity !== 'number') {
            return res.json({ success: false, message: 'Invalid itemId or quantity' });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        const cartData = { ...userData.cartData };

        if (quantity <= 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart updated", cartData });

    } catch (error) {
        console.log("UpdateCart Error:", error);
        res.json({ success: false, message: error.message });
    }
};





const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, cartData: userData.cartData || {} });

    } catch (error) {
        console.log("GetUserCart Error:", error);
        res.json({ success: false, message: error.message });
    }
};


export { addToCart, updateCart, getUserCart };
