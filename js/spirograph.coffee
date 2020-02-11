---
---

{% include js/stroke.coffee %}

queue = [];
canvas = document.getElementById 'myCanvas'
context = canvas.getContext '2d'
imgData = context.getImageData 0,0, canvas.width, canvas.height
handle1 = $ "#handle1"
handle2 = $ "#handle2"
handle3 = $ "#handle3"
hex = "";

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
  s1 = new Stroke cx, cy, r1, r2, ratio, hex
  s1.draw context, color
  if stamp
    queue.push s1
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
    s.draw context
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
