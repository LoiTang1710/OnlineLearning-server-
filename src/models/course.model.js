import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

class Course extends Model { }
Course.init({
  course_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  course_name: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize,
  tableName: 'COURSES',
  timestamps: true,
})

export default Course