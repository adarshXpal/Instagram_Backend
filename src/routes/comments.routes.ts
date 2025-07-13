import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { addCommentController, getPostCommentsController, updateCommentController, deleteCommentController, likeUnlikeCommentController, replyToCommentController } from "../controllers/comment.controller";

const commentRouter = Router();

commentRouter.post('/posts/:postId/comments', authenticate, addCommentController);
commentRouter.get('/posts/:postId/comments', authenticate, getPostCommentsController);
commentRouter.put('/comments/:commentId', authenticate, updateCommentController);
commentRouter.delete('/comments/:commentId', authenticate, deleteCommentController);
commentRouter.post('/comments/:commentId/like', authenticate, likeUnlikeCommentController);
commentRouter.post('/comments/:commentId/reply', authenticate, replyToCommentController);

export default commentRouter;
