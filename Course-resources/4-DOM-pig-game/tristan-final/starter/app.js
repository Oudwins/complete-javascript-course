/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable) //Also set it to 0 when next player// DONE
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
/* working();
function working() {
  document.querySelector(".dice-0").classList.toggle("dice-hidden");
  document.querySelector(".dice-1").classList.toggle("dice-hidden");
}
 */
////////////////////////////////////////////////////////////////////////////////////////////////////
var scores, roundScore, activePlayer, diceDOM, gamePlaying, previousRoll;
// DICE IMAGE DOM
/* diceDOM = document.querySelector(".dice"); */
diceDOM = document.querySelectorAll(".dice");

// Hide Dice Image
function hideDice() {
  for (var i = 0; i < diceDOM.length; i++) {
    diceDOM[i].classList.add("dice-hidden");
  }
}
// ! Initialize game Function
init();
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
    // Loop for rolling 2 dice
    for (i = 0; i < diceDOM.length; i++) {
      // Generate Random Number
      var dice = Math.floor(Math.random() * 6) + 1;
      // Show Dice image with Number
      diceDOM[i].src = "./dice-" + dice + ".png";
      // Remove Dice-Hidden Class For loop
      diceDOM[i].classList.remove("dice-hidden");

      // Check for NextPlayer Rules
      // If roll 2 6s in a row
      if (previousRoll === 6 && dice === 6) {
        scores[activePlayer] = 0;
        document.getElementById("score-" + activePlayer).textContent = "0";
        nextPlayer();
        break;
        // If roll a 1
      } else if (dice === 1) {
        nextPlayer();
        break;
      } else {
        roundScore += dice;
        document.querySelector(
          "#current-" + activePlayer
        ).textContent = roundScore;
      }
      // Store previous roll
      previousRoll = dice;
    }
  }
});
// ! Hold Btn
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    // Var of Custom Win Score (entered by input)
    var customWinScore = parseFloat(
      document.getElementById("winning-score").value
    );
    // ! Determine Winning Score Goal
    if (customWinScore) {
      var winningScore = customWinScore;
    } else {
      winningScore = 100;
    }
    // ! Determine Winner
    if (scores[activePlayer] >= winningScore) {
      winnerFound();
    } else {
      nextPlayer();
    }

    // ! Winner Found Function
    function winnerFound() {
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
    }
  }
});

// ! Next Player
function nextPlayer() {
  setTimeout(function() {
    hideDice();
    roundScore = 0;
    previousRoll = 0;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    // Next Players Turn
    activePlayer === 1 ? (activePlayer = 0) : (activePlayer = 1);
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
  }, 300);
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
