import express from "express";
import {
  getInvitee,
  getInvitees,
  createInvitee,
  updateInvitee,
  deleteInvitee,
} from "../controllers/inviteeController";
const inviteeRouter = express.Router();

inviteeRouter.route("/").get(getInvitees).post(createInvitee);
inviteeRouter
  .route("/:id")
  .get(getInvitee)
  .put(updateInvitee)
  .delete(deleteInvitee);

export default inviteeRouter;
