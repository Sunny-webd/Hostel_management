import { DataTypes } from "sequelize";
import { sequelize } from "../config/Database.js"
import User from './UserModel.js'
import Room_allot from './Room_allot.js'
const Room_allotstd=sequelize.define("Room_allotstd", {
    Room_allocationID:{
        type:DataTypes.STRING,
        references: {
            model: Room_allot,
            key: 'Room_allocationID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    studentID:{
        type:DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
},{
    freezeTableName: true,
    timestamps: false
}
)
export default Room_allotstd;