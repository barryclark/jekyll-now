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
canvas = document.getElementById 'myCanvas'
context = canvas.getContext '2d'
imgData = context.getImageData 0,0, canvas.width, canvas.height
handle1 = $ "#handle1"
handle2 = $ "#handle2"
handle3 = $ "#handle3"
hex = "";

spiro = (context, cx, cy, inR, r, ratio, color = "000000", cycles = 2) ->
  context.beginPath();
  context.moveTo cx + inR + r, cy;

  # Draw segments from theta = 0 to theta = 2PI
  total = Math.PI * cycles
  for th in [total..0] by -0.01
    x = cx + inR * Math.cos(th) + r * Math.cos(th * ratio);
    y = cy + inR * Math.sin(th) + r * Math.sin(th * ratio);
    context.lineTo(x, y);

  # Apply stroke
  context.strokeStyle = "#" + color;
  context.stroke();
  0

draw = (stamp, color) ->
  #// Get drawing context
  r1 = $ "#outerRadius"
  .slider "value"
  r2 = $ "#innerRadius"
  .slider "value"
  ratio = $ "#ratio"
  .slider "value"
  cx = canvas.width / 2;
  cy = canvas.height / 2;

  # Draw spirograph
  spiro context, cx, cy, r1, r2, ratio, color
  if stamp
    queue.push new Stroke cx, cy, r1, r2, ratio, hex
    imgData = context.getImageData 0,0, canvas.width, canvas.height
  0

clear = ->
  context.clearRect 0, 0, canvas.width, canvas.height;
  imgData = context.getImageData 0,0, canvas.width, canvas.height
  queue = [];
  0

undo = ->
  context.clearRect 0, 0, canvas.width, canvas.height
  queue.pop()
  for s in queue
    spiro context, s.centerX, s.centerY, s.radius1, s.radius2, s.ratio, s.color
  imgData = context.getImageData 0,0, canvas.width, canvas.height
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
  red = $ "#red"
  .slider "value"
  green = $ "#green"
  .slider "value"
  blue = $ "#blue"
  .slider "value"
  hex = hexFromRGB red, green, blue
  $("#swatch")
  .css "background-color", "#" + hex
  0

dlCanvas = ->
  context.putImageData imgData, 0, 0
  dt = canvas.toDataURL 'image/png'
  this.href = dt

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

$ "button#draw"
.click (event)->
  event.preventDefault()
  draw true, hex

$ "button#clear"
.click (event)->
  event.preventDefault()
  clear()

$ "button#undo"
.click (event)->
  event.preventDefault()
  undo()

document
  .getElementById "dl"
  .addEventListener 'click', dlCanvas, false

counter = 0

setInterval () ->
  context.putImageData imgData, 0, 0
  switch counter
    when counter = 0 then color = "808080"
    when counter = 1 then color = "404040"
    when counter = 2 then color = "808080"
  draw false, color
  counter = 1 - counter
, 200
