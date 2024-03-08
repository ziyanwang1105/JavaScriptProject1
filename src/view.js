class View {
    constructor(game, hand, meld){
        this.game = game //game object that store and evaluate hand and meld
        this.hand = hand //html element from id hand
        this.meld = meld //html element from id meld
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
        let suits = ['b', 'b', 'd']
        let honorSuits = ['east', 'south', 'west' ,'north', 'red', 'green', 'white']
        for(let suit in suits){
            for(let i = 1; i < 10; i++){
                let li = document.createElement("li")
                let tile = `${suits[suit]} ${i}`
                li.setAttribute("tile", tile)
                li.innerText = tile
                ul.appendChild(li)
            }
        }
        for(let honorSuit in honorSuits){
            let li = document.createElement("li")
            let tile = `${honorSuits[honorSuit]}`
            li.setAttribute("tile", tile)
            li.innerText = tile
            ul.appendChild(li)
        }
        tileSelector.append(ul)
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
