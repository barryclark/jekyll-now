---
layout: post
title: Interfaces
---

Chci si s kámošem sepsat program, kde by šel hrát blackjack. On vymyslí grafiku, já logiku. Jak se domluvit, aby obě poloviny kódu fungovaly?

Možnosti, jak to udělat, je několik. Některé jsou lepší, některé trochu kostrbaté. Rozepíšu, jakými fázemi jsme se prošli. 

# Domluvit se napevno
Nejjednodušší (a paradoxně celkem funkční) je domluvit se předem na rozhraní, v kterém potom budou části kódu komunikovat. Na tomto způsobu je postavené celý [vývojový způsob Waterfall](https://cs.wikipedia.org/wiki/Vodop%C3%A1dov%C3%BD_model). 

Problémy jsou očividné - při jakékoli změně je potřeba projet celé kolečko řešení rozhraní znovu. Ve dvou vývojářích to ještě jde, pří více už se ale komunikace výrazně komunikuje. 

# Napsat překrývající si část jako první
Další techniku, kterou jsme využili, je překrývající se kus kódu. V podstatě to vypadalo jako třída, která měla všechny metody, které jsme si mohli používat. Po drobné úpravě jsme si i dohodli směr řízení (že jedna část bude řídit tok a druhé jen vykonávat příkazy). 

To celkem fungovalo, ale nelíbilo se nám, že implementace zabrala celkem dost času. Navíc vkládáme do celkem malého progamu další vrstvu, což čitelnosti a pochopitelnosti také moc neprospělo. 

Poté jsme udělali jen jakousi "spájecí" třídu, kde jednotlivé metody reálně nic nedělaly, jen si předávaly parametry mezi dvěma částmi kódu (mou a kámošovou). To fungovalo skoro ideálně, jen to bylo trochu kostrbaté na napsání. 

# Interface!
A zjistili jsme, že jsme spojovací třídou vymysleli implementaci interface. O co se tedy v PHP jedná?

## Základy
Ve zkratce je interface předpis, jak se má implementovat daná třída. Třída (tady třeba třída `Deck` starající se o balíček karet), podobně jako může dědit, může i velmi podobně vycházet z interface. Je to prostě nějaký soupis všech veřejných metod, které třída musí mít, aby mohla fungovat. 

## Použití
Interfaces je možné použít jako v mém případě - nejdřív si vydefinuješ, co musí třída umět a vyjádříš to v interface, a poté implementuješ třídu, aby odpovídala té interface. 

S interfaces umí dobře pracovat IDE. Standardně nabízí možnosti jako "vytvořit novou třídu implementující tento interface", napovídá v metodách z interface (takže si do interface můžeš naskládat jen metody, které budeš potřebovat) a napovídat, které metody z interface chybí nebo neodpovídají popisu. 

## Příklad
Zkusím interface ukázat na našem příkladu s logikou na blackjack. Nejdřív ukázka hotového kódu: 

```php
<?php

namespace blackJack;

class Deck {
	private $deckOfCards = [];
	private $suits = ["H", "D", "S", "C",];
	private $values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A",];
	
	public function __construct() {
		$this->makeNewDeck();
	}
	
	public function makeNewDeck() {
		$this->deckOfCards = [];
		foreach ($this->suits as $suit) {
			foreach ($this->values as $value) {
				$this->deckOfCards[] = ($suit.$value);
			}
		}
		$this->shuffle();
	}
	
	public function shuffle() {
		shuffle($deckOfCards);
	}
	
	public function drawCard() {
		return array_shift($deckOfCards);
	}
}
```

a ukázka interface pro tuto třídu: 

```php
<?php

namespace blackJack;

interface Deck {
	public function makeNewDeck();
	
	public function shuffle();
	
	public function drawCard();
}
```

Interface v podstatě vypisuje všechny veřejné metody. Na první pohled třeba nemusí být jasné, co třída `Deck` dělá. Při pohledu na jeho interface je vše jasné na první pohled. 

## Podobnost s abstraktními třídami
Abstraktní třídy jsou z podstaty podobný nástroj. Kdy jaký použít při jaé situaci je stále předmětem diskuzí, jsou ale určitá zavedená použití. 

Interfaces neumožňují nic přími implementovat, takže pokud potřebuješ poskytnout šablonu, jak něco má vypadat **a zároveň** nabídnout implementaci základních věcí, je pro to abstraktní třída vhodnější. 

Velký důvod, proč používat interface než abstraktní třídy je ten, že PHP neumožňuje vícenásobně dědit, ale implementace více interfaces je povolená. Můžeme tedy napsat něco jako: 

```php
<?php

class Deck implements pokerDeck, blackjakcDeck, solitareDeck {
    // ...
}
```

Tady funkční implementace třídy `Deck` bude umět jak všechny metody potřebné ke hře poker, tak i blackjack i hře solitare. 

# Too Long, Didn't Read?
Interface definuje, jak má třída, která ho implementuje, vypadat, a jaké metody musí obsahovat. Hodí se při definování tříd v projektech s více vývojáři. Je částečně zaměnitelná s abstraktními třídami. 
