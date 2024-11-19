const Category = require("../models/Category")
const Product = require("../models/Product")
const Role = require('../models/Rol');
const config = require('../config');

const createCategory = async (req, res) => {

    const { name, icon, description } = req.body
    const newCategory = new Category({
        name,
        icon,
        description
    });
    //Icon
    if (name) { newCategory.name = name.toLowerCase()}
    if (!icon) { newCategory.icon = "fas fa-utensils" }
    
    const categorySaved = await newCategory.save()
    req.flash('message', 'Categoria creada con exito')
    return res.redirect('/admin/categories');

}

const updateCategoryById = async (req, res) => {
    try {

        const { name, icon } = req.body;
        await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
        
        if (name) { req.body.name = name.toLowerCase()}
        if (!icon) { req.body.icon = "fas fa-utensils" }
        
        req.flash('message', 'Se ha actualizdo la categoria') 
        return res.redirect('/admin/categories'); 

    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}

const getAdminCategories = async (req, res) => {

    try {
        const categories = await Category.find();
        const pagename = {"name": "category", "title": "Categorias"};
        const rolUser = await Role.find({_id: {$in: req.user.roles}});
        res.render('dashboard/categories', {layout: 'dashboard',
                              config,
                              rolUser,
                              category: categories,
                              pagename })

    } catch (error) {
        return res.status(401).json({ message: "Error al encontrar el producto, ingresa una ID valida" })
    }
}

const getCategoryById = async (req, res) => {

    try {
        const products = await Product.find();
        const categoryById = await Category.findById(req.params.id);
        const category = await Category.find();
        const pagename = {"name": "category", "title": categoryById.name};
        await Product.find({category: categoryById.name}).then((documentos) => {

            const productos = {
              Productos: documentos.map((documento) => {
                return {
                    id: documento.id,
                    name: documento.name,
                    description: documento.description,
                    image: documento.image,
                    price: documento.price,
                };
              }),
            };
            res.render("menu/category", {
                pagename,
                category,
                products,
                categories: categoryById,
                productos: productos.Productos,
              });
          });

    } catch (error) {
        return res.status(401).json({ message: "Error al encontrar el producto, ingresa una ID valida" })
    }
}

const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        req.flash('message', 'Se ha eliminado la categoria.') 
        return res.redirect('/admin/categories'); 
    } catch (error) {
        return res.status(401).json({ message: "Error al encontrar el producto, ingresa una ID valida" })
    }
}

const renderEditcategory = async (req, res) =>{
    const category = await Category.findById(req.params.id)
    const rolUser = await Role.find({_id: {$in: req.user.roles}});
    const pagename = {"name": "category", "title": "Edit Category"};
    res.render('dashboard/editCategory', {layout: 'dashboard',
                          config,
                          rolUser,
                          category,
                          pagename })
}

module.exports = { getAdminCategories, createCategory, getCategoryById, deleteCategoryById, renderEditcategory, updateCategoryById};