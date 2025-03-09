let selectedWord = "";
let guessedWord = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 6;
const gallowsParts = document.querySelectorAll(".gallows-part");

function startGame() {
    fetch('getWord.php')
        .then(response => response.json())
        .then(data => {
            if (data.word) {
                selectedWord = data.word.toUpperCase();
                guessedWord = Array(selectedWord.length).fill("_");
                incorrectGuesses = 0;
                updateWordDisplay();
                generateLetterButtons();
                document.getElementById("message").textContent = "";
                gallowsParts.forEach(part => part.classList.add("hidden"));
                if (document.getElementById("cheatMode").checked) {
                    alert("Cheat Mode: The word is " + selectedWord);
                }
            } else {
                console.error('Error fetching word:', data.error);
            }
        })
        .catch(error => console.error('Error:', error));
}

function updateWordDisplay() {
    document.getElementById("wordToGuess").textContent = guessedWord.join(" ");
}

function generateLetterButtons() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lettersDiv = document.getElementById('letters');
    lettersDiv.innerHTML = '';
    letters.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.onclick = () => guessLetter(letter, button);
        lettersDiv.appendChild(button);
    });
}

function guessLetter(letter, button) {
    button.disabled = true;
    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        updateWordDisplay();
        if (!guessedWord.includes("_")) {
            document.getElementById("message").textContent = "Congratulations! You won!";
        }
    } else {
        incorrectGuesses++;
        updateGallows();
        if (incorrectGuesses >= maxIncorrectGuesses) {
            document.getElementById("message").textContent = "Game Over! The word was: " + selectedWord;
        }
    }
}

function updateGallows() {
    if (incorrectGuesses <= maxIncorrectGuesses) {
        gallowsParts[incorrectGuesses - 1].classList.remove("hidden");
    }
}

// Initialize the game
startGame();
