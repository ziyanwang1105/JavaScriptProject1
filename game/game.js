
class Game{
    constructor(){
        //the hand consist maximum 14 tiles
        //meld consists array of arrays where each individual array is the pong,
        // kong, chow display on the table
        //fanName is a dictionary contains all the possible scoring rules in the game
        // and the corresponding score for the combination
        //MeldType is the dictionary to indicate what type of
        this.hand = [];
        this.maxHand = 14;
        this.meld = [];
        this.fanName = {};
        this.meldTypes = {'pong': false, 'chow': false, 'kong': false, 'closed kong': false}
        this.tileCount = {}
    }

    addTile(tile){
        //inspect the meldType, if all false add the tile to hand, else add to meld accordingly
        //prevent user to add tile if the hand is full or number of same card excced 4 in hand
        if(Object.values(this.meldTypes).every(el=> !el)){
            if(this.maxHand > 0 && this.tileCount[tile] < 4) {
                this.hand.push(tile);
                this.maxHand -=1;
                if(this.tileCount[tile]){
                    this.tileCount[tile] +=1
                }else{
                    this.tileCount[tile] = 1
                }
            }else{
                throw tile
            }
        }else{

        }

    }


}


module.exports = Game;
