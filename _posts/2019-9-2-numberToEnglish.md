---
layout: post
title: numberToEnglish
date: 2019-09-02
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Extend the Number prototype with a new method called `toEnglish`.
---

### 문제

Extend the Number prototype with a new method called `toEnglish`.
It should return the number as a string using English words.

**Example**

```javascript
(7).toEnglish(); // > "seven"
(575).toEnglish(); // > "five hundred seventy-five"
(78193512).toEnglish(); // > "seventy-eight million one hundred ninety-three thousand five hundred twelve"
```

**Extra credit: Make your function support decimals**<br>
**Example**

```javascript
(150043.273).toEnglish(); // > "one hundred fifty thousand forty-three and two hundred seventy three thousandths"
```

### 풀이

```javascript
var numbersToWords = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
  60: "sixty",
  70: "seventy",
  80: "eighty",
  90: "ninety"
};
var numbersToPlace = {
  10: "ten",
  100: "hundred",
  1000: "thousand",
  1000000: "million",
  1000000000: "billion",
  1000000000000: "trillion",
  1000000000000000: "quadrillion",
  1000000000000000000: "quintillion"
};

Number.prototype.toEnglish = function() {
  if (numbersToWords[this]) {
    return numbersToWords[this];
  }

  let numberInString = "";
  let places = Object.keys(numbersToPlace);
  places.shift();
  const makeNumberToString = number => {
    for (let i = places.length - 1; i >= 0; i--) {
      if (number / places[i] >= 1) {
        let numberOfPlace = Math.floor(number / places[i]);
        if (numbersToWords[numberOfPlace]) {
          numberInString +=
            numberInString.length > 0
              ? " " + numbersToWords[numberOfPlace]
              : "" + numbersToWords[numberOfPlace];
        } else {
          makeNumberToString(numberOfPlace);
        }
        numberInString += " " + numbersToPlace[places[i]];
        number = number - numberOfPlace * places[i];
      }
      if (i === 0 && number > 0) {
        if (numberInString.length > 0) {
          numberInString += " ";
        }
        if (numbersToWords[number]) {
          numberInString += numbersToWords[number];
        } else {
          let tenth = number / 10;
          let oneth = number % 10;
          if (tenth > 1) {
            numberInString += numbersToWords[Math.floor(tenth) * 10] + "-";
          }
          numberInString += numbersToWords[oneth];
        }
      }
    }
  };
  const makePlace = number => {
    let string = "";
    if (numbersToPlace[number]) {
      return numbersToPlace[number];
    } else {
      for (let i = 0; i < places.length - 1; i++) {
        if (number > places[i] && number < places[i + 1]) {
          string +=
            numbersToPlace[number / places[i]] +
            "-" +
            numbersToPlace[places[i]];
        }
      }
      return string;
    }
  };
  let numberInArr = this.toString().split(".");
  for (let i = 0; i < numberInArr.length; i++) {
    if (i > 0 && numberInString.length > 0) {
      numberInString += " and";
    }
    makeNumberToString(Number(numberInArr[i]));
    if (i > 0) {
      if (numberInString !== "one") {
        numberInString +=
          " " + makePlace(Math.pow(10, numberInArr[i].length)) + "ths";
      } else {
        numberInString +=
          " " + makePlace(Math.pow(10, numberInArr[i].length)) + "th";
      }
    }
  }
  return numberInString;
};
```
