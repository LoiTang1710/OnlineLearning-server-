import express from "express";
import { createCourse, deleteCourse, getAllCourses } from "./course.controller.js";

/**
 * @swagger
 * /course:
 *   get:
 *     summary: Lấy danh sách tất cả khóa học
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Trả về mảng danh sách khóa học
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64a2b1c3e4b0a1d2c3f4e5a6"
 *                   title:
 *                     type: string
 *                     example: "Lập trình Node.js"
 *
 *   post:
 *     summary: Tạo khóa học mới
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Khóa học ReactJS"
 *               description:
 *                 type: string
 *                 example: "Học ReactJS từ cơ bản đến nâng cao"
 *     responses:
 *       201:
 *         description: Tạo khóa học thành công
 *       400:
 *         description: Dữ liệu gửi lên bị thiếu hoặc sai
 *
 * /course/{id}:
 *   delete:
 *     summary: Xóa một khóa học
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của khóa học cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy khóa học với ID này
 */


const router = express.Router();

router.route("/").get(getAllCourses);
router.route("/").post(createCourse);
router.route("/:id").delete(deleteCourse)

export default router;
