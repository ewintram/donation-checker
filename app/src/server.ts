import express from "express";
import { getUserById } from "./UsersRepository";

const server = express();
server.use(express.json());

const PORT = 80;
const HOST = "0.0.0.0";

server.get("/", (_, res) => {
  res.send("Hello World!!");
});

server.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  if (isNaN(Number(userId))) {
    res.status(400).json({ error: `User ID must be a number. ${userId} is not a number.` });
    return;
  }
  const user = getUserById(Number(userId));
  if (!user) {
    res.status(404).json({ error: `User does not exist with ID ${userId}` });
  } else {
    res.json(user);
  }
});

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, HOST, () => {
    console.log(`Running on http:${HOST}:${PORT}`);
  });
}

export default server;
