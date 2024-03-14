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
        let eye;
        for(let i = 1; i < 10; i++){
            if(i === 1 || i ===9){
                sampleCount[i] = 3
            }else{
                sampleCount[i] = 1
            }
        }
        let suit = this.pureSuit()
        if(suit){
            this.hands.forEach((el)=>{
                let key = el.number
                if(sampleCount[key]){
                    sampleCount[key] -=1
                }else{
                    eye = el
                }
            })
        }
        return Object.values(sampleCount).every(el=> el === 0) && suit === eye.suit
    }

    thirteenOrphans(){
        let suits=[];
        let honorSuits=[];
        let eye;
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
        this.hands.forEach((el)=>{
            let key = el.toString()
            if(sampleCount[key]){
                sampleCount[key] -=1
            }else{
                eye = el
            }
        })

        return Object.values(sampleCount).every(el=> el === 0) && [0,1,9].includes(eye.number)

    }

    //check the triplet
    checkTriplet(array){
        //check if array is pong
        if (array.every(ele=> ele.equal(array[0]))) return 'pong';
        //check if array is chow, needs to be sorted
        let one = array[0]
        if(one.connectOne(array[1]) && one.connectTwo(array[2])) return 'chow'
        return false
    }

    //generate array Index
    arrayIndex(array){
        let arrayIndx = {};
        array.forEach((el, idx)=>{
            if(arrayIndx[el.toString()]){
                arrayIndx[el.toString()].push(idx);
            }else{
                arrayIndx[el.toString()] = [idx];
            }
        })
        return arrayIndx
    }
    //check the remaining hand without eye for triplet sequence
    checkRemaining(array){



        //try find triplet sequence unitl there is no index count < 3
        let copy = [...array]
        let deconstruct = []
        let count = array.length / 3
        let arrayIndx = this.arrayIndex(copy)
        while(!Object.values(arrayIndx).every(el1=> el1.length=== 3) && count !== 0){
            let possibleTile = Object.values(arrayIndx).reduceRight((a,b)=>(a.length < b.length) ? a : b)
            let possibleSeq = [possibleTile[0]]
            let selectTile = array[possibleSeq[0]]
            let indexFlatten = Object.values(arrayIndx).flat()
            possibleSeq.push(indexFlatten.find((el)=>selectTile.connectOne(array[el])))
            possibleSeq.push(indexFlatten.find((el)=>selectTile.connectTwo(array[el])))
            if(possibleSeq.every(el=> el !== -1)){
                deconstruct.push(possibleSeq)
                count -=1
                possibleSeq.forEach((el)=>{
                    //update arrayIndx
                    arrayIndx[copy[el].toString()].shift();
                })
                if(count === 0) return deconstruct
            }else{
                arrayIndx[copy[possibleSeq[0]].toString()].shift();
            }
            Object.keys(arrayIndx).forEach((el)=>{
                if(arrayIndx[el].length === 0) delete arrayIndx[el]
            })
        }

        return deconstruct
    }

    trueEye(){
        let handIndex = this.arrayIndex(this.hands)
        let possibleEyes = {}
        for(let key in handIndex){
            let value = handIndex[key]
            if(value.length > 1){
                possibleEyes[key] = value[0]
            }
        }
    }

    //check if the hand can hu
    validHu(){
        ///first find all possible eye pair in hand, iterate through the eye
        //to check if the rest of the hand can be constructed to all triplet of pong or sequence
        //when all tiles are formed accordingly, return the deconstruct hand for further score evaluation
        let handDeconstruct = [];
        let handIndex = this.arrayIndex(this.hands)
        let possibleEyes = {}
        for(let key in handIndex){
            let value = handIndex[key]
            if(value.length ===2){
                possibleEyes[key] = value[0]
            }
        }
        for(let key in possibleEyes){
            //generate the remaining hand without the eye
            //check if remaining can form triplet of seq of pong
            let el = possibleEyes[key];
            let remaining = [...this.hands];
            handDeconstruct.push(remaining.splice(el, 2));
            let seq = this.checkRemaining(remaining)
            //append deconstruct hand
            seq.forEach((el)=>{
                handDeconstruct.push(el.map(el=>remaining[el]))
            })
            //delete all seq from remaining
            seq.flat().sort().forEach((el,idx)=>{
                let decrease = el-idx;
                remaining.splice(decrease, 1);
            })

            let pongIndex = [];

            for(let i = 0; i < remaining.length / 3 ; i++){
                let lens = remaining.slice(i * 3, (i+1) * 3)
                if (this.checkTriplet(lens) === 'pong') {
                    handDeconstruct.push([...lens])
                    pongIndex.push(i * 3);
                }
            }
            //remove all pong in hand
            for(let j = 0; j < pongIndex.length; j++){
                let idx = pongIndex[j];
                remaining.splice(idx, 3)
                pongIndex = pongIndex.map((el)=> {
                    if(el > idx){
                        return el - 3
                    } else{
                        return el
                    };
                })
            }


            //if all tiles are used break the iteration
            if(remaining.length === 0){
                return handDeconstruct;
            }else{
                handDeconstruct = []
            }
        }



    }
    //Generic hand detection
    //check special hand before everything
    //Find the eye pair on hand and divde the rest of the tile as set of 3, if all sets are sequence or pong, the hand is a valid win hand
    //based on the type of sets on hand and melds there are more score calculated

    checkScore(){

        //reset score
        let scoreName = [];
        //check if hand is incomplete
        if(!this.hu || this.maxHand !== 0) return ['The hand is incomplete'];
        //check if hand is a special hand
        let specialHands = [this.sevenPairs, this.thirteenOrphans, this.nineGate];
        specialHands.forEach((fun)=>{
            if (fun.call(this)){
                scoreName.push(fun.name);
            }
        })
        if(scoreName.length > 0 && !scoreName.includes(this.sevenPairs.name)) return scoreName;

        //check suits score: pureSuit, mixSuit, and allHonorSuit, greatWind, littleDragon, littleWind, greatDragon, pureGreen
        let suitScore = [this.pureSuit]
        suitScore.forEach((fun)=>{
            if (fun.call(this)){
                scoreName.push(fun.name);
            }
        })

        if(scoreName.includes(this.sevenPairs.name)) return scoreName;
        //check if hand can be hu
        let deconstruct = this.validHu();
        //find all score name from hand
        if(deconstruct.length > 0) {
            scoreName.push('hu')
            return scoreName
        }else{
            return ['Invalid winning hand']
        }
    }
}


module.exports = Game;
