import { Ship } from './ship';

export const SHIPSET1: Ship[] = [
    new Ship(1, "Aircraft Carrier", 5, "A",  [[3,2], [3,3], [3,4], [3,5], [3,6] ] ),
    new Ship(2, "Battleship", 4, "B",  [ [6,5], [7,5], [8,5], [9,5] ] ),
    new Ship(3, "Cruiser", 3, "C",  [ [1,2], [1,3], [1,4] ] ),
    new Ship(4, "Submarine", 3, "S",  [ [4,9], [5,9], [6,9] ]  ),
    new Ship(5, "Destroyer", 2, "D",  [ [5,3], [6,3] ])
]