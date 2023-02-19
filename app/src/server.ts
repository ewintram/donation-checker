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
  const user = getUserById(Number(userId));
  if (user) {
    res.send(user);
  }
});

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, HOST, () => {
    console.log(`Running on http:${HOST}:${PORT}`);
  });
}

export default server;
