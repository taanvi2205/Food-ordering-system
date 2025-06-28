import express from 'express'
import { placeOrder, placeOrderGpay, allOrder, userOrder,updateStatus, verifyStripe } from '../controllers/orderControllers.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()


orderRouter.post('/list', adminAuth, allOrder)
orderRouter.post('/status', adminAuth, updateStatus)

orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderGpay)
orderRouter.post('/userorders', authUser, userOrder)

orderRouter.post('verifyStripe', authUser, verifyStripe)

export default orderRouter