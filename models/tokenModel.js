import mongoose, { Schema } from "mongoose";

const tokenSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    revoked: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Token", tokenSchema);
