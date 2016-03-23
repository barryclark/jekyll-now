function Play(){
  this.color = "red";
  this.computer = true;
}

Play.prototype.switchPlayer = function(){
  if (this.color === "red"){
    this.color = "black";
    setTimeout(function(){
      $('#player').text("Red's Turn"); //should be in view?
      $('#player').css("background-color", "red");
    }, 1000)
  }
  else if (this.color === "black"){
    this.color = "red";
    setTimeout(function(){
      $('#player').text("Black's Turn"); //should be in view?
      $('#player').css("background-color", "black");
    }, 1000)
  }
}


Play.prototype.move = function(){
  var column = Math.floor(Math.random() * (6 - 0 +1) + 0)
  return column
}
