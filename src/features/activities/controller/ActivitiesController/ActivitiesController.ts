import { type Request, type Response } from "express";
import type ActivitiesMongooseRepository from "../../repository/ActivitiesMongooseRepository.js";

class ActivitiesController {
  constructor(
    private readonly activitiesRepository: ActivitiesMongooseRepository,
  ) {}

  getActivities = async (_req: Request, res: Response): Promise<void> => {
    const activities = await this.activitiesRepository.getActivities();

    res.status(200).json({ activities });
  };
}

export default ActivitiesController;
