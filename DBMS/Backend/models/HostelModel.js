import { DataTypes } from "sequelize";
import { sequelize } from "../config/Database.js"
import Staff from './StaffModel.js'
const Hostel = sequelize.define("Hostel", {
    hostelID:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
    },
    hostelName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true,
    },
    facilities:{
        type: DataTypes.TEXT, 
        allowNull: false,
        get() {
            const value = this.getDataValue("facilities");
            return value ? value.split(",") : []; 
          },
    },
    Nofloor:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    year:{
        type:DataTypes.ENUM("1","2","3","4","PhD","Guest"),
        allowNull:false,
        defaultValue:"1"
    },
    hosteltype:{
        type:DataTypes.ENUM("Boys Hostel","Girls Hostel" , "Guest House"),
        allowNull:false,
    },
    managerID:{
        type:DataTypes.STRING,
        references: {
            model: Staff, 
            key: 'StaffId' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
},{
    freezeTableName: true,
    timestamps: false
})

export default Hostel;