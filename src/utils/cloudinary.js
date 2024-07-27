import { v2 as cloudinary } from "cloudinary"
import { response } from "express";
import fs from "fs"
import { type } from "os";


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

const uploadToCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath) return null
       const response= await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
        //file is uploaded scucessfully 
        console.log("file is uploaded to cloudinary",response.url)
        return response
    } catch (error) {
        //removes locally save file from the server to avoid unnessary files
        fs.unlinkSync(localFilePath);
        return null
    }


} 

export {uploadToCloudinary}







// const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });