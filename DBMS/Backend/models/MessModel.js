import { DataTypes } from "sequelize";
import { sequelize } from "../config/Database.js";

const Mess = sequelize.define("Mess",{
    MessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    messname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    day: {
      type: DataTypes.ENUM(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ),
      allowNull: false,
    },
    meal_type: {
      type: DataTypes.ENUM("Breakfast", "Lunch", "Snacks", "Dinner"),
      allowNull: false,
    },
    time_slot: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    items: {
      type: DataTypes.TEXT, 
      allowNull: false,
      get() {
        const value = this.getDataValue("items");
        return value ? value.split(",") : []; 
      },
    },
    hostelId: {
      type: DataTypes.STRING,
      references: {
        model: "Hostel",
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

export default Mess;
