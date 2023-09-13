require("module-alias/register");

import express from "express";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import https from "https";
import fs from "fs";

import config from "./config/config.json";
import router from "./routes/routes";

const isProd = process.env.NODE_ENV === "production";

const { dev, prod } = config;

const serverPort = isProd ? prod.server_port : dev.server_port;

const app = express();

if (isProd) {
   app.use(cors());
} else {
   app.use(
      cors({
         origin: ["http://localhost:8000"],
         methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE", "PATCH"],
         credentials: true,
      })
   );
}

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

if (isProd) {
   https
      .createServer(
         {
            key: fs.readFileSync("/etc/letsencrypt/live/example.com/privkey.pem", "utf8"),
            cert: fs.readFileSync("/etc/letsencrypt/live/example.com/cert.pem", "utf8"),
            ca: fs.readFileSync("/etc/letsencrypt/live/example.com/chain.pem", "utf8"),
         },
         app
      )
      .listen(serverPort, () => console.log(`HTTPS Server Started on port: ${serverPort}`));
} else {
   app.listen(serverPort, () => {
      console.log(chalk.green(`Server started on port: ${serverPort}`));
   });
}
