import { type Request, type Response } from "express";
import PingController from "./PingController";
import expect from "expect";

beforeAll(() => {
  jest.clearAllMocks();
});

describe("Given a PingController's getPong method", () => {
  describe("When it receives a response", () => {
    const pingController = new PingController();
    const mock = jest.fn().mockReturnThis();
    const req = {};
    const mockResponse: Pick<Response, "status" | "json"> = {
      status: mock,
      json: jest.fn(),
    };

    test("Then it should call it with status method 200", () => {
      const expectedStatusCode = 200;

      pingController.getPong(req as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call json method with 'message: '🏓' message", () => {
      const expectedMessage = { message: "🏓" };

      pingController.getPong(req as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
