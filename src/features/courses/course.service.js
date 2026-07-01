import { StatusCodes } from "http-status-codes";
import ApiError from "../../utils/ApiError.util.js";
import Course from "./course.model.js";

const mock_course = [
  {
    id: 1,
    title: "Khoá học Reactjs",
    description:
      "Khoá học dành cho người mới Khoá học dành cho người mớiKhoá học dành cho người mớiKhoá học dành cho người mới Khoá học dành cho người mới",
  },
  {
    id: 2,
    title: "Khoá học Nodejs",
    description: "",
  },
  {
    id: 3,
    title: "Khoá học Nodejs",
    description: "",
  },
  {
    id: 4,
    title: "Khoá học Nodejs",
    description: "",
  },
];
async function creatCourse({ title, description, imageUrl }) {
  const course = await Course.create({ title, description, imageUrl });
  // Xác thực quyền người dùng có quyền tạo course không

  // Kiểm tra course được tạo ra thành công hay không
  if (!course) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Tạo khoá học thất bại");
  }
  return {
    course,
  };
}

async function getAllCourses() {
  const courses = await Course.findAll()
  return {
    courses
  }
}

async function deleteCourse({id}) {
    const course = await Course.findByPk(id)
    if(!course){
        throw new ApiError(StatusCodes.NOT_FOUND, "Khoá học không tồn tại")
    }
    await course.destroy()
}
export const CourseSer = {
    creatCourse,
    getAllCourses,
    deleteCourse
}