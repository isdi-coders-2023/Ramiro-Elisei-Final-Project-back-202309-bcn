import { type NextFunction, type Request, type Response } from "express";
import { type CustomRequest } from "../../types.js";
import { type ActivitiesRepository } from "../../repository/types.js";

class ActivitiesController {
  constructor(private readonly activitiesRepository: ActivitiesRepository) {}

  getActivities = async (_req: Request, res: Response): Promise<void> => {
    const activities = await this.activitiesRepository.getActivities();

    res.status(200).json({ activities });
  };

  deleteActivity = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { activityId } = req.params;
      await this.activitiesRepository.deleteActivity(activityId);
      res.status(200).json({ message: "The activity has been deleted" });
    } catch (error) {
      next(error);
    }
  };

  public addActivity = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const newActivity = req.body;

    try {
      const addedActivity =
        await this.activitiesRepository.addActivity(newActivity);

      res
        .status(201)
        .json({ message: "The activity has been created", addedActivity });
    } catch (error) {
      next(error);
    }
  };
}

export default ActivitiesController;
