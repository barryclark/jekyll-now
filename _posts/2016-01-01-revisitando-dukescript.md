---
layout: post
title: "Revisitando o Dukescript"
permalink: "/2016/01/revisitando-dukescript.html"
categories: [java, dukescript, html5]
---

A algum tempo fiz um [post]({% post_url 2015-05-15-dukescript-html5-e-java-juntos %}) sobre o [Dukescript](https://dukescript.com/) e agora vou colocar as **minhas** impressões sobre essa pequena experiência com a tecnologia.

## Pontos positivos

* **binários multi-plataforma sem complicações** - o build abstrai toda a complexidade na geração do binário;
* **separação MVC bem clara** - a _view_, o _model_ e o _controller_ são muito bem separados na arquitetura do Dukescript;
* **utilização de HTML5 e CSS** - a parte visual da aplicação fica muito mais rica e simples utilizando o HTML5 e CSS;
* **o Java de volta ao browser** - utilizar Java em navegadores sem plugins ou applets é excelente;
* **utilização de bibliotecas Javascript** - Jquery, Knockout etc podem ser utilizadas facilmente pelo Dukescript;
* **facilidade para testes automatizados** - a estrutura do Dukescript permite a criação fácil de testes automatizados para cada camada da aplicação;
* **sem redeploys** - ao salvar o código só é necessário efetuar um _reload_ na aplicação, para o mesmo ser refletido na aplicação.

## Pontos negativos

* **plugin somente para uma IDE** - apesar de eu preferir o Netbeans como IDE, acredito que é um ponto fraco a falta de suporte para as outras;
* **pouco material de aprendizagem** - á uma série de posts no blog oficial, mas muito superficiais ainda, acredito que seja por ser uma tecnologia muito nova;
* **tecnologia muito nova** - por ser uma tecnologia muito nova não recomendaria para projetos médios para grandes ou grandes;
* **dependência do plugin Netbeans** - caso não queira utilizar o plugin do Netbeans a configuração do projeto se torna muito onerosa.

Lembro que esses pontos são minhas opniões através de uma impressão de primeiro momento ao experimentar a tecnologia. Criei um pequeno [projeto](https://github.com/ivanqueiroz/devtools) para aprender o Dukescript.

Um abraço e até a próxima!
