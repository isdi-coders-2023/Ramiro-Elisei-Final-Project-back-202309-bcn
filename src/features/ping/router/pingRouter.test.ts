import "../../../server/index";
import { app } from "../../../server/app";
import request from "supertest";

describe("Given a Get / endpoint", () => {
  describe("When it receives a GET request", () => {
    test("Then it should respond with a 200 status code and the message '🏓'", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "🏓";
      const path = "/";

      const response = await request(app).get(path).expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
