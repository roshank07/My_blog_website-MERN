import express from "express";
import userController from "../controllers/user.controller.js";

const userRoute=express.Router();

userRoute.get('/test',userController.test);

export default userRoute;