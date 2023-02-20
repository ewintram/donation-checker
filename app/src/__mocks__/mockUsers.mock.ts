import { Users } from "../UsersRepository/USERS";

const mockUsers = (): Users => ({
  1: {
    id: 1,
    donationCount: 2,
    phoneNumber: "123",
  },
  2: {
    id: 2,
    donationCount: 1,
    phoneNumber: "456",
  },
  3: {
    id: 3,
    donationCount: 3,
    phoneNumber: "789",
  },
});

export default mockUsers;
