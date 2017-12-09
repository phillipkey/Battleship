export class Ship {
    id: number;
    name: string;
    health: number;
    symbol: string; //this will be an array of points [[x1,y1], ... , [xn, yn]
    position = [];

    hit() {
        this.health--;
    }

    isSunk(): boolean {
        return this.health === 0;
    }
}