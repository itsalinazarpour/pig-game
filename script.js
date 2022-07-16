"use strict";

// selectig elements

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const playerActiveEl = document.querySelector(".player--active");

// set initial score to "0"

let currentScore, scores, activePlayer, playing;
const init = function () {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current1El.textContent = 0;
  current0El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

// run the above function

init();

// switching player

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
};
// reaction to roll btn

btnRoll.addEventListener("click", function () {
  if (playing) {
    diceEl.classList.remove("hidden");
    const randonNumber = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${randonNumber}.png`;

    if (randonNumber === 1) {
      switchPlayer();
    } else {
      currentScore += randonNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

// implement hold button

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] > 99) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
