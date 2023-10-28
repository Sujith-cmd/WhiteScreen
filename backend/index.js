import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import userRoutes from "./Routes/userRoutes.js"
import vendorRoutes from "./Routes/vendorRoutes.js"
dotenv.config()
const app=express()
mongoose.connect
const connect= async (req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("connected db");
    }catch(err){
        console.log(err.message);
    }
    }
app.use(cookieParser())
app.use(express.json())
app.use("/api/users",userRoutes)
app.use("/api/vendors",vendorRoutes)
app.get("/",(req,res,next)=>{
    let a=process.env.SECRET
console.log("hellllooo");
console.log(`${a}`);
    res.send(`${a}`)
})

app.listen(5000,()=>{
    try {
        connect()
    } catch (error) {
        console.log(" error ",error.message);
    }
    console.log("backend started");
})