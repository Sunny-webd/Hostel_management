import { DataTypes } from "sequelize";
import { sequelize } from "../config/Database.js";
import Hostel from "./HostelModel.js";
import User from "./UserModel.js";
import Rooms from "./Rooms.js";

const Room_allot = sequelize.define("Room_allot",
  {
    Room_allocationID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    check_in_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    check_out_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    RoomID: {
      type: DataTypes.STRING,
      references: {
        model: Rooms,
        key: "RoomID",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    hostelID: {
      type: DataTypes.STRING,
      references: {
        model: Hostel,
        key: "hostelID",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
Room_allot.belongsTo(Rooms, { foreignKey: "RoomID" });
Room_allot.belongsTo(Hostel, { foreignKey: "hostelID" });

export default Room_allot;
