var colors = ["yellow","blue","green","red"];
var numLevel = 0;
var patternCPU = [];
var patternPlayer = [];

function buttonPress(color) {
    var id = "#" + color;
    $(id).addClass("pressed");
    setTimeout(function() {
        $(".btn").removeClass("pressed");
    }, 100);
    if (color === "blue") {
        var blue = new Audio("sounds/blue.mp3");
        blue.volume = 0.1;
        blue.play();
    } else if (color === "green") {
        var green = new Audio("sounds/green.mp3");
        green.volume = 0.1;
        green.play();
    } else if (color === "red") {
        var red = new Audio("sounds/red.mp3");
        red.volume = 0.1;
        red.play();
    } else if (color === "yellow") {
        var yellow = new Audio("sounds/yellow.mp3");
        yellow.volume = 0.1;
        yellow.play();
    }
}

$(".btn").on("click", function() {
    var color = $(this).attr("id");
    buttonPress(color);
    patternPlayer.push(color);
});

$(document).keydown(function(e) {
    if (e.key === "1") {
        buttonPress("yellow");
        patternPlayer.push("yellow");
    } else if (e.key === "2") {
        buttonPress("blue");
        patternPlayer.push("blue");
    } else if (e.key === "4") {
        buttonPress("green");
        patternPlayer.push("green");
    } else if (e.key === "5") {
        buttonPress("red");
        patternPlayer.push("red");
    }
});

function showPattern(array) {
    for (var i = 0; i < array.length; i++) {
        function timedButtonPress() {
            var color = array[i];
            setTimeout(function(){
                buttonPress(color);
            }, (i + 1) * 500);
        }
        timedButtonPress();
    }
}

function playLevel() {
    numLevel++;
    $("h1").text("Level " + numLevel);
    var numRandom = Math.floor(Math.random() * 4);
    patternCPU.push(colors[numRandom]);
    showPattern(patternCPU);
    patternPlayer = [];
}

function gameOver() {
    $("h1").text("Game Over, Press Any Key to Restart");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.volume = 0.1;
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 100);
    numLevel = 0;
    patternCPU = [];
}

// Press Any Key To Start
$(document).keydown(function() {
    if (patternCPU.length === 0) {
        setTimeout(function(){
            playLevel();
        }, 500);
    }
});

// Game Logic
function checkPatterns() {
    if (patternCPU.length > 0) {
        var index = patternPlayer.length - 1;
        if (patternCPU[index] === patternPlayer[index]) {
            if (patternCPU.length === patternPlayer.length) {
                setTimeout(function(){
                    playLevel();
                }, 500);
            }
        } else {
            gameOver();
        }
    }
}

$(document).keydown(checkPatterns);

$(".btn").on("click", checkPatterns);
