import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

@Injectable({ providedIn: "root" })
export class TasksService {
  private loggingService = inject(LoggingService);
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      status: "OPEN",
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log("Added task with title " + taskData.title);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    this.loggingService.log("updated task status to " + newStatus);
  }
}
