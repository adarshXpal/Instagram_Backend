import { Request, Response } from 'express';
import { IUser } from "../interfaces/User.interface";
interface AuthenticatedRequest extends Request {
  user: IUser;
}
import {
  addComment,
  getPostComments,
  updateComment,
  deleteComment,
  likeUnlikeComment,
  replyToComment
} from '../services/comment.service';
import ResponseService from '../utils/response.utils';

export const addCommentController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const commentData = { ...req.body, user: req.user._id, post: req.params.postId };
    const comment = await addComment(commentData);
    ResponseService.success(res, comment, 'Comment added successfully', 201);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const getPostCommentsController = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const comments = await getPostComments(postId, Number(page), Number(limit));
    ResponseService.success(res, comments, 'Post comments retrieved successfully', 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const updateCommentController = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const comment = await updateComment(commentId, req.body);
    if (!comment) {
      return ResponseService.error(res, 'Comment not found', 404, {});
    }
    ResponseService.success(res, comment, 'Comment updated successfully', 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const deleteCommentController = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const comment = await deleteComment(commentId);
    if (!comment) {
      return ResponseService.error(res, 'Comment not found', 404, {});
    }
    ResponseService.success(res, comment, 'Comment deleted successfully', 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const likeUnlikeCommentController = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.commentId;
    const { action } = req.body;
    const userId = req.user?._id;

    if (!action || (action !== 'like' && action !== 'unlike')) {
      return ResponseService.error(res, "Action must be either 'like' or 'unlike'", 400, {});
    }

    const comment = await likeUnlikeComment(commentId, userId, action);
    if (!comment) {
      return ResponseService.error(res, 'Comment not found', 404, {});
    }

    const message = action === 'like' ? 'Comment liked successfully' : 'Comment unliked successfully';
    ResponseService.success(res, comment, message, 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const replyToCommentController = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const replyData = { ...req.body, user: req.user._id };
    const reply = await replyToComment(commentId, replyData);
    ResponseService.success(res, reply, 'Replied to comment successfully', 201);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};
