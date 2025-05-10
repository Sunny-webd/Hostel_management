import 'dotenv/config'
import express from "express"
import cookieParser from "cookie-parser";
import cors from 'cors'
import connectDB, { sequelize } from "./config/Database.js";
import connectCloudinary from "./config/Cloudinary.js"
import bodyParser from "body-parser";
import UserRoutes from './Routes/UserRoutes.js'
import StudentRoutes from "./Routes/StudentRoutes.js"
import StaffRoutes from "./Routes/StaffRoutes.js"
// app config
const app = express()
const port = Number(process.env.PORT) || 2001

await connectDB();
await sequelize.sync({ alter: false });
connectCloudinary()

// // middlewares
app.use(express.json())
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.json());


// api endpoints
app.use("/api", UserRoutes);
app.use("/api/student",StudentRoutes)
app.use("/api/Staff",StaffRoutes);

app.get("/", (req, res) => {
  res.send("API Working")
});


app.listen(port, () => 
  console.log(`Server started on PORT:${port}`)
)