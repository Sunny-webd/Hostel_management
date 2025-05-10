import { DataTypes } from 'sequelize';
import { sequelize } from "../config/Database.js"
import bcrypt from "bcryptjs"

const Staff=sequelize.define("Staff",{
    StaffId:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey: true
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
        type: DataTypes.STRING,
        allowNull: false
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
    address:{
        type: DataTypes.STRING,
        defaultValue:"room-10 floor-1 IITP",
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    aadhar_number: {
        type: DataTypes.STRING,
        defaultValue:"000000000000",
        isValidate:{
            len:[12,12]
        },
    },
    joining_date:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        defaultValue:DataTypes.NOW,
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true,
    }
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

})

export default Staff; 