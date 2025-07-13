import { IPost } from '../interfaces/Post.interface';
import Post from '../models/Post.model';
import User from "../models/User.model";
import { IUser } from '../interfaces/User.interface';
import DatabaseService from '../utils/database';

const postDb = new DatabaseService<IPost>(Post);
const userDb = new DatabaseService<IUser>(User);

export const createPost = async (postData: Partial<IPost>): Promise<IPost> => {
  const userDetails = await User.findByIdAndUpdate(postData.user, {
    $inc: { postCount: 1 }
  });
  return await postDb.create(postData);
};

export const getFeedPosts = async (page: number = 1, limit: number = 10): Promise<IPost[]> => {
  return await Post.find({ isArchived: false })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('user', 'username profilePicture')
    .exec();
};

export const getPostById = async (postId: string): Promise<IPost | null> => {
  return await Post.findById(postId).populate('user', 'username profilePicture');
};

export const updatePost = async (postId: string, updateData: Partial<IPost>): Promise<IPost | null> => {
  return await postDb.update(postId, updateData);
};

export const deletePost = async (postId: string, userId: string): Promise<IPost | null> => {
  await User.findByIdAndUpdate(userId, {
    $inc: { postCount: -1 }
  });
  return await postDb.delete(postId);
};

export const likeUnlikePost = async (postId: string, userId: string, action: 'like' | 'unlike'): Promise<IPost | null> => {
  const post = await postDb.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }

  const update = action === 'like'
    ? { $addToSet: { likes: userId }, $inc: { likeCount: 1 } }
    : { $pull: { likes: userId }, $inc: { likeCount: -1 } };

  return await postDb.update(postId, update);
};

export const getPostLikes = async (postId: string): Promise<IPost | null> => {
  return await Post.findById(postId).populate('likes', 'username profilePicture');
};

export const getUserPosts = async (userId: string): Promise<IPost[]> => {
  return await Post.find({ user: userId, isArchived: false })
    .sort({ createdAt: -1 })
    .populate('user', 'username profilePicture')
    .exec();
};

export const archiveUnarchivePost = async (postId: string, action: 'archive' | 'unarchive'): Promise<IPost | null> => {
  const update = { isArchived: action === 'archive' };
  return await postDb.update(postId, update);
};
