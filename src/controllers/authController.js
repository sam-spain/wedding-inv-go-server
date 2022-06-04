const User = require("../models/user");
const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleware/async");

// @description Register user
// @route GET /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  res.status(200).json({});
});
