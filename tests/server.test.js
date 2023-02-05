const Request = require("supertest");
const Server = require("../src/server");
const Invitee = require("../src/models/invitee");
const User = require("../src/models/user");
const Mockingoose = require("mockingoose");
const jwt = require("jsonwebtoken");

describe("Invitee API Endpoint", () => {
  const GENERIC_SERVER_ERROR = {
    errorType: "Unknown",
    content: "An unexpected server error occurred",
  };

  const SAM_SPAIN_INVITEE = {
    enteredName: 'Sam Spain',
    inviteeStatus: 'Sent',
    preferredContact: 'Email',
    invitedToCeremony: false,
    attendingCeremony: false,
    invitedToReception: false,
    attendingReception: false,
    additionalGuestAvailable: 0,
    additionalGuests: [],
    _id: '6240df980f82cbb88ae6957f'
    
  };

  const KAREN_GO_INVITEE = {
    enteredName: 'Karen Go',
    inviteeStatus: 'Sent',
    preferredContact: 'Email',
    invitedToCeremony: false,
    attendingCeremony: false,
    invitedToReception: false,
    attendingReception: false,
    additionalGuestAvailable: 0,
    additionalGuests: [],
    _id: '6240df980f82cbb88ae69580'
  };

  const NOT_FOUND_ERROR = {
    errorType: "ClientFail",
    content: "Invitee not found with id of " + SAM_SPAIN_INVITEE._id,
  };

  const ADMIN_USER = {
    id: 300,
    role: "admin",
  };

  const BEARER_TOKEN = "Bearer token";

  beforeEach(() => {
    Mockingoose.resetAll();
    mockAuthentication();
  });

  test("Respond to GET with invitees and 200", () => {
    Mockingoose(Invitee).toReturn(
      [SAM_SPAIN_INVITEE, KAREN_GO_INVITEE],
      "find"
    );
    return Request(Server)
      .get("/api/v1/invitee")
      .set("authorization", BEARER_TOKEN)
      .expect(200)
      .expect({
        count: 2,
        limit: 25,
        pagination: {},
        data: [SAM_SPAIN_INVITEE, KAREN_GO_INVITEE],
      });
  });

  test("Respond to failed GET with 500", () => {
    Mockingoose(Invitee).toReturn(new Error("Unexpected error"), "find");
    return Request(Server)
      .get("/api/v1/invitee")
      .set("authorization", BEARER_TOKEN)
      .expect(GENERIC_SERVER_ERROR)
      .expect(500);
  });

  test("Respond to GET by ID with invitee and 200", () => {
    Mockingoose(Invitee).toReturn(SAM_SPAIN_INVITEE, "findOne");
    return Request(Server)
      .get("/api/v1/invitee/" + SAM_SPAIN_INVITEE._id)
      .set("authorization", BEARER_TOKEN)
      .expect(SAM_SPAIN_INVITEE)
      .expect(200);
  });

  test("Respond to failed GET by ID with 500", () => {
    Mockingoose(Invitee).toReturn(new Error("Unexpected error"), "findOne");
    return Request(Server)
      .get("/api/v1/invitee/" + SAM_SPAIN_INVITEE._id)
      .set("authorization", BEARER_TOKEN)
      .expect(GENERIC_SERVER_ERROR)
      .expect(500);
  });

  test("Respond to empty GET by ID with 404", () => {
    Mockingoose(Invitee).toReturn(null, "findOne");
    return Request(Server)
      .get("/api/v1/invitee/" + SAM_SPAIN_INVITEE._id)
      .set("authorization", BEARER_TOKEN)
      .expect(NOT_FOUND_ERROR)
      .expect(404);
  });

  test("Respond to PUT with ID with updated invitee and 200", () => {
    Mockingoose(Invitee).toReturn(SAM_SPAIN_INVITEE, "findOneAndUpdate");
    const updatedInvitee = {
      updatedInvitee: SAM_SPAIN_INVITEE,
    };
    return Request(Server)
      .put("/api/v1/invitee/" + SAM_SPAIN_INVITEE._id)
      .set("authorization", BEARER_TOKEN)
      .expect(updatedInvitee)
      .expect(200);
  });

  test("Respond to PUT with ID with 404 when failed to find", () => {
    Mockingoose(Invitee).toReturn(null, "findOneAndUpdate");
    return Request(Server)
      .put("/api/v1/invitee/" + SAM_SPAIN_INVITEE._id)
      .set("authorization", BEARER_TOKEN)
      .expect(404)
      .expect(NOT_FOUND_ERROR);
  });

  test("Respond to PUT with ID with 500 when failed", () => {
    Mockingoose(Invitee).toReturn(
      new Error("Unexpected error"),
      "findOneAndUpdate"
    );
    return Request(Server)
      .put("/api/v1/invitee/" + SAM_SPAIN_INVITEE._id)
      .set("authorization", BEARER_TOKEN)
      .expect(500)
      .expect(GENERIC_SERVER_ERROR);
  });

  test("Respond to POST with created invitee and 201", () => {
    jest
      .spyOn(Invitee, "create")
      .mockImplementationOnce(async () => SAM_SPAIN_INVITEE);
    return Request(Server)
      .post("/api/v1/invitee")
      .send({
        invitedToReception: true,
        invitedToCeremony: true,
        enteredName: "Karen Go",
      })
      .set("authorization", BEARER_TOKEN)
      .expect(201)
      .expect(SAM_SPAIN_INVITEE);
  });

  test("Respond to failed POST with 500", () => {
    jest
      .spyOn(Invitee, "create")
      .mockImplementationOnce(new Error("Unexpected error"));
    return Request(Server)
      .post("/api/v1/invitee")
      .set("authorization", BEARER_TOKEN)
      .expect(GENERIC_SERVER_ERROR);
  });

  test("Respond to DELETE with ID with empty and 204", () => {
    Mockingoose(Invitee).toReturn(SAM_SPAIN_INVITEE, "deleteOne");
    return Request(Server)
      .delete("/api/v1/invitee/" + SAM_SPAIN_INVITEE._id)
      .set("authorization", BEARER_TOKEN)
      .expect(204)
      .expect({});
  });

  test("Respond to DELETE where invitee could not be found with 404", () => {
    Mockingoose(Invitee).toReturn(null, "deleteOne");
    return Request(Server)
      .delete("/api/v1/invitee/" + SAM_SPAIN_INVITEE._id)
      .set("authorization", BEARER_TOKEN)
      .expect(404)
      .expect(NOT_FOUND_ERROR);
  });

  test("Respond to DELETE that failed with 500", () => {
    Mockingoose(Invitee).toReturn(new Error("Unexpected error"), "deleteOne");
    return Request(Server)
      .delete("/api/v1/invitee/" + SAM_SPAIN_INVITEE._id)
      .set("authorization", BEARER_TOKEN)
      .expect(500)
      .expect(GENERIC_SERVER_ERROR);
  });

  function mockAuthentication() {
    jest.spyOn(jwt, "verify").mockReturnValueOnce({ id: ADMIN_USER.id });
    Mockingoose(User).toReturn(ADMIN_USER, "findOne");
  }
});
