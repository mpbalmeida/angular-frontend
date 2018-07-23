import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Task } from './task.model';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class TaskService {

  public tasksUrl = 'api/tasks';
  headers = new Headers({'Content-Type': 'application/json'});

  public constructor(private http: Http) { }

  public getAll(): Observable<Task[]> {
    return this.http.get(this.tasksUrl)
      .catch(this.handleErrors)
      .map((response: Response) => response.json() as Task[]);
  }

  public getImportant(): Observable<Task[]> {
    return this.getAll()
      .catch(this.handleErrors)
      .map((tasks: Task[]) => tasks.slice(0, 3));
  }

  public getById(id: number): Observable<Task> {

    const url = `${this.tasksUrl}/${id}`;

    return this.http.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => response.json() as Task);
  }

  public create(task: Task): Observable<Task> {
    const body = JSON.stringify(task);

    return this.http.post(this.tasksUrl, body, {headers: this.headers})
        .catch(this.handleErrors)
        .map((response: Response) => response.json() as Task);
  }

  public update(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    const body = JSON.stringify(task);

    return this.http.put(url, body, {headers: this.headers })
        .catch(this.handleErrors)
        .map(() => task);
  }

  public delete(id: number): Observable<null> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete(url, { headers: this.headers })
      .catch(this.handleErrors)
      .map(() => null);
  }

  public searchByTitle(term: string): Observable<Task[]> {
    const url = `${this.tasksUrl}?title=${term}`;

    return this.http.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => response.json() as Task[]);
  }

  private handleErrors(error: Response) {
    console.log('Salvando o erro num arquivo de logs => ', error);

    return Observable.throw(error);
  }
}
