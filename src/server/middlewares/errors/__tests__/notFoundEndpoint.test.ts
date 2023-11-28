import request from "supertest";
import { app } from "../../../app";
import "../../../../server/index";

describe("Given a GET /pathToTest endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with 404 and a message 'Endpoint not found'", async () => {
      const expectedStatusCode = 404;
      const expectedMessage = "Endpoint not found";
      const requestedPath = "/pathToTest";

      const response = await request(app)
        .get(requestedPath)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });
});
