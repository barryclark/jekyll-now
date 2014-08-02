window.onload = function() {
  var sidebar = document.getElementById("sidebar");
  var sidebarButton = document.getElementById("sidebar-button");

  function openSidebar(e) {
    if (sidebar.className.indexOf("slideIn") != -1) {
      sidebar.className = sidebar.className.replace(" slideIn", "");
    } else {
     sidebar.className = sidebar.className + " slideIn"; 
    }
  }

  sidebarButton.addEventListener("click", openSidebar, false);
};
