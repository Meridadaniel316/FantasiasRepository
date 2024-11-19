const { Router } = require('express');
const router = Router()

const orders = require('../../services/orders.controller')
const {authJwt, verifyValidation} = require('../../middlewares')

router.post('/order', [ verifyValidation.validateNewOrden, orders.createOrder])
router.get('/orders', [authJwt.verifyToken, authJwt.isModerator, verifyValidation.validateOrder, orders.getOrders])
router.get('/order/:id', [verifyValidation.validateOrder, orders.getOrderById])

module.exports = router;