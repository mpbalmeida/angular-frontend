import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryTaskDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 1, title: 'Vender o carro' },
      { id: 2, title: 'Estudar Angular' },
      { id: 3, title: 'Criar hotsite' },
      { id: 4, title: 'Desenvolver plugin' },
      { id: 5, title: 'Jogar Counter Strike' },
      { id: 6, title: 'Fazer almoço' },
      { id: 7, title: 'Dormir' }
    ];

    return { tasks };
  }
}
