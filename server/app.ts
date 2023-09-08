require("module-alias/register");

import express from "express";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";

import config from "./config/config.json";
import router from "./routes/routes";

const { server_port } = config;

console.log(process.env.NODE_ENV);

const app = express();

app.use(
   cors({
      origin: ["http://localhost:8000"],
      methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
   })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

app.listen(server_port, () => {
   console.log(chalk.green(`Server started on port: ${server_port}`));
});
