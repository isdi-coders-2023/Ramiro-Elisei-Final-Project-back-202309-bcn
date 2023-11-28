import "dotenv/config";
import chalk from "chalk";
import "./server/index.js";
import debugCreator from "debug";
import { startServer } from "./server/app.js";
import { connectToDatabase } from "./database/index.js";

const debug = debugCreator("ludic:main");

const port = process.env.PORT ?? 4000;

if (!process.env.MONGODB_URL) {
  debug(chalk.red("Missing MongoDB String"));
  process.exit();
}

const mongoUrl = process.env.MONGODB_URL;

await connectToDatabase(mongoUrl);
startServer(+port);
