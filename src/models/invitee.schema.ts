import { Schema } from "mongoose";

const InviteeSchema = new Schema({
  enteredName: String,
  preferredName: String,
  inviteeStatus: {
    type: String,
    required: true,
    enum: ["Not Sent", "Sent", "Responded", "Revoked"],
  },
  contactNumber: {
    type: String,
    trim: true,
  },
  contactEmail: {
    type: String,
    trim: true,
  },
  preferredContact: {
    type: String,
    enum: ["Email", "Number", "Facebook"],
  },
  invitedToCeremony: {
    type: Boolean,
    required: [true, "Please specify if invitee is welcome to attend ceremony"],
  },
  attendingCeremony: {
    type: Boolean,
    default: false,
  },
  invitedToReception: {
    type: Boolean,
    required: [
      true,
      "Please specify if invitee is welcome to attend reception",
    ],
  },
  attendingReception: {
    type: Boolean,
    default: false,
  },
  dietaryNotes: String,
  additionalNotes: String,
});

export default InviteeSchema;
