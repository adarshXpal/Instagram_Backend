import { IComment } from '../interfaces/Comment.interface';
import { IPost } from '../interfaces/Post.interface';
import PostModel from '../models/Post.model';
import CommentModel from '../models/Commment.model';
import DatabaseService from '../utils/database';

const commentDb = new DatabaseService<IComment>(CommentModel);
const postDb = new DatabaseService<IPost>(PostModel);

export const addComment = async (commentData: Partial<IComment>): Promise<IComment> => {
  const postDetail = await PostModel.findByIdAndUpdate(commentData.post, {
    $inc: { commentCount: 1 }
  });
  return await commentDb.create(commentData);
};

export const getPostComments = async (postId: string, page: number = 1, limit: number = 10): Promise<IComment[]> => {
  return await CommentModel.find({ post: postId, parentComment: null })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('user', 'username profilePicture')
    .exec();
};

export const updateComment = async (commentId: string, updateData: Partial<IComment>): Promise<IComment | null> => {
  return await commentDb.update(commentId, updateData);
};

export const deleteComment = async (commentId: string): Promise<IComment | null> => {

  const commentDeleted = await commentDb.delete(commentId);
  await PostModel.findByIdAndUpdate(commentDeleted?.post, {
    $inc: { commentCount: -1 }
  });
  return commentDeleted;
};

export const likeUnlikeComment = async (commentId: string, userId: string, action: 'like' | 'unlike'): Promise<IComment | null> => {
  const comment = await commentDb.findById(commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }

  const update = action === 'like'
    ? { $addToSet: { likes: userId }, $inc: { likeCount: 1 } }
    : { $pull: { likes: userId }, $inc: { likeCount: -1 } };

  return await commentDb.update(commentId, update);
};

export const replyToComment = async (commentId: string, replyData: Partial<IComment>): Promise<IComment> => {
  const reply = await commentDb.create({
    ...replyData,
    parentComment: commentId
  });

  await commentDb.update(commentId, { $push: { replies: reply._id } });

  return reply;
};
