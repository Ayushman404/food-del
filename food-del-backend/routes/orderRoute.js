import express from 'express';
import { placeOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place-order', placeOrder);


export default orderRouter;