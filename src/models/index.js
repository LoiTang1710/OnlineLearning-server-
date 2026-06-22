import Course from "./course.model";
import Enroll from "./enroll.model";
import Lesson from "./lesson.model";
import Role from "./role.model";
import User from "./user.model";

// RBTV Role-User
Role.hasMany(User, { foreignKey: 'role_id' })
User.belongsTo(Role, { foreignKey: 'role_id' })


// RBTV Course-Lesson
Course.hasMany(Lesson, { foreignKey: 'course_id' })
Lesson.belongsTo(Course, { foreignKey: 'course_id' })

// RBTV User-Enroll Course
User.belongsToMany(Course, { through: Enroll, foreignKey: 'user_id' })
Course.belongsToMany(User, { through: Enroll, foreignKey: 'course_id' })

export {
  Role, User, Course, Lesson, Enroll
}

