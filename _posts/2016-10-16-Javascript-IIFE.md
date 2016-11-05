---
layout: post
title: Javascript IIFE
---

IIFE lyhenne tulee sanoista Immediately Invoked Function Expresssion, joka tarkoittaa vapaasti suomennettuna “välittömästi suoritettavaa funktiota”.

<!-- kuvan lisäys ![_config.yml]({{ site.baseurl }}/images/config.png) -->

Patterni on yksinkertainen toteuttaa. Se on function expression, joka on ympäröity sulkeilla.

Patterni voidaan toteuttaa kahdella eri tapaa. Sulkeet, jotka suorittavat funktion ovat ympäröivän sulkeiden sisä- tai ulkopuolella. Toiminnallisuus on kuitenkin täysin sama, joten valinta on täysin tyylillinen.

{% gist pspfolio/a4d16e8491bf61a8351ac8078139d371 %}
{% gist pspfolio/fa22b836089bbbd4c0eec8d998ec66be %}

Mikä on patternin idea? Javascriptissä jokainen funktio luo oman scopen. IIFE luo siis oman scopen ja kaikki muuttujat ja funktiot, jotka esitellään tämän sisällä on lokaalisti esiteltyjä eivätkä ne saastuta global scopea.

IIFE voidaan myös antaa parametrejä, jolloin ne on nopeampi käyttää, kuin global scopesta haettuna. Esimerkissä annamme parametreinä window objekti.

{% gist pspfolio/1a64fa9827269b576fc5f45e9d137264 %}

IIFE-patterni on iso osa module-patternia. Perusidea module patternissa on kirjoittaa selviä moduuleja jotka eivät vuoda koodia globaliin scopeen. Se sallii meidän kirjoittaa koodia, josta voimme valita osat jotka haluamme näkyvän ulos päin moduulista (public / private).
 
Esimerkissä luomme loggingModuulin, jonka yksinkertainen tehtävä on kirjoittaa konsoliin parametrinä saatu teksti. Paljastamme meidän log funktion maailmalle, mutta meidän defaultMsg muuttuja on privaatti eikä sitä voida vaihtaa tai käyttää ulkopuolelta.

{% gist pspfolio/80acba48c4a325d1e7e1a6d73d595220 %}

IIFE-patterni on tärkeä osata ja ymmärtää, jotta ei saastuteta globaalia scopea sekä voidaan luoda moduuleja, joilla on yksityisiä sekä julkisia muuttujia.
