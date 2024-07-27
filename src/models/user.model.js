import mongoose, { Schema } from "mongoose";
import { type } from "os";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
//creating the user schema or model
const userSchema = new Schema(
    {
        username: {
            required: true,
            type: String,
            unique: true,
            index: true,
            trim: true,
        },
        email: {
            required: true,
            type: String,
            unique: true,
            index: true,
            trim: true,
        },
        fullname: {
            required: true,
            type: String,
            index: true,
            trim: true,
        },
        avatar: {
            type: String,  //cloudinary url
            required: true
        },

        coverImage: {
            type: String, ////cloudinary url
        },

        watchHistory: [{
            type: Schema.Types.ObjectId,
            ref: "Video"
        }],

        password: {
            type: String,
            required: [true, 'password is required'],
        },

        refreshToken: {
            type: String,
        }
    },
    { timestamps: true }

)

//pre hook is a type of method that is executed just before an event or action,
//in this case, just before we save anything,we need to encrypt it
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.GenerateAccessToken=function(){
   return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.GenerateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User", userSchema);