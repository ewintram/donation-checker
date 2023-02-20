import morgan from "morgan";

const httpLogger = morgan("short", {
  skip: () => process.env.NODE_ENV === "test",
});

export default httpLogger;
