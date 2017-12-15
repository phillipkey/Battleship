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

  cancelPlacement(): void {
    var cell: Cell;
    if(this.gameService.turn == 0) {
      cell = this.gameService.player1Gameboard.findCell(this.gameService.currentShipToPlace.position[0]);
    } else {
      cell = this.gameService.player2Gameboard.findCell(this.gameService.currentShipToPlace.position[0]);      
    }
    cell.highlight = false;
    this.gameService.currentShipToPlace.position = [];
    this.gameService.startPlacement = true;
  }

  placeShip(cell:Cell): void {
    var ship = this.gameService.currentShipToPlace;
    console.log("attempting to place: " + ship.name);
    if (cell.value != "O") {
      this.messageService.add("There is already a ship here. Please select a valid location.");
      return;
    }
    console.log('place a ship');
    if (this.gameService.startPlacement && cell.isEmpty()) {
      ship.position.push([cell.xPos, cell.yPos]);
      console.log("Original Ship Position: " + ship.position[0]);
      cell.highlight = true;
      this.gameService.startPlacement = false;
      this.messageService.add("Select the end point for your " + ship.name);
    } else {
      if (cell.validEndPoint(ship)) {
        console.log("board.component.ts place " + ship.name+ " at :" + cell.xPos + "," + cell.yPos);
        if (this.gameService.placeShip(ship, cell)) {
          ship.position.push([cell.xPos, cell.yPos]);
          this.messageService.add("Ship Placed");
        } else {
          this.messageService.add("There is already a ship here. Please select a valid location.");
        }
      } else {
        this.messageService.add("The range for the ship is not valid. Please select a valid location.");
      }
    }
  }

  playerFire(cell: Cell): void {
    if (this.gameService.gameEnded)
      return;
    console.log('cell was clicked');
    if (cell.isChecked) {
      this.messageService.add("This cell has already been checked!")
    } else {
      cell.isChecked = true;
      if (this.gameService.turn == 0) {
        if (!this.isHit(cell, this.gameService.player2Ships)) {
          this.messageService.add("*SPLASH* Miss!")
        }
      } else {
        if (!this.isHit(cell, this.gameService.player1Ships)) {
          this.messageService.add("*SPLASH* Miss!")
        }
      }
      this.gameService.changeTurn();
      if (this.gameService.gameEnded) {
        this.gameService.turnMessage = "Game Over. Thanks for playing!";
      }
      else {
        this.gameService.turnMessage = (this.gameService.turn == 0 ? "Player 1, " : "Player 2, ") + "place your shot."
      } 
    }
  }

  private isHit(cell: Cell, ships: Ship[]): boolean {
    console.log('checking for a hit...');
    if (cell.value != "O") {
      var ship = ships.find(ship => ship.id === cell.shipId);
      ship.hit();
      if (ship.isSunk()) {
        this.messageService.add((this.gameService.turn == 0 ? "Player 1" : "Player 2") + " destroyed the " + ship.name + "!");
        ships.splice(ships.indexOf(ship), 1);
      } else {
        this.messageService.add("*BOOM* You hit something!")
      }
      if (this.gameService.isGameOver()) {
        console.log('game over, reset board');
        this.gameService.gameEnded = true;
        this.messageService.add((this.gameService.turn == 0 ? "Player 1" : "Player 2") + " Wins!");
      }
      return true;
    } else {
      return false;
    }
  }
}
