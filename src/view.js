class View {
    constructor(game){
        this.game = game
        this.setupTileSelector()
    }
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
            let tile = `${honorSuits[honorSuit]} 0`
            li.setAttribute("tile", tile)
            li.innerText = tile
            ul.appendChild(li)
        }
        tileSelector.append(ul)
    }
}

export default View
