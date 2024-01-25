import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import cors from "cors";


dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());
const PORT=process.env.PORT||3000;

mongoose.set('strictQuery', true);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.db_Url)
    .then(()=>{
        console.log("Connected to MongoDB database");
    })
    .catch((error)=>{
        console.log("Error connecting to MongoDB database",error)
    })

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);

app.use((err,req,res,next)=>{
const statusCode=err.statusCode||500;
const message=err.message||'Internal server error';
res.status(statusCode).json({
    success:false,
    statusCode:statusCode,
    message:message
})
})