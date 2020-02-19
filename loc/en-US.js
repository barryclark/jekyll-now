// locations
var imgRoot = "./img/";

var stations_en_US = [
    {
        id: "AFU1",
        label: "Air Filtering Unit",
        title: "Air Filtering Unit",
        shape: "circularImage",
        image: imgRoot + "air-filtration-unit.png",
        requirements: {
            items: [[10000, "Dollars"]],
            loyalty: [["Skier", "LL3"]]
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
                [10, "CPU fan"],
                [5, "Power supply unit"],
                [5, "Powercord"],
                [1, "Electric drill"]
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
                [15, "CPU fan"],
                [5, "Power supply unit"],
                [5, "Printed circuit board"],
                [2, "Phase control relay"]
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
                [25, "CPU fan"],
                [10, "Silicone tube"],
                [1, "Electric motor"],
                [2, "Pressure gauge"]
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
                [4, "Silicone tube"],
                [2, "Analog thermometer"],
                [2, "Pressure gauge"],
                [5, "Corrugated hose"]
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
            items: [[100000, "Roubles"]]
        }
    },
    {
        id: "G2",
        label: "Level 2",
        title: "Generator 2",
        shape: "circularImage",
        image: imgRoot + "generator.png",
        requirements: {
            items: [
                [5, "Phase control relay"],
                [1, "Electric motor"],
                [15, "Wires"]
            ]
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
                [6, "Phase control relay"],
                [2, "Electric motor"],
                [5, "Spark plug"],
                [5, "Power supply unit"]
            ],
            loyalty: [["Mechanic", "LL3"]]
        }
    },
    {
        id: "H1",
        label: "Level 1",
        title: "Heater 1",
        shape: "circularImage",
        image: imgRoot + "heating.png",
        requirements: {
            items: [[25000, "Roubles"]]
        }
    },
    {
        id: "H2",
        label: "Level 2",
        title: "Heating 2",
        shape: "circularImage",
        image: imgRoot + "heating.png",
        requirements: {
            items: [[50000, "Roubles"]],
            skills: [["Endurance", 2]]
        }
    },
    {
        id: "H3",
        label: "Level 3",
        title: "Heating 3",
        shape: "circularImage",
        image: imgRoot + "heating.png",
        requirements: {
            items: [
                [8, "Radiator helix"],
                [8, "Wires"]
            ],
            loyalty: [["Ragman", "LL2"]]
        }
    },
    {
        id: "I1",
        label: "Level 1",
        title: "Illumination 1",
        shape: "circularImage",
        image: imgRoot + "illumination.png",
        requirements: {
            items: [[10000, "Roubles"]]
        }
    },
    {
        id: "I2",
        label: "Level 2",
        title: "Illumination 2",
        shape: "circularImage",
        image: imgRoot + "illumination.png",
        requirements: {
            items: [
                [14, "Light bulb"],
                [5, "Wires"]
            ]
        }
    },
    {
        id: "I3",
        label: "Level 3",
        title: "Illumination 3",
        shape: "circularImage",
        image: imgRoot + "illumination.png",
        requirements: {
            items: [
                [50000, "Roubles"],
                [7, "Capacitors"]
            ],
            loyalty: [["Mechanic", "LL2"]]
        }
    },
    {
        id: "IC1",
        label: "Level 1",
        title: "Intel Center 1",
        shape: "circularImage",
        image: imgRoot + "intelligence-center.png",
        requirements: {
            items: [[1, "Folder with intelligence"]]
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
                [3, "Folder with intelligence"],
                [3, "Secure flash drive"],
                [4, "Powercord"],
                [4, "Damaged hard drive"]
            ],
            loyalty: [["Mechanic", "LL2"]],
            skills: [["Attention", 3]]
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
                [2, "Military COFDM"],
                [2, "VPX Flash storage module"],
                [3, "Gas analyzer"],
                [4, "Military cable"]
            ],
            loyalty: [["Prapor", "LL3"]]
        }
    },
    {
        id: "L1",
        label: "Level 1",
        title: "Lavatory 1",
        shape: "circularImage",
        image: imgRoot + "lavatory.png",
        requirements: {
            items: [[2000, "Roubles"]]
        }
    },
    {
        id: "L2",
        label: "Level 2",
        title: "Lavatory 2",
        shape: "circularImage",
        image: imgRoot + "lavatory.png",
        requirements: {
            items: [
                [3, "Corrugated hoses"],
                [5, "A pack of screws"],
                [1, "Electric drill"]
            ]
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
                [6, "Corrugated hoses"],
                [2, "Pressure gauge"],
                [1, "A set of tools"],
                [3, "Xenomorph sealing foam"]
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
            items: [[400000, "Roubles"]],
            skills: [["Memory", 8]]
        }
    },
    {
        id: "M1",
        label: "Level 1",
        title: "Medstation 1",
        shape: "circularImage",
        image: imgRoot + "medstation.png",
        requirements: {
            items: [[25000, "Roubles"]]
        }
    },
    {
        id: "M2",
        label: "Level 2",
        title: "Medstation 2",
        shape: "circularImage",
        image: imgRoot + "medstation.png",
        requirements: {
            items: [
                [50000, "Roubles"],
                [1, "Medical bloodset"],
                [3, "Saline solution"]
            ],
            loyalty: [["Therapist", "LL2"]],
            skills: [["Health", 2]]
        }
    },
    {
        id: "M3",
        label: "Level 3",
        title: "Medstation 3",
        shape: "circularImage",
        image: imgRoot + "medstation.png",
        requirements: {
            items: [
                [150000, "Roubles"],
                [5, "Saline solution"],
                [1, "LEDX"]
            ],
            loyalty: [
                ["Therapist", "LL3"],
                ["Skier", "LL2"]
            ],
            skills: [["Vitality", 3]]
        }
    },
    {
        id: "NU1",
        label: "Level 1",
        title: "Nutrition Unit 1",
        shape: "circularImage",
        image: imgRoot + "nutrition-unit.png",
        requirements: {
            items: [
                [25000, "Roubles"],
                [2, "Phase control relay"]
            ]
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
                [4, "Wrench"],
                [2, "Corrugated hose"],
                [2, "Heat-exchange alkali"],
                [1, "Phase control relay"]
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
            items: [
                [125000, "Roubles"],
                [3, "Coffee Majaica"],
                [3, "Sodium bicarbonate"]
            ],
            skills: [["Metabolism", 3]]
        }
    },
    {
        id: "RS1",
        label: "Level 1",
        title: "Rest Space 1",
        shape: "circularImage",
        image: imgRoot + "rest-space.png",
        requirements: {
            items: [[10000, "Roubles"]]
        }
    },
    {
        id: "RS2",
        label: "Level 2",
        title: "Rest Space 2",
        shape: "circularImage",
        image: imgRoot + "rest-space.png",
        requirements: {
            items: [[35000, "Roubles"]],
            loyalty: [["Ragman", "LL2"]]
        }
    },
    {
        id: "RS3",
        label: "Level 3",
        title: "Rest Space 3",
        shape: "circularImage",
        image: imgRoot + "rest-space.png",
        requirements: {
            items: [
                [3000, "Dollars"],
                [4, "Powercord"],
                [5, "Capacitor"],
                [7, "Wires"]
            ],
            loyalty: [["Skier", "LL3"]]
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
                [2, "Bronze lion"],
                [2, "Gold skull ring"],
                [6, "Golden neck chain"],
                [3, "Roler"]
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
            items: [[20000, "Roubles"]]
        }
    },
    {
        id: "Sec2",
        label: "Level 2",
        title: "Security 2",
        shape: "circularImage",
        image: imgRoot + "security.png",
        requirements: {
            items: [[45000, "Roubles"]],
            skills: [["Endurance", 2]]
        }
    },
    {
        id: "Sec3",
        label: "Level 3",
        title: "Security 3",
        shape: "circularImage",
        image: imgRoot + "security.png",
        requirements: {
            items: [
                [2, "Working LCD"],
                [4, "Wires"],
                [8, "NIXXOR lens"],
                [1, "SSD drive"]
            ],
            loyalty: [["Mechanic", "LL2"]]
        }
    },
    {
        id: "SR1",
        label: "Range",
        title: "Shooting Range",
        shape: "circularImage",
        image: imgRoot + "shooting-range.png",
        requirements: {
            items: [
                [4, "A pack of nails"],
                [5, "Screw nut"],
                [5, "Bolts"],
                [3, "Duct tape"]
            ]
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
                [15000, "Euros"],
                [4, "Military cable"],
                [2, "Phased array element"],
                [4, "Military power filter"]
            ],
            loyalty: [["Peacekeeper", "LL4"]]
        }
    },
    {
        id: "Sta1",
        label: "Level 1",
        title: "Stash 1",
        shape: "circularImage",
        image: imgRoot + "stash.png",
        requirements: {}
    },
    {
        id: "Sta2",
        label: "Level 2",
        title: "Stash 2",
        shape: "circularImage",
        image: imgRoot + "stash.png",
        requirements: {
            items: [
                [3500000, "Roubles"],
                [1, "Handdrill"],
                [7, "A pack of screws"],
                [4, "WD-40 100ml"]
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
            items: [
                [8500000, "Rubles"],
                [2, "Electric drill"],
                [8, "A pack of screws"]
            ],
            loyalty: [
                ["Prapor", "LL3"],
                ["Ragman", "LL3"]
            ]
        }
    },
    {
        id: "Sta4",
        label: "Level 4",
        title: "Stash 4",
        shape: "circularImage",
        image: imgRoot + "stash.png",
        requirements: {
            items: [[150000, "Euros"]],
            loyalty: [
                ["Peacekeeper", "LL3"],
                ["Ragman", "LL4"]
            ]
        }
    },
    {
        id: "V1",
        label: "Level 1",
        title: "Vents 1",
        shape: "circularImage",
        image: imgRoot + "vents.png",
        requirements: {
            items: [[25000, "Roubles"]]
        }
    },
    {
        id: "V2",
        label: "Level 2",
        title: "Vents 2",
        shape: "circularImage",
        image: imgRoot + "vents.png",
        requirements: {
            items: [
                [1, "Electric motor"],
                [1, "Car battery"]
            ]
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
                [2, "Electric motor"],
                [8, "Wires"],
                [3, "Printed circuit board"],
                [3, "Car battery"]
            ],
            skills: [["Strength", 3]]
        }
    },
    {
        id: "WC1",
        label: "Level 1",
        title: "Water Collector 1",
        shape: "circularImage",
        image: imgRoot + "water-collector.png",
        requirements: {
            items: [
                [4, "Corrugated hose"],
                [5, "Bolts"],
                [5, "Screw nut"],
                [3, "Duct tape"]
            ]
        }
    },
    {
        id: "WC2",
        label: "Level 2",
        title: "Water Collector 2",
        shape: "circularImage",
        image: imgRoot + "water-collector.png",
        requirements: {
            items: [
                [6, "Corrugated hose"],
                [2, "Electric motor"],
                [2, "A set of tools"]
            ],
            loyalty: [["Jaeger", "LL2"]],
            skills: [["Attention", 3]]
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
                [125000, "Roubles"],
                [2, "Elite pliers"],
                [5, "Shustrilo sealing foam"]
            ],
            loyalty: [["Jaeger", "LL3"]]
        }
    },
    {
        id: "W1",
        label: "Level 1",
        title: "Workbench 1",
        shape: "circularImage",
        image: imgRoot + "workbench.png",
        requirements: {
            items: [
                [2, "Screw nuts"],
                [2, "Bolts"],
                [1, "Leatherman multitool"]
            ]
        }
    },
    {
        id: "W2",
        label: "Level 2",
        title: "Workbench 2",
        shape: "circularImage",
        image: imgRoot + "workbench.png",
        requirements: {
            items: [
                [3, "A set of tools"],
                [2, "Electric drill"],
                [6, "Bolts"]
            ],
            loyalty: [["Mechanic", "LL2"]]
        }
    },
    {
        id: "W3",
        label: "Level 3",
        title: "Workbench 3",
        shape: "circularImage",
        image: imgRoot + "workbench.png",
        requirements: {
            items: [
                [195000, "Roubles"],
                [2, "Elite pliers"],
                [1, "FireKlean gun lube"]
            ],
            loyalty: [["Mechanic", "LL3"]]
        }
    }
];
