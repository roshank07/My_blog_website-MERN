import express from "express";
import commentController from '../controllers/comment.controller.js';
import { verifyUser } from "../utils/verifyUser.js";

const commentRoute=express.Router();


commentRoute.post('/create',verifyUser,commentController.createComment);

export default commentRoute;
