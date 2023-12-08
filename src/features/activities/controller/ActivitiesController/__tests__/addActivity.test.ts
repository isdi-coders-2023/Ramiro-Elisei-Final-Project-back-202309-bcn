import { type NextFunction, type Response } from "express";
import { activitiesMock } from "../../../mocks/activitiesMock";
import { addActivityMock } from "../../../mocks/addActivityMock";
import { type ActivitiesRepository } from "../../../repository/types";
import { type CustomRequest } from "../../../types";
import ActivitiesController from "../ActivitiesController";

describe("Given an addActivity controller", () => {
  const activitiesRepository: ActivitiesRepository = {
    getActivities: jest.fn(),
    deleteActivity: jest.fn(),
    addActivity: jest.fn().mockResolvedValue(activitiesMock[0]),
  };

  const activitiesController = new ActivitiesController(activitiesRepository);

  describe("When it receives a request with a valid activity on its body, a response and a next function", () => {
    const req: Partial<CustomRequest> = {
      body: addActivityMock,
    };

    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    test("then it should call the response's method with status code 201", async () => {
      const expectedStatusCode = 201;

      await activitiesController.addActivity(
        req as CustomRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call it method json with the message 'Error creating new Activity'", async () => {
      const expectedErrorMessage = "Error creating new Activity";

      const activitiesRepository: ActivitiesRepository = {
        getActivities: jest.fn(),
        deleteActivity: jest.fn(),
        addActivity: jest.fn().mockRejectedValue(expectedErrorMessage),
      };

      const activitiesController = new ActivitiesController(
        activitiesRepository,
      );

      await activitiesController.addActivity(
        req as CustomRequest,
        res as Response,
        next as NextFunction,
      );
    });
  });
});
