---
layout: post
title: Como fazer um feed de notícias em React.js
ref: first
lang: pt
---

Este é o início de uma série de posts sobre React.js. O objetivo é contruir um feed de notícias com atualizações em tempo real. Além do front-end, vamos implementar também um back-end em Rails. Este primeiro post é uma introdução ao React.js. Então mesmo que você não seja um programador Rails, este post pode ser útil pra você!

Para quem está iniciando em React pode parecer complicado o número de tecnologias e ferramentas disponíveis. Então vamos deixar as coisas bem simples aqui para facilitar o aprendizado.

Vamos construir a aplicação passo a passo e vamos introduzindo alguns conceitos teóricos do React no momento mais oportuno.

Criando o projeto React.js
--------------------------

A maneira mais fácil de criar um projeto React é utilizando o [create-react-app](https://github.com/facebookincubator/create-react-app). O ```create-react-app``` traz tudo que precisamos para nosso projecto React:

- webpack - um module bundler que trabalha muito bem com o npm. Ele também inclui um web server e um file watcher.
- Babel - um compilador javascript que oferece suporte a última versão do javascript mesmo que os browsers ainda não ofereçam.
- Autoprefixer - um plugin que adiciona os prefixos de CSS dos browsers automaticamante.
- ESLint - uma ferramenta que analisa o código e aponta eventuais problemas.

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
- O método ```render()``` é implementado;
- Há uma sintaxe parecida com HTML dentro do método ```render()```. Esse é o JSX, veremos a seguir.

JSX
---

O ```JSX``` é uma sintaxe que o React utiliza para descrever seus componentes. No código do componente ```App``` observamos que a tag JSX ```div``` é na verdade um componente do React que representa a tag ```div``` do HTML. Devido a essa semelhança, às vezes nos confundimos e achamos que "tem HTML dentro do javascript".

O ```JSX``` é uma extensão ao javascript, mas no estilo ```XML```. Como veremos a seguir, para cada elemento HTML há um componente do React correspondente, pronto para ser usado.

Poderíamos ter escrito esse mesmo código usando somente javascript. E na verdade é isso que o ```Babel``` faz, ele converte os elementos ```JSX``` em chamadas ```React.createElement()```.

Nosso código ficaria assim:

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
- Observe que os componentes React que representam tags HTML, como no exemplo acima, costumam usar props com os mesmos nomes dos atributos HTML. Com exceção de ```className```, que foi utilizado ao invés de ```class``` por esta ser uma palavra reservada do javascript.

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

Vamos exibir o nosso ```Feed``` no ```render()``` do componente raíz ```App```:

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

Perceba que acessamos as props de um componente com a chamada ```this.props``` entre colchetes.

Utilizando o ```state```
------------------------

Ao invés de criar na mão um componente ```Post``` para cada notícia, vamos criar uma lista de notícias e depois exibir via javascript um componente para cada elemento dessa lista.

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

No método ```render``` mapeamos cada objeto de nossa lista para um elemento ```Post``` e então deixamos essa lista de componentes na constante ```posts```.

Exibimos essa lista de componentes ```Post``` como filhos do componente raíz de ```Feed```.

> Note que o método ```render``` deve retornar um elemento React. Logo precisamos de um componente ```div``` envolvendo nossa lista de posts.

Formulário para criar novas notícias
------------------------------------

Vamos criar agora o componente ```PostForm```. Este componente exibirá um formulário para criar uma nova notícia.

Vamos criar também nosso primeiro método. Até agora só implementamos o ```render()``` de cada componente. Esse método se chamará ```handleSubmit()```, e como o nome indica, ele será chamado quando o usuário submeter o formulário.

Esse método também será responsável por incrementar a nossa lista de notícias. Como nossa lista de notícias está armazenada no ```state``` do componente ```Feed```, teremos que implementar essa comunicação entre os componentes.

Nossa versão inicial do componente ```PostForm``` fica assim:

<pre class="line-numbers" data-start="56" data-line="4,15"><code class="language-jsx">
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

Vamos entender agora alguns pontos dessa implementação.

Como estamos utilizando classes ES6 para implementar nossos componentes, precisamos de um passo a mais para declarar nossos métodos.

Na linha 58 fazemos um ```bind``` de nosso método ```handleSumbit``` para deixar esse método visível a partir de ```this```.

Na linha 70 temos nosso ```input```. No React existem dois tipos de inputs.

<h3>Controlled inputs x Uncontrolled inputs</h3>

* Controlled inputs: mais React way, pois o valor do input é mantido no estado de um componente React;
* Uncontrolled inputs: mais simples que os controlled inputs. O valor é mantido no próprio DOM.

Nesse exemplo usamos um **uncontrolled input**. Os uncontrolled inputs são uma boa para formulários bem simples, como o nosso.

Como em nosso uncontrolled input o valor do campo fica contido no próprio DOM, precisamos de uma maneira para capturar o valor desse input. Essa é uma ótima oportunidade para utilizar uma ```ref``` do React.

No código ```ref={(input) => this.content = input}``` da linha 70, tornamos o nosso input disponível em ```this``` a partir do atributo ```content```. 

No ```handleSumbit``` fazemos uso de ```this.content``` para acessar nosso uncontrolled input. A única coisa que fazemos em ```handleSubmit``` por enquanto é limpar o valor de nosso input e cancelar o comportamento padrão do navegador.

Precisamos agora de uma maneira de enviar o valor do input para o componente ```Feed```.

<h3>Comunicação entre componentes</h3>

O truque aqui é implementar em ```Feed``` um método que saiba como adicionar uma notícia na lista e depois passar esse método para o componente ```PostForm``` através de uma ```prop```!

Fica mais fácil de entender vendo o código: Então vamos lá!:

<pre class="line-numbers" data-start="14" data-line="11,14-18,26"><code class="language-jsx">
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

* Implementamos o método ```handleNewPost``` (e o deixamos visível para ```this``` com o ```bind``` da linha 17);
* Exibimos o componente ```PostForm``` na linha ;
* E passamos o método ```handleNewPost``` para o componente ```PostForm``` através de uma ```prop``` chamada ```onSubmit```.

A grande sacada foi passar o método através da ```prop```!

A implementação de ```handleNewPost``` requer uma atenção especial.

No React toda atualização de estado deve ser feita utilizando o método ```setState```. Não modifique o ```state``` diretamente!

Com a chamada ao ```setState()```,  o React sabe que o estado do componente mudou, e que é hora de chamar ```render()``` novamente para refletir essas mudanças visualmente. Dessa mandeira temos nosso feed atualizado.

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

Lembre-se que no componente ```Feed``` criamos um ```PostForm``` passando o método o ```handleNewPost``` através da ```prop``` nomeada de ```onSubmit```.

Ficou simples agora nos comunicarmos com o componente ```Feed``` a partir de ```PostForm```. Tudo que precisamos fazer é chamar ```this.props.onSubmit({content: this.content.value})```.

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

Filtrando notícias
------------------

As notícias devem ser filtradas por categoria ou por conteúdo. Para filtrar por categoria o usuário deve digitar o nome da categoria e apertar Enter. Para filtar por conteúdo o usuário deve entrar com um trecho do conteúdo da notícia e apertar Enter.

Vamos então adicionar um campo de texto no topo do ```Feed``` para implementar nosso filtro. Diferentemente do campo de texto utilizado em ```PostForm```, vamos utilizar aqui um **Controlled Input**.

<h3>Controlled Input</h3>

Em qualquer cenário um pouco mais complexo é recomendável utilizar um controlled input. Como você já sabe, os controlled inputs armazenam o valor do campo no ```state```, como um componente React qualquer faria.

A implementação de um controlled input segue esse roteiro: criamos um método ```handleChange``` que atualiza o valor do input no ```state``` a cada mudança no campo, como definido em ```onChange={this.handleChange}```.

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

Observe que a maneira de como o React lida com eventos é bem semelhante de como estamos acostumados em HTML. Somente precisamos informar qual método deve ser chamado quando o evento é disparado.

O evento ```onChange``` é disparado apenas quando o usuário tira o foco do campo de texto. Seria mais interessante aplicar ou limpar o filtro sem tirar o foco do campo de texto.

Como queremos que o usuário aplique o filtro ao apertar Enter, implementamos também o método ```handleKeyUp```, que é chamado a cada vez que o usuário preciona uma tecla.

Queremos que o ```handleKeyUp``` faça duas coisas:

- Aplicar o filtro com o valor atual do campo de texto ao apertar Enter;
- Limpar o filtro quando o usuário deletar todos os caracteres do campo de texto.

Nosso componente ```Filter``` fica assim:

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
<!-- class Filter extends Component {
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

<h3>Utilizando o componente <code>Filter</code></h3>

Agora vamos usar o componente ```Filter``` em nosso ```Feed```.

As mudanças que faremos serão as seguintes:

- No ```state```, além de ```posts``` teremos ```filteredPosts```.
- No método ```render```, exibiremos ```posts``` somente de ```filteredPosts``` estiver vazia. Caso contrário, mostratemos ```filteredPosts```.
- A lógica de filtrar os posts baseado no valor digitado pelo usuário em ```Filter``` será implementada no método ```handleFilter```.
- A comunicação entre os componentes ```Feed``` e ```Filter``` seguirá a mesma estratégia utilizada anteriormente. Passaremos o método ```handleFilter``` como uma ```prop``` de ```Filter```.

Segue a implementação:

<pre class="line-numbers" data-start="51" data-line="9,35-37,41"><code class="language-jsx">
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

Salvando a lista de notícias localmente
---------------------------------------

A nossa implementação está quase pronta! Para finalizar, vamos salvar a lista de notícias no ```localStorage```. Dessa forma não perdemos nossas alterações quando fechamos o navegador.

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

Modificamos apenas a inicialização do ```state``` e o método ```handleNewPost```.