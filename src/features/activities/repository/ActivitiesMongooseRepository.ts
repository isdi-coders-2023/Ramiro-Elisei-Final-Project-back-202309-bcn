import CustomError from "../../../server/CustomError/CustomError.js";
import { Activity } from "../model/Activity.js";
import { type ActivityStructure } from "../types";
import { type ActivitiesRepository } from "./types";

class ActivitiesMongooseRepository implements ActivitiesRepository {
  async getActivities(): Promise<ActivityStructure[]> {
    const activities = await Activity.find().limit(10);

    return activities;
  }

  public async deleteActivity(activityId: string): Promise<void> {
    try {
      await Activity.findByIdAndDelete(activityId);
    } catch (error) {
      throw new CustomError("Error deleting activity", 400);
    }
  }
}

export default ActivitiesMongooseRepository;
