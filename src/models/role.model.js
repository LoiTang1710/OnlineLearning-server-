import { DataTypes, Model } from "sequelize";

import { sequelize } from "../config/database.js";

class Role extends Model { }

Role.init({
  role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role_name: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize,
  tableName: 'ROLES',
  timestamps: false
})

export default Role
