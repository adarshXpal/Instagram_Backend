import {
  register,
  login,
  logout,
  refreshToken,
  forgotPasswordController,
} from "./auth.controller";

import {
  createPostController,
  getFeedPostsController,
  getPostByIdController,
  updatePostController,
  deletePostController,
  likeUnlikePostController,
  getPostLikesController,
  getUserPostsController,
  archiveUnarchivePostController
} from "./post.controller";

export default {
  auth: { register, login, logout, refreshToken, forgotPasswordController },
  post: {
    createPostController,
    getFeedPostsController,
    getPostByIdController,
    updatePostController,
    deletePostController,
    likeUnlikePostController,
    getPostLikesController,
    getUserPostsController,
    archiveUnarchivePostController
  },
};
