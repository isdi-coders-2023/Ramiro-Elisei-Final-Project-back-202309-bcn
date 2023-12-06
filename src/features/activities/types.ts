export interface ActivityStructure {
  activityType: string;
  activityName: string;
  ledBy: string;
  date: string;
  startTime: string;
  activityDescription: string;
  imageUrl: string;
}

export interface ActivityStructureId extends ActivityStructure {
  _id: string;
}
