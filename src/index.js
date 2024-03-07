const Game = require("../game/game.js")
import View from "./view.js"
document.addEventListener("DOMContentLoaded", () => {
    // Your code here
    const v = new View(new Game());
  });
