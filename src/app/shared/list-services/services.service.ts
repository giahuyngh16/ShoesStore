import { Injectable } from '@angular/core';
import { Services } from './services.model';
@Injectable({
  providedIn: 'root',
})
export class ServiesService {
  private _services: Services[] = [
    new Services('1', 'Clean'),
    new Services('2', 'Repare'),
    new Services('3', 'Order'),
  ];
}
