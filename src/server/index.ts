import morgan from "morgan";
import express from "express";
import { app } from "./app.js";
import cors from "cors";
import pingRouter from "../features/ping/router/pingRouter.js";
import {
  endpointNotFound,
  generalError,
} from "./middlewares/errors/errorMiddlewares.js";
import activityRouter from "../features/activities/router/activityRouter.js";

const corsPort = process.env.AUTHORISED_ORIGIN;
const corsOptions = { origin: corsPort };

app.use(cors(corsOptions));

app.use(morgan("dev"));

app.use(express.json());

app.use("/", pingRouter);

app.use("/activities", activityRouter);

app.use(endpointNotFound);

app.use(generalError);
