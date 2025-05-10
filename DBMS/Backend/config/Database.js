import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME || 'Hostel_managment',
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false, 
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(" MySQL Database Connected Successfully!");
  } catch (error) {
    console.error(" Database Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;
export { sequelize }; 

