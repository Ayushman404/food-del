import { deserialize } from "v8";
import foodModel from "../models/foodModel.js";
import fs from 'fs';

//Add food item

export const addFood = async (req, res)=>{

    let image_filename = `${req.file.filename}`;
    
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category 

    })

    try{
        await food.save();
        res.status(200).json({
            success: true,
            message: "Food Item added successfully"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in adding food item",
            error: error.message
        })

    }
}


export const listFood = async (req, res) => {
    const foods = await foodModel.find({});
    try{
        res.status(200).json({
            success: true,
            message: "Food items fetched successfully",
            data: foods
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in fetching food items",
            error: error.message
        })
    }
}

export const removeFood = async (req, res) =>{
    try{
        const data = req.body;
        // console.log(data);
        const foodId = data.id;
        const food = await foodModel.findByIdAndDelete(foodId);
        fs.unlink(`uploads/${food.image}`, ()=>{})
        
        res.status(200).json({
            success: true,
            message: "Food item deleted successfully"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in deleting food item",
            error: error.message
        })
    }

}