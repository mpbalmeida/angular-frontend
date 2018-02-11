import { Component, OnInit } from "@angular/core";
import { Task } from "./shared/task.model";
import { TaskService } from "./shared/task.service";

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  providers: [
    TaskService
  ]
})
export class TasksComponent implements OnInit {

  public tasks: Array<Task>;
  public selectedTask: Task;

  constructor(private taskService: TaskService) {  }

  ngOnInit(): void {
    this.taskService.getTasks()
      .then(tasks => this.tasks = tasks)
      .catch(error => alert(error));
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
  }

}