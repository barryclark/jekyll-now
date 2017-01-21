---
layout: post
title: "Revisando Padrões com Java 8: O Padrão Template Method"
permalink: "/2017/01/revisando-padroes-java-8-template-method.html"
categories: [java, padroes, desing, comportamental]
---

No [último post da série sobre padrões]({{ site.baseurl }}{% post_url 2017-01-02-padrao-strategy %}) foi explicado o padrão Strategy, uso, desvantages e uma ótica de utilização com o Java 8. Continuando a série falarei do padrão Template Method seguindo a mesma linha e com exemplos. Será que conseguimos utilizá-lo com as _features_ do Java 8? Vamos ver.


> "Estamos presos ao modelo, somos parte dele."
>
> -- _V de Vingança_

# Template Method

Esse padrão define um modelo (_template_) de algoritmo, com pontos de extensão para serem utilizados por subclasses que irão adicionar comportamentos sem alterar a estrutura do algoritmo.

{% include image.html url="/images/20170102/padrao_template_method.svg" description="Diagrama do Padrão Template Method" %}

## Aplicabilidade

Podemos utilizar quando:

* queremos escrever as partes invariáveis de um algoritmo somente uma vez e deixar a implementação das partes variáveis para as suas subclasses;
* existe comportamento em comum entre as subclasses, então movemos (uma refatoração) esse comportamento para uma classe comum, evitando duplicação de código;
* queremos controlar a extensão das subclasses. Define-se um método template e a partir dele chamar várias _hook operations_ (um método padrão geralemente vazio) que podem ter os comportamentos definidos pelas subclasses.

## Antes do Java 8

