---
layout: post
title: "Clean Code 1"
description: "Qu'est-ce que le clean code"
category: 
tags: []
---

Allez on commence une série d'articles sur le clean code.


Avant de commencer à définir le clean code, il nous faudra évidemment définir 
ce qui constitue du code informatique.

### Qu'est-ce que le code informatique ?

Le code informatique, habituellement résumé au "Code" est un ensemble d'instructions informatiques  qui constitue un programme logiciel.
On trouve principalement deux types de code :    

- le code machine, qui est exécutable par une  machine (physique ou virtuelle)
- le code source, écrit par un développeur, qui est compilé et/ou interprété en un code machine. 
    
On s'intéressera ici principalement au **code source**.

### Comment un code peut-il être propre ?

Les langages informatiques laissent une grande place à la **créativité du développeur.**
En commençant par le nommage des différentes entités manipulées, par l'architecture des composants ou encore par les algorithmes utilisés.      

Laissé bien souvent à lui-même, et comprenant correctement le code qu'il est en train de produire, le développeur parviens ainsi à écrire un code 
qui compile et qui parfois répond à un besoin métier exprimé par le client/sponsor. Dans un soucis permanent de rentabilité le développeur 
     se concentrera bien plus sur sa vélocité à produire des évolutions et à la résolution des nombreux bugs qui apparaissent dans son application.  
 
 Ainsi se forgent la plupart des programmes informatiques, où les améliorations se rajoutent petit à petit, et de plus en plus lentement. Les équipes changent, 
 de nouvelles personnes arrivent, et les besoins des utilisateurs évoluent.   
 Au fur et à mesure des changements, les évolutions fonctionnelles se font de plus en plus douloureuses,
  et les bugs (de plus en plus courants) se font de plus en plus tenaces à corriger.
  
  Cette douleur que vous avez très probablement déjà ressenti est un symptôme d'un code source qui: 
  
  - est dur à comprendre
  - est dur à faire évoluer
  - entraine des régressions à chaque tentative d'évolution
   - garde de nombreux bugs

### Mais finalement Fabien, qu'est-ce que le clean code ?

Le clean code, c'est le code qui est au contraire  

- fontionnel (sans bug)
- facile à comprendre
- facile à faire évoluer 


C'est tout ? Oui c'est tout.

J'ai même envie d'hasarder que cette définition est universelle dans le milieu des experts de la qualité de code. En tout cas,
elle est universellement acceptée par les auteurs de ce blog.

### C'est sympa ton truc mais pourquoi je devrais faire du clean code ?

Du code propre, c'est du code qui a été développé pour être maintenu. 
Les développeurs qui l'ont écrit ont fait cet effort   


### C'est sympa ton truc mais comment je sais si je produis du clean code moi ?
C'est là que ça devient compliqué. Parce que la notion de code lisible est subjective