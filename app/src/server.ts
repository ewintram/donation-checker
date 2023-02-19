import express from "express";
const app = express();

const PORT = 80;
const HOST = "0.0.0.0";

app.get("/", function (_, res) {
  res.send("Hello World!!");
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http:${HOST}:${PORT}`);
});
