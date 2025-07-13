import { model, models, Schema } from 'mongoose';
import { IFollowRequest, RequestStatus } from '../interfaces/FollowRequest.interface';

const followRequestSchema = new Schema<IFollowRequest>(
  {
    requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
);
const FollowRequestModel = models.FollowRequest || model<IFollowRequest>("FollowRequest", followRequestSchema);

export default FollowRequestModel;
