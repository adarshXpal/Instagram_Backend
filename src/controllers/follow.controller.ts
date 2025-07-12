import { Request, Response } from "express";
import { followUser } from "../services/follow.service";
import ResponseService from "../utils/response.utils";

export const followUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const targetUserId = req.params.targetUserId;
    const result = await followUser(userId, targetUserId);
    if (result) {
      ResponseService.success(res, result, 'User followed successfully', 200);
    } else {
      ResponseService.success(res, {}, 'Follow request sent', 200);
    }
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};
