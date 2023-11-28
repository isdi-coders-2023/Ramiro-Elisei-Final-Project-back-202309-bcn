import type CustomError from "../../../CustomError/CustomError.js";
import { endpointNotFound } from "../errorMiddlewares.js";
import { type NextFunction, type Request, type Response } from "express";
import expect from "expect";

describe("Given a notFound middleware", () => {
  describe("When ot receives a next", () => {
    test("Then it should call it with a 404 status and a 'Endpoint not found' message", () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      const expectedError: Partial<CustomError> = {
        statusCode: 404,
        message: "Endpoint not found",
      };

      endpointNotFound(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
