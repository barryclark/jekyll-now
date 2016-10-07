function spring_clearScreen(ctx, canvas) { 
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

function spring_getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left, 
        y: evt.clientY - rect.top
    };
}

function spring_getRandomColor() {
	var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    
    return 'rgb(' + r +',' + g + ',' + b + ')';
}

function spring_box(x,y,width,height,mass) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	if(mass == undefined)
		this.mass = 0;
	else
		this.mass = mass;
	
	this.color = spring_getRandomColor();
	
	this.draw = function(ctx) {
		ctx.fillStyle=this.color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
	};

	this.isPointInBox = function(x,y) {
		if(x < this.x)
			return false;
		if(y < this.y)
			return false;
		if(x > this.x + this.width)
			return false;
		if(y > this.y + this.height)
			return false;
		
		return true;
	};

	this.overLapsBox = function(box) {
		if(spring_box.isPointInBox(this.x, this.y))
			return true;
		if(spring_box.isPointInBox(this.x + this.width, this.y))
			return true;
		if(spring_box.isPointInBox(this.x, this.y + this.height))
			return true;
		if(spring_box.isPointInBox(this.x + this.width, this.y + this.height))
			return true;
		
		return false;
	};

	this.overLapsBoxes = function(boxes) {
		for(var i = 0; i < boxes.length; i++) {
			if(boxes[i].overLapsBox(this))
				return true;
		}
		
		return false;
	};
}

function spring(fixedX,fixedY,startX,startY,k) {
	this.fixedX = fixedX;
	this.fixedY = fixedY;
	this.moveX = startX;
	this.moveY = startY;	
	
	var dx = this.moveX - this.fixedX;
	var dy = this.moveY - this.fixedY;
	
	this.unstretchedLength = Math.sqrt(dx * dx + dy * dy);
	this.k = k;

	var width = 0.5 * this.unstretchedLength;
	
	this.dx = function() {
		return this.moveX - this.fixedX;
	};
				
	this.dy = function() {
		return this.moveY - this.fixedY;
	};
	
	this.length = function() {
		var dx = this.dx();
		var dy = this.dy();
	
		return Math.sqrt(dx * dx + dy * dy);
	};
				
	this.displacement = function() {
		return this.length() - this.unstretchedLength;
	};

	this.force = function()	{
		return - this.k * this.displacement();
	};
	
	this.draw = function(ctx) {
		var dx = this.dx();
		var dy = this.dy();
	
		var size = Math.sqrt(dx * dx + dy * dy);

		var rotation;
					
		if(dy == 0)	{
			if(dx >= 0)	{
				rotation = 0;
			} else {
				rotation = Math.PI;
			}
		} else if(dy > 0) {
			rotation = Math.PI / 2 - Math.atan(dx / dy);
		} else {
			rotation = Math.atan(- dx / dy) - Math.PI / 2;
		}

		ctx.save();
					
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.translate(this.fixedX,this.fixedY);
		ctx.rotate(rotation);

		ctx.lineWidth="1";
		ctx.strokeStyle="black";
		ctx.moveTo(0,0);
		ctx.beginPath();

		var x = 0;
		var y = 0;

		ctx.lineTo(x,y);

		x = 1 / 20; 
		y = 1.0;

		ctx.lineTo(x * size,y * width);

		x += 1 / 10;
		y = -1.0;

		for(var i = 0; i < 9; i++) {
			ctx.lineTo(x * size,y * width);

			x += 1 / 10;
			y = - 1 * y;
		}

		y = 0.0;
		x -= 1 / 20;

		ctx.lineTo(x * size,y * width);
		ctx.stroke();
		ctx.restore();
	};
}

function spring_drawEverything(everything, ctx) {
	for(var i = 0; i < everything.length; i++) {
		everything[i].draw(ctx);
	}
}

$(document).ready(function() {
	var timer = null;
	
	var everything = new Array();
	
	var spring_canvas = $("#spring").get(0);
	var ctx = spring_canvas.getContext('2d');
	
	var mouseDown = false;
	
	var prevMousePos;

	var boxWidth = 50;
	var boxHeight = 50;
	
	var topBoxX = spring_canvas.width / 2 - boxWidth / 2;
	var topBoxY = spring_canvas.height / 4;
	
	var topBox = new spring_box(topBoxX,topBoxY,boxWidth,boxHeight);
	everything.push(topBox);
	
	var bottomBoxX = topBoxX;
	var bottomBoxY = topBoxY + boxHeight * 2;
	
	var hangingBox = new spring_box(bottomBoxX, bottomBoxY, boxWidth, boxHeight, 50);
	everything.push(hangingBox);
	
	var springTopX = topBoxX + boxWidth / 2;
	var springTopY = topBoxY + boxHeight;
	
	var springBottomX = springTopX;
	var springBottomY = bottomBoxY;
	
	var theSpring = new spring(springTopX,springTopY,springBottomX,springBottomY,0.5);
	everything.push(theSpring);
	
	spring_drawEverything(everything, ctx);
	
	$("#spring").mousedown(function(e) {		
		var mousePos = spring_getMousePos(spring_canvas, e); 
	
		if(hangingBox.isPointInBox(mousePos.x, mousePos.y))	{
			window.clearInterval(timer);
			mouseDown = true;
			prevMousePos = mousePos;
		}
	});
	
	$("#spring").mousemove(function(e) {
		if(mouseDown) {
			var mousePos = spring_getMousePos(spring_canvas, e);
			var dx = mousePos.x - prevMousePos.x;
			var dy = mousePos.y - prevMousePos.y;
			prevMousePos = mousePos;
			
			hangingBox.x = hangingBox.x + dx;
			hangingBox.y = hangingBox.y + dy;
			
			theSpring.moveX = theSpring.moveX + dx;
			theSpring.moveY = theSpring.moveY + dy;
			
			var springForce = - theSpring.force();
			
			$("#length").html(theSpring.length().toString());
			$("#force").html(springForce.toString());
			
			spring_clearScreen(ctx, spring_canvas);
			spring_drawEverything(everything, ctx);
		}
	});
	
	$(window).mouseup(function() {
		mouseDown = false;
		
		var velocity = 0;
		var velocity_x = 0;
		var velocity_y = 0;
		var time = 1000 / 60;
		
		timer = window.setInterval(function() {
			var springForce = theSpring.force();
			var dampingForce = 1.0 * velocity;
			//springForce -= dampingForce;
	
			var acceleration = springForce / hangingBox.mass;
			velocity += acceleration;		
			
			if(theSpring.dx() != 0 && theSpring.dy() != 0) {
				velocity_x = theSpring.dx() * velocity / theSpring.length();
				velocity_y = theSpring.dy() * velocity / theSpring.length();
			} else if(theSpring.dx() == 0 && theSpring.dy() != 0) {
				velocity_x = 0;
				velocity_y = velocity;
			} else if(theSpring.dx() != 0 && theSpring.dy() == 0) {
				velocity_x = velocity;
				velocity_y = 0;
			}

			hangingBox.x += velocity_x;
			theSpring.moveX += velocity_x;
			hangingBox.y += velocity_y;
			theSpring.moveY += velocity_y;

			$("#length").html(theSpring.length().toString());
			$("#force").html(springForce.toString());
			$("#acc").html(acceleration.toString());
			$("#velocity").html(velocity.toString());
			
			spring_clearScreen(ctx, spring_canvas);
			spring_drawEverything(everything, ctx);
		},	
		
		time);
	});
});
