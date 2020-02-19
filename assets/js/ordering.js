$( function() {
  readNames = function() {
    return $('#names').val().split("\n");
  }

  outputNamesToDiv = function(divName, names) {
    $.each( names, function(i, val) {
      var txt = $("<p></p>").text(val);
      $(divName).append(txt);
    });
  }

  random = function(bound) {
    return Math.floor(Math.random() * bound);
  }

  randomize = function(names) {
    var i;
    for(i = 0; i < names.length; i++) {
      var dest = random(names.length);
      if (dest != i) {
        var t = names[dest];
        names[dest] = names[i];
        names[i] = t;
      }
    }
    return names;
  }

  order = function() {
   var names = readNames();
   $('#ordered').html('');
   $('#random').html('');
   outputNamesToDiv("#ordered", names.sort());
   outputNamesToDiv("#random", randomize(names))
  }

  handleFiles = function(files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith('text/')){ continue }
      var reader = new FileReader();
      reader.addEventListener("load", function () {
          var fileText = reader.result;
          $('#names').text(fileText);
          order();
      }, false);
      reader.readAsText(file);
    }
  }

  $("#order").click( function( event ) {
      event.preventDefault();
      order();
    } );
  $('#names').on(
    'dragover',
    function(e) {
        e.preventDefault();
        e.stopPropagation();
    }
  );
  $('#names').on(
      'dragenter',
      function(e) {
          e.preventDefault();
          e.stopPropagation();
      }
  );
  $('#names').on(
    'drop',
    function(e){
        if(e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files.length) {
            e.preventDefault();
            e.stopPropagation();
            /*UPLOAD FILES HERE*/
            handleFiles(e.originalEvent.dataTransfer.files);
        }
    }
  );
} );
