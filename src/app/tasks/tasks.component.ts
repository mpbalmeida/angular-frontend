import { Component, OnInit } from '@angular/core';
import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

  public tasks: Array<Task>;
  public newTask: Task;

  constructor(private taskService: TaskService) {  }

  ngOnInit(): void {
    this.newTask = new Task(null, '');

    this.taskService.getAll()
      .subscribe(
        tasks => this.tasks = tasks.sort((a, b) => b.id - a.id),
        error => alert('Ocorreu um erro no servidor, tente novamente mais tarde')
      );
  }

  createTask() {
    this.newTask.title = this.newTask.title.trim();

    if (!this.newTask.title) {
      alert('a tarefa deve ter um título');
    } else {
      this.taskService.create(this.newTask)
        .subscribe(
          task => {
            this.tasks.unshift(task);
            this.newTask = new Task(null, '');
          },
          error => alert('Ocorreu um erro, tente novamente')
        );
    }
  }

  deleteTask(task: Task) {
    if (confirm(`Confirma a exclusão da tarefa "${task.title}"`)) {
      this.taskService.delete(task.id)
        .subscribe(
          () => {
            this.tasks = this.tasks.filter(t => t !== task);
            alert('Excluído com sucesso.');
          },
          error => alert('Ocorreu um erro, tente novamente')
        );
    }
  }
}
