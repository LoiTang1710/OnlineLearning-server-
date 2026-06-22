import { DataTypes, Model } from "sequelize";

class Lesson extends Model { }
Lesson.init({
  lesson_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  lesson_name: { type: DataTypes.STRING, allowNull: false },
  lesson_part: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
}, {
  sequelize,
  tableName: 'LESSONS',
  timestamps: true,
})

export default Lesson
