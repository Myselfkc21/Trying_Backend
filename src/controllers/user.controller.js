import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
const registerUser=asyncHandler(async(req,res)=>{
    const {fullname,username,email,password}=req.body;
    console.log(email);
    if((fullname || username||email||password)==""){
        throw new ApiError(400,"All fields are required")
    }
    if(!email.includes("@")){
        throw new ApiError(400,"Email is not valid")
    }

    const existingUser=User.findOne({
        $or:[{username},{email}]
    })

    if(existingUser){
        throw new ApiError(400,"user Alreay exists")
    }

})

export default registerUser  