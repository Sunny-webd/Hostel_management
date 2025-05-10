import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const Adminauth = (req, res, next) => {
       const atoken = req.header("Authorization")?.split(" ")[1]; 
   
       if (!atoken) {
           return res.status(401).json({ message: "Access Denied! No token provided." });
       }
   
       try {
           const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
           req.admin = {
               id: decoded.id,
               username: decoded.username,
               role: decoded.role,
           };
            
           next(); 
          
       } catch (error) {
           res.status(403).json({ message: "Invalid or expired token." });
       }
};

export const isAdmin = (req, res, next) => {
    if (req.admin.role !== "Admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};