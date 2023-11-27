import "../../../server/index";
import { app } from "../../../server/app";
import request from "supertest";

describe("Given a Get / endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with the status 200 and the message '🏓'", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "🏓";
      const path = "/";

      const response = await request(app).get(path).expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
