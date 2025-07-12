import {
    register,
    login,
    logout,
    refreshToken,
    forgotPasswordController,
} from "./auth.controller";

import {
    createPosts,
    getPosts,
    getPostById,
    updatePostById,
    deletePostById,
    likePostById,
    getPostLike,
    getPostByUserId,
    archivePost,
} from "./post.controller";

export default {
    auth: { register, login, logout, refreshToken, forgotPasswordController },
    post: {
        createPosts,
        getPosts,
        getPostById,
        updatePostById,
        deletePostById,
        likePostById,
        getPostLike,
        getPostByUserId,
        archivePost,
    },
};
