/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, diceDOM, gamePlaying;
// DICE DOM
diceDOM = document.querySelector(".dice");

init();
// Hide/Show Dice Image
function hideDice() {
  diceDOM.classList.toggle("dice-hidden");
}
// ! Initialize game Function
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  // Change Number Values to 0
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
}
// ! Roll Btn
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // Generate Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    // Show Dice image with Number
    diceDOM.src = "./dice-" + dice + ".png";
    diceDOM.classList.remove("dice-hidden");
    // Store Current Value
    if (dice !== 1) {
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});
// ! Hold Btn

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    // ! DETERMINE WINNER
    if (scores[activePlayer] >= 20) {
      hideDice();
      gamePlaying = false;
      //Change player name to winner
      document.getElementById("name-" + activePlayer).textContent = "Winner";
      // Change classes to Winner
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

// ! Switch Player
function nextPlayer() {
  hideDice();
  roundScore = 0;
  document.querySelector("#current-" + activePlayer).textContent = roundScore;
  // Next Players Turn
  activePlayer === 1 ? (activePlayer = 0) : (activePlayer = 1);
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

// ! New Game Button

document.querySelector(".btn-new").addEventListener("click", function() {
  // Eliminate Winner related CSS and HTML
  document.getElementById("name-" + activePlayer).textContent =
    "PLAYER " + (activePlayer + 1);
  // Change classes to Winner
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
  init();
});
