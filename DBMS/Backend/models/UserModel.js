import { DataTypes } from 'sequelize';
import { sequelize } from "../config/Database.js"
import bcrypt from "bcryptjs"
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:  { name: 'username', msg: 'username must be unique' },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:  { name: 'email', msg: 'Email must be unique' },
        validate: {
            isEmail: true
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    full_name: {
        type: DataTypes.STRING
    },
    phone_number: {
        type: DataTypes.STRING,
        defaultValue:"0000000000",
        isValidate:{
            len:[10,10]
        },

    },
    Dob:{
        type: DataTypes.DATE,
        defaultValue:"2000-01-01",
    },
    Gender:{
        type: DataTypes.ENUM('Male', 'Female'),
        defaultValue:"Male",
    },
    RollNo:{
        type: DataTypes.STRING,
    },
    address:{
        type: DataTypes.STRING,
        defaultValue:"room-10 floor-1 IITP",
    },
    role:{
        type:DataTypes.ENUM("User","Student"),
        allowNull:false,
        deaultValue:"Student",
    },
    aadhar_number: {
        type: DataTypes.STRING,
        defaultValue:"000000000000",
        isValidate:{
            len:[12,12]
        },
    },
}, {
    freezeTableName: true,
    timestamps: false,
    hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
});

export default User;