const colors = ["green", "red", "yellow", "blue"];
let gamePattern = []; // Stores the sequence the game generates
let userClickedPattern = []; // Stores the sequence the player clicks

let gameActive = false; // Controls if the game is currently running
let level = 0; // Tracks the current level of the game

// Button references (though jQuery handles most interactions, these are good for initial understanding)
const colorButtons = {
  red: document.getElementById("red"),
  green: document.getElementById("green"),
  blue: document.getElementById("blue"),
  yellow: document.getElementById("yellow")
};

// ✅ Detect event type (mobile vs desktop)
const startEvent = ("ontouchstart" in window) ? "touchstart" : "keydown";
const clickEvent = ("ontouchstart" in window) ? "touchstart" : "click";

// --- Start Game ---
$(document).on(startEvent, function () {
  if (!gameActive) {
    $("#level-title").text("Level " + level); // Update the level display on screen
    gameActive = true; // Set game to active
    nextSequence(); // Start the first sequence of the game
  }
});

// --- Player Click/Tap ---
$(".btn").on(clickEvent, function (e) {
  e.preventDefault(); // Prevent ghost clicks on mobile

  if (!gameActive) return; // Ignore if game isn't running

  const userChosenColor = $(this).attr("id"); // Get button color
  userClickedPattern.push(userChosenColor); // Add to user sequence

  playSound(userChosenColor); // Play sound
  animatePress(userChosenColor); // Animate button press

  checkAnswer(userClickedPattern.length - 1); // Check answer
});

// --- Helper Functions ---

function nextSequence() {
  userClickedPattern = []; // Reset player sequence
  level++; // Increment level
  $("#level-title").text("Level " + level);

  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomChosenColor = colors[randomIndex];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
  console.log("Game Pattern:", gamePattern);
}
