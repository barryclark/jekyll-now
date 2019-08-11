// == ILLUSTRATION ==

let illo = new Zdog.Illustration({
    element: '.zdog-canvas',
    dragRotate: true,
    zoom:.7,
  });

// == ANCHORS ==

let Corgi = new Zdog.Anchor({
  addTo:illo,
  translate:{x:60},
});
let Table = new Zdog.Anchor({
  addTo:illo,
  translate:{z:10}
});
let Cake = new Zdog.Group({
  addTo:illo,

})
// == VARS ==
const TAU = Zdog.TAU;
var flip = 0.1;


var colorSkin = "#DF742D";
var colorDarkSkin = "#623728";
var colorWhite = "#fff";
var colorPink = "#FAD3B1";
var colorTongue = "#F92432";

// == CORGI == 

// == BODY ==
let cBody = new Zdog.RoundedRect({
  addTo: Corgi,
  width:  40,
  height: 180,
  stroke: 100, 
  cornerRadius:100,
  color: colorSkin,
  fill: true,
  translate:{y:-25},
});
let cBelly = new Zdog.RoundedRect({
  addTo: cBody,
  color: colorWhite,
  width:60,
  height:180,
  stroke:10,
  fill:true,
  cornerRadius:60,
  translate:{z:50,y:20}
})
//  == HAT ==
let partyHat = new Zdog.Cone({
  addTo:Corgi,
  diameter: 50,
  length: 50,
  stroke: false,
  color: '#636',
  backface: '#C25',
  rotate:{x:TAU/6,y:TAU/16},
  translate:{y:-198},
})
let topHat = new Zdog.Shape({
  addTo:partyHat,
  path:[
    {x:0},
    {x:10},
  ],
  stroke:5,
  translate:{z:50},
  color:colorWhite,
})

topHat.copyGraph({
  addTo:partyHat,
  path:[
    {x:0},
    {y:10},
  ],
})
topHat.copyGraph({
  addTo:partyHat,
  path:[
    {x:0},
    {z:10},
  ],
})
topHat.copyGraph({
  addTo:partyHat,
  path:[
    {x:0},
    {y:-10},
  ],
})
topHat.copyGraph({
  addTo:partyHat,
  path:[
    {x:0},
    {z:-10},
  ],
})
topHat.copyGraph({
  addTo:partyHat,
  path:[
    {x:0},
    {x:-10},
  ],
})

//  == HEAD ==
let cHead = new Zdog.RoundedRect({
  addTo: cBody,
  width: 50,
  height: 40,
  stroke: 100,
  color: colorSkin,
  fill:true,
  translate:{y:-80}
})
let rightEye = new Zdog.Group({
  addTo:cHead,
  translate:{z:50,y:-25,x:35},
})
let cRightEye = new Zdog.Ellipse({
  addTo: rightEye,
  diameter: 10,
  stroke: 30,
  color: colorWhite,
})
let cPupil = new Zdog.Ellipse({
  addTo: rightEye,
  diameter:20,
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
  translate:{x:5,y:-5,z:10}
})
rightEye.copyGraph({
  translate:{z:50,y:-25,x:-35}
})
let cMouth = new Zdog.Group({
  addTo:cHead,
  translate:{y:-10}
})
let cSnout = new Zdog.RoundedRect({
  addTo:cMouth,
  color:colorWhite,
  width:10,
  height:8,
  stroke:35,
  cornerRadius:0,
  fill:true,
  translate:{z:70,y:10},
  rotate:{x:TAU/4}
})
let cNoseTop = new Zdog.RoundedRect({
  addTo:cHead,
  color:colorWhite,
  height:40,
  width:10,
  fill:true,
  translate:{z:50,y:-20},
  cornerRadius:20,
})
let cNose = new Zdog.Shape({
  addTo:cMouth,
  color:'#000',
  path:[
    {x:-7,y:-7}, //start
    { bezier:[
        {x:-7,y:-7}, // start control point
        {x:0,y:-14}, // end control point
        {x:7,y:-7}, // end point
    ]},
    {x:0,y:0},
  ],
  closed: true,
  stroke:10,
  fill:true,
  scale:1,
  translate:{z:90,y:9}
})
let cEar = new Zdog.Shape({
  addTo:cHead,
  color:colorSkin,
  fill:true,
  stroke:20,
  path:[
    {x:-5,y:0}, //start
    { bezier:[
        {x:70,y:-90}, // start control point
        {x:50,y:10}, // end control point
        {x:20,y:40}, // end point
    ]},
    {x:0,y:0},
  ],
  scale:1,
  translate:{x:50,y:-55}
})
let cEarInsideLeft = new Zdog.Shape({
  addTo:cHead,
  fill:true,
  color:colorPink,
  backface:colorSkin,
  path:[
    {x:0,y:0}, //start
    { bezier:[
        {x:70,y:-90}, // start control point
        {x:50,y:10}, // end control point
        {x:20,y:25}, // end point
    ]},
    { bezier:[
      {x:10,y:5}, // start control point
      {x:5,y:5}, // end control point
      {x:0,y:0}, // end point
  ]},
    {x:0,y:0},
  ],
  translate:{z:9,x:50,y:-55}
})
let cEarInsideRight = new Zdog.Shape({
  addTo:cHead,
  fill:true,
  color:colorPink,
  backface:colorSkin,
  path:[
    {x:0,y:0}, //start
    { bezier:[
        {x:-70,y:-90}, // start control point
        {x:-50,y:10}, // end control point
        {x:-20,y:25}, // end point
    ]},
    { bezier:[
      {x:-10,y:5}, // start control point
      {x:-5,y:5}, // end control point
      {x:0,y:0}, // end point
  ]},
    {x:0,y:0},
  ],
  translate:{z:9,x:-40,y:-60},
  rotate:{z:TAU/24}
})
cEar.copyGraph({
  addTo:cHead,
  rotate:{y:TAU/2,z:-TAU/24},
  translate:{x:-40,y:-60}
})
let cEyebrow = new Zdog.RoundedRect({
  addTo:cHead,
  width:10,
  height:5,
  stroke:10,
  color:colorDarkSkin,
  translate:{z:60,y:-45,x:45},
  rotate:{z:TAU/16}
})
cEyebrow.copyGraph({
  rotate:{z:-TAU/16},
  translate:{z:60,y:-45,x:-45}
})
let cTongue = new Zdog.Shape({
  addTo:cHead,
  closed:true,
  fill:true,
  color:colorTongue,
  stroke:10,
  path:[
    {x:-10,y:0},
    {x:10,y:0}, //start
    { bezier:[
        {x:10,y:0}, // start control point
        {x:10,y:10}, // end control point
        {x:0,y:10}, // end point
    ]},
    {bezier:[
      {x:0,y:10},
      {x:-10,y:10},
      {x:-10,y:0}
    ]}
  ],
  translate:{z:70,y:18},
})
let cTail = new Zdog.Shape({
  addTo: cBody,
  stroke:30,
  color:colorWhite,
  path:[
    {x:0,y:110,z:-55},
    {x:0,y:100,z:-50}
  ]
})

// == ARMS ==
let cArm = new  Zdog.RoundedRect({
  addTo:Corgi,
  color:colorSkin,
  cornerRadius:10,
  width:20,
  height:20,
  stroke:35,
  fill:false,
  translate:{x:55,y:-80,z:50},
  rotate:{x:TAU/4,z:TAU/4},
})
let cFinger = new Zdog.Shape({
  addTo:cArm,
  stroke:22,
  color:colorWhite,
  path:[
    {x:25,y:0,z:0},
    {x:45,y:0,z:0}
  ]
})
cArm.copyGraph({
  translate:{x:-55,y:-80,z:50},
})

// == FEET ==
let cFeetRAnchor = new Zdog.Anchor({
  addTo:cBody,
  translate:{x:0,y:50,z:-15},
})
let cRPaw = new Zdog.RoundedRect({
  addTo:cFeetRAnchor,
  color:colorWhite,
  width:1,
  height:15,
  stroke:20,
  fill:true,
  translate:{x:45,y:115,z:25},
})
let cFeetRight = new Zdog.RoundedRect({
  addTo:cFeetRAnchor,
  color:colorSkin,
  cornerRadius:10,
  width:10,
  height:30,
  stroke:35,
  fill:false,
  translate:{x:45,y:70,z:25},
})

let cFeetLAnchor = new Zdog.Anchor({
  addTo:cBody,
  translate:{x:0,y:50,z:-15},
})
let cLPaw = new Zdog.RoundedRect({
  addTo:cFeetLAnchor,
  color:colorWhite,
  width:1,
  height:15,
  stroke:20,
  fill:true,
  translate:{x:-45,y:115,z:25},
})
let cFeetLeft = new Zdog.RoundedRect({
  addTo:cFeetLAnchor,
  color:colorSkin,
  cornerRadius:10,
  width:10,
  height:30,
  stroke:35,
  fill:false,
  translate:{x:-45,y:70,z:25},
})



// == TABLE == 

let tBoard = new Zdog.Box({
  addTo: Table,
  width: 420,
  height: 50,
  depth: 200,
  stroke: false,
  color: '#FAE19E', 
  leftFace: '#D9B98B',
  rightFace: '#D9B98B',
  topFace: '#DDA974',
  bottomFace: '#DDA974',
  translate:{z:150,y:-34},
})
let tLeg = new Zdog.Box({
  addTo: Table,
  width: 40,
  height: 250,
  depth: 40,
  stroke: false,
  color: '#FAE19E',
  leftFace: '#D9B98B',
  rightFace: '#D9B98B',
  topFace: '#DDA974',
  bottomFace: '#DDA974',
  translate:{z:80,y:100,x:-190},
})
tLeg.copyGraph({
  translate:{x:190,z:80,y:100}
})
tLeg.copyGraph({
  translate:{x:190,y:100,z:225},
})
tLeg.copyGraph({
  translate:{x:-190,y:100,z:225},
})

// == CAKE ==

let cLayer = new Zdog.Cylinder({
  addTo: Cake,
  diameter:120,
  length:20,
  stroke:false,
  color:"#56342C",
  backface:"#814D42",
  translate:{z:150,y:-70,x:-90},
  rotate:{x:TAU/4},
})
cLayer.copy({
  translate:{z:150,y:-90,x:-90},
  color:"#FB6066",
})
cLayer.copy({
  translate:{z:150,y:-110,x:-90},
})

// == Candle ==

let cCandle = new Zdog.Shape({
  addTo: Cake,
  color:"#7232BD",
  stroke:10,
  path: [
    {x:-90,y:-125,z:150},
    {x:-90,y:-150,z:150},
  ],
})
let cMoreFire = new Zdog.Shape({
  addTo:Cake,
  color:"#ff0000",
  stroke:15,
  path:[
    {x:-90,y:-150,z:150},
    {x:-90,y:-170,z:150},
  ]
})
let cFire = new Zdog.Shape({
  addTo:Cake,
  color:"#ffff00",
  stroke:10,
  path:[
    {x:-90,y:-150,z:150},
    {x:-90,y:-155,z:150}
  ]
})


function animate(){
  illo.dragRotate = illo;
  console.log("HaPPy Birthday Asya!!");
  cFeetRAnchor.rotate.x = cFeetRAnchor.rotate.x - flip;
  cFeetLAnchor.rotate.x = cFeetLAnchor.rotate.x + flip;
if (cFeetRAnchor.rotate.x < -0.5) {
  flip = -1*flip;
}
if (cFeetRAnchor.rotate.x > 0.2) {
  flip = -1*flip;
}
  illo.rotate.y -=0.001;
  illo.rotate.z -=0.001;


  illo.updateRenderGraph();
  requestAnimationFrame( animate );
};

animate();