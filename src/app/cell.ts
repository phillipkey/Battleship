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

    isEmpty(): boolean {
        return this.value == "O";
    }
  
    validEndPoint(ship: Ship): boolean {
        console.log("check valid end point");
      if (this.value != "O")
        return false;
      var position = ship.position[0];
      if (position[0] != this.xPos && position[1] != this.yPos) {
        console.log("not in same row or column.Position: " + position + " x: " + this.xPos + " y: " + this.yPos );
        return false;
      }
      if (this.xPos != position[0] - ship.totalHealth - 1  && this.xPos != position[0] + ship.totalHealth - 1
          && this.yPos != position[1] - ship.totalHealth - 1 && this.yPos != position[1] + ship.totalHealth - 1) {
            console.log("incorrect length. position: " + position + " cell: " + this.xPos + "," + this.yPos);
            return false;
      }
      return true;
    }
}