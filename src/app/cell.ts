import { Ship } from "./ship";
import { PACKAGE_ROOT_URL } from "@angular/core/src/application_tokens";

export class Cell {
    value: string;
    isChecked: boolean;
    xPos: number;
    yPos; number;
    shipId: number;
    highlight: boolean;

    constructor(x: number, y: number, value: string) {
        this.xPos = x;
        this.yPos = y;
        this.value = value;
        this.isChecked = false;
        this.shipId = -1;
        this.highlight = false;
    }

    validStartPoint(ship: Ship): boolean {
        return this.value == "O";
    }
  
    validEndPoint(ship: Ship): boolean {
        //must be empty
      if (this.value != "O")
        return false;
      var position = ship.position[0];
      //must be in same row or column;
      if (position[0] != this.xPos && position[1] != this.yPos)
        return false;
      //must have the correct number of spaces to match the length of ship
      if (this.xPos != position[0] - ship.totalHealth - 1  && this.xPos != position[0] + ship.totalHealth - 1
          && this.yPos != position[1] - ship.totalHealth - 1 && this.yPos != position[1] + ship.totalHealth - 1) {
            return false;
      }
      //must be clear between start and end point
      if (!this.validRange(ship)){
          return false;
      }
      return true;
    }

    private validRange(ship: Ship): boolean {
        var shipStartX = ship.position[0][0];
        var shipStartY = ship.position[0][1];
        if (shipStartX == this.xPos) {
            //check y range for empty values
        } else {
            // check x range for empty values;
        }
        console.log(this.xPos+ "," + this.yPos);
        return true;
    }
}