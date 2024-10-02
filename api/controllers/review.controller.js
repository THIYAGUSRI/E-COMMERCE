import Review from "../models/review.model.js";
import { errorHandler } from "../utils/error.js";

export const createReview = async (req, res, next) => {
    try {
        const { content, productId, userId } = req.body;
    
        if (userId !== req.user.id) {
          return next(
            errorHandler(403, 'You are not allowed to create this review')
          );
        }
        const newReview = new Review({
          content,
          productId,
          userId,
        });
        await newReview.save();
    
        res.status(200).json(newReview);
      } catch (error) {
        next(error);
      }
    };