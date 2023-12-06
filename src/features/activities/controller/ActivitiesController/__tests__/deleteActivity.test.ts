import type CustomError from "../../../../../server/CustomError/CustomError";
import ActivitiesController from "../ActivitiesController";
import { type ActivitiesRepository } from "../../../repository/types";
import { type NextFunction, type Request, type Response } from "express";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given ActivitiesController: deleteActivity method", () => {
  const activityRepository: ActivitiesRepository = {
    getActivities: jest.fn(),
    deleteActivity: jest.fn(),
  };

  const activityController = new ActivitiesController(activityRepository);

  describe("When it receives a request to delete an existing activity", () => {
    test("Then  it should respond with a 200 status code and a JSON method response with a message indicating the activity has been deleted'", async () => {
      const expectedStatusCode = 200;
      const activityId = "656493fa44b5521c2584c216";

      const req: Partial<Request> = {
        params: { id: activityId },
      };

      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      await activityController.deleteActivity(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({
        message: "The activity has been deleted",
      });
    });

    describe("When it receives a request with an incorrect activity id", () => {
      test("Then it should call the next function with the error 'Error deleting activity'", async () => {
        const activityId = "invalidId";
        const expectErrorMessage: Partial<CustomError> = {
          message: "Error deleting activity",
          statusCode: 400,
        };

        const activitiesRepository: ActivitiesRepository = {
          getActivities: jest.fn(),
          deleteActivity: jest.fn().mockRejectedValue(expectErrorMessage),
        };

        const activitiesController = new ActivitiesController(
          activitiesRepository,
        );
        const req: Partial<Request> = {
          params: { id: activityId },
        };

        const res: Pick<Response, "status" | "json"> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        const next = jest.fn();

        await activitiesController.deleteActivity(
          req as Request<{ id: string }>,
          res as Response,
          next as NextFunction,
        );

        expect(next).toHaveBeenCalledWith(expectErrorMessage);
      });
    });
  });
});
