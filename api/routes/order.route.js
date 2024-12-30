import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createOrder, getOrders } from '../controllers/order.controller.js';


const router = express.Router();

router.post('/create', verifyToken, createOrder);
router.get('/getOrders/:userId', getOrders);

export default router;
