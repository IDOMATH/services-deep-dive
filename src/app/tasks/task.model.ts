import { InjectionToken, Provider } from "@angular/core";

export type TaskStatus = "OPEN" | "IN_PROGRESS" | "DONE";

type TaskStatusOptions = {
  value: string;
  taskStatus: TaskStatus;
  text: string;
}[];

export const TaskStatusOptions: TaskStatusOptions = [
  {
    value: "open",
    taskStatus: "OPEN",
    text: "Open",
  },
  {
    value: "in-progress",
    taskStatus: "IN_PROGRESS",
    text: "In-Progress",
  },
  {
    value: "done",
    taskStatus: "DONE",
    text: "Completed",
  },
];

export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions>(
  "task-status-options"
);

export const TaskStatusOptionProvider: Provider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOptions,
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
