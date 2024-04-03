import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler((req, res, next) => {
  let accessToken = req.cookies["jwt_token"];

  if (!accessToken) {
    res.status(401);
    throw new Error("Access denied. No access token provided.");
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    (err, decoded) => {
      if (err === "TokenExpiredError") {
        res.status(403);
        throw new Error("Access Token Expired");
      }

      req.user = decoded.userID;
      console.log(req.user);
      console.log("decoded: ", decoded);
      next();
    }
  );
});

export default validateToken;
