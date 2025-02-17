//Spielfeld holen
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d")

//pac Variable
let pacman = {
    x: 50, y:50, //Startposi
    radius: 5,
    speed: 5,
    dx: 0, dy: 0
};

let food ={
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 5,

};

function drawPacman() {
    ctx.beginPath();
    ctx.arc(pacman.x, pacman.y, pacman.radius, 0.2 * Math.PI, 1.8 * Math.PI); //Pac Form
    ctx.lineTo(pacman.x, pacman.y);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath()
}

function SpielSchleife() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawPacman();
    update();
    requestAnimationFrame(SpielSchleife); //Wiederholen
}
SpielSchleife() //Spiel starten




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

Pacman.MAP = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

Pacman.Map = function (size) {

    var height    = null,
        width     = null,
        blockSize = size,
        pillSize  = 0,
        map       = null;

    function withinBounds(y, x) {
        return y >= 0 && y < height && x >= 0 && x < width;
    }

    function isWall(pos) {
        return withinBounds(pos.y, pos.x) && map[pos.y][pos.x] === Pacman.WALL;
    }

    function isFloorSpace(pos) {
        if (!withinBounds(pos.y, pos.x)) {
            return false;
        }
        var peice = map[pos.y][pos.x];
        return peice === Pacman.EMPTY ||
            peice === Pacman.BISCUIT ||
            peice === Pacman.PILL;
    }
    }

function draw(ctx) {

    var s     = map.blockSize,
        angle = calcAngle(direction, position);

    ctx.fillStyle = "#FFFF00";

    ctx.beginPath();

    ctx.moveTo(((position.x/10) * s) + s / 2,
        ((position.y/10) * s) + s / 2);

    ctx.arc(((position.x/10) * s) + s / 2,
        ((position.y/10) * s) + s / 2,
        s / 2, Math.PI * angle.start,
        Math.PI * angle.end, angle.direction);

    ctx.fill();
}

function drawWall(ctx) {

    var i, j, p, line;

    ctx.strokeStyle = "#0000FF";
    ctx.lineWidth   = 5;
    ctx.lineCap     = "round";

    for (i = 0; i < Pacman.WALLS.length; i += 1) {
        line = Pacman.WALLS[i];
        ctx.beginPath();

        for (j = 0; j < line.length; j += 1) {

            p = line[j];

            if (p.move) {
                ctx.moveTo(p.move[0] * blockSize, p.move[1] * blockSize);
            } else if (p.line) {
                ctx.lineTo(p.line[0] * blockSize, p.line[1] * blockSize);
            } else if (p.curve) {
                ctx.quadraticCurveTo(p.curve[0] * blockSize,
                    p.curve[1] * blockSize,
                    p.curve[2] * blockSize,
                    p.curve[3] * blockSize);
            }
        }
        ctx.stroke();
    }
    }
function Karte(Farbe, Ziffer, Bild, Spezialeffekt){
    this.farbe = Farbe
    this.ziffer = Ziffer
    this.bild = Bild
    this.spezialEffekt = Spezialeffekt
}

const spielfeldArray = [
    ["X", "X", "X", "X", "X"],
    ["X", "P", "X", "G", "X"],
    ["X", "X", "X", "X", "X"]];

var spielfeld = "";


function ladeSpielfeld(){
    for (y of spielfeldArray){
        for (x of y){
            spielfeld += x;
        }
        spielfeld += "<br>";
    }
}

//document.getElementById("output").innerHTML = spielfeldArray[1][1];
//document.getElementById("output").innerHTML = früchte;
ladeSpielfeld();
document.getElementById("spielfeld").innerHTML = spielfeld;



function Spielfigur(bild, positionX, positionY){
    this.bild = bild;
    this.positionX = positionX;
    this.positionY = positionY;
}

Pacman = new Spielfigur("P",1,1);



function bewegePacmanOben(){
    spielfeldArray[Pacman.positionY][Pacman.positionX] = "X";
    Pacman.positionY--;
    Pacman.positionX;
    spielfeldArray[Pacman.positionY][Pacman.positionX] = "P";
    spielfeld = "";
    ladeSpielfeld();
    document.getElementById("spielfeld").innerHTML = spielfeld;
}