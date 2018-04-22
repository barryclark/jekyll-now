
    // Helper function
    function debounce(func, wait = 20, immediate = true) {
        var timeout;
        return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
        };
    }
  
      const images = document.querySelectorAll('.slide-in');
  
      // Function to run at each event.
      // Check each image in turn to check if it's in the viewport...
      function checkSlide(e) {  
        images.forEach((image)=>{ 
  
          // Find half-way position of image
          const slideInAt = (window.scrollY + window.innerHeight) - image.height/2;
          
          // Position of bottom of image
          const imageBottom = image.offsetTop + image.height
          const isHalfShown = slideInAt > image.offsetTop;
  
          const isNotScrolledPast = window.scrollY < imageBottom;
          
          if(isHalfShown && isNotScrolledPast){
            image.classList.add('active');
          } else {
            image.classList.remove('active');
          }
        })  
      }
      // Run on load too, in case an element is already in the viewport before scrolling...
      window.onload = checkSlide;
      // Debounce the scroll event
      window.addEventListener('scroll', debounce(checkSlide)); 
  