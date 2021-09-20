import Request from "supertest";
import Server from "../src/server";
import { InviteeModel } from "../src/models/invitee.model";

describe("Invitee API Endpoint", () => {
  test("Respond to GET with invitees and 200", () => {
    InviteeModel.find = jest.fn().mockResolvedValue([]);
    return Request(Server)
      .get("/api/v1/invitee")
      .expect(200)
      .expect([]);
  });
});
