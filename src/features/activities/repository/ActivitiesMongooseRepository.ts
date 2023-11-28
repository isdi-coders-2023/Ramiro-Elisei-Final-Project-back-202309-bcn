import { Activity } from "../model/Activity.js";
import { type ActivityStructure } from "../types";
import { type ActivitiesRepository } from "./types";

class ActivitiesMongooseRepository implements ActivitiesRepository {
  async getActivities(): Promise<ActivityStructure[]> {
    const activities = await Activity.find().limit(10);

    return activities;
  }
}

export default ActivitiesMongooseRepository;
