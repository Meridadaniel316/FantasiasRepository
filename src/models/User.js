const {Schema, model} = require('mongoose')
const script = require('bcryptjs')

const userSchema = new Schema ({
    username: {
        type: String,
        required: false,
        unique: false,
    },
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: false,
    },
    genero: {
        type: String,
        required: true,
    },
    nacimiento: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        unique: false,
    },
    parentesco: {
        type: String,
        unique: false,
    },
    image: {
        type: String,
        required: true,
    },
    roles: [{
        ref: "role",
        type: Schema.Types.ObjectId
    }],
    firststart: {
        type: Boolean,
        default: false,
        required: false,
    },
    tipodocumento: {
        type: String,
        required: false,
    },
    documento: {
        type: String,
        required: false,
        unique: false,
    },
    celular: {
        type: String,
        required: false,
    },
    rh: {
        type: String,
        unique: false,
    },
    update: {
        type: Boolean,
        default: false,
        required: true,
    },
    direction: {
        type: String,
        unique: false
    },
    occupation: {
        type: String,
        unique: false
    },
    thePersonStaysWithTheSon: {
        type: Boolean,
        unique: false
    }
},{
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async (password) => {
    const salt = await script.genSalt(10)
    return await script.hash(password, salt)
}
userSchema.statics.comparePassword = async (password, received) => {
    return await script.compare(password, received)
}

module.exports = model('user', userSchema);