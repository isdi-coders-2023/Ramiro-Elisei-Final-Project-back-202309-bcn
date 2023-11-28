import { type Request, type Response } from "express";
import { activitiesMock } from "../../../mocks/activitiesMock";
import type ActivitiesMongooseRepository from "../../../repository/ActivitiesMongooseRepository";
import ActivitiesController from "../ActivitiesController";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an ActivitiesController's getActivities method", () => {
  describe("When it receives a response", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const activitiesRepository: ActivitiesMongooseRepository = {
      getActivities: jest.fn().mockResolvedValue(activitiesMock),
    };

    const activitiesController = new ActivitiesController(activitiesRepository);

    test("Then it should call it with 200 status method", async () => {
      const expectedStatusCode = 200;

      await activitiesController.getActivities(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the json method with all the database activities", async () => {
      const expectedActivities = { activities: activitiesMock };

      await activitiesController.getActivities(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedActivities);
    });
  });
});
