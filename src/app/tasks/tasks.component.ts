import { Component, OnInit } from "@angular/core";
import { Task } from "./shared/task.model";

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

  tasks: Array<Task>;
  selectedTask: Task;

  ngOnInit(): void {
    this.tasks = [
      { id: 1, title: 'Fazer tarefa 1' },
      { id: 2, title: 'Fazer tarefa 2' },
      { id: 3, title: 'Fazer tarefa 3' },
      { id: 4, title: 'Fazer tarefa 4' }
    ];

  }

  onSelect(task: Task): void {
    this.selectedTask = task;
  }

}