  var OpenMenu = document.querySelector(".btn-hamburger");
  var LeftSideActive = document.querySelector(".nav-aside");

  OpenMenu.addEventListener("click", function(event) {
    event.preventDefault();
    OpenMenu.classList.toggle("active-menu");
    LeftSideActive.classList.toggle("active-side");
  });

  window.onload = function() {
    document.querySelector(".loader").style.display = "none";
  };
