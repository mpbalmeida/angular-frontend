import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

import * as moment from 'moment';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html'
})
export class TaskDetailComponent implements OnInit, AfterViewInit {
  task: Task;
  taskDoneOptions: Array<any> = [
    { value: false, text: 'Pendente' },
    { value: true, text: 'Feita' }
  ];
  options;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.task = new Task(null, null);
    this.options = {
      format: "DD.MM.YYYY",
      maxDate: moment(),
      minDate: this.task.deadline,
      // ...
    };
    this.route.params // params já é responsável por fazer o unsubscribe
      .switchMap((params: Params) => this.taskService.getById(+params['id']))
      .subscribe(
        task => this.task = task,
        error => alert('Ocorreu um erro, tente mais tarde')
      );

  }

  ngAfterViewInit(): void {
  }

  goBack() {
    this.location.back();
  }

  updateTask() {
    this.taskService.update(this.task)
      .subscribe(
        () => alert('Tarefa atualizada com sucesso'),
        error => alert('Ocorreu um erro no servidor')
      );
  }

  showFieldError(field): boolean {
    return field.invalid && (field.touched || field.dirty);
  }


}
