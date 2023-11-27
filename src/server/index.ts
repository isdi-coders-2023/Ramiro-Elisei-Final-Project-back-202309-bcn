import morgan from "morgan";
import express from "express";
import { app } from "./app.js";

app.use(morgan("dev"));
app.use(express.json());
