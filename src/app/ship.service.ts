import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Ship } from './ship';
import { SHIPSET1 } from './mock-ships';
//import { SHIPSET2 } from './mock-ships';
//import { SHIPSET3 } from './mock-ships';
//import { SHIPSET4 } from './mock-ships';

@Injectable()
export class ShipService {

  constructor() { }

  getShipset1(): Observable<Ship[]> {
    return of(SHIPSET1);
  }
  // getShipset2(): Observable<Ship[]> {
  //   return of(SHIPSET2);
  // }
  // getShipset3(): Observable<Ship[]> {
  //   return of(SHIPSET3);
  // }
  // getShipset4(): Observable<Ship[]> {
  //   return of(SHIPSET4);
  // }

}
