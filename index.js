var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const paddle = (() => {
    var yPos;
    let xPos = 0;

    let height = 60;
    let width = 10;

    let max = 390;

    const update = (e) => {
        yPos = e.layerY - 10;
	draw();
    }

    const draw = () => {
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'white';

        if (yPos < max)
            ctx.fillRect(xPos, yPos, width, height);
        else
            ctx.fillRect(xPos, max, width, height);
    }

    const getCollide = () => {
	var collide = yPos;
	if (collide < 0)
	    collide *= -1;
        return {start: collide, end: collide+60};
    }

    return {update, getCollide};
})();

const ai = (() => {
    var yPos = (canvas.height - 60)/2;
    let xPos = canvas.width-10;

    let height = 60;
    let width = canvas.width;

    let max = 390;
    let min = 0;

    const update = () => {
	yPos = ball.getYPos() - height/2;
	if (yPos > max)
	    yPos = max;
	if (yPos < min)
	    yPos = min;
        draw();
    }

    const draw = () => {
         var ctx = canvas.getContext('2d');
         ctx.fillStyle = 'white';
         ctx.fillRect(xPos, yPos, width, height);
    }

    const reset = () => {
        yPos = (canvas.height - height)/2;
	draw();
    }

    const getCollide = () => {
        var collide = yPos;
        if (collide < 0)
            collide *= -1;
        return {start: collide, end: collide+60};
    }

    return {update, getCollide, reset};
})();

const ball = (() => {
    let xPos = canvas.width/2;
    let yPos = canvas.height/2;

    let speed = 4;

    var velocity = { x: speed, y: speed } 

    const update = () => {

	if (yPos < 0 || yPos > canvas.height)
	    velocity.y *= -1;

        if (xPos < 0 || xPos > canvas.width) {
	    playerWon = xPos > canvas.width;
	    xPos = canvas.width/2;
	    yPos = canvas.height/2;
	    endRound(playerWon);
        }

	else if (xPos === 10) {
	    var check = paddle.getCollide();
	    if (yPos >= check.start && yPos <=check.end)
                velocity.x *= -1;
	} 
	else if (xPos === canvas.width-10) {
	    var check = ai.getCollide();
	    console.log(check);
	    if (yPos >= check.start-2 && yPos <=check.end+2) {
		velocity.x *= -1;
	    }
	}

	xPos += velocity.x;

	yPos += velocity.y;

        draw();
    }

    const draw = () => {
        var ctx = canvas.getContext('2d');
	ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(xPos, yPos, 5, 0, 2 * Math.PI);
        ctx.fill();
    }

    const reset = () => {
        xPos = canvas.width/2;
        yPos = canvas.height/2;
	draw();
    }

    const getYPos = () => {
        return yPos;
    }

    return {update, getYPos};
})();

const scoreBoard = (() => {
    let player = 0;
    let ai = 0;

    const incPlayer = () => {
        player++;
    }

    const getPlayer = () => {
        return player;
    }

    const incAi = () => {
       ai++;
    }

    const getAi = () => {
        return ai;
    }

    draw = () => {
        var ctx = canvas.getContext('2d');
        
	ctx.font = '24px helvetica';

	ctx.fillText(player, 30, 50);
	
	ctx.fillText(ai, canvas.width-30, 50);
    }

    return { incPlayer, incAi, draw };
})();

function clear() {
     var ctx = canvas.getContext('2d');
     ctx.fillStyle = 'black';
     ctx.fillRect(0, 0, canvas.width, canvas.height);
}

var mouseEvent = {layerY: canvas.height/2};
canvas.addEventListener('mousemove', (e) => { 
    mouseEvent = e; 
});

function endRound(playerWon) {
    running = false;

    if (playerWon)
	scoreBoard.incPlayer();
    else
	scoreBoard.incAi();
    
    ai.reset();
    clearInterval(gameLoop);
    clear();
}

function loop() {
    clear();
    ball.update();
    paddle.update(mouseEvent);
    ai.update();
    scoreBoard.draw();
}

var gameLoop;
loop();
function startGame(event) {
    if (event.which == 32 && !running) {
        gameLoop = setInterval(loop, 50);
	running = true;
    }
}

running = false;
document.addEventListener('keypress', startGame);
