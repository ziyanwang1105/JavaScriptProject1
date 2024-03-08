
class Game{
    constructor(){
        //the hand consist maximum 14 tiles
        //meld consists array of arrays where each individual array is the pong,
        // kong, chow display on the table
        //fanName is a dictionary contains all the possible scoring rules in the game
        // and the corresponding score for the combination
        //MeldType is the dictionary to indicate what type of
        this.hands = [];
        this.maxHand = 14;
        this.melds = [];
        this.fanName = {};
        this.meldTypes = {'pong': false, 'chow': false, 'kong': false, 'closed kong': false};
        this.tileCount = {};
    }

    addTile(tile){
        //inspect the meldType, if all false add the tile to hand, else add to meld accordingly

        if(Object.values(this.meldTypes).every(el=> !el)){
            this.hands.push(tile);
            this.maxHand -=1;
            let keyName = tile.toString()
            if(this.tileCount[keyName]){
                this.tileCount[keyName] +=1;
            }else{
                this.tileCount[keyName] = 1;
            }
        }else{
            let method;
            for(let key in this.meldTypes){
                let value = this.meldTypes[key];
                if(value) method = key;
            }
            let meld = tile.meld(method);
            this.melds.push(meld);
            meld.forEach((ele)=>{
                this.maxHand -=1;
                let eleName = ele.toString()
                if(this.tileCount[eleName]){
                    this.tileCount[eleName] +=1;
                }else{
                    this.tileCount[eleName] = 1;
                }
            })
        }
    }
    meldSwitch(method){
        for(let key in this.meldTypes){
            let value = this.meldTypes[key];
            if(key === method){
                this.meldTypes[key] = !value;
            }else{
                this.meldTypes[key] = false;
            }
        }
    }


}


module.exports = Game;
