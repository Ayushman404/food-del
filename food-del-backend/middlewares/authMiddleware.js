import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
        return res.status(401).json({success:false, message: "Unauthorized" });
        }
        //Decoding the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded Token:", decoded);
        const userId = decoded.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.userId = userId;

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}