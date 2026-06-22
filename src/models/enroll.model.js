import { DataTypes, Model } from "sequelize";

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
