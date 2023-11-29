import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToDatabase } from "../../../database";
import mongoose from "mongoose";
import { Activity } from "../model/Activity";
import { activitiesMock } from "../mocks/activitiesMock";
import request from "supertest";
import { type ActivityStructure } from "../types";
import { app } from "../../../server/app";
import "../../../server/index";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbUrl = server.getUri();

  await connectToDatabase(mongoDbUrl);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a GET /activities endpoint", () => {
  describe("When it receives a GET request", () => {
    test("Then it should respond with a status 200 and the 'Generative plant gadering' activity name in the response body", async () => {
      const path = "/activities";
      const expectedStatusCode = 200;

      await Activity.create(activitiesMock[0]);
      await Activity.create(activitiesMock[1]);

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { activities: ActivityStructure[] };

      responseBody.activities.forEach((activity, activityPosition) => {
        expect(activity).toHaveProperty(
          "activityName",
          activitiesMock[activityPosition].activityName,
        );
      });
    });
  });
});
