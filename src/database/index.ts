import chalk from "chalk";
import mongoose from "mongoose";
import debugCreator from "debug";

const debug = debugCreator("ludic:database");

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", true);
    debug(chalk.green("Connected to database"));
  } catch (error: unknown) {
    debug(
      `Couldn't connect to database: ${chalk.red((error as Error).message)}`,
    );
  }
};
