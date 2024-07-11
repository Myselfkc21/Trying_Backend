import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import exp from 'constants';
const app=express();

app.use(cors());
app.use(express.json({limit:"20kb"}))   //.jason function basically reads the data and return error if the limit is exceded
app.use(express.urlencoded({extended:true,limit:"20kb"}))    //he express.urlencoded() middleware reads URL-encoded data (often sent from HTML forms) and converts it into a format that can be easily accessed in your Express application.
app.use(express.static("public"))
app.use(cookieParser())
export {app};