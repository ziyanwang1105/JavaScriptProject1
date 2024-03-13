const Tile = require("./tile");

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

        for(let ele in this.suitCount){
            let value = this.suitCount[ele]
            if(value === 14) return ele
        }
        return false
    }

    nineGate(){
        //check if the hand is a nine gate
        //speical hand in pure suit
        let sampleCount = {}
        for(let i = 1; i < 10; i++){
            if(i === 1 || i ===9){
                sampleCount[i] = 3
            }else{
                sampleCount[i] = 1
            }
        }
        sampleCount[this.hu.number] += 1
        if(this.pureSuit()){
            this.hands.forEach((el)=>{
                let key = el.number
                if(sampleCount[key]){
                    sampleCount[key] -=1
                }else{
                    sampleCount[key] = -1
                }
            })
        }
        return Object.values(sampleCount).every(el=> el === 0)
    }

    thirteenOrphans(){
        let suits=[];
        let honorSuits=[];
        Object.keys(this.suitCount).forEach((el)=>{
            if(el.length > 1){
                honorSuits.push(el)
            }else{
                suits.push(el)
            }
        })
        let sampleCount = {}
        suits.forEach((suit)=>{
            sampleCount[`${suit}1`] = 1
            sampleCount[`${suit}9`] = 1
        })
        honorSuits.forEach((ele)=>{
            sampleCount[`${ele}0`] = 1
        })
        sampleCount[this.hu.toString()] +=1
        this.hands.forEach((el)=>{
            let key = el.toString()
            if(sampleCount[key]){
                sampleCount[key] -=1
            }else{
                sampleCount[key] = -1
            }
        })
        return Object.values(sampleCount).every(el=> el === 0)

    }
    //find all pair eyes in the hand and the first index where the eye locate in hand
    allEye(){
        let lens = this.hands.slice(0,2);
        let result = {};
        for(let i = 0; i < this.hands.length - 2; i++){
            if(lens[0].equal(lens[1])){
                let key = lens[0].toString()
                if(!result[key]){
                    result[key] = [i]
                }
            }
            lens.shift();
            lens.push(this.hands[i+2]);
        }
        if(lens[0].equal(lens[1])){
            let key = lens[0].toString()
            if(!result[key]){
                result[key] = [this.hands.length - 1]
            }
        }
        return result
    }
    remainingHand(hand, idx, sliceNum){
        //pass in an eye index and return the remaining hand
        let result;

            if(idx === 0){
                result = hand.slice(sliceNum);
            }else if(idx === hand.length - sliceNum + 1){
                result = hand.slice(0, idx - 1);
            }else{
                result = hand.slice(0,idx).concat(hand.slice(idx + sliceNum, hand.length));
            }

        return result
    }

    //check if the hand can hu
    validHu(){
        ///first find all possible eye pair in hand, iterate through the eye
        //to check if the rest of the hand can be constructed to all triplet of pong or sequence
        //when all tiles are formed accordingly, return the deconstruct hand for further score evaluation
        let handDeconstruct = [];
        let eyes = this.allEye();
        let trueEye;
        let seen = [];
        for(let key in eyes){
            let el = eyes[key][0];
            let remaining = this.remainingHand([...this.hands], el, 2);
            //check if there is any triplet of pong in hand
            if(remaining.length % 3 !== 0) return false
            for(let i = 0; i < remaining.length / 3 ; i++){
                let lens = remaining.slice(i * 3, (i+1) * 3)
                if (lens.every(ele=> ele.equal(lens[0]))) {
                    handDeconstruct.push([...lens])
                    lens.forEach((ele2)=>{
                        seen.push(ele2)
                    })
                }
            }


            //remove all pong in hand and check if there is any triplet of sequence

            //if all tiles are seen break the iteration
            if(seen.length + 2 ===this.hands.length){
                trueEye = new Tile(key.slice(0,key.length - 1),Number(key[key.length-1]))
                console.log(trueEye)
                handDeconstruct.push(trueEye.eye())
                break;
            }else{
                seen = []
                handDeconstruct = []
            }
        }
        return handDeconstruct


    }
    //Generic hand detection
    //check special hand before everything
    //Find the eye pair on hand and divde the rest of the tile as set of 3, if all sets are sequence or pong, the hand is a valid win hand
    //based on the type of sets on hand and melds there are more score calculated

    checkScore(){

        //reset score
        this.scoreName = [];
        //check if hand is incomplete
        if(!this.hu || this.maxHand !== 0) return ['The hand is incomplete'];
        //check if hand is a special hand
        let specialHands = [this.sevenPairs, this.thirteenOrphans, this.nineGate];
        specialHands.forEach((fun)=>{
            if (fun.call(this)){
                this.scoreName.push(fun.name);
            }
        })
        if(this.scoreName > 0) return this.scoreName;

        //check suits score: pureSuit, mixSuit, and allHonorSuit, greatWind, littleDragon, littleWind, greatDragon, pureGreen
        let suitScore = [this.pureSuit]
        suitScore.forEach((fun)=>{
            if (fun.call(this)){
                this.scoreName.push(fun.name);
            }
        })

        if(this.scoreName.includes(this.sevenPairs.name)) return this.scoreName;
        //check if hand can be hu
        let deconstruct = this.validHu();
        //find all score name from hand
        if(deconstruct.length > 0) return this.scoreName;
    }
}


module.exports = Game;
