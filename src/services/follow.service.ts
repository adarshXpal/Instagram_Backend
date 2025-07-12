import { IUser } from "../interfaces/User.interface";
import User from "../models/User.model";
import DatabaseService from "../utils/database";

const db = new DatabaseService<IUser>(User);

export const followUser = async (userId: string, targetUserId: string): Promise<IUser | null> => {
  const targetUser = await db.findById(targetUserId);
  if (!targetUser) {
    throw new Error("Target user not found");
  }
  if (targetUser.isPrivate) {
    targetUser.followRequests.push(userId);
    await targetUser.save();
    return null;
  } else {
    const user = await db.findById(userId);
    if (user) {
      user.following.push(targetUserId);
      targetUser.followers.push(userId);
      await user.save();
      await targetUser.save();
    }
    return targetUser;
  }
}
