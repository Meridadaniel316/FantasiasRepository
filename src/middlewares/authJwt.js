const tkn = require("jsonwebtoken")
const config = require("../config")
const Role = require("../models/Rol")
const User = require("../models/User")

const verifyToken = async ( req, res, next) => {
    try{

        const token = req.user.token;
        
        if(!token) {
            req.flash('error', 'No se ha proporcionado ningún token')
            return res.redirect('/dashboard')
        }
    
        const decoded = tkn.verify(token,config.SECRET)
        req.userId = decoded.id;
    
        const user = await User.findById(decoded.id, {password: 0})
    
        if(!user){
            req.flash('error', 'Ningún usuario encontrado')
            return res.redirect('/dashboard')
        }
        next();

    } catch (error){
        req.flash('error', 'No autorizado')
        return res.redirect('/dashboard')
    }
}

const isAdministrator = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: user.roles}})
    for (let i = 0; i < roles.length; i++){
        if(roles[i].name === "admin"){
            next();
            return;
        }
    }
    req.flash('error', 'No autorizado, requiere el rango de administrador')
    return res.redirect('/dashboard')
}

const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: user.roles}})

    for (let i = 0; i < roles.length; i++){
        if(roles[i].name === "moderator" || roles[i].name === "admin"){
            next();
            return;
        }
    }
    
    req.flash('error', 'No autorizado, requiere el rango de moderador')
    return res.redirect('/dashboard')
}

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'No tiene autorizado el ingreso')
    res.redirect('/signin')
}


const isAuthenticatedAuth = (req, res, next) => {
    if (!req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'No puedes ingresar a signin/signup estando en una sesion')
    res.redirect('/dashboard')
}

module.exports = { verifyToken, isAdministrator, isModerator, isAuthenticated, isAuthenticatedAuth}