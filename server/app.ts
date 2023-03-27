import express from "express";
import chalk from "chalk";
import config from "./config/config.json";

const { PORT } = config;

console.log(process.env.NODE_ENV);

const app = express();

app.use(express.json());
app.use(
   express.urlencoded({
      extended: false,
   })
);

async function start() {
   try {
      app.listen(PORT, () => {
         console.log(chalk.green(`Server started on port: ${PORT}`));
      });
   } catch (error) {
      if (error instanceof Error) {
         console.log(chalk.red(error.message));
      }
      process.exit(1);
   }
}

start();
