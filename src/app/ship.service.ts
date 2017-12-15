import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Ship } from './ship';
import { SHIPSET1 } from './mock-ships';

@Injectable()
export class ShipService {

  constructor() { }

  getShipset1(): Observable<Ship[]> {
    return of(SHIPSET1);
  }
}
