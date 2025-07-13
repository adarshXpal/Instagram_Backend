import { Request, Response } from 'express';
import { toggleFollowUser, getUserFollowers, getuserFollowing, getUserFollowing, sendFollowRequest, acceptFollowRequest, rejectFollowRequest, getPendingFollowRequests } from '../services/follow.service';
import ResponseService from '../utils/response.utils';
import { ObjectId } from 'mongoose';

export const toggleFollowUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const targetUserId = req.params.targetUserId;

    const { action, user } = await toggleFollowUser(userId, targetUserId);

    if (action === 'follow') {
      if (user) {
        ResponseService.success(res, user, 'User followed successfully', 200);
      } else {
        ResponseService.success(res, {}, 'Follow request sent', 200);
      }
    } else if (action === 'unfollow') {
      ResponseService.success(res, user, 'User unfollowed successfully', 200);
    }
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const getUserFollowersController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const followers = await getUserFollowers(userId);
    ResponseService.success(res, followers, "User followers list retrived successfully", 200);
  }
  catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
}

export const getUserFollowingController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const followers = await getUserFollowing(userId);
    ResponseService.success(res, followers, "User following list retrived successfully", 200);
  }
  catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
}

export const sendFollowRequestController = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { userId: recipientId } = req.params;

    const followRequest = await sendFollowRequest(userId, recipientId);
    ResponseService.success(res, followRequest, 'Follow request sent successfully', 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const acceptFollowRequestController = async (req: Request, res: Response) => {
  try {
    const requestId = req.params.requestId;

    const user = await acceptFollowRequest(requestId);
    ResponseService.success(res, user, 'Follow request accepted successfully', 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const rejectFollowRequestController = async (req: Request, res: Response) => {
  try {
    const requestId = req.params.requestId;

    const request = await rejectFollowRequest(requestId);
    ResponseService.success(res, request, 'Follow request rejected successfully', 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const getPendingFollowRequestsController = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const pendingRequests = await getPendingFollowRequests(userId);
    ResponseService.success(res, pendingRequests, 'Pending follow requests retrieved successfully', 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};
