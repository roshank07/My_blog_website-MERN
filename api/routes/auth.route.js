import express from "express";
import authController from "../controllers/auth.controller.js";

const authRoute=express.Router();
// console.log("Inhere");
authRoute.get('/signup',authController.signUp);

export default authRoute;