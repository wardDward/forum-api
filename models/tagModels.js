import mongoose, { Schema } from "mongoose";

const tagsSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tag", tagsSchema);
