function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left, 
        y: evt.clientY - rect.top
    };
}

function getRandomColor() {
	var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    
    return 'rgb(' + r +',' + g + ',' + b + ')';
}

function box(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = getRandomColor();
	
	this.drawBox = function(ctx) {
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
		if(box.isPointInBox(this.x, this.y))
			return true;
		if(box.isPointInBox(this.x + this.width, this.y))
			return true;
		if(box.isPointInBox(this.x, this.y + this.height))
			return true;
		if(box.isPointInBox(this.x + this.width, this.y + this.height))
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

function drawAllBoxes(boxes, ctx) {
	clearScreen(ctx);
	
	for(var i = 0; i < boxes.length; i++) {
		boxes[i].drawBox(ctx);
	}
}

function clearScreen(ctx) {
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

function clearArray(array) {
	while(array.length)
		array.pop();
}

$(document).ready(function() {
	var canvas = $("#canvas").get(0);
	var ctx = canvas.getContext('2d');
	var boxes = new Array();
	
	var score = 0;
	var peak = 0;
	
	var time = 1000;
		
	$("#boxGame").click(function(e) {
		var mousePos = getMousePos(canvas,e);
	    
	    for(var i = boxes.length - 1; i >= 0; i--) {
	    	if(boxes[i].isPointInBox(mousePos.x,mousePos.y)) {
	    		boxes.splice(i, 1);
	    		drawAllBoxes(boxes, ctx);
	    		score = score + 5;
	    		
	    		if(score > peak)
	    			peak = score;
	    		
	    		$("#peak").html(peak.toString());
	    		$("#score").html(score.toString());
	    		time = time - 10;
	    		
	    		if(time < 100)
	    			time = 100;
	    		
	    		return;
    		}	    		
    	}
	    
	    var newBox = new box(mousePos.x - 25,mousePos.y - 25,50,50);
	    newBox.drawBox(ctx);
	    
	    if(newBox.overLapsBoxes(boxes))
	    	score = score - 15;	    
	    
	    boxes.push(newBox);
	    score = score - 10;
		$("#score").html(score.toString());
	});
	
	$("#clearButton").click(function() {
		clearScreen(ctx);
		clearArray(boxes);
		score = 0;
		$("#score").html(score.toString());
		time = 1000;
	});
	
	var boxAdder = function() {
		var x = Math.round(Math.random() * canvas.width);
		var y = Math.round(Math.random() * canvas.height);
		
		var newBox = new box(x,y,50,50);
		newBox.drawBox(ctx);
		
		if(newBox.overLapsBoxes(boxes))
			score = score - 15;
		
		$("#score").html(score.toString());
		
		boxes.push(newBox);
		
		window.setTimeout(function(){boxAdder();}, time);
	};
	
	window.setTimeout(function(){boxAdder();},time);
});
