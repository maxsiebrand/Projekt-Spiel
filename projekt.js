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

const tileSize = 40; // Größe jedes Blocks in Pixeln
const rows = 15;
const cols = 15;
canvas.width = cols * tileSize;
canvas.height = rows * tileSize;

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

// Kollisionsprüfung für Mauern
function canMove(x, y) {
    let col = Math.floor(x / tileSize);
    let row = Math.floor(y / tileSize);
    return map[row][col] === 0;
}


// Update-Funktion
function update() {
    let newX = pacman.x + pacman.dx;
    let newY = pacman.y + pacman.dy;

    if (canMove(newX, pacman.y)) {
        pacman.x = newX;
    }
    if (canMove(pacman.x, newY)) {
        pacman.y = newY;
    }
}

function SpielSchleife() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawPacman();
    drawMap();
    update();
    requestAnimationFrame(SpielSchleife); //Wiederholen
}
SpielSchleife() //Spiel starten

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && canMove(pacman.x + pacman.speed, pacman.y)) {
        pacman.dx = pacman.speed; pacman.dy = 0;
    }
    if (event.key === "ArrowLeft" && canMove(pacman.x - pacman.speed, pacman.y)) {
        pacman.dx = -pacman.speed; pacman.dy = 0;
    }
    if (event.key === "ArrowUp" && canMove(pacman.x, pacman.y - pacman.speed)) {
        pacman.dy = -pacman.speed; pacman.dx = 0;
    }
    if (event.key === "ArrowDown" && canMove(pacman.x, pacman.y + pacman.speed)) {
        pacman.dy = pacman.speed; pacman.dx = 0;
    }
});


const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,0,1,0,0,1],
    [1,0,1,0,1,0,1,1,1,1,0,1,0,1,1],
    [1,0,1,0,0,0,1,0,0,1,0,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,1,0,0,1],
    [1,1,1,0,1,1,1,1,1,1,0,1,0,1,1],
    [1,0,1,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,1,0,0,0,0,1,0,1],
    [1,1,1,0,1,0,1,1,1,1,1,0,1,1,1],
    [1,0,1,0,1,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,1,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// Funktion zum Zeichnen der Karte
function drawMap() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (map[row][col] === 1) {
                ctx.fillStyle = "blue";
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }
}



