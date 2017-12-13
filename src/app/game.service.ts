import { Injectable } from '@angular/core';
import { Ship } from './ship';
import { Cell } from './cell';
import { PlayerGrid } from './playerGrid';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';

@Injectable()
export class GameService {
  turn = 0; //turn = 0 is player 1, turn = 1 is player 2;
  isSetup: boolean = true; //begin the game in setup mode.
  startPlacement: boolean = true;
  player1Gameboard: PlayerGrid = new PlayerGrid();
  player2Gameboard: PlayerGrid = new PlayerGrid();
  player1Ships: Ship[] = [
    // new Ship(1, "Aircraft Carrier", 5, "A",  [[3,2], [3,3], [3,4], [3,5], [3,6] ] ),
    // new Ship(2, "Battleship", 4, "B",  [ [6,5], [7,5], [8,5], [9,5] ] ),
    // new Ship(3, "Cruiser", 3, "C",  [ [1,2], [1,3], [1,4] ] ),
    // new Ship(4, "Submarine", 3, "S",  [ [4,9], [5,9], [6,9] ]  ),
    // new Ship(5, "Destroyer", 2, "D",  [ [5,3], [6,3] ])
  ]
  player2Ships: Ship[] = [
    // new Ship(1, "Aircraft Carrier", 5, "A",  [[3,2], [3,3], [3,4], [3,5], [3,6] ] ),
    // new Ship(2, "Battleship", 4, "B",  [ [6,5], [7,5], [8,5], [9,5] ] ),
    // new Ship(3, "Cruiser", 3, "C",  [ [1,2], [1,3], [1,4] ] ),
    // new Ship(4, "Submarine", 3, "S",  [ [4,9], [5,9], [6,9] ]  ),
    // new Ship(5, "Destroyer", 2, "D",  [ [5,3], [6,3] ])
  ]
  turnMessage = "Player 1, place your Carrier." 

  shipsToPlace: Ship[];

  currentShipToPlace: Ship;
  shipIndex = 0;
  constructor() { 
    this.setupPlayerGrids(); //create empty grids.
    this.setShipsToPlace(); //use function to populate list of ships to place.
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
    console.log('adding ships to grid 1...');
    // this.player1Ships.forEach(ship => {
    //   ship.position.forEach(point => {
    //     var shipCell = this.player1Gameboard.find(gameboardCell => gameboardCell.xPos == point[0] 
    //       && gameboardCell.yPos == point[1]);
    //       shipCell.value = ship.symbol;
    //       shipCell.shipId = ship.id;
    //   });
    // });
    console.log('ships added to grid 1!');

    console.log('building grid for player 2...');
    for (var i = 1; i <= rows; i++){
      for (var j = 1; j <= cols; j++) {
        this.player2Gameboard.grid.push(new Cell(i,j,"O"));
      }
    }
    console.log('player 2 grid built!'); 
    console.log('adding ships to grid 2...');     
    // this.player2Ships.forEach(ship => {
    //   ship.position.forEach(point => {
    //     var shipCell = this.player2Gameboard.find(gameboardCell => gameboardCell.xPos == point[0] 
    //       && gameboardCell.yPos == point[1]);
    //       shipCell.value = ship.symbol;
    //       shipCell.shipId = ship.id;
    //   });
    // });
    console.log('ships added to grid 2!');
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
        this.turnMessage = "Now Placing: " + this.currentShipToPlace.name;
        this.startPlacement = true;
      } else {
        this.setShipsToPlace();
        this.shipIndex = 0;
        this.currentShipToPlace = this.shipsToPlace[this.shipIndex];
        this.startPlacement = true;
        this.turn = 1;
      }
    } else {
      console.log("place ship for player 2");
      if (!this.addShipToBoard(ship, this.player2Gameboard, cell))
        return false;
      this.player2Ships.push(ship);
      this.shipIndex++;
      if (this.shipIndex < this.shipsToPlace.length) {
        this.currentShipToPlace = this.shipsToPlace[this.shipIndex];
        this.turnMessage = "Now Placing: " + this.currentShipToPlace.name;
        this.startPlacement = true;
      } else {
        this.shipIndex = 0;
        this.currentShipToPlace = this.shipsToPlace[this.shipIndex];
        this.isSetup = false;
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

  //this function will reset cells in case there is a conflict as a way to preserve 
  private resetCells(cells) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].shipId = -1;
      cells[i].value = "O";
    }
  }

  private setShipsToPlace() {
    this.shipsToPlace = [
      new Ship(1, "Aircraft Carrier", 5, "A", []),
      new Ship(2, "Battleship", 4, "B", []),
      new Ship(3, "Cruiser", 3, "C", []),
      new Ship(4, "Submarine", 3, "S", []),
      new Ship(5, "Destroyer", 2, "D", [])
    ]
  }
}
