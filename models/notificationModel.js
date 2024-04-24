import mongoose, { Schema } from "mongoose";

const notificationSchema = Schema(
  {
    sender_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    receiver_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    about: {
      type: String,
      required: true,
    },
    read: { type: Boolean, default: false },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
