// ==================== Task Assignment (درون Stages) ====================
export interface ITaskAssignment {
  taskId?: string;
  taskTitle: string;
  assigneeId: string;
  assigneeName: string;
}

// ==================== Stage ====================
export interface IStage {
  _id?: string;
  name: string;
  order: number;
  taskAssignments: ITaskAssignment[];
}

// ==================== Project ====================
export interface IProject {
  _id?: string;
  name: string;
  description?: string;
  teamId: string;
  ownerId: string;
  stages: IStage[];
  createdAt?: Date;
  updatedAt?: Date;
}

// export interface ApiResponse<T> {
//   status: "success" | "fail";
//   results?: number;
//   data: {
//     project?: T;
//     projects

//   };
//   message?: string;
// }
