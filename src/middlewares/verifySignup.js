const rol = require('../models/Rol')
const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const gmail = await User.findOne({ email: req.body.email });
    if (gmail) {
      req.flash('message', 'El correo electronico ya existe.')
      req.flash('username', username)
      req.flash('email', email)
      return res.redirect('/signup');
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const checkDuplicateUsernameOrDocumento = async (req, res, next) => {
  try {
    
    const id = req.body.id;

    const username = req.body.username.toLowerCase()

    const user = await User.findOne({ username: username });
    if (user) {
      if (user._id != id) {
        req.flash('message', 'El usuario que intenta registrar ya existe.')
        req.flash('username', req.body.username)
        req.flash('documento', req.body.documento)
        return res.redirect('/dashboard');
      }
    }
    const docume = await User.findOne({ documento: req.body.documento });
    if (docume) {
      if (docume._id != id) {
        req.flash('message', 'El documento ya existe.')
        req.flash('username', req.body.username)
        req.flash('documento', req.body.documento)
        return res.redirect('/dashboard');
      }
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};



const checkRolesExisted = async (req, res, next) => {
  const foundRoles = await rol.find({ name: { $in: req.body.roles } })
  const roleValidator = foundRoles.map(role => role.name)

  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!roleValidator.includes(req.body.roles[i])) {

        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }

  next();
};


module.exports = { checkRolesExisted, checkDuplicateUsernameOrEmail, checkDuplicateUsernameOrDocumento }