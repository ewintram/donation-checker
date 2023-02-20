import server from "../server";
import request from "supertest";

describe("GET users/:userId", () => {
  it("should return user if user id exists", () => {
    return request(server)
      .get("/users/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            donationCount: expect.any(Number),
          })
        );
      });
  });

  it("should return 404 user id does not exist", () => {
    return request(server)
      .get("/users/10")
      .expect(404);
  });
});
