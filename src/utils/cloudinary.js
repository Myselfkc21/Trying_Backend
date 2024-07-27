import { v2 as cloudinary } from "cloudinary"
import { response } from "express";
import fs from "fs"
import { type } from "os";


// Configuration
cloudinary.config({
    cloud_name: "dcuewtztr",
    api_key: "321756847598638",
    api_secret:"77ApmKI-twKqGSS0fRhgua7fQV0" // Click 'View Credentials' below to copy your API secret
});

const uploadToCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath){ console.log("Heere is the problem");  return null}
       const response= await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
        //file is uploaded scucessfully 
        console.log("file is uploaded to cloudinary",response.url)
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        //removes locally save file from the server to avoid unnessary files
        fs.unlinkSync(localFilePath);
        console.log("did not happen")
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