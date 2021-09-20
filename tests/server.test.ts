import Request from "supertest";
import Server from "../src/server";
import { InviteeModel } from "../src/models/invitee.model";

describe("Invitee API Endpoint", () => {

  const samSpainInvitee = {
    enteredName: 'Sam Spain',
    inviteStatus: 'Sent',
    invitedToCeremony: 'false',
    invitedToReception: 'false',
    invitedToExtraEvent: 'true',
  };

  const karenGoInvitee = {
    enteredName: 'Karen Go',
    inviteStatus: 'Sent',
    invitedToCeremony: 'false',
    invitedToReception: 'false',
    invitedToExtraEvent: 'true',
  }

  test("Respond to GET with invitees and 200", () => {
    InviteeModel.find = jest.fn().mockResolvedValue([samSpainInvitee, karenGoInvitee]);
    return Request(Server)
      .get("/api/v1/invitee")
      .expect(200)
      .expect([samSpainInvitee, karenGoInvitee]);
  });

  test("Respond to failed GET with 500", () => {
    InviteeModel.find = jest.fn().mockImplementation(() => {
      throw new Error();
    })
    return Request(Server)
    .get('/api/v1/invitee')
    .expect({message: 'Failed to retrieve invitees.'})
    .expect(500);
  })


});
