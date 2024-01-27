import express from "express";
import userController from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const userRoute=express.Router();

userRoute.get('/test',userController.test);
userRoute.put('/update/:userId',verifyUser,userController.updateUser);

export default userRoute;