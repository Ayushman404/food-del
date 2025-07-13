import mongoose  from "mongoose";


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, require: true},
    password: {type:String, require:true},
    cartData: {type: Object, default:{}}
},{minimize:false});

const userModel = mongoose.models.users || mongoose.model('user', userSchema);

export default userModel;

