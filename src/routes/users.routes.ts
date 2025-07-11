import { Router } from "express";

const userRoute = Router();
// User Management APIs
userRoute.get("/profile");
userRoute.put("/profile");
userRoute.post("/upload-avatar");
userRoute.get("/:username");
userRoute.get("/search");
userRoute.get("/:userId/posts");
userRoute.delete("/account");

// Follow System APIs
userRoute.post("/:userId/follow");
userRoute.get("/:userId/followers");
userRoute.get("/:userId/following");
userRoute.post("/:userId/follow-request");
userRoute.put("/follow-requests/:requestId");
userRoute.get("/follow-requests");

export default userRoute;
