import { type Request } from "express";
import { type Types } from "mongoose";

export interface ActivityStructure {
  date: string;
  activityDescription: string;
  activityType: string;
  imageUrl: string;
  imageSmallUrl: string;
  activityName: string;
  ledBy: string;
  startTime: string;
}

export interface ActivityStructureId extends ActivityStructure {
  _id: string;
}

export interface ActivityData extends ActivityStructure {
  _id: Types.ObjectId;
}

export interface CustomRequest extends Request {
  body: ActivityStructure;
}
