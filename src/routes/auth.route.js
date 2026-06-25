import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { authValidation } from '../validations/auth.validation.js'
const router = express.Router()

router.route('/login').post(authValidation.login,login)
router.route('/register').post(authValidation.register,register)

export default router
