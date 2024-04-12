import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { body, validationResult } from "express-validator";
import generateToken from "../utils/generateToken.js";

const registerValidator = [
  body("username", "Username is required").not().isEmpty().escape(),
  body("email", "Email is required").not().isEmpty().escape(),
  body("password", "Password is required").not().isEmpty().escape(),
];

const loginValidator = [
  body("email", "Email is required").not().isEmpty().escape(),
  body("password", "Password is required").not().isEmpty().escape(),
];

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    res.status(400);
    throw new Error(
      existingUser.email === email
        ? "Email already exists"
        : "Username already exists"
    );
  }
  const createdUser = await User.create({
    username,
    email,
    password,
  });

  return res.status(201).json({
    user: {
      _id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const errors = validationResult(req);

  if (!email || !password)
    return res.status(422).json({
      errors: {
        ...(email ? {} : { email: ["Email is required"] }),
        ...(password ? {} : { password: ["Password is required"] }),
      },
    });

  if (!user) {
    return res.status(422).json({ errors: [{ email: "Email Not Found" }] });
  }

  if (user && (await user.isPasswordValid(password))) {
    generateToken(req, res, user);
    return res.status(200).json({
      user: {
        email: user.email,
      },
      message: "Login Successfully",
    });
  } else {
    return res
      .status(422)
      .json({ errors: [{ message: "Invalid email or password" }] });
  }
});

const authenticatedUser = asyncHandler((req, res) => {
  const user = req.user;
  const authFlag = req.authFlag;
  return res.status(200).json({
    user: user,
    authFlag: authFlag,
  });
});

export {
  authenticatedUser,
  loginUser,
  registerUser,
  registerValidator,
  loginValidator,
};
