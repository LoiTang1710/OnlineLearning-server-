import { StatusCodes } from "http-status-codes";
import { CourseSer } from "./course.service.js";

export const createCourse = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { course } = await CourseSer.creatCourse({ title, description });
    return res.status(StatusCodes.OK).json({ message: "Tạo thành công" });
  } catch (error) {
    next(error);
  }
};

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await CourseSer.getAllCourses();
    return res.status(StatusCodes.OK).json({ courses });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    await CourseSer.deleteCourse(id);
    return res.status(StatusCodes.OK).json({ message: "Xoá thành công" });
  } catch (error) {
    next(error);
  }
};
