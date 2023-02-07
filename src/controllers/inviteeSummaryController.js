const Invitee = require("../models/invitee");
const asyncHandler = require("../middleware/async");

// @description Get summary of invitees.
// @route       GET /api/v1/invitee/summary
exports.getInviteeSummary = asyncHandler(async (req, res, next) => {
    let invitees = Invitee.find();

    const RESPONSE = {
        invitationsSent: 0,
        totalPossibleGuests: 0,
        invitationsAccepted: 0,
        invitationsDeclined: 0,
        invitationsOutstanding: 0,
        totalGuestsAttendingReception: 0,
        totalGuestsAttendingCeremony: 0
    }

    for(const invitee of invitees) {
        if(SENT_STATUSES.includes(invitee.inviteeStatus)) RESPONSE.invitationsSent++;
        if(invitee.inviteeStatus != "Revoked") RESPONSE.totalPossibleGuests += (1 + invitee.additionalGuests.length);
        if(invitee.attendingCeremony || invitee.attendingReception) RESPONSE.invitationsAccepted++;
        if(invitee.declinedInvite) RESPONSE.invitationsDeclined++;
        if(invitee.inviteeStatus == "Sent") RESPONSE.invitationsOutstanding++;
        if(invitee.attendingReception) RESPONSE.totalGuestsAttendingReception += (1 + invitee.additionalGuests.length);
        if(invitee.attendingCeremony) RESPONSE.totalGuestsAttendingCeremony += (1 + invitee.additionalGuests.length);
    }

    res.status(200).json(RESPONSE);
})

const SENT_STATUSES = [
    "Sent", "Responded"

]
