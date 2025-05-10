import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role,
        };

        next(); 
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
    }
};


export const isStudent = (req, res, next) => {
    if (req.user.role !== "Student") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};
