---
layout: post
title: Instanciação de Variáveis no Javascript
---

## Resumo

Este artigo foi feito para o Curso BE MEAN da [Webschool](http://webschool.io).  
Neste artigo iremos ver sobre alguns conceitos fundamentais para todos que utilizam JavaScript.
JS é uma linguagem que está em constante crescimento e amadurecimento atualmente.
Nesse artigo iremos ver um pouco sobre Hoisting, Clousure, Variáveis Globais, Variáveis
por parâmetro e Instanciação usando uma IIFE. Veremos também exemplos práticos sobre
cada tópico.

## Hoisting

**Hoisting** é um comportamento padrão do JavaScript que faz com que quando uma variável é
declarada ela é movida por padrão para o topo do escopo atual. Em outras palavras,
podemos utilizar variáveis antes de declarar elas em nosso código. Veja o **Exemplo** abaixo:

```js
myVar = 100;

console.log(myVar); // O valor impresso no console será 100

var myVar;
```

Devemos ter muito cuidado pois o **Hoisting** é aplicado apenas para declaração de variáveis.
E devemos lembrar que **Inicializar** uma variável não é a mesma coisa do que **Declarar** uma.
Veja o **Exemplo** abaixo:

```js
var initialized = 150; // Variável inicializada
declared = 100;

console.log('Declarada: ' + declared + ' / Inicializada: ' + initialized);
// O valor impresso no console será "Declarada: 100 / Inicializada: 150"

var declared; // Variável declarada
```

O **Hoisting** também é aplicado em funções. Nelas tanto o nome quanto o corpo da mesma
são movidos para o topo. Veja o **Exemplo** abaixo.

```js
myFunction(); // Executa a função 'myFunction' escrita depois da chamada da função

function myFunction() {
  console.log('It Works!!!');
}
```

## Closure

**Closure** são funções que são criadas dentro de outra função. Um **Closure** tem acesso
a três tipos de variáveis:
- Variáveis de seu próprio escopo;
- Variáveis do escopo da função em que foi criado;
- Variáveis de escopo global;
Veja o **Exemplo** abaixo:

```js
function myFunction(name) {
    var greeting = 'Hello, ';

    function myClosure() {
        var welcomeGreeting = '!Welcome!!!';

        console.log(greeting + name + welcomeGreeting);
    }

    myClosure();
}

myFunction('Wendell');
// O valor impresso no console será "Hello, Wendell!Welcome!!!"
```

## Variáveis Globais

Uma **Variável** é considerada **Global** quando é declarada fora de uma função.
**Variáveis Globais** podem ser acessadas em qualquer Escopo e por isso temos de tomar
muito cuidado ao utilizá-las. Veja o **Exemplo** abaixo:

```js
var globalVariable = 10;

function editMyGlobal(){
	globalVariable += 5
}

editMyGlobal();
console.log(globalVariable); // O valor impresso no console será 15
```

## Variáveis por parâmetro

Quando enviamos uma variável como parâmetro para alguma função, enviamos seu valor
para a mesma, fazendo assim referência às variáveis que são definidas na assinatura
de uma função. A variável passada só poderá ser acessada dentro do escopo da função.
Veja o **Exemplo** abaixo:

```js
function myFunction(param1, param2){
	console.log(param1 + param2);
}

myFunction(10, 90); // O valor impresso no console será 100
```
Quando enviamos uma **Variável Global** como parâmetro para uma função, também estamos
enviando seu valor e não a própria variável, dessa forma não há como alterar o valor
da **Variável Global** a enviando como parâmetro. Veja o **Exemplo** abaixo:

```js
var globalVariable = 1000;

function myFunction(param1){
	param1 = 50;
}

myFunction(globalVariable);
console.log(globalVariable); // O valor impresso no console será 1000
```

## Instanciação usando uma IIFE

Primeiramente vamos saber o que significa **IIFE**:

- ***Immediately-Invoked Function Expression***

Uma **IIFE** também pode ser conhecida como uma **Função Imediata**, pois como o nome
sugere, ela é uma função que é executada imediatamente após criada. É um **Design Pattern**
que é utilizado para evitar o **Hoisting**, encapsular funções e variáveis, evitar a
poluição do **Escopo Global** e evitar conflitos de variáveis e/ou funções com mesmo
nome. Uma **IIFE** pode ser utilizada com ou sem parâmetros. Veja o **Exemplo** abaixo:

```js
(function() {
	console.log('This is a IIFE!!!It really works!!!');
})();

(function(param) {
  console.log('WOW, it works with params too!!!Congratulations ' + param);
})('Wendell');
```
