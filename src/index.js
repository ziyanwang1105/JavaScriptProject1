const Game = require("../game/game.js")
const Tile = require("../game/tile.js")
import View from "./view.js"

const hands= document.querySelector('#hand')
const melds= document.querySelector('#meld')
const tiles= [];

document.addEventListener("DOMContentLoaded", () => {
  let suits = ['c', 'b', 'd']
  let honorSuits = ['east', 'south', 'west' ,'north', 'red', 'green', 'white']
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
  const v = new View(new Game(tiles), hands, melds, tiles);
  });
