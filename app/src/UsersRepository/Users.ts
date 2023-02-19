export interface User {
  id: number;
  donationCount: number;
}

interface Users {
  [key: number]: User;
}

const USERS: Users = {
  1: {
    id: 1,
    donationCount: 0,
  },
  2: {
    id: 2,
    donationCount: 1,
  },
  3: {
    id: 3,
    donationCount: 2,
  },
  4: {
    id: 4,
    donationCount: 3,
  },
};

export default USERS;
