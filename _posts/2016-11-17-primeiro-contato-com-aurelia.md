---
layout: post
title: "Primeiro Contato com Aurelia"
date: 2016-11-17 13:22:59
author: wendell
image: '/assets/img/'
description: 'Tendo o primeiro contato com o Framework Aurelia'
tags:
- javascript
- framework
- es6
- aurelia
categories:
- Frameworks JavaScript
twitter_text: 'Tendo o primeiro contato com o Framework Aurelia'
---

## Introdução

Olá pessoal, depois de muito tempo sem conteúdo a **CodeShare está de volta!!!** A partir de agora como o time de autores da **CodeShare** está maior, a frequência de novos conteúdos irá aumentar bastante e iremos falar sobre diversos assuntos e tecnologias, então fique ligado!!!  

Você deve estar pensando - **"WTF??? Outro Framework JavaScript???"** - sim, sim. Porém o **Aurelia** me chamou a atenção por causa de alguns pontos, entre eles:

- Simples de se usar
- Fácil de configurar
- Baseado em componentes
- Permite escrever código em *Vanilla JS*
- Tem suporte para códigos desenvolvidos com **ES5, ES6 e também TypeScript**

Tem mais alguns pontos que me chamou a atenção, mas nesse primeiro momento vamos manter o básico. Esse é o primeiro artigo de uma série de artigos em que irei mostrar como podemos trabalhar com o **Aurelia**, e a partir daí você poderá decidir se vai continuar usando ele ou não. De toda maneira, conhecimento nunca é demais então vamos começar a aprender em como trabalhar com o **Aurelia!**

## Configurando seu projeto

Nesse primeiro post vamos construir uma pequena e simples aplicação, apenas para explicar alguns conceitos básicos do Aurelia e como iniciar um projeto do zero com ele. Para continuar você precisa ter o **Node** na versão 4 ou mais atual (caso não tenha, instale ele antes de continuar).  

Agora vamos baixar o `CLI` oficial do **Aurelia**:

```
npm i -g aurelia-cli
```

Acesse o diretório que deseja criar a aplicação pela linha de comando e execute o comando a seguir para criar uma nova aplicação **Aurelia**:

```
au new
```

Agora você irá responder algumas questões que o `CLI` irá te fazer:

```
Please enter a name for your new project below.
# Digite aurelia-first-app

Would you like to use the default setup or customize your choices?
# Digite 3 para customizar a nossa aplicação

What transpiler would you like to use?
# Apenas digite enter, usaremos Babel para essa série de artigos

What css processor would you like to use?
# Digite 4, usaremos o Stylus para essa série de artigos

Would you like to configure unit testing?
# Apenas digite enter, não iremos criar testes agora pois estamos criando apenas uma aplicação inicial para entender como o Aurelia funciona, mas é uma boa prática sempre fazer testes, então já deixe o projeto configurado para testes

What is your default code editor?
# Digite o número referente ao editor que estiver usando, caso não seja nenhum desses apenas digite enter

Would you like to create this project?
# Confira as opções apresentadas e caso esteja correto apenas digite enter

Would you like to install the project dependencies?
# Apenas digite enter para instalar as dependências
```

Aguarde as dependências serem instaladas e acesse o diretório de sua aplicação:

```
cd aurelia-first-app
```

O `CLI` do **Aurelia** nos fornece alguns comandos para ajudar no desenvolvimento de nossa aplicação:

- Para executar sua aplicação execute o comando:

```
au run
```

- Caso queira ativar o **hot-reload** utilize o comando:

```
au run --watch
```

- Para criar sua aplicação para produção utilize o comando:

```
au build --env prod
```

- Para obter alguma ajuda sobre o `CLI` utilize o comando:

```
au help
```

Para garantir que tudo ocorreu bem execute o comando `au run` para ver sua aplicação executando e acesse: `http://localhost:9000` em seu browser. Você deve ver apenas um título: **"Hello World!"** que indicará que o projeto está executando com sucesso.

## Entendendo sua aplicação Aurelia
