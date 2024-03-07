
class Game{
    constructor(){
        //the hand consist maximum 14 tiles
        //table consists array of arrays where each individual array is the pong,
        // kong, chow display on the table
        //fanName is a dictionary contains all the possible scoring rules in the game
        // and the corresponding score for the combination
        this.hand = [];
        this.maxHand = 14;
        this.table = [];
        this.fanName = {};
    }

    addHand(tile){
        //prevent user to add tile if the hand is full
        if(this.maxHand > 0) {
            this.hand.push(tile);
            this.maxHand -=1;
        }
    }

    addTable(arr){

    }


}


module.exports = Game;
