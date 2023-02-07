const Request = require("supertest");
const Server = require("../src/server");
const Invitee = require("../src/models/invitee");
const User = require("../src/models/user");
const Mockingoose = require("mockingoose");
const jwt = require("jsonwebtoken");

describe("Invitee Summary API Endpoint", () => {
    const EXPECTED_SUMMARY_RESPONSE = {
        invitationsSent: 5,
        totalPossibleGuests: 6,
        invitationsAccepted: 3,
        invitationsDeclined: 1,
        invitationsOutstanding: 1,
        totalGuestsAttendingReception: 4,
        totalGuestsAttendingCeremony: 3
    }

    const ACCEPTED_BOTH_WITH_GUEST = {
        enteredName: 'Aam Bain',
        inviteeStatus: 'Responded',
        declinedInvite: false,
        preferredContact: 'Email',
        invitedToCeremony: true,
        attendingCeremony: true,
        invitedToReception: true,
        attendingReception: true,
        additionalGuestAvailable: 1,
        additionalGuests: [{}]
    }

    const ACCEPTED_BOTH_NO_GUEST = {
        enteredName: 'Ban Crain',
        inviteeStatus: 'Responded',
        declinedInvite: false,
        preferredContact: 'Email',
        invitedToCeremony: true,
        attendingCeremony: true,
        invitedToReception: true,
        attendingReception: true,
        additionalGuestAvailable: 0,
        additionalGuests: []
    }

    const ACCEPTED_RECEPTION_NO_GUEST = {
        enteredName: 'Cram Drain',
        inviteeStatus: 'Responded',
        declinedInvite: false,
        preferredContact: 'Email',
        invitedToCeremony: false,
        attendingCeremony: false,
        invitedToReception: true,
        attendingReception: true,
        additionalGuestAvailable: 0,
        additionalGuests: []
    }

    const DECLINED = {
        enteredName: 'Dran Ethain',
        declinedInvite: true,
        inviteeStatus: 'Responded',
        invitedToCeremony: true,
        attendingCeremony: false,
        invitedToReception: true,
        attendingReception: false,
        additionalGuestAvailable: 0,
        additionalGuests: []
    }

    const NOT_RESPONDED = {
        enteredName: 'Edin Forn',
        declinedInvite: false,
        inviteeStatus: 'Sent',
        invitedToCeremony: true,
        attendingCeremony: false,
        invitedToReception: true,
        attendingReception: false,
        additionalGuestAvailable: 0,
        additionalGuests: []
    }

    const REVOKED = {
        enteredName: "Dreadin Gurd",
        declinedInvite: false,
        inviteeStatus: "Revoked",
        invitedToCeremony: false,
        attendingCeremony: false,
        invitedToReception: false,
        attendingReception: false,
        additionalGuestAvailable: 0,
        additionalGuests: []
    }

    const BEARER_TOKEN = "Bearer token";

    beforeEach(() => {
        Mockingoose.resetAll();
    });

    test("Respond to GET with invitee summary", () => {
        jest.spyOn(Invitee, "find").mockReturnValueOnce([ACCEPTED_BOTH_WITH_GUEST, ACCEPTED_BOTH_NO_GUEST, ACCEPTED_RECEPTION_NO_GUEST, DECLINED, NOT_RESPONDED, REVOKED]);

        return Request(Server)
        .get('/api/v1/invitee/summary')
        .expect(200)
        .expect(EXPECTED_SUMMARY_RESPONSE);
    });

})