(function () {
  "use strict";
  var menuOpen = document.querySelector(".btn-hamburger");
  var menuClose = document.querySelector(".btn-close");
  var menuItem = document.querySelectorAll(".nav-top__item");
  var searchFormBtn = document.querySelector(".btn-search");
  var searchForm = document.querySelector(".form-container");
  var btnMinus = document.querySelectorAll(".minus");
  var btnPlus = document.querySelectorAll(".plus");
  var adultQuantity = document.querySelector("#adult");
  var infantQuantity = document.querySelector("#infant");


  menuOpen.addEventListener("click", function(event) {
    event.preventDefault();
    for (var i = 0; i < menuItem.length; i++) {
      menuItem[i].classList.add("menu-item-show");
    };
  });
  menuClose.addEventListener("click", function(event) {
    event.preventDefault();
    for (var i = 0; i < menuItem.length; i++) {
      menuItem[i].classList.remove("menu-item-show");
    };
  });
  searchFormBtn.addEventListener("click", function(event) {
    event.preventDefault();
    searchForm.classList.toggle("search-form-show");
  });
  btnMinus[0].addEventListener("click", function(event) {
    event.preventDefault();
    if (adultQuantity.value == 1) {
      adultQuantity.value = 1;
    } else {
      adultQuantity.value -= 1;
    }
  });
  btnPlus[0].addEventListener("click", function(event) {
    event.preventDefault();
    ++adultQuantity.value;
  });
  btnMinus[1].addEventListener("click", function(event) {
    event.preventDefault();
    if (infantQuantity.value == 0) {
      infantQuantity.value = 0;
    } else {
      infantQuantity.value -= 1;
    }
  });
  btnPlus[1].addEventListener("click", function(event) {
    event.preventDefault();
    ++infantQuantity.value;
  });

}());
