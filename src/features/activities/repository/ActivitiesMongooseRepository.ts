import CustomError from "../../../server/CustomError/CustomError.js";
import { Activity } from "../model/Activity.js";
import { type ActivityData, type ActivityStructure } from "../types";
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

  public async addActivity(activity: ActivityStructure): Promise<ActivityData> {
    try {
      const newActivity = await Activity.create(activity);

      return newActivity;
    } catch (error) {
      throw new CustomError("Error creating new Activity", 400);
    }
  }
}

export default ActivitiesMongooseRepository;
