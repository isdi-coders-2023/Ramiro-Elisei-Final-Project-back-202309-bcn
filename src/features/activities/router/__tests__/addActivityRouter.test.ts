import request from "supertest";
import { app } from "../../../../server/app";
import "../../../../server/index";
import "../../../../setupTests";
import { addActivityMock } from "../../mocks/addActivityMock";

describe("Given a POST request to the '/activities/add' endpoint", () => {
  describe("When a valid activity is provided in the request body", () => {
    test("Then it should respond with a status code of 201 and the message 'The activity has been created'", async () => {
      const path = "/activities/add";
      const expectedStatusCode = 201;
      const expectedMessage = "The activity has been created";

      const response = await request(app)
        .post(path)
        .send(addActivityMock)
        .expect(expectedStatusCode);

      expect(response.body.message).toStrictEqual(expectedMessage);
    });

    test("Then it should respond with a status code of 201 and include the newly created activity", async () => {
      const path = "/activities/add";
      const expectedStatusCode = 201;
      const expectedNewActivityProperty = "addedActivity";

      const response = await request(app)
        .post(path)
        .send(addActivityMock)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty(expectedNewActivityProperty);
    });
  });
  describe("When an invalid activity is provided in the request body", () => {
    test("Then it should respond with a status code of 400 and the error message 'Error creating new Activity'", async () => {
      const path = "/activities/add";
      const expectedStatusCode = 400;
      const expectedMessage = "Error creating new Activity";
      const invalidActivity = {};

      const response = await request(app)
        .post(path)
        .send(invalidActivity)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });
});
