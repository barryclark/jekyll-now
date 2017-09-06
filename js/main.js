let navBtn = document.getElementById('mobile-nav-btn');
let navContainer = document.querySelector('.mobile-nav-container');
let navBar = document.querySelector('.mobile-nav');

navBtn.addEventListener('click', function() {
  let transform = navContainer.style.transform;
  if (transform == ' ' || transform == 'translateY(0px)') {
    navContainer.style.transform = 'translateY(-100%)';
    navBar.style.transform = 'translateY(0)';
    document.body.classList.remove('no-scroll');
  } else {
    navContainer.style.transform = 'translateY(0)';
    navBar.style.transform = 'translateY(' +
      (document.documentElement.clientHeight - navBar.clientHeight) + 'px';
      document.body.classList.add('no-scroll');
  }
});

//
// window.onscroll = function() {
//   if (document.body.scrollTop > 25) {
//     navBar.style.top = '-100%';
//   } else {
//     navBar.style.top = '0';
//   }
// };
