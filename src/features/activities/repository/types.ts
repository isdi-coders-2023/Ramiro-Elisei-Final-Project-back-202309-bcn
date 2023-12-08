import { type ActivityData, type ActivityStructure } from "../types";

export interface ActivitiesRepository {
  getActivities: () => Promise<ActivityStructure[]>;
  deleteActivity: (id: string) => Promise<void>;
  addActivity: (activity: ActivityStructure) => Promise<ActivityData>;
}
