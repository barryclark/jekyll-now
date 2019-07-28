
Zfont.init(Zdog);
// == VARS ==
var jump = 0.0001;
const TAU = Zdog.TAU;

// == ILLUSTRATION ==
let illo = new Zdog.Illustration({
    element: '.zdog-canvas',
    dragRotate: true,
    zoom:.7,
  });

// == CAT ANCHOR ==
let Gato = new Zdog.Anchor({
    addTo:illo,
    translate:{x:-160},
  });
// == ROBOT ANCHOR ==
let Robot = new Zdog.Group({
    addTo: illo,
    translate:{x:80,z:-600},
    rotate:{x:3},
    scale:0.5,
})

// == FONT ==
var montserrat = new Zdog.Font({
    src:'Montserrat-bold.ttf',
});
var muli = new Zdog.Font({
    src:'Muli-Regular.ttf',
})
var Lead = new Zdog.Text({
    addTo: illo,
    font: muli,
    value:["Algo no funcionó como debía","y ahora estamos en este incómodo momento"],
    fontSize:30,
    color:'#fff',
    fill:true,
    stroke:1,
    textBaseLine:'middle',
    textAlign:'center',
    translate:{y:350},
})
var Header = new Zdog.Text({
    addTo: illo,
    font: montserrat,
    value:"Error 404",
    fontSize:120,
    textAlign:'center',
    color:'#fff',
    fill:true,
    textBaseLine:'middle',
    stroke:8,
    translate:{y:-350},
});

// == ROBOT ==
let rglass = new Zdog.Hemisphere({
    addTo: Robot,
    stroke: 6,
    diameter: 300,
    color:'rgba(189,233,232,.4)',
    fill:true,
})
let rBase = new Zdog.Hemisphere({
    addTo: Robot,
    stroke: false,
    diameter: 320,
    color:'#B5B9BD',
    fill:true,
    backface:'#889B9B',
    rotate:{x:2},
});

// == CAT ==

// == EARS ==
let cEar= new Zdog.RoundedRect({
    addTo: Gato,
    width:18,
    height:50,
    color:'#F5C685',
    stroke:20,
    cornerRadius:20,
    translate:{x:40,y:-75,z:0},
    fill:true,
});
let cInsideEar= new Zdog.RoundedRect({
    addTo:cEar,
    width:8,
    height:20,
    stoke:10,
    cornerRadius:20,
    fill:true,
    translate:{z:10,y:-10},
    color:'#FFA0B7',
});
cEar.copyGraph({
    translate:{x:-40,y:-75,z:0},
});
// == MOFLETS ==
let cMufflet = new Zdog.RoundedRect({
    addTo: Gato,
    color: '#F5C685',
    width:30,
    height:5,
    stroke:28,
    cornerRadius:20,
    translate:{x:60,y:-35},
    fill:true,
});
cMufflet.copyGraph({
    translate:{x:-60,y:-35},
});
cMufflet.copyGraph({
    translate:{x:-60,y:-10},
});

cMufflet.copyGraph({
    translate:{x:60,y:-10},
});
// == HANDS ==

let cArm = new Zdog.RoundedRect({
    addTo:Gato,
    color:'#F5C685',
    cornerRadius:10,
    width:30,
    height:5,
    stroke:20,
    fill:true,
    translate:{x:70,y:20},
})
let cPaw = new Zdog.Ellipse({
    addTo:cArm,
    color:'#FFA0B7',
    fill:true,
    stroke:5,
    diameter:6,
    translate:{x:10,z:10},
})
let cFinger = new Zdog.Shape({
    addTo: cPaw,
    color:'#FFA0B7',
    stroke:4,
    translate:{x:3,y:-8,z:-1},
});
cFinger.copyGraph({
    translate:{x:9,y:-5,z:-1},
});
cFinger.copyGraph({
    translate:{x:9,y:3,z:-1},
});
cFinger.copyGraph({
    translate:{x:5,y:8},z:-1,
});

cArm.copyGraph({
    rotate:{z:TAU/2},
    translate:{x:-70,y:20},
})
cArm.copyGraph({
    rotate:{z:TAU/4},
    translate:{x:-40,y:90},
})
cArm.copyGraph({
    rotate:{z:TAU/4},
    translate:{x:40,y:90},
})
// == TAIL ==
let cTail = new Zdog.Shape({
    addTo: Gato,
    path: [
        { x: -40, y: -40 },   // start
        { arc: [
          { x:  20, y: -40 }, // corner
          { x:  20, y:  20 }, // end point
        ]},
        { arc: [ // start next arc from last end point
          { x:  20, y:  40 }, // corner
          { x:  40, y:  40 }, // end point
        ]},
      ],
  closed: false,
  stroke: 15,
  color: '#F5C685',
  translate:{x:10,y:85,z:-40},
});
let cTailPoint = new Zdog.Shape({
    addTo: cTail,
    color:'#854730',
    stroke:16,
    path: [{x:41,y:40}],
    fill:true,
});
// == BODY ==
let cBody = new Zdog.RoundedRect({
    addTo: Gato,
    width:  40,
    height: 90,
    stroke: 100, 
    cornerRadius:10,
    color: '#F5C685',
    fill: false,
});

let cBelly = new Zdog.RoundedRect({
    addTo: Gato,
    color:'#FAD3B1',
    width:20,
    height:45,
    stroke:10,
    fill:true,
    translate:{z:50,y:30}
})
// Eyes
let cRightEye = new Zdog.Ellipse({
    addTo: Gato,
    diameter: 10,
    stroke: 20,
    color: '#FEF9DC',
    translate: {z:45,x:30,y:-40},
});
let cpupil = new Zdog.Ellipse({
    addTo: cRightEye,
    diameter:5,
    stroke: 10,
    color:'#000',
    translate:{z:8},
});

let cLeftEye= new Zdog.Ellipse({
    addTo: Gato,
    diameter: 10,
    stroke: 20,
    color: '#FEF9DC',
    translate:{z:45,x:-30,y:-40},
});
cpupil.copyGraph({
    addTo: cLeftEye,
});

// == EYEBROWS ==
let cRightEyebrow = new Zdog.Shape({
    addTo: cRightEye,
    color:'#623728',
    path: [
        {x:1,y:10},
        {x:20,y:15},
    ],
    translate:{x:-8,y:-30},
    stroke:10,
});
let cLeftEyebrow = new Zdog.Shape({
    addTo: cLeftEye,
    color:'#623728',
    path: [
        {x:-20,y:15},
        {x:1,y:10},
    ],
    translate:{x:8,y:-30},
    stroke:10,
});
// == MOUTH ==
let cMouth = new Zdog.Shape({
    addTo: Gato,
    translate:{y:-30,z:50},
    color:'#F5C685',
    stroke:30,
});
let cNose = new Zdog.Shape({
    addTo: cMouth,
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
    translate:{z:15},
    stroke:6,
    color:'#FF6C8D',
    fill:true,
    scale:0.7,
});
let cLips = new Zdog.Shape({
    addTo:cMouth,
    color:'#623728',
    stroke:4,
    path:[
    {x:-10,y:10},
    {x:0,y:0},
    {x:10,y:10},
    ],
    closed:false,
    translate:{z:14,y:2},
});



function animate(){
// Robot.rotate.z += 0.01;
// Robot.rotate.y += 0.001;
// Gato.rotate.y -=0.001;
// Gato.rotate.z -=-0.01;
illo.zoom = illo.zoom - jump;

if (illo.zoom < .65){
jump = -1*jump;
}
if(illo.zoom > .7){
    jump = -1*jump;
}


illo.dragRotate = Gato;
illo.updateRenderGraph();
requestAnimationFrame( animate );
};
animate();