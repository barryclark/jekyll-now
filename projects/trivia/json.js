window.onload = init;
function init() {
	view.displayQuestionAndAnswers();
  var receivedResponses = document.getElementsByClassName("answer");
  for (var i = 0; i < receivedResponses.length; i++) {
    receivedResponses[i].onclick = controller.checkAnswer;
  }
  nextQuestion = document.getElementById("next");
  nextQuestion.onclick = controller.nextQuestion;
};


var json = 
  [{
    "question": "A flashing red traffic light signifies that a driver should do what?",
    "A": "stop",
    "B": "speed up",
    "C": "proceed with caution",
    "D": "honk the horn",
    "answer": "A"
  }, {
    "question": "A knish is traditionally stuffed with what filling?",
    "A": "potato",
    "B": "creamed corn",
    "C": "lemon custard",
    "D": "raspberry jelly",
    "answer": "A"
  }, {
    "question": "A pita is a type of what?",
    "A": "fresh fruit",
    "B": "flat bread",
    "C": "French tart",
    "D": "friend bean dip",
    "answer": "B"
  }, {
    "question": "A portrait that comically exaggerates a person's physical traits is called a what?",
    "A": "landscape",
    "B": "caricature",
    "C": "still life",
    "D": "Impressionism",
    "answer": "B"
  }, {
    "question": "A second-year college student is usually called a what?",
    "A": "sophomore",
    "B": "senior",
    "C": "freshman ",
    "D": "junior ",
    "answer": "A"
  }, {
    "question": "A student who earns a J.D. can begin his or her career as a what?",
    "A": "lawyer",
    "B": "bricklayer",
    "C": "doctor",
    "D": "accountant",
    "answer": "A"
  }, {
    "question": "A triptych is a work of art that is painted on how many panels?",
    "A": "two",
    "B": "three",
    "C": "five",
    "D": "eight",
    "answer": "B"
  }, {
    "question": "According to a famous line from the existentialist play 'No Exit' what is hell?",
    "A": "oneself",
    "B": "other people",
    "C": "little made large",
    "D": "hued in green and blue",
    "answer": "B"
  }, {
    "question": "According to a popular slogan, what state should people not 'mess with'?",
    "A": "New York",
    "B": "Texas",
    "C": "Montana",
    "D": "Rhode Island",
    "answer": "B"
  }, {
    "question": "According to a Yale University study, what smell is the most recognizable to American adults?",
    "A": "tuna",
    "B": "laundry",
    "C": "popcorn",
    "D": "coffee",
    "answer": "D"
  }, {
    "question": "According to folklore, the 'jackalope' is an antlered version of what animal?",
    "A": "chicken",
    "B": "rabbit",
    "C": "moose",
    "D": "snake",
    "answer": "B"
  }, {
    "question": "According to Greek mythology, who was Apollo's twin sister?",
    "A": "Aphrodite",
    "B": "Artemis",
    "C": "Venus",
    "D": "Athena",
    "answer": "B"
  }, {
    "question": "According to legend, if you give someone the 'evil eye' what are you doing?",
    "A": "cursing them",
    "B": "blessing a child",
    "C": "counting money",
    "D": "passing time",
    "answer": "A"
  }, {
    "question": "According to legend, in what country are you most likely to meet a leprechaun?",
    "A": "Ireland",
    "B": "Poland",
    "C": "Greenland",
    "D": "Scotland",
    "answer": "A"
  }, {
    "question": "According to the American Kennel Club, what is the most popular breed of dog in the US as of 1999?",
    "A": "Poodle",
    "B": "Beagle",
    "C": "German shepherd",
    "D": "Labrador retriever",
    "answer": "D"
  }, {
    "question": "According to the Bible, Moses and Aaron had a sister named what?",
    "A": "Jochebed",
    "B": "Ruth",
    "C": "Leah",
    "D": "Miriam",
    "answer": "D"
  }, {
    "question": "According to the children's nursery rhyme, what type of ocean did Columbus sail in 1492?",
    "A": "calm",
    "B": "blue",
    "C": "windy",
    "D": "really big",
    "answer": "B"
  }, {
    "question": "According to the Mother Goose nursery rhyme, which child is full of woe?",
    "A": "Monday's child",
    "B": "Wednesday's child",
    "C": "Thursday's child",
    "D": "Saturday's child",
    "answer": "B"
  }, {
    "question": "According to the popular saying, what should you do 'when in Rome'?",
    "A": "watch your wallet",
    "B": "see the Coliseum",
    "C": "as the Romans do",
    "D": "don't drink the water",
    "answer": "C"
  }, {
    "question": "According to the proverb, necessity is the mother of what?",
    "A": "Invention",
    "B": "Luck",
    "C": "Problems",
    "D": "Procrastination",
    "answer": "A"
  }, {
    "question": "According to the title of a popular children's TV show, what color is Bear's big house?",
    "A": "red",
    "B": "green",
    "C": "purple",
    "D": "blue",
    "answer": "D"
  }, {
    "question": "According to the USDA, which food group should you eat the most servings of per day?",
    "A": "vegetables",
    "B": "dairy",
    "C": "meats",
    "D": "breads",
    "answer": "D"
  }, {
    "question": "Ada Lovelace is credited with being the first person to have made what?",
    "A": "a computer program",
    "B": "a souffle",
    "C": "a brassiere",
    "D": "a mystery novel",
    "answer": "A"
  }, {
    "question": "After Prince Charles, who is next in line to be the king of England?",
    "A": "Prince William",
    "B": "Prince Andrew",
    "C": "Prince Edward",
    "D": "Fresh Prince",
    "answer": "A"
  }, {
    "question": "An airplane's black box is usually what color?",
    "A": "black",
    "B": "white",
    "C": "orange",
    "D": "purple",
    "answer": "C"
  }, {
    "question": "As of 1999, which state has the most Girl Scouts?",
    "A": "California",
    "B": "Illinois",
    "C": "New York",
    "D": "Pennsylvania",
    "answer": "A"
  }, {
    "question": "Astronaut John Glenn served as a pilot in what branch of the military?",
    "A": "Army",
    "B": "Air Force",
    "C": "Marines",
    "D": "Navy",
    "answer": "C"
  }, {
    "question": "At the equator, how fast is the earth's surface turning?",
    "A": "about 100 miles per hour",
    "B": "about 500 miles per hour",
    "C": "about 1000 miles per hour",
    "D": "about 2000 miles per hour",
    "answer": "C"
  }, {
    "question": "At what age can someone first attend an R-rated movie without an accompanying adult?",
    "A": "15",
    "B": "17",
    "C": "18",
    "D": "21",
    "answer": "C"
  }, {
    "question": "Backgammon is a how many player game?",
    "A": "Two",
    "B": "Three",
    "C": "Four",
    "D": "Six",
    "answer": "A"
  }, {
    "question": "Before he went into coaching, Phil Jackson played for which of the following NBA teams?",
    "A": "Boston Celtics",
    "B": "Los Angeles Lakers",
    "C": "New York Knicks",
    "D": "Philadelphia 76ers",
    "answer": "C"
  }, {
    "question": "By what name is Bob Keeshan better known?",
    "A": "Bozo the Clown",
    "B": "Pee Wee Herman",
    "C": "Captain Kangaroo",
    "D": "Buffalo Bob",
    "answer": "C"
  }, {
    "question": "By what collective name do Christians refer to God the Father, God the Son and the Holy Ghost?",
    "A": "the Trio",
    "B": "the Troika",
    "C": "the Triumvirate",
    "D": "the Trinity",
    "answer": "D"
  }, {
    "question": "By what nickname is the Federal National Mortgage Association known?",
    "A": "Morty",
    "B": "FEMA",
    "C": "Freddie Mac",
    "D": "Fannie Mae",
    "answer": "D"
  }, {
    "question": "Cheddar cheese got its name from a village in what country?",
    "A": "England",
    "B": "France",
    "C": "Switzerland",
    "D": "Denmark",
    "answer": "A"
  }, {
    "question": "Cheese is a necessary ingredient in which of these dishes?",
    "A": "sushi",
    "B": "french fries",
    "C": "veal parmigiano",
    "D": "chicken pot pie",
    "answer": "C"
  }, {
    "question": "During what war did Francis Scott Key write the words to 'The Star-Spangled Banner'?",
    "A": "American Revolution",
    "B": "War of 1812",
    "C": "Civil War",
    "D": "World War I",
    "answer": "B"
  }, {
    "question": "During which war did US troops fight the Battle of New Orleans?",
    "A": "American Revolution",
    "B": "Civil War",
    "C": "Mexican War",
    "D": "War of 1812",
    "answer": "D"
  }, {
    "question": "Each year in pro baseball, the player voted as the best fielder at his position wins what?",
    "A": "a brand new car",
    "B": "the Gold Glove",
    "C": "the Silver Bat",
    "D": "the Brass Baseball",
    "answer": "B"
  }, {
    "question": "Elephant tusks are made of what material?",
    "A": "coral",
    "B": "ivory",
    "C": "bone",
    "D": "calcium",
    "answer": "B"
  }, {
    "question": "Excluding wisdom teeth, how many adult teeth do humans have?",
    "A": "28",
    "B": "32",
    "C": "35",
    "D": "40",
    "answer": "A"
  }, {
    "question": "For a man and woman on a date, 'dutch treat' means what?",
    "A": "the man pays",
    "B": "the woman pays",
    "C": "the Dutch pay",
    "D": "each pays their own way",
    "answer": "D"
  }, {
    "question": "For what purpose would you use an awl?",
    "A": "to shoot ducks",
    "B": "to polish floors",
    "C": "to make holes",
    "D": "to weigh fruit",
    "answer": "C"
  }, {
    "question": "From 1971 to 1997, the Democratic Republic of Congo was known as what?",
    "A": "Zaire",
    "B": "Angola",
    "C": "Rhodesia",
    "D": "Belgian Congo",
    "answer": "A"
  }, {
    "question": "From what language does the term 'R.S.V.P.' originate?",
    "A": "Russian",
    "B": "Italian",
    "C": "Portuguese",
    "D": "French",
    "answer": "D"
  }, {
    "question": "From whom does the Lutheran Church get its name?",
    "A": "Martin Luther King Jr",
    "B": "Martin Luther",
    "C": "Luther Vandross",
    "D": "Lex Luthor",
    "answer": "B"
  }, {
    "question": "Gerry Adams is the president of what organization?",
    "A": "Greenpeace",
    "B": "NASCAR",
    "C": "Sinn Fein",
    "D": "PLO",
    "answer": "C"
  }, {
    "question": "Girls of what religious community traditionally wear bonnets?",
    "A": "Amish",
    "B": "Sikh",
    "C": "Roman Catholic",
    "D": "Christian",
    "answer": "A"
  }, {
    "question": "How are actors Charlie Sheen and Emilio Estevez related?",
    "A": "they're cousins",
    "B": "they're brothers",
    "C": "they're father and son",
    "D": "they're uncle and nephew",
    "answer": "B"
  }, {
    "question": "How do you express 3/4 as a decimal?",
    "A": ".25",
    "B": ".50",
    "C": ".75",
    "D": ".90",
    "answer": "C"
  }, {
    "question": "How is 4:00 pm expressed in military time?",
    "A": "1600",
    "B": "004",
    "C": "0400 ",
    "D": "4:00",
    "answer": "A"
  }, {
    "question": "How is the Arabic numeral for '2' written?",
    "A": "2",
    "B": "II",
    "C": "I",
    "D": "ii",
    "answer": "A"
  }, {
    "question": "How is the word 'ambulance' normally written on the front of American ambulances?",
    "A": "in French",
    "B": "in reverse",
    "C": "in braille",
    "D": "in gibberish",
    "answer": "B"
  }, {
    "question": "How long is a single term in the US Senate?",
    "A": "two years",
    "B": "four years",
    "C": "six years",
    "D": "eight years",
    "answer": "C"
  }, {
    "question": "How long is the time on an NBA shot clock?",
    "A": "18 seconds",
    "B": "24 seconds",
    "C": "30 seconds",
    "D": "35 seconds",
    "answer": "B"
  }, {
    "question": "How many $100 bills does it take to equal one million dollars?",
    "A": "one thousand",
    "B": "five thousand",
    "C": "ten thousand",
    "D": "one hundred thousand",
    "answer": "C"
  }, {
    "question": "How many axles does a standard automobile have?",
    "A": "one",
    "B": "two",
    "C": "four",
    "D": "eight",
    "answer": "B"
  }, {
    "question": "How many digits are in a standard Visa credit card number?",
    "A": "12",
    "B": "15",
    "C": "16",
    "D": "20",
    "answer": "C"
  }, {
    "question": "How many eyes does a Giraffe have?",
    "A": "one",
    "B": "two",
    "C": "three",
    "D": "four",
    "answer": "B"
  }, {
    "question": "How many innings are there in a regular Major League Baseball game?",
    "A": "seven",
    "B": "eight",
    "C": "nine",
    "D": "ten",
    "answer": "C"
  }, {
    "question": "How many keys are on a standard piano?",
    "A": "20",
    "B": "54",
    "C": "88",
    "D": "100",
    "answer": "C"
  }, {
    "question": "How many men has actress Elizabeth Taylor been divorced from?",
    "A": "five",
    "B": "six",
    "C": "seven",
    "D": "eight",
    "answer": "C"
  }, {
    "question": "How many ounces are in a pound?",
    "A": "4",
    "B": "12",
    "C": "16",
    "D": "32",
    "answer": "C"
  }, {
    "question": "How many periods are there in an ice hockey game?",
    "A": "One",
    "B": "Two",
    "C": "Three",
    "D": "Four",
    "answer": "C"
  }, {
    "question": "How many quarts are there in a gallon?",
    "A": "one",
    "B": "two",
    "C": "three",
    "D": "four",
    "answer": "D"
  }, {
    "question": "How many ribs are there in the human body?",
    "A": "18",
    "B": "24",
    "C": "30",
    "D": "42",
    "answer": "B"
  }, {
    "question": "How many ships did Columbus set sail with on his initial voyage to the New World?",
    "A": "Two",
    "B": "Three",
    "C": "Five",
    "D": "Ten",
    "answer": "B"
  }, {
    "question": "How many spikes are on the Statue of Liberty's crown?",
    "A": "five",
    "B": "seven",
    "C": "nine",
    "D": "thirteen",
    "answer": "B"
  }, {
    "question": "How many stars are on the American flag?",
    "A": "13",
    "B": "48",
    "C": "50",
    "D": "51",
    "answer": "C"
  }, {
    "question": "How many states were in the Confederate States of America?",
    "A": "11",
    "B": "13",
    "C": "16",
    "D": "22",
    "answer": "A"
  }, {
    "question": "How much does Peanuts character Lucy charge for her psychiatric advice?",
    "A": "5 cents",
    "B": "10 cents",
    "C": "75 cents",
    "D": "$125",
    "answer": "A"
  }, {
    "question": "How long is Hanukkah?",
    "A": "one day",
    "B": "five days",
    "C": "eight days",
    "D": "two weeks",
    "answer": "C"
  }, {
    "question": "Huffy, Schwinn and Raleigh are all brands of what?",
    "A": "sportswear",
    "B": "dishwashers",
    "C": "cigarettes",
    "D": "bicycles",
    "answer": "D"
  }, {
    "question": "If a business files under Chapter 11 what is it doing?",
    "A": "declaring bankruptcy",
    "B": "selling stock",
    "C": "buying a smaller",
    "D": "company suing the government",
    "answer": "A"
  }, {
    "question": "If a piece of music is in 'common time' how many quarter notes are there per measure?",
    "A": "one",
    "B": "four",
    "C": "five",
    "D": "ten",
    "answer": "B"
  }, {
    "question": "If a ring has the number 925 stamped into it, it is most likely made of what material?",
    "A": "platinum",
    "B": "gold",
    "C": "steel",
    "D": "silver",
    "answer": "D"
  }, {
    "question": "If Christmas Day is on a Saturday, then the following New Year's Day falls on what day of the week?",
    "A": "Sunday",
    "B": "Monday",
    "C": "Friday",
    "D": "Saturday",
    "answer": "D"
  }, {
    "question": "If someone has cataracts, what part of their body might need an operation?",
    "A": "ear",
    "B": "hand",
    "C": "eye",
    "D": "knee",
    "answer": "C"
  }, {
    "question": "If you are 'riding fakie' inside a 'half pipe' what are you probably doing?",
    "A": "skiing",
    "B": "biking",
    "C": "snowboarding",
    "D": "surfing",
    "answer": "C"
  }, {
    "question": "If you are truly afraid of the dark, what do you suffer from?",
    "A": "hypnophobia",
    "B": "cryptophobia",
    "C": "hadephobia",
    "D": "nyctophobia",
    "answer": "D"
  }, {
    "question": "If you are watching a Shavian play, who is the author?",
    "A": "Shakespeare",
    "B": "Aeschylus",
    "C": "George Bernard Shaw",
    "D": "Anton Chekhov",
    "answer": "C"
  }, {
    "question": "If you ask for 'gai' at a Thai restaurant, what will you get?",
    "A": "shrimp",
    "B": "chicken",
    "C": "beef",
    "D": "pork",
    "answer": "B"
  }, {
    "question": "If you dial '411' on a telephone, who are you calling?",
    "A": "the police",
    "B": "the White House",
    "C": "directory assistance",
    "D": "Moviefone",
    "answer": "C"
  }, {
    "question": "If you have a 'sawbuck' how much money do you have?",
    "A": "$1",
    "B": "$5",
    "C": "$10",
    "D": "$20",
    "answer": "C"
  }, {
    "question": "If you work as a 'dolly grip' what business are you in?",
    "A": "sheep farming",
    "B": "film production",
    "C": "construction",
    "D": "moving",
    "answer": "B"
  }, {
    "question": "In 1909, Frederick Cook claimed to be the first explorer to reach what location?",
    "A": "Mount Everest",
    "B": "Bermuda Triangle",
    "C": "Atlantis",
    "D": "North Pole",
    "answer": "D"
  }, {
    "question": "In 1926, the Harlem Globetrotters basketball team was formed in what city?",
    "A": "Boston",
    "B": "Philadelphia",
    "C": "Chicago",
    "D": "New York City",
    "answer": "C"
  }, {
    "question": "In 1960, Nazi official Adolph Eichmann was finally captured in what country?",
    "A": "Brazil",
    "B": "East Germany",
    "C": "Argentina",
    "D": "Paraguay",
    "answer": "C"
  }, {
    "question": "In 1978, who became the youngest jockey ever to win horse racing's triple crown?",
    "A": "Jerry Bailey",
    "B": "Steve Cauthen",
    "C": "Willie Shoemaker",
    "D": "Pasquale Devito",
    "answer": "B"
  }, {
    "question": "In 1986, Libyan leader Muammar Qaddafi drew a so-called 'Line of Death' over what body of water?",
    "A": "Gulf of Sidra",
    "B": "Gulf of Oman",
    "C": "Red Sea",
    "D": "Persian Gulf",
    "answer": "A"
  }, {
    "question": "In a game with no wild cards, what is the highest possible poker hand?",
    "A": "straight flush",
    "B": "royal flush",
    "C": "full house",
    "D": "four of a kind",
    "answer": "B"
  }, {
    "question": "In America, what is the main ingredient in pepperoni?",
    "A": "fish",
    "B": "pepper",
    "C": "wheat",
    "D": "meat",
    "answer": "D"
  }, {
    "question": "In American football, how many points is a touchdown worth?",
    "A": "two",
    "B": "three",
    "C": "six",
    "D": "seven",
    "answer": "C"
  }, {
    "question": "In an adult human, how long is the large intestine?",
    "A": "one foot",
    "B": "five feet",
    "C": "twelve feet",
    "D": "twenty feet",
    "answer": "B"
  }, {
    "question": "In baseball, how many balls make a walk?",
    "A": "one",
    "B": "two",
    "C": "three",
    "D": "four",
    "answer": "D"
  }, {
    "question": "In bowling, how many pins must you knock down to get a strike?",
    "A": "zero",
    "B": "8",
    "C": "10",
    "D": "12",
    "answer": "C"
  }, {
    "question": "In British currency, how many pence make a pound?",
    "A": "10",
    "B": "100",
    "C": "500",
    "D": "1000",
    "answer": "B"
  }, {
    "question": "In computer terminology, what does the acronym 'FTP' stand for?",
    "A": "file transfer protocol",
    "B": "full time portal",
    "C": "full text processor",
    "D": "free to print",
    "answer": "A"
  }, {
    "question": "In computer terminology, what does the acronym 'ISP' stand for?",
    "A": "Individual Site Privacy",
    "B": "Investment Stability Plan",
    "C": "Internal Security Position",
    "D": "Internet Service Provider",
    "answer": "D"
  }, {
    "question": "In cooking, the term 'au gratin' is sometimes used to describe a dish with what topping?",
    "A": "cheese",
    "B": "fruit",
    "C": "gravy",
    "D": "whipped cream",
    "answer": "A"
  }, {
    "question": "In golf, what is one stroke over par called?",
    "A": "eagle",
    "B": "bogey",
    "C": "dormy",
    "D": "birdie",
    "answer": "B"
  }, {
    "question": "In Greek mythology, what is the name of Zeus' father?",
    "A": "Apollo",
    "B": "Cronus",
    "C": "Prometheus",
    "D": "Hercules",
    "answer": "B"
  }, {
    "question": "In horse racing, what is the term for a wager on the 1st, 2nd and 3rd place finishers in a specific race?",
    "A": "triple action",
    "B": "trifecta",
    "C": "exacta",
    "D": "triple crown",
    "answer": "B"
  }, {
    "question": "In ice hockey, which of the following is not a penalty?",
    "A": "hooking",
    "B": "charging",
    "C": "carving",
    "D": "butt-ending",
    "answer": "C"
  }, {
    "question": "In Mister Rogers' theme song, what does he ask you to be?",
    "A": "his cook",
    "B": "his student",
    "C": "his neighbor",
    "D": "all you can be",
    "answer": "C"
  }, {
    "question": "In mobster lingo, if you 'sing like a canary' what are you doing?",
    "A": "impersonating Sinatra",
    "B": "talking to the cops",
    "C": "killing an enemy",
    "D": "betting on horses",
    "answer": "B"
  }, {
    "question": "In soccer, which player is allowed to use his or her hands in the field of play?",
    "A": "midfielder",
    "B": "center",
    "C": "sweeper",
    "D": "goalkeeper",
    "answer": "D"
  }, {
    "question": "In the 1960s 'Batman' TV series, who was not a guest villain?",
    "A": "The Minstrel",
    "B": "The Archer",
    "C": "The Bookworm",
    "D": "The Squeegee Guy",
    "answer": "D"
  }, {
    "question": "In the 1976 remake of the classic film 'King Kong' what New York landmark does the giant ape climb?",
    "A": "Statue of Liberty",
    "B": "Empire State Building",
    "C": "World Trade Center",
    "D": "Chrysler Building",
    "answer": "C"
  }, {
    "question": "In the 1992 animated film 'Aladdin' what device does the hero use to travel from place to place?",
    "A": "talking car",
    "B": "winged horse",
    "C": "magic carpet",
    "D": "hot air balloon",
    "answer": "C"
  }, {
    "question": "In the Arthurian legend, who is married to Guinevere?",
    "A": "Merlin",
    "B": "King Arthur",
    "C": "Lancelot",
    "D": "Camelot",
    "answer": "B"
  }, {
    "question": "In the card game blackjack, how much are a queen and a king worth-together?",
    "A": "11",
    "B": "15",
    "C": "20",
    "D": "21",
    "answer": "C"
  }, {
    "question": "In the children's game, what color is 'Rover'?",
    "A": "green",
    "B": "black",
    "C": "red",
    "D": "blue",
    "answer": "C"
  }, {
    "question": "In the classic song 'Take Me Out to the Ballgame' for whom do we 'root root root'?",
    "A": "the umpire",
    "B": "the home team",
    "C": "the bat boy",
    "D": "Mighty Casey",
    "answer": "B"
  }, {
    "question": "In the comic strip 'Peanuts' what is Schroeder known for doing?",
    "A": "Dancing",
    "B": "playing football",
    "C": "playing the piano",
    "D": "Flying an imaginary plane",
    "answer": "C"
  }, {
    "question": "In the famous ballet 'The Nutcracker' who does the hero defeat?",
    "A": "Sugar Plum Fairy",
    "B": "Rat King",
    "C": "Snow Queen",
    "D": "Marzipan",
    "answer": "B"
  }, {
    "question": "In the famous baseball poem 'Casey at the Bat' Casey plays for the team from what town?",
    "A": "Stormfield",
    "B": "Fog City",
    "C": "Mudville",
    "D": "Waterlog",
    "answer": "C"
  }, {
    "question": "In the film 'Easy Rider' what emblem is on the back of Peter Fonda's leather jacket?",
    "A": "peace symbol",
    "B": "American flag",
    "C": "two white doves",
    "D": "Harley-Davidson logo",
    "answer": "B"
  }, {
    "question": "In the film 'The Talented Mr. Ripley' who plays Mr. Ripley?",
    "A": "Jude Law",
    "B": "Matt Damon",
    "C": "Dustin Hoffman",
    "D": "Ben Affleck",
    "answer": "B"
  }, {
    "question": "In the Jimmy Buffet song 'Margaritaville' what is the singer searching for?",
    "A": "a lime",
    "B": "a shaker of salt",
    "C": "his car keys",
    "D": "the bartender",
    "answer": "B"
  }, {
    "question": "In the movie 'Austin Powers: The Spy Who Shagged Me' what is the name of Dr. Evil's diminitive clone?",
    "A": "Little Buddy",
    "B": "Mini-Me",
    "C": "Small Fry",
    "D": "Dr. Evil Jr",
    "answer": "B"
  }, {
    "question": "In the movie 'Star Wars' what kind of creature is Chewbacca?",
    "A": "Woolie",
    "B": "Boobie",
    "C": "Wookie",
    "D": "Klingon",
    "answer": "C"
  }, {
    "question": "In the novel 'Around the World in 80 Days' Phileas Fogg's faithful valet is named what?",
    "A": "Sancho Panza",
    "B": "Passepartout",
    "C": "Renfield",
    "D": "Savoir Faire",
    "answer": "B"
  }, {
    "question": "In the novel 'The Adventures of Tom Sawyer' what is the name of Tom's sweetheart?",
    "A": "Polly Finn",
    "B": "Becky Thatcher",
    "C": "Nancy Drew",
    "D": "Emma Bovary",
    "answer": "B"
  }, {
    "question": "In the original 'Get Smart' TV series, what is agent Maxwell Smart's code name?",
    "A": "Agent 86",
    "B": "Agent 99",
    "C": "Larrabee",
    "D": "The Chief",
    "answer": "A"
  }, {
    "question": "In the sci-fi movie 'Fantastic Voyage' where do the voyagers travel?",
    "A": "through outer space",
    "B": "through a human body",
    "C": "to the ocean floor",
    "D": "to the center of the earth",
    "answer": "B"
  }, {
    "question": "In the story 'Jack and the Beanstalk' what does Jack trade to get the magic beans?",
    "A": "a cow",
    "B": "a hat",
    "C": "a harp",
    "D": "a goose",
    "answer": "A"
  }, {
    "question": "In the television network abbreviation 'ABC' what does the 'A' stand for?",
    "A": "Artistic",
    "B": "Audio",
    "C": "American",
    "D": "Adult",
    "answer": "C"
  }, {
    "question": "In the phrase 'Y2K' what does 'K' stand for?",
    "A": "millennium",
    "B": "computer code",
    "C": "catastrophe",
    "D": "thousand",
    "answer": "D"
  }, {
    "question": "In the United States, what is the first day of spring?",
    "A": "February 21",
    "B": "March 21",
    "C": "April 21",
    "D": "May 21",
    "answer": "B"
  }, {
    "question": "In traditional English puppet shows, who is married to the character Punch?",
    "A": "Debbie",
    "B": "Victoria",
    "C": "Judy",
    "D": "Barbara",
    "answer": "C"
  }, {
    "question": "In what city is TV's 'The Mary Tyler Moore Show' set?",
    "A": "Dallas",
    "B": "Chicago",
    "C": "New York",
    "D": "Minneapolis",
    "answer": "D"
  }, {
    "question": "In what city would you find people studying art and design at the Fashion Institute of Technology?",
    "A": "Paris",
    "B": "New York",
    "C": "Los Angeles",
    "D": "Melbourne",
    "answer": "B"
  }, {
    "question": "In what country are police officers referred to as 'bobbies'?",
    "A": "Israel",
    "B": "Greece",
    "C": "England",
    "D": "France",
    "answer": "C"
  }, {
    "question": "In what country did Magic Johnson play professional basketball during the 1999 season?",
    "A": "United States",
    "B": "Sweden",
    "C": "Israel",
    "D": "Turkey",
    "answer": "B"
  }, {
    "question": "In what country did Pokemon originate?",
    "A": "France",
    "B": "Hungary",
    "C": "Japan",
    "D": "Canada",
    "answer": "C"
  }, {
    "question": "In what decade did Israel become an independent state?",
    "A": "1920s",
    "B": "1940s",
    "C": "1950s",
    "D": "1960s",
    "answer": "B"
  }, {
    "question": "In what decade was the Hula-Hoop invented?",
    "A": "1890s",
    "B": "1920s",
    "C": "1950s",
    "D": "1970s",
    "answer": "C"
  }, {
    "question": "In what forest did Robin Hood live?",
    "A": "Black Forest",
    "B": "Petrified Forest",
    "C": "Nottingham Forest",
    "D": "Sherwood Forest",
    "answer": "D"
  }, {
    "question": "In what restaurant can you order a Grand Slam breakfast?",
    "A": "Denny's",
    "B": "McDonald's",
    "C": "Burger King",
    "D": "Hardee's",
    "answer": "A"
  }, {
    "question": "In what sport do athletes compete for the Walker Cup?",
    "A": "cricket",
    "B": "tennis",
    "C": "squash",
    "D": "golf",
    "answer": "D"
  }, {
    "question": "In what sport do you find 'steel cage' matches?",
    "A": "boxing",
    "B": "fencing",
    "C": "pro wrestling",
    "D": "college basketball",
    "answer": "C"
  }, {
    "question": "In what state is the 1999 movie 'Magnolia' set?",
    "A": "California",
    "B": "South Carolina",
    "C": "Georgia",
    "D": "Texas",
    "answer": "A"
  }, {
    "question": "In what U.S. city can you find the Basketball Hall of Fame?",
    "A": "Canton, Ohio",
    "B": "Cooperstown, New York",
    "C": "Springfield, Massachusetts",
    "D": "Lawrence, Kansas",
    "answer": "C"
  }, {
    "question": "In what year did the Great Depression begin?",
    "A": "1884",
    "B": "1929",
    "C": "1953",
    "D": "1975",
    "answer": "B"
  }, {
    "question": "In what year did the United States last win an Olympic gold medal in men's ice hockey?",
    "A": "1976",
    "B": "1980",
    "C": "1984",
    "D": "1988",
    "answer": "B"
  }, {
    "question": "In which of the following bands did Jimmy Page not play guitar?",
    "A": "Bad Company",
    "B": "The Firm",
    "C": "Led Zeppelin",
    "D": "The Yardbirds",
    "answer": "A"
  }, {
    "question": "In which of these sports do competitors use a 'funny car'?",
    "A": "supercross",
    "B": "dogsledding",
    "C": "gymnastics",
    "D": "drag racing",
    "answer": "D"
  }, {
    "question": "In what war did Joan of Arc fight?",
    "A": "Hundred Years' War",
    "B": "Franco-Prussian War",
    "C": "French Revolution",
    "D": "French and Indian War",
    "answer": "A"
  }, {
    "question": "Including the bottom, how many sides are on a square-based pyramid?",
    "A": "three",
    "B": "four",
    "C": "five",
    "D": "six",
    "answer": "C"
  }, {
    "question": "Into what body of water does the Rhone River flow?",
    "A": "Atlantic Ocean",
    "B": "Caspian Sea",
    "C": "North Sea",
    "D": "Mediterranean Sea",
    "answer": "D"
  }, {
    "question": "John D. Rockefeller made his fortune in what industry?",
    "A": "automobile ",
    "B": "oil",
    "C": "steel",
    "D": "railroad",
    "answer": "B"
  }, {
    "question": "Modern computer microchips are primarily composed of what element?",
    "A": "Sodium",
    "B": "Silicon",
    "C": "Aluminum",
    "D": "Silver",
    "answer": "B"
  }, {
    "question": "Mohair is made from the fleece of what animal?",
    "A": "camel",
    "B": "llama",
    "C": "goat",
    "D": "mole",
    "answer": "C"
  }, {
    "question": "'Nature, Mr. Allnut, is what we are put in this world to rise above' is a line from what film?",
    "A": "'Citizen Kane'",
    "B": "'The African Queen'",
    "C": "'The Deer Hunter'",
    "D": "'Adam's Rib'",
    "answer": "B"
  }, {
    "question": "On a set of jumper cables, what color designates the negative connector?",
    "A": "black",
    "B": "red",
    "C": "orange",
    "D": "blue",
    "answer": "A"
  }, {
    "question": "On average, what length of time passes between high tides?",
    "A": "3 hours, 25 minutes",
    "B": "6 hours, 25 minutes",
    "C": "12 hours, 25 minutes",
    "D": "24 hours, 25 minutes",
    "answer": "C"
  }, {
    "question": "On the TV show 'CHiPs' what was Officer Frank Poncherello's nickname?",
    "A": "Franky",
    "B": "Ponch",
    "C": "Chipper",
    "D": "Hot Dog",
    "answer": "B"
  }, {
    "question": "On the TV show 'Hill Street Blues' what is Joyce Davenport's nickname for Captain Frank Furillo?",
    "A": "Furry Monster",
    "B": "Pizza Man",
    "C": "Snookums",
    "D": "Baby Cakes",
    "answer": "B"
  }, {
    "question": "On TV's 'Seinfeld' what type of doctor did Mr. Costanza go to when he sat on 'fusilli Jerry'?",
    "A": "ophthalmologist",
    "B": "cardiologist",
    "C": "neurologist",
    "D": "proctologist",
    "answer": "D"
  }, {
    "question": "On Valentine's Day 2000, NASA's NEAR spacecraft began a yearlong orbit of what asteroid?",
    "A": "Eros",
    "B": "Cupid",
    "C": "Aphrodite",
    "D": "Venus",
    "answer": "A"
  }, {
    "question": "On what continent can you find tigers in the wild?",
    "A": "Africa",
    "B": "Asia",
    "C": "Europe",
    "D": "South America",
    "answer": "B"
  }, {
    "question": "On what body part should you wear a babushka?",
    "A": "head",
    "B": "hands",
    "C": "foot",
    "D": "legs",
    "answer": "A"
  }, {
    "question": "On which part of a car would you find the 'caliper'?",
    "A": "battery",
    "B": "engine",
    "C": "radiator",
    "D": "brakes",
    "answer": "D"
  }, {
    "question": "Paper will burn at approximately what temperature, in Fahrenheit?",
    "A": "98.6 degrees",
    "B": "212.5 degrees",
    "C": "398.5 degrees",
    "D": "451 degrees",
    "answer": "D"
  }, {
    "question": "People are supposed to drive on the left-hand side of the road in which country?",
    "A": "France",
    "B": "Italy",
    "C": "England",
    "D": "Germany",
    "answer": "C"
  }, {
    "question": "Phoebe, Dione and Helene are moons of what planet?",
    "A": "Jupiter",
    "B": "Saturn",
    "C": "Neptune",
    "D": "Pluto",
    "answer": "B"
  }, {
    "question": "Pop icon Tiny Tim was famous for playing what musical instrument?",
    "A": "ukulele",
    "B": "kazoo",
    "C": "accordion",
    "D": "fiddle",
    "answer": "A"
  }, {
    "question": "Someone would most likely contract salmonella poisoning from eating which of the following?",
    "A": "carrots",
    "B": "chicken",
    "C": "tofu",
    "D": "rice",
    "answer": "B"
  }, {
    "question": "Stevie Wonder and Michael Jackson have both recorded duets with which former Beatle?",
    "A": "Paul McCartney",
    "B": "John Lennon",
    "C": "George Harrison",
    "D": "Ringo Starr",
    "answer": "A"
  }, {
    "question": "The American patriot Paul Revere was named for his father, whose original name was what?",
    "A": "John Paul Revere",
    "B": "Paul Silver",
    "C": "Apollos Rivoire",
    "D": "Paolo Reverini",
    "answer": "C"
  }, {
    "question": "The Original Apple iMac computer was available in all of the following colors except which?",
    "A": "Tangerine",
    "B": "Strawberry",
    "C": "Kiwi",
    "D": "Grape",
    "answer": "C"
  }, {
    "question": "The 'Arkansas toothpick' is better known by what name?",
    "A": "Scottie Pippen",
    "B": "spare rib",
    "C": "pinkie finger",
    "D": "Bowie knife",
    "answer": "D"
  }, {
    "question": "The British dish 'bangers and mash' is made up of sausage and what?",
    "A": "eggs",
    "B": "bacon",
    "C": "liver",
    "D": "potatoes",
    "answer": "D"
  }, {
    "question": "The common term for someone who has difficulty seeing objects in the distance is what?",
    "A": "farsighted",
    "B": "nearsighted",
    "C": "hindsighted",
    "D": "hypermetropic",
    "answer": "B"
  }, {
    "question": "The dance known as the 'fandango' is of what origin?",
    "A": "Australian",
    "B": "African",
    "C": "Native American",
    "D": "Spanish",
    "answer": "D"
  }, {
    "question": "The disco band ABBA comes from what country?",
    "A": "Norway",
    "B": "Sweden",
    "C": "Switzerland",
    "D": "The Netherlands",
    "answer": "B"
  }, {
    "question": "The film 'Stand By Me' is based on a novel by what author?",
    "A": "Anne Proulx",
    "B": "Stephen King",
    "C": "Dean Koontz",
    "D": "Frank McCourt",
    "answer": "B"
  }, {
    "question": "The first commercial radio station was located in what city?",
    "A": "Chicago",
    "B": "Austin",
    "C": "Pittsburgh",
    "D": "Cleveland",
    "answer": "C"
  }, {
    "question": "The first sound recording to be made and reproduced was a recitation of what nursery rhyme?",
    "A": "'Humpty Dumpty'",
    "B": "'Mary Had a Little Lamb'",
    "C": "'Jack Be Nimble'",
    "D": "'Home, Sweet Home'",
    "answer": "B"
  }, {
    "question": "The majority of calcium in the human body is found where?",
    "A": "hair",
    "B": "blood",
    "C": "bones",
    "D": "digestive tract",
    "answer": "C"
  }, {
    "question": "The phrase 'hospital corners' refers to what?",
    "A": "bed sheets",
    "B": "paint",
    "C": "landscaping",
    "D": "scissors",
    "answer": "A"
  }, {
    "question": "The process of drilling holes in the skull is called what?",
    "A": "bifurcation",
    "B": "trepanation",
    "C": "aeronomy",
    "D": "skullduggery",
    "answer": "B"
  }, {
    "question": "The sport of judo comes from what Asian country?",
    "A": "Japan",
    "B": "Vietnam",
    "C": "Laos",
    "D": "Philippines",
    "answer": "A"
  }, {
    "question": "The Strauss family of composers popularized what dance?",
    "A": "waltz",
    "B": "tango",
    "C": "fox-trot",
    "D": "square dance",
    "answer": "A"
  }, {
    "question": "The term 'chili con carne' refers to chili with what?",
    "A": "beans ",
    "B": "meat",
    "C": "cheese",
    "D": "chili peppers",
    "answer": "B"
  }, {
    "question": "The TV show 'House of Style' airs on what network?",
    "A": "E",
    "B": "WB",
    "C": "MTV",
    "D": "Home Shopping Network",
    "answer": "C"
  }, {
    "question": "To create a tapestry, one must traditionally engage in what activity?",
    "A": "weaving",
    "B": "sculpting",
    "C": "baking",
    "D": "singing",
    "answer": "A"
  }, {
    "question": "To make an international telephone call from within the US, what are the first numbers you should dial?",
    "A": "011",
    "B": "101",
    "C": "888",
    "D": "911",
    "answer": "A"
  }, {
    "question": "To ward off bad luck, what do many people do to wood?",
    "A": "knock on it",
    "B": "kiss it",
    "C": "thank it",
    "D": "scratch it",
    "answer": "A"
  }, {
    "question": "What actress starred on 'Charlie's Angels' for the show's entire run?",
    "A": "Cheryl Ladd",
    "B": "Farrah Fawcett",
    "C": "Jaclyn Smith",
    "D": "Kate Jackson",
    "answer": "C"
  }, {
    "question": "What animal is considered sacred in India?",
    "A": "sheep",
    "B": "cow",
    "C": "chicken",
    "D": "dog",
    "answer": "B"
  }, {
    "question": "What animal is used to make lard?",
    "A": "pig",
    "B": "cow",
    "C": "snake",
    "D": "chicken",
    "answer": "A"
  }, {
    "question": "What animal represents the year 2000 on the Chinese calendar?",
    "A": "dragon",
    "B": "rabbit",
    "C": "tiger",
    "D": "monkey",
    "answer": "A"
  }, {
    "question": "What animated character has a crush on the Little Red Haired Girl?",
    "A": "Richie Rich",
    "B": "Charlie Brown",
    "C": "Bugs Bunny",
    "D": "Jonny Quest",
    "answer": "B"
  }, {
    "question": "What are fans of the TV show 'Mystery Science Theater 3000' known as?",
    "A": "Mysterians",
    "B": "MiSTies",
    "C": "'Bot Brigade",
    "D": "Gizmonics",
    "answer": "B"
  }, {
    "question": "What are the dimensions of a 'letter size' piece of paper?",
    "A": "3 1/2 x 5 inches",
    "B": "5 x 10 inches",
    "C": "8 1/2 x 11 inches",
    "D": "11 x 17 inches",
    "answer": "C"
  }, {
    "question": "What are the names of Donald Duck's three nephews?",
    "A": "Quick, Quack, Quock",
    "B": "Alvin, Simon, Theodore",
    "C": "Robbie, Chip, Ernie",
    "D": "Huey, Dewey, Louie",
    "answer": "D"
  }, {
    "question": "What are the names of the two primary M&M's spokes-candies?",
    "A": "Peanut and Plain",
    "B": "Red and Yellow",
    "C": "Mort and Marty",
    "D": "They don't have names",
    "answer": "B"
  }, {
    "question": "What are the plastic boxes that hold compact discs called?",
    "A": "frame cases",
    "B": "jewel cases",
    "C": "slip cases",
    "D": "wafer boxes",
    "answer": "B"
  }, {
    "question": "What are the Smothers Brothers' first names?",
    "A": "Frank and Bill",
    "B": "Tom and Dick",
    "C": "Dave and George",
    "D": "Ed and Pete",
    "answer": "B"
  }, {
    "question": "What article of clothing best describes a 'pashmina'?",
    "A": "shoes",
    "B": "pants",
    "C": "scarf",
    "D": "underwear",
    "answer": "C"
  }, {
    "question": "What automobile company makes the Sonata?",
    "A": "Toyota",
    "B": "Honda",
    "C": "Subaru",
    "D": "Hyundai",
    "answer": "D"
  }, {
    "question": "What biological process replicates DNA?",
    "A": "molting",
    "B": "mitosis",
    "C": "diffusion",
    "D": "peristalsis",
    "answer": "B"
  }, {
    "question": "What car company once manufactured and sold the 'Datsun' line of automobiles?",
    "A": "Nissan",
    "B": "Mazda",
    "C": "Toyota",
    "D": "Daihatsu",
    "answer": "A"
  }, {
    "question": "What cartoon character traveled in a time machine with Mr. Peabody?",
    "A": "Rocky",
    "B": "Jonny Quest",
    "C": "Underdog",
    "D": "Sherman",
    "answer": "D"
  }, {
    "question": "What character did Woody replace on the TV show 'Cheers'?",
    "A": "Coach",
    "B": "Diane",
    "C": "Norm",
    "D": "Frasier",
    "answer": "A"
  }, {
    "question": "What chemical do people frequently use to bleach hair?",
    "A": "folic acid",
    "B": "hydrogen peroxide",
    "C": "sodium chloride",
    "D": "nitrous oxide",
    "answer": "B"
  }, {
    "question": "What children's storybook character believes that the sky is falling?",
    "A": "Chicken Little",
    "B": "Curious George",
    "C": "Jack Sprat",
    "D": "Tom Thumb",
    "answer": "A"
  }, {
    "question": "What children's TV character is known as 'Da Niao' in China?",
    "A": "Barney",
    "B": "Big Bird",
    "C": "Mickey Mouse",
    "D": "Tinky Winky",
    "answer": "B"
  }, {
    "question": "What city did the Beatles originally call home?",
    "A": "London",
    "B": "Leeds",
    "C": "Liverpool",
    "D": "Manchester",
    "answer": "C"
  }, {
    "question": "What city is known as 'the rubber capital of the world'?",
    "A": "Omaha, Nebraska",
    "B": "Rockford, Illinois",
    "C": "Grand Rapids, Michigan",
    "D": "Akron, Ohio",
    "answer": "D"
  }, {
    "question": "What city's airport uses the code ORD?",
    "A": "Chicago",
    "B": "Orlando",
    "C": "New York City",
    "D": "Portland",
    "answer": "A"
  }, {
    "question": "What city's residents are known as 'Knickerbockers'?",
    "A": "Boston",
    "B": "Philadelphia",
    "C": "New York City",
    "D": "London",
    "answer": "C"
  }, {
    "question": "What color is a ruby?",
    "A": "red",
    "B": "black",
    "C": "yellow",
    "D": "blue",
    "answer": "A"
  }, {
    "question": "What color is cartoon character Marge Simpson's hair?",
    "A": "yellow",
    "B": "purple",
    "C": "blue",
    "D": "brown",
    "answer": "C"
  }, {
    "question": "What color is the masthead of USA Today's 'Life' section?",
    "A": "green",
    "B": "purple",
    "C": "red",
    "D": "blue",
    "answer": "B"
  }, {
    "question": "What color is Uncle Sam's goatee?",
    "A": "brown",
    "B": "black ",
    "C": "white",
    "D": "dishwater blond",
    "answer": "C"
  }, {
    "question": "What colors are the two circles in the MasterCard logo?",
    "A": "pink and orange",
    "B": "blue and green",
    "C": "black and white",
    "D": "red and yellow",
    "answer": "D"
  }, {
    "question": "What color is Pepto-Bismol liquid?",
    "A": "pink",
    "B": "blue",
    "C": "clear",
    "D": "green",
    "answer": "A"
  }, {
    "question": "What company makes Oreo cookies?",
    "A": "General Mills",
    "B": "Nabisco",
    "C": "Keebler",
    "D": "Kraft",
    "answer": "B"
  }, {
    "question": "What company makes perfumes called 'Beautiful' and 'Pleasures'?",
    "A": "Estee Lauder",
    "B": "Ralph Lauren",
    "C": "Elizabeth Arden",
    "D": "Calvin Klein",
    "answer": "A"
  }, {
    "question": "What condition is caused by malfunctioning sebaceous glands?",
    "A": "bad breath",
    "B": "shingles",
    "C": "acne",
    "D": "carpal tunnel syndrome",
    "answer": "C"
  }, {
    "question": "What corporation was founded by a candlemaker and a soapmaker?",
    "A": "Simon & Schuster",
    "B": "Procter & Gamble",
    "C": "Johnson & Johnson",
    "D": "Smith & Wesson",
    "answer": "B"
  }, {
    "question": "What country does Bordeaux wine come from?",
    "A": "France",
    "B": "Spain",
    "C": "Australia",
    "D": "United States",
    "answer": "A"
  }, {
    "question": "What country gave us the fashionable headgear called the beret?",
    "A": "Switzerland",
    "B": "China",
    "C": "Mexico",
    "D": "France",
    "answer": "D"
  }, {
    "question": "What country is famous for making wooden shoes?",
    "A": "Russia",
    "B": "Thailand",
    "C": "The Netherlands",
    "D": "Australia",
    "answer": "C"
  }, {
    "question": "What country is the rock group U2 from?",
    "A": "England",
    "B": "Ireland",
    "C": "Belgium",
    "D": "Germany",
    "answer": "B"
  }, {
    "question": "What country was once ruled by shoguns?",
    "A": "China",
    "B": "Japan",
    "C": "North Korea",
    "D": "Taiwan",
    "answer": "B"
  }, {
    "question": "What day of the week is sometimes called 'hump day'?",
    "A": "Wednesday",
    "B": "Thursday",
    "C": "Friday",
    "D": "Saturday",
    "answer": "A"
  }, {
    "question": "What disease does a carcinogen cause?",
    "A": "cancer",
    "B": "influenza",
    "C": "emphysema",
    "D": "heart disease",
    "answer": "A"
  }, {
    "question": "What disease is characterized by a body's inability to properly metabolize glucose?",
    "A": "Influenza",
    "B": "Septicemia",
    "C": "Diabetes",
    "D": "Arthritis",
    "answer": "C"
  }, {
    "question": "What disease is sometimes referred to as the 'royal disease'?",
    "A": "rickets",
    "B": "measles",
    "C": "hemophilia",
    "D": "tuberculosis",
    "answer": "C"
  }, {
    "question": "What do the initials 'E. E.' in poet E. E. Cummings' name stand for?",
    "A": "Edward Estlin",
    "B": "Edmund Earl",
    "C": "Ernest Eakins",
    "D": "Eugene Evan",
    "answer": "A"
  }, {
    "question": "What do you call a young cow?",
    "A": "mare",
    "B": "lamb",
    "C": "kid",
    "D": "calf",
    "answer": "D"
  }, {
    "question": "What do you call three consecutive strikes in bowling?",
    "A": "yahtzee",
    "B": "mulligan",
    "C": "turkey",
    "D": "ace",
    "answer": "C"
  }, {
    "question": "What does a pH level measure?",
    "A": "acidity",
    "B": "density",
    "C": "wavelength",
    "D": "humidity",
    "answer": "A"
  }, {
    "question": "What does an animal produce when it lactates?",
    "A": "sweat",
    "B": "wool",
    "C": "milk",
    "D": "methane",
    "answer": "C"
  }, {
    "question": "What does it mean to work 'pro bono'?",
    "A": "work overtime",
    "B": "work without pay",
    "C": "work as your own boss",
    "D": "not work at all",
    "answer": "B"
  }, {
    "question": "What does the acronym 'REM' stand for?",
    "A": "random energy module",
    "B": "rapid eye movement",
    "C": "red entertainment machine",
    "D": "really energetic music",
    "answer": "B"
  }, {
    "question": "What does the Latin phrase 'e pluribus unum' mean?",
    "A": "What a crazy life.",
    "B": "In God we trust.",
    "C": "from many, one",
    "D": "for the greater good",
    "answer": "C"
  }, {
    "question": "What does the 'ROM' in CD-ROM stand for?",
    "A": "Really Obscure Memory",
    "B": "Run-Other Memory",
    "C": "Random Object Memory",
    "D": "Read-Only Memory",
    "answer": "D"
  }, {
    "question": "What does the Yiddish word 'meshuga' mean?",
    "A": "crazy",
    "B": "sacred",
    "C": "stingy",
    "D": "sweet",
    "answer": "A"
  }, {
    "question": "What exercise apparatus is used during a 'Spinning' class?",
    "A": "stationary bicycle",
    "B": "treadmill",
    "C": "rowing machine",
    "D": "barbells",
    "answer": "A"
  }, {
    "question": "What famous folksinger founded the Institute for the Study of Non-Violence in 1965?",
    "A": "Bob Dylan",
    "B": "Woody Guthrie",
    "C": "Joan Baez",
    "D": "Peter Yarrow",
    "answer": "C"
  }, {
    "question": "What famous radio personality was also the voice of Shaggy on the cartoon 'Scooby-Doo'?",
    "A": "Rush Limbaugh",
    "B": "Casey Kasem",
    "C": "Larry King",
    "D": "Howard Stern",
    "answer": "B"
  }, {
    "question": "What fictional character claims to be 'smarter than the average bear'?",
    "A": "Paddington Bear",
    "B": "Fozzie Bear",
    "C": "Smokey Bear",
    "D": "Yogi Bear",
    "answer": "D"
  }, {
    "question": "What French city is home to a famous international film festival each spring?",
    "A": "Cannes",
    "B": "Marseille",
    "C": "Dijon",
    "D": "Lyon",
    "answer": "A"
  }, {
    "question": "What football player was known as 'The Galloping Ghost'?",
    "A": "Jim Thorpe",
    "B": "Dick Butkus",
    "C": "Red Grange",
    "D": "George Halas",
    "answer": "C"
  }, {
    "question": "What force causes an ice cream cone to fly off of a spinning merry-go-round?",
    "A": "centrifugal",
    "B": "vehicular",
    "C": "gravitational",
    "D": "torsal",
    "answer": "A"
  }, {
    "question": "What former 'Today' show personality played a neighbor on the TV sitcom 'The Hogan Family'?",
    "A": "Jane Pauley",
    "B": "Willard Scott",
    "C": "Deborah Norville",
    "D": "Joe Garagiola",
    "answer": "B"
  }, {
    "question": "What Greek poet wrote 'The Iliad' and 'The Odyssey'?",
    "A": "Sophocles",
    "B": "Plato",
    "C": "Homer",
    "D": "Socrates",
    "answer": "C"
  }, {
    "question": "What high school does the gang from the 'Archie' comic strip attend?",
    "A": "Ridgemont High",
    "B": "Riverdale High",
    "C": "Rumson High",
    "D": "Riker's Island High",
    "answer": "B"
  }, {
    "question": "What important food crop is grown in fields called paddies?",
    "A": "wheat",
    "B": "rye",
    "C": "corn",
    "D": "rice",
    "answer": "D"
  }, {
    "question": "What internet company goes by the acronym AOL?",
    "A": "America Over Lines",
    "B": "America Online",
    "C": "Americans On Links",
    "D": "Americans On LOR",
    "answer": "B"
  }, {
    "question": "What is a balalaika?",
    "A": "musical instrument",
    "B": "Russian peasant",
    "C": "type of hat",
    "D": "breed of shark",
    "answer": "A"
  }, {
    "question": "What is a Dutch oven?",
    "A": "a toaster oven",
    "B": "a microwave",
    "C": "a kettle pot",
    "D": "a sauna",
    "answer": "C"
  }, {
    "question": "What is actor Antonio Banderas native language?",
    "A": "Spanish",
    "B": "Russian",
    "C": "German",
    "D": "French",
    "answer": "A"
  }, {
    "question": "What is an alternate name for the food dish 'Beijing duck'?",
    "A": "Shanghai duck",
    "B": "Peking duck",
    "C": "Hong Kong duck",
    "D": "Brooklyn duck",
    "answer": "B"
  }, {
    "question": "What is another name for the camelopard?",
    "A": "circus",
    "B": "giraffe",
    "C": "cantaloupe",
    "D": "oasis",
    "answer": "B"
  }, {
    "question": "What is another way of writing 'six feet'?",
    "A": "6'",
    "B": "6",
    "C": "6''",
    "D": "6#",
    "answer": "A"
  }, {
    "question": "What is called a 'lorry' in Britain?",
    "A": "a toaster",
    "B": "a truck",
    "C": "a babysitter",
    "D": "an elevator",
    "answer": "B"
  }, {
    "question": "What is considered the proper way to address a duke?",
    "A": "'Your Majesty'",
    "B": "'Your Eminence'",
    "C": "'Your Excellency'",
    "D": "'Your Grace'",
    "answer": "D"
  }, {
    "question": "What is Delta Burke's character's job on the sitcom 'Designing Women'?",
    "A": "fashion designer",
    "B": "graphic designer",
    "C": "interior designer",
    "D": "website designer",
    "answer": "C"
  }, {
    "question": "What is New Mexico's nickname?",
    "A": "'The Desert State'",
    "B": "'Gateway to Paradise'",
    "C": "'Land of Enchantment'",
    "D": "'The Garden State'",
    "answer": "C"
  }, {
    "question": "What is produced during photosynthesis?",
    "A": "hydrogen",
    "B": "nylon",
    "C": "oxygen",
    "D": "light",
    "answer": "C"
  }, {
    "question": "What is the 7-Eleven company's trademarked name for its super-large sodas?",
    "A": "Big Slurp",
    "B": "Big Gulp",
    "C": "Big Drink",
    "D": "Big Sip",
    "answer": "B"
  }, {
    "question": "What is the approximate speed of light?",
    "A": "165 miles per hour",
    "B": "122,000 miles per hour",
    "C": "186,000 miles per second",
    "D": "293,000 miles per second",
    "answer": "C"
  }, {
    "question": "What is the art of elegant handwriting called?",
    "A": "calligraphy",
    "B": "engraving",
    "C": "decoupage",
    "D": "lithography",
    "answer": "A"
  }, {
    "question": "What is the baseball term for a batter who substitutes for another batter?",
    "A": "switchhitter",
    "B": "shadow hitter",
    "C": "clip hitter ",
    "D": "pinch hitter",
    "answer": "D"
  }, {
    "question": "What is the birthstone for the month of January?",
    "A": "topaz",
    "B": "garnet",
    "C": "opal",
    "D": "diamond",
    "answer": "B"
  }, {
    "question": "What is the capital of New Zealand?",
    "A": "Sydney",
    "B": "Wellington",
    "C": "Auckland",
    "D": "Melbourne",
    "answer": "B"
  }, {
    "question": "What is the capital of North Dakota?",
    "A": "Bismarck",
    "B": "Fargo",
    "C": "Sioux Falls",
    "D": "Pierre",
    "answer": "A"
  }, {
    "question": "What is the chemical process wherein a solid is turned to a liquid via the application of heat?",
    "A": "distillation",
    "B": "photosynthesis",
    "C": "freezing",
    "D": "melting",
    "answer": "D"
  }, {
    "question": "What is the colored part of the eye called?",
    "A": "iris",
    "B": "pupil",
    "C": "retina",
    "D": "cochlea",
    "answer": "A"
  }, {
    "question": "What is the correct spelling of New Mexico's largest city?",
    "A": "Albuqerque",
    "B": "Albuquerque",
    "C": "Albequerque",
    "D": "Santa Fe",
    "answer": "B"
  }, {
    "question": "What is the final word of the Pledge of Allegiance?",
    "A": "America",
    "B": "stands",
    "C": "indivisible",
    "D": "all",
    "answer": "D"
  }, {
    "question": "What is the largest animal ever to live on Earth?",
    "A": "blue whale",
    "B": "giant squid",
    "C": "woolly mammoth",
    "D": "Tyrannosaurus",
    "answer": "A"
  }, {
    "question": "What is the largest city in Pennsylvania?",
    "A": "Philadelphia",
    "B": "Stewartsville",
    "C": "Harrisburg",
    "D": "Pittsburgh",
    "answer": "A"
  }, {
    "question": "What is the last book of the New Testament?",
    "A": "Revelation",
    "B": "Judges",
    "C": "Ruth",
    "D": "John",
    "answer": "A"
  }, {
    "question": "What is the last letter of the Greek alphabet?",
    "A": "omicron",
    "B": "omega",
    "C": "upsilon",
    "D": "zeta",
    "answer": "B"
  }, {
    "question": "What is the meaning of 'Betelgeuse', the name of the brightest star in the constellation Orion?",
    "A": "blossom on a shield",
    "B": "eye of the archer",
    "C": "the lion's mane",
    "D": "armpit of the giant",
    "answer": "D"
  }, {
    "question": "What is the medical term for a doctor's identification of a disease?",
    "A": "Hypnosis",
    "B": "Prognosis",
    "C": "Trichinosis",
    "D": "Diagnosis",
    "answer": "D"
  }, {
    "question": "What is the more common name for the disease 'pertussis'?",
    "A": "whooping cough",
    "B": "tennis elbow",
    "C": "black lung",
    "D": "German measles",
    "answer": "A"
  }, {
    "question": "What is the most popular month for weddings in America?",
    "A": "January",
    "B": "May",
    "C": "August",
    "D": "November",
    "answer": "C"
  }, {
    "question": "What is the name for the thin board used to mix colors while painting?",
    "A": "pestle",
    "B": "easel",
    "C": "shoe",
    "D": "palette",
    "answer": "D"
  }, {
    "question": "What is the name of Howard Stern's female on-air sidekick?",
    "A": "Allison Norris",
    "B": "Jackie Reeses",
    "C": "Jackie Martling",
    "D": "Robin Quivers",
    "answer": "D"
  }, {
    "question": "What is the name of Mario's brother in the 'Super Mario' video games?",
    "A": "Louis",
    "B": "Luigi",
    "C": "Luciano",
    "D": "Zelda",
    "answer": "B"
  }, {
    "question": "What is the name of Raggedy Ann's doll brother?",
    "A": "Red",
    "B": "Freckles",
    "C": "Randy",
    "D": "Andy",
    "answer": "D"
  }, {
    "question": "What is the name of the baby who appears in cartoons and comic strips with Popeye the Sailor?",
    "A": "Pun'kin",
    "B": "Lamikins",
    "C": "Suga'baby",
    "D": "Swee'pea",
    "answer": "D"
  }, {
    "question": "What is the name of the character Played by Woody Allen in the 1967 James Bond film 'Casino Royale'?",
    "A": "Dr. Evil",
    "B": "Q",
    "C": "Little Jimmy Bond",
    "D": "M",
    "answer": "C"
  }, {
    "question": "What is the name of the female character played by comedian Flip Wilson on his 1970s TV show?",
    "A": "Miss Jackie",
    "B": "Elizabeth Sanford",
    "C": "Geraldine Jones",
    "D": "Gladys Knight",
    "answer": "C"
  }, {
    "question": "What is the name of the fruit that is half tangerine and half grapefruit?",
    "A": "graperine",
    "B": "tangefruit",
    "C": "tangelo",
    "D": "kumquat",
    "answer": "C"
  }, {
    "question": "What is the name of the mountain where the mythological Greek gods live?",
    "A": "Jupiter",
    "B": "Olympus",
    "C": "Vesuvius",
    "D": "Valhalla",
    "answer": "B"
  }, {
    "question": "What is the name of the Newtonian law that states 'An object in Motion tends to stay in motion'?",
    "A": "Law of Inertia",
    "B": "Law of Thermodynamics",
    "C": "Law of Relativity",
    "D": "Law of Gravitation",
    "answer": "A"
  }, {
    "question": "What is the name of the POW camp where 'Hogan's Heroes' are held?",
    "A": "Stalag 13",
    "B": "Alcatraz 17",
    "C": "Devil's Island",
    "D": "Leavenworth",
    "answer": "A"
  }, {
    "question": "What is the name of the South African political party that was headed by Nelson Mandela?",
    "A": "African National Congress",
    "B": "South African Democrats",
    "C": "Inkatha Freedom Party",
    "D": "Aryan National Assembly",
    "answer": "A"
  }, {
    "question": "What is the name of the StarKist tuna mascot?",
    "A": "Charlie",
    "B": "Sam",
    "C": "Al",
    "D": "Morris",
    "answer": "A"
  }, {
    "question": "What is the name of the Swedish company that specializes in affordable furniture?",
    "A": "Gambro",
    "B": "Electrolux",
    "C": "Saab",
    "D": "IKEA",
    "answer": "D"
  }, {
    "question": "What is the national animal of Australia?",
    "A": "koala",
    "B": "kangaroo",
    "C": "platypus",
    "D": "alligator",
    "answer": "B"
  }, {
    "question": "What is the nickname of Florida's controversial death row electric chair?",
    "A": "Old Yeller",
    "B": "Old Geezer",
    "C": "Old Smoky",
    "D": "Old Sparky",
    "answer": "D"
  }, {
    "question": "What is the normal playback speed of a 12\" long-playing record?",
    "A": "12 1/2 rpm",
    "B": "33 1/3 rpm",
    "C": "45 rpm",
    "D": "100 rpm",
    "answer": "B"
  }, {
    "question": "What is the official language of The Netherlands?",
    "A": "Danish",
    "B": "Swedish",
    "C": "German",
    "D": "Dutch",
    "answer": "D"
  }, {
    "question": "What is the oldest continuously run sporting event in the United States?",
    "A": "Westminster Dog Show",
    "B": "Boston Marathon",
    "C": "Kentucky Derby",
    "D": "Indianapolis 500",
    "answer": "C"
  }, {
    "question": "What is the oldest permanent European settlement in the United States?",
    "A": "St. Augustine, Florida",
    "B": "Plymouth, Massachusetts",
    "C": "Newport News, Virginia",
    "D": "Charlotte, North Carolina",
    "answer": "A"
  }, {
    "question": "What is the principal ingredient in traditional cole slaw?",
    "A": "lettuce",
    "B": "spinach ",
    "C": "cabbage",
    "D": "chicory",
    "answer": "C"
  }, {
    "question": "What is the proletariat?",
    "A": "the homeless",
    "B": "the royalty",
    "C": "the upper class",
    "D": "the working class",
    "answer": "D"
  }, {
    "question": "What is the proper nautical use of an anchor?",
    "A": "to catch large fish",
    "B": "to calculate water depth",
    "C": "to hold a ship in place",
    "D": "to damage other boats",
    "answer": "C"
  }, {
    "question": "What is the singular form of the word 'graffiti'?",
    "A": "graffita",
    "B": "graffitem",
    "C": "graffito",
    "D": "graffitus",
    "answer": "C"
  }, {
    "question": "What is the square root of 81 squared?",
    "A": "9",
    "B": "27",
    "C": "81",
    "D": "729",
    "answer": "C"
  }, {
    "question": "What is the technical term for someone who studies fish?",
    "A": "entomologist",
    "B": "ichthyologist",
    "C": "marinologist",
    "D": "herpetologist",
    "answer": "B"
  }, {
    "question": "What is the technical term for the offspring of a female donkey and a male horse?",
    "A": "burro",
    "B": "dorse",
    "C": "hinny",
    "D": "honker",
    "answer": "C"
  }, {
    "question": "What is the traditional 20th wedding anniversary gift?",
    "A": "paper",
    "B": "leather",
    "C": "china",
    "D": "silver",
    "answer": "C"
  }, {
    "question": "What is varicella?",
    "A": "a fancy pasta",
    "B": "a type of opera",
    "C": "the chicken pox virus",
    "D": "ancient Roman poetry",
    "answer": "C"
  }, {
    "question": "What is your astrological sign if you were born on Halloween?",
    "A": "Scorpio",
    "B": "Capricorn",
    "C": "Libra",
    "D": "Cancer",
    "answer": "A"
  }, {
    "question": "What is your hallux?",
    "A": "earlobe",
    "B": "tongue",
    "C": "eyelid",
    "D": "big toe",
    "answer": "D"
  }, {
    "question": "What kind of angle is formed where two perpendicular lines meet?",
    "A": "obtuse",
    "B": "acute",
    "C": "right",
    "D": "invisible",
    "answer": "C"
  }, {
    "question": "What kind of animal is a peregrine?",
    "A": "moose",
    "B": "cat",
    "C": "bird",
    "D": "fish",
    "answer": "C"
  }, {
    "question": "What kind of animal is cartoon character Tennessee Tuxedo?",
    "A": "cat",
    "B": "skunk",
    "C": "walrus",
    "D": "penguin",
    "answer": "D"
  }, {
    "question": "What kind of car did Burt Reynolds drive in the movie 'Smokey and the Bandit'?",
    "A": "Lamborghini",
    "B": "Camaro",
    "C": "Corvette",
    "D": "Trans Am",
    "answer": "D"
  }, {
    "question": "What kind of flying contraption is featured in the movie 'Chitty Chitty Bang Bang'?",
    "A": "boat",
    "B": "car",
    "C": "truck",
    "D": "bike",
    "answer": "B"
  }, {
    "question": "What kind of item is a ginsu?",
    "A": "radio",
    "B": "knife",
    "C": "toothbrush",
    "D": "martial arts weapon",
    "answer": "B"
  }, {
    "question": "What kind of worker uses a 'paddy wagon'?",
    "A": "limo driver",
    "B": "police officer",
    "C": "rice farmer",
    "D": "paramedic",
    "answer": "B"
  }, {
    "question": "What letters are on the '3' button of a touch-tone telephone?",
    "A": "ABC",
    "B": "DEF",
    "C": "GHI",
    "D": "WXY",
    "answer": "B"
  }, {
    "question": "What liqueur is used to make a Pink Lady cocktail pink?",
    "A": "grenadine",
    "B": "schnapps",
    "C": "triple sec",
    "D": "pernod",
    "answer": "A"
  }, {
    "question": "What literary work is the source of the quote 'Abandon every hope, all you who enter here'?",
    "A": "'Paradise Lost'",
    "B": "'The Divine Comedy'",
    "C": "'Beowulf'",
    "D": "'Twilight'",
    "answer": "B"
  }, {
    "question": "What mathematical term is used to describe the average of a series of numbers?",
    "A": "median",
    "B": "mode",
    "C": "majority",
    "D": "mean",
    "answer": "D"
  }, {
    "question": "What metal device is used by police to immobilize the wheels of repeat parking offenders?",
    "A": "Brooklyn clamp",
    "B": "Denver boot",
    "C": "LoJack",
    "D": "The Club",
    "answer": "B"
  }, {
    "question": "What Mexican holiday takes place on May 5th?",
    "A": "Mexican Independence Day",
    "B": "Santa Anna's Birthday",
    "C": "Cinco de Mayo",
    "D": "Christmas",
    "answer": "C"
  }, {
    "question": "What nationality was Karl Marx?",
    "A": "Russian",
    "B": "German",
    "C": "Danish",
    "D": "English",
    "answer": "B"
  }, {
    "question": "What Native American tribe did chief Crazy Horse lead?",
    "A": "Apache",
    "B": "Comanche",
    "C": "Sioux",
    "D": "Iroquois",
    "answer": "C"
  }, {
    "question": "What native empire controlled Large areas of South African Territory during the 19th century?",
    "A": "Hutu",
    "B": "Zulu",
    "C": "Aztec",
    "D": "Masai",
    "answer": "B"
  }, {
    "question": "What New Age musician released a 1998 album titled 'King of the Pan Flute'?",
    "A": "Zamfir",
    "B": "Yanni",
    "C": "Vangelis",
    "D": "Kenny G",
    "answer": "A"
  }, {
    "question": "What new token was recently added to the Monopoly board game?",
    "A": "piggybank",
    "B": "sack of money",
    "C": "globe",
    "D": "telephone",
    "answer": "B"
  }, {
    "question": "What newspaper do Lois Lane and Clark Kent work for?",
    "A": "The Bugle",
    "B": "The Daily Planet",
    "C": "The Metropolis Tribune",
    "D": "The New York Times",
    "answer": "B"
  }, {
    "question": "What part of the human body does a gastroenterologist examine?",
    "A": "brain",
    "B": "skeleton",
    "C": "stomach",
    "D": "nose",
    "answer": "C"
  }, {
    "question": "What part of the world was once known as Cathay?",
    "A": "China",
    "B": "India",
    "C": "Iran",
    "D": "Indonesia",
    "answer": "A"
  }, {
    "question": "What people ruled the Andes Mountains until they were conquered by the Spanish in 1532?",
    "A": "Pueblo",
    "B": "Aztec",
    "C": "Inca",
    "D": "Apache",
    "answer": "C"
  }, {
    "question": "What place is named in the title of the 1979 live album by rock legends Cheap Trick?",
    "A": "Budapest",
    "B": "Budokan",
    "C": "Bhutan",
    "D": "Britain",
    "answer": "B"
  }, {
    "question": "What popular toy is featured in the film 'The Hudsucker Proxy'?",
    "A": "Beanie Babies",
    "B": "Hula Hoop",
    "C": "Lincoln Logs",
    "D": "Lite Brite",
    "answer": "B"
  }, {
    "question": "What pro wrestler grapples with Sylvester Stallone in the movie 'Rocky III'?",
    "A": "Dolph Lundgren",
    "B": "Hulk Hogan",
    "C": "Andre the Giant",
    "D": "The Iron Sheik",
    "answer": "B"
  }, {
    "question": "What professional sports team plays its home games in the Alamodome?",
    "A": "New York Jets",
    "B": "Detroit Tigers",
    "C": "Boston Bruins",
    "D": "San Antonio Spurs",
    "answer": "D"
  }, {
    "question": "What rank entitles a general in the US Army to wear three stars?",
    "A": "brigadier general",
    "B": "corporal general",
    "C": "lieutenant general",
    "D": "major general",
    "answer": "C"
  }, {
    "question": "What recording artist claims that sportscaster Marv Albert was a major influence on his sound?",
    "A": "David Lee Roth",
    "B": "Meat Loaf",
    "C": "Axl Rose",
    "D": "Chuck D",
    "answer": "D"
  }, {
    "question": "What singer appeared in the 1992 baseball film 'A League of Their Own'?",
    "A": "Brandy",
    "B": "Madonna",
    "C": "Garth Brooks",
    "D": "Whitney Houston",
    "answer": "B"
  }, {
    "question": "What sport is featured in the 1996 movie 'Kingpin'?",
    "A": "wrestling",
    "B": "golf",
    "C": "chess",
    "D": "bowling",
    "answer": "D"
  }, {
    "question": "What sport is known as 'The Sport of Kings'?",
    "A": "polo",
    "B": "archery",
    "C": "yachting",
    "D": "horse racing",
    "answer": "D"
  }, {
    "question": "What sporting event is held annually on Memorial Day weekend?",
    "A": "Iditarod",
    "B": "Kentucky Derby",
    "C": "Indianapolis 500",
    "D": "Super Bowl",
    "answer": "C"
  }, {
    "question": "What substance was used for blood in the famous shower scene from the movie 'Psycho'?",
    "A": "tomato juice",
    "B": "red wine",
    "C": "chocolate syrup",
    "D": "ketchup",
    "answer": "C"
  }, {
    "question": "What tea is known for its distinctive bergamot flavor?",
    "A": "Earl Grey",
    "B": "Darjeeling",
    "C": "English Breakfast",
    "D": "Prince of Wales",
    "answer": "A"
  }, {
    "question": "What team has won the most World Series?",
    "A": "Chicago Cubs",
    "B": "Los Angeles Dodgers",
    "C": "New York Yankees",
    "D": "San Francisco Giants",
    "answer": "C"
  }, {
    "question": "What term describes a tribe that has no set homeland and wanders from place to place?",
    "A": "Nomadic",
    "B": "Pedantic",
    "C": "Schematic",
    "D": "Cathartic",
    "answer": "A"
  }, {
    "question": "What term describes a word created by rearranging the letters of another word?",
    "A": "onomatopoeia",
    "B": "malapropism",
    "C": "anagram",
    "D": "antonym",
    "answer": "C"
  }, {
    "question": "What term describes someone who does not believe in the existence of God?",
    "A": "hedonist",
    "B": "deist",
    "C": "agnostic",
    "D": "atheist",
    "answer": "D"
  }, {
    "question": "What term describes the passing of genetic traits from one generation to the next?",
    "A": "heredity",
    "B": "heresy",
    "C": "homogeneity",
    "D": "hemoglobin",
    "answer": "A"
  }, {
    "question": "What term is used to describe a group of fish?",
    "A": "knot",
    "B": "drape",
    "C": "school",
    "D": "gaggle",
    "answer": "C"
  }, {
    "question": "What term is used to describe a group of geese?",
    "A": "gaggle",
    "B": "gang",
    "C": "gander",
    "D": "grist",
    "answer": "A"
  }, {
    "question": "What topic does Spin magazine primarily cover?",
    "A": "politics",
    "B": "washing machines",
    "C": "books",
    "D": "music",
    "answer": "D"
  }, {
    "question": "What type of meat is on a traditional Reuben sandwich?",
    "A": "turkey",
    "B": "bologna",
    "C": "corned beef",
    "D": "pepperoni",
    "answer": "C"
  }, {
    "question": "What type of substance is 'terra-cotta'?",
    "A": "metal",
    "B": "ceramic",
    "C": "wood",
    "D": "glass",
    "answer": "B"
  }, {
    "question": "What U.S. president is mentioned by name in the opening theme song of TV's 'All in the Family'?",
    "A": "Calvin Coolidge",
    "B": "Harry Truman",
    "C": "Herbert Hoover",
    "D": "Richard Nixon",
    "answer": "C"
  }, {
    "question": "What was Ludwig Van Beethoven's final symphony?",
    "A": "Ninth",
    "B": "Tenth",
    "C": "Eleventh",
    "D": "Twelfth",
    "answer": "A"
  }, {
    "question": "What was Richard Nixon's middle name?",
    "A": "Michael",
    "B": "Milhous",
    "C": "Mortimer",
    "D": "Matthew",
    "answer": "B"
  }, {
    "question": "What was the birth name of civil rights leader Malcolm X?",
    "A": "Michael Brown",
    "B": "Malcolm Little",
    "C": "Malcolm Lincoln",
    "D": "Michael Lloyd",
    "answer": "B"
  }, {
    "question": "What was the first American college to become coeducational?",
    "A": "Oberlin College",
    "B": "Dartmouth College",
    "C": "Grinnell College",
    "D": "Antioch College",
    "answer": "A"
  }, {
    "question": "What was the name of Huey Lewis' band?",
    "A": "The News",
    "B": "The Attractions",
    "C": "The Silver Bullet Band",
    "D": "Louie and Dewey",
    "answer": "A"
  }, {
    "question": "What was the name of the 1999 art exhibit that sparked a national debate about censorship?",
    "A": "'Sticks & Stones'",
    "B": "'Pulsation'",
    "C": "'Black & White'",
    "D": "'Sensation'",
    "answer": "D"
  }, {
    "question": "What was the name of the first nuclear-powered submarine?",
    "A": "Nautilus",
    "B": "Neptune",
    "C": "Nordenfelt III",
    "D": "Nicholas",
    "answer": "A"
  }, {
    "question": "What was the name of the first ship to sail around the world?",
    "A": "Triton",
    "B": "Victoria",
    "C": "Magellan",
    "D": "Elizabeth II",
    "answer": "B"
  }, {
    "question": "What was the original name of the Apple Macintosh XL computer?",
    "A": "Lisa 2",
    "B": "Mac Daddy",
    "C": "Granny Smith",
    "D": "Orange XL",
    "answer": "A"
  }, {
    "question": "What was the title of Beethoven's only completed opera?",
    "A": "'Faust'",
    "B": "'The Silence'",
    "C": "'Immortal Beloved'",
    "D": "'Fidelio'",
    "answer": "D"
  }, {
    "question": "What were the first names of the early American explorers Lewis and Clark?",
    "A": "Morgan and Mason",
    "B": "Meriwether and William",
    "C": "Cabot and Joseph",
    "D": "Meredith and George",
    "answer": "B"
  }, {
    "question": "What's the popular name of the breakfast meal consisting of sausages wrapped in pancakes?",
    "A": "ducks in a pond",
    "B": "pigs in a blanket",
    "C": "cows in a pasture",
    "D": "dogs in the oven",
    "answer": "B"
  }, {
    "question": "What's the third letter of the Greek alphabet?",
    "A": "delta",
    "B": "gamma",
    "C": "phi",
    "D": "theta",
    "answer": "B"
  }, {
    "question": "What's unique about a skeleton key?",
    "A": "It opens many locks.",
    "B": "It's made of bone.",
    "C": "It's extremely old.",
    "D": "It hangs in a closet.",
    "answer": "A"
  }, {
    "question": "When daylight-saving time arrives in the spring, how do most Americans turn their clocks?",
    "A": "one hour forward",
    "B": "one hour backward",
    "C": "two hours forward",
    "D": "two hours backward",
    "answer": "B"
  }, {
    "question": "When driving, which of the following gestures means 'left turn'?",
    "A": "arm bent upwards",
    "B": "thumbs up",
    "C": "closed fist",
    "D": "arm straight out",
    "answer": "D"
  }, {
    "question": "In the presidential election of 1932, how many U.S. states did FDR not win the electoral votes for?",
    "A": "six",
    "B": "seven",
    "C": "eight",
    "D": "ten",
    "answer": "A"
  }, {
    "question": "When it comes to measuring horses, how long is a 'hand'?",
    "A": "four inches",
    "B": "seven inches",
    "C": "ten inches",
    "D": "two feet",
    "answer": "A"
  }, {
    "question": "When it first appeared on the Internet, amazon.com sold only what?",
    "A": "books",
    "B": "compact discs",
    "C": "cars",
    "D": "clothes",
    "answer": "A"
  }, {
    "question": "When it's noon in New York during daylight-saving time, what time is it in Honolulu?",
    "A": "6:00 a.m.",
    "B": "6:30 a.m.",
    "C": "7:00 a.m.",
    "D": "8:00 a.m.",
    "answer": "A"
  }, {
    "question": "Where are fireworks first known to have been developed?",
    "A": "Italy",
    "B": "China",
    "C": "Great Britain",
    "D": "Greece",
    "answer": "B"
  }, {
    "question": "Where did jazz great Sun Ra claim he was born?",
    "A": "Atlantis",
    "B": "Mount Olympus",
    "C": "Saturn",
    "D": "in a saxophone",
    "answer": "C"
  }, {
    "question": "Where did Lewis and Clark begin their famous expedition in 1804?",
    "A": "Seattle",
    "B": "St. Louis",
    "C": "New Orleans",
    "D": "Washington, DC",
    "answer": "B"
  }, {
    "question": "Where did the Exxon Valdez run aground in March of 1989?",
    "A": "Monterey Bay",
    "B": "Prince William Sound",
    "C": "Cape Cod",
    "D": "Gulf of Mexico",
    "answer": "B"
  }, {
    "question": "Where is Ghirardelli Square located?",
    "A": "Milan",
    "B": "Rome",
    "C": "Washington DC",
    "D": "San Francisco",
    "answer": "D"
  }, {
    "question": "Where is the Louvre museum?",
    "A": "Paris",
    "B": "Lyon",
    "C": "Geneva",
    "D": "Vichy",
    "answer": "A"
  }, {
    "question": "Where was the chicken first domesticated?",
    "A": "France",
    "B": "India",
    "C": "Peru",
    "D": "Zaire",
    "answer": "B"
  }, {
    "question": "Where would you typically find a bailiff?",
    "A": "grocery store",
    "B": "courtroom",
    "C": "football stadium",
    "D": "doctor's office",
    "answer": "B"
  }, {
    "question": "Where is the Frank Lloyd Wright-designed house known as Falling Water?",
    "A": "Connecticut",
    "B": "Pennsylvania",
    "C": "Illinois",
    "D": "New York",
    "answer": "B"
  }, {
    "question": "Which actress played a pointy-eared Vulcan in the movie 'Star Trek II: The Wrath of Khan'?",
    "A": "Whoopi Goldberg",
    "B": "Jennifer Grey",
    "C": "Kirstie Alley",
    "D": "Helen Hunt",
    "answer": "C"
  }, {
    "question": "Which American colony, known for its religious tolerance, did Roger Williams found in 1636?",
    "A": "Massachusetts",
    "B": "Rhode Island",
    "C": "Virginia",
    "D": "Vermont",
    "answer": "B"
  }, {
    "question": "Which brand of cat food claims it's so tasty that 'cats ask for it by name'?",
    "A": "Fancy Feast",
    "B": "Cat Chow",
    "C": "Meow Mix",
    "D": "9-Lives",
    "answer": "C"
  }, {
    "question": "Which character on the TV show 'Friends' is a chef?",
    "A": "Joey",
    "B": "Monica",
    "C": "Ross",
    "D": "Rachel",
    "answer": "B"
  }, {
    "question": "Which company holds an annual self-named 'Bake-Off'?",
    "A": "Betty Crocker",
    "B": "Duncan Hines",
    "C": "Pillsbury",
    "D": "Keebler",
    "answer": "C"
  }, {
    "question": "Which famed modeling agency shares its name with a top U.S. automaker?",
    "A": "Ford",
    "B": "Chevrolet",
    "C": "Chrysler",
    "D": "Saturn",
    "answer": "A"
  }, {
    "question": "Which fast food chain used the advertising slogan, 'Where's the beef?'",
    "A": "Wendy's",
    "B": "Kentucky Fried Chicken",
    "C": "Burger King",
    "D": "McDonald's",
    "answer": "A"
  }, {
    "question": "Which of the boys on the TV show 'My Three Sons' is adopted?",
    "A": "Mike",
    "B": "Ernie",
    "C": "Chip",
    "D": "Robbie",
    "answer": "B"
  }, {
    "question": "Which of the following articles of clothing has a hood?",
    "A": "parka",
    "B": "kilt",
    "C": "lederhosen",
    "D": "sarong",
    "answer": "A"
  }, {
    "question": "Which of the following beverages is brewed from the leaves of a plant?",
    "A": "tea",
    "B": "coffee",
    "C": "ginger ale",
    "D": "wine",
    "answer": "A"
  }, {
    "question": "Which of the following breakfast cereals is shaped like the letter O?",
    "A": "Life Corn",
    "B": "Chex",
    "C": "Cheerios",
    "D": "Raisin Bran",
    "answer": "C"
  }, {
    "question": "Which of the following candies is traditionally fruit flavored?",
    "A": "M&M's",
    "B": "Skittles",
    "C": "Reese's Pieces",
    "D": "Junior Mints",
    "answer": "B"
  }, {
    "question": "Which of the following is a natural sugar found in most fruits?",
    "A": "necrose",
    "B": "fructose",
    "C": "bellicose",
    "D": "pantiose",
    "answer": "B"
  }, {
    "question": "Which of the following is a sports award?",
    "A": "Oscar",
    "B": "Emmy",
    "C": "Nobel",
    "D": "Espy",
    "answer": "D"
  }, {
    "question": "Which of the following is about the Watergate scandal?",
    "A": "'All the King's Men'",
    "B": "'All the Pretty Horses'",
    "C": "'All the President's Men'",
    "D": "'All the Right Moves'",
    "answer": "C"
  }, {
    "question": "Which of the following is most commonly kept in a terrarium?",
    "A": "money",
    "B": "books",
    "C": "ice",
    "D": "plants",
    "answer": "D"
  }, {
    "question": "Which of the following is not a flavor of Ben & Jerry's Ice Cream?",
    "A": "Wavy Gravy",
    "B": "Bovinity Divinity",
    "C": "Cutie Patootie",
    "D": "Chubby Hubby",
    "answer": "C"
  }, {
    "question": "Which of the following is not a TV cartoon duo?",
    "A": "Chip and Dale",
    "B": "Beavis and Butt-head",
    "C": "Simon and Garfunkel",
    "D": "Tom and Jerry",
    "answer": "C"
  }, {
    "question": "Which of the following is not in Nevada?",
    "A": "Liberace Museum",
    "B": "Pikes Peak",
    "C": "Lake Mead",
    "D": "Hoover Dam",
    "answer": "B"
  }, {
    "question": "Which of the following must be obtained by foreigners wishing to permanently reside in the US?",
    "A": "visa",
    "B": "bill of landing",
    "C": "driver's license",
    "D": "carte blanche",
    "answer": "A"
  }, {
    "question": "Which of the following requires the use of at least two needles?",
    "A": "macrame",
    "B": "braiding",
    "C": "crocheting",
    "D": "hand knitting",
    "answer": "D"
  }, {
    "question": "Which of the following words does not appear in the Lewis Carroll poem 'Jabberwocky'?",
    "A": "brillig",
    "B": "bandersnatch",
    "C": "wabe",
    "D": "grelp",
    "answer": "D"
  }, {
    "question": "Which of the Three Stooges was not related to the others?",
    "A": "Moe",
    "B": "Larry",
    "C": "Curly",
    "D": "Shemp",
    "answer": "B"
  }, {
    "question": "Which of these actors did one-handed push-ups on stage at the 1992 Academy Awards?",
    "A": "Sylvester Stallone",
    "B": "Jack Nicholson",
    "C": "Jack Palance",
    "D": "Marisa Tomei",
    "answer": "C"
  }, {
    "question": "Which of these animals lays eggs?",
    "A": "cow",
    "B": "gerbil",
    "C": "frog",
    "D": "elephant",
    "answer": "C"
  }, {
    "question": "Which of these animals shares its name with a luxury car?",
    "A": "yak",
    "B": "gazelle",
    "C": "sloth",
    "D": "jaguar",
    "answer": "D"
  }, {
    "question": "Which of these are not legumes?",
    "A": "beans",
    "B": "peas",
    "C": "radishes",
    "D": "peanuts",
    "answer": "C"
  }, {
    "question": "Which of these Australian birds is most closely related to the ostrich?",
    "A": "puffin",
    "B": "kookaburra",
    "C": "cockatoo",
    "D": "emu",
    "answer": "D"
  }, {
    "question": "Which of these candy bars was named for a baseball player?",
    "A": "Baby Ruth",
    "B": "Clark Bar",
    "C": "Reggie Bar",
    "D": "Butterfinger",
    "answer": "A"
  }, {
    "question": "Which of these college football programs has produced the most Heisman Trophy winners?",
    "A": "Notre Dame",
    "B": "USC",
    "C": "Oklahoma",
    "D": "Michigan",
    "answer": "A"
  }, {
    "question": "Which of these colors is a shade of blue?",
    "A": "ochre",
    "B": "periwinkle",
    "C": "mauve",
    "D": "ecru",
    "answer": "B"
  }, {
    "question": "Which of these countries does not participate in NAFTA?",
    "A": "United States",
    "B": "Canada",
    "C": "Mexico",
    "D": "Guatemala",
    "answer": "D"
  }, {
    "question": "Which of these companies is not an online stock brokerage?",
    "A": "E*Trade",
    "B": "EDigital",
    "C": "Datek Online",
    "D": "DLJ Direct",
    "answer": "B"
  }, {
    "question": "Which of these countries is not in Europe?",
    "A": "Italy",
    "B": "Spain",
    "C": "Greece",
    "D": "Israel",
    "answer": "D"
  }, {
    "question": "Which of these countries was not a member of the Axis nations during World War II?",
    "A": "Germany",
    "B": "Italy",
    "C": "Spain",
    "D": "Japan",
    "answer": "C"
  }, {
    "question": "Which of these Democrats lost to Ronald Reagan in the 1984 presidential elections?",
    "A": "Michael Dukakis",
    "B": "Walter Mondale",
    "C": "Gary Hart",
    "D": "Jimmy Carter",
    "answer": "B"
  }, {
    "question": "Which of these dishes is made from pig intestines?",
    "A": "haggis",
    "B": "chitlins",
    "C": "grits",
    "D": "chop suey",
    "answer": "B"
  }, {
    "question": "Which of these evangelists is a cousin of rocker Jerry Lee Lewis?",
    "A": "Billy Graham",
    "B": "Oral Roberts",
    "C": "Jerry Falwell",
    "D": "Jimmy Swaggart",
    "answer": "D"
  }, {
    "question": "Which of these famous baseball figures was once acquitted at court-martial for insubordination?",
    "A": "Abner Doubleday",
    "B": "Ty Cobb",
    "C": "Jackie Robinson",
    "D": "Billy Martin",
    "answer": "C"
  }, {
    "question": "Which of these fashion designers was born in the United States?",
    "A": "Laura Ashley",
    "B": "Helmut Lang",
    "C": "Donna Karan",
    "D": "Christian Dior",
    "answer": "C"
  }, {
    "question": "Which of these foods could contain small amounts of naturally occurring opium?",
    "A": "chocolate truffles",
    "B": "poppy seed bagels",
    "C": "carbonated soda",
    "D": "sesame chicken",
    "answer": "B"
  }, {
    "question": "Which of these foods could you catch at sea?",
    "A": "shallot",
    "B": "stollen",
    "C": "scallop",
    "D": "scone",
    "answer": "C"
  }, {
    "question": "Which of these foods is poisonous to dogs?",
    "A": "peanut butter",
    "B": "bananas",
    "C": "chocolate",
    "D": "olives",
    "answer": "C"
  }, {
    "question": "Which of these games is not played with cards?",
    "A": "baccarat",
    "B": "rummy",
    "C": "craps",
    "D": "solitaire",
    "answer": "C"
  }, {
    "question": "Which of these foods is not traditionally considered kosher?",
    "A": "citrus fruits",
    "B": "barley",
    "C": "chicken",
    "D": "shellfish",
    "answer": "D"
  }, {
    "question": "Which of these Hemingway characters is a newspaperman?",
    "A": "Jake Barnes",
    "B": "Rogelio Gomez",
    "C": "Frederic Henry",
    "D": "John MacWalsey",
    "answer": "A"
  }, {
    "question": "Which of these holidays is not attached to a specific date?",
    "A": "Independence Day",
    "B": "New Year's Day",
    "C": "Thanksgiving",
    "D": "Christmas",
    "answer": "C"
  }, {
    "question": "Which of these horror films spawned the most sequels?",
    "A": "'Scream'",
    "B": "'Jaws'",
    "C": "'Halloween'",
    "D": "'Friday the 13th'",
    "answer": "D"
  }, {
    "question": "Which of these household pets should be vaccinated for parvovirus?",
    "A": "hamster",
    "B": "cat",
    "C": "dog",
    "D": "bird",
    "answer": "C"
  }, {
    "question": "Which of these is a commonly-known investment account?",
    "A": "CNN",
    "B": "EMC",
    "C": "IRA",
    "D": "IRS",
    "answer": "C"
  }, {
    "question": "Which of these is a fish?",
    "A": "sea horse",
    "B": "sea cow",
    "C": "sea snake",
    "D": "sea lion",
    "answer": "A"
  }, {
    "question": "Which of these is a government agency established to protect investors?",
    "A": "AAA",
    "B": "NBA",
    "C": "SEC",
    "D": "MADD",
    "answer": "C"
  }, {
    "question": "Which of these is a member of the cucumber family?",
    "A": "green pepper",
    "B": "watermelon",
    "C": "potato",
    "D": "green bean",
    "answer": "B"
  }, {
    "question": "Which of these is a slang term for 'police'?",
    "A": "fuzz",
    "B": "shrinks",
    "C": "bean counters",
    "D": "aardvarks",
    "answer": "A"
  }, {
    "question": "Which of these is a type of artwork consisting of pieces of wood inlaid in geometric patterns?",
    "A": "marquetry",
    "B": "parquetry",
    "C": "harquetry",
    "D": "sharquetry",
    "answer": "B"
  }, {
    "question": "Which of these is an Italian Design firm?",
    "A": "Escada",
    "B": "Fendi",
    "C": "Ghost",
    "D": "Mainbocher",
    "answer": "B"
  }, {
    "question": "Which of these is another name for a golf course?",
    "A": "Pitch",
    "B": "Links",
    "C": "Steps",
    "D": "Suite",
    "answer": "B"
  }, {
    "question": "Which of these is commonly used to treat allergies?",
    "A": "antimatter",
    "B": "anticoagulants",
    "C": "antiseptics",
    "D": "antihistamines",
    "answer": "D"
  }, {
    "question": "Which of these is made from cacao seeds?",
    "A": "marzipan",
    "B": "soy sauce",
    "C": "chocolate",
    "D": "anchovies",
    "answer": "C"
  }, {
    "question": "Which of these is not a breed of cat?",
    "A": "Persian",
    "B": "Turkish Angora",
    "C": "Bichon Frise",
    "D": "Maine Coon",
    "answer": "C"
  }, {
    "question": "Which of these is not a city in the state of New York?",
    "A": "Perskippity",
    "B": "Kerhonkson",
    "C": "Schenectady",
    "D": "Lackawanna",
    "answer": "A"
  }, {
    "question": "Which of these is not a fabric?",
    "A": "Velveteen",
    "B": "Celotex",
    "C": "Seersucker",
    "D": "Tencel",
    "answer": "B"
  }, {
    "question": "Which of these is not a Hindu deity?",
    "A": "Shiva",
    "B": "Vishnu",
    "C": "Sanskrit",
    "D": "Brahma",
    "answer": "C"
  }, {
    "question": "Which of these is not a 'lock' function on a standard desktop computer keyboard?",
    "A": "print lock",
    "B": "number lock",
    "C": "scroll lock",
    "D": "caps lock",
    "answer": "A"
  }, {
    "question": "Which of these is not a position on an American football team?",
    "A": "quarterback",
    "B": "tight end",
    "C": "striker",
    "D": "free safety",
    "answer": "C"
  }, {
    "question": "Which of these is not a spice?",
    "A": "dill",
    "B": "aniseed",
    "C": "cucumber",
    "D": "cayenne",
    "answer": "C"
  }, {
    "question": "Which of these is not a style of shoe?",
    "A": "gingham",
    "B": "brogan",
    "C": "espadrille",
    "D": "docksider",
    "answer": "A"
  }, {
    "question": "Which of these is not a traditional Greek dish?",
    "A": "sukiyaki",
    "B": "souvlaki",
    "C": "moussaka",
    "D": "finikia",
    "answer": "A"
  }, {
    "question": "Which of these is not a type of chili pepper?",
    "A": "habanero",
    "B": "cheyenne",
    "C": "jalapeno",
    "D": "guajillo",
    "answer": "B"
  }, {
    "question": "Which of these is not a type of primate?",
    "A": "baboon",
    "B": "marmot",
    "C": "orangutan",
    "D": "chimpanzee",
    "answer": "B"
  }, {
    "question": "Which of these is not a type of rock?",
    "A": "metamorphic",
    "B": "sedimentary",
    "C": "igneous",
    "D": "deciduous",
    "answer": "D"
  }, {
    "question": "Which of these is not an ingredient in Yorkshire pudding?",
    "A": "eggs",
    "B": "milk",
    "C": "chocolate",
    "D": "meat drippings",
    "answer": "C"
  }, {
    "question": "Which of these is not found in a Snickers candy bar?",
    "A": "almonds",
    "B": "chocolate",
    "C": "nougat",
    "D": "caramel",
    "answer": "A"
  }, {
    "question": "Which of these is not one of Aesop's fables?",
    "A": "'The Dog and the Squirrel'",
    "B": "'The Hare and the Tortoise'",
    "C": "'The Eagle and the Beetle'",
    "D": "'The Ox and the Frogs'",
    "answer": "A"
  }, {
    "question": "Which of these is not one of superhero Captain Marvel's abilities?",
    "A": "the power of Apollo",
    "B": "the strength of Hercules",
    "C": "the courage of Achilles",
    "D": "the wisdom of Solomon",
    "answer": "A"
  }, {
    "question": "Which of these is not one of the four basic forces in nature?",
    "A": "electromagnetic",
    "B": "gravitational",
    "C": "nuclear",
    "D": "centrifugal",
    "answer": "D"
  }, {
    "question": "Which of these is not one of the official languages of the United Nations?",
    "A": "Japanese",
    "B": "English",
    "C": "Russian",
    "D": "Spanish",
    "answer": "A"
  }, {
    "question": "Which of these is not one of the three branches of the US government?",
    "A": "Judicial",
    "B": "Executive",
    "C": "Parliamentary",
    "D": "Legislative",
    "answer": "C"
  }, {
    "question": "Which of these is not the name of one of rock musician Frank Zappa's children?",
    "A": "Dweezil",
    "B": "Ahmet",
    "C": "Moon Unit",
    "D": "Lumpy Gravy",
    "answer": "D"
  }, {
    "question": "Which of these is referred to as a 'pigskin'?",
    "A": "Football",
    "B": "Basketball",
    "C": "hockey puck",
    "D": "catcher's Mitt",
    "answer": "A"
  }, {
    "question": "Which of these is typically not used as a spice?",
    "A": "dill",
    "B": "thyme",
    "C": "hemlock",
    "D": "marjoram",
    "answer": "C"
  }, {
    "question": "Which of these items is useful for removing ink stains?",
    "A": "baking soda",
    "B": "nail polish",
    "C": "hair spray",
    "D": "butter",
    "answer": "A"
  }, {
    "question": "Which of these measurements is equal to one square foot?",
    "A": "50 square inches",
    "B": "77 square inches",
    "C": "100 square inches",
    "D": "144 square inches",
    "answer": "D"
  }, {
    "question": "Which of these magazines does not focus on natural science?",
    "A": "Tiger Beat",
    "B": "Outside",
    "C": "National Geographic",
    "D": "Smithsonian",
    "answer": "A"
  }, {
    "question": "Which of these men has never been a head coach in the NFL?",
    "A": "Dick Vermeil",
    "B": "Bill Parcells",
    "C": "Chuck Noll",
    "D": "Pat Riley",
    "answer": "D"
  }, {
    "question": "Which of these months has 31 days?",
    "A": "March",
    "B": "April",
    "C": "June",
    "D": "September",
    "answer": "A"
  }, {
    "question": "Which of these movies does not star Jim Carrey?",
    "A": "'Patch Adams'",
    "B": "'The Truman Show'",
    "C": "'Dumb and Dumber'",
    "D": "'The Mask'",
    "answer": "A"
  }, {
    "question": "Which of these names has never belonged to a Pope?",
    "A": "Leo",
    "B": "Lando",
    "C": "Linus",
    "D": "Lawrence",
    "answer": "D"
  }, {
    "question": "Which of these organizations is not part of the U.S. government?",
    "A": "NAACP",
    "B": "NASA",
    "C": "CIA",
    "D": "FBI",
    "answer": "A"
  }, {
    "question": "Which of these organs comes in a pair?",
    "A": "liver",
    "B": "kidney",
    "C": "stomach",
    "D": "gallbladder",
    "answer": "B"
  }, {
    "question": "Which of these painting tools has bristles on it?",
    "A": "easel",
    "B": "knife",
    "C": "brush",
    "D": "palette",
    "answer": "C"
  }, {
    "question": "Which of these pastas is spiral shaped?",
    "A": "fettuccine",
    "B": "rigatoni",
    "C": "tortellini",
    "D": "rotini",
    "answer": "D"
  }, {
    "question": "Which of these people was buried in the Valley of the Kings?",
    "A": "Louis XIV",
    "B": "Elvis Presley",
    "C": "Julius Caesar",
    "D": "King Tut",
    "answer": "D"
  }, {
    "question": "Which of these people was not alive in the 20th century?",
    "A": "Mark Twain",
    "B": "Thomas Edison",
    "C": "Sigmund Freud",
    "D": "Ulysses S. Grant",
    "answer": "D"
  }, {
    "question": "Which of these performers made her film debut in Spike Lee's 'Do the Right Thing'?",
    "A": "Jennifer Lopez",
    "B": "Rosie Perez",
    "C": "Paula Abdul",
    "D": "Tisha Campbell",
    "answer": "B"
  }, {
    "question": "Which of these places is known for art auctions?",
    "A": "Shelby's",
    "B": "Nickleby's",
    "C": "Gatsby's",
    "D": "Sotheby's",
    "answer": "D"
  }, {
    "question": "Which of these plants is the national emblem of Scotland?",
    "A": "ivy",
    "B": "thistle",
    "C": "rose",
    "D": "linden",
    "answer": "B"
  }, {
    "question": "Which of these popular games relies on bluffing?",
    "A": "Outburst",
    "B": "Balderdash",
    "C": "Pictionary",
    "D": "Scattergories",
    "answer": "B"
  }, {
    "question": "Which of these refers to an alcoholic drink laced with a knockout drug?",
    "A": "Zombie",
    "B": "Kamikaze",
    "C": "Mickey Finn",
    "D": "Molotov cocktail",
    "answer": "C"
  }, {
    "question": "Which of these rivers flows through France?",
    "A": "Volga",
    "B": "Seine",
    "C": "Mekong",
    "D": "Allegheny",
    "answer": "B"
  }, {
    "question": "Which of these rock guitarists designed a colorful line of men's neckties?",
    "A": "Eric Clapton",
    "B": "Jerry Garcia",
    "C": "Jeff Beck",
    "D": "Keith Richards",
    "answer": "B"
  }, {
    "question": "Which of these rocks will float in water?",
    "A": "granite",
    "B": "limestone",
    "C": "shale",
    "D": "pumice",
    "answer": "D"
  }, {
    "question": "Which of these sentences is written in the subjunctive?",
    "A": "I am not your man",
    "B": "I wish I were your man",
    "C": "Wherefore art your man?",
    "D": "Your man is where?",
    "answer": "B"
  }, {
    "question": "Which of these snakes is poisonous?",
    "A": "anaconda",
    "B": "boa constrictor",
    "C": "copperhead",
    "D": "python",
    "answer": "C"
  }, {
    "question": "Which of these songs was a Top 10 hit for the rock band The Police?",
    "A": "'Radio Ga-Ga'",
    "B": "'Ob-la-di, Ob-la-da'",
    "C": "'De Do Do Do, De Da Da Da'",
    "D": "'In-a-Gadda-Da-Vida'",
    "answer": "C"
  }, {
    "question": "Which of these sounds is commonly associated with owls?",
    "A": "chirp",
    "B": "bark",
    "C": "growl",
    "D": "hoot",
    "answer": "D"
  }, {
    "question": "Which of these states is not the birthplace of a US president?",
    "A": "New Jersey",
    "B": "Nebraska",
    "C": "Kansas",
    "D": "California",
    "answer": "C"
  }, {
    "question": "Which of these stores is not owned by Gap Inc?",
    "A": "Gap",
    "B": "Banana Republic",
    "C": "Old Navy",
    "D": "J Crew",
    "answer": "D"
  }, {
    "question": "Which of these television programs did not feature characters introduced on 'Happy Days'?",
    "A": "'Mork & Mindy'",
    "B": "'Perfect Strangers'",
    "C": "'Joanie Loves Chachi'",
    "D": "'Laverne & Shirley'",
    "answer": "B"
  }, {
    "question": "Which of these television series was not set in the United States?",
    "A": "'Picket Fences'",
    "B": "'M*A*S*H'",
    "C": "'Northern Exposure'",
    "D": "'The Paper Chase'",
    "answer": "B"
  }, {
    "question": "Which of these toys answers questions?",
    "A": "Magic 8 Ball",
    "B": "Barbie",
    "C": "Frisbee",
    "D": "Slinky",
    "answer": "A"
  }, {
    "question": "Which of these vitamins was the first to be named?",
    "A": "Vitamin A",
    "B": "Vitamin-12",
    "C": "Vitamin E",
    "D": "Vitameatavegimen",
    "answer": "A"
  }, {
    "question": "Which of these words is a synonym for 'perambulate'?",
    "A": "kiss",
    "B": "shout",
    "C": "stroll",
    "D": "heal",
    "answer": "C"
  }, {
    "question": "Which of these words is an adverb?",
    "A": "hurried",
    "B": "fast",
    "C": "speedy",
    "D": "quickly",
    "answer": "D"
  }, {
    "question": "Which of these words means 'yes' in French?",
    "A": "qui",
    "B": "oui",
    "C": "ja",
    "D": "okey-dokey",
    "answer": "B"
  }, {
    "question": "Which of these words is spelled correctly?",
    "A": "decieve",
    "B": "foriegn",
    "C": "hygiene",
    "D": "wierd",
    "answer": "C"
  }, {
    "question": "Which one of these world leaders was assassinated?",
    "A": "Indira Gandhi",
    "B": "Ferdinand Marcos",
    "C": "Golda Meir",
    "D": "Neville Chamberlain",
    "answer": "A"
  }, {
    "question": "Which one of these World War II leaders was not at the Yalta Conference?",
    "A": "Stalin",
    "B": "Mussolini",
    "C": "Churchill",
    "D": "Roosevelt",
    "answer": "B"
  }, {
    "question": "Which of these would you most commonly find in a sconce?",
    "A": "candle",
    "B": "food",
    "C": "birds",
    "D": "books",
    "answer": "A"
  }, {
    "question": "Which Pope immediately preceded John Paul II?",
    "A": "John XXIII ",
    "B": "Paul VI",
    "C": "John Paul I",
    "D": "Hank II",
    "answer": "C"
  }, {
    "question": "Which 'Rocky' film features Mr. T?",
    "A": "'Rocky II'",
    "B": "'Rocky III'",
    "C": "'Rocky IV'",
    "D": "'Rocky '",
    "answer": "B"
  }, {
    "question": "Who co-founded Microsoft with Bill Gates?",
    "A": "Steve Jobs",
    "B": "Steve Wozniak",
    "C": "Paul Williams",
    "D": "Paul Allen",
    "answer": "D"
  }, {
    "question": "Who composed the 'Moonlight Sonata'?",
    "A": "Mozart",
    "B": "Handel",
    "C": "Bach",
    "D": "Beethoven",
    "answer": "D"
  }, {
    "question": "Who is an archenemy of the cartoon superhero Underdog?",
    "A": "OverCat",
    "B": "Muttley",
    "C": "Mr. Whoopie",
    "D": "Dick Dastardly",
    "answer": "A"
  }, {
    "question": "Who is considered the owner of a 'publicly held' company?",
    "A": "the CEO",
    "B": "the stockholders",
    "C": "the president",
    "D": "the government",
    "answer": "B"
  }, {
    "question": "Who is the career hit leader among players never elected to Baseball's Hall of Fame?",
    "A": "Steve Garvey",
    "B": "Jim Rice",
    "C": "Pete Rose",
    "D": "Ken Griffey Jr",
    "answer": "C"
  }, {
    "question": "Who is the creator of the comic strip 'The Far Side'?",
    "A": "Jim Davis",
    "B": "Gary Larson",
    "C": "Garry Trudeau",
    "D": "Charles Schulz",
    "answer": "B"
  }, {
    "question": "Who is the mythological Roman goddess of flowers?",
    "A": "Diana",
    "B": "Echo",
    "C": "Flora",
    "D": "Niobe",
    "answer": "C"
  }, {
    "question": "Who is the patron saint of animals?",
    "A": "St. Isidore of Seville",
    "B": "St. Anthony of Padua",
    "C": "St. Francis of Assisi",
    "D": "St. Joan of Arc",
    "answer": "C"
  }, {
    "question": "Who is the shortest man to ever win an NBA slam dunk competition?",
    "A": "Anthony 'Spud' Webb",
    "B": "Michael 'Air' Jordan",
    "C": "Tyrone 'Muggsy' Bogues",
    "D": "Julius 'Dr. J' Erving",
    "answer": "A"
  }, {
    "question": "Who is the star of the movie 'Casablanca'?",
    "A": "Errol Flynn",
    "B": "Clark Gable",
    "C": "Cary Grant",
    "D": "Humphrey Bogart",
    "answer": "D"
  }, {
    "question": "Who is the star of the TV show 'Everybody Loves Raymond'?",
    "A": "Ray Liotta",
    "B": "Ray Romano",
    "C": "Ray Parker Jr.",
    "D": "Sugar Ray Leonard",
    "answer": "B"
  }, {
    "question": "Who is the twin sister of 'Dear Abby' columnist Abigail VanBuren?",
    "A": "Martha Stewart",
    "B": "Dr Ruth Westheimer",
    "C": "Ann Landers",
    "D": "Miss Manners",
    "answer": "C"
  }, {
    "question": "Who kills Tony at the end of the film 'West Side Story'?",
    "A": "Riff",
    "B": "Chino",
    "C": "Bernardo",
    "D": "He kills himself.",
    "answer": "B"
  }, {
    "question": "Who led the 1831 slave insurrection in Southampton, Virginia?",
    "A": "John Brown",
    "B": "Dred Scott",
    "C": "Nat Turner",
    "D": "Harriet Tubman",
    "answer": "C"
  }, {
    "question": "Who or what was Big Bertha?",
    "A": "a comet",
    "B": "a World War I gun",
    "C": "a pro wrestling champion",
    "D": "a giant Muppet",
    "answer": "B"
  }, {
    "question": "Who originally proposed the idea of daylight-saving time?",
    "A": "Benjamin Franklin",
    "B": "Henry David Thoreau",
    "C": "Galileo",
    "D": "Albert Einstein",
    "answer": "A"
  }, {
    "question": "Who sang lead vocals for the band Big Brother and the Holding Company?",
    "A": "Grace Slick",
    "B": "Janis Joplin",
    "C": "Mama Cass",
    "D": "Karen Carpenter",
    "answer": "B"
  }, {
    "question": "Who was Charlie McCarthy?",
    "A": "a U.S. senator",
    "B": "a Chicago gangster",
    "C": "a famous baseball pitcher",
    "D": "a wooden dummy",
    "answer": "D"
  }, {
    "question": "Who was not one of the Cartwright sons on the TV series 'Bonanza'?",
    "A": "Adam",
    "B": "Little Joe",
    "C": "Hoss",
    "D": "Ben",
    "answer": "D"
  }, {
    "question": "Who was on the $500 bill?",
    "A": "Calvin Coolidge",
    "B": "Andrew Jackson",
    "C": "Aaron Burr",
    "D": "William McKinley",
    "answer": "D"
  }, {
    "question": "Who was president of the United States when Bill Clinton was born?",
    "A": "Herbert Hoover",
    "B": "Harry S. Truman",
    "C": "Franklin Roosevelt",
    "D": "Dwight Eisenhower",
    "answer": "B"
  }, {
    "question": "Who was the English king at the time of the American Revolution?",
    "A": "Charles I",
    "B": "James I",
    "C": "Edward III",
    "D": "George III",
    "answer": "D"
  }, {
    "question": "Who was the first American in space?",
    "A": "John Glenn",
    "B": "Buzz Aldrin",
    "C": "Alan Shepard",
    "D": "Neil Armstrong",
    "answer": "C"
  }, {
    "question": "Who was the first First Lady to run for political office?",
    "A": "Hillary Clinton",
    "B": "Rosalynn Carter",
    "C": "Bess Truman",
    "D": "Eleanor Roosevelt",
    "answer": "A"
  }, {
    "question": "Who was the first US president to resign from that office?",
    "A": "Martin Van Buren",
    "B": "Andrew Jackson",
    "C": "Andrew Johnson",
    "D": "Richard Nixon",
    "answer": "D"
  }, {
    "question": "Who was the longest reigning monarch in French history?",
    "A": "Louis XIII ",
    "B": "Louis XIV",
    "C": "Louis XV",
    "D": "Louis XVI",
    "answer": "B"
  }, {
    "question": "Who was the mother of the Greek god Zeus?",
    "A": "Gaia",
    "B": "Phoebe",
    "C": "Rhea",
    "D": "Hera",
    "answer": "C"
  }, {
    "question": "Who was the WNBA's Most Valuable Player of 1999?",
    "A": "Rebecca Lobo",
    "B": "Sheryl Swoopes",
    "C": "Lisa Leslie",
    "D": "Yolanda Griffith",
    "answer": "D"
  }, {
    "question": "Who were the Chicago Seven?",
    "A": "war protesters",
    "B": "bluegrass musicians",
    "C": "bank robbers",
    "D": "mobsters",
    "answer": "A"
  }, {
    "question": "Who were the Know-Nothings?",
    "A": "a '60's comedy troupe",
    "B": "computer designers",
    "C": "a political party",
    "D": "a spy ring",
    "answer": "C"
  }, {
    "question": "Who wrote 'A Tale of Two Cities'?",
    "A": "Charles Dickens",
    "B": "Nathaniel Hawthorne",
    "C": "Washington Irving",
    "D": "Mark Twain",
    "answer": "A"
  }, {
    "question": "Who wrote musicals with Oscar Hammerstein II?",
    "A": "Richard Rodgers",
    "B": "Rogers Hornsby",
    "C": "Gilbert O' Sullivan",
    "D": "George Rogers Clark",
    "answer": "A"
  }, {
    "question": "Who wrote the lyrics of the Frank Sinatra anthem 'My Way'?",
    "A": "Frank Sinatra",
    "B": "Kris Krist offerson",
    "C": "Carole King",
    "D": "Paul Anka",
    "answer": "D"
  }, {
    "question": "Whom did Billie Jean King defeat in the famous 'Battle of the Sexes' tennis match?",
    "A": "Jimmy Connors",
    "B": "Pete Sampras",
    "C": "John McEnroe",
    "D": "Bobby Riggs",
    "answer": "D"
  }, {
    "question": "Whose profile can you see on the front of dimes that are currently in circulation?",
    "A": "George Washington",
    "B": "Thomas Jefferson",
    "C": "Benjamin Franklin",
    "D": "Franklin Roosevelt",
    "answer": "D"
  }, {
    "question": "With what would you use a wah-wah pedal?",
    "A": "bicycle",
    "B": "stock car",
    "C": "electric guitar",
    "D": "baby",
    "answer": "C"
  }]


// PSEUDOCODE

// CREATE an empty array to keep track of asked questions  -  arrAsked - Controller
// GENERATE a random question from the json list and present the question unless the question
// index is not in arrAsked - questionAsked, randomIndex
// ADD the question to arrAsked
// CATCH user selection
// IF user selection is correct
// 	DISPLAY success message
// ELSE
// 	DISPLAY failure message


// start model object
var model = {

	// create an empty array to keep track of the questions...
	arrAsked:[],
	totalQuestions: json.length,

	getRandomIntInclusive: function(min, max) {
  		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	getRandomIntExclusive: function(min, max) {
  		return Math.floor(Math.random() * (max - min)) + min;
	},

	randomQuestion: function(){
		var questionIndex = this.getRandomIntExclusive(0,this.totalQuestions);
		
		while (this.arrAsked.indexOf(questionIndex) !== -1) {
  			var questionIndex = this.getRandomIntExclusive(0,this.totalQuestions);
		}
		
		return questionIndex;
	}
}
// end model object

// start of view object
var view = {
	displayQuestionAndAnswers: function() {
    var q = model.randomQuestion();
		var displayQuestion = document.getElementById("question");
    var displayAnswers = document.getElementById("answers");
		

		displayQuestion.innerHTML = json[q].question;
		displayAnswers.innerHTML = "<div class='col-lg-3'><a q='" + q + "' id='A' class='answer btn btn-primary btn-lg'>A: " + json[q].A + "</a></div>";
		displayAnswers.innerHTML += "<div class='col-lg-3'><a q='" + q + "' id='B' class='answer btn btn-primary btn-lg'>B: " + json[q].B + "</a></div>";
		displayAnswers.innerHTML += "<div class='col-lg-3'><a q='" + q + "' id='C' class='answer btn btn-primary btn-lg'>C: " + json[q].C + "</a></div>";
		displayAnswers.innerHTML += "<div class='col-lg-3'><a q='" + q + "' id='D' class='answer btn btn-primary btn-lg'>D: " + json[q].D + "</a></div>";
    displayAnswers.innerHTML += "<div style='width: 100%; text-align: center;'><a id='next' style='margin-top: 40px;' class='btn btn-primary btn-lg btn-info'>Show Me a Another Random Question &rarr;</a></div>";
    return this.q;
	},

}
// end of view object

// start of controller object
var controller = {

  nextQuestion: function() {
    view.displayQuestionAndAnswers();
    var receivedResponses = document.getElementsByClassName("answer");
    for (var i = 0; i < receivedResponses.length; i++) {
      receivedResponses[i].onclick = controller.checkAnswer;
    }
    var displayQuestion = document.getElementById("result");
    displayQuestion.innerHTML = "";
    nextQuestion = document.getElementById("next");
    nextQuestion.onclick = controller.nextQuestion;
  },

	checkAnswer: function(eventObj){
    question = eventObj.target.getAttribute("q");
    answer = eventObj.target.id;
    if (json[question].answer === answer) {
      result.innerHTML = "<h2><span class='label label-success'>CORRECT</span> <span class='label label-default'>The answer is: " + json[question].answer + '</span></h2>';
      return true;
    } else {
      result.innerHTML = "<h2><span class='label label-danger'>WRONG</span> <span class='label label-default'>The answer is: " + json[question].answer + '</span></h2>';
      return false;
    }

	}


}
// end of controller object