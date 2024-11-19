const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customerId: [{
        ref: "user",
        type: Schema.Types.ObjectId
    }],
    items: { type: String },
    phone: { type: String},
    address: { type: String},
    paymentType: { type: String, default: 'COD'},
    paymentStatus: { type: Boolean, default: false },
    status: { type: String, default: 'order_placed'},
}, { timestamps: true,versionKey: false })

module.exports = mongoose.model('order', orderSchema)