import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app=express();
app.use(express.json());
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