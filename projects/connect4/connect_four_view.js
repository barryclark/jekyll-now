
function View(){};
var turnTimer = null;
// checker click function starts here
View.prototype.getClick = function(board, play, dropChecker){
    $(".checker").click(function(e){
      e.preventDefault;
      var col = $(this).attr('col');
      resetTimer(play);
      dropChecker(play, board.addChecker(play.color, col), board);

    });

    $("#resetGame").click(function(e)
    {
      e.preventDefault();
      location.reload();
    });

}
// checker click function ends here

var dropChecker = function (play, coordinates, board){
  var checkerRow = coordinates[1];
  var checkerColumn = coordinates[0];
  var checkerColumnJquery = ".checker" + checkerColumn;
  var destinationCell = '.cell' + checkerColumn + checkerRow;
  var checkerRowJquery = (6 - checkerRow) * 120;
  $(checkerColumnJquery).animate({top: "+=" + checkerRowJquery + "px"}, 1000);
  setTimeout(function(){
    // $(destinationCell).css('background-color', play.color);
    $(destinationCell).addClass("cell_" + play.color);
  }, 1000);
  $(checkerColumnJquery).animate({top: "-=" + checkerRowJquery + "px"}, function(){board.solver()});
  play.switchPlayer();
}

var startTimer = function(duration, display,play) {
    var timer = duration, minutes, seconds;
    turnTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
            play.switchPlayer();
                    }
    }, 1000);
}

function resetTimer(play){
  clearTimeout(turnTimer);
   display = $('#time');
   startTimer(10, display,play);
}



$(document).ready(function(){

  // mouseover function starts here
  $(".checker").mouseover(function(){
  });

  $(".checker").mouseout(function(){
  });
  // mouseover function ends here

  var board = new Board();
  var play = new Play();
  var view = new View();
  var solved = false;
  view.getClick(board, play, dropChecker);
  resetTimer(play);

// comment me out for 2 player game
  // $('#player').bind("DOMSubtreeModified", function(){
  //   if($('#player').text().indexOf("Red") > -1){
  //     var col = play.move();
  //     dropChecker(play, board.addChecker(play.color, col));
  //   }
  // });

















  // var fiveSeconds = new Date().getTime() + 5000;

  // $('#clock').countdown(fiveSeconds).on('update.countdown', function(event) {

  //   var $this = $(this);
  //     $this.html(event.strftime('To end: <span>%H:%M:%S</span>'));
  // }).on('finish.countdown', function(e){
  //   console.log(play.color);
  //   play.switchPlayer();
  //   console.log(play.color);
  //   $('#clock').countdown(new Date().getTime() + 5000)
  // });
})
