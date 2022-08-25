const express = require("express");
const {
  getInvitee,
  getInvitees,
  createInvitee,
  updateInvitee,
  deleteInvitee,
  getInviteeFromUserAccessToken
} = require("../controllers/inviteeController");
const inviteeRouter = express.Router();
const { protect, authorize } = require("../middleware/auth");
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

module.exports = inviteeRouter;
