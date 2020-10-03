---
layout: post
title: k8s Cheatsheet
categories:
  - buenas prácticas
  - k8s
  - kubernetes
  - aprendizaje
tags:
  - k8s
  - mejora continua
published: true
---

> One time I tried to explain Kubernetes to someone.
Then we both didn't understand it. - https://twitter.com/SwiftOnSecurity/status/1158764816426840064?s=20

## List pods
> kubectl get pods --context pre

## View pod logs
> kubectl logs ml-re--pro-modelo-crecimiento-76bff8b4f4-thg6d --context pre

## View pod events
> kubectl describe pod ml-re--pro-modelo-crecimiento-76bff8b4f4-thg6d --context pre
