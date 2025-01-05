import Transaction from "../models/transaction.model.js";
import { errorHandler } from "../utils/error.js";


export const createTransaction = async (req, res, next) => {
    try {
        const { userId, sellerId, totalAmount } = req.body;
        if (!userId || !sellerId || !totalAmount) {
            return next(errorHandler(403, 'All fields are required'));
        }
        const newTransaction = new Transaction({
            userId,
            sellerId,
            totalAmount,
        });
        await newTransaction.save();
        res.status(200).json(newTransaction);
    } catch (error) {
        next(error);
    }
};


export const getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find({ userId : req.params.userId });
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
};



export const updateTransactions = async (req, res, next) => {
    try {
        const { totalAmount, balanceAmount, paidAmount, date } = req.body;

        // Find the transaction
        const transaction = await Transaction.findById(req.params.transactionId);

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        // Check if the user is authorized to update the transaction
        if (
            req.user.id !== transaction.userId && // User should be the one who owns the transaction
            req.user.role !== "admin" // Allow admins to update transactions
        ) {
            return next(errorHandler(403, "You are not allowed to edit this transaction"));
        }

        // Update the transaction fields
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.transactionId,
            {
                totalAmount,
                balanceAmount,
                paidAmount,
                date,
            },
            { new: true }
        );

        res.status(200).json(updatedTransaction);
    } catch (error) {
        next(error);
    }
};



  