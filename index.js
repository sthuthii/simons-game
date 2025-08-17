const colors = ["green", "red", "yellow", "blue"];
let sequence = [];
let playerSequence = [];
let gameActive = false;

// Button references
const colorButtons = {
  red: document.getElementById("red"),
  green: document.getElementById("green"),
  blue: document.getElementById("blue"),
  yellow: document.getElementById("yellow")
};

// ✅ Detect event type (mobile vs desktop)
const startEvent = ("ontouchstart" in window) ? "touchstart" : "keydown";
const clickEvent = ("ontouchstart" in window) ? "touchstart" : "click";

// ✅ Start game with key/tap
$(document).on(startEvent, function () {
  if (!gameActive) {
    $("h1").text("YOUR GAME HAS BEEN STARTED");
    gameActive = true;
    sequence = [];
    playerSequence = [];
    generateRandomColor();
  }
});

// ✅ Generate random color and add to sequence
function generateRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  sequence.push(randomColor);

  // Flash the chosen button
  $("#" + randomColor)
    .fadeOut(100)
    .fadeIn(100);

  console.log("Sequence:", sequence);
}

// ✅ Player taps/clicks a color
$(".btn").on(clickEvent, function (e) {
  e.preventDefault(); // prevent double-firing on some mobiles

  if (!gameActive) return;

  const chosenColor = $(this).attr("id");
  playerSequence.push(chosenColor);

  console.log("Player sequence:", playerSequence);

  checkPlayerSequence();
});

// ✅ Check player's sequence
function checkPlayerSequence() {
  const currentStep = playerSequence.length - 1;

  if (playerSequence[currentStep] !== sequence[currentStep]) {
    $("h1").text("Game Over! Tap or Press Any Key to Restart");
    gameActive = false;
    return;
  }

  // If player completed the sequence correctly
  if (playerSequence.length === sequence.length) {
    playerSequence = [];
    setTimeout(generateRandomColor, 1000);
  }
}
