import { getItem } from "../Services/Cache";
import { User } from "./User";

const getUserById = (id: number): User | undefined => getItem(`${id}`);

export default getUserById;
