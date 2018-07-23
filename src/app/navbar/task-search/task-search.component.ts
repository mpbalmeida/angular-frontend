import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {TaskService} from '../../tasks/shared/task.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Task} from '../../tasks/shared/task.model';


@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html'
})
export class TaskSearchComponent implements OnInit {

  searchTerms: Subject<string> = new Subject();
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {
  }

  search(term: string): void {
    console.log(term);

    this.searchTerms.next(term);
  }

  gotoTask(task: Task): void {
    this.tasks = [];
    this.router.navigate(['/tasks', task.id]);
  }

  ngOnInit(): void {
    this.searchTerms
      .debounceTime(500)
      .distinctUntilChanged()
      .do(term => console.log(term))
      .switchMap(
      term => term ? this.taskService.searchByTitle(term) : Observable.of<Task[]>([])
    ).subscribe(tasks => this.tasks = tasks);
  }
}
