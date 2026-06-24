import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";


class Enroll extends Model { }

Enroll.init({
  user_id: { type: DataTypes.INTEGER },
  course_id: { type: DataTypes.INTEGER }
}, {
  sequelize,
  tableName: 'Enroll',
  timestamps: true
})

export default Enroll
