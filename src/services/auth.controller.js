const user = require("../models/User");
const tkn = require("jsonwebtoken");
const config = require("../config");
const Role = require("../models/Rol");

const passport = require("passport");

const signup = async (req, res) => {
    const { username, email, password, roles, image, token, name, lastname, genero, nacimiento, documento, tel, tipodocumento } = req.body;
    const usernameMin = username.toLowerCase();
    const emailMin = email.toLowerCase()
    const newUser = new user({
        username: usernameMin,
        name,
        lastname,
        genero,
        nacimiento,
        email: emailMin,
        password: await user.encryptPassword(password),
        token,
        image,
        documento,
        celular: tel,
        tipodocumento
    })
    if (!token) { newUser.token = tkn.sign({ id: newUser._id }, config.SECRET, { expiresIn: 43200 }) }
    if (!image) { newUser.image = config.ImageProfileUndefined }
    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({ name: "user" })
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save();

    req.flash('message', 'Usuario creado con exito')
    req.flash('email', email)
    return res.redirect('/signin');
}
const updateSignup = async (req, res) => {
    const { id, username, name, lastname, genero, nacimiento, documento, celular, tipodocumento } = req.body;
    const usernameMin = username.toLowerCase();
    const updateUser = {
        username: usernameMin,
        name,
        lastname,
        genero,
        nacimiento,
        documento,
        celular,
        tipodocumento,
        firststart: false
    }
    await user.findByIdAndUpdate(id, updateUser, { new: true }).populate("roles");

    req.flash('message', 'Usuario modificado con exito')
    return res.redirect('/dashboard');
}

const signin = passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/signin",
    failureFlash: true,
});

const signinGoogle = passport.authenticate('google', { scope: ['profile', 'email'] })

const signinGoogleCallBack = passport.authenticate('google', { successRedirect: "/dashboard", failureRedirect: '/signin' });


const logout = async (req, res) => {
    req.logout();
    res.redirect('/')
}


const renderSignUp = async (req, res) => {
    const pagename = { "name": "signup", "title": "Register" };
    res.render('auth/signup', {
        layout: 'dashboard',
        config,
        pagename
    })
}

const renderSignin = async (req, res) => {
    const pagename = { "name": "signin", "title": "Log in" };
    res.render('auth/signin', {
        layout: 'dashboard',
        config,
        pagename
    })
}

module.exports = { signup, updateSignup, signin, renderSignUp, renderSignin, signinGoogle, signinGoogleCallBack, logout };