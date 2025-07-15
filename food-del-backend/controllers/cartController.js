import userModel from '../models/userModel.js';

export const addToCart = async (req, res) => {
    const { itemId} = req.body;
    const userId = req.userId;

    try {
        let user = await userModel.findOne({_id:userId});
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        // Check if item already exists in cart
        const cartData = await user.cartData;
        if(!cartData[itemId]){
            cartData[itemId] = 1;
        }
        else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
        return res.status(200).json({success: true, message: "Item Added Successfully"})
    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}

export const removeFromCart = async (req, res) => {
    const {itemId} = req.body;
    const userId = req.userId;

    try {
        let user = await userModel.findOne({_id: userId});
        if(!user){
            return res.status(403).json({success:false, message: "Error getting user"});
        }
        const cartData = user.cartData;
        //removing the item id
        const updatedCart = {...cartData};
        if(updatedCart[itemId] === 1){
            //delete the item from DB
            delete updatedCart[itemId];
        }else{
            updatedCart[itemId] -= 1;
        }

        //updating the cartData
        await userModel.findByIdAndUpdate(userId, {cartData: updatedCart});
        return res.status(200).json({success: true, message: "Item removed successfully"});
    } catch (error) {
        console.log("Error removing item", error);
        return res.status(500).json({success: false, message:"Error occured Removing cartItem"})
    }
}

export const getCartItems = async (req, res) => {
    const userId = req.userId;

    try {
        let user = await userModel.findOne({_id: userId});
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        const cartData = user.cartData;
        if(!cartData || Object.keys(cartData).length === 0){
            return res.status(200).json({success: true, message: "Cart is empty", data: {}});
        }
        return res.status(200).json({success: true, message: "Cart fetched successfully", data: cartData});
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}