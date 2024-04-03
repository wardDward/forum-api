import { constants } from "../utils/statusConstant.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  let message = err.message;
  let stack = process.env.NODE_ENV === "production" ? null : err.stack;
  switch (statusCode) {
    case constants.BAD_REQUEST:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "unauthorized",
        message,
        stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "forbidden",
        message,
        stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "not found",
        message,
        stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "server error",
        message,
        stack,
      });
      break;
    default:
      console.log("No Error Occured");
      break;
  }
};

export { errorHandler };
