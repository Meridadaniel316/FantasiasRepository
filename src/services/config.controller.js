const Category = require("../models/Category")
const Product = require("../models/Product")
const Config = require("../models/Config")
const Role = require('../models/Rol');
const config = require('../config');

const rendePageConfig = async (req, res) =>{
    const pagename = {"name": "config", "title": "Configuración"};
    const configtext = await Config.find()
    const rolUser = await Role.find({_id: {$in: req.user.roles}});
    res.render('dashboard/config', {layout: 'dashboard',
                          config,
                          rolUser,
                          configtext,
                          pagename })

                        }
                        
const updateConfigCommentsHome = async (req, res) =>{

  const { 
    sliderOne,
    sliderTwo,
    littleStory,
    sentence,
    sentenceAuthor,
    contactInformation, } = req.body

  if(!sentence){ req.body.sentenceAuthor = ''}

  const config = await Config.find()
  if(config.length === 0){
    const newConfig = new Config({
    titleGeneral: 'INICIO',
    sliderOne: sliderOne,
    sliderTwo: sliderTwo,
    littleStory: littleStory,
    sentence: sentence,
    sentenceAuthor: sentenceAuthor,
    contactInformation: contactInformation,
    promotion: false,
  });

  const configSaved = await newConfig.save()
  
  }else{
    await Config.findByIdAndUpdate(req.params.id, req.body, { new: true })
  }

  req.flash('message', 'Configuración actualizada con exito')
  return res.redirect('/admin/config');
}
const updateConfigPromotion = async (req, res) =>{

  const { 
    promotion,
    promotiondescription,
    discountpromotion,
    promotionimage, } = req.body

  const config = await Config.find()
  if(config.length === 0){
    const newConfig = new Config({
    promotion: false,
  });
  
  await newConfig.save()
  
  }else{
    config.forEach( async (element) => {
      await Config.findByIdAndUpdate(element._id, req.body, { new: true })
    });
  }

  req.flash('message', 'Configuración actualizada con exito')
  return res.redirect('/admin/config');
}
const updateConfigPromotionActive = async (req, res) =>{
  const config = await Config.find()
  if(config.length === 0){
    const newConfig = new Config({
    promotion: false,
  });
  
  await newConfig.save()
  
  }else{
    config.forEach( async (element) => {
      await Config.findByIdAndUpdate(element._id, {promotion: true}, { new: true })
    });
  }

  req.flash('message', 'Se han activado las promociones')
  return res.redirect('/admin/config');
}
const updateConfigPromotionDesactive = async (req, res) =>{
  const config = await Config.find()
  if(config.length === 0){
    const newConfig = new Config({
    promotion: false,
  });
  
  await newConfig.save()
  
  }else{
    config.forEach( async (element) => {
      await Config.findByIdAndUpdate(element._id, {promotion: false}, { new: true })
    });
  }

  req.flash('message', 'Se han desactivado las promociones')
  return res.redirect('/admin/config');
}

module.exports = { rendePageConfig, updateConfigCommentsHome, updateConfigPromotion, updateConfigPromotionActive, updateConfigPromotionDesactive };