const Request = require("supertest");
const Server = require("../src/server");
const Invitee = require("../src/models/invitee");
const Mockingoose = require("mockingoose");

describe("Invitee API Endpoint", () => {
  const genericServerError = {
    errorType: "Unknown",
    content: "An unexpected server error occurred",
  };

  const samSpainInvitee = {
    enteredName: "Sam Spain",
    inviteeStatus: "Sent",
    preferredContact: "Email",
    invitedToCeremony: false,
    attendingCeremony: false,
    invitedToReception: false,
    attendingReception: false,
    _id: "6240df980f82cbb88ae6957f",
  };

  const karenGoInvitee = {
    enteredName: "Karen Go",
    inviteeStatus: "Sent",
    preferredContact: "Email",
    invitedToCeremony: false,
    attendingCeremony: false,
    invitedToReception: false,
    attendingReception: false,
    _id: "6240df980f82cbb88ae69580",
  };

  const notFoundError = {
    errorType: "ClientFail",
    content: "Invitee not found with id of " + samSpainInvitee._id,
  };

  beforeEach(() => {
    Mockingoose.resetAll();
  });

  test("Respond to GET with invitees and 200", () => {
    Mockingoose(Invitee).toReturn([samSpainInvitee, karenGoInvitee], "find");
    return Request(Server)
      .get("/api/v1/invitee")
      .expect(200)
      .expect({
        count: 2,
        pagination: {}, data: [samSpainInvitee, karenGoInvitee]
      });
  });

  test("Respond to failed GET with 500", () => {
    Mockingoose(Invitee).toReturn(new Error("Unexpected error"), "find");
    return Request(Server)
      .get("/api/v1/invitee")
      .expect(genericServerError)
      .expect(500);
  });

  test("Respond to GET by ID with invitee and 200", () => {
    Mockingoose(Invitee).toReturn(samSpainInvitee, "findOne");
    return Request(Server)
      .get("/api/v1/invitee/" + samSpainInvitee._id)
      .expect(samSpainInvitee)
      .expect(200);
  });

  test("Respond to failed GET by ID with 500", () => {
    Mockingoose(Invitee).toReturn(new Error("Unexpected error"), "findOne");
    return Request(Server)
      .get("/api/v1/invitee/" + samSpainInvitee._id)
      .expect(genericServerError)
      .expect(500);
  });

  test("Respond to empty GET by ID with 404", () => {
    Mockingoose(Invitee).toReturn(null, "findOne");
    return Request(Server)
      .get("/api/v1/invitee/" + samSpainInvitee._id)
      .expect(notFoundError)
      .expect(404);
  });

  test("Respond to PUT with ID with updated invitee and 200", () => {
    Mockingoose(Invitee).toReturn(samSpainInvitee, "findOneAndUpdate");
    const updatedInvitee = {
      updatedInvitee: samSpainInvitee,
    };
    return Request(Server)
      .put("/api/v1/invitee/" + samSpainInvitee._id)
      .expect(updatedInvitee)
      .expect(200);
  });

  test("Respond to PUT with ID with 404 when failed to find", () => {
    Mockingoose(Invitee).toReturn(null, "findOneAndUpdate");
    return Request(Server)
      .put("/api/v1/invitee/" + samSpainInvitee._id)
      .expect(404)
      .expect(notFoundError);
  });

  test("Respond to PUT with ID with 500 when failed", () => {
    Mockingoose(Invitee).toReturn(
      new Error("Unexpected error"),
      "findOneAndUpdate"
    );
    return Request(Server)
      .put("/api/v1/invitee/" + samSpainInvitee._id)
      .expect(500)
      .expect(genericServerError);
  });

  test("Respond to POST with created invitee and 201", () => {
    jest
      .spyOn(Invitee, "create")
      .mockImplementationOnce(async () => samSpainInvitee);
    return Request(Server)
      .post("/api/v1/invitee")
      .send({
        invitedToReception: true,
        invitedToCeremony: true,
        enteredName: "Karen Go",
      })
      .expect(201)
      .expect(samSpainInvitee);
  });

  test("Respond to failed POST with 500", () => {
    jest
      .spyOn(Invitee, "create")
      .mockImplementationOnce(new Error("Unexpected error"));
    return Request(Server).post("/api/v1/invitee").expect(genericServerError);
  });

  test("Respond to DELETE with ID with empty and 204", () => {
    Mockingoose(Invitee).toReturn(samSpainInvitee, "deleteOne");
    return Request(Server)
      .delete("/api/v1/invitee/" + samSpainInvitee._id)
      .expect(204)
      .expect({});
  });

  test("Respond to DELETE where invitee could not be found with 404", () => {
    Mockingoose(Invitee).toReturn(null, "deleteOne");
    return Request(Server)
      .delete("/api/v1/invitee/" + samSpainInvitee._id)
      .expect(404)
      .expect(notFoundError);
  });

  test("Respond to DELETE that failed with 500", () => {
    Mockingoose(Invitee).toReturn(new Error("Unexpected error"), "deleteOne");
    return Request(Server)
      .delete("/api/v1/invitee/" + samSpainInvitee._id)
      .expect(500)
      .expect(genericServerError);
  });
});
