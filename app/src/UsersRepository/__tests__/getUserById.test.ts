import mockUsers from "../../__mocks__/mockUsers.mock";
import getUserById from "../getUserById";

jest.mock("../USERS", () =>
  jest.fn().mockImplementation(() => {
    return mockUsers();
  })
);

describe("getUserById", () => {
  it("should return a user if the id exists", () => {
    const user = getUserById(1);
    expect(user).toEqual({
      id: 1,
      donationCount: 2,
      phoneNumber: "123",
    });
  });

  it("should return undefined if the id does not exist", () => {
    const user = getUserById(5);
    expect(user).toBeUndefined();
  });
});
