import { Component, computed, inject, signal } from "@angular/core";

import { TaskItemComponent } from "./task-item/task-item.component";
import { TasksService } from "../tasks.service";
import { TASK_STATUS_OPTIONS, TaskStatusOptionProvider } from "../task.model";

@Component({
  selector: "app-tasks-list",
  standalone: true,
  templateUrl: "./tasks-list.component.html",
  styleUrl: "./tasks-list.component.css",
  imports: [TaskItemComponent],
  providers: [TaskStatusOptionProvider],
})
export class TasksListComponent {
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  private tasksService = inject(TasksService);
  private selectedFilter = signal<string>("all");
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case "open":
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === "OPEN");
      case "in-progress":
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === "IN_PROGRESS");
      case "done":
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === "DONE");

      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
