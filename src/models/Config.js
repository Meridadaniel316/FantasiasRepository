const {Schema, model} = require("mongoose")

const configSchema = new Schema({
    titleGeneral: String,
    sliderOne: String,
    sliderTwo: String,
    littleStory: String,
    sentence: String,
    sentenceAuthor: String,
    contactInformation: String,
    promotion: {
        type: Boolean,
        default: false,
    },
    discountpromotion: String,
    promotiondescription: String,
    promotionimage: String,
},{
    versionKey: false
})

module.exports = model('config', configSchema);