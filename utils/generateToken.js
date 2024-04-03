import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Token from "../models/tokenModel.js";

const generateToken = asyncHandler((res, userID) => {
  // generate a access token
  const accessToken = jwt.sign(
    { userID },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "10s",
    }
  );

  // generate a refreshToken
  const refreshToken = jwt.sign(
    { userID },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: "7d" }
  );

  //expires at 7 days (converted in milliseconds)
  const expiresAt = new Date(Date.now() + 7 * 60 * 60 * 1000);

  // storing refresh token
  const newRefreshToken = new Token({
    user: userID,
    refreshToken,
    expiresAt,
    revoked: false,
  });
  newRefreshToken.save();

  //cookie response
  res.cookie("jwt_token", accessToken, { maxAge: 60000 });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  return res.status(204).send();
});

export default generateToken;
