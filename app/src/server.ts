import express from "express";
import cors from "cors";
import { getUserById } from "./UsersRepository";
import { logger, httpLogger } from "./Loggers";
import { sendSms } from "./Services/SNS";
import { setItems } from "./Services/Cache";
import { USERS } from "./Services/Cache/USERS";

const server = express();
server.use(express.json());
server.use(cors());
server.use(httpLogger);

const PORT = 80;
const HOST = "0.0.0.0";
// Populates the cache on start
setItems(USERS);

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
    return;
  }
  if (user.donationCount >= 2) {
    try {
      sendSms(user.phoneNumber);
    } catch {
      logger.error(`Failed to send SMS to user with ID ${user.id}`);
    }
  }
  res.json({ id: user.id, donationCount: user.donationCount });
});

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, HOST, () => {
    console.log(`Running on http:${HOST}:${PORT}`);
  });
}

export default server;
