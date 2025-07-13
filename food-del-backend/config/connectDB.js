import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://ayushman123:ayushman790333@cluster0.wp8g1ce.mongodb.net/food-del").then(()=>(
        console.log("MongoDB connected successfully")
    )).catch((error)=>{
        console.log("MongoDB connection failed", error);
    });
}