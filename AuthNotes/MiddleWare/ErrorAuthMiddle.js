//Catch all middleware for handling errors in the application. This middleware will catch any unhandled errors and return a JSON response with the error message.
//Attached via app.use(errorHandler)
//called with next(error) in the routes
const errorHandler = (error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

export default errorHandler;
