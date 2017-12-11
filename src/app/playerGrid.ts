import { Cell } from "./cell";
import { Ship } from "./ship";

export class PlayerGrid {
    grid: Cell[];

    constructor(){
        this.grid = [];
    }

    validRange(endPoint: number[], cell: Cell): boolean {
        var x = endPoint[0];
        var y = endPoint[1];
        if (x == cell.xPos) {
            this.grid.find(temp => cell.xPos == x && temp.yPos > cell.yPos && temp.yPos < y).for
            // get cells between [x, cell.ypos] and [x, y]
            // check each for value != "O", return false if found
        } else {
            // get cells between [cell.xpos, y] and [x, y]
            // check each for value != "O", return false if found
        }
        return true;
    }
}