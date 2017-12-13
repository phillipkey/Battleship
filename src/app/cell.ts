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
      var startX = Math.min(ship.position[0][0], this.xPos);
      var startY = Math.min(ship.position[0][1], this.yPos);
      var endX = Math.max(ship.position[0][0], this.xPos);
      var endY = Math.max(ship.position[0][1], this.yPos);
      console.log(startX + " " + endX + " " + startY + " " + endY);
      if (startX != endX - (ship.totalHealth - 1) && startX != endX + (ship.totalHealth - 1)
          && startY != endY - (ship.totalHealth - 1) && startY != endY + (ship.totalHealth - 1)) {
            console.log("incorrect length. start: " + startX + "," + startY + " end: " + endX + "," + endY);
            return false;
      }
      return true;
    }
}