const User = require("../../../models/User");
const Role = require("../../../models/Rol");
const config = require("../../../config");
const tkn = require("jsonwebtoken");

module.exports = async (
  username = null,
  name,
  lastname,
  direction,
  occupation,
  genero,
  tel,
  nacimiento,
  tipodocumento,
  documento,
  email,
  thePersonStaysWithTheSon = null,
  image = null,
  token = null,
  roles = null,
) => {
  let usernameMin = null
  if(username){
    usernameMin = username.toLowerCase();
  }
  const emailMin = email.toLowerCase();
  const newUser = new User({
    username: usernameMin,
    name,
    lastname,
    direction,
    occupation,
    genero,
    nacimiento,
    email: emailMin,
    thePersonStaysWithTheSon,
    password: await User.encryptPassword(documento),
    documento,
    celular: tel,
    tipodocumento,
  });
  if (!token) {
    newUser.token = tkn.sign({ id: newUser._id }, config.SECRET, {
      expiresIn: 43200,
    });
  }
  if (!image) {
    newUser.image = config.ImageProfileUndefined;
  }
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }
  const savedUser = await newUser.save();
  return savedUser;
};
