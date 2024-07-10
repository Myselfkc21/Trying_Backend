import dotenv from 'dotenv'
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js"

dotenv.config({
    path:'./.env'
})


connectDB();

// import express from 'express'
// import { error } from "console";
// const app=express();
// (async () => {
//     try {
//         await mongoose.connect("mongodb+srv://krishnachaitanya:6Vxk0NSSYMBq7iEF@cluster0.9llkziy.mongodb.net/videotube")
//         app.on("error",(error)=>{
//             console.log("error")
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log("APP LISTENING ON"+process.env.PORT);
//         })
//     } catch (error) {
//         console.log("EORROR" + error);
//         throw error;
//     }
// })()