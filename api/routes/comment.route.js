import express from "express";
import commentController from '../controllers/comment.controller.js';
import { verifyUser } from "../utils/verifyUser.js";

const commentRoute=express.Router();


commentRoute.post('/create',verifyUser,commentController.createComment);
commentRoute.get('/getPostComments/:postId',verifyUser,commentController.getComment);
commentRoute.put('/likeComment/:commentId/',verifyUser,commentController.likeComment);
commentRoute.put('/editComment/:commentId/',verifyUser,commentController.editComment);
commentRoute.delete('/deleteComment/:commentId',verifyUser,commentController.deleteComment);
commentRoute.get('/getComments',verifyUser,commentController.getComments);



export default commentRoute;
