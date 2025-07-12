import { Router } from "express";
import controllers from "../controllers";

const postRouter = Router();

//Post Api's
postRouter.post("/", controllers.post.createPosts);
postRouter.get("/", controllers.post.getPosts);
postRouter.get("/:postId", controllers.post.getPostById);
postRouter.put("/:postId", controllers.post.updatePostById);
postRouter.delete("/:postId", controllers.post.deletePostById);
postRouter.post("/:postId/like", controllers.post.likePostById);
postRouter.get("/:postId/like", controllers.post.getPostLike);
postRouter.get("/user/:userId", controllers.post.getPostByUserId);
postRouter.post("/:postId/archive", controllers.post.archivePost);

export default postRouter;
