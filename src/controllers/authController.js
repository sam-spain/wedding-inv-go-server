const User = require("../models/user");
const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleware/async");
const user = require("../models/user");

// @description Register user
// @route POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 200, res);

});

// @description Login User
// @route Post /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide and email and password", 400)
    );
  }

  const user = await User.findOne({ email: email }).select("+password");
  console.log(password);
  if (!user) {
    return next(new ErrorResponse("User", "Unauthorized", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    console.log("password didn't match");
    return next(new ErrorResponse("User", "Unauthorized", 401));
  }

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  res.status(statusCode).cookie("token", token, options).json(token);
} 