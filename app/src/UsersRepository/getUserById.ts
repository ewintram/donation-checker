import USERS, { User } from "./USERS";

const getUserById = (id: number): User | undefined => USERS()[id];

export default getUserById;
