import mongoose, { Schema } from "mongoose";

const PostViewSchema = Schema(
  {
    post_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Posts",
      },
    ],
    user_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamp: true }
);

export default mongoose.model("PostView", PostViewSchema);
