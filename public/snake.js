// Hosted at https://www.arpitjasapara.com/snake

var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth*.9;
canvas.height = window.innerHeight*.9;
var c = canvas.getContext("2d");
var arrayX = [Math.floor(canvas.width/20)*10]; // stores x & y coordinates of snake parts
var arrayY = [Math.floor(canvas.height/20)*10];
var direction = 0;
var size = 1;
var gameOver = false;
var foodX, foodY; // stores x and y coordinates of food
newFood();
var xDown = null;	// allows for touch support on mobile devices                                                    
var yDown = null;
drawSquare (arrayX[0],arrayY[0]);
var run = setInterval(paintSnake,100); // starts moving snake automatically

document.onkeydown = checkKey; // when arrow keys are pressed, changes snake direction
function checkKey(e) {

    e = e || window.event;
    if (gameOver) {
    	run = setInterval(paintSnake,100);
    	gameOver = false;
    }
    if (e.keyCode == '38') { // up arrow key
    	if (direction != 270 || size == 1)
			direction = 90;
    }
    else if (e.keyCode == '40') { // down arrow key
    	if (direction != 90 || size == 1)
        	direction = 270;
    }
    else if (e.keyCode == '37'){ // left arrow key
    	if (direction != 0 || size == 1)
      		direction = 180;
    }
    else if (e.keyCode == '39'){ // right arrow key
    	if (direction != 180 || size == 1)
       		direction = 0;
    }
}

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;
    if (gameOver) {
    	run = setInterval(paintSnake,100);
    	gameOver = false;
    }                                      
};  

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            if (direction != 0 || size == 1) // left swipe
      			direction = 180; 
        } else {
            if (direction != 180 || size == 1) // right swipe
       			direction = 0;
        }                       
    } else {
        if (yDiff > 0) {
            if (direction != 270 || size == 1) // up swipe
				direction = 90; 
        } else { 
            if (direction != 90 || size == 1) // down swipe
        		direction = 270;
        }                                                                 
    }

    xDown = null; // resets values
    yDown = null;                                             
};

function paintSnake() { // draws and moves snake
	if (direction == 0){
		arrayX.push(arrayX[arrayX.length-1]+10);
		arrayY.push(arrayY[arrayY.length-1]);	
	}
	else if (direction == 90) {
		arrayX.push(arrayX[arrayX.length-1]);
		arrayY.push(arrayY[arrayY.length-1]-10);	
	}
	else if (direction == 180) {
		arrayX.push(arrayX[arrayX.length-1]-10);
		arrayY.push(arrayY[arrayY.length-1]);	
	}
	else if (direction == 270) {
		arrayX.push(arrayX[arrayX.length-1]);
		arrayY.push(arrayY[arrayY.length-1]+10);
	}
	c.clearRect(0,0,canvas.width,canvas.height);
	for (i = arrayX.length; i >= arrayX.length-size; i--) {
		drawSquare(arrayX[i], arrayY[i]);
		drawSquare (foodX, foodY);
		ateFood();
	}
	for (i = arrayX.length-size; i > 0; i--){
		arrayX.shift();
		arrayY.shift();
	}
	checkEnd();
}

function newFood () { // generates new coordinates for food
	foodX = Math.floor(Math.random() * ((canvas.width-10)/10))*10 + 10;
	foodY = Math.floor(Math.random() * ((canvas.height-10)/10))*10 + 10;
}

function ateFood() { // detects if snake has eaten food
	if(arrayX[arrayX.length-1] == foodX && arrayY[arrayY.length-1] == foodY)
	{
		size += 1;
		newFood();
	}
}

function checkEnd() { // checks if snake touched boundaries, or ate itself
	if (arrayX[arrayX.length-1] <= 0 || arrayY[arrayY.length-1] <= 0 || arrayX[arrayX.length-1] >= canvas.width-10 || arrayY[arrayY.length-1] >= canvas.height-10)
	{
		arrayX = [Math.floor(canvas.width/20)*10];
		arrayY = [Math.floor(canvas.height/20)*10];
		direction = 0;
		clearInterval(run);
		c.font= "" + canvas.width/15 + "px Comic Sans MS";
		c.fillText("GAME OVER",canvas.width*2/7,canvas.height/4);
		c.font = "" + canvas.width/45 + "px Comic Sans MS";
		c.fillText("Your Score Is: " + size, canvas.width*9/24,canvas.height/3);
		c.fillText("Press any button to reset", canvas.width/3, canvas.height*3/4);
		gameOver = true;
		size = 1;
	}
	for (i = arrayX.length-2; i >= 0; i--){
		if (arrayX[i] == arrayX[arrayX.length-1] && arrayY[i] == arrayY[arrayY.length-1]){
			arrayX = [Math.floor(canvas.width/20)*10];
			arrayY = [Math.floor(canvas.height/20)*10];
			direction = 0;
			clearInterval(run);
			c.font= "" + canvas.width/15 + "px Comic Sans MS";
			c.fillText("GAME OVER",canvas.width*2/7,canvas.height/4);
			c.font = "" + canvas.width/45 + "px Comic Sans MS";
			c.fillText("Your Score Is: " + size, canvas.width*9/24,canvas.height/3);
			c.fillText("Press any button to reset", canvas.width/3, canvas.height*3/4);
			gameOver = true;
			size = 1;
			i = 0;
		}
	}
}

function drawSquare(x, y) { // draws a 10x10 white box
	c.fillStyle = "#FFFFFF";
	c.fillRect(x,y,10,10);
}