import { Component, OnInit } from '@angular/core';
import { Ship } from '../ship';
import { Cell } from '../cell';
import { PlayerGrid } from '../playerGrid'
import { SHIPSET1 } from '../mock-ships';
import { ShipService } from '../ship.service';
import { MessageService } from '../message.service';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { GameService } from '../game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  player1Name = "Player 1";
  player2Name = "Player 2";

  constructor(private shipService: ShipService, private messageService: MessageService, private gameService: GameService) { }

  ngOnInit() {
    console.log("Setup: " + this.gameService.isSetup);
  }

  placeShip(cell:Cell): void {
    var ship = this.gameService.currentShipToPlace;
    console.log("attempting to place ship");
    if (cell.value != "O") {
      this.gameService.turnMessage = "There is already a ship here. Please select a valid location.";
      return;
    }
    console.log('place a ship');
    if (this.gameService.startPlacement && cell.validStartPoint(ship)) {
      ship.position.push([cell.xPos, cell.yPos]);
      cell.highlight;
      this.gameService.startPlacement = false;
      this.gameService.turnMessage = "Select the end point for your " + ship.name;
    } else {
      if (cell.validEndPoint(ship)) {
        if (this.gameService.placeShip(ship)) {
          ship.position.push([cell.xPos, cell.yPos]);
          this.gameService.turnMessage = "SHIP PLACED!"
        } else {
          this.gameService.turnMessage = "Obstruction!"
        }
      } else {
        this.gameService.turnMessage = "Not a valid ship placement"
      }
    }
  }

  playerFire(cell: Cell): void {
    console.log('cell was clicked');
    if (cell.isChecked) {
      this.messageService.add("This cell has already been checked!")
    } else {
      cell.isChecked = true;
      if (this.gameService.turn == 0) {
        if (!this.isHit(cell, this.gameService.player1Ships)) {
          this.messageService.add("*SPLASH* Miss!")
        }
      } else {
        if (!this.isHit(cell, this.gameService.player2Ships)) {
          this.messageService.add("*SPLASH* Miss!")
        }
      }
      this.gameService.changeTurn();
    }
  }

  private isHit(cell: Cell, ships: Ship[]): boolean {
    console.log('checking for a hit...');
    if (cell.value != "O") {
      var ship = ships.find(ship => ship.id === cell.shipId);
      ship.hit();
      if (ship.isSunk()) {
        console.log('ship sunk');
        this.messageService.add("You destroyed their " + ship.name + "!");
        ships.splice(ships.indexOf(ship), 1);
      } else {
        this.messageService.add("*BOOM* You hit something!")
      }
      if (this.gameService.isGameOver()) {
        console.log('game over, reset board');
        this.messageService.add("YOU WIN!");
      }
      return true;
    } else {
      return false;
    }
  }
}
