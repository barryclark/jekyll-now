function Board(view){
  this.col0 = [];
  this.col1 = [];
  this.col2 = [];
  this.col3 = [];
  this.col4 = [];
  this.col5 = [];
  this.col6 = [];
}

Board.prototype.horizontalHelper = function(colCounter, counter, color, index){
  var originalCol = colCounter;
  if (this[("col"+(colCounter + 1))][index] === color) {
    counter++;
    colCounter++;
  } else {
    counter = 0;
    colCounter = originalCol;
  }
  return [colCounter, counter];
}

Board.prototype.horizontalSolve = function(){
  var counter =0;
  for (var i = 0; i < 5; i++) {
    if (counter < 3 ){
      var colCounter = i;
      counter = 0;
      var color = "";
      var game = this;
      this[("col"+i)].forEach(function(value, index){
        if (counter < 3 ){
          color = value;
          if (color != undefined) {
            do {
              var whatever = game.horizontalHelper(colCounter, counter, color, index);
              counter = whatever[1];
              colCounter = whatever[0];
            } while (counter != 0 && counter != 3 && colCounter < 7);
          }
          colCounter = i;
          if (counter == 3) {
            alert("YOU WIN!");
          }
        }
      })
    }
  }
}

Board.prototype.verticalSolve = function(){
  var counter = 0;
  for (var i = 0; i < 7; i++) {
    if (counter < 3 ){
      counter = 0;
      var color = "";
      this[("col"+i)].forEach(function(value){
        if (color == value) {
          counter++;
        } else {
          counter = 0;
        }
    color = value;
    })
    }
  }
  if (counter == 3) {
    alert("YOU WIN!");
  }
}

Board.prototype.backHelper = function(colCounter, counter, color, index){
  var helperIndex = index;
  var originalCol = colCounter;
  if (this[("col"+(colCounter + 1))][helperIndex + 1] === color) {
    counter++;
    colCounter++;
    helperIndex++;
  } else {
    counter = 0;
    colCounter = originalCol;
  }
  return [colCounter, counter, helperIndex];
}

Board.prototype.backSolve = function(){
  var counter = 0;
  for (var i = 0; i < 3; i++) {
    if (counter < 3 ){
      var colCounter = i;
      counter = 0;
      var color = "";
      var game = this;
      this[("col"+i)].forEach(function(value, index){
        var helperIndex = index;
        if (counter < 3 ){
          color = value;
          if (color != undefined) {
            do {
              var whatever = game.backHelper(colCounter, counter, color, helperIndex);
              counter = whatever[1];
              colCounter = whatever[0];
              helperIndex = whatever[2];
            } while (counter != 0 && counter != 3 && colCounter < 7);
          }
          colCounter = i;
          if (counter == 3) {
            alert("YOU WIN!");
          }
        }
      })
    }
  }
}

Board.prototype.forwardHelper = function(colCounter, counter, color, index){
    var helperIndex = index;
    var originalCol = colCounter;
    if (this[("col"+(colCounter + 1))][helperIndex - 1] === color) {
      counter++;
      colCounter++;
      helperIndex--;
    } else {
      counter = 0;
      colCounter = originalCol;
    }
  return [colCounter, counter, helperIndex];
}

Board.prototype.forwardSolve = function(){
  var counter = 0;
  for (var i = 0; i < 4; i++) {
    if (counter < 3 ){
      var colCounter = i;
      counter = 0;
      var color = "";
      var game = this;
      this[("col"+i)].forEach(function(value, index){
        var helperIndex = index + 3;
        if (counter < 3 ){
          color = game[("col"+i)][helperIndex];
          if (color != undefined) {
            do {
              var whatever = game.forwardHelper(colCounter, counter, color, helperIndex);
              counter = whatever[1];
              colCounter = whatever[0];
              helperIndex = whatever[2];
            } while (counter != 0 && counter != 3 && colCounter < 7);
          }
          colCounter = i;
          if (counter == 3) {
            alert("YOU WIN!");
          }
        }
      })
    }
  }
}

Board.prototype.solver = function(){
  this.verticalSolve();
  this.horizontalSolve();
  this.backSolve();
  this.forwardSolve();
}

Board.prototype.addChecker = function(color, column){
  var property = "col" + column;
    if (this.columnFilled(property)){
      this[property].push(color);
      var coordinatesForView = [parseInt(column), (this[property].length-1)]
      // this.solver();
      return coordinatesForView;
    }
    else {
      console.log("error")
    }
}

Board.prototype.columnFilled = function (property) {
  if (this[property].length <= 5){
    return true
  }
}
