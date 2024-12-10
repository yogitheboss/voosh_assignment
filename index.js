import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import { initDb } from "./config/db.js";
import { registerApps } from "./app/index.js";
import morgan from "morgan";
const apiRouter = express.Router();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("combined"));
app.use("/api/v1", apiRouter);
registerApps(apiRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  initDb();
  console.log(`Server is running on port ${port}`);
});
