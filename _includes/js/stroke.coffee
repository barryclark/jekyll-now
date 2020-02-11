class Stroke
  centerX: 0
  centerY: 0
  radius1: 0
  radius1: 0
  ratio: 0
  color: ""
  constructor: (@centerX, @centerY, @radius1, @radius2, @ratio, @color) ->

  draw: (context, color) ->
    color = this.color if color == null
    context.beginPath();
    context.moveTo this.centerX + this.radius1 + this.radius2, this.centerY;

    # Draw segments from theta = 0 to theta = 2PI
    total = Math.PI * this.ratio
    for th in [total..0] by -0.01
      x = this.centerX + this.radius1 * Math.cos(th) + this.radius2 * Math.cos(th * this.ratio)
      y = this.centerY + this.radius1 * Math.sin(th) + this.radius2 * Math.sin(th * this.ratio)
      context.lineTo x, y

    # Apply stroke
    context.strokeStyle = "#" + color
    context.stroke()
    0
