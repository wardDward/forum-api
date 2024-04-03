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
    description: {
      type: String,
      required: [true, "Description title is required"],
    },
    tags: {
      type: Array,
      required: [true, "Tags are required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
