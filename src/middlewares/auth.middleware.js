import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";


export const verifyJWT=asyncHandler(async(req,res,next)=>{
try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","");
    
        if(!token){
            throw new ApiError(401,"unauthorized req");
        }
    
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user=User.findById(decodedToken).select("-password - refreshToken")
    
        if(!user){
            throw new ApiError(401,"Invalid access Token")
        }
    
        req.user=user;
        next();
} catch (error) {
    throw new ApiError(404,error.message||"invalid access token")
}
})