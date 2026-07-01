import express from "express";
import { login, register } from "./auth.controller.js";
import { authValidation } from "./auth.validation.js";

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Đăng nhập hệ thống
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Sai email hoặc mật khẩu
 *       500: 
 *          description: Tài khoản không tồn tại
 */ 


const router = express.Router();

router.route("/login").post(authValidation.login, login);
router.route("/register").post(authValidation.register, register);

export default router;
