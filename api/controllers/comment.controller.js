import errorHandler from "../utils/error.js";
import Comment from "../models/comment.model.js";

const commentController = {
  createComment: async (req, res, next) => {
    const { postId, userId, content } = req.body;

    if (req.user.id != userId) {
      return next(errorHandler(403, "You are not allowed to Comment."));
    }
    try {
      const newComment = new Comment({
        userId,
        postId,
        content,
      });
      await newComment.save();
      res.status(200).json(newComment);
    } catch (error) {
      next(error);
    }
  },
};
export default commentController;
