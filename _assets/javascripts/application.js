//= require_self

// Initialize fluidbox

$(function () {
  $('.fluidbox-trigger').fluidbox();
})

// Initialize scrollreveal

window.sr = ScrollReveal({ reset: true });
sr.reveal('.reveal', {
  distance: '0',
  duration: 500,
  easing: 'ease-in-out',
  origin: 'top',
  scale: 1,
  reset: false,
  viewFactor: 0
});
