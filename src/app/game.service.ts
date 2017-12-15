import { Injectable } from '@angular/core';
import { Ship } from './ship';
import { Cell } from './cell';
import { PlayerGrid } from './playerGrid';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';

@Injectable()
export class GameService {
  turn = 0; //turn = 0 is player 1, turn = 1 is player 2;
  isSetup: boolean = true; //begin the game in setup mode.
  gameEnded: boolean = false;
  startPlacement: boolean = true;
  player1Gameboard: PlayerGrid = new PlayerGrid();
  player2Gameboard: PlayerGrid = new PlayerGrid();
  player1Ships: Ship[] = [];
  player2Ships: Ship[] = [];
  turnMessage = "Player 1, place your USS Costco. (5)" 

  shipsToPlace: Ship[];
  currentShipToPlace: Ship;
  shipIndex = 0;
  
  constructor() { 
    this.setupPlayerGrids();
    this.setShipsToPlace();
    this.currentShipToPlace = this.shipsToPlace[0];
  }

  private setupPlayerGrids(): void {
    var cols = 10;
    var rows = 10;
    console.log('building grid for player 1...');
    for (var i = 1; i <= rows; i++){
      for (var j = 1; j <= cols; j++) {
        this.player1Gameboard.grid.push(new Cell(i,j,"O"));
      }
    }
    console.log('player 1 grid built!');

    console.log('building grid for player 2...');
    for (var i = 1; i <= rows; i++){
      for (var j = 1; j <= cols; j++) {
        this.player2Gameboard.grid.push(new Cell(i,j,"O"));
      }
    }
    console.log('player 2 grid built!'); 
    console.log('ready to play!');
  }

  isGameOver(): boolean {
    return this.player1Ships.length == 0 || this.player2Ships.length == 0;
  }

  placeShip(ship: Ship, cell: Cell): boolean {
    if (this.turn == 0) {
      if (!this.addShipToBoard(ship, this.player1Gameboard, cell))
        return false;
      this.player1Ships.push(ship);
      this.shipIndex++;
      if (this.shipIndex < this.shipsToPlace.length) {
        this.currentShipToPlace = this.shipsToPlace[this.shipIndex];
        this.turnMessage = (this.turn == 0 ? "Player 1, " : "Player 2, ") + "place your " + this.currentShipToPlace.name + " (" + this.currentShipToPlace.totalHealth + ")";
        this.startPlacement = true;
      } else {
        this.setShipsToPlace();
        this.shipIndex = 0;
        this.currentShipToPlace = this.shipsToPlace[this.shipIndex];
        this.startPlacement = true;
        this.changeTurn();
        this.turnMessage = (this.turn == 0 ? "Player 1, " : "Player 2, ") + "place your " + this.currentShipToPlace.name + " (" + this.currentShipToPlace.totalHealth + ")";;        
      }
    } else {
      console.log("place ship for player 2");
      if (!this.addShipToBoard(ship, this.player2Gameboard, cell))
        return false;
      this.player2Ships.push(ship);
      this.shipIndex++;
      if (this.shipIndex < this.shipsToPlace.length) {
        this.currentShipToPlace = this.shipsToPlace[this.shipIndex];
        this.turnMessage = (this.turn == 0 ? "Player 1, " : "Player 2, ") + "place your " + this.currentShipToPlace.name + " (" + this.currentShipToPlace.totalHealth + ")";
        this.startPlacement = true;
      } else {
        this.shipIndex = 0;
        this.currentShipToPlace = this.shipsToPlace[this.shipIndex];
        this.isSetup = false;
        this.changeTurn();
        this.turnMessage = (this.turn == 0 ? "Player 1, " : "Player 2, ") + "place your shot.";        
      }
    }
    return true;
  }

  changeTurn() {
    if (this.turn == 0) {
      this.turn = 1;
    } else {
      this.turn = 0;
    }
  }

  private addShipToBoard(ship: Ship, gameboard: PlayerGrid, cell:Cell): boolean {
    console.log("game.service adding "+ ship.name +" to board at " + cell.xPos + "," + cell.yPos);
    if (gameboard.validRange(ship, cell)) {
      gameboard.setValues(ship);
      return true;
    }
    return false;
  }

  private resetCells(cells) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].shipId = -1;
      cells[i].value = "O";
    }
  }

  private setShipsToPlace() {
    this.shipsToPlace = [
      new Ship(1, "USS Costco", 5, "A", []),
      new Ship(2, "HMS Publix", 4, "B", []),
      new Ship(3, "USS Kroger", 3, "C", []),
      new Ship(4, "HMSm Western", 3, "S", []),
      new Ship(5, "USNV ABC Fine Wine and Spirits", 2, "D", [])
    ]
  }
}
