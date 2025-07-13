import { Router } from "express";
import controllers from "../controllers";
import { authenticate } from "../middleware/auth.middleware";
import { updatePostController } from "controllers/post.controller";
import commentRouter from "./comments.routes";
const postRouter = Router();

//Post Api's
postRouter.post("/", authenticate, controllers.post.createPostController);
postRouter.get("/", authenticate, controllers.post.getFeedPostsController);
postRouter.get("/:postId", authenticate, controllers.post.getPostByIdController);
postRouter.put("/:postId", authenticate, controllers.post.updatePostController);
postRouter.delete("/:postId", authenticate, controllers.post.deletePostController);
postRouter.post("/:postId/like", authenticate, controllers.post.likeUnlikePostController);
postRouter.get("/:postId/likes", authenticate, controllers.post.getPostLikesController);
postRouter.get("/user/:userId", authenticate, controllers.post.getUserPostsController);
postRouter.post("/:postId/archive", authenticate, controllers.post.archiveUnarchivePostController);

export default postRouter;
