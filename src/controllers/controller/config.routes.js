const { Router } = require('express');
const router = Router()

const config = require('../../services/config.controller')
const {authJwt, verifyValidation} = require('../../middlewares')

router.get('/admin/config', [authJwt.isAuthenticated,authJwt.verifyToken, authJwt.isAdministrator, verifyValidation.validateCategory], config.rendePageConfig)
router.post('/admin/upload/configHomePage/:id', [authJwt.isAuthenticated,authJwt.verifyToken, authJwt.isAdministrator, verifyValidation.validateCategory], config.updateConfigCommentsHome)

router.post('/admin/upload/promotion', [authJwt.isAuthenticated,authJwt.verifyToken, authJwt.isAdministrator, verifyValidation.validateCategory], config.updateConfigPromotion);
router.get('/admin/upload/promotionActive', [authJwt.isAuthenticated,authJwt.verifyToken, authJwt.isAdministrator, verifyValidation.validateCategory], config.updateConfigPromotionActive);
router.get('/admin/upload/promotionDesactive', [authJwt.isAuthenticated,authJwt.verifyToken, authJwt.isAdministrator, verifyValidation.validateCategory], config.updateConfigPromotionDesactive);

module.exports = router;