import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from './config/connectDB.js';
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";


const app = express();
dotenv.config();

const PORT =  4000;

//Middlewares
app.use(cors());
app.use(express.json());

//Db Connection
connectDB();


//API endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);

app.get("/", (req, res) =>{
    res.send("hello world");
})




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})