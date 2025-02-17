document.addEventListener("DOMContentLoaded", () => {
    const gameMusic = document.getElementById("game-music");
    const damageSound1 = document.getElementById("damage-sound1");
    const damageSound2 = document.getElementById("damage-sound2");
    const thunderSound = document.getElementById("thunder-sound");
    const dice = document.getElementById("dice");
    const hp1 = document.getElementById("hp1");
    const hp2 = document.getElementById("hp2");
    const lightning = document.getElementById("lightning");
    const gameMessage = document.getElementById("game-message");
    const restartBtn = document.getElementById("restart-btn");

    let musicStarted = false;
    let hpValues = { player1: 100, player2: 100 };
    let currentPlayer = "player1";  // Começa com o player 1
    let gameOver = false;


    document.body.addEventListener("click", () => {
        if (!musicStarted) {
            gameMusic.play();
            musicStarted = true;
        }
    });

    const switchTurn = () => {
        currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
    };

    setInterval(() => {
        if (!gameOver) {
            lightning.style.background = "rgba(255, 255, 255, 0.6)";
            thunderSound.play();
            setTimeout(() => { lightning.style.background = "rgba(255, 255, 255, 0)"; }, 200);
        }
    }, 3000);

    dice.addEventListener("click", () => {
        if (gameOver) return;

        let roll = setInterval(() => {
            dice.innerText = Math.floor(Math.random() * 25) + 1;
        }, 100);

        setTimeout(() => {
            clearInterval(roll);
            let damage = parseInt(dice.innerText);
            let target = currentPlayer === "player1" ? hp2 : hp1;
            let targetId = currentPlayer === "player1" ? "player2" : "player1";
            let targetSound = target === hp1 ? damageSound1 : damageSound2;


            hpValues[targetId] -= damage;
            let newWidth = Math.max(0, (hpValues[targetId] / 100) * 100);
            target.style.width = newWidth + "%";


            document.getElementById(targetId).classList.add("damage-effect");
            setTimeout(() => {
                document.getElementById(targetId).classList.remove("damage-effect");
            }, 300);

            targetSound.play();

            if (hpValues[targetId] <= 0) {
                gameOver = true;
                gameMessage.innerText = targetId === "player1" ? "Player 2 Ganhou!" : "Player 1 Ganhou!";
                gameMessage.style.display = "block";
                dice.style.background = "black";
                dice.innerText = "";
                restartBtn.classList.remove("hidden"); 
            }


            switchTurn();
        }, 2000);
    });

    restartBtn.addEventListener("click", () => {
        gameOver = false;
        hpValues = { player1: 100, player2: 100 };
        hp1.style.width = "100%";
        hp2.style.width = "100%";
        dice.style.background = "white";
        gameMessage.style.display = "none";
        restartBtn.classList.add("hidden");
        dice.innerText = "🎲";
    });
});