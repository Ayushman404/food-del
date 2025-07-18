import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {type:String, required: true},
    items: {type: Array, required: true},
    amount: {type: Number, required: true},
    address: {type: String, required: true},
    status: {type: String, default: "Processing"},
    date: {type: Date, default: Date.now()},
    payment: {type: Boolean, defualt: false}
})

const orderModel = mongoose.models.orders || mongoose.model('orders', orderSchema);
export default orderModel;