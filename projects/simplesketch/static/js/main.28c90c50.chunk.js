(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(5),i=n.n(l),o=(n(13),n(2)),c=n(1),u=n(3),s=n.n(u),d=(n(16),n(6)),m=function(e,t,n,r,l,i,o,c){Object(a.useEffect)(function(){var a=document.getElementsByClassName("diagram")[0];a.onmousedown=function(e){e.target==a&&t({xStart:e.offsetX,yStart:e.offsetY})},a.onmousemove=function(t){if(e){var a={id:s()(),type:n,x:e.xStart,y:e.yStart,height:Math.abs(t.offsetY-e.yStart),width:Math.abs(t.offsetX-e.xStart),backgroundColor:r};o(a)}},a.onmouseup=function(a){if("diagram"==a.target.className&&c(null),e&&!(Math.abs(a.offsetX-e.xStart)<50&&Math.abs(a.offsetY-e.yStart<50))){var u={id:s()(),type:n,x:e.xStart,y:e.yStart,height:Math.abs(a.offsetY-e.yStart),width:Math.abs(a.offsetX-e.xStart),backgroundColor:r};i([].concat(Object(d.a)(l),[u])),o(null),t(null)}};return function(){null,null,null}})};function f(e){var t=e.tool,n=e.setTool;return r.a.createElement("div",{style:{position:"absolute",top:100,left:30,width:50,display:"flex",flexDirection:"column"}},r.a.createElement("span",null,"Elements"),r.a.createElement("button",{onClick:function(){return n("line")},style:{border:"1px solid black",backgroundColor:"line"==t?"lightgray":"white",width:50,height:30}},"Line"),r.a.createElement("button",{onClick:function(){return n("square")},style:{border:"1px solid black",backgroundColor:"square"==t?"lightgray":"white",marginTop:10,width:50,height:30}},"Square"),r.a.createElement("button",{onClick:function(){return n("circle")},style:{border:"1px solid black",backgroundColor:"circle"==t?"lightgray":"white",marginTop:10,width:50,height:30}},"Circle"))}function h(e){var t=e.color,n=e.setColor;return r.a.createElement("div",{style:{position:"absolute",top:250,left:30,width:50,display:"flex",flexDirection:"column",alignItems:"center"}},r.a.createElement("span",null,"Colors"),r.a.createElement("input",{type:"color",value:t,onChange:function(e){return n(e.target.value)},style:{width:30,height:30}}))}function g(e){var t=e.selectedItem,n=e.updateSelectedItem,a=e.deleteElement;return t?r.a.createElement("div",{style:{zIndex:999,backgroundColor:"#ffffff",position:"absolute",top:t.y,left:t.x+t.width+20,width:150,padding:10,display:"flex",flexDirection:"column",alignItems:"flex-start",borderStyle:"solid",borderWidth:2,borderColor:"#000000"}},r.a.createElement("button",{onClick:function(){return a(t.id)}},"Delete"),r.a.createElement("label",null,"Height"),r.a.createElement("input",{value:t.height,type:"number",onChange:function(e){return n(function(t){return Object(o.a)({},t,{height:parseInt(e.target.value)})})}}),r.a.createElement("label",null,"Width"),r.a.createElement("input",{value:t.width,type:"number",onChange:function(e){return n(function(t){return Object(o.a)({},t,{width:parseInt(e.target.value)})})}})):null}function b(e){var t=e.item,n=e.onElementClick,l=Object(a.useState)(null),i=Object(c.a)(l,2);i[0],i[1];return r.a.createElement("rect",{onClick:function(){return n(t.id)},className:"diagram-element",height:t.height,width:t.width,strokeWidth:t.selected?3:0,stroke:"#ccc",fill:t.backgroundColor,x:t.selected?t.x-3:t.x,y:t.selected?t.y-3:t.y})}function y(e){var t=e.item,n=e.onElementClick;return r.a.createElement("circle",{onClick:function(){return n(t.id)},className:"diagram-element",strokeWidth:t.selected?3:0,stroke:"#ccc",r:t.height,fill:t.backgroundColor,cx:t.selected?t.x-3:t.x,cy:t.selected?t.y-3:t.y})}function E(e){var t=e.item,n=e.onElementClick;return r.a.createElement("line",{onClick:function(){return n(t.id)},className:"diagram-element",x1:t.selected?t.x-3:t.x,x2:t.x+t.width,y1:t.selected?t.y-3:t.y,y2:t.y+t.height,strokeWidth:t.selected?6:3,stroke:t.backgroundColor})}var k=function(){var e=Object(a.useState)("square"),t=Object(c.a)(e,2),n=t[0],l=t[1],i=Object(a.useState)("#000000"),u=Object(c.a)(i,2),s=u[0],d=u[1],k=function(){var e=JSON.parse(localStorage.getItem("diagram")),t=Object(a.useState)(e||[]),n=Object(c.a)(t,2),r=n[0],l=n[1];return[r,function(e){l(e),localStorage.setItem("diagram",JSON.stringify(e))}]}(),p=Object(c.a)(k,2),C=p[0],w=p[1],v=Object(a.useState)(null),x=Object(c.a)(v,2),S=x[0],O=x[1],j=Object(a.useState)(null),I=Object(c.a)(j,2),N=I[0],W=I[1],q=function(e){return w(C.map(function(t){return Object(o.a)({},t,{selected:t.id==e})}))};m(N,W,n,s,C,w,O,q);var M=C.find(function(e){return e.selected});return r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,"Simple Sketch"),r.a.createElement(f,{tool:n,setTool:l}),r.a.createElement(h,{color:s,setColor:d}),r.a.createElement("div",{className:"diagram-container"},r.a.createElement("svg",{className:"diagram"},function(e){if(e){var t=function(){};switch(e.type){case"square":return r.a.createElement(b,{key:e.id,item:e,onElementClick:t});case"circle":return r.a.createElement(y,{key:e.id,item:e,onElementClick:t});case"line":return r.a.createElement(E,{key:e.id,item:e,onElementClick:t})}}}(S),C.map(function(e){switch(e.type){case"square":return r.a.createElement(b,{key:e.id,item:e,onElementClick:q});case"circle":return r.a.createElement(y,{key:e.id,item:e,onElementClick:q});case"line":return r.a.createElement(E,{key:e.id,item:e,onElementClick:q})}})),r.a.createElement(g,{selectedItem:M,updateSelectedItem:function(e){return w(C.map(function(t){return t.id==M.id?e(t):t}))},deleteElement:function(e){return w(C.filter(function(t){return t.id!=e}))}})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},7:function(e,t,n){e.exports=n(17)}},[[7,1,2]]]);
//# sourceMappingURL=main.28c90c50.chunk.js.map