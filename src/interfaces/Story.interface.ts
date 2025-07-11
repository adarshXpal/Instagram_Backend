import { Document, ObjectId } from "mongoose";

//interfaces/Story.interface.ts
export type MediaType = "image" | "video";
export interface IStory extends Document {
    _id: ObjectId;
    user: ObjectId;
    mediaUrl: string;
    mediaType: MediaType;
    caption?: string;
    viewers: ObjectId[];
    viewCount: number;
    expiresAt: Date;
    createdAt: Date;
}
