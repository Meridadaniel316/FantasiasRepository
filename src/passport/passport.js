const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User')
const Role = require('../models/Rol')
const tkn = require("jsonwebtoken");
const config = require("../config");
const { animales, colores } = require('../libs/jsons')
const { uniqueNamesGenerator, adjectives } = require('unique-names-generator');

const url = "http://localhost:"+process.env.PORT
// const url = "https://www.jardinfantasias.com"

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    email = email.toLowerCase()
    const users = await User.findOne({ email }).populate("roles");

    if (!users) {
        return done(null, false, { message: 'Usuario no registrado' })
    } else {
        const match = await User.comparePassword(password, users.password)
        const token = tkn.sign({ id: users._id }, config.SECRET, { expiresIn: 43200 })
        if (match) {
            const user = await User.findByIdAndUpdate(users._id, { token: token }, { new: true }).populate("roles");
            return done(null, user);
        } else {
            return done(null, false, { message: 'Contraseña incorrecta' })
        }
    }
}));

passport.use(new GoogleStrategy({
    clientID: "182109784955-sv0lou9b6o2ahk8q3ml9ndung9ki5grr.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: url+"/signin/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        const email = profile._json.email.toLowerCase()

        const users = await User.findOne({ email }).populate("roles");

        if (!users) {

            const names = [
                profile.name.givenName,
                profile.name.familyName,
            ]

            const shortUserName = uniqueNamesGenerator({
                dictionaries: [names, colores, animales], // colors can be omitted here as not used
                length: 2,
                separator: '',
            });
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var string_length = 12;
            var randomPassword = '';
            for (var i = 0; i < string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomPassword += chars.substring(rnum, rnum + 1);
            }

            const findusername = await User.findOne({ shortUserName })
            const role = await Role.findOne({ name: "user" })
            const token = ''

            if (!findusername) {

                const newUser = new User({
                    username: shortUserName.toLowerCase(),
                    roles: [role._id],
                    name: profile.name.givenName,
                    lastname: profile.name.familyName,
                    genero: 'Desconocido',
                    nacimiento: null,
                    celular: null,
                    documento: null,
                    tipodocumento: null,
                    parentesco: null,
                    image: profile.photos[0].value,
                    email: profile.emails[0].value,
                    password: await User.encryptPassword(randomPassword),
                    firststart: true,
                    token,
                })
                console.log(newUser)
                if (!token) { newUser.token = tkn.sign({ id: newUser._id }, config.SECRET, { expiresIn: 43200 }) }
                const savedUser = await newUser.save();

                if (savedUser) {
                    return done(null, savedUser);
                }
                else {
                    return done(null, false, { message: 'ERROR AL REGISTRAR' })
                }
            }else{
                return done(null, false, { message: 'ERROR AL REGISTRAR' })
            }
        } else {
            const token = tkn.sign({ id: users._id }, config.SECRET, { expiresIn: 43200 })
            const user = await User.findByIdAndUpdate(users._id, { token: token }).populate("roles");
            return done(null, user);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id);
});



