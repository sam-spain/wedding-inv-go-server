const express = require("express");
const {
  getInvitee,
  getInvitees,
  createInvitee,
  updateInvitee,
  deleteInvitee,
} = require("../controllers/inviteeController");
const inviteeRouter = express.Router();

inviteeRouter.route("/").get(getInvitees).post(createInvitee);
inviteeRouter
  .route("/:id")
  .get(getInvitee)
  .put(updateInvitee)
  .delete(deleteInvitee);

module.exports = inviteeRouter;
