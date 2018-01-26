import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

  public tasks: Array<any>;

  ngOnInit(): void {
    this.tasks = [
      { id: 1, title: 'Fazer tarefa 1' },
      { id: 2, title: 'Fazer tarefa 2' },
      { id: 3, title: 'Fazer tarefa 3' },
      { id: 4, title: 'Fazer tarefa 4' }
    ];
  }

}