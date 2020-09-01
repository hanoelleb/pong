var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function movePaddle(e) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var xPos = e.layerX;
    var yPos = e.layerY - 10;

    ctx.fillStyle = 'white';

    if (yPos < 390) 
        ctx.fillRect(0, yPos, 10, 60);
    else
	ctx.fillRect(0, 390, 10, 60);

    console.log(yPos);
}

canvas.addEventListener('mousemove', movePaddle);
