function Stroke(centerX, centerY, radius1, radius2, ratio1, color1) {
  this.centerX = centerX;
  this.centerY = centerY;
  this.radius1 = radius1;
  this.radius2 = radius2;
  this.ratio = ratio1;
  this.color = color1;
}

Stroke.prototype.draw = function(context, color) {
  var j, ref, th, total, x, y;
  if (color === null) {
    color = this.color;
  }
  context.beginPath();
  context.moveTo(this.centerX + this.radius1 + this.radius2, this.centerY);
  total = Math.PI * this.ratio;
  for (th = j = ref = total; j >= 0; th = j += -0.01) {
    x = this.centerX + this.radius1 * Math.cos(th) + this.radius2 * Math.cos(th * this.ratio);
    y = this.centerY + this.radius1 * Math.sin(th) + this.radius2 * Math.sin(th * this.ratio);
    context.lineTo(x, y);
  }
  context.strokeStyle = "#" + color;
  context.stroke();
  return 0;
};

