import express from "express";
import {Adminauth,isAdmin} from '../middleware/adminauth.js';
import {createStaff,Adminlogin,createHostel,getstaffdata,getsatffinfo,gethostel,inforoom,countRooms,deletestaff,getstaffdataactive } from '../Controllers/StaffController.js'
import {markattandance,showstatus,progressissue,genrateroom,getstaffProfile,updatestaffProfile,Stafflogin,getissuebystaff,maintenceissue,assigntask } from '../Controllers/StaffController.js'
import {getallhostel,viewRooms} from "../Controllers/StudentControllers.js"
const router = express.Router();

router.post("/newstaff",createStaff);
router.post("/admin/login",Adminlogin);
router.post("/login",Stafflogin);
router.post("/newhostel",createHostel);
router.post("/hostel/rooms/:hostelID",genrateroom);
router.get("/profile",Adminauth,getstaffProfile);
router.put("/update/profile",Adminauth,updatestaffProfile);
router.get("/issue/assignedto",Adminauth,getissuebystaff);
router.put("/issue/progress/:id",progressissue);
router.get("/attandance",Adminauth,showstatus)
router.put("/mark-attandance",Adminauth,markattandance)
router.get("/staffinfo",getstaffdata);
router.get("/info/:id",getsatffinfo);
router.get("/maintenance",maintenceissue);
router.put("/assign/:id",assigntask );
router.get("/hostelinfo",getallhostel)
router.get("/hostel/rooms/:hostelID/:selectedFloor",viewRooms);
router.get("/hostel/rooms/:hostelID",gethostel)
router.get("/rooms/:RoomID",inforoom);
router.get("/dashinfo",countRooms);
router.delete("/deletestaff/:staff_id",deletestaff);
router.get("/active",getstaffdataactive);

export default router;