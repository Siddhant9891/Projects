// Game variables
let score = 0;
let cross = true;
let gameRunning = true;

// Audio (optional - remove if you don't have audio files)
// const audio = new Audio('music.mp3');
// const audiogo = new Audio('gameover.mp3');

// Game elements
const dragon = document.querySelector('.dragon');
const pikachu = document.querySelector('.Pikachu');
const gameOverDiv = document.querySelector('.gameover');
const scoreDisplay = document.getElementById('scorecont');

// Start background music (uncomment if you have audio)
// function startGame() {
//     setTimeout(() => {
//         audio.play().catch(e => console.log("Audio play error:", e));
//     }, 1000);
// }

// Key press handling for dragon jump
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    console.log("Key pressed: ", e.key);
    
    // Jump on spacebar, up arrow, or 'w' key
    if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        // Prevent default behavior (like scrolling)
        e.preventDefault();
        
        // Add jump animation
        dragon.classList.add('animatedragon');
        
        // Remove animation after it completes (0.6s)
        setTimeout(() => {
            dragon.classList.remove('animatedragon');
        }, 600);
    }
});

// Main game loop - collision detection and scoring
const gameLoop = setInterval(() => {
    if (!gameRunning) return;
    
    // Get dragon position
    const dragonLeft = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left')) || 0;
    const dragonBottom = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('bottom'));
    
    // Get pikachu position
    const pikachuLeft = parseInt(window.getComputedStyle(pikachu, null).getPropertyValue('left'));
    const pikachuBottom = parseInt(window.getComputedStyle(pikachu, null).getPropertyValue('bottom'));
    
    // Calculate distance between dragon and pikachu
    const offsetX = Math.abs(dragonLeft - pikachuLeft);
    const offsetY = Math.abs(dragonBottom - pikachuBottom);
    
    // Collision detection (adjust these values based on your image sizes)
    if (offsetX < 150 && offsetY < 100 && pikachuLeft > 0 && pikachuLeft < window.innerWidth) {
        // Game Over
        endGame();
    }
    // Score when pikachu passes dragon
    else if (pikachuLeft < dragonLeft && pikachuLeft > dragonLeft - 150 && cross) {
        // Increment score
        score += 1;
        updateScore();
        cross = false;
        
        // Reset cross flag after pikachu completely passes
        setTimeout(() => {
            cross = true;
        }, 1000);
        
        // Increase game difficulty by speeding up pikachu animation
        increaseDifficulty();
    }
}, 10);

// Update score display
function updateScore() {
    scoreDisplay.innerHTML = `Your score: ${score}`;
}

// Increase game difficulty
function increaseDifficulty() {
    const currentDuration = parseFloat(window.getComputedStyle(pikachu).animationDuration);
    const newDuration = Math.max(1, currentDuration - 0.2); // Minimum 1 second
    pikachu.style.animationDuration = newDuration + 's';
}

// End game function
function endGame() {
    gameRunning = false;
    clearInterval(gameLoop);
    
    // Stop pikachu animation
    pikachu.style.animationPlayState = 'paused';
    
    // Show game over message
    gameOverDiv.innerHTML = `Game Over! Final Score: ${score}<br>Press R to Restart`;
    gameOverDiv.style.display = 'block';
    
    // Play game over sound (uncomment if you have audio)
    // audiogo.play().catch(e => console.log("Game over sound error:", e));
    
    // Stop background music after 1 second (uncomment if you have audio)
    // setTimeout(() => {
    //     audiogo.pause();
    //     audio.pause();
    // }, 1000);
}

// Restart game function
function restartGame() {
    // Reset game variables
    score = 0;
    cross = true;
    gameRunning = true;
    
    // Reset UI
    updateScore();
    gameOverDiv.style.display = 'none';
    gameOverDiv.innerHTML = 'Game Over';
    
    // Reset pikachu animation
    pikachu.style.animationDuration = '5s';
    pikachu.style.animationPlayState = 'running';
    
    // Remove any dragon animation
    dragon.classList.remove('animatedragon');
    
    // Restart game loop
    const newGameLoop = setInterval(() => {
        if (!gameRunning) {
            clearInterval(newGameLoop);
            return;
        }
        
        const dragonLeft = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left')) || 0;
        const dragonBottom = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('bottom'));
        
        const pikachuLeft = parseInt(window.getComputedStyle(pikachu, null).getPropertyValue('left'));
        const pikachuBottom = parseInt(window.getComputedStyle(pikachu, null).getPropertyValue('bottom'));
        
        const offsetX = Math.abs(dragonLeft - pikachuLeft);
        const offsetY = Math.abs(dragonBottom - pikachuBottom);
        
        if (offsetX < 150 && offsetY < 100 && pikachuLeft > 0 && pikachuLeft < window.innerWidth) {
            endGame();
        }
        else if (pikachuLeft < dragonLeft && pikachuLeft > dragonLeft - 150 && cross) {
            score += 1;
            updateScore();
            cross = false;
            
            setTimeout(() => {
                cross = true;
            }, 1000);
            
            increaseDifficulty();
        }
    }, 10);
    
    // Restart background music (uncomment if you have audio)
    // startGame();
}

// Handle restart key press
document.addEventListener('keydown', (e) => {
    if (!gameRunning && (e.key === 'r' || e.key === 'R')) {
        restartGame();
    }
});

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    // Hide game over message initially
    gameOverDiv.style.display = 'none';
    
    // Start game (uncomment if you have audio)
    // startGame();
    
    console.log("Dragon Game Loaded! Use SPACE, UP ARROW, or W to jump!");
});

// Prevent spacebar from scrolling the page
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        e.preventDefault();
    }
});