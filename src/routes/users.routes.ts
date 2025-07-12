import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import userController from "../controllers/user.controller";
import { followUserController } from "../controllers/follow.controller";

const userRoute = Router();
// User Management APIs
userRoute.get("/profile", authenticate, userController.getUserProfileController);
userRoute.put("/profile", authenticate, userController.updateUserProfileController);
// userRoute.post("/upload-avatar", authenticate,);
userRoute.get("/:username", authenticate, userController.getUserProfileByUsernameController);
userRoute.get("/search", authenticate, userController.searchUsersController);
// userRoute.get("/:userId/posts", authenticate)
userRoute.delete("/account", authenticate, userController.deleteUserAccountController);
//
// // Follow System APIs
userRoute.post("/:targetUserId/follow", authenticate, followUserController);
// userRoute.get("/:userId/followers");
// userRoute.get("/:userId/following");
// userRoute.post("/:userId/follow-request");
// userRoute.put("/follow-requests/:requestId");
// userRoute.get("/follow-requests");

export default userRoute;
