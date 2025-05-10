import { DataTypes } from 'sequelize';
import { sequelize } from "../config/Database.js";
import User from './UserModel.js'

const Issue = sequelize.define("Issue", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  resident_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  room_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Room_allot",
        key: "Room_allocationID",
      },
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM("Low", "Medium", "High"),
    defaultValue: "Low",
  },
  status: {
    type: DataTypes.ENUM("Pending", "Processing", "Resolved"),
    defaultValue: "Pending",
  },
  assigned_to: {
    type: DataTypes.STRING, 
    allowNull: true, 
  },
},{
  freezeTableName: true,
    timestamps:false
});

export default Issue;
