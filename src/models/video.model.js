import mongoose,{Schema} from "mongoose";
import { type } from "os";

const userSchema=new Schema(
    {
        username:{
            required:true,
            type: String,
            unique: true,
            index: true,
            trim: true,
        },
        email:{
            required:true,
            type: String,
            unique: true,
            index: true,
            trim: true,
        },
        fullname:{
            required:true,
            type: String,
            index: true,
            trim: true,
        },
        avatar:{
            type: String,  //cloudinary url
            required: true
        },

        coverImage:{
            type: String, ////cloudinary url
        },

        watchHistory:{
            type:Schema.Types.ObjectId,
            ref:"Video"
        }


    }

)

export const User=mongoose.model("User",userSchema);