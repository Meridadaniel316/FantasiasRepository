const product = require('../models/Product')
const category = require('../models/Category');
const Role = require('../models/Rol');
const config = require('../config');

function validar_image(image) {
    var regex = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/;
    return regex.test(image) ? true : false;
  }

const createProduct = async (req, res) => {

    try {
        const { name, category, description, price, image } = req.body
        const newProduct = new product({
            name,
            category,
            description,
            price,
            image
        });
        
        if (!image) { newProduct.image = config.ImageUndefined }
        if (!validar_image(image)) { newProduct.image = config.ImageUndefined }
            
        const productSaved = await newProduct.save()
        req.flash('message', 'Producto creada con exito')
        return res.redirect('/admin/products');
        //return res.json(productSaved)
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}


const getProducts = async (req, res) => {
    const products = await product.find();
    const pagename = {"name": "products", "title": "Products"};
    const rolUser = await Role.find({_id: {$in: req.user.roles}});
    res.render('dashboard/products', {layout: 'dashboard',
                          config,
                          rolUser,
                          product: products,
                          pagename })

}

const getProductById = async (req, res) => {

    try {
        const productById = await product.findById(req.params.id);
        res.status(200).json(productById)

    } catch (error) {
        return res.status(401).json({ message: "Error al encontrar el producto, ingresa una ID valida" })
    }
}

const updateProductById = async (req, res) => {
    try {
        const { image } = req.body

        if (!image) { req.body.image = config.ImageUndefined }
        if (!validar_image(image)) { req.body.image = config.ImageUndefined }

        const updateProduct =  await product.findByIdAndUpdate(req.params.id, req.body, { new: true })

        req.flash('message', 'Se ha actualizado el producto.') 
        return res.redirect('/admin/products'); 

    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}

const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        await product.findByIdAndDelete(id);
        req.flash('message', 'Se ha eliminado el producto.') 
        return res.redirect('/admin/products'); 
    } catch (error) {
        return res.status(401).json({ message: "Error al encontrar el producto, ingresa una ID valida" })
    }
}

const renderProduct = async (req, res) =>{
    const categorys = await category.find();
    const rolUser = await Role.find({_id: {$in: req.user.roles}})
    const pagename = {"name": "newproducts", "title": "New Product"};
    res.render('dashboard/newProduct', {layout: 'dashboard',
                          config,
                          rolUser,
                          category: categorys,
                          pagename })
}

const renderEditProduct = async (req, res) =>{
    
    const updateProduct = await product.findById(req.params.id);
    const categorys = await category.find();
    const rolUser = await Role.find({_id: {$in: req.user.roles}});
    const pagename = {"name": "products", "title": "Edit Product"};

    res.render('dashboard/editProduct', {layout: 'dashboard',
                          config,
                          rolUser,
                          pagename,
                          category: categorys,
                          product: updateProduct})
}

module.exports = { createProduct, getProducts, getProductById, updateProductById, deleteProductById, renderProduct, renderEditProduct};