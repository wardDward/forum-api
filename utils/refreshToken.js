import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import Token from "../models/tokenModel.js";

const refreshToken = asyncHandler(async (req, res, next) => {
  let refreshToken = req.cookies["refreshToken"];
  console.log("refresh token");
  const decoded = jwtDecode(refreshToken);
  console.log(decoded);

  if (!refreshToken) {
    res.status(401);
    throw new Error("Access Denied. No refresh token provided.");
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    async (err, decoded) => {
      if (err) {
        res.status(403);
        throw new Error("Forbidden. Invalid refresh token.");
      }

      const existingToken = await Token.findOne({ refreshToken });

      if (!existingToken || existingToken.revoked) {
        res.clearCookie("refreshToken", { httpOnly: true });
        return res.status(403).send("Token invalid or revoked");
      }

      // convert date to seconds
      const existingTokenExpirationTimeSeconds = Math.floor(
        existingToken.expiresAt / 1000
      );

      console.log(existingTokenExpirationTimeSeconds);
      //check if the existing token is expired
      if (existingTokenExpirationTimeSeconds > decoded.exp * 1000) {
        await Token.findOneAndUpdate({ refreshToken }, { revoked: true });
        res.clearCookie("refreshToken", { httpOnly: true });
        return res.status(403).send("Token expired");
      }

      // add 7 days because date.now is milisecond formatted
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      // Generate new access token
      const newAccessToken = jwt.sign(
        { userID: decoded.userID },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "30s" }
      );

      // token rotation implementation
      // store new token
      await Token.create({
        user: decoded.userID,
        refreshToken,
        expiresAt,
        revoked: false,
      });

      // delete previous token
      await Token.deleteOne({ refreshToken });

      // new access token with 30s duration
      res.cookie("jwt_token", newAccessToken, { maxAge: 30000 });
      return res.status(204).send();
    }
  );
});

export default refreshToken;
