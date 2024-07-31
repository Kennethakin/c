
let score = 0;
let timer = 300; // 5 minutes in seconds
let gameInterval;
let endGame = false;

document.addEventListener('DOMContentLoaded', () => {
    const userGuessInput = document.getElementById('userGuess');
    const submitGuessButton = document.getElementById('submitGuess');
    const resultElement = document.getElementById('result');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('time');
    const finalScoreElement = document.getElementById('finalScore');
    const finalScoreValue = document.getElementById('finalScoreValue');
    const remarksElement = document.getElementById('remarks');

    submitGuessButton.addEventListener('click', () => {
        if (endGame) return;
        
        const userGuess = parseInt(userGuessInput.value, 10);
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 9) {
            alert('Please enter a number between 1 and 9.');
            return;
        }

        const randomNumber = Math.floor(Math.random() * 9) + 1;

        if (userGuess === randomNumber) {
            resultElement.textContent = `Correct! The number was ${randomNumber}.`;
            resultElement.className = 'correct';
            score += 10;
        } else {
            resultElement.textContent = `Wrong! The number was ${randomNumber}.`;
            resultElement.className = 'incorrect';
            score -= 5;
        }

        scoreElement.textContent = score;
        userGuessInput.value = '';
    });

    function updateTimer() {
        if (timer <= 0) {
            endGame = true;
            clearInterval(gameInterval);
            finalScoreElement.classList.remove('hidden');
            finalScoreValue.textContent = score;
            remarksElement.textContent = score > 0 ? 'Well done!' : 'Better luck next time!';
            return;
        }
        timer -= 1;
        timerElement.textContent = timer;
    }

    gameInterval = setInterval(updateTimer, 1000);

    userGuessInput.addEventListener('input', () => {
        resultElement.className = '';
        resultElement.textContent = '';
    });
});
