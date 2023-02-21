import { getItem } from "../Services/Cache";
import { User } from "./User";

const getUserById = (id: number): User | undefined => {
  const user = getItem(`${id}`);
  if (user) {
    return user as User;
  }
  return undefined;
};

export default getUserById;
