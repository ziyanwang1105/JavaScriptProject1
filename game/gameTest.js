const Game= require("./game")
const Tile = require("./tile")

a1 = new Tile('b', 1)
a2 = new Tile('b', 1)
a3 = new Tile('b', 2)
a4 = new Tile('b', 4)
a5 = new Tile('c', 1)
a6 = new Tile('east', 0)
// console.log(a1.equal(a2))//true
// console.log(a1.equal(a3))//false
// console.log(a1.connect(a3))//true
// console.log(a1.connect(a4))//false
// console.log(a1.connect(a5))//false
// console.log(a1.equal(a5))//false
// console.log(a1.equal(a6))//false
g = new Game()
g.addHand(a1)
console.log(g.hand)
console.log(g.maxHand)