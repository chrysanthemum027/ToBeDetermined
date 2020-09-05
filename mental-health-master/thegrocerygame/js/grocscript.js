var canvas;
var context;
var keyPressed = {};
var score = 0;
var movingSpeed = 5;
var lives = 3;
var dead;
var candySprite;
var veggieSprite;
var hardCandySprite;
var cottonSprite;
var bagSprite;
var bkgSprite;
var music;
var ding;
var error;
var highScore = localStorage.getItem('highscore') || 0;

var bag = {
	posX: 200,
	posY: 370,
	disWidth: 100,
	disHeight: 130,
};

var veggie = {
	posX: 150,
	posY: -25,
	disWidth: 60,
	disHeight: 60,
};

var candy = {
	posX: 330,
	posY: -25,
	disWidth: 50,
	disHeight: 80,
}

var hardCandy = {
	posX: 260,
	posY: -25,
	disWidth: 80,
	disHeight: 40,
}

var cotton = {
	posX: 80,
	posY: -25,
	disWidth: 60,
	disHeight: 90,
}

window.onload = init;

function init(){
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
    var x = canvas.width / 2;
	var y = canvas.height / 2;
    context.font = "22px Verdana";
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.fillText('In this game, you are at the grocery store',x,200);
    context.fillText('determined to make healthy choices. Only', x,222);
    context.fillText('collect the veggies!', x, 244);
    context.fillText('Use the arrow keys to move the bag.', x, 276);
    context.fillText('Click anywhere to start.', x, 298);
    canvas.addEventListener('mousedown', chooseDifficulty, false);
    candySprite = document.getElementById('candy');
    veggieSprite = document.getElementById('veggie');
    hardCandySprite = document.getElementById('hardCandy');
    cottonSprite = document.getElementById('cotton');
    bagSprite = document.getElementById('bag');
    bkgSprite = document.getElementById('background');
    music = document.getElementById('music');
    music.loop = true;
    music.autoplay = true;
    ding = document.getElementById('ding');
    error = document.getElementById('error');
    window.onkeydown = keydown;
    window.onkeyup = keyup;
}

function chooseDifficulty(){
	context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width,canvas.height);
	$('.myButtonE').css('display', 'inline-block');
	$('.myButtonH').css('display', 'inline-block');
	context.font = "30px Verdana";
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.fillText('Choose a difficulty below.',250,250);
}

function drawEasy(){
	$('.myButtonE').css('display', 'none');
	$('.myButtonH').css('display', 'none');
	canvas.removeEventListener('mousedown', chooseDifficulty, false);
	if(!dead){
    	context.drawImage(bkgSprite, 0, 0, 500, 500);
		context.drawImage(bagSprite,bag.posX, bag.posY, bag.disWidth, bag.disHeight);
		context.drawImage(veggieSprite,veggie.posX, veggie.posY, veggie.disWidth, veggie.disHeight);
		context.drawImage(candySprite,candy.posX, candy.posY, candy.disWidth, candy.disHeight);
		context.font = "17px Verdana";
	    context.fillStyle = 'red';
	    context.fillText('Score: ' + score, 40, 20);
	    context.fillText('Lives: ' + lives, 40, 37);

	    veggie.posY = veggie.posY + movingSpeed;
	    candy.posY = candy.posY + movingSpeed;

		if(keyPressed[39]) {
			bag.posX = bag.posX + movingSpeed;
	    }
	    if(keyPressed[37]){
	        bag.posX = bag.posX - movingSpeed;
		}
		checkCollision();
		requestAnimationFrame(drawEasy);
	}
}

function drawHard(){
	$('.myButtonE').css('display', 'none');
	$('.myButtonH').css('display', 'none');
	canvas.removeEventListener('mousedown', chooseDifficulty, false);
	if(!dead){
    	context.drawImage(bkgSprite, 0, 0, 500, 500);
		context.drawImage(bagSprite,bag.posX, bag.posY, bag.disWidth, bag.disHeight);
		context.drawImage(veggieSprite,veggie.posX, veggie.posY, veggie.disWidth, veggie.disHeight);
		context.drawImage(candySprite,candy.posX, candy.posY, candy.disWidth, candy.disHeight);
		context.drawImage(hardCandySprite,hardCandy.posX, hardCandy.posY, hardCandy.disWidth, hardCandy.disHeight);
		context.drawImage(cottonSprite,cotton.posX, cotton.posY, cotton.disWidth, cotton.disHeight);
		context.font = "17px Verdana";
	    context.fillStyle = 'red';
	    context.fillText('Score: ' + score, 40, 20);
	    context.fillText('Lives: ' + lives, 40, 37);

	    veggie.posY = veggie.posY + movingSpeed;
	    candy.posY = candy.posY + movingSpeed;
	    hardCandy.posY = hardCandy.posY + movingSpeed;
	    cotton.posY	= cotton.posY + movingSpeed;

		if(keyPressed[39]) {
			bag.posX = bag.posX + movingSpeed;
	    }
	    if(keyPressed[37]){
	        bag.posX = bag.posX - movingSpeed;
		}
		checkCollision();
		requestAnimationFrame(drawHard);
	}
}

function checkCollision(){
	if(bag.posX+bag.disWidth == canvas.width){
		bag.posX = bag.posX-5;
	}
	if(bag.posX == 0){
		bag.posX = bag.posX+5;
	}
	if(veggie.posY+veggie.disHeight == bag.posY && bag.posX < veggie.posX+veggie.disWidth && veggie.posX< bag.posX+bag.disWidth){
		var randVegX = Math.floor((Math.random() * 440) + 1);
		veggie.posX = randVegX;
		veggie.posY = -25;
    	score++;
    	ding.play();
    }
    if(veggie.posY+veggie.disHeight == canvas.height){
		var randVegX = Math.floor((Math.random() * 440) + 1);
		veggie.posX = randVegX;
		veggie.posY = -25;
		lives--;
		error.play();
		if(lives == -1){
			dead = true;
			gameOver();
		}
    }
    if(candy.posY+candy.disHeight == bag.posY && bag.posX < candy.posX && candy.posX+candy.disWidth< bag.posX+bag.disWidth){
		var randCanX = Math.floor((Math.random() * 440) + 1);
		candy.posX = randCanX;
		candy.posY = -25;
    	lives--;
    	error.play();
    	if(lives == -1){
			dead = true;
			gameOver();
		}
    }
    if(candy.posY+candy.disHeight == canvas.height){
		var randCanX = Math.floor((Math.random() * 440) + 1);
		candy.posX = randCanX;
		candy.posY = -25;
    }

    if(hardCandy.posY+hardCandy.disHeight == bag.posY && bag.posX < hardCandy.posX && hardCandy.posX+hardCandy.disWidth< bag.posX+bag.disWidth){
		var randCanX2 = Math.floor((Math.random() * 440) + 1);
		hardCandy.posX = randCanX2;
		hardCandy.posY = -25;
    	lives--;
    	error.play();
    	if(lives == -1){
			dead = true;
			gameOver();
		}
    }
    if(hardCandy.posY+hardCandy.disHeight == canvas.height){
		var randCanX2 = Math.floor((Math.random() * 440) + 1);
		hardCandy.posX = randCanX2;
		hardCandy.posY = -25;
    }

    if(cotton.posY+cotton.disHeight == bag.posY && bag.posX < cotton.posX && cotton.posX+cotton.disWidth< bag.posX+bag.disWidth){
		var randCanX3 = Math.floor((Math.random() * 440) + 1);
		cotton.posX = randCanX3;
		cotton.posY = -25;
    	lives--;
    	error.play();
    	if(lives == -1){
			dead = true;
			gameOver();
		}
    }
    if(cotton.posY+cotton.disHeight == canvas.height){
		var randCanX3 = Math.floor((Math.random() * 440) + 1);
		cotton.posX = randCanX3;
		cotton.posY = -25;
    }
}


function gameOver(){
	var x = canvas.width / 2;
	var y = canvas.height / 2;
    context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width,canvas.height);
    context.font = "40px Verdana";
    context.fillStyle = 'red';
    context.fillText('GAME OVER', x,200);
    context.fillStyle = 'black';
    context.fillText('Final Score: ' + score, x,250);
    if(score > highScore){
    	highScore = score;
    	localStorage.setItem('highscore', highScore);
    	context.fillText('High Score: ' + highScore, x,300);
    	alert("New High Score!");
    }
    else{
    	context.fillText('High Score: ' + highScore, x,300);
    }
    $('.myButtonR').css('display', 'inline-block');
}

function replay(){
	location.reload();
}

function keydown(e) {
    keyPressed[e.keyCode] = true;
}

function keyup(e) {
    keyPressed[e.keyCode] = false;
}
