// interfaces/User.interface.ts
import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  fullName: string;
  bio?: string;
  profilePicture?: string;
  isVerified: boolean;
  isPrivate: boolean;
  followers: ObjectId[];
  following: ObjectId[];
  followerCount: number;
  followRequests: ObjectId[];
  followingCount: number;
  postCount: number;
  createdAt: Date;
  updatedAt: Date;
}
