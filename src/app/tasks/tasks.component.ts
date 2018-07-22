import { Component, OnInit } from '@angular/core';
import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

  public tasks: Array<Task>;
  public newTask: Task;

  constructor(private taskService: TaskService) {  }

  ngOnInit(): void {
    this.newTask = new Task(null, '');

    this.taskService.getTasks()
      .subscribe(
        tasks => this.tasks = tasks,
        error => alert('Ocorreu um erro no servidor, tente novamente mais tarde')
      );
  }

  createTask() {
    this.newTask.title = this.newTask.title.trim();

    if (!this.newTask.title) {
      alert('a tarefa deve ter um título');
    } else {
      this.taskService.createTask(this.newTask)
        .subscribe(
          task => {
            this.tasks.push(task);
            this.newTask = new Task(null, '');
          },
          error => alert('Ocorreu um erro, tente novamente')
        )
    }
  }
}
