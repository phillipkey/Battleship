export class Ship {
    id: number;
    name: string;
    health: number;
    symbol: string; //this will be an array of points [[x1,y1], ... , [xn, yn]
    position = [];

    constructor(id: number, name: string, health: number, symbol: string, position: any[]){
        this.id = id;
        this.name = name;
        this.health = health;
        this.symbol = symbol;
        this.position = position;
    }

    hit(): void {
        this.health--;
    }

    isSunk(): boolean {
        return this.health === 0;
    }
}