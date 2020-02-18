//
// towing.js
// Created by Francisco Sanchez on 11/26/19
// Copyright © 2019 Sanchez Parra Labs. All rights reserved.
//
$(document).ready(function() {

  var labels = ['passengers', 'cargo', 'curbWeight', 'gcvwr', 'gvwr', 'towingCapacity', 'payload', 'tt_hitch', 'tt_gvwr', 'tt_uvw'];

  function createCookie(cookieName, cookieValue, daysToExpire) {
    var date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString() + "; SameSite=Strict";
  }

  function accessCookie(cookieName) {
    var name = cookieName + "=";
    var allCookieArray = document.cookie.split(';');
    for (var i = 0; i < allCookieArray.length; i++) {
      var temp = allCookieArray[i].trim();
      if (temp.indexOf(name) == 0)
        return temp.substring(name.length, temp.length);
    }
    return "";
  }

  function calculate() {
    $('.alert').hide();
    var data = {};
    for (i = 0; i < labels.length; i++) {
      data[labels[i]] = get('#' + labels[i]);
    }
    var totalPayload = data.passengers + data.cargo;
    var newgvw = data.curbWeight + totalPayload + data.tt_hitch;
    var availablePayload = (data.payload - totalPayload) - data.tt_hitch;
    var newgcvw = (data.tt_gvwr - data.tt_hitch) + newgvw;

    if (availablePayload < 0) {
      $('.availablePayload-alert').show();
    }
    if (data.gvwr > 0 && newgvw > data.gvwr) {
      $('.newgvw-alert').show();
    }
    if (data.gcvwr > 0 && newgcvw > data.gcvwr) {
      $('.newgcvw-alert').show();
    }

    set('#totalPayload', totalPayload);
    set('#availablePayload', availablePayload);
    set('#newgvw', newgvw);
    set('#newgcvw', newgcvw);
    set('#newTowingCapacity', data.towingCapacity);

    createCookie('towingData', JSON.stringify(data), 365);
  }

  function get(selector) {
    var value = parseInt($(selector).val(), 10);
    return value;
  }

  function set(selector, value) {
    if (!isNaN(value)) {
      $(selector).val(value);
    }
  }

  function loadCookies() {
    var raw = accessCookie('towingData');
    if (raw !="") {
      data = JSON.parse(raw);
      for(var key in data) {
        set('#' + key, data[key]);
      }
      calculate();
    }
  }

  //$('[data-toggle="tooltip"]').tooltip();

  $(".form-control").focusout(function() {
    calculate();
  });

  loadCookies();
  $( document ).tooltip();
});
