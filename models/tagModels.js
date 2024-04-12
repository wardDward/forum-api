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

tagsSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

tagsSchema.index({ name: "text" });

export default mongoose.model("Tag", tagsSchema);
