const board_border = "black"
const board_background = "blue"
const pac_col = "yellow"
const pac_border="blue"

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
        setTimeout(function (ontick){
            clearfeld();
            drawpunkte();
            beweg_pac();
            drawPac();
            main();
            drawMauer();
        }, 100)
    }
}

function drawPac(){
    pac.forEach()
}



const packmanboard = document.getElementById("packmanboard");
const packmanboard_ctx = packmanboard.getContext("2d");

let mauerteile=[
    {x:150, y: 100},
    {x:160, y: 100},
    {x:170, y: 100},
    {x:180, y: 100},
    {x:190, y: 100},
    {x:200, y: 100},
    {x:210, y: 100},
    {x:220, y: 100}
]

function drawMauer(){
    mauerteile.forEach(drawMauerPart)
}


function drawMauerPart(mauerteile) {

    snakeboard_ctx.fillStyle = mauer_col;
    snakeboard_ctx.strokestyle = mauer_border;
    snakeboard_ctx.fillRect(mauerteile.x, mauerteile.y, 10, 10);
    snakeboard_ctx.strokeRect(mauerteile.x, mauerteile.y, 10, 10);
}


