import { Component, OnInit } from '@angular/core';
import { Ship } from '../ship';
import { Cell } from '../cell';
import { ShipService } from '../ship.service';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  cols = 10;
  rows = 10;
  gameboard: Cell[] = [];
  ships: Ship[];

  constructor(private shipService: ShipService) { }

  ngOnInit() {
   this.shipService.getShipset1().subscribe(ships => this.ships = ships);
   var player1Selector = Math.floor(Math.random()*(4-1+1)+1);
   alert(player1Selector);
    //build board
    var temp: Cell[];
    for (var i = 1; i <= this.rows; i++){
      for (var j = 1; j <= this.cols; j++) {
        this.gameboard.push(new Cell(i,j,"O"));
      }
    }
    //randomly place a ship.
    //will need to make sure ship has space.
    //"ship" component needs to be created and imported here
  }

  onClick(cell: Cell): void {
    if (cell.isChecked) {
      alert("Already Checked!");
    } else {
      cell.isChecked = true;
      if (this.isHit(cell)) {
        //check if ship is sunk
      }
      alert(cell.xPos + ", " + cell.yPos);
    }
  }

  private isHit(cell: Cell): boolean {
    if (cell.value != "O") {
      var ship = this.ships.find(ship => ship.id === cell.shipId);
      ship.hit();
      if (ship.isSunk)
         this.ships.splice(this.ships.indexOf(ship), 1);
      if (this.isGameOver()) {
        //gameover
      }
      return true;
    } else {
      return false;
    }
  }

  private isGameOver(): boolean {
    return this.ships.length === 0;
  }
}
