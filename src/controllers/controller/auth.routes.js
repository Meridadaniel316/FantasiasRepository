const { Router } = require('express');
const router = Router()
const authController = require("../../services/auth.controller")
const { authJwt, verifySignup, verifyValidation } = require("../../middlewares")

router.get('/signup', [ authJwt.isAuthenticatedAuth ], authController.renderSignUp)
router.post('/signup', [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted, verifyValidation.validateNewUser], authController.signup)

router.post('/update/signup', [verifySignup.checkDuplicateUsernameOrDocumento, verifySignup.checkRolesExisted, verifyValidation.validateUpdateNewUser], authController.updateSignup)

router.get('/signin', [ authJwt.isAuthenticatedAuth ], authController.renderSignin)
router.post('/signin', [verifyValidation.validateUser], authController.signin)


router.get('/signin/google', [ authJwt.isAuthenticatedAuth ], authController.signinGoogle);
router.get('/signin/google/callback', authController.signinGoogleCallBack);

router.get("/logout",authController.logout)
module.exports = router;