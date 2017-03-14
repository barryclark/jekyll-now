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

{% highlight bash %}
$ npm install -g create-react-app
$ create-react-app news-feed
{% endhighlight %}

Feito isso já podemos entrar na pasta e iniciar nosso servidor:
{% highlight bash %}
$ cd news-feed/
$ npm start
{% endhighlight %}

Pronto! Nosso servidor já está disponível em [http://localhost:3000](http://localhost:3000) (ou em outra porta se a porta 3000 já estiver em uso).

Componentes React
-----------------

O ```create-react-app``` criou um componente raíz chamado ```App```. Vamos aproveitar para introduzir alguns conceitos de React. Dê uma rápida olhada no código abaixo:

{% highlight console %}
src/App.js
{% endhighlight %}

{% highlight typescript linenos %}
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
{% endhighlight %}

Algumas coisas que podemos observar logo de cara:

- Todo componente React herda de ```Component```;
- O método ```render()``` é implementado;
- Há uma sintaxe parecida com HTML dentro do método ```render()```. Esse é o JSX, veremos a seguir.

JSX
---

O ```JSX``` é uma sintaxe que o React utiliza para descrever seus componentes. O ```JSX``` é uma extensão ao javascript, mas no estilo ```XML```. Para cada elemento HTML há um componente React correspondente.

Por exemplo, no código do componente ```App``` observamos que a tag JSX ```div``` é na verdade um componente do React que representa a tag ```div``` do HTML. Devido a essa semelhança, às vezes nos confundimos e achamos que "tem HTML dentro do javascript".

Poderíamos ter escrito esse mesmo código usando somente javascript. E na verdade é isso que o ```Babel``` faz, ele converte os elementos ```JSX``` em chamadas ```React.createElement()```.

Nosso código ficaria assim:

{% highlight typescript linenos %}
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
{% endhighlight %}

Antes de começar nossa implementação, só um pouquinho mais de teoria. Veja a assinatura do método ```createElement```:

{% highlight typescript %}
React.createElement(type, [props], [...children])
{% endhighlight %}

Logo, na seguinte chamada:

{% highlight typescript %}
React.createElement('img', {src: logo, className: 'App-logo', alt: 'logo'})
{% endhighlight %}

- ```img``` é o tipo do elemento. Para cada elemento HTML existe uma componente React correspondente.
- ```{src: logo, className: 'App-logo', alt: 'logo'}``` são as ```props``` desse componente. Podemos pensar nas ```props``` como argumentos de uma função. E podemos pensar nos components React como funções, que recebem ```props``` e retornam um elemento React.
- Observe que os componentes React que representam tags HTML, como no exemplo acima, costumam usar props com os mesmos nomes dos atributos HTML. Com exceção de ```className```, que foi utilizado ao invés de ```class``` por esta ser uma palavra reservada do javascript.

Implementando o primeiro componente
-----------------------------------

Como estamos fazendo um feed de notícias, nada melhor do que começar implementando este componente. A implementação fica bem simples:

{% highlight typescript %}
class Feed extends Component {
  render() {
    return (
      <div className="feed">
        <div className="post">
          <span>This is my first post!</span>
        </div>
      </div>
    )
  }
}
{% endhighlight %}

Vamos exibir o nosso ```Feed``` no ```render()``` do componente raíz ```App```:

{% highlight typescript %}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Feed />
      </div>
    );
  }
}
{% endhighlight %}

Extraindo o componente ```Post```
---------------------------------

Como você já deve ter percebido, é possível extrair um componente ```Post``` de dentro do componente ```Feed```. Essa é uma das principais ideias do React, ir compondo um componente grande a partir de vários componentes pequenos:

{% highlight typescript %}
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
{% endhighlight %}

Veja que adicionamos um pouco mais de dinamismo aqui. Passamos o texto de cada post através de uma ```prop``` do nosso componente ```Post``` que se chama ```content```. A implementação do componente ```Post``` fica assim:

{% highlight typescript %}
class Post extends Component {
  render() {
    return (
      <div className="post">
        <span>{this.props.content}</span>
      </div>
    )
  }
}
{% endhighlight %}

Perceba que acessamos as props de um componente com a chamada ```this.props``` entre colchetes.

Utilizando o ```state```
------------------------

Ao invés de criar na mão um componente ```Post``` para cada notícia, vamos criar uma lista de notícias e depois exibir via javascript um componente para cada elemento dessa lista.

Para isso vamos utilizar o ```state```. Ao contrário do caráter imutável das ```props```, o ```state``` é mutável. Como queremos que essa lista de notícias cresça com o tempo, faz todo sentido amarzenar essa lista no ```state``` do nosso componente ```Feed```.

Inicializamos o ```state``` no construtor de nossa classe, assim:

{% highlight typescript %}
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: ['This is my first post!', 'This is my second post!']
    }
  }
  render() {
    const posts = this.state.posts.map(function(content) {
      return <Post content={content} />
    });
    return (
      <div className="feed">
        {posts}
      </div>
    )
  }
}
{% endhighlight %}

No método ```render``` mapeamos cada objeto de nossa lista para um elemento ```Post``` e então deixamos essa lista de componentes na constante ```posts```.

Exibimos essa lista de componentes ```Post``` como filhos do componente raíz de ```Feed```.

> Note que o método ```render``` deve retornar um elemento React. Logo precisamos de um componente ```div``` envolvendo nossa lista de posts.

Formulário para criar novas notícias
------------------------------------

Vamos criar agora o componente ```PostForm```. Este componente exibirá um formulário para criar uma nova notícia.

Vamos criar também nosso primeiro método. Até agora só implementamos o ```render()``` de cada componente. Esse método se chamará ```handleSubmit()```, e como o nome indica, ele será chamado quando o usuário submeter o formulário.

Esse método também será responsável por incrementar a nossa lista de notícias. Como nossa lista de notícias está armazenada no ```state``` do componente ```Feed```, teremos que implementar essa comunicação entre os componentes.

Nossa versão inicial do componente ```PostForm``` fica assim:

{% highlight typescript linenos %}
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
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={(input) => this.content = input} />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
{% endhighlight %}

Vamos entender agora alguns pontos dessa implementação.

Como estamos utilizando classes ES6 para implementar nossos componentes, precisamos de um passo a mais para declarar nossos métodos.

Na linha 4 fazemos um ```bind``` de nosso método ```handleSumbit``` para deixar esse método visível a partir de ```this```.

Na linha 16 temos nosso ```input```. No React existem dois tipos de inputs.

Controlled inputs x Uncontrolled inputs
---------------------------------------

* Controlled inputs: mais React way, pois o valor do input é mantido no estado de um componente React;
* Uncontrolled inputs: mais simples que os controlled inputs. O valor é mantido no próprio DOM.

Nesse exemplo usamos um ***uncontrolled input***. Os uncontrolled inputs são uma boa para formulários bem simples, como o nosso.

Como em nosso uncontrolled input o valor do campo fica contido no próprio DOM, precisamos de uma maneira para capturar o valor desse input. Essa é uma ótima oportunidade para utilizar uma ```ref``` do React.

No código ```ref={(input) => this.content = input}``` da linha 16, tornamos o nosso input disponível em ```this``` a partir do atributo ```content```. 

No ```handleSumbit``` fazemos uso de ```this.content``` para acessar nosso uncontrolled input. A única coisa que fazemos em ```handleSubmit``` por enquanto é limpar o valor de nosso input e cancelar o comportamento padrão do navegador.

Precisamos agora de uma maneira de enviar o valor do input para o componente ```Feed```.

Comunicação entre componentes
-----------------------------

O truque aqui é implementar em ```Feed``` um método que saiba como adicionar uma notícia na lista e depois passar esse método para o componente ```PostForm``` através de uma ```prop```!

Fica mais fácil de entender vendo o código: Então vamos lá!:

{% highlight typescript %}
class Feed extends Component {
  constructor(props) {
    super(props);
    this.handleNewPost = this.handleNewPost.bind(this);
    this.state = {
      posts: [
        {content: 'This is my first post!'},
        {content: 'This is my second post!'}
      ]
    }
  }

  handleNewPost(post) {
    this.setState({
      posts: this.state.posts.concat([post])
    });
  }

  render() {
    const posts = this.state.posts.map(function(post, index) {
      return <Post key={index} content={post.content} />
    });
    return (
      <div className="feed">
        {posts}
        <PostForm onSubmit={this.handleNewPost} />
      </div>
    )
  }
}
{% endhighlight %}

Eis o que modificamos aqui:

* Implementamos o método ```handleNewPost``` (e o deixamos visível para ```this``` com o ```bind``` da linha 4);
* Exibimos o componente ```PostForm``` na linha ;
* E passamos o método ```handleNewPost``` para o componente ```PostForm``` através de uma ```prop``` chamada ```onSubmit```.

A grande sacada foi passar o método através da ```prop```!

A implementação de ```handleNewPost``` requer uma atenção especial.

No React toda atualização de estado deve ser feita utilizando o método ```setState```. Não modifique o ```state``` diretamente!

Com a chamada ao ```setState()```,  o React sabe que o estado do componente mudou, e que é hora de chamar ```render()``` novamente para refletir essas mudanças visualmente. Dessa mandeira temos nosso feed atualizado.

Para concluir a comunicação entre os componentes só precisamos usar a ```prop``` que foi passada pelo ```Feed``` para o ```PostForm```:

{% highlight typescript linenos %}
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
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={(input) => this.content = input} />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
{% endhighlight %}

Lembre-se que no componente ```Feed``` criamos um ```PostForm``` passando o método o ```handleNewPost``` através da ```prop``` nomeada de ```onSubmit```.

Ficou simples agora nos comunicarmos com o componente ```Feed``` a partir de ```PostForm```. Tudo que precisamos fazer é chamar ```this.props.onSubmit({content: this.content.value})```.

Adicionando categorias às notícias
----------------------------------

Cada notícia de nosso feed pertence a uma categoria.

Vamos começar com uma lista pré-determinada de categorias: Mundo, Negócios, Tecnologia e Esportes. Então criamos uma contante para representar esses valores:

{% highlight typescript %}
const categories = ['World', 'Business', 'Tech', 'Sport'];
{% endhighlight %}

E então atualizamos o componente ```Feed``` adicionando a propriedade ```category``` a lista inicial de notícias em nosso ```state```:

{% highlight typescript linenos %}
class Feed extends Component {
  constructor(props) {
    super(props);
    this.handleNewPost = this.handleNewPost.bind(this);
    this.state = {
      posts: [
        {category: categories[0], content: 'This is my first post!'},
        {category: categories[1], content: 'This is my second post!'}
      ]
    }
  }

  handleNewPost(post) {
    this.setState({
      posts: this.state.posts.concat([post])
    });
  }

  render() {
    const posts = this.state.posts.map(function(post, index) {
      return <Post key={index} value={post} />
    });
    return (
      <div className="feed">
        {posts}
        <PostForm onSubmit={this.handleNewPost} />
      </div>
    )
  }
}
{% endhighlight %}

No componente ```Post``` exibimos a categoria:

{% highlight typescript linenos %}
class Post extends Component {
  render() {
    return (
      <div className="post">
        <h5>{this.props.value.category}</h5>
        <span>{this.props.value.content}</span>
      </div>
    )
  }
}
{% endhighlight %}

E no componente ```PostForm``` fazemos duas mudanças: adicionamos um campo para a categoria e atualizamos o método ```handleSubmit``` para enviar a categoria selecionada:

{% highlight typescript linenos %}
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
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Category:
            <select ref={(input) => this.category = input}>
              {categories.map(function(category, index) {
                return <option value={category}>{category}</option>
              })}
            </select>
          </label>
          <label>
            Content:
            <input type="text" ref={(input) => this.content = input} />
          </label>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
{% endhighlight %}

Filtrando notícias
------------------

As notícias devem ser filtradas por categoria ou por conteúdo. Para filtrar por categoria o usuário deve digitar o nome da categoria e apertar Enter. Para filtar por conteúdo o usuário deve entrar com um trecho do conteúdo da notícia e apertar Enter.

Vamos então adicionar um campo de texto no topo do ```Feed``` para implementar nosso filtro. Diferentemente do campo de texto utilizado em ```PostForm```, vamos utilizar aqui um **Controlled Input**.

Em qualquer cenário um pouco mais complexo é recomendável utilizar um controlled input. Como você já sabe, os controlled inputs armazenam o valor do campo no ```state```, como um componente React qualquer faria.

Criaremos um novo componente para implementar nosso filtro. Segue a implementação do componente ```Filter```:

{% highlight typescript linenos %}
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
    } else if (this.state.value === '') {
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
}
{% endhighlight %}

Observe que a maneira como o React lidar com eventos é bem semelhante de como estamos acostumados em HTML. Somente precisamos informar qual método deve ser chamado quando o evento é disparado.

A implementação de um controlled input segue esse roteiro: criamos um método ```handleChange``` que atualiza o valor do input no ```state``` a cada mudança no campo, como definido em ```onChange={this.handleChange}```.

O evento ```onChange``` é disparado apenas quando o usuário tira o foco do campo de texto. Como queremos que o usuário aplique o filtro ao apertar Enter, implementamos também o método ```handleKeyUp```, que é chamado a cada vez que o usuário preciona uma tecla. Consulte a documentação do React para ver a lista completa de eventos suportados.

O método ```handleKeyUp``` faz duas coisas:

- Atualiza o ```state``` com o valor atual do campo ao apertar Enter;
- Atualiza o ```state``` com o valor atual do campo ao apertar qualquer tecla e o valor atual do campo é vazio.

O segundo ponto serve para limpar o filtro. O usuário limpa o valor do campo pressionando *delete* ou *backspace*, e quando o valor do campo fica vazio o ```state``` é atualizado para ficar vazio também (sem a necessidade de precionar Enter).

Agora vamos usar o componente ```Filter``` em nosso ```Feed```.

As mudanças que faremos serão as seguintes:

- No ```state```, além de ```posts``` teremos ```filteredPosts```.
- No método ```render```, exibiremos ```posts``` somente de ```filteredPosts``` estiver vazia. Caso contrário, mostratemos ```filteredPosts```.
- A lógica de filtrar os posts baseado no valor digitado pelo usuário em ```Filter``` será implementada no método ```handleFilter```.
- A comunicação entre os componentes ```Feed``` e ```Filter``` seguirá a mesma estratégia utilizada anteriormente. Passaremos o método ```handleFilter``` como uma ```prop``` de ```Filter```.

Segue a implementação:

{% highlight typescript linenos %}
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
      filteredPosts: this.state.posts.filter((post) => post.category.toUpperCase() === filter.toUpperCase() || post.content.includes(filter))
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
}
{% endhighlight %}

Salvando a lista de notícias localmente
---------------------------------------

A nossa implementação está quase pronta! Para finalizar, vamos salvar a lista de notícias no ```localStorage```. Dessa forma não perdemos nossas alterações quando fechamos o navegador.

<pre><code class="hljs javascript">
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
    var posts = this.state.posts.concat([post])
    this.setState({
      posts: posts
    });
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  handleFilter(filter) {
    this.setState({
      filteredPosts: this.state.posts.filter((post) => post.category.toUpperCase() === filter.toUpperCase() || post.content.includes(filter))
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
}
</code></pre>

Modificamos apenas a inicialização do ```state``` e o método ```handleNewPost```.