export class Ship {
    id: number;
    name: string;
    health: number;
    symbol: string; 
    position = []; //this will be an array of points [[x1,y1], ... , [xn, yn]
    readonly totalHealth; //used for measurements, so make a read only property    

    constructor(id: number, name: string, health: number, symbol: string, position: any[]){
        this.id = id;
        this.name = name;
        this.health = health;
        this.totalHealth = health;
        this.symbol = symbol;
        this.position = position;
    }

    hit(): void {
        console.log(this.name + ' has been hit');
        this.health--;
    }

    isSunk(): boolean {
        return this.health === 0;
    }
}