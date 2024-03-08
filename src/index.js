const Game = require("../game/game.js")
const Tile = require("../game/tile.js")
import View from "./view.js"

const hands= document.querySelector('#hand')
const melds= document.querySelector('#meld')
document.addEventListener("DOMContentLoaded", () => {
    // Your code here
    const v = new View(new Game(), hands, melds);
  });
