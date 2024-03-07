class Tile{
    constructor(suit, number){
        // suit has bamboo as b, dots as d, characters as c
        // suit tile has number 1 - 9
        // honor tiles has suit east, south, west ,north, red, green, and white
        //honor tiles doesn't have number so assign as 0
        this.suit = suit;
        this.number = number;
    }

    equal(tile){
        return this.suit === tile.suit && this.number === this.number
    }
}

module.exports = Tile;
