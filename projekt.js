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
const rows = map.length;
const cols = map[0].length;
canvas.width = cols * tileSize;
canvas.height = rows * tileSize;

//pac Variable
let pacman = {
    x: tileSize + tileSize / 2,
    y: tileSize + tileSize / 2,
    radius: 10,
    speed: 1.5,
    dx: 0, dy: 0
};

let points = [];

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        if (map[row][col] === 0) {
            points.push({
                x: col * tileSize + tileSize / 2,
                y: row * tileSize + tileSize / 2,
                radius: 5,
                collected: false
            });
        }
    }
}

function drawPacman() {
    ctx.beginPath();
    ctx.arc(pacman.x, pacman.y, pacman.radius, 0.2 * Math.PI, 1.8 * Math.PI); //Pac Form
    ctx.lineTo(pacman.x, pacman.y);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath()
}

function drawPoints() {
    ctx.fillStyle = "white";
    points.forEach(point => {
        if (!point.collected) {
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
    });
}

function checkPointCollision() {
    points.forEach(point => {
        if (!point.collected) {
            let dx = pacman.x - point.x;
            let dy = pacman.y - point.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < pacman.radius) {
                point.collected = true;
                score++; // Score erhöhen
            }
        }
    });
}

// Kollisionsprüfung für Mauern
function canMove(x, y) {
    let leftCol = Math.floor((x - pacman.radius) / tileSize);
    let rightCol = Math.floor((x + pacman.radius) / tileSize);
    let topRow = Math.floor((y - pacman.radius) / tileSize);
    let bottomRow = Math.floor((y + pacman.radius) / tileSize);

    return (
        map[topRow] && map[topRow][leftCol] === 0 && map[topRow][rightCol] === 0 &&
        map[bottomRow] && map[bottomRow][leftCol] === 0 && map[bottomRow][rightCol] === 0
    );
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
    checkPointCollision()
    checkCollisionWithGhosts();
    moveGeister();
}

let score = 0;
const totalPoints = points.length; // Gesamte Punkteanzahl

// Funktion zum Zeichnen des Scores
function drawScore() {
    ctx.fillStyle = "yellow";
    ctx.font = "24px Arial";
    ctx.fillText(`Score: ${score} / ${totalPoints}`, canvas.width - 160, 25);
}

startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    canvas.style.display = "block";
    SpielSchleife();
});

function SpielSchleife() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawMap();
    drawPoints()
    drawPacman();
    drawGeister();
    drawScore();
    update();
    checkWinCondition();
    requestAnimationFrame(SpielSchleife); //Wiederholen
}


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




function checkWinCondition() {
    if (points.every(point => point.collected)) {
        showWinScreen();
    }
}

// Funktion, um eine zufällige gültige Position für Geister zu finden
function findValidSpawn() {
    let validPositions = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (map[row][col] === 0) {
                validPositions.push({ x: col * tileSize + tileSize / 2, y: row * tileSize + tileSize / 2 });
            }
        }
    }

    // Wähle eine zufällige gültige Position
    return validPositions[Math.floor(Math.random() * validPositions.length)];
}

// Geister-Objekte (starten jetzt an einer validen Position)
let geister = [
    { ...findValidSpawn(), radius: 15, speed: 0.8, dx: 0.8, dy: 0 },
    { ...findValidSpawn(), radius: 15, speed: 0.8, dx: 0, dy: 0.8 },
    { ...findValidSpawn(), radius: 15, speed: 0.8, dx: 0.8, dy: 0 },
    { ...findValidSpawn(), radius: 15, speed: 0.8, dx: 0.8, dy: 0 },
];

// Funktion zum Zeichnen der Geister
function drawGeister() {
    geister.forEach(geist => {
        ctx.beginPath();
        ctx.arc(geist.x, geist.y, geist.radius, 0, Math.PI * 2); // Kreis für den Geist
        ctx.fillStyle = "red"; // Geisterfarbe
        ctx.fill();
        ctx.closePath();
    });
}

function moveGeister() {
    geister.forEach(geist => {
        let newX = geist.x + geist.dx;
        let newY = geist.y + geist.dy;

        // Wenn die neue Position eine Wand ist, Richtung ändern
        if (!canMove(newX, geist.y) || !canMove(geist.x, newY)) {
            let possibleDirections = [
                { dx: geist.speed, dy: 0 },   // Rechts
                { dx: -geist.speed, dy: 0 },  // Links
                { dx: 0, dy: geist.speed },   // Unten
                { dx: 0, dy: -geist.speed }   // Oben
            ];

            // Filtere gültige Bewegungen
            let validDirections = possibleDirections.filter(dir => canMove(geist.x + dir.dx, geist.y + dir.dy));

            // Falls keine gültige Richtung: Zurück zur vorherigen Position
            if (validDirections.length === 0) {
                geist.dx *= -1;
                geist.dy *= -1;
            } else {
                // Wähle eine zufällige Richtung aus den gültigen
                let newDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
                geist.dx = newDirection.dx;
                geist.dy = newDirection.dy;
            }
        } else {
            // Falls keine Kollision, Geist normal bewegen
            geist.x = newX;
            geist.y = newY;
        }
    });
}

// Kollisionsprüfung für Pac-Man mit Geistern
function checkCollisionWithGhosts() {
    for (let geist of geister) {
        let dx = pacman.x - geist.x;
        let dy = pacman.y - geist.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < pacman.radius + geist.radius) {
            resetGame();
            return;
        }
    }
}

function resetGame() {
    // Pac-Man auf Startposition zurücksetzen
    pacman = {
        x: tileSize + tileSize / 2,
        y: tileSize + tileSize / 2,
        radius: 10,
        speed: 1.5,
        dx: 0, dy: 0
    };

    // Punkte zurücksetzen
    points.forEach(point => point.collected = false);
    score = 0;

    // Geister auf neue zufällige gültige Positionen setzen
    geister = [
        { ...findValidSpawn(), radius: 15, speed: 0.8, dx: 0.8, dy: 0 },
        { ...findValidSpawn(), radius: 15, speed: 0.8, dx: 0.8, dy: 0 },
        { ...findValidSpawn(), radius: 15, speed: 0.8, dx: 0.8, dy: 0 },
        { ...findValidSpawn(), radius: 15, speed: 0.8, dx: 0, dy: 0.8 }
    ];
}


function showWinScreen() {
    // Spielfeld ausblenden
    canvas.style.display = "none";

    // Gewinnerscreen erstellen
    let winScreen = document.createElement("div");
    winScreen.innerHTML = "<h1>Glückwunsch! Du hast gewonnen! 🎉</h1><button onclick='restartGame()'>Neustart</button>";
    winScreen.style.position = "absolute";
    winScreen.style.top = "50%";
    winScreen.style.left = "50%";
    winScreen.style.transform = "translate(-50%, -50%)";
    winScreen.style.background = "black";
    winScreen.style.color = "yellow";
    winScreen.style.padding = "20px";
    winScreen.style.textAlign = "center";
    winScreen.style.borderRadius = "10px";
    document.body.appendChild(winScreen);
}

// Funktion zum Neustarten des Spiels
function restartGame() {
    location.reload(); // Seite neu laden, um das Spiel zurückzusetzen
}

