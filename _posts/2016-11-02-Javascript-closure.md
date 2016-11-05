---
layout: post
title: Javascript IIFE
---

IIFE lyhenne tulee sanoista Immediately Invoked Function Expresssion, joka tarkoittaa vapaasti suomennettuna “välittömästi suoritettavaa funktiota”.

<!-- kuvan lisäys ![_config.yml]({{ site.baseurl }}/images/config.png) -->

Patterni on yksinkertainen toteuttaa. Se on function expression, joka on ympäröity sulkeilla.

Patterni voidaan toteuttaa kahdella eri tapaa. Sulkeet, jotka suorittavat funktion ovat ympäröivän sulkeiden sisä- tai ulkopuolella. Toiminnallisuus on kuitenkin täysin sama, joten valinta on täysin tyylillinen.

Tähän esimerkki 1
Tähän esimerkki 2

Mikä on patternin idea? Javascriptissä jokainen funktio luo oman scopen. IIFE luo siis oman scopen ja kaikki muuttujat ja funktiot, jotka esitellään tämän sisällä on lokaalisti esiteltyjä eivätkä ne saastuta global scopea.

IIFE voidaan myös antaa parametrejä, jolloin ne on nopeampi käyttää, kuin global scopesta. Esimerkissä annamme parametreinä window objectin ja jQueryn objectin.

Tähän esimerkki 3

IIFE-patterni on iso osa module patternia. Perusidea module patternissa on kirjoittaa selviä moduuleja jotka eivät vuoda koodia globaaliin scopeen. Se sallii meidän kirjoittaa koodia, josta voimme valita osat jotka haluamme näkyvän ulos päin moduulista (public / private).
 
Esimerkissä luomme loggingModuulin, jonka yksinkertainen tehtävä on kirjoittaa konsoliin parametrinä saatu teksti. Paljastamme meidän log funktion maailmalle, mutta meidän defaultMsg muuttuja on privaatti eikä sitä voida vaihtaa tai käyttää ulkopuolelta.

Tähän esimerkki 4

IIFE-patterni on tärkeä osata ja ymmärtää, jotta ei turhaan saastuteta globaalia scopea sekä voidaan luoda moduuleja, joilla on yksityisiä sekä julkisia muuttujia.
