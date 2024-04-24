import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Token from "../models/tokenModel.js";

const generateToken = asyncHandler((req, res, user) => {
  const userForToken = {
    _id: user._id,
    username: user.username,
    email: user.email,
    // Add other necessary fields if needed
  };
  const accessToken = jwt.sign(
    { user: userForToken },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "6h", // 1 hour expiry
    }
  );

  const refreshToken = jwt.sign(
    { user: userForToken },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: "7d" }
  );

  //expires at 7 days (converted in milliseconds)
  const expiresAt = new Date(Date.now() + 7 * 60 * 60 * 1000);

  // storing refresh token
  const newRefreshToken = new Token({
    user: user._id,
    refreshToken,
    expiresAt,
    revoked: false,
  });

  newRefreshToken.save();

  //cookie response
  res.cookie("jwt_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 3600000,
  }); // 1 hour expiry (3600 seconds * 1000 milliseconds)
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
});

export default generateToken;
