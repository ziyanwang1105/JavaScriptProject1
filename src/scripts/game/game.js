
class Game{
    constructor(tiles){
        //the hand consist maximum 14 tiles
        //meld consists array of arrays where each individual array is the pong,
        // kong, chow display on the table
        //fanName is a dictionary contains all the possible scoring rules in the game
        // and the corresponding score for the combination
        //MeldType is the dictionary to indicate what type of
        this.tiles = tiles;
        this.hands = [];
        this.maxHand = 14;
        this.melds = [];
        this.hu
        this.meldTypes = {'chow': false, 'pong': false, 'kong': false, 'closed_kong': false};
        this.tileCount = {};
        this.tiles.forEach((tile)=>{
            this.tileCount[tile.toString()] = 0
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
            this.handSort()
            if(this.maxHand === 0) {this.hu = tile};
        }else{
            result = tile.meld(method);
            this.melds.push(result);
            this.maxHand -= 3
            result.forEach((ele)=>{
                let eleName = ele.toString()
                this.tileCount[eleName] +=1;
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
}


module.exports = Game;
