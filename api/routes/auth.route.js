import express from "express";
import authController from "../controllers/auth.controller.js";

const authRoute=express.Router();
//  console.log("Inhere_routes");
authRoute.post('/signup',authController.signUp);
authRoute.post('/signin',authController.signIn);
authRoute.post('/google',authController.googleSignIn);


export default authRoute;