import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct } from '../controllers/productControllers.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// ✅ ensure image is uploaded, auth is checked, then product is added
productRouter.post('/add', upload.single("image"), adminAuth, addProduct);

productRouter.get('/list', listProduct);

// ✅ protected route for removal
productRouter.post('/remove', adminAuth, removeProduct);

// ✅ changed GET to POST for consistency if body contains productId (else, GET is fine)
productRouter.post('/single', singleProduct);

export default productRouter;
