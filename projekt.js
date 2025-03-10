//Spielfeld holen
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d")
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");


const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,1,0,1,0,1,1],
    [1,0,1,0,0,0,1,0,0,0,0,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,1,0,0,1],
    [1,1,1,0,1,1,1,1,1,1,0,1,0,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,0,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,1,0,0,0,0,0,0,1],
    [1,1,1,0,1,0,1,1,1,1,1,0,1,1,1],
    [1,0,1,0,1,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const tileSize = 40; // Größe jedes Blocks in Pixeln
const rows = map.length;;
const cols = map[0].length;;
canvas.width = cols * tileSize;
canvas.height = rows * tileSize;

//pac Variable
let pacman = {
    x: tileSize + tileSize / 2,
    y: tileSize + tileSize / 2,
    radius: 10,
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

// Kollisionsprüfung für Mauern
function canMove(x, y) {
    let col = Math.floor(x / tileSize);
    let row = Math.floor(y / tileSize);
    return map[row] && map[row][col] === 0;
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
    drawMap();
    drawPacman();
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


function drawMap() {
    console.log("Map wird gezeichnet...");
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (map[row][col] === 1) {
                ctx.fillStyle = "blue";
            } else {
                ctx.fillStyle = "black";
            }
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            ctx.strokeStyle = "white";
            ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
}

startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    canvas.style.display = "block";
    SpielSchleife();
});
