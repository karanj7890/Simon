var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;

//set level to 0
var level = 0;
//jquery to detect when keyboard is pressed
$(document).keypress(function () {
    if (!started) {

        // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    //call checkAnswer
    checkAnswer(userClickedPattern.length-1);


});
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function()  {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        //calling startover
        startOver();
        
    }

}



function nextSequence() {

    userClickedPattern=[];

    level++;

    $("#level-title").text("Level " + level);

    randomNumber = Math.floor(Math.random() * 3 + 1);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);


    //animate
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    //sound
    playSound(randomChosenColor);
}


function playSound(name) {

    var audio = new Audio('sounds/' + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    var activeButton = $("." + currentColor);
    activeButton.addClass("pressed");

    setTimeout(function () {
        activeButton.removeClass("pressed");
    }, 100);

}

//startover
function startOver() {
    level= 0;
    gamePattern=[];
    started= false;

}















