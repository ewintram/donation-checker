import express from "express";
import cors from "cors";
import morgan from "morgan";
import { getUserById } from "./UsersRepository";
import logger from "./logger";

const server = express();
server.use(express.json());
server.use(cors());

const httpLogger = morgan("short", {
  skip: () => process.env.NODE_ENV === "test",
});
server.use(httpLogger);

const PORT = 80;
const HOST = "0.0.0.0";

server.get("/", (_, res) => {
  res.send("Hello World!!");
});

server.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  if (isNaN(Number(userId))) {
    const message = `User ID must be a number. ${userId} is not a number.`;
    logger.error(message);
    res.status(400).json({ error: message });
    return;
  }
  const user = getUserById(Number(userId));
  if (!user) {
    const message = `User does not exist with ID ${userId}`;
    logger.error(message);
    res.status(404).json({ error: message });
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
