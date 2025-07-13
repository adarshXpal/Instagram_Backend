import { Request, Response } from 'express';
import {
  createPost,
  getFeedPosts,
  getPostById,
  updatePost,
  deletePost,
  likeUnlikePost,
  getPostLikes,
  getUserPosts,
  archiveUnarchivePost
} from '../services/post.service';
import ResponseService from '../utils/response.utils';

export const createPostController = async (req: Request, res: Response) => {
  try {
    const postFile = req.file;
    if (!postFile) return ResponseService.error(res, "Post not found", 400, {});

    const filename = postFile?.filename;
    const fileUrl = `${req.protocol}://${req.get("host")}/posts/${filename}`;

    const postData = { ...req.body, user: req.user._id, imageUrl: fileUrl };
    const post = await createPost(postData);
    ResponseService.success(res, post, 'Post created successfully', 201);
  } catch (error: any) {
    ResponseService.error(res, error.message, 500, error);
  }
};

export const getFeedPostsController = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const posts = await getFeedPosts(Number(page), Number(limit));
    ResponseService.success(res, posts, 'Feed posts retrieved successfully', 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const getPostByIdController = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await getPostById(postId);
    if (!post) {
      return ResponseService.error(res, 'Post not found', 404, {});
    }
    ResponseService.success(res, post, 'Post retrieved successfully', 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const updatePostController = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await updatePost(postId, req.body);
    if (!post) {
      return ResponseService.error(res, 'Post not found', 404, {});
    }
    ResponseService.success(res, post, 'Post updated successfully', 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const deletePostController = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;
    const post = await deletePost(postId, userId);
    if (!post) {
      return ResponseService.error(res, 'Post not found', 404, {});
    }
    ResponseService.success(res, post, 'Post deleted successfully', 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const likeUnlikePostController = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { action } = req.body;
    const userId = req.user?._id;

    if (!action || (action !== 'like' && action !== 'unlike')) {
      return ResponseService.error(res, "Action must be either 'like' or 'unlike'", 400, {});
    }

    const post = await likeUnlikePost(postId, userId, action);
    if (!post) {
      return ResponseService.error(res, 'Post not found', 404, {});
    }

    const message = action === 'like' ? 'Post liked successfully' : 'Post unliked successfully';
    ResponseService.success(res, post, message, 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const getPostLikesController = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await getPostLikes(postId);
    if (!post) {
      return ResponseService.error(res, 'Post not found', 404, {});
    }
    ResponseService.success(res, post.likes, 'Post likes retrieved successfully', 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const getUserPostsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const posts = await getUserPosts(userId);
    ResponseService.success(res, posts, "User's posts retrieved successfully", 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const archiveUnarchivePostController = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { action } = req.body;

    if (!action || (action !== 'archive' && action !== 'unarchive')) {
      return ResponseService.error(res, "Action must be either 'archive' or 'unarchive'", 400, {});
    }

    const post = await archiveUnarchivePost(postId, action);
    if (!post) {
      return ResponseService.error(res, 'Post not found', 404, {});
    }

    const message = action === 'archive' ? 'Post archived successfully' : 'Post unarchived successfully';
    ResponseService.success(res, post, message, 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};
