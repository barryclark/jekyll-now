---
layout: post
title: "Garbage Collector no JavaScript"
date: 2016-02-05 14:32:46
author: wendell
image: '/assets/img/'
description: 'Aprenda como o Garbage Collector trabalha no JavaScript'
tags:
- javascript
- ambiente
- fundamentos
categories:
- Conceitos Básicos de JavaScript
twitter_text: 'Aprenda como o Garbage Collector trabalha no JavaScript'
---

***Este artigo foi feito para o Curso BE MEAN da [Webschool](http://webschool.io).***

> O termo `Garbage Collector` é usado para definir o processo automatizado de gerenciamento de memória,
onde se recupera uma parte da memória que não está sendo mais utilizada por um programa, evitando assim o
esgotamento de memória para outros processos.  

Linguagens de baixo nível geralmente não utilizam esse processo e deve ser feito de uma forma mais manual.
JavaScript por sua vez utiliza um processo automatizado, vamos entender um pouco de como funciona:

## Armazenamento de Variáveis

Quando declaramos uma `variável`, seja ela um `objeto`, um `array`, uma `string`, etc. O JavaScript automaticamente
aloca um espaço na memória para a `variável`. Essa alocação pode ser feita de diversas maneiras:

- **Inicializaçã do valor:** Quando inicializamos uma variável com algum valor. Exemplos:
```js
var name = 'Wendell';
var age = 23;
var person = {
  name : 'Someone',
  age : 25,
  married : false
};
```

- **Alocação por chamada de função:** Quando usamos funções, algumas podem resultar em uma alocação de objeto. Exemplos:
```js
// Aloca um objeto de data
var today = new Date();
// Aloca um elemento DOM
var element = document.createElement('p');
// Aloca uma nova string quando utilizado o método substr
var greeting = 'Hello World!';
var cut = greeting.substr(0, 5);
```


## Chamada de Funções

Em JavaScript quando declaramos uma `função`, ela é armazenada/alocada como um `objeto` que podemos fazer chamadas. Ao
definir uma função, apenas damos um nome a ela e especificamos o que será feito quando a mesma for chamada. Temos
algumas maneiras de se definir uma função, por exemplo:

```js
function avg_value(value1, value2) {
  return (value1 + value2) / 2;
}

var avg_value = function(value1, value2) {
  return (value1 + value2) / 2;
}
```

Quando fazemos uma chamada para a função criada, ele acessa o espaço alocado na memória e executa as ações especificadas
quando a função foi definida. Para fazer uma chamada para uma função basta utilizar seu nome e passar os parâmetros (quando
necessário). Também podemos fazer chamadas a funções dentro de outras funções. Exemplos:

```js
// Chamando a função criada anteriormente
avg_value(10, 8);
// Chamando a função criada anteriormente dentro de outra função
console.log(avg_value(10, 6));
```

## Garbage Collector no JavaScript

O JavaScript utiliza o `Garbage Collector` para liberar memória ocupada por valores (strings, objetos, funções, etc)
que não estão mais em uso, para isso o `Garbage Collector` do JavaScript utiliza de um algoritmo chamado `Mark and Sweep`.

### Entendendo o algoritmo Mark and Sweep

Esse algoritmo checa periodicamente `toda` a lista de de variáveis do ambiente JavaScript, marcando todos valores referenciados
por essas variáveis. Quando o valor é um `objeto` ou um `array`, ele marca recursivamente as propriedades (caso seja um objeto) e
os elementos (caso seja um array).  

Dessa maneira ele recursivamente varre essa `árvore (ou grafo)` de valores e consegue encontrar e `marcar` todos valores que ainda são
utilizados e deduz que todos os valores que `não foram marcados` são `lixo`.  

Depois de terminada a fase de marcação, o `Garbage Collector` inicia a fase de `limpeza`. Durante essa fase ele verifica todos itens
que não estão marcados e então `desaloca` esses itens da memória.  

`Garbage Collectors` antigos executam as duas fases por completo de uma só vez, deixando o sistema lento durante o processo de limpeza.
Os mais novos conseguem otimizar esse processo deixando a `coleta` ativa em segundo plano sem atrapalhar a performance do sistema.
