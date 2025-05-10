import express from "express";
import {verifyToken,isStudent} from '../middleware/userauth.js';
import { createUser, getUserProfile, updateUserProfile, deleteUser,loginUser} from '../Controllers/UserControllers.js'

const router = express.Router();

router.post("/users", createUser); 
router.post("/users/login",loginUser);       
router.get("/users/profile", verifyToken, getUserProfile);     
router.put("/users/profile", verifyToken, updateUserProfile);         
router.delete("/users/:id", deleteUser);   

export default router;
