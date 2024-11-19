const {Schema, model} = require("mongoose")

const rolSchema = new Schema({
    name: String,
    permissions: [{
        name: String,
        permission: String,
    }],
},{
    versionKey: false
})

module.exports = model('role', rolSchema);