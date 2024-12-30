import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    sellerId: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    }, 
    totalamount: {
        type: Number,
       default: 0,
    },
    balanceamount: {
        type: Number,
        default: 0,
    },
    address: {
        type: Object,
        required: true,
    },
    deliverystatus: {
        type: String,
        default: '---',
    },
    paidstatus: {
        type: String,
        default: '-----',
    },
    date: {
        type: String,
        required: true,
    }
}, {timestamps: true} );

const Order = mongoose.model('Order', orderSchema);

export default Order;