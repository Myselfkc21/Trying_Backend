import dotenv from 'dotenv'
import connectDB from "./db/index.js"
import { error } from 'console'
import {app} from './app.js'
dotenv.config({
    path: './.env'
})


connectDB().then(() => {
    console.log("THE DB IS CONNECTED")
    app.listen(process.env.PORT , () => {
        console.log("server is running at " + process.env.PORT)
    })
    app.on("error", (error) => {
        console.log("db is connected but the express is unabel to communicate,, iin such cases 'on' listener is used")      //why app.on is used
        throw error
    })
})

// import express from 'express'
// import { error } from "console";
// const app=express();
// (async () => {
//     try {
//         await mongoose.connect("mongodb+srv://krishnachaitanya:6Vxk0NSSYMBq7iEF@cluster0.9llkziy.mongodb.net/videotube")
//         app.on("error",(error)=>{
//             console.log("db is connected but the express is unabel to communicate,, iin such cases "on" listener is used)      //why app.on is used
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