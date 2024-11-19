const Order = require('../models/Orders')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')

const createOrder = async (req, res) => {

    try {
        const {items, phone, address, customerId} = req.body
        const users = await User.find();
        const newOrder = new Order({
            items,
            phone,
            address
        });

        if(customerId){
            const foundRoles = await User.find({ username: {$in: customerId}})

            newOrder.customerId = foundRoles.map(role => role._id)
        } 
        const orderSaved = await newOrder.save()
        res.status(201).json(orderSaved)
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}

const getOrders = async (req, res) => {
    const order = await Order.find();
    const ordersArray = order.map(orde => orde)

    res.json(ordersArray)

}

const getOrderById = async (req, res) => {

    try {
        const orderById = await Order.findById(req.params.id);
        res.status(200).json(orderById)

    } catch (error) {
        return res.status(401).json({ message: "Error al encontrar la orden, ingresa una ID valida" })
    }
}

module.exports = { getOrders, getOrderById, createOrder};