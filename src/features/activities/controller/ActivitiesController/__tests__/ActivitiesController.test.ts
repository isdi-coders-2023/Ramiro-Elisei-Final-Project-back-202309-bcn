import { type Request, type Response } from "express";
import { activitiesMock } from "../../../mocks/activitiesMock";
import type ActivitiesMongooseRepository from "../../../repository/ActivitiesMongooseRepository";
import ActivitiesController from "../ActivitiesController";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the getActivities method of ActivitiesController's ", () => {
  describe("When it receives a GET request", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const activitiesRepository: ActivitiesMongooseRepository = {
      getActivities: jest.fn().mockResolvedValue(activitiesMock),
      deleteActivity: jest.fn(),
    };

    const activitiesController = new ActivitiesController(activitiesRepository);

    test("Then it should respond with a 200 status code", async () => {
      const expectedStatusCode = 200;

      await activitiesController.getActivities(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should respond with JSON method with the activities from the database ", async () => {
      const expectedActivities = { activities: activitiesMock };

      await activitiesController.getActivities(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedActivities);
    });
  });
});
