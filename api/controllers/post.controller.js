import errorHandler from "../utils/error.js";
import Post from "../models/post.model.js";


const postController = {
    createPost:async(req,res,next)=>{
        // console.log()
        if(!req.user.isAdmin){
            return next(errorHandler(403,'You are not authorized to create the post.'))
        }
        if(!req.body.title||!req.body.content){
            return next(errorHandler(400,'Please Provide all the required fields'))
        }
        const slug=req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'');
        const newPost=new Post({
            ...req.body,
            slug,
            userId:req.user.id
        });
        try {
            const savedPost=await newPost.save();
            res.status(201).json(savedPost);
            
        } catch (error) {
            next(error);
            
        }
    },

}

export default postController