document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const target = document.getElementById('target');
    const gameArea = document.getElementById('gameArea');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const gameOverDisplay = document.getElementById('gameOver');
    const startButton = document.getElementById('startButton');

    let score = 0;
    let timeLeft = 60; // 1 minute in seconds
    let targetMoveTimeout;
    let timerInterval;

    function getRandomPosition() {
        const areaRect = gameArea.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const x = Math.random() * (areaRect.width - targetRect.width);
        const y = Math.random() * (areaRect.height - targetRect.height);
        return { x, y };
    }

    function moveTarget() {
        const { x, y } = getRandomPosition();
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
        clearTimeout(targetMoveTimeout); // Clear the previous timeout
        targetMoveTimeout = setTimeout(moveTarget, 2000); // Set a timeout to move the target in 2 seconds
    }

    function movePlayer(event) {
        const areaRect = gameArea.getBoundingClientRect();
        const x = event.clientX - areaRect.left - (player.offsetWidth / 2);
        const y = event.clientY - areaRect.top - (player.offsetHeight / 2);
        
        if (x >= 0 && x <= areaRect.width - player.offsetWidth &&
            y >= 0 && y <= areaRect.height - player.offsetHeight) {
            player.style.left = `${x}px`;
            player.style.top = `${y}px`;
        }
    }

    function checkCollision() {
        const playerRect = player.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        
        if (!(playerRect.right < targetRect.left ||
            playerRect.left > targetRect.right ||
            playerRect.bottom < targetRect.top ||
            playerRect.top > targetRect.bottom)) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            moveTarget(); // Move target immediately upon collision
        }
    }

    function updateTimer() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearTimeout(targetMoveTimeout);
            gameArea.style.display = 'block'; // Ensure game area is visible
            gameOverDisplay.textContent = `Final Score: ${score}`;
            gameOverDisplay.classList.remove('hidden'); // Show game over message
            scoreDisplay.classList.remove('hidden'); // Show final score
            timerDisplay.classList.add('hidden'); // Hide timer
            target.classList.add('hidden'); // Hide target
            player.classList.add('hidden'); // Hide player
            return;
        }
        
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        timerDisplay.textContent = `Time Left: ${minutes}:${seconds}`;
        
        timeLeft--;
    }

    function startGame() {
        score = 0;
        timeLeft = 60; // Reset to 1 minute
        scoreDisplay.textContent = `Score: ${score}`;
        timerDisplay.textContent = `Time Left: 1:00`;
        gameArea.style.display = 'block'; // Show game area
        gameOverDisplay.classList.add('hidden'); // Hide game over message
        scoreDisplay.classList.remove('hidden'); // Show score
        timerDisplay.classList.remove('hidden'); // Show timer
        target.classList.remove('hidden'); // Show target
        player.classList.remove('hidden'); // Show player
        moveTarget(); // Initial target position
        timerInterval = setInterval(updateTimer, 1000); // Update timer every second
    }

    startButton.addEventListener('click', () => {
        startButton.style.display = 'none'; // Hide start button
        startGame(); // Start the game and timer
    });

    document.addEventListener('mousemove', movePlayer);
    target.addEventListener('click', checkCollision);
});
