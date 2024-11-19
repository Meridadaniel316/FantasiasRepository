const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    name: String,
    category: String,
    description: String,
    price: Number,
    image: String,
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('product', productSchema);