export interface User {
  id: number;
  donationCount: number;
  phoneNumber: string;
}

export interface Users {
  [key: number]: User;
}

const USERS = (): Users => ({
  1: {
    id: 1,
    donationCount: 0,
    phoneNumber: "+440000000000",
  },
  2: {
    id: 2,
    donationCount: 1,
    phoneNumber: "+440000000000",
  },
  3: {
    id: 3,
    donationCount: 2,
    phoneNumber: "+440000000000",
  },
  4: {
    id: 4,
    donationCount: 3,
    phoneNumber: "+440000000000",
  },
});

export default USERS;
