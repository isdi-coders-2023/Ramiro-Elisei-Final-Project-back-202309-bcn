import { app } from "../../../../server/app";
import "../../../../server/index";
import request from "supertest";
import "../../../../setupTests";

describe("Given a DELETE method to the endpoint /activities/delete/:activityId", () => {
  describe("When it receives a request with a valid id", () => {
    test("Then it should respond with status code 200 and an empty object", async () => {
      const path = "/activities/delete/656493fa44b5521c2584c216";
      const expectedStatusCode = 200;

      const response = await request(app)
        .delete(path)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual({
        message: "The activity has been deleted",
      });
    });
  });

  describe("When it receives a request with a non-existent id '656493fa44b55'", () => {
    test("Then it should return a response with 400 status code and 'Error deleting activity'", async () => {
      const expectedStatusCode = 400;
      const path = "/activities/delete/656493fa44b55";
      const expectErrorMessage = "Error deleting activity";

      const response = await request(app)
        .delete(path)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("error", expectErrorMessage);
    });
  });
});
