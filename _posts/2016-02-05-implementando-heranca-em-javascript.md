---
layout: post
title: "Implementando Herança em JavaScript"
date: 2016-02-05 17:27:01
author: wendell
image: '/assets/img/'
description: 'Aprenda como implementar herança em JavaScript utilizando: prototype, call e Object.create()'
tags:
- javascript
- orientação a objetos
- herança
categories:
- JavaScript Orientado a Objetos
twitter_text: 'Aprenda como implementar herança em JavaScript utilizando: prototype, call e Object.create()'
---

***Este artigo foi feito para o Curso BE MEAN da [Webschool](http://webschool.io).***

## Entendendo o que é uma classe

Antes de explicar como funciona a `herança` em JavaScript, devemos entender primeiro o que
é uma `classe`.  

Uma `classe` nada mais é do que um `modelo` para se criar `objetos`. Esse modelo descreve as
`características` e `comportamentos` que todos objetos terão.

As `características` são os `atributos` e os `comportamentos` são os `métodos(funções)` das classes.  

Imagine se a `Terra` começasse a abrigar `alienígenas` e os governos quisessem manter o controle de
todos que estivessem vivendo aqui e para cada `alienígena` tivéssemos de saber seu `nome`, `idade` e `planeta`.
Criando um objeto teríamos:  
{% highlight javascript %}
var alien = {
  name : 'IOAS3356',
  age : 159,
  planet : 'Pluto'
};
{% endhighlight %}  

Mas isso seria inviável pois teríamos diversos `alienígenas` de diferentes planetas e teríamos que repetir
esse código em todo nosso programa. Então poderíamos criar uma `classe` para esse fim.

## Classes em JavaScript

Antes de sair o **ECMAScript 6**, o JavaScript apenas `simula` uma `classe` utilizando uma função. Essa função
é conhecida como `função construtora` e como o próprio nome indica, ela é responsável por criar novos `objetos`.
A chamada para essa função se diferencia de funções comuns, pois deve ser feita através da palavra reservada `new`.  

Vamos agora criar a nossa classe `Alien` para nosso **SRART - Sistema de Registro de Alienígenas Residentes na Terra:**  

{% highlight javascript %}
// Função construtura responsável por criar objetos Alien
function Alien(name, age, planet) {
  // Atributos da nossa classe
  this.name = name;
  this.age = age;
  this.planet = planet;

  // Método da nossa classe
  this.greeting = function() {
    console.log('#$#: ' + this.name + '! OADPL$%)@@#: ' + this.planet);
  };
};
{% endhighlight %}  

Agora que criamos a nossa classe, podemos criar diversos objetos utilizando ela:  

{% highlight javascript %}
// Criamos um objeto com os valores que passamos para a função construtura
var alien_one = new Alien('IOAS3356', 159, 'Pluto');
// Com nosso objeto criado, podemos acessar todos seus atributos e até mesmo fazer chamadas a seus métodos
alien_one.greeting();

// Criando outro objeto Alien
var alien_two = new Alien('ADVQ4490', 227, 'Mars');
alien_two.greeting();
{% endhighlight %}  

> Vocês podem ver que utilizei a palavra reservada `this` na hora de criar os `atributos` e o `método` de
nossa classe. Fiz isso, pois essa palavra está referenciando o `objeto` que será criado. Como podem ver
o método foi colocado dentro de nossa classe, o que não é o correto a se fazer, pois dessa maneira cada
objeto que criarmos terá um método. Vamos ver a forma correta de se fazer mais adiante.

## Herança em JavaScript

Primeiramente vamos entender o que é `herança`:
> É um mecanismo onde uma classe pai (superclasse) passa suas características para classes filhas (subclasses).
Uma classe que herda as características de outra pode ter características próprias além das herdadas.  

Como no JavaScript as `classes` são `simuladas`, não podemos implementar a `herança` como outras linguagens
orientadas a objetos, devemos utilizar algumas técnicas que veremos a seguir.

## Herança utilizando `prototype`, `call` e `Object.create()`

### Prototype

Todas as `funções` no JavaScript contém a propriedade `prototype` que vem vazia, mas pode ser alterada. Essa
propriedade é tratada como um `objeto` e nela podemos `anexar atributos e métodos`.  

Alterando a nossa classe `Alien` criada anteriormente para utilizar o `prototype`, ficaria assim:  

{% highlight javascript %}
// Função construtura responsável por criar objetos Alien
function Alien(name, age, planet) {
  // Atributos da nossa classe (anexados diretamenta na função)
  this.name = name;
  this.age = age;
  this.planet = planet;
};
// Anexando método ao prototype da nossa função construtura
Alien.prototype.greeting = function() {
  console.log('#$#: ' + this.name + '! OADPL$%)@@#: ' + this.planet);
};

// Criando objetos com a nossa função construtura e acessando seu método
var alien_one = new Alien('IOAS3356', 159, 'Pluto');
alien_one.greeting();

var alien_two = new Alien('ADVQ4490', 227, 'Mars');
alien_two.greeting();
{% endhighlight %}  

Como vocês podem ver, a `instanciação` de nossos `objetos` e a chamada do método `greeting()` não foi alterada, mas
então o que mudou? Antes teríamos dois objetos, cada um com seu método `greeting()` e agora utilizando o `prototype`,
o método `greting()` ficou anexado na nossa `função construtora` e temos apenas um método. Os métodos anexados no `prototype`
podem ainda acessar os valores do `objeto` declarados dentro da `função construtora` como mostrado no exemplo acima.

### Implementando a Herança

Imagine agora que o nosso sistema **SRART** deve separar os `alienígenas` por `espécie` e que além dos dados gravados
precisamos também de registrar dados específicos de cada `espécie`. Iremos fazer o uso do `prototype` para transformar a nossa classe
`Alien` em uma `Classe Pai` e iremos criar duas `Classe Filhas`:  

{% highlight javascript %}
// Função construtura responsável por criar objetos Gray
function Gray(name, age, planet, language) {
  Alien.call(this, name, age, planet);
  this.language = language;
};

Gray.prototype = Object.create(Alien.prototype);

// Função construtura responsável por criar objetos Reptilian
function Reptilian(name, age, planet, skinColor) {
  Alien.call(this, name, age, planet);
  this.skinColor = skinColor;
};

Reptilian.prototype = Object.create(Alien.prototype);
{% endhighlight %}  

A implementação da herança acontece nesses dois momentos:

#### Alien.call(this, name, age, planet)

Quando passamos o `this` como primeiro parâmetro, ele vai até a nossa classe `Alien` e faz com que todas as propriedades com `this`
apontem agora para nossa `Classe Filha`, dessa maneira todas as propriedades da classe `Alien` estão disponíveis em nossas `Classes Filhas`.
É muito importante se lembrar de sempre passar o `this` como primeiro parâmetro ao fazer isso.

#### Gray.prototype = Object.create(Alien.prototype) / Reptilian.prototype = Object.create(Alien.prototype)

Com isso fazemos com que o `prototype` de nossas `Classes Filhas` herdem todas as propriedades do `prototype` da nossa `Classe Pai`.

#### Utilizando as propriedades herdadas

Agora vamos criar um novo `método` que vai puxar o relatório de um `alienígena` e anexar no `prototype` das nossas `Classes Filhas`:  

{% highlight javascript %}
// Método para imprimir relatório de um Gray
Gray.prototype.showRegistry = function() {
  console.log('Name: ' + this.name);
  console.log('Age: ' + this.age);
  console.log('Planet: ' + this.planet);
  console.log('Language: ' + this.language);
};

// Método para imprimir relatório de um Reptilian
Reptilian.prototype.showRegistry = function() {
  console.log('Name: ' + this.name);
  console.log('Age: ' + this.age);
  console.log('Planet: ' + this.planet);
  console.log('Skin Color: ' + this.skinColor);
};
{% endhighlight %}  

Agora podemos cadastrar em nosso sistema **SRART** novos `alienígenas` utilizando nossas `Classes Filhas` ao invés de nossa
`Classe Pai` e puxar o relatório das mesmas:  

{% highlight javascript %}
// Criando nosso primeiro Gray
var gray_one = new Gray('IOAS3356', 159, 'Pluto', 'Graynian');
gray_one.showRegistry();

// Criando nosso primeiro Reptilian
var reptilian_one = new Reptilian('ADVQ4490', 227, 'Mars', 'Red');
reptilian_one.showRegistry();
{% endhighlight %}  
  
> Há outras formas de se implementar a herança em JavaScript, até mesmo formas mais simples com o **ECMAScript 6**,
mas deixarei para falar sobre essas formas em um próximo artigo! xD
