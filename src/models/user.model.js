import { DataTypes, Model } from "sequelize";

class User extends Model {

}
User.init({
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  full_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize,
  tableName: 'USERS',
  timestamps: false,
})

export default User
