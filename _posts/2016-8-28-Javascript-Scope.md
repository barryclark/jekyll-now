---
layout: post
title: Javascript Scope
---

Yksinkertaisesti scope on joukko sääntöjä, jotka määrittävät kuinka muuttuja tallennetaan ja mistä muuttujaa voidaan käyttää.

<!-- kuvan lisäys ![_config.yml]({{ site.baseurl }}/images/config.png) -->

## Globaali scope (global scope)

Javascriptin kaikkein uloin scope on nimeltään global scope. Selaimessa global scopea kutsutaan nimellä window.

Muuttujan esittely globaaliin scopeen, mahdollistaa muuttujan lukemisen ja muokkaamisen kaikkialta koodista. Suositellaan, että globaaliin scopeen ei määritellä muuttujia, koska muuttujat voidaan ylikirjoittaa helposti. Kolmannen osapuolen kirjasto voi esitellä saman nimisen muuttujan globaaliin scopeen, tämän jälkeen on helvetti irti. Muuttujien ylikirjoittaminen tarkoittaa outoja bugeja koodissa.

## Lokaali scope (Local scope)

Lokaali scope esitellään globaalin scopen sisällä. Globaaleita scopeja on vain yksi, mutta lokaaleita scopeja voi olla useita. Javascriptissä lokaali scope luodaan aina, kun luodaan uusi funktio. Uuden funktion luominen toisen funktion sisälle luo taas uuden lokaalin scopen.

{% gist pspfolio/aed8e42d83fda33048e8cf2677f3012f %}

## Function scope

Suurin osa ohjelmointikielistä on “block scoped”, eli aaltosulje luo aina uuden scopen. Esimerkiksi if-lause luo uuden scopen aaltosulkeilla. Javascripti on “function scoped”, eli uusi scope luodaan vain silloin, kun luodaan uusi funktio.

Huomiona, että Javascript ES6:ssa on tulossa let ja const avainsanat, jotka mahdollistavat block scopen käytön.

## Lexical scope

Scopeilla on pääsy ulompiin scopeihin, mutta ei toisin päin. Eli sisempi (child) scope pystyy käyttämään ulomman (parent) scopen muuttujia. Lexical scopea voidaan ajatella kerrostalona. Lähdetään hakemaan muuttujaa A. Mennään ensimmäiseen kerrokseen, joka on sisimmäinen scope, jossa muuttujaa A:ta on kutsuttu. Ellei kerroksesta yksi löydy muuttujaa, mennään seuraavaan kerrokseen. Tätä jatkuu kunnes löydämme muuttujan tai pääsemme talon katolle, joka on global scope.

{% gist pspfolio/623a53b6044c7625a3b06ca5d475cd5d %}

Ensimmäinen A:ksi nimetty muuttuja joka löytyy, palautetaan kysyjälle. Eli jos kerroksessa kaksi on esitelty muuttuja A sekä katolla (global scope) on esitelty muuttuja A. Kerroksen kaksi muuttuja palautetaan, koska se löydetään ennen katolle pääsyä.

{% gist pspfolio/70b58f419a84274ab167ddc84e751ead %}

## Javascriptin kummallisuus

Jos muuttujaan asetetaan arvo ja muuttujaa ei löydy mistään scopesta. Tällöin Javascript puuttuu peliin ja toteaa, että loin sinulle tarvittavan muuttujan globaaliin scopeen. Tämä tapahtuu vain, jos yritetään asettaa muuttujaan tietoa, jota ei ole esitelty. Jos käytetään muuttujaa, jota ei ole esitelty antaa Javascript referenssi virheen. Tämän takia pitää muuttujat aina esitellä var -avainsanalla. 

{% gist pspfolio/0bce3b125c707c35891b47a61494c545 %}

Javascriptissä voidaan käyttää “use strict” -modea, joka antaa ylläkuvatussa tilanteessa virheen.

## Yhteenveto

Scope on joukko sääntöjä, joka määrää minne muuttuja tallennetaan ja ketkä muuttujaa voivat käyttää. Muista esitellä muuttujat var -avainsanalla, jotta arvon asetus vaiheessa Javascript ei pääse puuttumaan peliin ja luomaan muuttujaa globaaliin scopeen.
