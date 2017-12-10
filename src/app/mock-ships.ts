import { Ship } from './ship';

export const SHIPSET1: Ship[] = [
    new Ship(1, "Aircraft Carrier", 5, "A",  [[3,2], [3,3], [3,4], [3,5], [3,6] ] ),
    new Ship(2, "Battleship", 4, "B",  [ [6,5], [7,5], [8,5], [9,5] ] ),
    new Ship(3, "Cruiser", 3, "C",  [ [1,2], [1,3], [1,4] ] ),
    new Ship(4, "Submarine", 3, "S",  [ [4,9], [5,9], [6,9] ]  ),
    new Ship(5, "Destroyer", 2, "D",  [ [5,3], [6,3] ])
]

// export const SHIPSET2: Ship[] = [
//     { id: 1, name: "Aircraft Carrier", health: 5, symbol: "A", position: [ [8,4], [8,5], [8,6], [8,7], [8,8] ] },
//     { id: 2, name: "Battleship", health: 4, symbol: "B", position: [ [4,6], [5,6], [6,6], [7,6] ] },
//     { id: 3, name: "Cruiser", health: 3, symbol: "C", position: [ [10,6], [10,7], [10,8] ] },
//     { id: 4, name: "Submarine", health: 3, symbol: "S", position: [ [1,2], [2,2], [3,2] ] },
//     { id: 5, name: "Destroyer", health: 2, symbol: "D", position: [ [1,9], [2,9] ] }
// ]

// export const SHIPSET3: Ship[] = [
//     { id: 1, name: "Aircraft Carrier", health: 5, symbol: "A", position: [ [2,6], [3,6], [4,6], [5,6], [6,6] ] },
//     { id: 2, name: "Battleship", health: 4, symbol: "B", position: [ [7,4], [7,5], [7,6], [7,7] ] },
//     { id: 3, name: "Cruiser", health: 3, symbol: "C", position: [ [9,7], [9,8], [9,9] ] },
//     { id: 4, name: "Submarine", health: 3, symbol: "S", position: [ [1,10], [2,10], [3,10] ] },
//     { id: 5, name: "Destroyer", health: 2, symbol: "D", position: [ [1,8], [1,9] ] }
// ]

// export const SHIPSET4: Ship[] = [
//     { id: 1, name: "Aircraft Carrier", health: 5, symbol: "A", position: [ [2,6], [2,7], [2,8], [2,9], [2,10] ] },
//     { id: 2, name: "Battleship", health: 4, symbol: "B", position: [ [7,7], [7,8], [7,9], [7,10] ] },
//     { id: 3, name: "Cruiser", health: 3, symbol: "C", position: [ [7,3], [8,3], [9,3] ] },
//     { id: 4, name: "Submarine", health: 3, symbol: "S", position: [ [5,6], [5,7], [5,8] ] },
//     { id: 5, name: "Destroyer", health: 2, symbol: "D", position: [ [2,3], [3,3] ] }
// ]