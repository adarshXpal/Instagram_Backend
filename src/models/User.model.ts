import { IUser } from "interfaces/User.interface";
import { model, models, Schema } from "mongoose";

//Mongoose Schema
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    bio: { type: String },
    profilePicture: { type: String },
    isVerified: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followerCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    postCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const User = models.User || model<IUser>("User", userSchema);
export default User;
