const express = require("express");
const {
  getInvitee,
  getInvitees,
  createInvitee,
  updateInvitee,
  deleteInvitee,
} = require("../controllers/inviteeController");
const inviteeRouter = express.Router();
const { protect, authorize } = require("../middleware/auth");
inviteeRouter
  .route("/")
  .get(getInvitees)
  .post(protect, authorize("admin"), createInvitee);
inviteeRouter
  .route("/:id")
  .get(getInvitee)
  .put(protect, authorize("admin"), updateInvitee)
  .delete(protect, authorize("admin"), deleteInvitee);

module.exports = inviteeRouter;
