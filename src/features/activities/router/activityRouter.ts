import { Router } from "express";
import ActivitiesController from "../controller/ActivitiesController/ActivitiesController.js";
import ActivitiesMongooseRepository from "../repository/ActivitiesMongooseRepository.js";

const activityRouter = Router();

const activitiesRepository = new ActivitiesMongooseRepository();
const activitiesController = new ActivitiesController(activitiesRepository);

activityRouter.get("/", activitiesController.getActivities);

export default activityRouter;
