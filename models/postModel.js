import mongoose, { Schema } from "mongoose";

const postSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Post title is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
