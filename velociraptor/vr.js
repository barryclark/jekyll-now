String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

$(function() {

  var rw = $('.raptor').width();
  console.log("rw: {0}".format(rw));
  var solve1 = function() {
    $('.human').css('left', "0px");
    $('.results').text("");
    var xh = 0; //location of human
    var vh = 0; //starting velocity of human
    var vv = 0; //starting velocity of velociraptor
    var t  = 0; //starting time
    var dt = 0.1 //time step 100 ms which is the timerinterval

    var xv = 0 - parseInt( $('.xv').val() );
    var av = parseInt( $('.av').val() ); //acceleration of velociraptor 
    var ah = parseInt( $('.ah').val() ); //accel of human 
    var vhmax = parseInt( $('.vhmax').val() ); //max velocity of human
    var vvmax = parseInt( $('.vvmax').val() ); //maximum velocity of the velociraptor

    console.log("xv: {0}".format(xv));

    var loop = function() {

      //first check if the human is at max v
      if (vh >= vhmax) {
        ah=0 //if yes, set accel to zero
      }
      //check if velociraptor is at max speed
      if (vv >= vvmax) {
        av=0; //if yes, set accel to zero
      }
      //calc new human velocity after time interval
      vh += ah * dt;
      if (vh > vhmax) {
        vh = vhmax;
      }

      //calc new velociraptor velocity
      vv += av * dt;
      if (vv > vvmax) {
        vv = vvmax
      }

      //calc new positions
      xh += vh * dt;
      xv += vv * dt;

      if (xv > xh) {
        xv = xh + 0.001;
      }

      //update time
      t = t + dt;

      $('.results').append( "{0}: Raptor: distance {1}m, speed: {2} m/s  Human speed: {3}\n".format(t.toFixed(2), (xh - xv).toFixed(2), vv.toFixed(2), vh.toFixed(2))  );
      $('.time-result').val( "{0}s".format(t.toFixed(3)) );

      $('.human').css('left', '{0}px'.format( ((xh * 10) + 500).toFixed(0)));
      $('.raptor').css('left', '{0}px'.format(((xv * 10) + 500 - rw).toFixed(0)));

      if (xv <= xh) {
        setTimeout( loop, 100);
      } else {
        $('#start-button').show();
      }

    };

    $('#start-button').hide();
    setTimeout( loop, 100);
  };

$('#start-button').click(solve1);
  console.log( "ready!" );
});