import productModel from "../models/productModels.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'; // ✅ Added to delete local file
import upload from "../middleware/multer.js"; // (unchanged import)

const addProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;

        const image = req.file;

        if (!image) {
            return res.json({ success: false, message: "Please upload an image" });
        }

        let result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });

        fs.unlinkSync(image.path); // ✅ Delete file after upload to Cloudinary

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            image: result.secure_url,
            date: Date.now()
        };
        console.log(productData);

        const product = new productModel(productData);
        await product.save();
        res.json({ success: true, message: "Product added successfully" });

    } catch (error) {
  console.log("ADD PRODUCT ERROR:", error); // ✅ FULL raw error
  res.status(500).json({
    success: false,
    message: error.message || "Could not add product"
  })
    }
  }

const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const removeProduct = async (req, res) => {
    try {
        const id = req.body._id || req.body.id;

        if (!id) {
            return res.json({ success: false, message: "No product ID provided" });
        }

        const result = await productModel.findByIdAndDelete(id);

        if (!result) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    addProduct,
    listProduct,
    removeProduct,
    singleProduct
};
