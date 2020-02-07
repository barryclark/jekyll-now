// colors
var colorGold = "#C2B7A3";
var colorBlack = "#0e0e0e";
var colorDarkTan = "#181714";

// locations
var imgRoot = "./img/";

var infoBox = document.getElementById("node-info");

var checkbox = document.getElementById("shouldShowAllAncestors");
checkbox.addEventListener('change', (event) => {
  if (event.target.checked) {
    return;
  } else {
    unHoverNodesAndEdges();
    network.redraw();
  }
});

// hover effects
var hoverChosenNode = function(values, id, selected, hovering) {
  var node = network.body.nodes[id];
  console.log(values);
  values.shadow = true;
  values.shadowColor = "#ff0000";
  values.shadowX = 0;
  values.shadowY = 0;
  values.shadowSize = 20;
};
var hoverChosenEdge = function(values, id, selected, hovering) {
  values.color = "#ff0000";
  values.opacity = 1.0;
  values.dashes = false;
  values.shadowX = 0;
  values.shadowY = 0;
  values.shadow = true;
  values.shadowColor = "#ff0000";
};

var jsonData = {
  stations: [
    {
      id: "AFU1",
      label: "Air Filtration Unit",
      title: "Air Filtering Unit",
      shape: "circularImage",
      image: imgRoot + "air-filtration-unit.png",
      requirements: {
        items: ["10,000 Dollars"],
        loyalty: ["Skier LL3"]
      }
    },
    {
      id: "BF1",
      label: "Level 1",
      title: "Bitcoin Farm 1",
      shape: "circularImage",
      image: imgRoot + "bitcoin-farm.png",
      requirements: {
        items: [
          "10 CPU fan",
          "5 Power supply unit",
          "5 Powercord",
          "1 Electric drill"
        ]
      }
    },
    {
      id: "BF2",
      label: "Level 2",
      title: "Bitcoin Farm 2",
      shape: "circularImage",
      image: imgRoot + "bitcoin-farm.png",
      requirements: {
        items: [
          "15 CPU fan",
          "5 Power supply unit",
          "5 printed circuit board",
          "2 Phase control relay"
        ]
      }
    },
    {
      id: "BF3",
      label: "Level 3",
      title: "Bitcoin Farm 3",
      shape: "circularImage",
      image: imgRoot + "bitcoin-farm.png",
      requirements: {
        items: [
          "25 CPU fan",
          "10 Silicone tube",
          "1 Electric motor",
          "2 Pressure gauge"
        ]
      }
    },
    {
      id: "BG1",
      label: "Level 1",
      title: "Booze Generator",
      shape: "circularImage",
      image: imgRoot + "booze-generator.png",
      requirements: {
        items: [
          "4 Silicone tube",
          "2 Analog thermometer",
          "2 Pressure gauge",
          "5 Corrugated hose"
        ]
      }
    },
    {
      id: "G1",
      label: "Level 1",
      title: "Generator 1",
      shape: "circularImage",
      image: imgRoot + "generator.png",
      y: -50,
      requirements: {
        items: ["₽100,000 Roubles"]
      }
    },
    {
      id: "G2",
      label: "Level 2",
      title: "Generator 2",
      shape: "circularImage",
      image: imgRoot + "generator.png",
      requirements: {
        items: ["5 Phase control relay", "1 Electric motor", "15 Wires"]
      }
    },
    {
      id: "G3",
      label: "Level 3",
      title: "Generator 3",
      shape: "circularImage",
      image: imgRoot + "generator.png",
      requirements: {
        items: [
          "6 Phase control relay",
          "2 Electric motor",
          "5 Spark plug",
          "5 Power supply unit"
        ],
        loyalty: ["Mechanic LL3"]
      }
    },
    {
      id: "H1",
      label: "Level 1",
      title: "Heater 1",
      shape: "circularImage",
      image: imgRoot + "heating.png",
      requirements: {
        items: ["₽25,000 Roubles"]
      }
    },
    {
      id: "H2",
      label: "Level 2",
      title: "Heating 2",
      shape: "circularImage",
      image: imgRoot + "heating.png",
      requirements: {
        items: ["₽50,000 Roubles"],
        skills: ["Endurance 2"]
      }
    },
    {
      id: "H3",
      label: "Level 3",
      title: "Heating 3",
      shape: "circularImage",
      image: imgRoot + "heating.png",
      requirements: {
        items: ["8 Radiator helix", "8 Wires"],
        loyalty: ["Ragman LL2"]
      }
    },
    {
      id: "I1",
      label: "Level 1",
      title: "Illumination 1",
      shape: "circularImage",
      image: imgRoot + "illumination.png",
      requirements: {
        items: ["10,000 Roubles"]
      }
    },
    {
      id: "I2",
      label: "Level 2",
      title: "Illumination 2",
      shape: "circularImage",
      image: imgRoot + "illumination.png",
      requirements: {
        items: ["14 Light bulb", "5 Wires"]
      }
    },
    {
      id: "I3",
      label: "Level 3",
      title: "Illumination 3",
      shape: "circularImage",
      image: imgRoot + "illumination.png",
      requirements: {
        items: ["50,000 Roubles", "7 Capacitors"],
        loyalty: ["Mechanic LL2"]
      }
    },
    {
      id: "IC1",
      label: "Level 1",
      title: "Intel Center 1",
      shape: "circularImage",
      image: imgRoot + "intelligence-center.png",
      requirements: {
        items: ["1 Folder with intelligence"]
      }
    },
    {
      id: "IC2",
      label: "Level 2",
      title: "Intel Center 2",
      shape: "circularImage",
      image: imgRoot + "intelligence-center.png",
      requirements: {
        items: [
          "3 Folder with intelligence",
          "3 Secure flash drive",
          "4 Powercord",
          "4 Damaged hard drive"
        ],
        loyalty: ["Mechanic LL2"],
        skills: ["Attention 3"]
      }
    },
    {
      id: "IC3",
      label: "Level 3",
      title: "Intel Center 3",
      shape: "circularImage",
      image: imgRoot + "intelligence-center.png",
      requirements: {
        items: [
          "2 Military COFDM",
          "2 VPX Flash storage module",
          "3 Gas analyzer",
          "4 Military cable"
        ],
        loyalty: ["Prapor LL3"]
      }
    },
    {
      id: "L1",
      label: "Level 1",
      title: "Lavatory 1",
      shape: "circularImage",
      image: imgRoot + "lavatory.png",
      requirements: {
        items: ["2,000 Roubles"]
      }
    },
    {
      id: "L2",
      label: "Level 2",
      title: "Lavatory 2",
      shape: "circularImage",
      image: imgRoot + "lavatory.png",
      requirements: {
        items: ["3 Corrugated hoses", "5 A pack of screws", "1 Electric drill"]
      }
    },
    {
      id: "L3",
      label: "Level 3",
      title: "Lavatory 3",
      shape: "circularImage",
      image: imgRoot + "lavatory.png",
      requirements: {
        items: [
          "6 Corrugated hoses",
          "2 Pressure gauge",
          "1 A set of tools",
          "3 Xenomorph sealing foam"
        ]
      }
    },
    {
      id: "LIB1",
      label: "Library",
      title: "Library",
      shape: "circularImage",
      image: imgRoot + "library.png",
      requirements: {
        items: ["400,000 Roubles"],
        skills: ["Memory 8"]
      }
    },
    {
      id: "M1",
      label: "Level 1",
      title: "Medstation 1",
      shape: "circularImage",
      image: imgRoot + "medstation.png",
      requirements: {
        items: ["25,000 Roubles"]
      }
    },
    {
      id: "M2",
      label: "Level 2",
      title: "Medstation 2",
      shape: "circularImage",
      image: imgRoot + "medstation.png",
      requirements: {
        items: ["50,000 Roubles", "1 Medical bloodset", "3 Saline solution"],
        loyalty: ["Therapist LL2"],
        skills: ["Health 2"]
      }
    },
    {
      id: "M3",
      label: "Level 3",
      title: "Medstation 3",
      shape: "circularImage",
      image: imgRoot + "medstation.png",
      requirements: {
        items: ["150,000 Roubles", "5 Saline solution", "1 LEDX"],
        loyalty: ["Therapist LL3", "Skier LL2"],
        skills: ["Vitality 3"]
      }
    },
    {
      id: "NU1",
      label: "Level 1",
      title: "Nutrition Unit 1",
      shape: "circularImage",
      image: imgRoot + "nutrition-unit.png",
      requirements: {
        items: ["25,000 Roubles", "2 Phase control relay"]
      }
    },
    {
      id: "NU2",
      label: "Level 2",
      title: "Nutrition Unit 2",
      shape: "circularImage",
      image: imgRoot + "nutrition-unit.png",
      requirements: {
        items: [
          "4 Wrench",
          "2 Corrugated hose",
          "2 Heat-exchange alkali",
          "1 Phase control relay"
        ]
      }
    },
    {
      id: "NU3",
      label: "Level 3",
      title: "Nutrition Unit 3",
      shape: "circularImage",
      image: imgRoot + "nutrition-unit.png",
      requirements: {
        items: ["125,000 Roubles", "3 Coffee Majaica", "3 Sodium bicarbonate"],
        skills: ["Metabolism 3"]
      }
    },
    {
      id: "RS1",
      label: "Level 1",
      title: "Rest Space 1",
      shape: "circularImage",
      image: imgRoot + "rest-space.png",
      requirements: {
        items: ["10,000 Roubles"]
      }
    },
    {
      id: "RS2",
      label: "Level 2",
      title: "Rest Space 2",
      shape: "circularImage",
      image: imgRoot + "rest-space.png",
      requirements: {
        items: ["35,000 Roubles"],
        loyalty: ["Ragman LL2"]
      }
    },
    {
      id: "RS3",
      label: "Level 3",
      title: "Rest Space 3",
      shape: "circularImage",
      image: imgRoot + "rest-space.png",
      requirements: {
        items: ["3,000 Dollars", "4 Powercord", "5 Capacitor", "7 Wires"],
        loyalty: ["Skier LL3"]
      }
    },
    {
      id: "SC1",
      label: "Scav Case",
      title: "Scav Case",
      shape: "circularImage",
      image: imgRoot + "scav-case.png",
      requirements: {
        items: [
          "2 Bronze lion",
          "2 Gold skull ring",
          "6 Golden neck chain",
          "3 Roler"
        ]
      }
    },
    {
      id: "Sec1",
      label: "Level 1",
      title: "Security 1",
      shape: "circularImage",
      image: imgRoot + "security.png",
      requirements: {
        items: ["20,000 Roubles"]
      }
    },
    {
      id: "Sec2",
      label: "Level 2",
      title: "Security 2",
      shape: "circularImage",
      image: imgRoot + "security.png",
      requirements: {
        items: ["45,000 Roubles"],
        skills: ["Endurance 2"]
      }
    },
    {
      id: "Sec3",
      label: "Level 3",
      title: "Security 3",
      shape: "circularImage",
      image: imgRoot + "security.png",
      requirements: {
        items: ["2 Working LCD", "4 Wires", "8 NIXXOR lens", "1 SSD drive"],
        loyalty: ["Mechanic LL2"]
      }
    },
    {
      id: "SR1",
      label: "Range",
      title: "Shooting Range",
      shape: "circularImage",
      image: imgRoot + "shooting-range.png",
      requirements: {
        items: ["4 A pack of nails", "5 Screw nut", "5 Bolts", "3 Duct tape"]
      }
    },
    {
      id: "SP1",
      label: "Solar Power",
      title: "Solar Power",
      shape: "circularImage",
      image: imgRoot + "solar-power.png",
      requirements: {
        items: [
          "15,000 Euros",
          "4 Military cable",
          "2 Phased array element",
          "4 Military power filter"
        ],
        loyalty: ["Peacekeeper LL4"]
      }
    },
    {
      id: "Sta1",
      label: "Level 1",
      title: "Stash 1",
      shape: "circularImage",
      image: imgRoot + "stash.png"
    },
    {
      id: "Sta2",
      label: "Level 2",
      title: "Stash 2",
      shape: "circularImage",
      image: imgRoot + "stash.png",
      requirements: {
        items: [
          "3,500,000 Roubles",
          "1 Handdrill",
          "7 A pack of screws",
          "4 WD-40 100ml"
        ]
      }
    },
    {
      id: "Sta3",
      label: "Level 3",
      title: "Stash 3",
      shape: "circularImage",
      image: imgRoot + "stash.png",
      requirements: {
        items: ["8,500,000 Rubles", "2 Electric drill", "8 A pack of screws"],
        loyalty: ["Prapor LL3", "Ragman LL3"]
      }
    },
    {
      id: "Sta4",
      label: "Level 4",
      title: "Stash 4",
      shape: "circularImage",
      image: imgRoot + "stash.png",
      requirements: {
        items: ["150,000 Euros"],
        loyalty: ["Peacekeeper LL3", "Ragman LL4"]
      }
    },
    {
      id: "V1",
      label: "Level 1",
      title: "Vents 1",
      shape: "circularImage",
      image: imgRoot + "vents.png",
      requirements: {
        items: ["25,000 Roubles"]
      }
    },
    {
      id: "V2",
      label: "Level 2",
      title: "Vents 2",
      shape: "circularImage",
      image: imgRoot + "vents.png",
      requirements: {
        items: ["1 Electric motor", "1 Car battery"]
      }
    },
    {
      id: "V3",
      label: "Level 3",
      title: "Vents 3",
      shape: "circularImage",
      image: imgRoot + "vents.png",
      requirements: {
        items: [
          "2 Electric motor",
          "8 Wires",
          "3 Printed circuit board",
          "3 Car battery"
        ],
        skills: ["Strength 3"]
      }
    },
    {
      id: "WC1",
      label: "Level 1",
      title: "Water Collector 1",
      shape: "circularImage",
      image: imgRoot + "water-collector.png",
      requirements: {
        items: ["4 Corrugated hose", "5 Bolts", "5 Screw nut", "3 Duct tape"]
      }
    },
    {
      id: "WC2",
      label: "Level 2",
      title: "Water Collector 2",
      shape: "circularImage",
      image: imgRoot + "water-collector.png",
      requirements: {
        items: ["6 Corrugated hose", "2 Electric motor", "2 A set of tools"],
        loyalty: ["Jaeger LL2"],
        skills: ["Attention 3"]
      }
    },
    {
      id: "WC3",
      label: "Level 3",
      title: "Water Collector 3",
      shape: "circularImage",
      image: imgRoot + "water-collector.png",
      requirements: {
        items: [
          "125,000 Roubles",
          "2 Elite pliers",
          "5 Shustrilo sealing foam"
        ],
        loyalty: ["Jaeger LL3"]
      }
    },
    {
      id: "W1",
      label: "Level 1",
      title: "Workbench 1",
      shape: "circularImage",
      image: imgRoot + "workbench.png",
      requirements: {
        items: ["2 Screw nuts", "2 Bolts", "1 Leatherman multitool"]
      }
    },
    {
      id: "W2",
      label: "Level 2",
      title: "Workbench 2",
      shape: "circularImage",
      image: imgRoot + "workbench.png",
      requirements: {
        items: ["3 A set of tools", "2 Electric drill", "6 Bolts"],
        loyalty: ["Mechanic LL2"]
      }
    },
    {
      id: "W3",
      label: "Level 3",
      title: "Workbench 3",
      shape: "circularImage",
      image: imgRoot + "workbench.png",
      requirements: {
        items: ["195,000 Roubles", "2 Elite pliers", "1 FireKlean gun lube"],
        loyalty: ["Mechanic LL3"]
      }
    }
  ],
  directUpgrades: [
    {
      from: "W1",
      to: "W2",
      arrows: "to"
    },
    {
      from: "W2",
      to: "W3",
      arrows: "to"
    },
    {
      from: "WC1",
      to: "WC2",
      arrows: "to"
    },
    {
      from: "WC2",
      to: "WC3",
      arrows: "to"
    },
    {
      from: "V1",
      to: "V2",
      arrows: "to"
    },
    {
      from: "V2",
      to: "V3",
      arrows: "to"
    },
    {
      from: "Sta1",
      to: "Sta2",
      arrows: "to"
    },
    {
      from: "Sta2",
      to: "Sta3",
      arrows: "to"
    },
    {
      from: "Sta3",
      to: "Sta4",
      arrows: "to"
    },
    {
      from: "Sec1",
      to: "Sec2",
      arrows: "to"
    },
    {
      from: "Sec2",
      to: "Sec3",
      arrows: "to"
    },
    {
      from: "RS1",
      to: "RS2",
      arrows: "to"
    },
    {
      from: "RS2",
      to: "RS3",
      arrows: "to"
    },
    {
      from: "NU1",
      to: "NU2",
      arrows: "to"
    },
    {
      from: "NU2",
      to: "NU3",
      arrows: "to"
    },
    {
      from: "M1",
      to: "M2",
      arrows: "to"
    },
    {
      from: "M2",
      to: "M3",
      arrows: "to"
    },
    {
      from: "L1",
      to: "L2",
      arrows: "to"
    },
    {
      from: "L2",
      to: "L3",
      arrows: "to"
    },
    {
      from: "IC1",
      to: "IC2",
      arrows: "to"
    },
    {
      from: "IC2",
      to: "IC3",
      arrows: "to"
    },
    {
      from: "I1",
      to: "I2",
      arrows: "to"
    },
    {
      from: "I2",
      to: "I3",
      arrows: "to"
    },
    {
      from: "H1",
      to: "H2",
      arrows: "to"
    },
    {
      from: "H2",
      to: "H3",
      arrows: "to"
    },
    {
      from: "G1",
      to: "G2",
      arrows: "to"
    },
    {
      from: "G2",
      to: "G3",
      arrows: "to"
    },
    {
      from: "BF1",
      to: "BF2",
      arrows: "to"
    },
    {
      from: "BF2",
      to: "BF3",
      arrows: "to"
    }
  ],
  stationRequirements: [
    {
      from: "G3",
      to: "AFU1",
      arrows: "to"
    },
    {
      from: "V3",
      to: "AFU1",
      arrows: "to"
    },
    {
      from: "IC2",
      to: "BF1",
      arrows: "to"
    },
    {
      from: "G3",
      to: "BF2",
      arrows: "to"
    },
    {
      from: "SP1",
      to: "BF3",
      arrows: "to"
    },
    {
      from: "WC3",
      to: "BF3",
      arrows: "to"
    },
    {
      from: "WC3",
      to: "BG1",
      arrows: "to"
    },
    {
      from: "NU3",
      to: "BG1",
      arrows: "to"
    },
    {
      from: "Sec2",
      to: "G2",
      arrows: "to"
    },
    {
      from: "V2",
      to: "G2",
      arrows: "to"
    },
    {
      from: "Sec3",
      to: "G3",
      arrows: "to"
    },
    {
      from: "V3",
      to: "G3",
      arrows: "to"
    },
    {
      from: "W2",
      to: "H3",
      arrows: "to"
    },
    {
      from: "G2",
      to: "H3",
      arrows: "to"
    },
    {
      from: "G1",
      to: "I2",
      arrows: "to"
    },
    {
      from: "G2",
      to: "I3",
      arrows: "to"
    },
    {
      from: "Sec2",
      to: "IC1",
      arrows: "to"
    },
    {
      from: "V2",
      to: "IC1",
      arrows: "to"
    },
    {
      from: "Sec3",
      to: "IC2",
      arrows: "to"
    },
    {
      from: "M3",
      to: "IC2",
      arrows: "to"
    },
    {
      from: "NU3",
      to: "IC2",
      arrows: "to"
    },
    {
      from: "G3",
      to: "IC3",
      arrows: "to"
    },
    {
      from: "WC1",
      to: "L2",
      arrows: "to"
    },
    {
      from: "WC2",
      to: "L3",
      arrows: "to"
    },
    {
      from: "RS3",
      to: "LIB1",
      arrows: "to"
    },
    {
      from: "G1",
      to: "NU1",
      arrows: "to"
    },
    {
      from: "L2",
      to: "NU2",
      arrows: "to"
    },
    {
      from: "G2",
      to: "NU3",
      arrows: "to"
    },
    {
      from: "L3",
      to: "NU3",
      arrows: "to"
    },
    {
      from: "Sta2",
      to: "NU3",
      arrows: "to"
    },
    {
      from: "G2",
      to: "RS2",
      arrows: "to"
    },
    {
      from: "H2",
      to: "RS2",
      arrows: "to"
    },
    {
      from: "H3",
      to: "RS3",
      arrows: "to"
    },
    {
      from: "G3",
      to: "RS3",
      arrows: "to"
    },
    {
      from: "IC2",
      to: "SC1",
      arrows: "to"
    },
    {
      from: "I3",
      to: "Sec3",
      arrows: "to"
    },
    {
      from: "I2",
      to: "SR1",
      arrows: "to"
    },
    {
      from: "G3",
      to: "SP1",
      arrows: "to"
    },
    {
      from: "W3",
      to: "SP1",
      arrows: "to"
    },
    {
      from: "H2",
      to: "Sta2",
      arrows: "to"
    },
    {
      from: "V2",
      to: "Sta3",
      arrows: "to"
    },
    {
      from: "G3",
      to: "Sta4",
      arrows: "to"
    },
    {
      from: "W3",
      to: "Sta4",
      arrows: "to"
    },
    {
      from: "H3",
      to: "Sta4",
      arrows: "to"
    },
    {
      from: "IC3",
      to: "Sta4",
      arrows: "to"
    },
    {
      from: "G2",
      to: "V3",
      arrows: "to"
    },
    {
      from: "W2",
      to: "WC2",
      arrows: "to"
    },
    {
      from: "G3",
      to: "WC3",
      arrows: "to"
    },
    {
      from: "I2",
      to: "W2",
      arrows: "to"
    },
    {
      from: "Sta2",
      to: "W3",
      arrows: "to"
    }
  ]
};

// create an array with nodes
var nodes = new vis.DataSet(jsonData["stations"]);

// ex: Stash 1 -> Stash 2
var directUpgrades = jsonData["directUpgrades"];
// ex: Workshop req. for Intel Center
var requirements = jsonData["stationRequirements"];
// combined = all edges
var combined = directUpgrades.concat(requirements);

// create an array with edges
var edges = new vis.DataSet(combined);

// create a network
var container = document.getElementById("hideout-network");
var data = {
  nodes: nodes,
  edges: edges
};

var options = {
  interaction: {
    hover: true,
    navigationButtons: false,
    keyboard: true
  },
  nodes: {
    borderWidth: 2,
    color: {
      border: colorGold,
      background: colorBlack
    },
    font: { color: "#eeeeee" },
    chosen: { node: hoverChosenNode }
  },
  edges: {
    color: {
      color: colorGold,
      opacity: 0.33
    },
    width: 1,
    chosen: { edge: hoverChosenEdge },
    smooth: { enabled: true }
  },
  manipulation: {
    enabled: false
  },
  layout: {
    hierarchical: {
      sortMethod: "directed",
      shakeTowards: "roots",
      nodeSpacing: 350
    }
  },
  autoResize: true
};

var network = new vis.Network(container, data, options);

function shouldShowAllAncestors() {
  var checkbox = document.getElementById("shouldShowAllAncestors");
  return checkbox.checked;
}

// get all the ancestors of the node (so we can highlight, etc)
function hoverAllAncestors(nodeId) {
    var parent = network.body.nodes[nodeId];
    var parentId = parent.id;
    parent.edges.forEach(edge => {
        if (edge.toId == parentId) {
          // we have the edge and the from node, so highlight them
          var child = edge.from;
          edge.hover = true;
          child.hover = true;
          // do this recursively
          return hoverAllAncestors(child.id);
        }
    });
    return parent;
}

// remove the hover state from everything
function unHoverNodesAndEdges() {
  for (const nodeId in network.body.nodes) {
    network.body.nodes[nodeId].hover = false;
  };
  for (const edgeId in network.body.edges) {
    network.body.edges[edgeId].hover = false;
  };
}

// Format the non-station requirements into HTML
function formatRequirements(requirementsObject) {
  var output = "<div>";
  output += "<h3>Items</h3>";
  if (requirementsObject.items && requirementsObject.items.length > 0) {
    output += "<ul>";
    requirementsObject.items.forEach(item => {
      var wikiFormattedText = item
        .replace(/[0-9,]+/, "")
        .trim()
        .replace(/\W/g, "_"); // remove quantities and use _
      var itemLinkHtml =
        '<a href="https://escapefromtarkov.gamepedia.com/' +
        wikiFormattedText +
        '">' +
        item +
        "</a>";
      output += "<li>" + itemLinkHtml + "</li>";
    });
    output += "</ul>";
  } else {
    output += "<p>No item requirements!</p>";
  }
  output += "<h3>Loyalty</h3>";
  if (requirementsObject.loyalty && requirementsObject.loyalty.length > 0) {
    output += "<ul>";
    requirementsObject.loyalty.forEach(vendor => {
      var wikiFormattedText = vendor.trim().split(" ")[0]; // pulls out the "Prapor" in "Prapor LL2"
      var vendorLinkHtml =
        '<a href="https://escapefromtarkov.gamepedia.com/' +
        wikiFormattedText +
        '">' +
        vendor +
        "</a>";
      output += "<li>" + vendorLinkHtml + "</li>";
    });
    output += "</ul>";
  } else {
    output += "<p>No vendor loyalty requirements!</p>";
  }
  output += "<h3>Skills</h3>";
  if (requirementsObject.skills && requirementsObject.skills.length > 0) {
    output += "<ul>";
    requirementsObject.skills.forEach(skill => {
      var wikiFormattedText = skill
        .replace(/[0-9,]+/, "")
        .trim()
        .replace(/\W/g, "_"); // Skills should not have spaces
      var skillLinkHtml =
        '<a href="https://escapefromtarkov.gamepedia.com/' +
        wikiFormattedText +
        '">' +
        skill +
        "</a>";
      output += "<li>" + skillLinkHtml + "</li>";
    });
    output += "</ul>";
  } else {
    output += "<p>No skill requirements!</p>";
  }
  return output + "</div>";
}

// highlight on click
network.on("click", function(params) {
  if (params.nodes && params.nodes.length > 0) {
    var selectedNodeId = params.nodes[0];
    var node = network.body.nodes[selectedNodeId];
    if (shouldShowAllAncestors()) {
      // un-hover all other nodes, or we'll just light everything up
      unHoverNodesAndEdges();
      // highlight all ancestor nodes recursively
      hoverAllAncestors(node.id);
    }
    var infoBoxHtml = "<h2>" + node.options.title + "</h2>";
    infoBoxHtml += "\n" + formatRequirements(node.options.requirements);
    infoBox.innerHTML = infoBoxHtml;
  }
});

// Since scaling isn't working on Chrome, in place of a fixed size
network.once("beforeDrawing", () => {
  container.style.height = "85vh";
});

// brief animation to show off interactivity
network.once("afterDrawing", function() {
  network.fit({
    animation: {
      duration: 300,
      easingFunction: "linear"
    }
  });
});

// show or hide the roadmap
function toggleRoadmap() {
  var rm = document.getElementById("roadmap");
  console.log(rm.style.display);
  if (!rm.style.display || rm.style.display === "none") {
    rm.style.display = "table";
  } else {
    rm.style.display = "none";
  }
}