---
---
(function() {
    var Stroke, canvas, clear, context, counter, dlCanvas, draw, handle1, handle2, handle3, hex, hexFromRGB, imgData, queue, refreshSwatch, undo;

    {% include js/stroke.js %}

    queue = [];
    canvas = document.getElementById ('myCanvas');
    context = canvas.getContext('2d');
    imgData = context.getImageData( 0,0, canvas.width, canvas.height);
    handle1 = $( "#handle1");
    handle2 = $( "#handle2");
    handle3 = $( "#handle3");
    hex = "";

    draw = function(stamp, color) {
        var r1 = $("#outerRadius").slider("value");
        var r2 = $("#innerRadius").slider("value");
        var ratio = $("#ratio").slider("value");
        var cx = canvas.width / 2;
        var cy = canvas.height / 2;
        var s1 = new Stroke(cx, cy, r1, r2, ratio, hex);
        s1.draw(context, color);
        if (stamp) {
        queue.push(s1);
        imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        }
        return 0;
    };

    clear = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        queue = [];
        return 0;
    };

    undo = function() {
        var j, len, s;
        context.clearRect(0, 0, canvas.width, canvas.height);
        queue.pop();
        for (j = 0, len = queue.length; j < len; j++) {
        s = queue[j];
        s.draw(context);
        }
        imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        return 0;
    };

    hexFromRGB = function(r, g, b) {
        var i, j, len, val;
        hex = [r.toString(16), g.toString(16), b.toString(16)];
        for (i = j = 0, len = hex.length; j < len; i = ++j) {
        val = hex[i];
        if (val.length === 1) {
            hex[i] = "0" + val;
        }
        }
        return hex.join("").toUpperCase();
    };

    refreshSwatch = function() {
        var blue, green, red;
        red = $("#red").slider("value");
        green = $("#green").slider("value");
        blue = $("#blue").slider("value");
        hex = hexFromRGB(red, green, blue);
        $("#swatch").css("background-color", "#" + hex);
        return 0;
      };
    
      dlCanvas = function() {
        var dt;
        context.putImageData(imgData, 0, 0);
        dt = canvas.toDataURL('image/png');
        return this.href = dt;
      };
    
      $("#outerRadius").slider({
        min: 0,
        max: canvas.height / 2,
        value: 200,
        create: function(event, ui) {
          return handle1.text($(this).slider("value"));
        },
        slide: function(event, ui) {
          return handle1.text(ui.value);
        }
      });
    
      $("#innerRadius").slider({
        min: 0,
        max: 100,
        value: 20,
        create: function(event, ui) {
          return handle2.text($(this).slider("value"));
        },
        slide: function(event, ui) {
          return handle2.text(ui.value);
        }
      });
    
      $("#ratio").slider({
        min: 0,
        max: 100,
        value: 10,
        create: function(event, ui) {
          return handle3.text($(this).slider("value"));
        },
        slide: function(event, ui) {
          return handle3.text(ui.value);
        }
      });
    
      $("#red, #green, #blue").slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 127,
        slide: refreshSwatch,
        change: refreshSwatch
      });
    
      $("#red").slider("value", 255);
    
      $("#green").slider("value", 140);
    
      $("#blue").slider("value", 60);
    
      $("button#draw").click(function(event) {
        event.preventDefault();
        return draw(true, hex);
      });
    
      $("button#clear").click(function(event) {
        event.preventDefault();
        return clear();
      });
    
      $("button#undo").click(function(event) {
        event.preventDefault();
        return undo();
      });
    
      document.getElementById("dl").addEventListener('click', dlCanvas, false);
    
      counter = 0;
    
      setInterval(function() {
        var color;
        context.putImageData(imgData, 0, 0);
        switch (counter) {
          case counter = 0:
            color = "808080";
            break;
          case counter = 1:
            color = "404040";
            break;
          case counter = 2:
            color = "808080";
        }
        draw(false, color);
        return counter = 1 - counter;
      }, 200);

}).call(this);