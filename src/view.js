class View {
    constructor(game, tile){
        this.game = game //game object that store and evaluate hand and meld
        this.tile = tile //local storage of all tiles
        this.clickTile = this.clickTile.bind(this)
        this.setupTileSelector()
        this.setupClickers()
        this.setupMeldClickers()

    }
    //generate all tile
    //add event listener for clicing the tile and it will either add to hand or meld
    //need a tracker to track the number of tile used and cannot exceed more than 4 tiles with
    //the same suit and number used in the hand + meld
    //disable the tile click if adding it in will violate the above rule

    setupTileSelector(){
        let tileSelector = document.querySelector('#tile_selector')
        let ul = document.createElement("ul");
        ul.setAttribute("class", "tiles");
        this.tile.map((el, index)=>{
            let li = document.createElement("li");
            li.setAttribute("class", `${el.toString()}`);
            let img = document.createElement("img");
            img.setAttribute("src",`../img/64/fulltiles/${index}.png`);
            img.setAttribute("tile_index", index);
            li.appendChild(img);
            ul.appendChild(li);
        })
        tileSelector.append(ul)
    }

    setupClickers(){
        let clickable = this.game.validAdds();
        let tiles = document.querySelectorAll('.tiles > li')
        tiles.forEach((ele)=>{
            ele.removeEventListener('click', this.clickTile)
            if(clickable.includes(ele.className)){
                ele.addEventListener('click', this.clickTile);
            }
        })
    }

    setupMeldClickers(){
        let melds = document.querySelectorAll('#meld_type > button')
        melds.forEach((buttons)=>{
            buttons.addEventListener('click', this.clickMeld.bind(this))
        })
    }

    //clicking the tile will append tile in hand / meld and store the tile class object in an array
    //e is the event for clicking tile
    //check the game class meld type to see where to add the tile
    //check the game class tile count and disable the tiles click if it cannot be added
    clickTile(e){
        e.preventDefault()
        // e.currentTarget.removeEventListener('click', this.clickTile);
        let clickIndex = e.target.getAttribute("tile_index");
        let selectTile = this.game.tiles[clickIndex];
        let method = this.game.checkMeld()
        let addObject = this.game.addTile(selectTile);
        if(method === 'hand'){
            let hands = document.querySelector('.hands');
            addObject.forEach((ele)=>{
                let li = document.createElement("li");
                li.setAttribute("class", `${ele.toString()}`);
                let index = this.tile.indexOf(ele)
                let img = document.createElement("img");
                img.setAttribute("src",`../img/64/fulltiles/${index}.png`);
                img.setAttribute("tile_index", index);
                li.appendChild(img);
                hands.append(li);
            })
        }else{
            let melds = document.querySelector('.melds');
            let li2 = document.createElement("li")
            let ul = document.createElement("ul");
            ul.setAttribute("meldType", `${method}`);
            addObject.forEach((ele)=>{
                let li = document.createElement("li");
                li.setAttribute("class", `${ele.toString()}`);
                let index;
                this.tile.forEach((ele2, i)=>{
                    if(ele2.equal(ele)) index = i;
                })
                let img = document.createElement("img");
                img.setAttribute("src",`../img/64/fulltiles/${index}.png`);
                img.setAttribute("tile_index", index);
                li.appendChild(img);
                ul.appendChild(li);
                li2.appendChild(ul)
                melds.append(li2);
            })
        }
        // let newClickable = this.game.validAdds()
        // this.clickTile = this.clickTile.bind(this)
        // console.log(newClickable.includes(selectTile.toString()))
        // console.log(selectTile.toString())
        // console.log(newClickable)
        // if(newClickable.includes(selectTile.toString())) {
        //     console.log('add')
        //     e.currentTarget.addEventListener('click', this.clickTile)
        // }
        this.setupClickers()

    }

    //clicking the meld type button will change the click tile action
    //only the chosen one type value become true  and change all other value to false
    //Meld type button can either be selected one or none


    clickMeld(e){
        e.preventDefault()
        let method = e.target.getAttribute("id")
        this.game.meldSwitch(method)
        this.setupClickers()

    }

}

export default View
