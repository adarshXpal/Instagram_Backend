import { IPost } from "interfaces/Post.interface";
import { model, Schema } from "mongoose";

const postSchema = new Schema<IPost>(
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

export default model<IPost>("posts", postSchema);
