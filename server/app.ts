require("module-alias/register");

import express from "express";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import config from "./config/config.json";
import router from "./routes/routes";

const isProd = process.env.NODE_ENV === "production";

const { dev, prod } = config;

const serverPort = isProd ? prod.server_port : dev.server_port;

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

if (isProd) {
   const staticPath = path.join(__dirname, "client");
   app.use("/", express.static(staticPath));

   const indexPath = path.join(staticPath, "index.html");
   app.get("*", (req, res) => {
      res.sendFile(indexPath);
   });
}

app.listen(serverPort, () => {
   console.log(chalk.green(`Server started on port: ${serverPort}`));
});
