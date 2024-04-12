import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = Schema({
  username: {
    type: String,
    required: [true, "Username is Required"],
    unique: [true, "Username is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: [true, "Email is Required"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified()) {
    next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isPasswordValid = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
