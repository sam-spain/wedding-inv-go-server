const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../util/errorResponse");
const User = require("../models/user");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    // Will be removed later on to entirely be based around cookies
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(
      new ErrorResponse("Not authorized to perfom action", "Unauthorized", 401)
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (e) {
    return next(
      new ErrorResponse("Not authorized to perfom action", "Unauthorized", 401)
    );
  }
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role is ${req.user.role} is not authorized to perform this action.`,
          "Unauthorized Role",
          403
        )
      );
    }
    next();
  };
};
