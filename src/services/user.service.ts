import { IUser } from "../interfaces/User.interface";
import User from "../models/User.model";

const getUserProfile = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId).select("-password").exec();
};

const updateUserProfile = async (userId: string, updateData: Partial<IUser>): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password").exec();
};

const getUserProfileByUsername = async (username: string): Promise<IUser | null> => {
  return await User.findOne({ username }).select("-password").exec();
}

const searchUsers = async (query: string): Promise<IUser[]> => {
  return await User.find({
    $or: [
      { username: { $regex: query, $options: 'i' } },
      { fullName: { $regex: query, $options: 'i' } }
    ]
  }).select("-password").exec();
}

const deleteUserAccount = async (userId: string): Promise<void> => {
  await User.findByIdAndDelete(userId).exec();
}

export default { getUserProfile, updateUserProfile, getUserProfileByUsername, searchUsers, deleteUserAccount };
