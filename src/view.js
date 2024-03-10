class View {
    constructor(game, hand, meld, tile){
        this.game = game //game object that store and evaluate hand and meld
        this.hand = hand //html element from id hand
        this.meld = meld //html element from id meld
        this.tile = tile //local storage of all tiles
        this.setupTileSelector()
    }
    //generate all tile
    //add event listener for clicing the tile and it will either add to hand or meld
    //need a tracker to track the number of tile used and cannot exceed more than 4 tiles with
    //the same suit and number used in the hand + meld
    //disable the tile click if adding it in will violate the above rule

    setupTileSelector(){
        let tileSelector = document.querySelector('#tile_selector')
        let ul = document.createElement("ul")
        ul.setAttribute("class", "tiles")
        this.tile.map((el, index)=>{
            let li = document.createElement("li")
            li.setAttribute("tile_index", index)
            li.setAttribute("class", `tile ${el.toString()}`)
            let img = document.createElement("img")
            img.setAttribute("src",`../img/64/fulltiles/${index}.png`)
            li.appendChild(img)
            ul.appendChild(li)
        })
        tileSelector.append(ul)
    }
    setupClicker(){

    }
    //clicking the tile will append tile in hand / meld and store the tile class object in an array
    //e is the event for clicking tile
    //check the game class meld type to see where to add the tile
    //check the game class tile count and disable the tiles click if it cannot be added
    clickTile(e){

    }
    //clicking the meld type button will change the click tile action
    //only the chosen one type value become true  and change all other value to false
    //Meld type button can either be selected one or none
    clickMeld(e){

    }

}

export default View
