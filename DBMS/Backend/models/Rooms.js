import { DataTypes } from "sequelize";
import { sequelize } from "../config/Database.js"
import Hostel from "./HostelModel.js";

const Rooms=sequelize.define("Rooms", {
    RoomID:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
    },
    RoomNo:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    floor:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    is_booked:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    hostelID:{
        type:DataTypes.STRING,
        references: {
            model: Hostel, 
            key: 'hostelID' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
},{
    freezeTableName: true,
    timestamps: false
})

export default Rooms;