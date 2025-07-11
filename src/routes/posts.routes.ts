import { Router } from "express";

const postRouter = Router();

//Post Api's
postRouter.post("/");
postRouter.get("/");
postRouter.get("/:postId");
postRouter.put("/:postId");
postRouter.post("/:postId/like");
postRouter.post("/:postId/like");
postRouter.get("/:postId/like");
postRouter.get("/user/:userId");
postRouter.post("/:postId/archive");

export default postRouter;
