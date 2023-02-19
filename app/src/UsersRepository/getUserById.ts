import USERS, { User } from "./Users";

const getUserById = (id: number): User | undefined => USERS[id];

export default getUserById;
