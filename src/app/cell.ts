export class Cell {
    value: string;
    isChecked: boolean;
    xPos: number;
    yPos; number;
    shipId: number; 
    constructor(x: number, y: number, value: string) {
        this.xPos = x;
        this.yPos = y;
        this.value = value;
        this.isChecked = false;
        this.shipId = -1;
    }
}