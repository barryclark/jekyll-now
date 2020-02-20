//
// main.js
// Created by Francisco Sanchez on 02/19/20
// Copyright © 2019 Sanchez Parra Labs. All rights reserved.
//
(function() {
  var popup = document.getElementsByClassName("popup");
  popup[0].addEventListener('click', function(e) {
    if (e.target == '_blank') {
      return true;
    } else {
      window.open(e.target.href, 'popupwindow', 'scrollbars=yes,width=600,height=600');
      e.preventDefault();
      return false;
    }
  }, false);
}).call(this);
