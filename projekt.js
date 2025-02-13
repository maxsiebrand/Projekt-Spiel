const board_border = "black"
const board_background = "blue"
const pac_col = "yellow"
const pac_border="blue"
const pacboard ="red"

let shim = [
    {x:100, y:50}
]
let pac = [
    {x: 200, y:100}
]

let score = 0

let richtung_aendern = false;

const pacboard = document.getElementById("pacboard");



main()

document.addEventListener("keydown",changedirection);


function main(){
    if (spiel_endet()){
        richtung_aendern = false;
        setTimeout(function (ontick){
            draw();
            drawWall();
            main();
            drawMauer();
        }, 100)
    }
}



pacboard.MAP = [
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

pacboard.Map = function (size) {

    var height    = null,
        width     = null,
        map       = null;

    function withinBounds(y, x) {
        return y >= 0 && y < height && x >= 0 && x < width;
    }

    function isWall(pos) {
        return withinBounds(pos.y, pos.x) && map[pos.y][pos.x] === pacboard.WALLS;
    }

    function isFloorSpace(pos) {
        if (!withinBounds(pos.y, pos.x)) {
            return false;
        }
        var peice = map[pos.y][pos.x];

    }
    }

function draw(ctx) {

    var s     = pacboard.blockSize,
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

    for (i = 0; i < pacboard.WALLS.length; i += 1) {
        line = pacboard.WALLS[i];
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
}

function changedirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (richtung_aendern) return;
    richtung_aendern = true;
    const keyPressed = event.keyCode;
    const goingUp = (dy === -10);
    const goingDown = (dy === 10);
    const goingRight = (dx === 10);
    const goingLeft = (dx === -10);
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

