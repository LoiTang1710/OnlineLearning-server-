import express from "express";
import { createCourse, deleteCourse, getAllCourses } from "./course.controller.js";

const router = express.Router();

router.route("/").get(getAllCourses);
router.route("/").post(createCourse);
router.route("/:id").delete(deleteCourse)

export default router;
