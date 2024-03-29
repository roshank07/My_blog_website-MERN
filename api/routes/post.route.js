import express from "express";
import postController from "../controllers/post.controller.js";
import {verifyUser} from "../utils/verifyUser.js"

const postRoute=express.Router();
//  console.log("Inhere_routes");
postRoute.post('/create',verifyUser,postController.createPost);
postRoute.get('/getposts',postController.getPost);
postRoute.delete('/deletepost/:postId/:userId',verifyUser,postController.deletePost);
postRoute.put('/updatepost/:postId/:userId',verifyUser,postController.updatePost);
postRoute.put('/likepost/:postId',verifyUser,postController.likepost);
postRoute.put('/savepost/:postId',verifyUser,postController.savepost);
postRoute.get('/getsavedposts',verifyUser,postController.getSavedPost);

export default postRoute;