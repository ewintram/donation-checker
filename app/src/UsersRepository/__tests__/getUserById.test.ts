import getUserById from "../getUserById";
import * as nodeCache from "../../Services/Cache";

describe("getUserById", () => {
  let spyNodeCache: jest.SpyInstance;

  beforeEach(() => {
    spyNodeCache = jest.spyOn(nodeCache, "getItem");
  });

  afterEach(() => {
    spyNodeCache.mockReset();
  });

  it("should return a user if the id exists", () => {
    spyNodeCache.mockReturnValue({
      id: 1,
      donationCount: 2,
      phoneNumber: "123",
    });
    const user = getUserById(1);
    expect(user).toEqual({
      id: 1,
      donationCount: 2,
      phoneNumber: "123",
    });
  });

  it("should return undefined if the id does not exist", () => {
    spyNodeCache.mockReturnValue(undefined);
    const user = getUserById(5);
    expect(user).toBeUndefined();
  });
});
