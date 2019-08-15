---
layout: post
title: shuffleDeck
date: 2019-08-15
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Given an array containing a deck of cards, implement a function that shuffles the deck.
---

### 문제

Given an array containing a deck of cards, implement a function that shuffles the deck.

```javascript
Example: var deck = orderedDeck();
// ["A♥","2♥","3♥",...,"J♦","Q♦","K♦"]
shuffleDeck(deck);
// ["2♠","J♣","A♦", ... ,"7♣","8♣","K♠"]
```

### 풀이

```javascript
var shuffleDeck = function(deck) {
  for (let i = 0; i < deck.length; i++) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    originCard = deck[i];
    deck[i] = deck[randomIndex];
    deck[randomIndex] = originCard;
  }
  return deck;
};

var orderedDeck = function() {
  var suits = ["♥", "♣", "♠", "♦"];
  var values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
  var deck = [];

  suits.forEach(function(suit) {
    values.forEach(function(value) {
      deck.push(value + suit);
    });
  });
  return deck;
};
```
