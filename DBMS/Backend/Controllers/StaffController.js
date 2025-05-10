import dotenv from 'dotenv/config'
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import Staff from '../models/StaffModel.js'
import Hostel from "../models/HostelModel.js"
import Mess from "../models/MessModel.js"
import Rooms from "../models/Rooms.js"
import Issue from "../models/IssueModel.js"
import Room_allot from "../models/Room_allot.js"
import Room_allotstd from "../models/Roomallotstd.js"
import User from "../models/UserModel.js"
import { Sequelize } from 'sequelize';
import { sequelize } from '../config/Database.js';
import { Op } from "sequelize";
export const createStaff= async(req,res)=>{
    try{
        const {StaffId ,email, password, full_name, phone_number, Dob, Gender, address, role, aadhar_number,joining_date,status } = req.body;
        const newstaff =  await  Staff.create({
            StaffId ,
            email,
            password, 
            full_name, 
            phone_number, 
            Dob, 
            Gender, 
            address, 
            role, 
            aadhar_number,
            joining_date,
            status
        });
        res.status(201).json({ message: "Staff created successfully", Staff : newstaff });

    }catch(error){
        res.status(500).json({ message: "Error creating Staff", error: error.message});
    }
}

export const createHostel= async(req,res)=>{
    try{
        const {hostelID,hostelName,facilities,year,hosteltype,Nofloor,managerID}=req.body;

        const newhostel = Hostel.create({
            hostelID,
            hostelName,
            facilities,
            Nofloor,
            year,
            hosteltype,
            managerID
        });
        res.status(201).json({ message: "Hostel created successfully", Hostel : newhostel });
    }catch(error){
        res.status(500).json({ message: "Error creating Hostel", error: error.message});
    }
}


export const genrateroom = async (req, res) => {
    const { hostelID } = req.params;
    const roomsfloor = req.body.aboveGroundRooms; 

    try {
        const hostel = await Hostel.findOne({ where: { hostelID } });

        if (!hostel) {
            return res.status(404).json({ message: "Hostel not found" });
        }

        if (!hostel.hostelName) {
            return res.status(400).json({ message: "Hostel name is missing." });
        }

        const shortHostelName = hostel.hostelName.substring(0, 3).toUpperCase();
        const floor_value = hostel.Nofloor;
        const roomentries = [];

        for (let floor = 0; floor < floor_value; floor++) {
            if (!roomsfloor || !roomsfloor[floor]) {
                continue;
            }
            
            for (let room = 1; room <=Number(roomsfloor[floor]); room++) {
                const RoomNo = `${floor}${room.toString().padStart(2, "0")}`;
                const RoomID = `${shortHostelName}_${hostel.hostelID}${floor}${room.toString().padStart(2, "0")}`;
                roomentries.push({
                    RoomID,
                    hostelID: hostel.hostelID,
                    floor,
                    RoomNo,
                    isBooked: false
                });
            }
        }
        if (roomentries.length === 0) {
            return res.status(400).json({ message: "No rooms to generate." });
        }

        await Rooms.bulkCreate(roomentries);

        return res.status(201).json({ message: "Rooms generated successfully", rooms: roomentries });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



export const Adminlogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"Email and Password are required"});
        }
        const admin = await Staff.findOne({where : {email}});
        if(!admin || admin.role!=='Admin'){
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: admin.StaffId, email: admin.email, role: admin.role },
             process.env.JWT_SECRET, 
             { expiresIn: "30d" });
        return res.json({ message: "Login successful", token }); 
    }catch(error){
        res.status(500).json({ message:"Internal Server Error"});
    }
}

export const getstaffProfile = async (req, res) => {
    try {
        const staff = await Staff.findByPk(req.admin.id, {
            attributes: ["StaffId", "joining_date","full_name" ,"email", "phone_number", "role", "Gender","Dob","address"],
        });

        if (!staff) return res.status(404).json({ message: "User not found" });

       return res.status(200).json({success: true,staff});
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

export const updatestaffProfile = async (req, res) => {
    try {
        const {full_name, Dob, phone_number } = req.body;
        const staff = await Staff.findByPk(req.admin.id);

        if (!staff) return res.status(404).json({ message: "User not found" });
        staff.full_name = full_name || staff.full_name,
        staff.Dob = Dob || staff.Dob,
        staff.phone_number = phone_number || staff.phone_number
        const updatedstaff = await staff.save();

        res.status(200).json({ message: "Profile updated successfully", updatedstaff});
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
};

export const getissuebystaff = async (req, res) => {
    const staffId = req.admin?.id;
  
    try {
      // Validate staff existence
      const staff = await Staff.findByPk(staffId);
      if (!staff) {
        return res.status(404).json({ message: "Staff not found" });
      }
  
      // Get issues assigned to staff
      const issues = await Issue.findAll({
        where: { assigned_to: staff.full_name,  status: {
            [Op.in]: ['pending', 'Processing'],
          }, },
      });
  
      if (!issues || issues.length === 0) {
        return res.status(404).json({ message: "No issues found" });
      }
  
      // Attach hostel name and room number to each issue
      const enrichedIssues = await Promise.all(
        issues.map(async (issue) => {
          const room = await Room_allot.findOne({ where: { Room_allocationID: issue.dataValues.room_id} });
          const roomdata = await Rooms.findOne({ where: { RoomID: room.dataValues.RoomID } })
          const hostel = await Hostel.findOne({ where: { hostelID: room.dataValues.hostelID } })
  
          return {
            ...issue.dataValues,
            hostelName: hostel?.dataValues.hostelName || "Unknown",
            roomNumber: roomdata?.dataValues.RoomNo || "Unknown",
          };
        })
      );
  
      return res.status(200).json({
        message: "Issues fetched successfully",
        issues: enrichedIssues,
      });
    } catch (error) {
      console.error("Error fetching issues:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  
  

export const showstatus=async(req,res)=>{
    try{
        const staffId = req.admin.id;
        const staff= await Staff.findByPk(staffId);
        if(!staff){
            return res.status(404).json({message:"Staff not found"});
        }
        
        return res.status(200).json(staff)
    }catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
}

export const markattandance = async (req, res) => {
    try {
      const { status } = req.body;
      const staffId = req.admin?.id;
  
      if (!staffId) {
        return res.status(401).json({ message: "Unauthorized access. No staff ID found." });
      }
  
      const staff = await Staff.findByPk(staffId);
  
      if (!staff) {
        return res.status(404).json({ message: "Staff not found" });
      }
  
    staff.status = status;
    const updatedStaff = await staff.save();
    return res.status(200).json({ message: "Attendance updated", staff: updatedStaff });
  
    } catch (error) {
      console.error("Error marking attendance:", error);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  

export const Stafflogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"Email and Password are required"});
        }
        
        const admin = await Staff.findOne({where : {email}});
        if(!admin){
            return res.status(401).json({message:"Invalid email or password"});
        }
        
        const isMatch = await bcrypt.compare(password, admin.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: admin.StaffId, email: admin.email, role: admin.role },
             process.env.JWT_SECRET, 
             { expiresIn: "30d" });
        return res.json({ message: "Login successful", token }); 
    }catch(error){
        res.status(500).json({ message:"Internal Server Error"});
    }
};

export const getstaffdata = async(req,res)=>{
    try{

        const staff = await Staff.findAll();
        if(!staff){
            return res.json({success:false,message:"Staff not Found"});
        }

        return res.json({success:true,staff});

    }catch(error){
        res.status(500).json({success:false,message:"internal server error"})
    }
}

export const getsatffinfo = async(req,res)=>{
    const {id} = req.params;

    try{

        if(!id){
            return res.json({success:false,message:"staff id missing"});
        }

        const staff = await Staff.findOne({where:{StaffId:id}});

        if(!staff){
            return res.json({success:false,message:"staff not found"}) 
        }

        return res.json({success:true,staff});
    }catch(error){
        res.json({success:false,message:"internal server errror"});
    }
}

export const maintenceissue = async(req,res)=>{
    try{

        const issue = await Issue.findAll();

        if(!issue) {
            return res.json({success:false,message:"issue not found"});

        }

        return res.json({success:true,issue});

    }catch(error){
        res.json({success:false,message:"internal server errror"});
    }
}
export const progressissue = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      if (!id) {
        return res.status(400).json({ success: false, message: "Issue ID is required." });
      }
  
      if (!status) {
        return res.status(400).json({ success: false, message: "Status is required." });
      }
  
      // Check if the issue exists
      const issue = await Issue.findOne({ where: { id } });
  
      if (!issue) {
        return res.status(404).json({ success: false, message: "Issue not found." });
      }
  
      // Update the status
      const [rowsUpdated] = await Issue.update(
        { status },
        { where: { id } }
      );
  
      if (rowsUpdated === 0) {
        return res.status(400).json({ success: false, message: "Failed to update status." });
      }
  
      return res.status(200).json({ success: true, message: "Issue status updated successfully!" });
  
    } catch (error) {
      console.error("Error updating issue:", error.message);
      return res.status(500).json({ success: false, message: "Internal server error.", error: error.message });
    }
  };
  

export const assigntask = async (req, res) => {
    const { id } = req.params; 
    const { assignedTo } = req.body; 

    try {
        if (!id) {
            return res.status(400).json({ success: false, message: "Task ID is required." });
        }

        if (!assignedTo) {
            return res.status(400).json({ success: false, message: "Assigned person is required." });
        }

        const issue = await Issue.findOne({ where: { id } });

        if (!issue) {
            return res.status(404).json({ success: false, message: "Issue not found." });
        }

        await Issue.update(
            { assigned_to: assignedTo }, 
            { where: { id } }  
        );

        return res.status(200).json({ success: true, message: "Task assigned successfully!", assigned_to: assignedTo });

    } catch (error) {
        console.error("Error updating issue:", error);
        return res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
    }
};

export const gethostel=async(req,res)=>{
    const {hostelID} = req.params;
    try {
        const hostel = await Hostel.findOne({
            where: { hostelID },
        });
    
        res.status(200).json({ hostel});
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const inforoom = async (req, res) => {
    const { RoomID } = req.params;

    try {
        // Fetch bookings for the given RoomID
        const bookings = await Room_allot.findAll({ where: { RoomID } });

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ success: false, message: "Room not booked or not found" });
        }

        // Extract Room_allocationID values
        const allocationIDs = bookings.map(booking => booking.Room_allocationID);

        if (allocationIDs.length === 0) {
            return res.status(404).json({ success: false, message: "No valid allocations found." });
        }

        // Fetch booking info based on Room_allocationID
        const bookingInfo = await Room_allotstd.findAll({ 
            where: { Room_allocationID: allocationIDs } 
        });

        if (!bookingInfo || bookingInfo.length === 0) {
            return res.status(404).json({ success: false, message: "Booking data missing" });
        }

        // Extract Student IDs properly
        const studentIDs = bookingInfo.map(info => info.studentID);
        const studentInfo = await User.findAll({ where: { id: Number(studentIDs) } });

        // Extract Hostel IDs properly
        const hostelIDs = bookings.map(booking => booking.hostelID);
        const hostelData = await Hostel.findAll({ where: { hostelID: hostelIDs } });

        return res.status(200).json({ success: true, bookings, bookingInfo, studentInfo, hostelData });

    } catch (error) {
        console.error("Error fetching room info:", error); // Log error to console
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

export const countRooms=async(req,res)=>{
    
    try{
        const result = await sequelize.query('SELECT COUNT(*) AS totalRooms FROM Rooms');
        const bookedCount = await Rooms.count({
            where: { is_booked: true }
          });
        const result1=await sequelize.query('SELECT COUNT(*) AS totalStudents FROM User')
        const HostelCount=await Hostel.count();
          const staffCount=await Staff.count();
          const issueCount=await Issue.count({where:{status:'pending'}});
        if(!result){
            return res.status(404).json({success:false,message:"Rooms not Found"})
        }
        const finalresult={
            result:result[0],
            bookedCount,
            result1:result1[0],
            HostelCount,
            staffCount,
            issueCount
        }
        res.status(201).json({success:true,finalresult})
    }
    catch(error){
        console.error("Error in fetching total Rooms :", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}
export const deletestaff = async (req, res) => {
    const { staff_id } = req.params;
    try {
        const StaffId = staff_id
        const user = await  Staff.findByPk(StaffId);
        if (!user) {
            return res.status(404).json({ message: "Staff not found" });
        }
        await Staff.destroy({ where: { StaffId } });
        res.status(200).json({ success: true, message: "Staff deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting Staff", error: error.message });
    }
};

export const getstaffdataactive = async (req, res) => {
    try {
      const staff = await Staff.findAll({ where: { status: true } });
  
      if (!staff || staff.length === 0) {
        return res.status(404).json({ success: false, message: "No active staff found" });
      }
  
      return res.status(200).json({ success: true, staff });
    } catch (error) {
      console.error("Error fetching active staff:", error);
      res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
  };
  

