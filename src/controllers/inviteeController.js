const Invitee = require("../models/invitee");
const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleware/async");

exports.getInviteeFromUserAccessToken = asyncHandler(async (req, res, next) => {
  const userAccessToken  = req.params.userAccessToken;
  console.log(userAccessToken);
  const foundInvitee = await Invitee.findOne({inviteeAccessToken:userAccessToken});
  console.log("Token on found invitee " + foundInvitee.userAccessToken);
  res.status(200).json(foundInvitee);
})

// @description Get all people invited
// @route       GET /api/v1/invitee
exports.getInvitees = asyncHandler(async (req, res, next) => {
  const excludedParams = ["select", "sort", "page", "limit"];
  const requestQuery = { ...req.query };
  excludedParams.forEach((param) => delete requestQuery[param]);

  let queryString = JSON.stringify(requestQuery);
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  let query = Invitee.find(JSON.parse(queryString));

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortedFields = req.query.sort.split(",").join(" ");
    query = query.sort(sortedFields);
  } else {
    query.sort("inviteeStatus");
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Invitee.countDocuments();

  query = query.skip(startIndex).limit(limit);
  const invitees = await query;

  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    total: total,
    count: invitees.length,
    limit: limit,
    pagination: pagination,
    data: invitees,
  });
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
