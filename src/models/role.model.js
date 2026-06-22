import { DataTypes, Model } from "sequelize";

class Role extends Model { }

Role.init({
  role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role_name: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize,
  tableName: 'ROLES',
  timestamps: true
})

export default Role
