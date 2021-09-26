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
    .expect({})
    .expect(500);
  })

  
  test('Respond to GET by ID with invitee and 200', () => {
    InviteeModel.findById = jest.fn().mockResolvedValue(samSpainInvitee);
    return Request(Server)
    .get('/api/v1/invitee/1')
    .expect(samSpainInvitee)
    .expect(200);
  })
  
  test('Respond to failed GET by ID with 500', () => {
    InviteeModel.findById = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    return Request(Server)
    .get('/api/v1/invitee/1')
    .expect({})
    .expect(500);
  });
  
  test('Respond to empty GET by ID with 404', () => {
    InviteeModel.findById = jest.fn().mockResolvedValue(null);
    return Request(Server)
    .get('/api/v1/invitee/1')
    .expect({message: 'No invitee with matching ID found.'})
    .expect(404);
  });
  
  test('Respond to PUT with ID with updated invitee and 200', () => {
    InviteeModel.findByIdAndUpdate = jest.fn().mockResolvedValue(samSpainInvitee);
    const updatedInvitee = {
      updatedInvitee: samSpainInvitee,
    };
    return Request(Server)
      .put('/api/v1/invitee/1')
      .expect(updatedInvitee)
      .expect(200);
  });
  
  test('Respond to PUT with ID with 404 when failed to find', () => {
    InviteeModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
    return Request(Server)
      .put('/api/v1/invitee/1')
      .expect(404)
      .expect({message: 'Failed to find invitee to update.'});
  });

  test('Respond to PUT with ID with 500 when failed', () => {
    InviteeModel.findByIdAndUpdate = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    return Request(Server)
      .put('/api/v1/invitee/1')
      .expect(500)
      .expect({});
  });

  test('Respond to POST with created invitee and 201', () => {
    InviteeModel.create = jest.fn().mockResolvedValue(samSpainInvitee);
    return Request(Server)
      .post('/api/v1/invitee')
      .expect(201)
      .expect(samSpainInvitee);
  });
  
  test('Respond to failed POST with 500', () => {
    InviteeModel.create = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    return Request(Server)
    .post('/api/v1/invitee')
    .expect(500)
    .expect({});
  });

  test('Respond to DELETE with ID with empty and 204', () => {
    InviteeModel.findByIdAndDelete = jest.fn().mockResolvedValue(samSpainInvitee);
    return Request(Server)
      .delete('/api/v1/invitee/1')
      .expect(204)
      .expect({});
  });

  test('Respond to DELETE where invitee could not be found with 404', () => {
    InviteeModel.findByIdAndDelete = jest.fn().mockResolvedValue(null);
    return Request(Server)
      .delete('/api/v1/invitee/1')
      .expect(404)
      .expect({message: 'Failed to find invitee to delete.'});
  });

  test('Respond to DELETE that failed with 500', () => {
    InviteeModel.findByIdAndDelete = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    return Request(Server)
      .delete('/api/v1/invitee/1')
      .expect(500)
      .expect({});
  });
  
});
