import morgan from "morgan";
import express from "express";
import { app } from "./app.js";
import cors from "cors";
import pingRouter from "../features/ping/router/pingRouter.js";

const corsPort = process.env.AUTHORISED_ORIGIN;
const corsOptions = { origin: corsPort };

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use("/", pingRouter);
