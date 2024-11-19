const { Router } = require('express');
const router = Router()

const products = require('../../services/products.controller')
const categories = require('../../services/categories.controller')
const {authJwt, verifyValidation} = require('../../middlewares')

router.get('/admin/new-product', [authJwt.isAuthenticated, authJwt.verifyToken, authJwt.isAdministrator], products.renderProduct)
router.post('/product', [ authJwt.isAuthenticated,authJwt.verifyToken, authJwt.isAdministrator, verifyValidation.validateNewProduct], products.createProduct)

router.get('/admin/products', [authJwt.isAuthenticated,authJwt.verifyToken, authJwt.isModerator, verifyValidation.validateProduct, products.getProducts])
router.get('/product/:id', [verifyValidation.validateProduct, products.getProductById])

router.get('/edit-product/:id', [authJwt.isAuthenticated],authJwt.verifyToken, authJwt.isModerator, products.renderEditProduct)
router.post('/updateproduct/:id', [authJwt.isAuthenticated,authJwt.verifyToken, authJwt.isModerator, verifyValidation.validateEditProduct], products.updateProductById)
router.post('/deleteproduct/:id', [authJwt.isAuthenticated, authJwt.verifyToken, authJwt.isAdministrator], products.deleteProductById)

router.post('/updatecategory/:id', [authJwt.isAuthenticated,authJwt.verifyToken, authJwt.isModerator, verifyValidation.validateEditCategory], categories.updateCategoryById)
router.post('/deletecategory/:id', [authJwt.isAuthenticated, authJwt.verifyToken, authJwt.isAdministrator], categories.deleteCategoryById)
router.post('/category', [authJwt.isAuthenticated, authJwt.verifyToken, authJwt.isAdministrator, verifyValidation.validateNewCategory], categories.createCategory)

router.get('/admin/categories', [authJwt.isAuthenticated,authJwt.verifyToken, authJwt.isModerator, verifyValidation.validateCategory], categories.getAdminCategories)
router.get('/admin-category/:id', [authJwt.isAuthenticated,authJwt.verifyToken, authJwt.isModerator, verifyValidation.validateCategory], categories.renderEditcategory)

router.get('/category/:id', verifyValidation.validateCategory, categories.getCategoryById)

module.exports = router;