import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database.js";

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Sequelize tự sinh chuỗi UUIDv4 ở backend trước khi gửi xuống
      primaryKey: true,
      field: "session_id", // 💡 ÁNH XẠ CỨNG: id trên code trỏ đúng vào cột session_id dưới SQL
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id", // Trỏ đúng vào cột user_id dưới SQL
    },
    refreshToken: {
      type: DataTypes.STRING(500), // Cấp độ dài 500 thoải mái cho chuỗi crypto 64 bytes hex (dài 128 ký tự)
      allowNull: false,
      unique: true,
      field: "refreshToken",
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "expiresAt",
    },
  },
  {
    sequelize,
    tableName: "Sessions",
    timestamps: true, // 💡 ĐÃ BẬT: Khớp với 2 cột createdAt và updatedAt vừa ALTER ở Bước 1
  },
);

export default Session;
