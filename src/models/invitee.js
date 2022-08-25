const mongoose = require("mongoose");
const crypto = require("crypto");
const slugify = require("slugify");

const InviteeSchema = new mongoose.Schema({
    enteredName: {
      type: String,
      required: [true, "Please give a name to this invitee"],
      maxLength: 60,
      trim: true
    },
    preferredName: {
      type: String,
      maxlength: 60,
      trim: true
    },
    inviteeStatus: {
      type: String,
      enum: ["Not Sent", "Sent", "Responded", "Revoked"],
      default: "Not Sent"
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
      default: "Email"
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
    inviteeAccessToken: String
  });

  InviteeSchema.pre("save", async function (next) {
    const sluggedName = slugify(this.enteredName, {
      replacement: '-',  // replace spaces with replacement character, defaults to `-`
      lower: true,      // convert to lower case, defaults to `false`
      strict: true,     // strip special characters except replacement, defaults to `false`
      trim: true         // trim leading and trailing replacement chars, defaults to `true`
    })

    this.inviteeAccessToken = sluggedName + "-" + crypto.randomBytes(8).toString("hex");
  })

  module.exports = mongoose.model("Invitee", InviteeSchema);