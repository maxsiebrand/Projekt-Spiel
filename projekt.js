const board_border = "black"
const board_background = "blue"
const pac_col = "yellow"
const pac_border

let pac = [
    {x: 200, y:100}
]

let score = 0
// True if changing direction
let richtung_aendern = false;
let punkte_x;
let punkt_y;
let dx = 10;
let dy = 0;

const board = document.getElementById("board");
const board_ctx = board.getContext("2d")

gen_punkte()
main()

document.addEventListener("keydown",richtung_aendern);


function main(){
    if (spiel_endet()){
        richtung_aendern = false;
        setTimeout(function (tick()
        ))
    }
}

const packmanboard = document.getElementById("packmanboard");
const packmanboard_ctx = packmanboard.getContext("2d");