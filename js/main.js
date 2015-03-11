var elements = document.getElementsByTagName('script')

Array.prototype.forEach.call(elements, function(element) {
  if (element.type.indexOf('math/tex') != -1) {
     // Extract math markdown
     var textToRender = element.innerText || element.textContent;
     
     // Support inline math
     if (element.type.indexOf('mode=display') != -1){
       textToRender = '\\displaystyle {' + textToRender + '}';
     }
     
     // Create span for KaTeX
     var katexElement = document.createElement('span');
     katex.render(textToRender, katexElement);
     
     // Insert KaTeX span
     element.parentNode.insertBefore(katexElement, element);
  }
});