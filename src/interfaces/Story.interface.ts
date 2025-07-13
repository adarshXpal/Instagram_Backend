import { Document, ObjectId } from "mongoose";

export type MediaType = "image" | "video";
export interface IStory extends Document {
  _id: ObjectId;
  user: ObjectId;
  mediaUrl: string;
  caption?: string;
  viewers: ObjectId[];
  viewCount: number;
  expiresAt: Date;
  createdAt: Date;
}
