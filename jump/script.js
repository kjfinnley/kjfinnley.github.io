var character = document.getElementById("character");
const img = new Image(50, 30);
img.src = 'bordercollie2.png';
character.appendChild(img);

var block = document.getElementById("block");
const img2 = new Image(30, 24);
img2.src = 'sheep2.png';
block.appendChild(img2);

var scoreDisplay = document.getElementById("score");
var score = 0;
var passedBlock = false;

function jump() {
    if (character.classList != "animate") {
        character.classList.add("animate");
    }
    setTimeout(function() {
        character.classList.remove("animate");
    }, 500);
}

var checkDead = setInterval(function() {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    // Collision detection
    if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
        block.style.animation = "none";
        block.style.display = "none";
        alert("You lose 😔\nFinal Score: " + score);
        score = 0;
        scoreDisplay.innerText = "Score: " + score;
        block.style.display = "block";
        block.style.animation = "block 1s infinite linear";
        passedBlock = false;
    }

    // Check if block has been passed successfully
    if (blockLeft < 0 && !passedBlock) {
        score++;
        scoreDisplay.innerText = "Score: " + score;
        passedBlock = true;
    }

    // Reset passedBlock when block is far right
    if (blockLeft > 450) {
        passedBlock = false;
    }

}, 10);
