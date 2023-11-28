import { type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import { generalError } from "../errorMiddlewares";
import expect from "expect";
import { type NextFunction } from "connect";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError middleware", () => {
  const req = {};
  const errorMessage = "Error";
  const res: Pick<Response, "json" | "status"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next = jest.fn();

  describe("When it receives a response and a error with 400", () => {
    test("Then it should call the status method of the response with a 400", () => {
      const expectedStatusCode = 400;
      const error = new CustomError(errorMessage, expectedStatusCode);

      generalError(error, req as Request, res as Response, next);

      expect(res.status).toBeCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives an response with an error message 'Error'", () => {
    describe("Then it should call the response's json method with 'Private error'", () => {
      const privateErrorMessage = "Private error";
      const error = new CustomError(privateErrorMessage, 400);

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      const errorBodyResponse = {
        error: privateErrorMessage,
      };

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining(errorBodyResponse),
      );
    });

    describe("When it receives a response and an error with status code", () => {
      test("Then it should call the response's status method with 500", () => {
        const expectedStatusCode = 500;
        const error = new Error("Error with status code");

        generalError(
          error as CustomError,
          req as Request,
          res as Response,
          next as NextFunction,
        );

        expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      });
    });
  });
});
