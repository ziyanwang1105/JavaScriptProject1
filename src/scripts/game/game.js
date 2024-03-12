
class Game{
    constructor(tiles){
        //the hand consist maximum 14 tiles
        //meld consists dictionary where the value is array of arrays where each individual array is the pong,
        // kong, chow display on the table
        //scoreName is a list contains all the possible scoring from winning hand
        //MeldType is the dictionary to indicate what type of
        //hu is the final card added to the hand that player win the game
        //tileCount keep track of tile used in the hand in dictionary
        //initialize tileCount with the tiles passed in the constructor
        this.tiles = tiles;
        this.hands = [];
        this.maxHand = 14;
        this.melds = {'chow':[], 'pong': [], 'kong': [], 'closed_kong': []};
        this.hu
        this.scoreName = []
        this.meldTypes = {'chow': false, 'pong': false, 'kong': false, 'closed_kong': false};
        this.tileCount = {};
        this.tiles.forEach((tile)=>{
            this.tileCount[tile.toString()] = 0
        })
        this.suitCount = {}
        this.tiles.forEach((tile)=>{
            this.suitCount[tile.suit] = 0
        })
    }

    addTile(tile){
        //inspect the meldType, if all false add the tile to hand, else add to meld accordingly
        let method = this.checkMeld()
        let result = []
        if(method === 'hand'){
            this.hands.push(tile);
            result.push(tile)
            this.maxHand -=1;
            let keyName = tile.toString();
            this.tileCount[keyName] +=1;
            this.suitCount[tile.suit] +=1;
            this.handSort()
            if(this.maxHand === 0) {this.hu = tile};
        }else{
            result = tile.meld(method);
            this.melds[method].push(result);
            this.maxHand -= 3
            result.forEach((ele)=>{
                let eleName = ele.toString()
                this.tileCount[eleName] +=1;
                this.suitCount[ele.suit] +=1;
            })
        }
        return result
    }

    meldSwitch(method){
        //call the function when the button is clicked in frontend
        for(let key in this.meldTypes){
            let value = this.meldTypes[key];
            if(key === method){
                this.meldTypes[key] = !value;
            }else{
                this.meldTypes[key] = false;
            }
        }
    }

    checkMeld(){
        let method;
        if(Object.values(this.meldTypes).every(el=> !el)){
            method = 'hand';
        }else{
            for(let key in this.meldTypes){
                let value = this.meldTypes[key];
                if(value) method = key;
            }
        }
        return method;
    }

    validAdds(){
        //return the list of tile that can be added to based on the meld type
        let method = this.checkMeld();
        let result = []
        if(method === 'hand'){
            if(this.maxHand === 0) return result;
            this.tiles.forEach((tile)=>{
                if(this.tileCount[tile.toString()] + 1 <=4){
                    result.push(tile.toString());
                }
            })
        }else{
            if(this.maxHand < 3) return result;
            this.tiles.forEach((ele)=>{
                let meld = ele.meld(method);
                let subCount = {}
                meld.forEach((ele)=>{
                    let keyName = ele.toString();
                    if(subCount[keyName]){
                        subCount[keyName] +=1;
                    }else{
                        subCount[keyName] = 1;
                    }
                })
                for(let key in subCount){
                    let value = subCount[key];
                    if(this.tileCount[key] + value <=4){
                        subCount[key] = true;
                    }else{
                        subCount[key] = false;
                    }
                }
                if(Object.values(subCount).every(el=>el)){
                    result.push(ele.toString())
                }
            })
        }
        return result
    }

    tileCompare(tile1, tile2){
        let idx1;
        let idx2;
        this.tiles.forEach((tile, index)=>{
            if(tile1.toString() === tile.toString()) idx1 = index;
            if(tile2.toString() === tile.toString()) idx2 = index;
        })
        return idx1 > idx2 ? 1 : -1
    }

    handSort(){
        this.hands.sort((a,b)=>this.tileCompare(a,b))
    }

    handToString(){
        return this.hands.map((el)=>el.toString()).join(' ')
    }

    //Score detection
    //Special hand detection
    sevenPairs(){
        //check if all tiles are in hand and they all comes in pair
        return Object.values(this.tileCount).every(el=>el === 2 || el === 0) && Object.values(this.melds).every(el => el.length === 0)
    }

    pureSuit(){
        //check if the hand + meld is pure suit or not. If it is return the pure suit symbol, else return false
        let suit;
        for(let ele in this.suitCount){
            let value = this.suitCount[ele]
            if(value === 14) suit = ele
            return suit
        }
        return false
    }

    nineGate(){
        //check if the hand is a nine gate
        //speical hand in pure suit
        if(this.pureSuit()){


        }
    }

    //Generic hand detection
    //Find the eye pair on hand and divde the rest of the tile as set of 3, if all sets are sequence or pong, the hand is a valid win hand
    //based on the type of sets on hand and melds there are more score calculated
}


module.exports = Game;
