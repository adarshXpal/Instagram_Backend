import { Request, Response } from 'express';
import {
  createStory,
  getStoriesFeed,
  getUserStories,
  markStoryAsViewed,
  deleteStory
} from '../services/story.service';
import ResponseService from '../utils/response.utils';

export const createStoryController = async (req: Request, res: Response) => {
  try {
    const storyData = { ...req.body, user: req.user._id };
    const story = await createStory(storyData);
    ResponseService.success(res, story, 'Story created successfully', 201);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const getStoriesFeedController = async (req: Request, res: Response) => {
  try {
    const stories = await getStoriesFeed();
    ResponseService.success(res, stories, 'Stories feed retrieved successfully', 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const getUserStoriesController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const stories = await getUserStories(userId);
    ResponseService.success(res, stories, "User's stories retrieved successfully", 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const markStoryAsViewedController = async (req: Request, res: Response) => {
  try {
    const { storyId } = req.params;
    const userId = req.user?._id;

    const story = await markStoryAsViewed(storyId, userId);
    if (!story) {
      return ResponseService.error(res, 'Story not found', 404, {});
    }

    ResponseService.success(res, story, 'Story marked as viewed successfully', 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};

export const deleteStoryController = async (req: Request, res: Response) => {
  try {
    const { storyId } = req.params;
    const story = await deleteStory(storyId);
    if (!story) {
      return ResponseService.error(res, 'Story not found', 404, {});
    }
    ResponseService.success(res, story, 'Story deleted successfully', 200);
  } catch (error: any) {
    ResponseService.error(res, error.message, 400, error);
  }
};
