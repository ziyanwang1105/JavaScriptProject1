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
        //return true if the tile has same number and suit
        return this.suit === tile.suit && this.number === tile.number
    }
    connect(tile){
        //return true if the tile can connect as a triplet sequence
        const numDiff = Math.abs(this.number - tile.number)
        return this.suit === tile.suit && numDiff < 2 && numDiff > 0
    }
}

module.exports = Tile;
