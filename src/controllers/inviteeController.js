const Invitee = require("../models/invitee");
const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleware/async");

// @description Get all people invited
// @route       GET /api/v1/invitee
exports.getInvitees = asyncHandler(async (req, res, next) => {
  const excludedParams = ["select"];
  const requestQuery = { ...req.query };
  excludedParams.forEach((param) => delete requestQuery[param]);

  let queryStr = JSON.stringify(requestQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  let query = Invitee.find(JSON.parse(queryStr));

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  const invitees = await query;
  res.status(200).json(invitees);
});

// @description Get person invited by ID
// @route       GET /api/v1/invitee/:id
exports.getInvitee = asyncHandler(async (req, res, next) => {
  const foundInvitee = await Invitee.findById(req.params.id);
  if (foundInvitee) res.status(200).json(foundInvitee);
  else
    return next(new ErrorResponse("Invitee", "NotFoundError", req.params.id));
});

// @description Invite new person
// @route       POST /api/v1/invitee
exports.createInvitee = asyncHandler(async (req, res, next) => {
  console.log("Create");
  const newInvitee = await Invitee.create(req.body);
  res.status(201).json(newInvitee);
});

// @description Update existing invitee
// @route       PUT /api/v1/invitee/:id
exports.updateInvitee = asyncHandler(async (req, res, next) => {
  const updatedInvitee = await Invitee.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedInvitee) return res.status(200).json({ updatedInvitee });
  else
    return next(new ErrorResponse("Invitee", "NotFoundError", req.params.id));
});

// @description Delete existing invitee
// @route       DELETE /api/v1/invitee/:id
exports.deleteInvitee = asyncHandler(async (req, res, next) => {
  const deletedInvitee = await Invitee.findByIdAndDelete(req.params.id);
  if (deletedInvitee) return res.status(204).json({});
  else
    return next(new ErrorResponse("Invitee", "NotFoundError", req.params.id));
});
