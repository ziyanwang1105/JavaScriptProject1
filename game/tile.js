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
    meld(method){
        //return the meld array of tile based on the method
        let result = []
        switch (method){
            case 'chow':
                if(this.number < 7){
                    let tile2 = new Tile(this.suit, this.number + 1);
                    let tile3 = new Tile(this.suit, this.number + 2);
                    result.push(this, tile2, tile3);
                }else{
                    for(let i = 7; i < 10; i++) {
                        let newTile = new Tile(this.suit, i);
                        result.push(newTile);
                    }
                }
                break;
            case 'pong':
                for(let i = 0; i < 3; i++){
                    let newTile2 = new Tile(this.suit, this.number);
                    result.push(newTile2);
                }
                break;
            case 'kong':
                for(let i = 0; i < 4; i++){
                    let newTile2 = new Tile(this.suit, this.number);
                    result.push(newTile2);
                }
                break;
        }
        return result
    }
}

module.exports = Tile;
