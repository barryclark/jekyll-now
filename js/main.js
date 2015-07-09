(function swapTopSectionClass() {
  var top_container = document.querySelector(".top");
  var nav_a = document.querySelectorAll(".navbar a");
  var node;
  var i;
  var blogEntries = document.querySelectorAll(".container.posts");

  switch (window.location.pathname) {

    case "/blog/":
      top_container.classList.remove("top-home", "top-work");
      top_container.classList.add("top-blog");

      for (i=0; i < nav_a.length; i++) {
        node = nav_a[i];
        node.style.color = "rgba(0,0,0,0.5)";
      }

      for (i=0; i < blogEntries.length; i++) {
        node = blogEntries[i];
        node.classList.add("blog");
      }

      break;

    case "/work/":
      top_container.classList.remove("top-home", "top-blog");
      top_container.classList.add("top-work");

      for (i=0; i < nav_a.length; i++) {
        node = nav_a[i];
        node.style.color = "rgba(0,0,0,0.5)";
      }

      break;

    case "/":
      top_container.classList.remove("top-blog", "top-work");
      top_container.classList.add("top-home");
      break;

    // this this a blog post
    default:
      console.log(window.location.pathname);
      top_container.classList.remove("top-home", "top-work");
      top_container.classList.add("top-blog");

      for (i=0; i < nav_a.length; i++) {
        node = nav_a[i];
        node.style.color = "rgba(0,0,0,0.5)";
      }

      break;
  }

})();
