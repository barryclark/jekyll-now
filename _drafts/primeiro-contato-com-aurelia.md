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

{% highlight shell %}
npm i -g aurelia-cli
{% endhighlight %}

Acesse o diretório que deseja criar a aplicação pela linha de comando e execute o comando a seguir para criar uma nova aplicação **Aurelia**:

{% highlight shell %}
au new
{% endhighlight %}

Agora você irá responder algumas questões que o `CLI` irá te fazer:

{% highlight shell %}
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
{% endhighlight %}

Aguarde as dependências serem instaladas e acesse o diretório de sua aplicação:

{% highlight shell %}
cd aurelia-first-app
{% endhighlight %}

O `CLI` do **Aurelia** nos fornece alguns comandos para ajudar no desenvolvimento de nossa aplicação, entre eles:

- Para executar sua aplicação execute o comando:

{% highlight shell %}
au run
{% endhighlight %}

- Caso queira ativar o **hot-reload** utilize o comando:

{% highlight shell %}
au run --watch
{% endhighlight %}

- Para executar os testes utilize o comando:

{% highlight shell %}
au test
{% endhighlight %}

- Caso queira ativar os testes automáticos utilize o comando:

{% highlight shell %}
au test --watch
{% endhighlight %}

- Para criar sua aplicação para produção utilize o comando:

{% highlight shell %}
au build --env prod
{% endhighlight %}

- Para obter alguma ajuda sobre o `CLI` e ver outros comandos disponíveis utilize o comando:

{% highlight shell %}
au help
{% endhighlight %}

Para garantir que tudo ocorreu bem execute o comando `au run` para ver sua aplicação executando e acesse: `http://localhost:9000` em seu browser. Você deve ver apenas um título: **"Hello World!"** que indicará que o projeto está executando com sucesso.

## Entendendo sua aplicação Aurelia

Agora que temos nosso projeto configurado e executando normalmente, vamos entender a estrutura de nossa aplicação e aprender um pouco mais sobre uma aplicação **Aurelia!**

### Estrutura de diretórios

A estrutura de diretórios padrão que vem quando iniciamos um projeto é bem simples e muitos dos diretórios e arquivos são comuns em outras aplicações. Temos cinco diretórios:

- `aurelia_project:` Esse diretório possui códigos referentes ao `CLI` do **Aurelia** e não vamos alterar nenum desses arquivos.
- `node_modules:` Nem precisamos falar muito sobre esse diretório, é onde os módulos que usamos através do NPM são armazenados.
- `scripts:` Aqui encontramos dois bundles: `app-bundle.js` e o `vendor-bundle.js` que são referentes aos nossos códigos e códigos de bibliotecas de terceiros, respectivamente. Não precisaremos alterar esses arquivos, pois eles já estão configurados de forma que podemos usá-los.
- `src:` Esse é o diretório que vamos trabalhar com nossa aplicação, aqui ficará todo código de nossa aplicação.
- `test:` Esse é o diretório onde vamos guardar nossos arquivos de testes.

Além desses diretórios temos diversos arquivos como o `.babelrc`, `.editorconfig`, `package.json`, etc. Todos esses arquivos não são específicos do **Aurelia** e você já deve conhecer todos, ou pelo menos a maioria deles.

Nosso foco nesse artigo será o arquivo `index.html` e os arquivos dentro do diretório `src`. Então vamos lá!!!

### O arquivo `index.html`

Ao abrir o arquivo `index.html` você verá que ele é um arquivo extremamente simples. Nesse arquivo temos poucas coisas para explicar:

Na tag `body` temos um atributo `aurelia-app="main"`, esse atributo é usado para indicarmos o nome de nossa aplicação e também indicar para o **Aurelia** qual é o arquivo principal de nossa aplicação. Quando iniciar o **Aurelia** irá procurar um arquivo dentro do diretório `src` com o mesmo nome passado para o atributo `aurelia-app`.

Temos uma tag `script` que carrega o `vendor-bundle.js`que possui todo código necessário para nossa aplicação executar sem problemas e temos um atributo `data-main="aurelia-bootstrapper"`. O `aurelia-bootstrapper` é um módulo que irá procurar por atributos do **Aurelia** (por exemplo o atributo `aurelia-app` na tag `body`) e interpretar esses atributos.


### O diretório `src`

Quando olhamos esse diretório, nos deparamos com alguns arquivos `.js`, um diretório `resources` (que vamos explicar daqui a pouco) e um arquivo `.html`.

#### O arquivo `main.js`

Como falado anteriormente, o **Aurelia** irá buscar nesse diretório um arquivo com mesmo nome passado para o atributo `aurelia-app` que no nosso caso é o arquivo `main.js`. Esse arquivo é o ponto de partida de nossa aplicação, ou seja, onde vamos **configurar** nossa aplicação. Ao abrir esse arquivo vemos que ele realmente apenas cuida de fazer configurações de nossa aplicação e **iniciar** ela.

{% highlight javascript %}
import environment from './environment';

//Configure Bluebird Promises.
Promise.config({
  longStackTraces: environment.debug,
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
{% endhighlight %}

A primeira linha desse arquivo está fazendo um **import** de um objeto chamado `environment` do nosso arquivo `environment.js`, vamos abrir esse arquivo e entender o que ele faz.

Ao abrir o arquivo `environment.js` vemos que ele apenas define um objeto com dois atributos: `debug` e `testing`. No **Aurelia** podemos habilitar e desabilitar algumas funcionalidades de acordo com nossa necessidade. Por exemplo, podemos habilitar o debug quando estivermos em desenvolvimento e desabilitar ele ao enviar a aplicação para produção. Como estamos em desenvolvimento iremos deixar ambos habilitados.

Voltando ao nosso arquivo `main.js`, o próximo código em nosso arquivo é a configuração de nossas **Promises**, por padrão o **Aurelia** utiliza o **Bluebird** para cuidar das **Promises**:

{% highlight javascript %}
//Configure Bluebird Promises.
Promise.config({
  longStackTraces: environment.debug,
  warnings: {
    wForgottenReturn: false
  }
});
{% endhighlight %}

Aqui usamos o atributo `debug` do arquivo `environment.js` para definir se iremos habilitar um **Stack Trace** completo. O atributo `wForgottenReturn` é usado para emitir um **warning** caso algum `return` seja esquecido no código.

Depois de configurar as **Promises**, temos a configuração da nossa aplicação **Aurelia** dentro da função `configure`. No começo da função, dizemos ao **Aurelia** para usar uma configuração padrão e definimos o nosso diretório `resources` como uma feature:

{% highlight javascript %}
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');
{% endhighlight %}

Mas você deve estar se perguntando, **WTF is a FEATURE?!?!?!**. Muito bem, vamos entender agora.

#### Aurelia Features

O **Aurelia** permite que reutilizemos código através da funcionalidade `feature`, que nada mais é que um grupo de componentes ou funcionalidades que juntas se tornam uma `feature`. Dessa maneira podemos utilizar nossas **features** em todos outros componentes que criarmos em nossa aplicação.

Por padrão, ao criar um projeto pelo `CLI` do **Aurelia**, ele já nos disponibiliza uma `feature` chamada **resources** que como o nome diz são recursos que podemos reutilizar em toda nossa aplicação. Ao abrir o diretório `src/resources`, nos deparamos com um arquivo `index.js` que é obrigatório ao criar uma nova `feature` e vemos quatro diretórios, cada um deles é referente a uma funcionalidade que o **Aurelia** possui, vamos agora entender o que é cada uma delas:

- `attributes:` Esse diretório é utilizado para colocarmos todos **Custom Attributes** de nossa aplicação. **Custom Attributes** são usados no **Aurelia** para modificar o comportamento ou adicionar funcionalidades a algum elemento DOM. Não vamos aprofundar nisso agora, mas **Custom Attributes** podem funcionar apenas ao vincular ele com um elemento no DOM ou podem necessitar de algum valor para funcionarem. Um exemplo simples de um **Custom Attribute** é um que transforma um elemento em um painel quadrado com bordas por exemplo:

{% highlight javascript %}
// square-panel.js
export class SquarePanelCustomAttribute {
  static inject = [Element];

  constructor(element){
    this.element = element;
    this.element.style.width = this.element.style.height = '150px';
    this.element.style.border = '2px solid #000';
    this.element.style.padding = '10px';
  }
}
{% endhighlight %}


{% highlight html %}
<template>
  <require from="./square-panel"></require>
  <div square-panel></div>
</template>
{% endhighlight %}

**OBS:** O nome do **Custom Attribute** deve seguir a convenção utilizada pelo **Aurelia** que é utilizar **NOME DO ATRIBUTO + CustomAttribute** (todas iniciais em maiúsculo) para o nome da classe no **JavaScript** e usar ela no **HTML** com nome todo em minúsculo e separado por `-`. No nosso exemplo a classe **SquarePanelCustomAttribute** é usada através do atributo **square-panel**.

- `binding-behaviors:` Esse diretório é utilizado para colocarmos todos os **Custom Binding Behaviors** de nossa aplicação. **Binding Behaviors** são usados no **Aurelia** para conversão de valores, mas tem uma grande diferença entre ele e os **Value Converters** que vamos ver mais a frente. Um **Binding Behavior** tem acesso total à instância que está sendo usada através de seu ciclo de vida, diferente de um **Value Converter** que tem acesso apenas ao interceptar a troca de valores entre a **view** e o **model** e vice-versa. O **Aurelia** já fornece alguns **Binding Behaviors** para usarmos, você pode checar eles **[aqui](http://aurelia.io/hub.html#/doc/article/aurelia/binding/latest/binding-binding-behaviors/1)**!

- `elements:` Esse diretório é utilizado para colocarmos todos os **Custom Elements** de nossa aplicação. Se você trabalhou com **React**, **Angular 1.5 com components** e **Vue.js**, você provavelmente não terá dificuldade alguma em trabalhar com os **Custom Elements** do **Aurelia**. Esse é o principal recurso que iremos utilizar para componentizar nossa aplicação. Não iremos aprofundar nessa parte agora, pois tem muita coisa para se falar sobre **Custom Elements**, por agora basta saber que podemos ter diversos tipos de **Custom Elements**:

  - **Custom Elements criados apenas com HTML:** o tipo mais simples possível, onde não precisamos de utilizar uma lógica `ViewModel`. O nome do elemento será o mesmo do nome do arquivo `.html` e eles podem até mesmo utilizar propriedades (através do atributo `bindable`) e outros elementos. Vamos ver um exemplo bem simples:

  {% highlight html %}
  // hello-world.html
  <template bindable="greeting, fullName">
    ${greeting} ${fullName}
  </template>
  {% endhighlight %}

  {% highlight html %}
  // app.html
  <template>
    <require from="./hello-world.html"></require>
    <hello-world greeting="Hello" full-name="Aurelia Framework"></hello-world>
  </template>
  {% endhighlight %}

  - **Custom Elements compostos de HTML e JavaScript:** para se criar um elemento que tenha **View** e **Model** é extremamente simples no **Aurelia**, basta criar um arquivo `.js` e um arquivo `.html` com o mesmo nome e pronto. Assim como o **Custom Attribute**, você deve seguir a convenção do **Aurelia** que é **NOME DO ELEMENT + CustomElement** (todas iniciais em maiúsculo) para o nome da classe no **JavaScript** e usar ela no **HTML** com nome todo em minúsculo e separado por `-`. Muito cuidado, pois **Custom Elements** devem obrigatoriamente ter uma tag de fechamento. Vamos ver um exemplo bem simples:

  {% highlight javascript %}
  // hello-world.js
  export class HelloWorldCustomElement {
    greeting = 'Hello Aurelia Framework!';
  }
  {% endhighlight %}

  {% highlight html %}
  // hello-world.html
  <template>
    ${greeting}
  </template>
  {% endhighlight %}

  {% highlight html %}
  // app.html
  <template>
    <require from="./hello-world"></require>
    <hello-world></hello-world>
  </template>
  {% endhighlight %}

- `value-converters:` Esse diretório é utilizado para colocarmos todos os **Value Converters** de nossa aplicação. **Value Converters** são usados no **Aurelia** para conversão de valores entre a **View** e o **Model**. Para converter um valor do **Model** para a **View** devemos criar uma função `toView` e para fazer o caminho inverso devemos criar uma função `fromView`. Assim como o **Custom Attribute**, você deve seguir a convenção do **Aurelia** que é **NOME DO CONVERTER + ValueConverter** (todas iniciais em maiúsculo) para o nome da classe no **JavaScript** e usar ela no **HTML** com `|` + **NOME DO CONVERTER** com primeira letra em minúsculo. Vamos ver um exemplo bem simples de como criar um conversor de data utilizando a biblioteca **Moment**:

{% highlight javascript %}
// format-date.js
import moment from 'moment';

export class FormatDateValueConverter  {
  toView(value) {
    return moment(value).format('D/M/YYYY');
  }
}
{% endhighlight %}

{% highlight javascript %}
// converter-test.js
export class ConverterTest {
  constructor() {
    this.currentDate = newDate();
  }
}
{% endhighlight %}

{% highlight html %}
// converter-test.html
<template>
  <require from="./format-date"></require>
  ${currentDate | formatDate}
</template>
{% endhighlight %}

#### Voltando ao arquivo `main.js`

Depois de aprendermos bastante sobre alguns recursos do **Aurelia**, vamos continuar a explicar o nosso arquivo `main.js`. Logo após configurar o diretório `resources` como uma `feature` vemos dois **ifs**:

{% highlight javascript %}
if (environment.debug) {
  aurelia.use.developmentLogging();
}

if (environment.testing) {
  aurelia.use.plugin('aurelia-testing');
}
{% endhighlight %}

O primeiro **if** verifica se o `debug` está ativado em nosso `environment.js` e caso esteja ele ativa os **logs** de desenvolvimento, que são logs detalhados do que acontece em nossa aplicação, já o segundo **if** verifica se o `testing` está ativado em nosso `environment.js` e caso esteja ele ativa o plugin `aurelia-testing` que é usado para executar testes em nossa aplicação.

Por último e não menos importante temos a seguinte linha de código:

{% highlight javascript %}
aurelia.start().then(() => aurelia.setRoot());
{% endhighlight %}

Essa linha chama o método `start` que é o que inicia o **Aurelia** e retorna uma **Promise**, depois de retornada, o Framework está pronto para iniciar (todos plugins, bibliotecas, etc foram carregados) e agora podemos indicar o ponto inicial para nossa aplicação com o método `setRoot`. Caso não seja passado nenhum parâmetro para essa função ela assume que o elemento DOM que vai ser usado pela sua aplicação é o elemento com o atributo `aurelia-app` no arquivo `index.html` e que o **Componente Pai/Componente Raiz** da sua aplicação é o componente `app.js/app.html`. Caso queira customizar, basta passar os parâmetros como no código abaixo:

{% highlight javascript %}
aurelia.start().then(() => aurelia.setRoot('awesome-app', document.getElementById('my-app')));
{% endhighlight %}

O código acima faz com que o elemento com o atributo `id="my-app"` seja o elemento DOM que será usado pela sua aplicação e que o componente `awesome-app.js/awesome-app.html` seja o **Componente Pai/Componente Raiz** da sua aplicação.

#### O componente `app`

Depois de aprender como uma aplicação **Aurelia** realmente funciona, vamos ver agora como trabalhar com componentes em nossa aplicação. Por padrão o `CLI` cria um componente `app` que é composto por uma **View:** `app.html` e um **Model:** `app.js`. Vamos abrir o arquivo `app.js`, nele temos o seguinte código:

{% highlight javascript %}
export class App {
  constructor() {
    this.message = 'Hello World!';
  }
}
{% endhighlight %}

Podemos ver que é um arquivo extremamente simples, aqui temos apenas a criação de uma **classe** que na hora que está sendo criada define um **atributo** `message` que será usado pela **View**.

Agora ao abrir o arquivo `app.html` vemos o seguinte código:

{% highlight html %}
<template>
  <h1>${message}</h1>
</template>
{% endhighlight %}

Essa é a **View** do componente `app` e a única coisa que ela faz é imprimir um título com o valor do **atributo** `message` do **Model**. Extremamente simples não é?

Que tal agora brincarmos um pouco com o código e fazer um simples exemplo com algumas coisas que aprendemos até aqui? Vamos lá?!?!?

## Sua primeira aplicação

Agora que você já sabe como o **Aurelia** funciona, já conhece muitos dos seus recursos, que tal juntar esse conhecimento e fazer sua primeira aplicação com ele hein?!?!?

Vamos fazer uma simples aplicação para mostrar uma mensagem, mas criando um **Custom Element**, um **Custom Attribute** e um **Value Converter** e adicionando eles ao nosso `app.html`;

### Criando o Value Converter

Dentro do diretório `src/resources/value-converters` crie um arquivo chamado `capitalize-words.js`. Nesse arquivo coloque o seguinte código:

{% highlight javascript %}
export class CapitalizeWordsValueConverter  {
  toView(value) {
    return value.replace(/\b\w/g, l => l.toUpperCase());
  }
}
{% endhighlight %}

Esse **Value Converter** será responsável por fazer com que a primeira letra de cada palavra na **string** passada seja transformada para maiúscula (capitalizada). Viu como é fácil criar um **Value Converter**??? Agora vamos criar nosso **Custom Attribute**.

### Criando o Custom Attribute

Dentro do diretório `src/resources/attributes` crie um arquivo chamado `primary-text.js`. Nesse arquivo coloque o seguinte código:

{% highlight javascript %}
export class PrimaryTextCustomAttribute {
  static inject = [Element];

  constructor(element) {
    this.element = element;
    this.element.style.color = 'red';
    this.element.style.fontFamily = 'Verdana, sans-serif';
    this.element.style.fontSize = '26px';
    this.element.style.fontWeight = 'bolder';
  }
}
{% endhighlight %}

Esse **Custom Attribute** será responsável por estilizar o texto de nosso **Custom Element** que será criado a seguir.

### Criando o Custom Element

Dentro do diretório `src/resources/elements` crie um diretório chamado `greeting-message` e dentro desse diretório crie os arquivos: `greeting-message.js` e `greeting-message.html`.

No arquivo `greeting-message.js` coloque o seguinte código:

{% highlight javascript %}
export class GreetingMessageCustomElement {
  constructor() {
    this.greeting = 'hello aurelia framework!';
  }
}
{% endhighlight %}

No arquivo `greeting-message.html` coloque o seguinte código:

{% highlight html %}
<template>
  <require from="../../attributes/primary-text"></require>
  <require from="../../value-converters/capitalize-words"></require>
  <h1 primary-text>${greeting | capitalizeWords}</h1>
</template>
{% endhighlight %}

Esse **Custom Element** apresenta um título na página utilizando o **Value Converter** e o **Custom Attribute** criados anteriormente. Agora vamos usar o **Custom Element** criado em nossa aplicação.

### Utilizando o componente criado

Para usar nosso **Custom Element**, devemos inserir ele em nosso arquivo `app.html`, então abra esse arquivo e deixe ele como o código abaixo:

{% highlight html %}
<template>
  <require from="./resources/elements/greeting-message/greeting-message"></require>
  <greeting-message></greeting-message>
</template>
{% endhighlight %}

Dessa forma estaremos utilizando agora o nosso componente criado e podemos alterar o nosso `app.js` para conter apenas o código:

{% highlight javascript %}
export class App {}
{% endhighlight %}

## Conclusão

Agora salve os arquivos, vá até a pasta `aurelia-first-app` pela linha de comando e execute o comando `au run` para executar sua aplicação. Vá até http://localhost:9000 e você irá ver sua aplicação executando!!! Nesse momento você deverá ver a mensagem **Hello Aurelia Framework!** com as palavras capitalizadas, na cor vermelha e em negrito, mostrando assim que seu componente `greeting-message` está usando o **Custom Attribute** e o **Value Converter** que criamos!!!

Pronto, você agora sabe como o **Aurelia** funciona e já criou sua primeira aplicação com ele!!! Fique ligado pois esse é só o primeiro post dessa série de artigos sobre esse Framework, nos próximos artigos vamos criar uma aplicação mais complexa com o **Aurelia**!!!

Você pode conferir o código desse artigo por **[esse link](https://github.com/WendellAdriel/aurelia-first-app)**!!!

Espero que tenham gostado e até o próximo artigo!!! Abraços!!!
