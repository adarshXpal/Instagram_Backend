import { model, Schema } from 'mongoose';
import { IStory, MediaType } from '../interfaces/Story.interface';

const storySchema = new Schema<IStory>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mediaUrl: { type: String, required: true },
    mediaType: {
      type: String,
      enum: ['image', 'video'],
      required: true
    },
    caption: { type: String },
    viewers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    viewCount: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

storySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default model<IStory>('Story', storySchema);
