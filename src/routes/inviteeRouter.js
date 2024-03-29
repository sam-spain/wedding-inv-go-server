const express = require("express");
const {
  getInvitee,
  getInvitees,
  createInvitee,
  updateInvitee,
  deleteInvitee,
  getInviteeFromUserAccessToken,
  updateInviteeFromUserAccessToken
} = require("../controllers/inviteeController");
const {getInviteeSummary} = require("../controllers/inviteeSummaryController");
const inviteeRouter = express.Router();
const { protect, authorize } = require("../middleware/auth");
inviteeRouter
  .route("/summary")
  .get(getInviteeSummary);
inviteeRouter
  .route("/")
  .get(protect, authorize("admin"), getInvitees)
  .post(protect, authorize("admin"), createInvitee);
inviteeRouter
  .route("/:id")
  .get(protect, authorize("admin"), getInvitee)
  .put(protect, authorize("admin"), updateInvitee)
  .delete(protect, authorize("admin"), deleteInvitee);
inviteeRouter
  .route("/fromToken/:userAccessToken")
  .get(getInviteeFromUserAccessToken)
  .put(updateInviteeFromUserAccessToken)


module.exports = inviteeRouter;
