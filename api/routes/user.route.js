import express from "express";
import userController from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const userRoute=express.Router();

userRoute.get('/test',userController.test);
userRoute.put('/update/:userId',verifyUser,userController.updateUser);
userRoute.delete('/delete/:userId',verifyUser,userController.deleteUser);
userRoute.post('/signout/:userId',verifyUser,userController.userSignout);
userRoute.get('/getusers',verifyUser,userController.getUsers);
userRoute.get('/:userId',userController.getUserbyId);

export default userRoute;