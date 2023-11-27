import "dotenv/config";
import chalk from "chalk";
import express from "express";
import debugCreator from "debug";

const debug = debugCreator("ludic:server:app");

export const app = express();
app.disable("x-powered-by");

export const startServer = (port: number) => {
  app.listen(+port, () => {
    debug(chalk.green(`Server is listening on http://localhost:${port}`));
  });
};
