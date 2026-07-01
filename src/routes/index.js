import express from "express";
import authRoute from "../features/auth/auth.route.js";
import courseRoute from "../features/courses/course.route.js";

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Trả về mảng chứa danh sách người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Nguyen Van A"
 */
const apiRouter = express.Router();

apiRouter.use("/", authRoute);
apiRouter.use("/course", courseRoute);

export default apiRouter;
