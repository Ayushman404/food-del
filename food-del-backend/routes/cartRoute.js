import { addToCart, removeFromCart, getCartItems } from "../controllers/cartController.js";
import express from 'express';
import { authMiddleware } from "../middlewares/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.post('/add',authMiddleware, addToCart);
cartRouter.put('/remove',authMiddleware, removeFromCart);
cartRouter.get('/',authMiddleware, getCartItems);

export default cartRouter;