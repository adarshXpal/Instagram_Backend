import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import controller from "../controllers"
const storiesRouter = Router();

storiesRouter.get("/", authenticate, controller.stories.getStoriesFeedController);
storiesRouter.post("/", authenticate, controller.stories.createStoryController);
storiesRouter.get("/user/:userId", authenticate, controller.stories.getUserStoriesController);
storiesRouter.post("/:storyId/view", authenticate, controller.stories.markStoryAsViewedController);
storiesRouter.delete("/:storyId", authenticate, controller.stories.deleteStoryController);

export default storiesRouter;
