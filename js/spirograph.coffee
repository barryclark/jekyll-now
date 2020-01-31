---
---

class Stroke
  centerX: 0
  centerY: 0
  radius1: 0
  radius1: 0
  ratio: 0
  color: ""
  constructor: (@centerX, @centerY, @radius1, @radius2, @ratio, @color) ->



queue = [];
canvas = document.getElementById('myCanvas');
context = canvas.getContext('2d');
handle1 = $( "#handle1" );
handle2 = $( "#handle2" );
handle3 = $( "#handle3" );
hex = "";

(queue.push new Stroke 1,1,10,10,1,"FFFFFF") for num in [10..1]
console.log(queue);
#
# i for i in [1..10]
#   queue.push i#new Stroke 1,1,10,10,1,"FFFFFF" ;


drawSpirograph = (context, cx, cy, radius1, radius2, ratio, color) ->
  context.beginPath();
  context.moveTo(cx + radius1 + radius2, cy);

  # Draw segments from theta = 0 to theta = 2PI
  for theta in [Math.PI *2..0] by -0.01
    x = cx + radius1 * Math.cos(theta) + radius2 * Math.cos(theta * ratio);
    y = cy + radius1 * Math.sin(theta) + radius2 * Math.sin(theta * ratio);
    context.lineTo(x, y);

  # Apply stroke
  context.strokeStyle = "#" + color;
  context.stroke();
  0

draw  = ->
  #// Get drawing context
  r1 = $("#outerRadius").slider("value");
  r2 = $("#innerRadius").slider("value");
  ratio = $("#ratio").slider("value");
  cx = canvas.width / 2;
  cy = canvas.height / 2;

  # Draw spirograph
  drawSpirograph(context, cx, cy, r1, r2, ratio, hex);
  queue.push( new Stroke(cx, cy, r1, r2, ratio, hex));
  0

clear = ->
  context.clearRect 0, 0, canvas.width, canvas.height;
  queue = [];
  0

undo = ->
  context.clearRect 0, 0, canvas.width, canvas.height
  queue.pop()
  for s in queue
    drawSpirograph context, s.centerX, s.centerY, s.radius1, s.radius2, s.ratio, s.color
  0
hexFromRGB = (r, g, b) ->
  hex = [
    r.toString 16
    g.toString 16
    b.toString 16
  ]
  for val, i in hex
    hex[i] = "0" + val if val.length == 1
  hex.join ""
  .toUpperCase()

refreshSwatch = ->
  red = $( "#red" ).slider "value"
  green = $( "#green" ).slider "value"
  blue = $( "#blue" ).slider "value"
  hex = hexFromRGB red, green, blue
  $("#swatch")
  .css "background-color", "#" + hex
  0

$ "#outerRadius"
.slider
  min: 0
  max: canvas.height / 2
  value: 200
  create: (event, ui) ->
    handle1.text $(this) .slider "value"
  slide: (event, ui) ->
    handle1.text ui.value

$ "#innerRadius"
.slider
  min: 0
  max: 100
  value: 20
  create: (event, ui) ->
    handle2.text $(this).slider "value"
  slide: (event, ui) ->
    handle2.text ui.value

$ "#ratio"
.slider
  min: 0
  max: 100
  value: 10
  create: (event, ui) ->
    handle3.text $(this).slider "value"
  slide: (event, ui) ->
    handle3.text ui.value

$ "#red, #green, #blue"
.slider
  orientation: "horizontal"
  range: "min"
  max: 255
  value: 127
  slide: refreshSwatch
  change: refreshSwatch

$ "#red"
.slider "value", 255
$ "#green"
.slider "value", 140
$ "#blue"
.slider "value", 60

$("button#draw").click (event)->
  event.preventDefault();
  draw();

$("button#clear").click (event)->
  event.preventDefault();
  clear();

$("button#undo").click (event)->
  event.preventDefault();
  undo();
