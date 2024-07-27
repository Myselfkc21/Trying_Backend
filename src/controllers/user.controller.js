import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadToCloudinary} from "../utils/cloudinary.js"
import {Apiresponse} from "../utils/ApiResponse.js"
import { upload } from "../middlewares/multer.middleware.js";
const registerUser=asyncHandler(async(req,res)=>{

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res



    const {fullname,username,email,password}=req.body;
    console.log(email);
    //checking the user input if it is valid or not
    if((fullname || username||email||password)==""){
        throw new ApiError(400,"All fields are required")
    }
    if(!email.includes("@")){
        throw new ApiError(400,"Email is not valid")
    }

    //findOne is a mongoosee method, it takes 3 arguments-1.query Operators:$or,$and,$ne,$le
    //                                                    2.projection,in our case we are using fields/views
    //this findOne returs if a username or email is already present in the DB.
    const existingUser=User.findOne({
        $or:[{username},{email}]
    })

    if(existingUser){
        throw new ApiError(400,"user Alreay exists")
    }
    console.log(req.files)
    //handling of files like avatar and cover images.
    const avatarLoaclPath=req.files?.avatar[0]?.path;
    const coverImageLoaclPath=req.files?.coverImage[0]?.path;
    if(!avatarLoaclPath){
        throw new ApiError("400","Avata is required")
    }

    //its like we send the avatar and cover image to cloudinary, and cloudinary just stores 
    //the images on its server, and later when we create the user object we get the images 
    //url or address and map it to the user object
    const avatar=await uploadToCloudinary(avatarLoaclPath)
    const coverImage=await uploadToCloudinary(coverImageLoaclPath)
console.log(avatar)
    if(!avatar){
        throw new ApiError("400","Avatar is required")
    }

    //creating the object for the daatabase
    User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url,
        email:email,
        password:password,
        username:username.toLowercase()
    })
//now we are retieving the user info, but we dont need the password and token so we ignored it
    const createdUser=await User.findOne(
        "-password -refreshToken"
    )

    if(!createdUser){
       throw new ApiError(500,"something went wrong");
    }

    return res.status(201).json(
        new Apiresponse(200,createdUser,"User registered successfully")
    )
})

export default registerUser  