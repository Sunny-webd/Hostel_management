import dotenv from "dotenv"
import User from "../models/UserModel.js";
import Issue from "../models/IssueModel.js"
import Mess from "../models/MessModel.js"
import Hostel from "../models/HostelModel.js"
import Rooms from "../models/Rooms.js"
import Room_allot from "../models/Room_allot.js"
import Room_allotstd from "../models/Roomallotstd.js"
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from "uuid";

export const createIssue = async (req, res) => {
  try {
    const { resident_id, details, priority } = req.body;

    if (!resident_id|| !details) {
      return res.status(400).json({ message: "Resident ID and Issue details are required" });
    }
    const roomalloted=await Room_allotstd.findOne({where:{studentID:resident_id}})
    if(!roomalloted){
      return res.status(404).json({ message: "Resident not found" });
    }
    const allotid=roomalloted.dataValues.Room_allocationID
    
    const issue = await Issue.create({ resident_id, details, priority, room_id: allotid });
    
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getIssuesByResident = async (req, res) => {
    try {
      const { resident_id } = req.params;
      const issues = await Issue.findAll({ where: { resident_id } });
  
      if (issues.length === 0) {
        return res.status(404).json({ message: "No issues found" });
      }
  
      res.json(issues);
    } catch (error) {
      console.error("Error fetching issues:", error);
      res.status(500).json({ message: error.message });
    }
};


export const viewhostel = async(req,res)=>{
  try {
    const { year } = req.params;
    const hostel = await Hostel.findAll({
        where: { year },
    });

    res.status(200).json({ hostel });
} catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
};

export const getallhostel = async (req, res) => {
  try {
    const hostels = await Hostel.findAll({
      attributes: ['hostelID', 'hostelname', 'hosteltype','year', 'facilities','status'], 
      order: [['hostelname', 'ASC']],
    });
    if(hostels.length === 0){
      return res.status(404).json({ message: "No hostels found" });
    }
    
    res.status(200).json({hostels}); 
  } catch (error) {
    console.error("Error fetching hostels:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const viewRooms = async (req, res) => {
  try {
    const {selectedFloor , hostelID } = req.params;
    if(!selectedFloor){
      return res.status(404).json({ message: "selectedFloor not found" });
    }
    const hostel = await Hostel.findOne({
      where: { hostelID },
    });

    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }
    const floor=selectedFloor;
    const rooms = await Rooms.findAll({
      where: { hostelID,floor},
    });

    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found for this hostel and floor" });
    }

    const floorcount = hostel.Nofloor;

    res.status(200).json({ rooms, floorcount }); 

  } catch (error) {
    console.error("Error fetching rooms:", error); 
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const bookRoom = async (req, res) => {
  try {
    const {RoomID} = req.body;
    const { id } = req.user;
    const room = await Rooms.findOne({ where: { RoomID } });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const hostelID = room.hostelID;
    const hostel = await Hostel.findOne({where:{hostelID}}) 
    if (!hostelID) {
      return res.status(404).json({ message: "Hostel not found for this room" });
    }
    const user = await Room_allotstd.findOne({where : {StudentID :id }})
    if(user && !(hostel.hosteltype==="Guest")){
      return res.status(404).json({ message: "You are already booked Room" })
    }
    const Room_allocationID = `${RoomID}_${hostelID}_${id}`;
    const newBooking = await Room_allot.create({
      Room_allocationID,
      check_in_date: new Date(),
      check_out_date: new Date(new Date().setMonth(new Date().getMonth() + 12)),
      RoomID,
      hostelID,
    });

    await Room_allotstd.create({
      Room_allocationID,
      studentID: id,
    });

    await Rooms.update(
      { is_booked: true },
      { where: { RoomID } }
    );
  
    return res.status(201).json({
      message: "Room booked successfully!",
      booking: newBooking,
      studentID: id,
    });
  
  } catch (error) {
    console.error("Error booking room:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
  
};

export const dashboard = async (req, res) => {
  try {
    // 🔐 Ensure user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "User authentication failed" });
    }

    const studentId = req.user.id;

    // 🔎 Find room allocation for the student
    const allocation = await Room_allotstd.findOne({ where: { StudentID: studentId } });
    if (!allocation) {
      return res.status(404).json({ message: "No room allocated to this student" });
    }

    // 🔎 Fetch booking details using Room_allocationID
    const booking = await Room_allot.findOne({
      where: { Room_allocationID: allocation.Room_allocationID }
    });

    if (!booking || !booking.hostelID || !booking.RoomID) {
      return res.status(404).json({ message: "Booking details are incomplete or missing" });
    }

    // 🔎 Get room and hostel details
    const hostel = await Hostel.findOne({ where: { hostelID: booking.hostelID } });
    const room = await Rooms.findOne({ where: { RoomID: booking.RoomID } });

    if (!hostel || !room) {
      return res.status(404).json({ message: "Hostel or room data not found" });
    }

    const RoomNo = room.RoomNo.toString();
    const floor = RoomNo.length >= 3 ? parseInt(RoomNo.slice(0, RoomNo.length - 2)) : 0;

  

    // ✅ Respond with dashboard info
    return res.status(200).json({
      hostelName: hostel.hostelName,
      roomNo: room.RoomNo,
      check_in_date: booking.check_in_date?.toISOString().split("T")[0] || null,
      check_out_date: booking.check_out_date?.toISOString().split("T")[0] || null,
      roomType: hostel.hosteltype,
      amenities: hostel.facilities,
      floor,
      message: "Data sent successfully"
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};



export const checkout = async (req, res) => {
  try {
    const {id} = req.user;
    const roomAllotmentStd = await Room_allotstd.findOne({ where: { studentID: id} });

    if (!roomAllotmentStd) {
      return res.status(404).json({ message: "No active room allocation found for this student." });
    }
    const roomAllotment = await Room_allot.findOne({ where: { Room_allocationID: roomAllotmentStd.Room_allocationID } });

    if (!roomAllotment) {
      return res.status(404).json({ message: "No matching room allocation found." });
    }
    const room = await Rooms.findOne({ where: { RoomID: roomAllotment.RoomID } });

    if (room) {
      await room.update({ is_booked:false }); 
    }
    await Room_allotstd.destroy({ where: { studentID: id } });
    await Issue.destroy({where:{room_id:roomAllotmentStd.Room_allocationID}})
    await roomAllotment.destroy({where : { Room_allocationID: roomAllotmentStd.Room_allocationID } });

    res.status(200).json({
      message: "Student successfully checked out. Room status updated to Available.",
    });

  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Error processing checkout.", error: error.message });
  }
};
