import getUserById from "../getUserById";

describe("getUserById", () => {
  it("should return a user if the id exists", () => {
    const user = getUserById(1);
    expect(user).toEqual({
      id: 1,
      donationCount: 0,
    });
  });

  it("should return undefined if the id does not exist", () => {
    const user = getUserById(5);
    expect(user).toBeUndefined();
  });
});
