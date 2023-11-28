import { type ActivityStructure } from "../types";

export interface ActivitiesRepository {
  getActivities(): Promise<ActivityStructure[]>;
}
