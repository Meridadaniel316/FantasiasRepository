const { Router } = require('express');
const router = Router()
const userContr = require('../../services/user.controller')
const {authJwt, verifySignup, verifyValidation} = require('../../middlewares')

router.get('/admin/users', [authJwt.isAuthenticated, authJwt.verifyToken, authJwt.isAdministrator], userContr.renderUsers)
router.get('/admin/students', [authJwt.isAuthenticated, authJwt.verifyToken, authJwt.isAdministrator], userContr.renderStudents)

router.get('/matricula', userContr.renderStudentEnrollmentInfo)
router.post('/searchregistrationinformation', userContr.searchregistrationinformation)
router.post('/matricula/nuevo/estudiante', userContr.matricularNuevoEstudiante)


router.post('/user', verifySignup.checkRolesExisted, verifySignup.checkDuplicateUsernameOrEmail, verifyValidation.validateNewUser, userContr.createUser)

router.post('/admin/newstudent',  userContr.createStudent)
module.exports = router;