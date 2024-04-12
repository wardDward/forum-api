const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  let message = err.message;
  let stack = process.env.NODE_ENV === "production" ? null : err.stack;

  res.status(statusCode).json({
    message,
    statusCode,
    stack,
  });
};

export { errorHandler, notFoundHandler };
