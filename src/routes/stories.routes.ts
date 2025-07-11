import { Router } from "express";

const storiesRouter = Router();

storiesRouter.get("/");
storiesRouter.post("/");
storiesRouter.get("/user/:userId");
storiesRouter.post("/:storyId/view");
storiesRouter.delete("/storyId");

export default storiesRouter;
