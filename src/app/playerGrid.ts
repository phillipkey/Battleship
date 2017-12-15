import { Cell } from "./cell";
import { Ship } from "./ship";

export class PlayerGrid {
    grid: Cell[];

    constructor(){
        this.grid = [];
    }

    findCell(position: number[]): Cell {
        return this.grid.find(cell => cell.xPos == position[0] && cell.yPos == position[1]);
    }

    setValues(ship:Ship) {
        ship.position.forEach(point => {
            var tempCell = this.grid.find(cell => cell.xPos == point[0] && cell.yPos == point[1]);
            tempCell.value = "X";
            tempCell.shipId = ship.id;
            tempCell.highlight = true;
        })
    }

    validRange(ship: Ship, cell: Cell): boolean {
        console.log("cell: " + cell.xPos + "," + cell.yPos);
        console.log("ship: " + ship.position[0][0] + "," + ship.position[0][1]);
        var startX = Math.min(ship.position[0][0], cell.xPos);
        var startY = Math.min(ship.position[0][1], cell.yPos);
        var endX = Math.max(ship.position[0][0], cell.xPos);
        var endY = Math.max(ship.position[0][1], cell.yPos);
        ship.position = [];
        if (startX == endX) {
            for (var y = startY; y <= endY; y++) {
                var tempCell = this.grid.find(temp => temp.xPos == startX && temp.yPos == y);
                console.log("Checking valid placement in cell: " + tempCell.xPos + "," + tempCell.yPos);
                if (!tempCell.isEmpty()) {
                    console.log("The range is not empty.");
                    return false;
                } else {
                    ship.position.push([startX, y]);
                }
            }
        } else {
            for (var x = startX; x <= endX; x++) {
                var tempCell = this.grid.find(temp => temp.yPos == startY && temp.xPos == x);
                console.log("Checking valid placement in cell: " + tempCell.xPos + "," + tempCell.yPos);                
                if (!tempCell.isEmpty()) {
                    console.log("The range is not empty.");
                    return false;
                } else {
                    ship.position.push([x, startY]);
                }     
            }
        }
        console.log("the range is clear and ready to place.");
        return true;
    }
}