---
layout: post
title: "Introduction au Clean Code"
description: "Qu'est-ce que le clean code ?"
category: 
tags: [Clean Code]
---

Allez on commence une série d'articles sur le clean code.


Avant de commencer à définir le clean code, il nous faudra évidemment définir 
ce qui constitue du code informatique.

## Qu'est-ce que le code informatique ?

Le code informatique, habituellement résumé au "Code" est un ensemble d'instructions informatiques  qui constitue un programme logiciel.
On trouve principalement deux types de code :    

- le code machine, qui est exécutable par une  machine (physique ou virtuelle)
- le code source, écrit par un développeur, qui est compilé et/ou interprété en un code machine. 
    
On s'intéressera ici principalement au **code source**.

## Comment un code peut-il être propre ?

Les langages informatiques laissent une grande place à la **créativité du développeur.**
En commençant par le nommage des différentes entités manipulées, par l'architecture des composants ou encore par les algorithmes utilisés.      

Laissé bien souvent à lui-même, et comprenant correctement le code qu'il est en train de produire, le développeur parvient ainsi à écrire un code 
qui compile et qui parfois répond à un besoin métier exprimé par le client/sponsor. Dans un soucis permanent de rentabilité le développeur 
     se concentrera bien plus sur sa vélocité à produire des évolutions et à la résolution des nombreux bugs qui apparaissent dans son application.  
 
 Ainsi se forgent la plupart des programmes informatiques, où les améliorations se rajoutent petit à petit, et de plus en plus lentement. Les équipes changent, 
 de nouvelles personnes arrivent, et les besoins des utilisateurs évoluent.   
 Au fur et à mesure des changements, les évolutions fonctionnelles se font de plus en plus douloureuses,
  et les bugs (de plus en plus courants) se font de plus en plus tenaces à corriger.
  
  Cette douleur que vous avez très probablement déjà ressentie est un symptôme d'un code source qui : 
  
  - est dur à comprendre
  - est dur à faire évoluer
  - entraine des régressions à chaque tentative d'évolution
   - garde de nombreux bugs

## Mais finalement, qu'est-ce que le clean code ?

Le clean code, c'est le code qui est au contraire : 

- fonctionnel (sans bug)
- facile à comprendre
- facile à faire évoluer 


C'est tout ? Oui c'est tout.

Mais avant tout, c'est l'**intention** derrière le clean code qui est différente.

Du code propre, c'est du code qui a été développé pour être maintenu. 
Les développeurs qui l'ont écrit **ont fait cet effort**. Ainsi où que vous regardiez,
il est clairement visible que le nommage a été réfléchi, le design a été retravaillé, et le code relu.    
Bref, ce code est le résultat du labeur d'un professionnel qui a le souci du travail bien fait.

C'est donc un code en lequel on peut avoir confiance. Et qu'on peut faire évoluer en toute sérénité.
 

> I could list all of the qualities that I notice in clean code,
 but there is one overarching quality that leads to all 
of them. Clean code always looks like it was written by someone 
who cares. There is nothing obvious that you can do to make it better.
 All of those things were thought about by the code’s author, and 
if you try to imagine improvements, you are led back to where you are, 
sitting in appreciation of the code someone left for you—code written 
by someone who cared deeply about the **craft**.     
---<cite>Michael Feathers, Auteur de  Working Effectively with Legacy Code</cite>


## Ça a l'air sympa, mais tout ça ne me dit pas comment faire du clean code.


Il est important de garder en tête l'objectif unique du clean code : 
     
 Produire et maintenir un code qui ne plante pas, ni maintenant, ni demain.

Nous discuterons dans des articles futurs des stratégies à utiliser pour 
produire un code qui répond à ces critères.