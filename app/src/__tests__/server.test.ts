import server from "../server";
import request from "supertest";
import * as SNS from "../Services/SNS";
import * as nodeCache from "../Services/Cache/nodeCache";

describe("GET users/:userId", () => {
  let spySendSms: jest.SpyInstance;
  let spyNodeCache: jest.SpyInstance;

  beforeEach(() => {
    spySendSms = jest.spyOn(SNS, "sendSms").mockImplementation();
    spyNodeCache = jest.spyOn(nodeCache, "getItem");
  });

  afterEach(() => {
    spySendSms.mockClear();
    spyNodeCache.mockReset();
  });

  it("should return user if user id exists", async () => {
    spyNodeCache.mockReturnValue({
      id: 1,
      donationCount: 2,
      phoneNumber: "123",
    });
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
    spyNodeCache.mockReturnValue(undefined);
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

  it("should send an SMS if the user has made 2 donations", async () => {
    spyNodeCache.mockReturnValue({
      id: 1,
      donationCount: 2,
      phoneNumber: "123",
    });
    await request(server).get("/users/1");
    expect(spySendSms).toHaveBeenNthCalledWith(1, "123");
  });

  it("should send an SMS if the user has made more than 2 donations", async () => {
    spyNodeCache.mockReturnValue({
      id: 3,
      donationCount: 3,
      phoneNumber: "789",
    });
    await request(server).get("/users/3");
    expect(spySendSms).toHaveBeenNthCalledWith(1, "789");
  });

  it("should not send an SMS if the user has made less than 2 donations", async () => {
    spyNodeCache.mockReturnValue({
      id: 2,
      donationCount: 1,
      phoneNumber: "456",
    });
    await request(server).get("/users/2");
    expect(spySendSms).not.toHaveBeenCalled();
  });

  it("should not return user if sending SMS fails", async () => {
    spyNodeCache.mockReturnValue({
      id: 1,
      donationCount: 2,
      phoneNumber: "123",
    });
    spySendSms.mockImplementation(() => { throw new Error() });
    const response = await request(server)
      .get("/users/1")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual({
      id: 1,
      donationCount: 2,
    });
  });
});
