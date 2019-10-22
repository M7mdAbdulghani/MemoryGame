var userClickedPatterns = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;

// $(document).keydown(function(){
//     if(!gameStarted){
//         $("#level-title").html("Level " + level);
//         generateRandomColor();
//     }
//     gameStarted = true;
// });

document.addEventListener('touchstart', function(e) {
    if(!gameStarted){
        $("#level-title").html("Level " + level);
        generateRandomColor();
    }
    gameStarted = true;
});




$(".btn").click(function(event){
    var userChosenColor = event.target.id;
    userClickedPatterns.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    var answer = checkAnswer();
    if(answer){
        if(userClickedPatterns.length === gamePattern.length){
            reset();
            setTimeout(function(){
                generateRandomColor();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
    }
});

function generateRandomColor(){
    //For generating the first color 
    var randomChosenColor = buttonColors[nextSequence()];
    gamePattern.push(randomChosenColor);
    var selectedButton = $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

function nextSequence(){
    level++;
    $("#level-title").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}

function playSound(randomChosenColor){
    var audio = new Audio('sounds/'+ randomChosenColor +'.mp3');
    audio.play();
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}


function checkAnswer(){
    var answer;
    for(var i = 0; i < userClickedPatterns.length; i++) {
        if(userClickedPatterns[i] !== gamePattern[i]){
            answer = false;
        }
        else{
            answer = true;
        }
    }
    return answer;
}

function reset(){
    userClickedPatterns = [];
}

function startOver(){
    gameStarted = false;
    level = 0;
    gamePattern = [];
    userClickedPatterns = [];
}