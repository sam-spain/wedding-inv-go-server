const Invitee = require("../models/invitee");
const asyncHandler = require("../middleware/async");

// @description Get summary of invitees.
// @route       GET /api/v1/invitee/summary
exports.getInviteeSummary = asyncHandler(async (req, res, next) => {
    const invitees = await Invitee.find({});
    const response = {
        invitationsSent: 0,
        totalPossibleGuests: 0,
        invitationsAccepted: 0,
        invitationsDeclined: 0,
        invitationsOutstanding: 0,
        totalGuestsAttendingReception: 0,
        totalGuestsAttendingCeremony: 0
    }
    for (const invitee of invitees) {
        if (SENT_STATUSES.includes(invitee.inviteeStatus)) response.invitationsSent++;
        if (invitee.inviteeStatus != "Revoked") response.totalPossibleGuests += (1 + invitee.additionalGuests.length);
        if (invitee.attendingCeremony || invitee.attendingReception) response.invitationsAccepted++;
        if (invitee.declinedInvite) response.invitationsDeclined++;
        if (invitee.inviteeStatus == "Sent") response.invitationsOutstanding++;
        if (invitee.attendingReception) response.totalGuestsAttendingReception += (1 + invitee.additionalGuests.length);
        if (invitee.attendingCeremony) response.totalGuestsAttendingCeremony += (1 + invitee.additionalGuests.length);
    }
    res.status(200).json(response);
})

const SENT_STATUSES = [
    "Sent", "Responded"

]
