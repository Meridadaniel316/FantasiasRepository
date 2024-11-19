const {Schema, model} = require("mongoose")

const categorySchema = new Schema({
    name: String,
    icon: String,
    description: String
},{
    versionKey: false
})

module.exports = model('category', categorySchema);