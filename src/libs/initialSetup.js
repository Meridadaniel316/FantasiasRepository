const Role = require("../models/Rol")
const User = require("../models/User")
const Category = require("../models/Category")
const tkn = require("jsonwebtoken");

const createRoles = async () => {

    try {
        const count = await Role.estimatedDocumentCount()

        if (count > 0) return;

        const permissionsRole = [
            {
                name: 'dashboard',
                permission: 'true',
            },
            {
                name: 'categorias',
                permission: 'false',
            },
            {
                name: 'galeria',
                permission: 'false',
            },
            {
                name: 'usuarios',
                permission: 'false',
            },
            {
                name: 'estudiantes',
                permission: 'false',
            },
            {
                name: 'productos',
                permission: 'false',
            },
            {
                name: 'configuracion',
                permission: 'false',
            },
        ]

        const values = await Promise.all([
            new Role({
                name: 'user',
                permissions: permissionsRole,
            }).save(),
            new Role({
                name: 'admin',
                permissions: permissionsRole,
            }).save(),
            new Role({
                name: 'moderator',
                permissions: permissionsRole,
            }).save()
        ])
    } catch (error) {
        console.error(error)
    }
}

const createCategory = async () => {

    try {
        const count = await Category.estimatedDocumentCount()

        if (count > 0) return;

        const values = await Promise.all([
            new Category({ name: 'Categoria por defecto', icon: 'fas fa-utensils', description: 'Categoria creada por defecto' }).save(),
        ])

    } catch (error) {
        console.error(error)
    }
}

const updateCreate = async () => {
    try {
        const users = await User.find()
        users.forEach(async (element) => {

            if (!element.update) {
                await User.findByIdAndUpdate(element._id, { update: true }, { new: true });
            }
        });

    } catch (error) {
        console.error(error)
    }
}

module.exports = { createRoles, createCategory, updateCreate }