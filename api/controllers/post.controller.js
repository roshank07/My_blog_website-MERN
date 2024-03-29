import errorHandler from "../utils/error.js";
import Post from "../models/post.model.js";

const postController = {
  createPost: async (req, res, next) => {
    // console.log()
    if (!req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not authorized to create the post.")
      );
    }
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, "Please Provide all the required fields"));
    }
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");
    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
    });
    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      next(error);
    }
  },
  getPost: async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === "asc" ? 1 : -1;
      const posts = await Post.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: "i" } },
            { content: { $regex: req.query.searchTerm, $options: "i" } },
          ],
        }),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);

      const totalPosts = await Post.countDocuments();
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );

      const lastMonthPosts = await Post.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });

      res.status(200).json({posts,totalPosts,lastMonthPosts});
    } catch (error) {
      next(error);
    }
  },
  deletePost:async(req,res,next)=>{
    if(req.user.id!==req.params.userId||!req.user.isAdmin){
      return next(errorHandler(403,'You are not allowed to delete this Post.'));
    }
    try {
      await Post.findByIdAndDelete(req.params.postId);
      res.status(200).json('Your post has been deleted.')
      
    } catch (error) {
      next(error);
      
    }

  },
  updatePost:async(req,res,next)=>{
    if(req.user.id!==req.params.userId||!req.user.isAdmin){
      return next(errorHandler(403,'You are not allowed to Update this Post.'));
    }
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $set: {
            title: req.body.title,
            category: req.body.category,
            image: req.body.image,
            content:req.body.content
          },
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
      
    } catch (error) {
      next(error);
      
    }

  },
  likepost:async(req,res,next)=>{
    try {
      const post=await Post.findById(req.params.postId);
      if(!post){
        return next(errorHandler('Post not found.'));
      }
        const userIndex = post.likes.indexOf(req.user.id);
        if(userIndex === -1){
          post.numberOflikes+=1;
          post.likes.push(req.user.id);
        }
        else{
          post.numberOflikes-=1;
          post.likes.splice(userIndex,1);
        }
      await post.save();
      res.status(200).json(post);

      
    } catch (error) {
      next(error);
    }

  },
  savepost:async(req,res,next)=>{
    try {
      const post=await Post.findById(req.params.postId);
      if(!post){
        return next(errorHandler('Post not found.'));
      }
        const userIndex = post.saves.indexOf(req.user.id);
        if(userIndex === -1){
          post.numberOfsaves+=1;
          post.saves.push(req.user.id);
        }
        else{
          post.numberOfsaves-=1;
          post.saves.splice(userIndex,1);
        }
      await post.save();
      res.status(200).json(post);

      
    } catch (error) {
      next(error);
    }
  },
  getSavedPost: async (req, res, next) => {
    if(req.user.id!==req.query.userId){
      return next(errorHandler(403,'You are not allowed to see savedPost.'))
    }
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === "asc" ? 1 : -1;
      const posts = await Post.find({
        ...(req.query.userId && { saves: { $in: [req.query.userId] }}),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);

      const totalSavedPost=posts.length;
      res.status(200).json({posts,totalSavedPost});
    } catch (error) {
      next(error);
    }
  },
};

export default postController;
