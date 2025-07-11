import { Document, ObjectId } from "mongoose";

// interfaces/Post.interface.ts
export interface IPost extends Document {
    _id: ObjectId;
    user: ObjectId;
    caption?: string;
    imageUrl: string;
    location?: string;
    tags: string[];
    likes: ObjectId[];
    likeCount: number;
    commentCount: number;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
}