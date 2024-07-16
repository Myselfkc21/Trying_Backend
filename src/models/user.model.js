import mongoose, { Schema } from "mongoose";
import { type } from "os";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
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

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})



export const User = mongoose.model("User", userSchema);