import { Document, ObjectId } from "mongoose";

export type RequestStatus = "pending" | "accepted" | "rejected";
export interface IFollowRequest extends Document {
  _id: ObjectId;
  requester: ObjectId;
  recipient: ObjectId;
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
}
