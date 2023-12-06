import { type NextFunction, type Request, type Response } from "express";
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
}

export default ActivitiesController;
