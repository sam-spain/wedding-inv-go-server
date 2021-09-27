const errorHandler = require("../../src/middleware/error");
const { describe, expect, test } = require("@jest/globals");

describe("Error Handling", () => {
  const mockRequest = () => {
    const req = {};
    return req;
  };

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockedNext = jest.fn();

  test("Error that is not recognised is listed as generic server error", async () => {
    const expectedErrorResponse = {
        errorType: "Unknown",
        content: "An unexpected server error occurred"
      };

      const inputError = {
        name: "Any Unrecognised Name",
      };

      const res = mockResponse();
      errorHandler(inputError, mockRequest, res, mockedNext);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expectedErrorResponse);
  })

  test("CastError means an object with ID could not be found", async () => {
    const badId = "6148e90a0464b2234d4f6f84";
    const expectedErrorResponse = {
      errorType: "ClientFail",
      content: `Resource not found with id of ${badId}`,
    };
    const inputError = {
      name: "CastError",
      value: badId,
    };
    const res = mockResponse();
    errorHandler(inputError, mockRequest, res, mockedNext);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expectedErrorResponse);
  });

});
