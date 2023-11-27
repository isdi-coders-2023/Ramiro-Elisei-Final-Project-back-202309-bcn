import morgan from "morgan";
import express from "express";
import { app } from "./app.js";
import cors from "cors";

const corsPort = process.env.AUTHORISED_ORIGIN;
const corsOptions = { origin: corsPort };

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
