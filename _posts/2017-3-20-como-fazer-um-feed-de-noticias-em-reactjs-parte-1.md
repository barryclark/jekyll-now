---
layout: post
title: Como fazer um feed de notícias em React.js - Parte 1
ref: react_1
lang: pt
---

Este é o início de uma série de posts sobre React.js. O objetivo é contruir um feed de notícias com atualizações em tempo real. Além do front-end, vamos implementar também um back-end em Rails. Este primeiro post é uma introdução ao React.js. Então mesmo que você não seja um programador Rails, este post pode ser útil pra você!

Para quem está iniciando em React pode parecer complicado o número de tecnologias e ferramentas disponíveis. Então vamos deixar as coisas bem simples aqui para facilitar o aprendizado.

Vamos construir a aplicação passo a passo e vamos introduzindo alguns conceitos teóricos do React no momento mais oportuno. Caso você queria o código-fonte da aplicação, ele está disponível neste [repositório do GitHub](https://github.com/lutchobandeira/news-feed-react).

Criando o projeto React.js
--------------------------

A maneira mais fácil de criar um projeto React é utilizando o [create-react-app](https://github.com/facebookincubator/create-react-app). O ```create-react-app``` traz tudo que precisamos para nosso projecto React:

- [webpack](https://webpack.github.io/) - um module bundler que trabalha muito bem com o npm. Ele também inclui um web server e um file watcher.
- [Babel](https://babeljs.io/) - um compilador javascript que oferece suporte a última versão do javascript mesmo que os browsers ainda não ofereçam.
- [Autoprefixer](https://autoprefixer.github.io/) - um plugin que adiciona os prefixos de CSS dos browsers automaticamante.
- [ESLint](http://eslint.org/) - uma ferramenta que analisa o código e aponta eventuais problemas.

Vamos criar o projeto:

``` bash
$ npm install -g create-react-app
$ create-react-app news-feed
```

Feito isso já podemos entrar na pasta e iniciar nosso servidor:

``` bash
$ cd news-feed/
$ npm start
```

Pronto! Nosso servidor já está disponível em [http://localhost:3000](http://localhost:3000) (ou em outra porta se a porta 3000 já estiver em uso).

Componentes React
-----------------

O ```create-react-app``` criou um componente raíz chamado ```App```. Vamos aproveitar para introduzir alguns conceitos de React. Dê uma rápida olhada no código abaixo:

<pre class="line-numbers "><code class="language-jsx">
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      &lt;div className="App"&gt;
        &lt;div className="App-header"&gt;
          &lt;img src={logo} className="App-logo" alt="logo" /&gt;
          &lt;h2&gt;Welcome to React&lt;/h2&gt;
        &lt;/div&gt;
        &lt;p className="App-intro"&gt;
          To get started, edit &lt;code&gt;src/App.js&lt;/code&gt; and save to reload.
        &lt;/p&gt;
      &lt;/div&gt;
    );
  }
}

export default App;
<!-- 
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
-->
</code></pre>

Algumas coisas que podemos observar logo de cara:

- Todo componente React herda de ```Component```;
- O método ```render``` é implementado;
- Há uma sintaxe parecida com HTML dentro do método ```render```. Esse é o JSX, veremos a seguir.

JSX
---

O ```JSX``` é uma sintaxe que o React utiliza para descrever seus componentes. No código do componente ```App``` observamos que a tag JSX ```div``` é na verdade um componente do React que representa a tag ```div``` do HTML. Devido a essa semelhança, às vezes nos confundimos e achamos que "tem HTML dentro do javascript".

O ```JSX``` é uma extensão ao javascript, mas no estilo ```XML```. Como veremos a seguir, para cada elemento HTML há um componente do React correspondente, pronto para ser usado.

Podemos pensar no ```JSX``` como uma sintaxe intermediária que será convertida em javascript, assim como SASS é uma sintaxe intermediária para CSS.

O que de fato converte o JSX em javascript é o [Babel](https://babeljs.io/]){:target="_blank"}, o compilador javascript incluso no ```create-react-app```.

O mesmo código acima convertido para javascript ficaria assim:

``` jsx
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return React.createElement(
      'div',
      { className: 'App' },
      React.createElement('div', { className: 'App-header' },
        React.createElement('img', { src: logo, className: 'App-logo', alt: 'logo' }),
        React.createElement('h2', null, 'Welcome to React')
      ),
      React.createElement('p', { className: 'App-intro' },
        'To get started, edit ',
        React.createElement('code', null, 'src/App.js'),
        ' and save to reload.'
      )
    );
  }
}

export default App;
```

Antes de começar nossa implementação, só um pouquinho mais de teoria. Veja a assinatura do método ```createElement```:

``` jsx
React.createElement(type, [props], [...children])
```

Logo, na seguinte chamada:

``` jsx
React.createElement('img', {src: logo, className: 'App-logo', alt: 'logo'})
```

- ```img``` é o tipo do elemento. Para cada elemento HTML existe uma componente React correspondente.
- ```{src: logo, className: 'App-logo', alt: 'logo'}``` são as ```props``` desse componente. Podemos pensar nas ```props``` como argumentos de uma função. E podemos pensar nos components React como funções, que recebem ```props``` e retornam um elemento React.
- Observe que os componentes React que representam tags HTML, como no exemplo acima, costumam usar ```props``` com os mesmos nomes dos atributos HTML. Com exceção de ```className```, que foi utilizado ao invés de ```class``` por esta ser uma palavra reservada do javascript.

Implementando o primeiro componente
-----------------------------------

Como estamos fazendo um feed de notícias, nada melhor do que começar implementando este componente. A implementação fica bem simples:

<pre class="line-numbers" data-start="14"><code class="language-jsx">
class Feed extends Component {
  render() {
    return (
      &lt;div className="feed"&gt;
        &lt;div className="post"&gt;
          &lt;span&gt;This is my first post!&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    )
  }
}
<!--
class Feed extends Component {
  render() {
    return (
      &lt;div className="feed"&gt;
        &lt;div className="post"&gt;
          &lt;span&gt;This is my first post!&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    )
  }
}
-->
</code></pre>

Vamos exibir o nosso ```Feed``` no ```render``` do componente raíz ```App```:

<pre class="line-numbers" data-start="4" data-line="5"><code class="language-jsx">
class App extends Component {
  render() {
    return (
      &lt;div className="App"&gt;
        &lt;Feed /&gt;
      &lt;/div&gt;
    );
  }
}
<!--
class App extends Component {
  render() {
    return (
      <div className="App">
        <Feed />
      </div>
    );
  }
}
-->
</code></pre>

[Ver no CodePen](https://codepen.io/lutchobandeira/pen/EWbvVP){:target="_blank"}

Extraindo o componente ```Post```
---------------------------------

Como você já deve ter percebido, é possível extrair um componente ```Post``` de dentro do componente ```Feed```. Essa é uma das principais ideias do React, ir compondo um componente grande a partir de vários componentes pequenos:

<pre class="line-numbers" data-start="14" data-line="5-6"><code class="language-jsx">
class Feed extends Component {
  render() {
    return (
      &lt;div className="feed"&gt;
        &lt;Post content="This is my first post!" /&gt;
        &lt;Post content="This is my second post!" /&gt;
      &lt;/div&gt;
    )
  }
}
<!--
class Feed extends Component {
  render() {
    return (
      <div className="feed">
        <Post content="This is my first post!" />
        <Post content="This is my second post!" />
      </div>
    )
  }
}
-->
</code></pre>

Veja que adicionamos um pouco mais de dinamismo aqui. Passamos o texto de cada post através de uma ```prop``` do nosso componente ```Post``` que se chama ```content```. A implementação do componente ```Post``` fica assim:

<pre class="line-numbers" data-start="25" data-line="5"><code class="language-jsx">
class Post extends Component {
  render() {
    return (
      &lt;div className="post"&gt;
        &lt;span&gt;{this.props.content}&lt;/span&gt;
      &lt;/div&gt;
    )
  }
}
<!--
class Post extends Component {
  render() {
    return (
      &lt;div className="post"&gt;
        &lt;span&gt;{this.props.content}&lt;/span&gt;
      &lt;/div&gt;
    )
  }
}
-->
</code></pre>

[Ver no CodePen](https://codepen.io/lutchobandeira/pen/aJVyNN){:target="_blank"}

Utilizando o ```state```
------------------------

Ao invés de criar na mão um componente ```Post``` para cada notícia, vamos criar uma lista de notícias e depois exibir via javascript um componente para cada elemento dessa lista.

<h3>Diferença entre <code>state</code> e <code>props</code></h3>

Para isso vamos utilizar o ```state```. Ao contrário do caráter imutável das ```props```, o ```state``` é mutável. Como queremos que essa lista de notícias cresça com o tempo, faz todo sentido amazenar essa lista no ```state``` do nosso componente ```Feed```.

Inicializamos o ```state``` no construtor de nossa classe, assim:

<pre class="line-numbers" data-start="14" data-line="2-9,12-14, 17"><code class="language-jsx">
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {content: 'This is my first post!'},
        {content: 'This is my second post!'}
      ]
    }
  }
  render() {
    const posts = this.state.posts.map((post, index) =&gt;
      &lt;Post key={index} value={post} /&gt;
    );
    return (
      &lt;div className="feed"&gt;
        {posts}
      &lt;/div&gt;
    )
  }
}
<!--
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {content: 'This is my first post!'},
        {content: 'This is my second post!'}
      ]
    }
  }
  render() {
    const posts = this.state.posts.map((post, index) =>
      <Post key={index} value={post} />
    );
    return (
      <div className="feed">
        {posts}
      </div>
    )
  }
}
-->
</code></pre>

[Ver no CodePen](https://codepen.io/lutchobandeira/pen/JWOyKb){:target="_blank"}

No método ```render``` mapeamos cada objeto de nossa lista para um elemento ```Post``` e então deixamos essa lista de componentes na constante ```posts```.

Exibimos essa lista de componentes ```Post``` como filhos do componente raíz de ```Feed```.

> Note que o método ```render``` deve retornar um elemento React. Logo precisamos de um componente ```div``` envolvendo nossa lista de posts.

Leitura extra:

* [React Docs sobre Estado e Ciclo de Vida](https://facebook.github.io/react/docs/state-and-lifecycle.html).
* [Documentação sobre Arrow Functions (operador ```=>```)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

Formulário para criar novas notícias
------------------------------------

Vamos criar agora o componente ```PostForm```. Este componente exibirá um formulário para criar uma nova notícia.

Vamos criar também nosso primeiro método. Até agora só implementamos o ```render``` de cada componente. Esse método se chamará ```handleSubmit```, e como o nome indica, ele será chamado quando o usuário submeter o formulário.

Nossa versão inicial do componente ```PostForm``` apenas conecta o método ```handleSubmit``` ao evento de ```onSubmit``` do formulário.

O método ```handleSubmit``` ainda precisa de uma maneira de pegar o valor do campo de texto e de uma maneira e enviar esse dado para o componente ```Feed```:

<pre class="line-numbers" data-start="56" data-line="4,7-9, 14"><code class="language-jsx">
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      &lt;div className="post-form"&gt;
        &lt;form onSubmit={this.handleSubmit}&gt;
          &lt;label&gt;
            Content:
            &lt;input type="text" /&gt;
          &lt;/label&gt;
          &lt;button className="button"&gt;Submit&lt;/button&gt;
        &lt;/form&gt;
      &lt;/div&gt;
    )
  }
}
<!-- class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({content: this.content.value})
    this.content.value = '';
    event.preventDefault();
  }

  render() {
    return (
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Content:
            <input type="text" ref={(input) => this.content = input} />
          </label>
          <button className="button">Submit</button>
        </form>
      </div>
    )
  }
} -->
</code></pre>

Vamos entender agora alguns pontos dessa implementação.

Como estamos utilizando classes ES6 para implementar nossos componentes, precisamos de um passo a mais para declarar nossos métodos.

Na linha 59 fazemos um ```bind``` de nosso método ```handleSumbit``` para deixar esse método visível a partir de ```this```.

Na linha 72 temos nosso ```input```. No React podemos implementar campos de formulário de duas maneiras: **controlled components** e **uncontrolled components**.

<h3>Controlled components x Uncontrolled components</h3>

* Controlled components: mais React way, pois o valor do campo é mantido no ```state``` de um componente React;
* Uncontrolled components: mais simples que os controlled components. O valor é mantido no próprio DOM.

Nesse exemplo usamos um **uncontrolled component**. Os uncontrolled components são recomendados para formulários mais simples, como o formulário de nosso exemplo.

<h3>Implementação de um uncontrolled component</h3>

Como em nosso uncontrolled component o valor do campo fica contido no próprio DOM, precisamos de uma maneira para capturar o valor desse input. Essa é uma ótima oportunidade para utilizar uma ```ref``` do React.

Fazemos duas mudanças no código abaixo:

* No código ```ref={(input) => this.content = input}```, na linha 73, tornamos o nosso campo de text disponível em ```this``` a partir do atributo ```content```. 
* No ```handleSumbit``` fazemos uso de ```this.content``` para acessar nosso uncontrolled component. A única coisa que fazemos em ```handleSubmit``` por enquanto é limpar o valor de nosso campo de text.

<pre class="line-numbers" data-start="56" data-line="8,18"><code class="language-jsx">
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.content.value = '';
    event.preventDefault();
  }

  render() {
    return (
      &lt;div className="post-form"&gt;
        &lt;form onSubmit={this.handleSubmit}&gt;
          &lt;label&gt;
            Content:
            &lt;input type="text" ref={(input) =&gt; this.content = input} /&gt;
          &lt;/label&gt;
          &lt;button className="button"&gt;Submit&lt;/button&gt;
        &lt;/form&gt;
      &lt;/div&gt;
    )
  }
}
<!-- class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({content: this.content.value})
    this.content.value = '';
    event.preventDefault();
  }

  render() {
    return (
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Content:
            <input type="text" ref={(input) => this.content = input} />
          </label>
          <button className="button">Submit</button>
        </form>
      </div>
    )
  }
} -->
</code></pre>

Leitura extra: 

* [React Docs sobre Uncontrolled Components](https://facebook.github.io/react/docs/uncontrolled-components.html).
* [React Docs sobre Refs](https://facebook.github.io/react/docs/refs-and-the-dom.html).

Comunicação entre componentes
-----------------------------

Precisamos agora de uma maneira de enviar os valores submetidos pelo formulário de ```PostForm``` para o componente ```Feed```.

<h3>Utilizando <code>prop</code> para passar um método para outro componente</h3>

O truque aqui é implementar em ```Feed``` um método que saiba como adicionar uma notícia na lista e depois passar esse método para o componente ```PostForm``` através de uma ```prop```.

Fica mais fácil de entender vendo o código, então vamos lá:

<pre class="line-numbers" data-start="14" data-line="11,14-18,27"><code class="language-jsx">
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {content: 'This is my first post!'},
        {content: 'This is my second post!'}
      ]
    }

    this.handleNewPost = this.handleNewPost.bind(this);
  }

  handleNewPost(post) {
    this.setState({
      posts: this.state.posts.concat([post])
    });
  }

  render() {
    const posts = this.state.posts.map((post, index) =&gt;
      &lt;Post key={index} value={post} /&gt;
    );
    return (
      &lt;div className="feed"&gt;
        {posts}
        &lt;PostForm onSubmit={this.handleNewPost} /&gt;
      &lt;/div&gt;
    )
  }
}
<!-- class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {content: 'This is my first post!'},
        {content: 'This is my second post!'}
      ]
    }

    this.handleNewPost = this.handleNewPost.bind(this);
  }

  handleNewPost(post) {
    this.setState({
      posts: this.state.posts.concat([post])
    });
  }

  render() {
    const posts = this.state.posts.map((post, index) =>
      <Post key={index} value={post} />
    );
    return (
      <div className="feed">
        {posts}
        <PostForm onSubmit={this.handleNewPost} />
      </div>
    )
  }
} -->
</code></pre>

Eis o que modificamos aqui:

* Implementamos o método ```handleNewPost``` (e o deixamos visível para ```this``` com o ```bind``` da linha 24);
* Exibimos o componente ```PostForm``` na linha 40;
* E passamos o método ```handleNewPost``` para o componente ```PostForm``` através de uma ```prop``` chamada ```onSubmit```, na linha 40.

A grande sacada foi passar o método através da ```prop```.

Leitura Extra:

* [React Docs sobre Passar Estado](https://facebook.github.io/react/docs/lifting-state-up.html).

<h3>Atualizando o <code>state</code></h3>

A implementação de ```handleNewPost``` requer uma atenção especial: no React toda atualização de estado deve ser feita utilizando o método ```setState```. O método ```setState``` recebe um hash com os atributos que devem ser atualizados.

Para ficar claro: **Nunca modifique o ```state``` diretamente!**

Com a chamada ao ```setState```,  o React sabe que o estado do componente mudou, e que é hora de chamar ```render``` novamente para refletir essas mudanças visualmente.

<h3>Reconciliação: Como o React Atualiza o DOM</h3>

Recapitulando: quando o usuário escreve uma nova notícia em ```PostForm``` e submete o formulário, o método ```handleSubmit``` de ```PostForm``` é chamado. O método ```handleSubmit```, por sua vez, chama o método ```handleNewPost``` de ```Feed``` através da ```prop``` ```onSubmit``` de ```PostForm```.

Em ```handleNewPost``` uma atualização de estado é feita. Nesse momento o React chama o método ```render``` de ```Feed``` para mostrar o feed de notícias atualizado na tela.

O React, porém, não "recarrega" todo o feed de notícias quando apenas uma notícia é adicionada. Operações que manipulam o DOM são custosas. Então, para melhorar a performance, o React mantém uma representação interna da UI, conhecida como "Virtual DOM".

Quando o ```state``` de ```Feed``` é atualizado e o método ```render``` é chamado novamente, o React compara a árvore de nós atual com a nova árvore de nós no Virtual DOM através de um algoritimo de comparação, ou algoritmo de  "Diffing".

Para o nosso exemplo, o algoritmo de comparação do React percebe que não é necessário recriar todo o ```Feed```, somente é preciso adicionar um ```Post``` no DOM real.

Esse processo é chamado de **Reconciliação**.

Leitura extra:

* [React Docs sobre Reconciliação](https://facebook.github.io/react/docs/reconciliation.html)

<h3>Chamando um método através de uma <code>prop</code></h3>

Para concluir a comunicação entre os componentes só precisamos usar a ```prop``` que foi passada pelo ```Feed``` para o ```PostForm```:

<pre class="line-numbers" data-start="55" data-line="8"><code class="language-jsx">
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({content: this.content.value})
    this.content.value = '';
    event.preventDefault();
  }
<!-- class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({content: this.content.value})
    this.content.value = '';
    event.preventDefault();
  }

  render() {
    return (
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Content:
            <input type="text" ref={(input) => this.content = input} />
          </label>
          <button className="button">Submit</button>
        </form>
      </div>
    )
  }
} -->
</code></pre>

[Ver no CodePen](https://codepen.io/lutchobandeira/pen/GWOvjx){:target="_blank"}

Adicionando categorias às notícias
----------------------------------

Cada notícia de nosso feed pertence a uma categoria.

Vamos começar com uma lista pré-determinada de categorias: Mundo, Negócios, Tecnologia e Esportes. Então criamos uma constante para representar esses valores:

<pre class="line-numbers" data-start="4" data-line=""><code class="language-jsx">
const categories = ['World', 'Business', 'Tech', 'Sport'];
</code></pre>

E então atualizamos o componente ```Feed``` adicionando a propriedade ```category``` a lista inicial de notícias em nosso ```state```:

<pre class="line-numbers" data-start="14" data-line="6-7"><code class="language-jsx">
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {category: categories[0], content: 'This is my first post!'},
        {category: categories[1], content: 'This is my second post!'}
      ]
    }
<!-- class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {category: categories[0], content: 'This is my first post!'},
        {category: categories[1], content: 'This is my second post!'}
      ]
    } -->
</code></pre>

No componente ```Post``` exibimos a categoria:

<pre class="line-numbers" data-start="48" data-line="5"><code class="language-jsx">
class Post extends Component {
  render() {
    return (
      &lt;div className="post"&gt;
        &lt;span className="label"&gt;{this.props.value.category}&lt;/span&gt;
        &lt;span className="content"&gt;{this.props.value.content}&lt;/span&gt;
      &lt;/div&gt;
    )
  }
}
<!-- class Post extends Component {
  render() {
    return (
      <div className="post">
        <span className="label">{this.props.value.category}</span>
        <span className="content">{this.props.value.content}</span>
      </div>
    )
  }
} -->
</code></pre>

E no componente ```PostForm``` fazemos duas mudanças: adicionamos um campo para a categoria e atualizamos o método ```handleSubmit``` para enviar a categoria selecionada:

<pre class="line-numbers" data-start="59" data-line="9,12,21-28"><code class="language-jsx">
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({
      category: this.category.value,
      content: this.content.value
    });
    this.category.value = categories[0];
    this.content.value = '';
    event.preventDefault();
  }

  render() {
    return (
      &lt;div className="post-form"&gt;
        &lt;form onSubmit={this.handleSubmit}&gt;
          &lt;label&gt;
            Category:
            &lt;select ref={(input) =&gt; this.category = input}&gt;
              {categories.map((category, index) =&gt;
                &lt;option key={category} value={category}&gt;{category}&lt;/option&gt;
              )}
            &lt;/select&gt;
          &lt;/label&gt;
          &lt;label&gt;
            Content:
            &lt;input type="text" ref={(input) =&gt; this.content = input} /&gt;
          &lt;/label&gt;
          &lt;button className="button"&gt;Submit&lt;/button&gt;
        &lt;/form&gt;
      &lt;/div&gt;
    )
  }
}
<!-- class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({
      category: this.category.value,
      content: this.content.value
    });
    this.category.value = categories[0];
    this.content.value = '';
    event.preventDefault();
  }

  render() {
    return (
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Category:
            <select ref={(input) => this.category = input}>
              {categories.map((category, index) =>
                <option key={category} value={category}>{category}</option>
              )}
            </select>
          </label>
          <label>
            Content:
            <input type="text" ref={(input) => this.content = input} />
          </label>
          <button className="button">Submit</button>
        </form>
      </div>
    )
  }
} -->
</code></pre>

[Ver no CodePen](https://codepen.io/lutchobandeira/pen/mWqMmx){:target="_blank"}

Filtrando notícias
------------------

As notícias devem ser filtradas por categoria ou por conteúdo. Vamos então adicionar um campo de texto no topo do ```Feed``` para implementar nosso filtro.

Diferentemente do campo de texto utilizado em ```PostForm```, vamos utilizar aqui um **Controlled Component**. Esse controlled input será implementado no componente ```Filter```.

Antes de criar o componente ```Filter```, vamos implementar a lógica de filtrar notícias em ```Feed```.

<h3>Lógica de filtrar notícias</h3>

Faremos as seguintes mudanças:

- Adicionamos ```filteredPosts``` ao ```state```.
- No método ```render```, exibiremos a lista completa ```posts``` somente se a lista ```filteredPosts``` estiver vazia. Caso contrário, mostraremos ```filteredPosts```.
- A lógica de filtrar os posts baseado no valor digitado pelo usuário em ```Filter``` será implementada no método ```handleFilter```.
- A comunicação entre os componentes ```Feed``` e ```Filter``` seguirá a mesma estratégia utilizada anteriormente. Passaremos o método ```handleFilter``` como uma ```prop``` de ```Filter```.

Segue a implementação:

<pre class="line-numbers" data-start="51" data-line="9,22-29,35-37,41"><code class="language-jsx">
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {category: categories[0], content: 'This is my first post!'},
        {category: categories[1], content: 'This is my second post!'}
      ],
      filteredPosts: []
    }

    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleNewPost(post) {
    this.setState({
      posts: this.state.posts.concat([post])
    });
  }

  handleFilter(filter) {
    this.setState({
      filteredPosts: this.state.posts.filter((post) =&gt;
        post.category.toUpperCase() === filter.toUpperCase() ||
          post.content.includes(filter)
      )
    });
  }

  render() {
    const posts = this.state.posts.map((post, index) =&gt;
      &lt;Post key={index} value={post} /&gt;
    );
    const filteredPosts = this.state.filteredPosts.map((post, index) =&gt;
      &lt;Post key={index} value={post} /&gt;
    );
    return (
      &lt;div className="feed"&gt;
        &lt;Filter onFilter={this.handleFilter} /&gt;
        {filteredPosts.length &gt; 0 ? filteredPosts : posts}
        &lt;PostForm onSubmit={this.handleNewPost} /&gt;
      &lt;/div&gt;
    )
  }
}
<!-- class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {category: categories[0], content: 'This is my first post!'},
        {category: categories[1], content: 'This is my second post!'}
      ],
      filteredPosts: []
    }

    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleNewPost(post) {
    this.setState({
      posts: this.state.posts.concat([post])
    });
  }

  handleFilter(filter) {
    this.setState({
      filteredPosts: this.state.posts.filter((post) =>
        post.category.toUpperCase() === filter.toUpperCase() ||
          post.content.includes(filter)
      )
    });
  }

  render() {
    const posts = this.state.posts.map((post, index) =>
      <Post key={index} value={post} />
    );
    const filteredPosts = this.state.filteredPosts.map((post, index) =>
      <Post key={index} value={post} />
    );
    return (
      <div className="feed">
        <Filter onFilter={this.handleFilter} />
        {filteredPosts.length > 0 ? filteredPosts : posts}
        <PostForm onSubmit={this.handleNewPost} />
      </div>
    )
  }
} -->
</code></pre>

Leitura extra:

* [React Docs sobre renderização condicional](https://facebook.github.io/react/docs/conditional-rendering.html)

<h3>Implementação de um controlled component: o componente <code>Filter</code></h3>

Em qualquer cenário um pouco mais complexo é recomendável utilizar um controlled component. Como você já sabe, os controlled components armazenam o valor do campo no ```state```, como um componente React qualquer faria.

A implementação de um controlled component segue esse roteiro: criamos um método ```handleChange``` que atualiza o valor do input no ```state``` a cada mudança no campo, como definido em ```onChange={this.handleChange}```.

Para aplicar o filtro, o usuário deve entrar com o nome de uma categoria ou com um trecho de conteúdo e apertar Enter. Então implementamos também o método  ```handleKeyUp```.

Segue a versão inicial do componente ```Filter```:

<pre class="line-numbers" data-start="113" data-line=""><code class="language-jsx">
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleKeyUp(event) {
    if (event.key === 'Enter') {
      this.props.onFilter(this.state.value);
    }
  }

  render() {
    return (
      &lt;div&gt;
        &lt;label&gt;
          &lt;input type="search" value={this.state.value}
                               onChange={this.handleChange}
                               onKeyUp={this.handleKeyUp}
                               placeholder="Filter by category or content..." /&gt;
        &lt;/label&gt;
      &lt;/div&gt;
    )
  }
}
<!-- class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleKeyUp(event) {
    if (event.key === 'Enter') {
      this.props.onFilter(this.state.value);
    }
  }

  render() {
    return (
      <div>
        <label>
          <input type="search" value={this.state.value}
                               onChange={this.handleChange}
                               onKeyUp={this.handleKeyUp}
                               placeholder="Filter by category or content..." />
        </label>
      </div>
    )
  }
} -->
</code></pre>

[Ver no CodePen](https://codepen.io/lutchobandeira/pen/mWqMmx){:target="_blank"}

Leitura extra:

* [React Docs sobre Formulários e Controlled Components](https://facebook.github.io/react/docs/forms.html)
* [React Docs sobre Manipulação de Eventos](https://facebook.github.io/react/docs/handling-events.html)

<h3>Limpando o filtro</h3>

Queremos limpar o filtro aplicado anteriormente ao deixar o campo de texto vazio (precionando ```delete``` para apagar todos os caracteres, por exemplo).

Para implementar essa estratégia, chamamos ```onFilter``` quando o valor do campo é vazio em ```handleChange```:

<pre class="line-numbers" data-start="113" data-line="12-14"><code class="language-jsx">
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    if (event.target.value === '') {
      this.props.onFilter('');
    }
  }
</code></pre>

[Ver no CodePen](https://codepen.io/lutchobandeira/pen/LWOjjL){:target="_blank"}

Salvando a lista de notícias localmente
---------------------------------------

A nossa implementação está quase pronta! Para finalizar, vamos salvar a lista de notícias no ```localStorage```. Dessa forma não perdemos nossas alterações quando fechamos o navegador.

Modificamos apenas a inicialização do ```state``` e o método ```handleNewPost```:

<pre class="line-numbers" data-start="16" data-line="5,14-16"><code class="language-jsx">
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: JSON.parse(localStorage.getItem('posts')) || [],
      filteredPosts: []
    }

    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleNewPost(post) {
    var posts = this.state.posts.concat([post]);
    this.setState({posts: posts});
    localStorage.setItem('posts', JSON.stringify(posts));
  }
<!-- class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: JSON.parse(localStorage.getItem('posts')) || [],
      filteredPosts: []
    }

    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleNewPost(post) {
    var posts = this.state.posts.concat([post]);
    this.setState({
      posts: posts
    });
    localStorage.setItem('posts', JSON.stringify(posts));
  } -->
</code></pre>

[Ver no CodePen](https://codepen.io/lutchobandeira/pen/JWOyON){:target="_blank"}

Próximos passos
---------------

Nosso feed de notícias ainda não é muito útil. Ele somente mostra notícias criadas pelo próprio usuário. Para deixá-lo realmente interessante, temos que implementar o lado do servidor.

E é isso o que faremos no próximo post do blog. Criaremos uma aplicação em Ruby on Rails que se comunicará com nosso feed de notícias. Aguarde!