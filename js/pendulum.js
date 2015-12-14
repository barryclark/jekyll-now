function pendulum_clearScreen(canvas, ctx) {
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

function pendulum_getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function pendulum_getRandomColor() {
	var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);

    return 'rgb(' + r +',' + g + ',' + b + ')';
}

function pendulum_ball(x,y,r,mass) {
	this.x = x;
	this.y = y;
	this.r = r;

	if(mass == undefined)
		this.mass = 0;
	else
		this.mass = mass;

	this.color = pendulum_getRandomColor();

	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
		ctx.fillStyle=this.color;
		ctx.fill();

	};

	this.isPointIn = function(x,y) {
		var dx = x - this.x;
		var dy = y - this.y;
		var distance = Math.sqrt(dx * dx + dy * dy);

		if(distance <= this.r)
			return true;
		else
			return false;
	};
}

function pendulum_rod(pivotX,pivotY,moveX,moveY) {
	this.pivotX = pivotX;
	this.pivotY = pivotY;
	this.moveX = moveX;
	this.moveY = moveY;

	this.length = function() {
		var dx = this.pivotX - this.moveX;
		var dy = this.pivotY - this.moveY;

		return Math.sqrt(dx * dx + dy * dy);
	};

	this.theta = function()	{
		var dx = this.pivotX - this.moveX;
		var dy = this.pivotY - this.moveY;

		var theta;

		if(dy == 0)	{
			if(dx > 0)
				theta = Math.PI / 2;
			else
				theta = - Math.PI / 2;
		} else if(dy > 0) {
			if(dx < 0)
				theta = Math.PI / 2 + Math.atan(- dy /dx);
			else
				theta = - Math.PI / 2 - Math.atan(dy / dx);
		} else
			theta = Math.atan(dx / dy);

		return theta;
	};

	this.getThetaAcceleration = function() {
		return - Math.sin(this.theta()) / this.length();
	};

	this.addTheta = function(theta)	{
		var newTheta = this.theta() + theta;
		var length = this.length();

		this.moveX = length * Math.sin(newTheta) + this.pivotX;
		this.moveY = length * Math.cos(newTheta) + this.pivotY;
	};

	this.move = function(dx,dy)	{
		var prevLength = this.length();
		var tempX = this.moveX + dx - this.pivotX;
		var tempY = this.moveY + dy - this.pivotY;

		var tempLength = Math.sqrt( tempX * tempX + tempY * tempY );
		tempX = tempX * prevLength / tempLength;
		tempY = tempY * prevLength / tempLength;

		this.moveX = tempX + this.pivotX;
		this.moveY = tempY + this.pivotY;
	};

	this.draw = function(ctx) {
		ctx.lineWidth="1";
		ctx.strokeStyle="black";
		ctx.moveTo(this.pivotX,this.pivotY);
		ctx.beginPath();
		ctx.lineTo(this.pivotX,this.pivotY);
		ctx.lineTo(this.moveX,this.moveY);
		ctx.stroke();
	};
}

function pendulum_drawEverything(array, ctx) {
	for(var i = 0; i < array.length; i++) {
		array[i].draw(ctx);
	}
}

$(document).ready(function() {
	var everything = new Array();

	var timer = null;

	var canvas = $("#pendulum").get(0);
	var ctx = canvas.getContext('2d');

	var mouseDown = false;

	var prevMousePos;

	var bob = new pendulum_ball(canvas.width / 2, canvas.height * 2 / 3, 25, 50);
	everything.push(bob);

	var theRod = new pendulum_rod(canvas.width / 2, canvas.height / 3, canvas.width / 2, canvas.height * 2 / 3);
	everything.push(theRod);

	pendulum_drawEverything(everything,ctx);

	$("#pendulum").mousedown(function(e) {
				var mousePos = pendulum_getMousePos(canvas, e);

				if(bob.isPointIn(mousePos.x, mousePos.y)) {
					if(timer != null) {
						window.clearInterval(timer);
						timer = null;
					}

					mouseDown = true;
					prevMousePos = mousePos;
				}
			});

	$("#pendulum").mousemove(function(e) {
		if(mouseDown) {
			var mousePos = pendulum_getMousePos(canvas, e);

			var dx = mousePos.x - prevMousePos.x;
			var dy = mousePos.y - prevMousePos.y;
			prevMousePos = mousePos;

			theRod.move(dx, dy);

			bob.x = theRod.moveX;
			bob.y = theRod.moveY;

			pendulum_clearScreen(canvas, ctx);
			pendulum_drawEverything(everything, ctx);
		}
	});

	$(window).mouseup(function() {
		if(mouseDown) {
			mouseDown = false;

			var vtheta = 0;

			var vx = 0;
			var vy = 0;

			timer = window.setInterval(function() {
				var atheta = theRod.getThetaAcceleration();
				vtheta += atheta;

				theRod.addTheta(vtheta);

				bob.x = theRod.moveX;
				bob.y = theRod.moveY;

				pendulum_clearScreen(canvas, ctx);
				pendulum_drawEverything(everything, ctx);
			},
			1000 / 60);
		}
	});
});
