require("module-alias/register");

import express from "express";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import https from "https";
import fs from "fs";

import { server_port as serverPort } from "./config/config.json";
import router from "./routes/routes";

const isProd = process.env.NODE_ENV === "production";

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

let isErrorHttps = false;

if (isProd) {
   try {
      https
         .createServer(
            {
               key: fs.readFileSync("/etc/letsencrypt/live/1962779-wd45981.twc1.net/privkey.pem", "utf8"),
               cert: fs.readFileSync("/etc/letsencrypt/live/1962779-wd45981.twc1.net/cert.pem", "utf8"),
               ca: fs.readFileSync("/etc/letsencrypt/live/1962779-wd45981.twc1.net/chain.pem", "utf8"),
            },
            app
         )
         .listen(serverPort, () => console.log(`HTTPS Server Started on port: ${serverPort}`));
   } catch (error) {
      console.log(error);
      isErrorHttps = true;
   }
}

if (!isProd || isErrorHttps) {
   app.listen(serverPort, () => {
      console.log(chalk.green(`Server started on port: ${serverPort}`));
   });
}
