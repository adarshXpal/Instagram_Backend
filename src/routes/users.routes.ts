import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import userController from "../controllers/user.controller";
import { toggleFollowUserController, getUserFollowersController, getUserFollowingController, sendFollowRequestController, acceptFollowRequestController, rejectFollowRequestController, getPendingFollowRequestsController } from "../controllers/follow.controller";
import fs from "fs";
import multer from "multer";
import path from "path";
import { v4 as createUUID } from "uuid";


if (!fs.existsSync("avatar")) {
    fs.mkdirSync("avatar");
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "avatar/");
    },
    filename: function (req, file, cb) {
        const mediaId = createUUID().toUpperCase();
        const ext = path.extname(file.originalname);
        const filename = `${mediaId}${ext}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });
const userRoute = Router();
// User Management APIs
userRoute.get("/profile", authenticate, userController.getUserProfileController);
userRoute.put("/profile", authenticate, userController.updateUserProfileController);
userRoute.post("/upload-avatar", authenticate, upload.single("image"),userController.uploadAvatar);
userRoute.get("/:username", authenticate, userController.getUserProfileByUsernameController);
userRoute.get("/find/search", authenticate, userController.searchUsersController);
// userRoute.get("/:userId/posts", authenticate)
userRoute.delete("/account", authenticate, userController.deleteUserAccountController);
//
// // Follow System APIs
userRoute.post("/:targetUserId/follow", authenticate, toggleFollowUserController);
userRoute.get("/:userId/followers", authenticate, getUserFollowersController);
userRoute.get("/:userId/following", authenticate, getUserFollowingController);
userRoute.post("/:userId/follow-request", authenticate, sendFollowRequestController);
userRoute.get("/list/follow-requests", authenticate, getPendingFollowRequestsController);
userRoute.put("/follow-requests/:requestId/accept", authenticate, acceptFollowRequestController);
userRoute.put("/follow-requests/:requestId", authenticate, rejectFollowRequestController);

export default userRoute;
