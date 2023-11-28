import { Schema, model } from "mongoose";
import { type ActivityStructure } from "../types";

const activitySchema = new Schema<ActivityStructure>({
  activityType: {
    type: String,
    required: true,
  },
  activityName: {
    type: String,
    required: true,
  },
  LedBy: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  starTime: {
    type: String,
    required: true,
  },
  ActivityDescription: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

export const Activity = model("Activity", activitySchema, "activities");
