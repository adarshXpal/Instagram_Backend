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

import {
  createStoryController,
  getStoriesFeedController,
  getUserStoriesController,
  markStoryAsViewedController,
  deleteStoryController
} from "./story.controller";

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
  stories: {
    createStoryController,
    getStoriesFeedController,
    getUserStoriesController,
    markStoryAsViewedController,
    deleteStoryController
  },
};
