import express from "express";
import {verifyToken,isStudent} from '../middleware/userauth.js';
import {createIssue,getIssuesByResident,viewhostel,viewRooms,getallhostel,bookRoom,dashboard,checkout} from "../Controllers/StudentControllers.js"

const router = express.Router();

router.post("/issue",verifyToken, createIssue); 
router.get("/allissue/:resident_id",verifyToken,getIssuesByResident);
router.get("/hostel/:year",verifyToken,isStudent,viewhostel);
router.get("/hostel/rooms/:hostelID/:selectedFloor",verifyToken,isStudent,viewRooms);
router.get("/hostelinfo",verifyToken,getallhostel);
router.post("/hostel/book",verifyToken,isStudent,bookRoom);
router.get("/dashboard",verifyToken,dashboard);
router.delete("/checkout",verifyToken,checkout);

export default router