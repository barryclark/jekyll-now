// locations
var imgRoot = "./img/";

var stations_ru_RU = [
    {
        id: "AFU1",
        label: "Air Filtering Unit",
        title: "Air Filtering Unit",
        shape: "circularImage",
        image: imgRoot + "air-filtration-unit.png",
        requirements: {
            items: [[10000, "Доллары"]],
            loyalty: [["Лыжник", "LL3"]]
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
                [10, "Процессорный кулер"],
                [5, "Блок питания"],
                [5, "Силовой кабель"],
                [1, "Электродрель"]
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
                [15, "Процессорный кулер"],
                [5, "Блок питания"],
                [5, "Печатная плата"],
                [2, "Реле контроля фаз"]
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
                [25, "Процессорный кулер"],
                [10, "Силиконовая трубка"],
                [1, "Электродвигатель"],
                [2, "Датчик давления"]
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
                [4, "Силиконовая трубка"],
                [2, "Аналоговый термометр"],
                [2, "Датчик давления"],
                [5, "Гофрированный шланг"]
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
            items: [[100000, "Рубли"]]
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
                [5, "Реле контроля фаз"],
                [1, "Электродвигатель"],
                [15, "Пучок проводов"]
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
                [6, "Реле контроля фаз"],
                [2, "Электродвигатель"],
                [5, "Свеча зажигания"],
                [5, "Блок питания"]
            ],
            loyalty: [["Механик", "LL3"]]
        }
    },
    {
        id: "H1",
        label: "Level 1",
        title: "Heater 1",
        shape: "circularImage",
        image: imgRoot + "heating.png",
        requirements: {
            items: [[25000, "Рубли"]]
        }
    },
    {
        id: "H2",
        label: "Level 2",
        title: "Heating 2",
        shape: "circularImage",
        image: imgRoot + "heating.png",
        requirements: {
            items: [[50000, "Рубли"]],
            skills: [["Выносливость", 2]]
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
                [8, "Спираль накаливания"],
                [8, "Пучок проводов"]
            ],
            loyalty: [["Барахольщик", "LL2"]]
        }
    },
    {
        id: "I1",
        label: "Level 1",
        title: "Illumination 1",
        shape: "circularImage",
        image: imgRoot + "illumination.png",
        requirements: {
            items: [[10000, "Рубли"]]
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
                [14, "Лампа накаливания"],
                [5, "Пучок проводов"]
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
                [50000, "Рубли"],
                [7, "Конденсаторы"]
            ],
            loyalty: [["Механик", "LL2"]]
        }
    },
    {
        id: "IC1",
        label: "Level 1",
        title: "Intel Center 1",
        shape: "circularImage",
        image: imgRoot + "intelligence-center.png",
        requirements: {
            items: [[1, "Папка с разведданными"]]
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
                [3, "Папка с разведданными"],
                [3, "Защищенный флеш-накопитель"],
                [4, "Силовой кабель"],
                [4, "Поврежденный жесткий диск"]
            ],
            loyalty: [["Механик", "LL2"]],
            skills: [["Внимательность", 3]]
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
                [2, "Военный COFDM беспроводной передатчик сигналов"],
                [2, "Твердотельный накопитель VPX"],
                [3, "Газоанализатор"],
                [4, "Военный кабель"]
            ],
            loyalty: [["Прапор", "LL3"]]
        }
    },
    {
        id: "L1",
        label: "Level 1",
        title: "Lavatory 1",
        shape: "circularImage",
        image: imgRoot + "lavatory.png",
        requirements: {
            items: [[2000, "Рубли"]]
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
                [3, "Гофрированный шлангs"],
                [5, "Пакет саморезов"],
                [1, "Электродрель"]
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
                [6, "Гофрированный шлангs"],
                [2, "Датчик давления"],
                [1, "Набор инструментов"],
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
            items: [[400000, "Рубли"]],
            skills: [["Память", 8]]
        }
    },
    {
        id: "M1",
        label: "Level 1",
        title: "Medstation 1",
        shape: "circularImage",
        image: imgRoot + "medstation.png",
        requirements: {
            items: [[25000, "Рубли"]]
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
                [50000, "Рубли"],
                [1, "Набор для переливания крови"],
                [3, "Бутылка физраствора"]
            ],
            loyalty: [["Терапист", "LL2"]],
            skills: [["Здоровье", 2]]
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
                [150000, "Рубли"],
                [5, "Бутылка физраствора"],
                [1, "Светодиодный трансиллюминатор кожи LEDX"]
            ],
            loyalty: [
                ["Терапист", "LL3"],
                ["Лыжник", "LL2"]
            ],
            skills: [["Жизнеспособность", 3]]
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
                [25000, "Рубли"],
                [2, "Реле контроля фаз"]
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
                [4, "Гаечный ключ"],
                [2, "Гофрированный шланг"],
                [2, "Щелочь"],
                [1, "Реле контроля фаз"]
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
                [125000, "Рубли"],
                [3, "Банка кофе Majaica"],
                [3, "Пачка соды"]
            ],
            skills: [["Метаболизм", 3]]
        }
    },
    {
        id: "RS1",
        label: "Level 1",
        title: "Rest Space 1",
        shape: "circularImage",
        image: imgRoot + "rest-space.png",
        requirements: {
            items: [[10000, "Рубли"]]
        }
    },
    {
        id: "RS2",
        label: "Level 2",
        title: "Rest Space 2",
        shape: "circularImage",
        image: imgRoot + "rest-space.png",
        requirements: {
            items: [[35000, "Рубли"]],
            loyalty: [["Барахольщик", "LL2"]]
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
                [3000, "Доллары"],
                [4, "Силовой кабель"],
                [5, "Конденсаторы"],
                [7, "Пучок проводов"]
            ],
            loyalty: [["Лыжник", "LL3"]]
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
                [2, "Бронзовый лев"],
                [2, "Золотое кольцо с черепом"],
                [6, "Золотая цепочка"],
                [3, "Золотые часы Roler Submariner"]
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
            items: [[20000, "Рубли"]]
        }
    },
    {
        id: "Sec2",
        label: "Level 2",
        title: "Security 2",
        shape: "circularImage",
        image: imgRoot + "security.png",
        requirements: {
            items: [[45000, "Рубли"]],
            skills: [["Выносливость", 2]]
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
                [2, "Рабочий LCD дисплей"],
                [4, "Пучок проводов"],
                [8, "Объектив NIXXOR"],
                [1, "SSD диск"]
            ],
            loyalty: [["Механик", "LL2"]]
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
                [4, "Пачка гвоздей"],
                [5, "Гайки"],
                [5, "Болты"],
                [3, "Монтажный скотч"]
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
                [15000, "Евро"],
                [4, "Военный кабель"],
                [2, "Элемент фазированной решетки РЛС"],
                [4, "Военный фильтр питания"]
            ],
            loyalty: [["Миротворец", "LL4"]]
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
                [3500000, "Рубли"],
                [1, "Ручная дрель"],
                [7, "Пакет саморезов"],
                [4, "WD-40 100мл"]
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
                [8500000, "Рубли"],
                [2, "Электродрель"],
                [8, "Пакет саморезов"]
            ],
            loyalty: [
                ["Прапор", "LL3"],
                ["Барахольщик", "LL3"]
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
            items: [[150000, "Евро"]],
            loyalty: [
                ["Миротворец", "LL3"],
                ["Барахольщик", "LL4"]
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
            items: [[25000, "Рубли"]]
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
                [1, "Электродвигатель"],
                [1, "Автомобильный аккумулятор"]
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
                [2, "Электродвигатель"],
                [8, "Пучок проводов"],
                [3, "Печатная плата"],
                [3, "Автомобильный аккумулятор"]
            ],
            skills: [["Сила", 3]]
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
                [4, "Гофрированный шланг"],
                [5, "Болты"],
                [5, "Гайки"],
                [3, "Монтажный скотч"]
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
                [6, "Гофрированный шланг"],
                [2, "Электродвигатель"],
                [2, "Набор инструментов"]
            ],
            loyalty: [["Егерь", "LL2"]],
            skills: [["Внимательность", 3]]
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
                [125000, "Рубли"],
                [2, "Плоскогубцы Elite"],
                [5, "Монтажная пена Shustrilo"]
            ],
            loyalty: [["Егерь", "LL3"]]
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
                [2, "Гайкиs"],
                [2, "Болты"],
                [1, "Мультитул Leatherman"]
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
                [3, "Набор инструментов"],
                [2, "Электродрель"],
                [6, "Болты"]
            ],
            loyalty: [["Механик", "LL2"]]
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
                [195000, "Рубли"],
                [2, "Плоскогубцы Elite"],
                [1, "Оружейная смазка #FireKlean"]
            ],
            loyalty: [["Механик", "LL3"]]
        }
    }
];
