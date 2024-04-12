import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler((req, res, next) => {
  let accessToken = req.cookies["jwt_token"];

  if (!accessToken) {
    res.status(401);
    throw new Error("Access denied. No access token provided.");
  }

  if (req.authFlag === false){
    res.status(403);
    throw new Error("Authentication Restricted");
  }
  
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      (err, decoded) => {
        if (err === "TokenExpiredError") {
          res.status(403);
          throw new Error("Access Token Expired");
        }
        req.user = decoded.user;
        req.authFlag = true;
        next();
      }
    );
});

export default validateToken;
