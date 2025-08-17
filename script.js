const colors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let gameActive = false;
let level = 0;

// ✅ Detect event type (mobile vs desktop)
const startEvent = ("ontouchstart" in window) ? "touchstart" : "keydown";
const clickEvent = ("ontouchstart" in window) ? "touchstart" : "click";

// --- Start Game / Restart Game ---
$(document).on(startEvent, function (e) {
  // Ignore taps on color buttons when game is active
  if ($(e.target).hasClass("btn") && gameActive) return;

  if (!gameActive) {
    level = 0;
    gamePattern = [];
    $("#level-title").text("Level " + level);
    gameActive = true;
    nextSequence();
  }
});

// --- Player Click/Tap ---
$(".btn").on(clickEvent, function (e) {
  e.preventDefault();

  if (!gameActive) return;

  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// --- Helper Functions ---
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomChosenColor = colors[randomIndex];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    $("#level-title").text("Game Over! Tap Anywhere or Press Any Key to Restart");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);

    gameActive = false;
    level = 0;
    gamePattern = [];
  }
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play().catch(() => {});
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(() => $("#" + color).removeClass("pressed"), 100);
}
