const car = document.getElementById("car");
const enemy = document.getElementById("enemy");
const scoreDisplay = document.getElementById("score");
const gameArea = document.getElementById("gameArea");
const crashSound = document.getElementById("crashSound");

let carX = 175;
let enemyX = Math.random() * 350;
let enemyY = -100;
let speed = 5;
let score = 0;
let nitroActive = false;

// 🎮 Smooth key controls (Arrow + WASD)
let keys = {
    left: false,
    right: false
};

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keys.left = true;
    }
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keys.right = true;
    }
    if (e.key === "Shift") {
        activateNitro();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keys.left = false;
    }
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keys.right = false;
    }
});

// 📱 Mobile controls
function moveLeft() {
    if (carX > 0) carX -= 25;
}
function moveRight() {
    if (carX < 350) carX += 25;
}
function nitro() {
    activateNitro();
}

// ⚡ Nitro boost
function activateNitro() {
    if (!nitroActive) {
        nitroActive = true;
        speed += 5;

        setTimeout(() => {
            speed -= 5;
            nitroActive = false;
        }, 2000);
    }
}

// 🎮 Game loop
function gameLoop() {

    // Smooth movement
    if (keys.left && carX > 0) carX -= 6;
    if (keys.right && carX < 350) carX += 6;

    car.style.left = carX + "px";

    // Enemy movement
    enemyY += speed;

    if (enemyY > 600) {
        enemyY = -100;
        enemyX = Math.random() * 350;
        score++;
        speed += 0.2;
    }

    enemy.style.top = enemyY + "px";
    enemy.style.left = enemyX + "px";

    // 💥 Collision detection
    const carRect = car.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    if (
        carRect.left < enemyRect.right &&
        carRect.right > enemyRect.left &&
        carRect.top < enemyRect.bottom &&
        carRect.bottom > enemyRect.top
    ) {
        // 🔊 Play crash sound
        crashSound.currentTime = 0;
        crashSound.play();

        // Delay so sound plays before reload
        setTimeout(() => {
            alert("💥 Game Over! Score: " + score);
            location.reload();
        }, 300);
    }

    // 🛣️ Road animation
    let bgY = parseInt(gameArea.style.backgroundPositionY || 0);
    gameArea.style.backgroundPositionY = (bgY + speed) + "px";

    scoreDisplay.innerText = "Score: " + score;

    requestAnimationFrame(gameLoop);
}

gameLoop();