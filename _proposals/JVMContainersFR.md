---
layout: page
title: La JVM et Docker, vers une symbiose parfaite!
permalink: /proposal/JVMinContainersFR
---

### Abstract

Les containeurs sont devenus en l'espace de quelques années un standard de-facto pour le déploiement de notre code que ce soit dans le Cloud ou on-perm, que ce soit pour des applications plus traditionnelle ou pour des fonctions Serverless. Les containeurs sont omniprésents, Docker en tête. De nouvelles plateformes, de nouveaux outils et frameworks ont rapidement émergés (ex. Knative, OpenFaas, Fn, JIB...) afin de simplifier l'utilisation de Docker. Parfois même, on utilise Docker sans nécessairement le savoir… Docker à l’insu de notre plein gré!

Cette session discute différentes approches et techniques afin d’optimiser l'utilisation de Java et de la JVM dans des containers Docker. Nous allons aborder des points tels que Jlink, CDS et AppCDS, Graal SVM, Project Portola, etc. Nous allons enfin discuter de certaines améliorations présentes ou à venir qui visent à améliorer les interactions entre la JVM et Docker.

Bien que le langage Java soit utilisé pour cette session, cette discussion n’est en rien spécifique à Java et est applicable à tous les langages tournant sur la JVM, Kotlin, Groovy, Scala, etc.
