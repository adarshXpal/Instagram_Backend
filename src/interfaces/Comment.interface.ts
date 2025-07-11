import { Document, ObjectId } from "mongoose";

//interfaces/Comment.interface.ts
export interface IComment extends Document {
    _id: ObjectId;
    post: ObjectId;
    user: ObjectId;
    text: string;
    likes: ObjectId[];
    likeCount: number;
    parentComment?: ObjectId;
    replies: ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
