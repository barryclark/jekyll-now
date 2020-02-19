// locations
var imgRoot = "./img/";

var stations_ru_RU = [
    {
        id: "AFU1",
        label: "Воздушный фильтратор",
        title: "Воздушный фильтратор",
        shape: "circularImage",
        image: imgRoot + "air-filtration-unit.png",
        requirements: {
            items: [[10000, "Доллары"]],
            loyalty: [["Лыжник", "LL3"]]
        }
    },
    {
        id: "BF1",
        label: "Уровень 1",
        title: "Биткоин ферма 1",
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
        label: "Уровень 2",
        title: "Биткоин ферма 2",
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
        label: "Уровень 3",
        title: "Биткоин ферма 3",
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
        label: "Уровень 1",
        title: "Самогонный аппарат",
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
        label: "Уровень 1",
        title: "Генератор 1",
        shape: "circularImage",
        image: imgRoot + "generator.png",
        y: -50,
        requirements: {
            items: [[100000, "Рубли"]]
        }
    },
    {
        id: "G2",
        label: "Уровень 2",
        title: "Генератор 2",
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
        label: "Уровень 3",
        title: "Генератор 3",
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
        label: "Уровень 1",
        title: "Обогрев 1",
        shape: "circularImage",
        image: imgRoot + "heating.png",
        requirements: {
            items: [[25000, "Рубли"]]
        }
    },
    {
        id: "H2",
        label: "Уровень 2",
        title: "Обогрев 2",
        shape: "circularImage",
        image: imgRoot + "heating.png",
        requirements: {
            items: [[50000, "Рубли"]],
            skills: [["Выносливость", 2]]
        }
    },
    {
        id: "H3",
        label: "Уровень 3",
        title: "Обогрев 3",
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
        label: "Уровень 1",
        title: "Освещение 1",
        shape: "circularImage",
        image: imgRoot + "illumination.png",
        requirements: {
            items: [[10000, "Рубли"]]
        }
    },
    {
        id: "I2",
        label: "Уровень 2",
        title: "Освещение 2",
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
        label: "Уровень 3",
        title: "Освещение 3",
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
        label: "Уровень 1",
        title: "Разведцентр 1",
        shape: "circularImage",
        image: imgRoot + "intelligence-center.png",
        requirements: {
            items: [[1, "Папка с разведданными"]]
        }
    },
    {
        id: "IC2",
        label: "Уровень 2",
        title: "Разведцентр 2",
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
        label: "Уровень 3",
        title: "Разведцентр 3",
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
        label: "Уровень 1",
        title: "Санузел 1",
        shape: "circularImage",
        image: imgRoot + "lavatory.png",
        requirements: {
            items: [[2000, "Рубли"]]
        }
    },
    {
        id: "L2",
        label: "Уровень 2",
        title: "Санузел 2",
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
        label: "Уровень 3",
        title: "Санузел 3",
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
        label: "Библиотека",
        title: "Библиотека",
        shape: "circularImage",
        image: imgRoot + "library.png",
        requirements: {
            items: [[400000, "Рубли"]],
            skills: [["Память", 8]]
        }
    },
    {
        id: "M1",
        label: "Уровень 1",
        title: "Медблок 1",
        shape: "circularImage",
        image: imgRoot + "medstation.png",
        requirements: {
            items: [[25000, "Рубли"]]
        }
    },
    {
        id: "M2",
        label: "Уровень 2",
        title: "Медблок 2",
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
        label: "Уровень 3",
        title: "Медблок 3",
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
        label: "Уровень 1",
        title: "Пищеблок 1",
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
        label: "Уровень 2",
        title: "Пищеблок 2",
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
        label: "Уровень 3",
        title: "Пищеблок 3",
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
        label: "Уровень 1",
        title: "Зона отдыха 1",
        shape: "circularImage",
        image: imgRoot + "rest-space.png",
        requirements: {
            items: [[10000, "Рубли"]]
        }
    },
    {
        id: "RS2",
        label: "Уровень 2",
        title: "Зона отдыха 2",
        shape: "circularImage",
        image: imgRoot + "rest-space.png",
        requirements: {
            items: [[35000, "Рубли"]],
            loyalty: [["Барахольщик", "LL2"]]
        }
    },
    {
        id: "RS3",
        label: "Уровень 3",
        title: "Зона отдыха 3",
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
        label: "Ящик диких",
        title: "Ящик диких",
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
        label: "Уровень 1",
        title: "Безопасность 1",
        shape: "circularImage",
        image: imgRoot + "security.png",
        requirements: {
            items: [[20000, "Рубли"]]
        }
    },
    {
        id: "Sec2",
        label: "Уровень 2",
        title: "Безопасность 2",
        shape: "circularImage",
        image: imgRoot + "security.png",
        requirements: {
            items: [[45000, "Рубли"]],
            skills: [["Выносливость", 2]]
        }
    },
    {
        id: "Sec3",
        label: "Уровень 3",
        title: "Безопасность 3",
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
        label: "Тир",
        title: "Тир",
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
        label: "Солнечная батарея",
        title: "Солнечная батарея",
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
        label: "Уровень 1",
        title: "Склад 1",
        shape: "circularImage",
        image: imgRoot + "stash.png",
        requirements: {}
    },
    {
        id: "Sta2",
        label: "Уровень 2",
        title: "Склад 2",
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
        label: "Уровень 3",
        title: "Склад 3",
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
        label: "Уровень 4",
        title: "Склад 4",
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
        label: "Уровень 1",
        title: "Вентиляция 1",
        shape: "circularImage",
        image: imgRoot + "vents.png",
        requirements: {
            items: [[25000, "Рубли"]]
        }
    },
    {
        id: "V2",
        label: "Уровень 2",
        title: "Вентиляция 2",
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
        label: "Уровень 3",
        title: "Вентиляция 3",
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
        label: "Уровень 1",
        title: "Водосборник 1",
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
        label: "Уровень 2",
        title: "Водосборник 2",
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
        label: "Уровень 3",
        title: "Водосборник 3",
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
        label: "Уровень 1",
        title: "Верстак 1",
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
        label: "Уровень 2",
        title: "Верстак 2",
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
        label: "Уровень 3",
        title: "Верстак 3",
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
