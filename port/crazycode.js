let mouseCursor = document.querySelector(".cursor");
let navLinks = document.querySelectorAll(".nav-links li a");
let headtitle = document.querySelector("a.blog");
let cursorEye = document.querySelector(".eye");

window.addEventListener('mousemove',cursor);

function cursor(e){
  mouseCursor.style.top = e.pageY +"px";
  mouseCursor.style.left = e.pageX +"px";
}

navLinks.forEach(link => {
  link.addEventListener('mouseover',() =>{
    mouseCursor.classList.add('link-mouse')
    link.classList.add("hover-link");
  });
  link.addEventListener('mouseleave',() =>{
    mouseCursor.classList.remove('link-mouse')
    link.classList.remove("hover-link");
  });
});

headtitle.addEventListener('mouseover',() =>{
  headtitle.classList.add('glitch');
  mouseCursor.classList.add('cursor-eye');
  cursorEye.classList.add('showEye');
});
headtitle.addEventListener('mouseleave',() =>{
  headtitle.classList.remove('glitch');
  mouseCursor.classList.remove('cursor-eye');
  cursorEye.classList.remove('showEye');
});

// Animations

gsap.to('.briefcase',{
  scrollTrigger: '.briefcase',
  x: 500,
  markers: true,
  scrub: true
})