import Order from "../models/order.model.js";
import { errorHandler } from "../utils/error.js";

export const createOrder = async (req, res, next) => {
  try {
    const { userId, sellerId, productId, quantity, address, date } = req.body;
    if (!userId || !sellerId || !productId || !quantity || !address || !date) {
      return next(errorHandler(400, 'All fields are required'));
    }
    const newOrder = new Order({
      userId,
      sellerId,
      productId,
      quantity,
      address,
      date,
    });
    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find( { userId : req.params.userId } );
        const totalOrders = await Order.countDocuments();

        res.status(200).json({
            orders,
            totalOrders,
        });
    } catch (error) {
        next(error);
    }
    };