const colors = ["green", "red", "yellow", "blue"];
let sequence = [];
let playerSequence = [];
let currentStep = 0;
let gameActive = false;

const colorButtons = {
    red : document.getElementById("red"),
    green : document.getElementById("green"),
    blue : $("blue"),
    yellow : document.getElementById("yellow")
};

$(document).keydown(function(event){
    $("h1").text("YOU'RE GAME HAS BEEN STARTED");
    gameActive = true;
    console.log(gameActive);
});

if(gameActive){
    generateRandomColor();
    checkPlayerSequence();
}

function generateRandomColor(){
    var randomColor = Math.floor(Math.random(colors)*4)+1;
    sequence.push(randomColor);
}