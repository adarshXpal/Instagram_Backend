import { IPost } from "interfaces/Post.interface";
import { Schema } from "mongoose";

export const postSchema = new Schema<IPost>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        caption: { type: String },
        imageUrl: { type: String, required: true },
        location: { type: String },
        tags: [{ type: String }],
        likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
        likeCount: { type: Number, default: 0 },
        commentCount: { type: Number, default: 0 },
        isArchived: { type: Boolean, default: false },
    },
    { timestamps: true }
);
