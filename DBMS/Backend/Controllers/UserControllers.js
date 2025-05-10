
import dotenv from "dotenv"
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Room_allotstd from "../models/Roomallotstd.js";
import Room_allot from "../models/Room_allot.js";
import Rooms from "../models/Rooms.js";

dotenv.config();

export const createUser = async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        full_name
      } = req.body;
  
      // ✅ Check if user already exists (by email)
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
  
  
      // ✅ Create new user
      const newUser = await User.create({
        username,
        email,
        password,
        full_name,
        role:"Student",
      });
  
      return res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      });
  
    } catch (error) {
      console.error("User creation error:", error);
      return res.status(500).json({
        message: "Error creating user",
        error: error.message,
      });
    }
  };
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ["id", "username","full_name" ,"email", "phone_number", "role", "Gender","Dob","address"],
        });

        if (!user) return res.status(404).json({ message: "User not found" });

       return res.status(200).json({success: true,user});
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { username, email, phone_number } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        user.username = username || user.username;
        user.email = email || user.email;
        user.phone_number = phone_number || user.phone_number;

        await user.save();
        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
