import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import controller from "../controllers"
const storiesRouter = Router();

import multer from "multer";
import path from "path";
import { v4 as createUUID } from "uuid";

import fs from "fs";
if (!fs.existsSync("story")) {
    fs.mkdirSync("story");
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "story/");
    },
    filename: function (req, file, cb) {
        const storyId = createUUID().toUpperCase();
        const ext = path.extname(file.originalname);
        const filename = `${storyId}${ext}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

storiesRouter.get("/", authenticate, controller.stories.getStoriesFeedController);
storiesRouter.post("/", authenticate,upload.single('story'), controller.stories.createStoryController);
storiesRouter.get("/user/:userId", authenticate, controller.stories.getUserStoriesController);
storiesRouter.post("/:storyId/view", authenticate, controller.stories.markStoryAsViewedController);
storiesRouter.delete("/:storyId", authenticate, controller.stories.deleteStoryController);

export default storiesRouter;
