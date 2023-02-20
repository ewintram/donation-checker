import server from "../server";
import request from "supertest";
import mockUsers from "../__mocks__/mockUsers.mock";

jest.mock("../UsersRepository/USERS", () =>
  jest.fn().mockImplementation(() => {
    return mockUsers();
  })
);

describe("GET users/:userId", () => {
  it("should return user if user id exists", async () => {
    const response = await request(server)
      .get("/users/1")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual({
      id: 1,
      donationCount: 2,
    });
  });

  it("should return 404 user id does not exist", async () => {
    const response = await request(server)
      .get("/users/10")
      .expect("Content-Type", /json/)
      .expect(404);
    expect(response.body).toEqual({ error: "User does not exist with ID 10" });
  });

  it("should return 400 user id is not a number", async () => {
    const response = await request(server)
      .get("/users/a")
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toEqual({
      error: "User ID must be a number. a is not a number.",
    });
  });
});
