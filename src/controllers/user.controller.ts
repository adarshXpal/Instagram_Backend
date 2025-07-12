import { Request, Response } from "express";
import userService from "../services/user.service";
import ResponseService from "../utils/response.utils";

const getUserProfileController = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const user = await userService.getUserProfile(userId);
    if (!user) {
      ResponseService.error(res, "User not found", 404, {});
    }
    ResponseService.success(res, user, "User profile retrieved successfully", 200);
  } catch (err) {
    ResponseService.error(res, "something went wrong !!", 500, err);
  };
};

const updateUserProfileController = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const user = await userService.updateUserProfile(userId, req.body);
    if (!user) {
      return ResponseService.error(res, "User not found", 404, {});
    }
    ResponseService.success(res, user, "User profile updated successfully !!", 200);
  } catch (err) {
    ResponseService.error(res, "something went wrong !!", 500, err);
  }
}

const getUserProfileByUsernameController = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await userService.getUserProfileByUsername(username);
    if (!user) {
      return ResponseService.error(res, "User not found", 404, {});
    }
    ResponseService.success(res, user, "Profile successfully get extracted by Username !!", 200);
  } catch (err) {
    ResponseService.error(res, "something went wrong !!", 500, err);
  }
}

const searchUsersController = async (req: Request, res: Response) => {
  try {
    const { q: query } = req.query;
    if (!query) {
      return ResponseService.error(res, "Query parameter is required !!", 400, {});
    }
    const users = await userService.searchUsers(query as string);
    ResponseService.success(res, users, "Users retrieved successfully !!", 200);
  } catch (err) {
    ResponseService.error(res, "something went wrong !!", 500, err);
  }
}
export default { getUserProfileController, updateUserProfileController, getUserProfileByUsernameController, searchUsersController };


