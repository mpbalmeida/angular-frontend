import { Injectable } from "@angular/core";
import { Task } from "./task.model";

const TASKS: Array<Task> = [
  { id: 1, title: 'Fazer tarefa 1' },
  { id: 2, title: 'Fazer tarefa 2' },
  { id: 3, title: 'Fazer tarefa 3' },
  { id: 4, title: 'Fazer tarefa 4' }
];

@Injectable()
export class TaskService {

  public getTasks(): Promise<Task[]> {
    let promise = new Promise<Task[]>((resolve, reject) => {
      if(TASKS.length > 0) {
        resolve(TASKS);
      } else {
        let errorMessage = 'Não há tarefas.';
        reject(errorMessage);
      }
    })

    return promise;
  }
}