import { Router } from "express";
import controllers from "../controllers";
import { authenticate } from "../middleware/auth.middleware";
import { updatePostController } from "controllers/post.controller";
import commentRouter from "./comments.routes";
import multer from "multer";
import path from "path";
import { v4 as createUUID } from "uuid";

import fs from "fs";
if (!fs.existsSync("posts")) {
    fs.mkdirSync("posts");
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "posts/");
    },
    filename: function (req, file, cb) {
        const postId = createUUID().toUpperCase();
        const ext = path.extname(file.originalname);
        const filename = `${postId}${ext}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

const postRouter = Router();

//Post Api's
postRouter.post("/", authenticate,upload.single("post") ,controllers.post.createPostController);
postRouter.get("/", authenticate, controllers.post.getFeedPostsController);
postRouter.get("/:postId", authenticate, controllers.post.getPostByIdController);
postRouter.put("/:postId", authenticate, controllers.post.updatePostController);
postRouter.delete("/:postId", authenticate, controllers.post.deletePostController);
postRouter.post("/:postId/like", authenticate, controllers.post.likeUnlikePostController);
postRouter.get("/:postId/likes", authenticate, controllers.post.getPostLikesController);
postRouter.get("/user/:userId", authenticate, controllers.post.getUserPostsController);
postRouter.post("/:postId/archive", authenticate, controllers.post.archiveUnarchivePostController);

export default postRouter;
