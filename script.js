// page loads,
// then save html elements as variables, 
// then setup other variables (userScore =0,compScore=0, userName)
// then get user name from prompt or text box with btn
// then when userChoice buttons are clicked 
// when rock btn is clicked, set user choice to rock
// then get computer choice (function randomized) 
// then evaluate of the round (function)
// then points
// then display results
// then check game over()
//D2B48C tan
//FFF5E1 ivory mist
//ADD8E6 light blue
//FFDCC2 peach fuzz
//FFB6B9 cherry blossom

    
let playerName = "";
let playerLives = 3;
let computerLives = 3;

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function startGame() {
    playerName = document.getElementById('playerNameInput').value || "Player";
    document.getElementById('playerName').textContent = playerName;
    showScreen('screen-choose');
}

function goChoose() {
    showScreen('screen-choose');
}

function play(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let resultText = `You chose ${playerChoice}, computer chose ${computerChoice}. `;

    if (playerChoice === computerChoice) {
        resultText += "It's a tie!";
    }
    else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        computerLives--;
        resultText += `${playerName} wins this round!`;
    }
    else {
        playerLives--;
        resultText += "Computer wins this round!";
    }

    updateHearts();
    document.getElementById('roundResult').textContent = resultText;
    showScreen('screen-game');

    if (playerLives === 0 || computerLives === 0) {
        setTimeout(gameOver, 1000);
    }
}

function updateHearts() {
    document.getElementById('playerHearts').textContent = "❤️".repeat(playerLives);
    document.getElementById('computerHearts').textContent = "❤️".repeat(computerLives);
}

function gameOver() {
    document.getElementById('gameOverText').textContent =
        playerLives > 0 ? `${playerName} Wins! 🎉` : "Computer Wins 💻";
    showScreen('screen-gameover');
}

function resetGame() {
    playerLives = 3;
    computerLives = 3;
    updateHearts();
    showScreen('screen-name');
}

function setScaledCursor(width, height, hotX, hotY) {
    const img = new Image();
    img.src = 'whisk.png';
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/png');
        const hx = (typeof hotX === 'number') ? hotX : Math.floor(width / 2);
        const hy = (typeof hotY === 'number') ? hotY : Math.floor(height / 2);
        document.body.style.cursor = `url(${dataUrl}) ${hx} ${hy}, auto`;
    };
    img.onerror = () => {
        console.warn('Could not load whisk.png to create custom cursor.');
    };
}

window.addEventListener('load', () => {
    // Change the numbers here to the desired cursor size and hotspot.
    setScaledCursor(48, 48, 24, 24);

    // Start the game when the user presses Enter in the name input
    const nameInput = document.getElementById('playerNameInput');
    if (nameInput) {
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                startGame();
            }
        });
    }
});