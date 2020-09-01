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

    return {update};
})();

const ai = (() => {
    var yPos = (canvas.height - 60)/2;
    let xPos = canvas.width-10;

    let height = 60;
    let width = canvas.width;

    let max = 390;

    const update = () => {
        draw();
    }

    const draw = () => {
         var ctx = canvas.getContext('2d');
         ctx.fillStyle = 'white';
         ctx.fillRect(xPos, yPos, width, height);
    }

    return {update};
})();

const ball = (() => {
    var xPos;
    var yPos;

    const update = () => {
        draw();
    }

    const draw = () => {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.arc(canvas.width/2, canvas.height/2, 5, 0, 2 * Math.PI);
        ctx.fill();
    }

    return {update};
})();

function clear() {
     var ctx = canvas.getContext('2d');
     ctx.fillStyle = 'black';
     ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function loop(e) {
    clear();
    paddle.update(e);
    ai.update();
    ball.update();
}

canvas.addEventListener('mousemove', loop);

