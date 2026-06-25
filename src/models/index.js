import Course from "./course.model.js";
import Enroll from "./enroll.model.js";
import Lesson from "./lesson.model.js";
import Role from "./role.model.js";
import Session from "./session.model.js";
import User from "./user.model.js";

// RBTV Role-User
Role.hasMany(User, { foreignKey: "role_id" });
User.belongsTo(Role, { foreignKey: "role_id" });

// RBTV Course-Lesson
Course.hasMany(Lesson, { foreignKey: "course_id" });
Lesson.belongsTo(Course, { foreignKey: "course_id" });

// RBTV User-Enroll Course
User.belongsToMany(Course, { through: Enroll, foreignKey: "user_id" });
Course.belongsToMany(User, { through: Enroll, foreignKey: "course_id" });

// RBTV User-Session
Session.belongsTo(User, { foreignKey: "user_id" });

export { Role, User, Course, Lesson, Enroll, Session };
