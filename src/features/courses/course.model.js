import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database.js";

class Course extends Model { }
Course.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: {type: DataTypes.STRING, allowNull: false},
  imageUrl: {type: DataTypes.STRING, field: "image_url"}
}, {
  sequelize,
  tableName: 'COURSES',
  timestamps: true,
})

export default Course