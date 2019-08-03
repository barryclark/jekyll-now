// == ILLUSTRATION ==

let illo = new Zdog.Illustration({
    element: '.zdog-canvas',
    dragRotate: true,
    zoom:.7,
  });

// == ANCHORS ==

let Corgi = new Zdog.Anchor({
  addTo:illo,
});
let Cake = new Zdog.Anchor({
  addTo:illo,
})
let Table = new Zdog.Anchor({
  addTo:illo,
})

// == VARS ==

var colorSkin = "#DF742D";
var colorWhite = "#fff";

// == CORGI == 

// == BODY ==
let cBody = new Zdog.RoundedRect({
  addTo: Corgi,
  width:  40,
  height: 120,
  stroke: 100, 
  cornerRadius:100,
  color: colorSkin,
  fill: true,
});
let cBelly = new Zdog.RoundedRect({
  addTo: cBody,
  color: colorWhite,
  width:60,
  height:150,
  stroke:10,
  fill:true,
  cornerRadius:60,
  translate:{z:50,y:0}
})
// == HEAD ==
let cHead = new Zdog.RoundedRect({
  addTo: Corgi,
  width: 50,
  height: 50,
  stroke: 100,
  color: colorSkin,
  fill:true,
  translate:{y:-120}
})
let rightEye = new Zdog.Group({
  addTo:cHead,
  translate:{z:50,y:-25,x:35}
})
let cRightEye = new Zdog.Ellipse({
  addTo: rightEye,
  diameter: 15,
  stroke: 30,
  color: colorWhite,
})
let cPupil = new Zdog.Ellipse({
  addTo:rightEye,
  diameter:25,
  stroke:5,
  color:'#000',
  translate:{z:10},
  fill:true,
})
let cGlare = new Zdog.Ellipse({
  addTo:rightEye,
  diameter:15,
  stroke:0,
  fill:true,
  color:'#fff',
  translate:{x:8,y:-10,z:10}
})
rightEye.copyGraph({
  translate:{z:50,y:-25,x:-35}
})



function animate(){
  illo.dragRotate = Corgi;
  illo.updateRenderGraph();
  requestAnimationFrame( animate );
};

animate();