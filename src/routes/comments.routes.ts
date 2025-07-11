import { Router } from "express";

export const postCommentRouter = Router();
export const commentRouter = Router();

//Post router with comments.
postCommentRouter.get("/:postId/comments");
postCommentRouter.post("/:postId/comments");
//comments routes
commentRouter.put("/:commentId");
commentRouter.delete("/:commentId");
commentRouter.post("/:commentId/like");
commentRouter.post("/:commentId/reply");

