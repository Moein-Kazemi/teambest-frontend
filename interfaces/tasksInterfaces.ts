export interface IAssignee {
  assigneeId?: string;
  assigneeName?: string;
}
// export type AssigneeDocument = IAssignee & Document;

// TASK PROP AND DOCUMENT
export interface ITask {
  _id?: string;
  projectId: string;
  stageId: string;
  title: string;
  description?: string;
  assigneeTo: IAssignee;
  status?: "انجام نشده" | "در حال انجام" | "انجام شده";
  priority?: "کم" | "متوسط" | "زیاد" | "خیلی زیاد";
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
