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
  getComment: async (req, res, next) => {
    // const {postId}=
    try {
      const allComment = await Comment.find({ postId: req.params.postId }).sort(
        { createdAt: -1 }
      );
      res.status(200).json(allComment);
    } catch (error) {
      next(error);
    }
  },
  likeComment: async (req, res, next) => {
    // if (req.user.id != req.body.userId) {
    //   return next(
    //     errorHandler(403, "You are not allowed to like. Please Sign In")
    //   );
    // }
    try {
      const comment = await Comment.findById(req.params.commentId);

      if (!comment) {
        return next(errorHandler(404, "Comment not found."));
      }

      const userIndex = comment.likes.indexOf(req.user.id);
      if (userIndex === -1) {
        comment.numberOflikes+=1;
        comment.likes.push(req.user.id);
      } else {
        comment.numberOflikes-=1;
        comment.likes.splice(userIndex, 1);
      }

      await comment.save();
      res.status(200).json(comment);

    } catch (error) {
      next(error);
    }
  },
};
export default commentController;
