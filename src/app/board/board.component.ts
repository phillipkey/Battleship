import { Component, OnInit } from '@angular/core';
import { Ship } from '../ship';
import { Cell } from '../cell';
import { ShipService } from '../ship.service';
import { MessageService } from '../message.service';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  currentPlayer = true; //true = player 1, false = player 2
  cols = 10;
  rows = 10;
  gameboard: Cell[] = [];
  ships: Ship[];

  constructor(private shipService: ShipService, private messageService: MessageService) { }

  ngOnInit() {
   this.shipService.getShipset1().subscribe(ships => this.ships = ships);
   //random selector for different shipset to be implemented later.
   var player1Selector = Math.floor(Math.random()*(4-1+1)+1);
    //build board
    var temp: Cell[];
    for (var i = 1; i <= this.rows; i++){
      for (var j = 1; j <= this.cols; j++) {
        this.gameboard.push(new Cell(i,j,"O"));
      }
    }      
    this.ships.forEach(ship => {
      ship.position.forEach(point => {
        //alert(point[0]);
        //alert(point[1]);
        var shipCell = this.gameboard.find(gameboardCell => gameboardCell.xPos == point[0] 
          && gameboardCell.yPos == point[1]);
          shipCell.value = ship.symbol;
          shipCell.shipId = ship.id;
      });
    });
    //for each ship, update corresponding cell with shipId and value.
  }

  onClick(cell: Cell): void {
    if (cell.isChecked) {
      this.messageService.add("This cell has already been checked!")
    } else {
      this.currentPlayer = !this.currentPlayer;
      cell.isChecked = true;
      if (!this.isHit(cell)) {
        this.messageService.add("*SPLASH* Miss!")
      }
    }
  }

  private isHit(cell: Cell): boolean {
    if (cell.value != "O") {
      var ship = this.ships.find(ship => ship.id === cell.shipId);
      ship.hit();
      if (ship.isSunk()) {
        this.messageService.add("You destroyed their " + ship.name + "!");
        this.ships.splice(this.ships.indexOf(ship), 1);
      } else {
        this.messageService.add("*BOOM* You hit something!")
      }
      if (this.isGameOver()) {
        this.messageService.add("YOU WIN!");
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
