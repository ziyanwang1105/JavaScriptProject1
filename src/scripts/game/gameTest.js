const Game= require("./game")
const Tile = require("./tile")

a1 = new Tile('b', 1)
a2 = new Tile('b', 1)
a3 = new Tile('b', 2)
a4 = new Tile('b', 4)
a5 = new Tile('c', 1)
a6 = new Tile('east', 0)
a7 = new Tile('b', 7)
a8 = new Tile('b', 8)
const tiles = [];
let suits = ['c', 'b', 'd'];
let honorSuits = ['east', 'south', 'west' ,'north', 'red', 'green', 'white'];
for(let suit in suits){
    for(let i = 1; i < 10; i++){
        let newTile = new Tile(suits[suit], i);
        tiles.push(newTile);
  }
}
for(let honorSuit in honorSuits){
    let honorTile = new Tile(honorSuits[honorSuit], 0);
    tiles.push(honorTile);
  }
////check tile class

///check equal & connect

// console.log(a1.equal(a2))//true
// console.log(a1.equal(a3))//false
// console.log(a1.connect(a3))//true
// console.log(a1.connect(a4))//false
// console.log(a1.connect(a5))//false
// console.log(a1.equal(a5))//false
// console.log(a1.equal(a6))//false

////check game class
g = new Game(tiles)
///check addTile

// g.addTile(a1)
// g.addTile(a1)
// for(let i =0; i < 2; i++){
//   g.addTile(a6)
// }
// // console.log(g)
// // console.log(g.hands)
// // console.log(g.maxHand)
// // if(a1 in g.tileCount){
// //     console.log(true)
// // }

///check meldswitch and meld add

// g.meldSwitch('pong')
// g.addTile(a3)
// g.meldSwitch('kong')
// g.addTile(a7)
// console.log(g.melds)
// g.meldSwitch('pong')
// g.addTile(a8)
// g.meldSwitch('pong')
// g.addTile(a6)

///check tile compare for sorting

// console.log(g.tileCompare(a1, a2))
// console.log(g.tileCompare(a1, a6))
// console.log(g.hands)
// console.log(g.tileCount)

///check valid adds function
// g.meldSwitch('chow')
// console.log(g.validAdds())
// console.log(g)
// console.log(a1.meld('chow'))
// console.log(a1.meld('pong'))
// console.log(a1.meld('kong'))
// console.log(a7.meld('chow'))
// console.log(a8.meld('chow'))

///check score evaluation

//thirteen orphans hand
// let thirteen = []
// suits.forEach((suit)=>{
//   let one = new Tile(suit, 1)
//   let nine = new Tile(suit, 9)
//   thirteen.push(one)
//   thirteen.push(nine)
// })
// for(let honorSuit in honorSuits){
//   let honorTile = new Tile(honorSuits[honorSuit], 0);
//   thirteen.push(honorTile);
// }
// thirteen.forEach((el)=>{
//   g.addTile(el)
// })
// g.addTile(a1)
// console.log(g.handToString())
// console.log(g.hu)

//7 pair hand
// for(let i = 0; i < 2; i++){
//   g.addTile(a1)
//   g.addTile(a3)
//   g.addTile(a4)
//   g.addTile(a5)
//   g.addTile(a6)
//   g.addTile(a7)
//   g.addTile(a8)
// }
// console.log(g.handToString())
// console.log(g.hu)
// console.log(g.sevenPairs())
// console.log(g.suitCount)

//pure suit hand and nine Gate hand
for(let i = 1; i < 10; i++){
  g.addTile(new Tile('c', i))
  if(i === 1 || i ===9){
    g.addTile(new Tile('c', i))
    g.addTile(new Tile('c', i))
  }
}
g.addTile(new Tile('c', 2))
console.log(g.handToString())
console.log(g.hu)
console.log(g.pureSuit())
