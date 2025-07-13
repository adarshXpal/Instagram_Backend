import { IStory } from '../interfaces/Story.interface';
import Story from '../models/Story.model';
import DatabaseService from '../utils/database';

const storyDb = new DatabaseService<IStory>(Story);

export const createStory = async (storyData: Partial<IStory>): Promise<IStory> => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // Stories expire after 24 hours

  const story = await storyDb.create({
    ...storyData,
    expiresAt
  });

  return story;
};

export const getStoriesFeed = async (): Promise<IStory[]> => {
  return await Story.find({ expiresAt: { $gt: new Date() } })
    .sort({ createdAt: -1 })
    .populate('user', 'username profilePicture')
    .exec();
};

export const getUserStories = async (userId: string): Promise<IStory[]> => {
  return await Story.find({ user: userId, expiresAt: { $gt: new Date() } })
    .sort({ createdAt: -1 })
    .populate('user', 'username profilePicture')
    .exec();
};

export const markStoryAsViewed = async (storyId: string, userId: string): Promise<IStory | null> => {
  const story = await storyDb.findById(storyId);
  if (!story) {
    throw new Error('Story not found');
  }

  if (!story.viewers.includes(userId)) {
    await storyDb.update(storyId, {
      $addToSet: { viewers: userId },
      $inc: { viewCount: 1 }
    });
  }
  return await storyDb.findById(storyId);
};

export const deleteStory = async (storyId: string): Promise<IStory | null> => {
  return await storyDb.delete(storyId);
};
