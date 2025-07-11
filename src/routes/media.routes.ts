import { Router } from "express";

const mediaRouter = Router();

mediaRouter.post("/upload");
mediaRouter.post("/upload/multiple");
mediaRouter.delete("/:mediaId");

export default mediaRouter;
