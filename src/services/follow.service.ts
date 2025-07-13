import mongoose, { ObjectId } from "mongoose";
import { IFollowRequest } from "../interfaces/FollowRequest.interface";
import { IUser } from "../interfaces/User.interface";
import User from "../models/User.model";
import DatabaseService from "../utils/database";
import FollowRequestModel from "../models/FollowRequest.model";

const db = new DatabaseService<IUser>(User);
const followRequestDb = new DatabaseService<IFollowRequest>(FollowRequestModel);

export const toggleFollowUser = async (
  userId: string,
  targetUserId: string
): Promise<{ action: "follow" | "unfollow"; user: IUser | null }> => {
  const user = await db.findById(userId);
  const targetUser = await db.findById(targetUserId);

  if (!user || !targetUser) {
    throw new Error("User or target user not found");
  }

  // Convert targetUserId to ObjectId for safe comparison
  const targetObjectId = new mongoose.Types.ObjectId(targetUserId);

  const isFollowing = user.following.some((id) =>
    id.equals(targetObjectId)
  );

  if (isFollowing) {
    // Unfollow
    await db.update(userId, {
      $pull: { following: targetObjectId },
      $inc: { followingCount: -1 },
    });
    await db.update(targetUserId, {
      $pull: { followers: user._id },
      $inc: { followerCount: -1 },
    });

    const updatedTargetUser = await db.findById(targetUserId);
    return { action: "unfollow", user: updatedTargetUser };
  } else {
    if (targetUser.isPrivate) {
      // Private profile: send follow request
      await db.update(targetUserId, {
        $addToSet: { followRequests: user._id },
      });
      return { action: "follow", user: null };
    } else {
      // Public profile: follow directly
      await db.update(userId, {
        $addToSet: { following: targetObjectId },
        $inc: { followingCount: 1 },
      });
      await db.update(targetUserId, {
        $addToSet: { followers: user._id },
        $inc: { followerCount: 1 },
      });

      const updatedTargetUser = await db.findById(targetUserId);
      return { action: "follow", user: updatedTargetUser };
    }

  }

};


export const getUserFollowers = async (userId: string): Promise<IUser[]> => {
  const user = await User.findById(userId)
    .populate("followers", "username profilePicture")
    .lean();

  return user?.followers as IUser[] || [];
};

export const getUserFollowing = async (userId: string): Promise<IUser[]> => {
  const user = await User.findById(userId)
    .populate("following", "username profilePicture")
    .lean();

  return user?.following as IUser[] || [];
};

export const sendFollowRequest = async (requesterId: string, recipientId: string): Promise<IFollowRequest> => {
  // Check if a follow request already exists

  const existingRequest = await FollowRequestModel.findOne({
    requester: requesterId,
    recipient: recipientId,
    status: 'pending'
  });

  if (existingRequest) {
    throw new Error('A follow request has already been sent');
  }

  const followRequest = await FollowRequestModel.create({
    requester: requesterId,
    recipient: recipientId,
    status: 'pending'
  });

  return followRequest;
};

export const acceptFollowRequest = async (requestId: string): Promise<IUser | null> => {
  const request = await followRequestDb.findById(requestId);
  if (!request || request.status !== 'pending') {
    throw new Error('Follow request not found or already processed');
  }

  await followRequestDb.update(requestId, { status: 'accepted' });

  // Add to followers and following lists
  await db.update(request.recipient, { $addToSet: { followers: request.requester }, $inc: { followerCount: 1 } });
  await db.update(request.requester, { $addToSet: { following: request.recipient }, $inc: { followingCount: 1 } });

  return await db.findById(request.requester);
};

export const rejectFollowRequest = async (requestId: string): Promise<IFollowRequest | null> => {
  const request = await followRequestDb.findById(requestId);
  if (!request || request.status !== 'pending') {
    throw new Error('Follow request not found or already processed');
  }

  return await followRequestDb.update(requestId, { status: 'rejected' });
};

export const getPendingFollowRequests = async (userId: string): Promise<IFollowRequest[] | []> => {
  const PendingRequest = await FollowRequestModel.find({ recipient: userId, status: 'pending' })
    .populate("requester", "username profilePicture");
  return PendingRequest as IFollowRequest[] || [];
};
