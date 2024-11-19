const { Router } = require('express');
const User = require('../models/User')
const Student = require('../models/Student')
const product = require('../models/Product')
const ConfigText = require('../models/Config')
const category = require('../models/Category')
const Role = require('../models/Rol')
const config = require('../config')
const passport = require('passport');
const { authJwt, verifyValidation } = require('../middlewares')
const router = Router();

router.get('/', async (req, res) => {
    const products = await product.find();
    const categorys = await category.find();
    const configtext = await ConfigText.find()
    const pagename = { "name": "home", "title": config.Name };
    res.render('index', {
        products,
        pagename,
        category: categorys,
        config,
        configtext
    })
});

router.get('/galeria', async (req, res) => {
    const products = await product.find();
    const categorys = await category.find();
    const categories = { "name": "Galeria", "description": null }
    const pagename = { "name": "galeria", "category": "galeria", "title": categories.name };
    res.render('menu/category', {
        config,
        pagename,
        products,
        productos: products,
        category: categorys,
        categories
    });
});


router.get('/dashboard', [authJwt.isAuthenticated], async (req, res) => {
    const users = await User.find();
    const students = await Student.find();
    const products = await product.find();
    const categorys = await category.find();
    const rolUser = await Role.find({ _id: { $in: req.user.roles } })
    if (req.user.update) { await User.findByIdAndUpdate(req.user._id, { update: false }, { new: true }); }
    const pagename = { "name": "dashboard", "title": "Dasboard" };

    const layouts = {
        layout: 'dashboard',
        products,
        pagename,
        users,
        category: categorys,
        students,
        rolUser,
        config
    }

    if (rolUser[0].name == 'admin' || rolUser[0].name == 'moderator') {
        res.render('dashboard/dashboardAdmin', layouts)
    } else {
        res.render('dashboard/dashboard', layouts)
    }

});

router.get('/desarrollo/herramientas', [authJwt.isAuthenticated], async (req, res) => {
    const users = await User.find();
    const students = await Student.find();
    const products = await product.find();
    const categorys = await category.find();
    const rolUser = await Role.find({ _id: { $in: req.user.roles } })
    if (req.user.update) { await User.findByIdAndUpdate(req.user._id, { update: false }, { new: true }); }
    const pagename = { "name": "desarrollo", "title": "Desarrollo" };

    const layouts = {
        layout: 'dashboard',
        products,
        pagename,
        users,
        category: categorys,
        students,
        rolUser,
        config
    }

    if (rolUser[0].name == 'admin' || rolUser[0].name == 'moderator') {
        res.render('dashboard/desarrollo/herramientas', layouts)
    } else {
        res.render('dashboard/dashboard', layouts)
    }

});

module.exports = router;

