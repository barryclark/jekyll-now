---
layout: post
title: "Sass x LESS x Stylus: Duelo dos Pré-processadores"
date: 2016-03-14 13:58:40
author: wendell
image: '/assets/img/'
description: 'Aprenda as funcionalidades e descubra os benefícios de usar três pré-processadores diferentes: Sass, LESS e Stylus.'
tags:
- css
- front-end
- pre-processadores
- traducoes
categories:
- Traduções
- Pré-processadores CSS
twitter_text: 'Aprenda as funcionalidades e descubra os benefícios de usar três pré-processadores diferentes: Sass, LESS e Stylus.'
---

## Projeto Traduções

Em parceria com o **[FEMUG ABC](http://femug-abc.github.io/)**, a **CodeShare Education** inicia agora um projeto que visa aumentar a quantidade de artigos técnicos de alta qualidade em `pt-br`, fazendo assim traduções de artigos interessantes e muito bons em outras línguas.

## Introdução

> Pré-processadores produzem CSS que funciona em todos os browsers  

Ter em mãos o verdadeiro poder de um pré-processador CSS é uma aventura. Existem incontáveis linguagens, sintaxes e funcionalidades todas prontas para uso imediato. Nesse artigo iremos falar sobre diversas funcionalidades e benefícios de usar três pré-processadores diferentes: **Sass, LESS e Stylus**.  

Pré-processadores CSS3 são linguagens criadas com um único propósito de adicionar funcionalidades legais e criativas para o CSS sem quebrar a compatibilidade entre browsers. Eles fazem isso compilando o código que escrevemos em CSS puro que pode ser usado em qualquer browser de agora até a era das pedras. Os pré-processadores disponibilizam milhares de funcionalidades, e nesse artigo iremos falar sobre as mais utilizadas e conhecidas e algumas nem tanto conhecidas. Vamos começar

## Sintaxe

A parte mais importante ao escrever códigos utilizando um pré-processador CSS é entender a sua sintaxe. Felizmente para nós, a sintaxe é (ou pode ser) idêntica à do CSS puro para os três pré-processadores.

### Sass e LESS

Ambos utilizam o a sintaxe padrão do CSS. Isso faz com que seja extremamente fácil converter um arquivo CSS já existente para qualquer um deles. Sass utiliza arquivos com extensão `.scss` e LESS com extensão `.less`. Uma configuração básica de um arquivo Sass ou LESS pode ser como abaixo:  

{% highlight scss %}
// style.scss ou style.less
h1 {
	color: #0982c1;
}
{% endhighlight %}

Como você pode ter notado, isso é apenas CSS puro, que compila perfeitamente em ambos pré-processadores (Sass e LESS).  

É importante notar que Sass também tem uma sintaxe mais antiga, que omite ponto e vírgula e as chaves. Ainda pode ser usado, mas como é uma sintaxe antiga, não iremos utilizá-la depois deste exemplo. A sintaxe utiliza arquivos com a extensão `.sass` e são da seguinte maneira:  

{% highlight scss %}
// style.sass
h1
	color: #0982c1
{% endhighlight %}

> **Observação Pessoal:** Essa sintaxe não é por causa de ser mais antiga e sim pois no início o **Sass** era parte de um outro pré-processador chamado **Haml** criado por desenvolvedores **Ruby**, e por causa disso as folhas de estilo escritas com **Sass** utilizavam uma sintaxe como a do **Ruby**, sem chaves, ponto e vírgula e controlado por identação.

### Stylus

A sintaxe para o Stylus é muito mais adaptável. Utiliza arquivos com extensão `.styl`, aceita a sintaxe padrão do CSS, porém também aceita algumas variações onde chaves, dois-pontos e ponto e vírgula são todos opcionais. Por exemplo:

{% highlight scss %}
// style.styl
h1 {
	color: #0982c1;
}
// omitindo chaves
h1
	color: #0982c1;

// omitindo dois-pontos e ponto e vírgula
h1
	color #0982c1
{% endhighlight %}

Utilizar diferentes variações em um mesmo arquivo também é válido, então o seguinte código seria compilado sem erros.

{% highlight scss %}
h1 {
	color #0982c1
}
h2
	font-size: 1.2em
{% endhighlight %}

## Variáveis

Variáveis podem ser declaradas e usadas através das folhas de estilo. Elas podem ter qualquer valor que seja um valor em CSS (por exemplo: cores, números [unidades também], ou texto), e podem ser referenciadas em qualquer lugar das nossas folhas de estilo.

### Sass

Variáveis em Sass tem seu nome começado o símbolo `$` e o nome e o seu valor são separados com dois-pontos, assim como uma propriedade CSS.

{% highlight scss %}
$mainColor: #0982c1;
$siteWidth: 1024px;
$borderStyle: dotted;

body {
	color: $mainColor;
	border: 1px $borderStyle $mainColor;
	max-width: $siteWidth;
}
{% endhighlight %}

### LESS

Varíaves em LESS são praticamente iguais as variáveis no Sass, exceto por começarem seus nomes com o símbolo `@`.

{% highlight scss %}
@mainColor: #0982c1;
@siteWidth: 1024px;
@borderStyle: dotted;

body {
	color: @mainColor;
	border: 1px @borderStyle @mainColor;
	max-width: @siteWidth;
}
{% endhighlight %}

### Stylus

Variáveis em Stylus não precisam começar com nenhum símbolo, porém ele permite a utilização do símbolo `$`. Como sempre, o ponto e vírgula para finalizar não é necessário, mas um sinal de igual entre o nome da variável e seu valor é. Uma coisa importante para se notar é que na versão 0.22.4 do Stylus variáveis com nome começados com o símbolo `@` são compiladas, porém não aplicam seu valor quando referenciadas. Em oturas palavras, não faça isso.

{% highlight scss %}
mainColor = #0982c1;
siteWidth = 1024px;
$borderStyle = dotted;

body
	color mainColor
	border 1px $borderStyle mainColor
	max-width siteWidth
{% endhighlight %}

### CSS Compilado

Cada um dos arquivos acima irão compilar no mesmo CSS. Você pode usar sua imaginação para ver quão úteis variáveis podem ser. Não precisaremos mais ao mudar uma cor reescrever a mesma vinte vezes, ou querer mudar a largura de nosso site e ter de procurar por todo o site para fazer isso. Aqui está o CSS depois de compilado:

{% highlight scss %}
body {
	color: #0982c1;
	border: 1px dotted #0982c1;
	max-width: 1024px.
}
{% endhighlight %}

## Aninhamento

Se precisarmos referenciar múltiplos elementos com o mesmo pai em nosso CSS, pode ser entediante ficar digitanto o pai toda vez.

{% highlight scss %}
section {
	margin: 10px;
}
section nav {
	height: 25px;
}
section nav a {
	color: #0982c1;
}
section nav a:hover {
	text-decoration: underline;
}
{% endhighlight %}

Ao invés disso, usando um pré-processador, podemos escrever os seletores filhos dentro das chaves do elemento pai. O símbolo `&` é usado para referenciar o seletor pai.

### Sass, LESS e Stylus

Todos os três pré-processdores utilizam a mesma sintaxe para aninhar seletores.

{% highlight scss %}
section {
	margin: 10px;

	nav {
		height: 25px;

		a {
			color: #0982c1;

			&:hover {
				text-decoration: underline;
			}
		}
	}
}
{% endhighlight %}

### CSS Compilado

Abaixo está o CSS compilado do código escrito acima. Está exatamente igual ao mostrado no começo - que conveniente!

{% highlight scss %}
section {
	margin: 10px;
}
section nav {
	height: 25px;
}
section nav a {
	color: #0982c1;
}
section nav a:hover {
	text-decoration: underline;
}
{% endhighlight %}

## Mixins

Mixins são funções que permitem reusar propriedades através de nossas folhas de estilo. Ao invés de procurar por todas nossas folhas de estilo e mudar uma propriedade várias vezes, podemos apenas mudar dentro de nosso mixin. Isso pode ser realmente útil para estilização de elementos específicos e para "vendor prefixes" (moz-, o-, etc). Quando os mixins são chamados de dentro de um seletor CSS, os argumentos são reconhecidos e os estilos dentro do mixin são aplicados ao seletor.

### Sass

{% highlight scss %}
// Mixin em Sass chamado error com argumento $borderWidth opcional, caso não seja fornecido, utiliza o valor padrão de 2px;
@mixin error($borderWidth: 2px) {
	border: $borderWidth solid #f00;
	color: #f00;
}

.generic-error {
	padding: 20px;
	margin: 4px;
	@include error(); // Aplica estilos do mixin error
}
.login-error {
	left: 12px;
	position: absolute;
	top: 20px;
	@include error(5px); // Aplica estilos do mixin error com argumento $borderWidth = 5px
}
{% endhighlight %}

### LESS

{% highlight scss %}
// Mixin em LESS chamado error com argumento $borderWidth opcional, caso não seja fornecido, utiliza o valor padrão de 2px;
.error(@borderWidth: 2px) {
	border: @borderWidth solid #f00;
	color: #f00;
}

.generic-error {
	padding: 20px;
	margin: 4px;
	.error(); // Aplica estilos do mixin error
}
.login-error {
	left: 12px;
	position: absolute;
	top: 20px;
	.error(5px); // Aplica estilos do mixin error com argumento $borderWidth = 5px
}
{% endhighlight %}

### Stylus

{% highlight scss %}
// Mixin em Stylus chamado error com argumento $borderWidth opcional, caso não seja fornecido, utiliza o valor padrão de 2px;
error(borderWidth = 2px) {
	border: borderWidth solid #f00;
	color: #f00;
}

.generic-error {
	padding: 20px;
	margin: 4px;
	error(); // Aplica estilos do mixin error
}
.login-error {
	left: 12px;
	position: absolute;
	top: 20px;
	error(5px); // Aplica estilos do mixin error com argumento $borderWidth = 5px
}
{% endhighlight %}

### CSS Compilado

Todos pré-processadores irão compilar o mesmo código abaixo:

{% highlight scss %}
.generic-error {
	padding: 20px;
	margin: 4px;
	border: 2px solid #f00;
	color: #f00;
}
.login-error {
	left: 12px;
	position: absolute;
	top: 20px;
	border: 5px solid #f00;
	color: #f00;
}
{% endhighlight %}

## Herança

Quando estamos escrevendo CSS da velha maneira, nós usaríamos o seguinte código para aplicar o mesmo estilo para múltiplos elementos de uma só vez:

{% highlight scss %}
p,
u,
ol {
	// estilos aqui
}
{% endhighlight %}

Isso funciona perfeitamente, mas se depois precisássemos de estilizar os elementos individualmente, outro seletor deveria ser criado para cada um e rapidamente poderia ficar cada vez mais bagunçado e difícil de manter. Podemos utilizar herança para resolver isso. Herança é a habilidade de outros seletores CSS herdarem as propriedades de outro seletor.

### Sass e Stylus

{% highlight scss %}
.block {
	margin: 10px 5px;
	padding: 2px;
}

p {
	@extend .block; // Herda estilos do seletor '.block'
	border: 1px solid #eee;
}
ul, ol {
	@extend .block; // Herda estilos do seletor '.block'
	color: #333;
	text-transform: uppercase;
}
{% endhighlight %}

### CSS Compilado (Sass e Stylus)

{% highlight scss %}
.block, p, ul, ol {
	margin: 10px 5px;
	padding: 2px;
}
p {
	border: 1px solid #eee;
}
ul, ol {
	color: #333;
	text-transform: uppercase;
}
{% endhighlight %}

### LESS

LESS não tem suporte a herança de estilos como Sass e Stylus. Ao invés de adicionar diversos seletores para um grupo de propriedades, ele trata herança como um mixin sem argumentos e importa os estilos para dentro de seus próprios seletores. O problema disso é que propriedades são repetidas em sua folha de estilo compilada. Abaixo segue como deve-se utilizar:

{% highlight scss %}
.block {
	margin: 10px 5px;
	padding: 2px;
}

p {
	.block; // Herda estilos do seletor '.block'
	border: 1px solid #eee;
}
ul, ol {
	.block; // Herda estilos do seletor '.block'
	color: #333;
	text-transform: uppercase;
}
{% endhighlight %}

> **Observação Pessoal:** Como mencionado em um comentário no **[Tableless](http://tableless.com.br)**, o **LESS** tem suporte a herança e pode ser feita com a seguinte sintaxe:

{% highlight scss %}
p {
	 &:extend(.block);
}
{% endhighlight %}

### CSS Compilado (LESS)

{% highlight scss %}
.block {
	margin: 10px 5px;
	padding: 2px;
}
p {
	margin: 10px 5px;
	padding: 2px;
	border: 1px solid #eee;
}
ul,
ol {
	margin: 10px 5px;
	padding: 2px;
	color: #333;
	text-transform: uppercase;
}
{% endhighlight %}

Como você pode ver, os estilos do seletor `.block` foram inseridas nos seletores que queríamos aplicar a herança. É importante notar que a prioridade das propriedades pode se tornar um problema, então devemos ter bastante cautela.

## Importação

Na comunidade CSS, importar CSS é visto com maus olhos por utilizar diversas chamadas HTTP. Importar com um pré-processador funciona de forma diferente no entanto. Se você importar um arquivo com qualquer um dos três pré-processadores, ele irá literalmente pegar todo o conteúdo do arquivo durante a importação e gerar apenas um arquivo. Lembre-se que arquivos `.css` comuns importados compilam com o código:

{% highlight scss %}
@import "file.css";
{% endhighlight %}

Lembre-se também que mixins e variáveis podem ser importadas e usadas em sua folha de estilo principal. Importação faz com que possamos criar arquivos separados para uma melhor organização.

### Sass, LESS e Stylus

{% highlight scss %}
// arquivo.{extensao}
body {
	background: #eee;
}
{% endhighlight %}

{% highlight scss %}
@import "reset.css";
@import "arquivo.{extensao}";

p {
	background: #0982c1;
}
{% endhighlight %}


### CSS Compilado

{% highlight scss %}
@import "reset.css";
body {
  background: #EEE;
}
p {
  background: #0982C1;
}
{% endhighlight %}

## Funções de Cores

Funções de cores são funções nativas que transformam uma cor por compilação. Podem ser extremamente úteis para criar gradientes, escurecer cores no `hover` de elementos e muito mais.

### Sass

{% highlight scss %}
lighten($color, 10%); // retorna uma cor 10% mais clara que $color
darken($color, 10%);  // retorna uma cor 10% mais escura $color

saturate($color, 10%);   // retorna uma cor 10% mais saturada que $color
desaturate($color, 10%); // retorna uma cor 10% menos saturada que $color

grayscale($color);  // retorna $color na escala de cinza
complement($color); // retorna cor complementar de $color
invert($color);     // retorna cor inversa de $color

mix($color1, $color2, 50%); // mistura $color1 com $color2 com um peso de 50%
{% endhighlight %}

Essas é apenas uma pequena lista de funções de cores disponíveis no Sass. A lista completa das funções de cores disponíveis no Sass pode ser encontrada na [documentação do Sass](http://sass-lang.com/documentation/Sass/Script/Functions.html).  

Funções de cores podem ser usadas em qualquer lugar que uma cor é válida no CSS. Veja um exemplo:

{% highlight scss %}
$color: #0982C1;

h1 {
	background: $color;
	border: 3px solid darken($color, 50%);
}
{% endhighlight %}

### LESS

{% highlight scss %}
lighten(@color, 10%); // retorna uma cor 10% mais clara que @color
darken(@color, 10%);  // retorna uma cor 10% mais escura @color

saturate(@color, 10%);   // retorna uma cor 10% mais saturada que @color
desaturate(@color, 10%); // retorna uma cor 10% menos saturada que @color

spin(@color, 10); // retorna uma cor 10 graus acima na matiz/tonalidade que @color
spin(@color, -10); // retorna uma cor 10 graus abaixo na matiz/tonalidade que @color

mix(@color1, @color2); // mistura @color1 com @color2
{% endhighlight %}

A lista de todas as funções disponíveis no LESS pode encontrada na [documentação do LESS](http://lesscss.org/#-color-functions).  

Veja um exemplo de como usar uma função de cores no LESS:

{% highlight scss %}
@color: #0982C1;

h1 {
	background: @color;
	border: 3px solid darken(@color, 50%);
}
{% endhighlight %}

### Stylus

{% highlight scss %}
lighten(color, 10%); // retorna uma cor 10% mais clara que 'color'
darken(color, 10%);  // retorna uma cor 10% mais escura 'color'

saturate(color, 10%);   // retorna uma cor 10% mais saturada que 'color'
desaturate(color, 10%); // retorna uma cor 10% menos saturada que 'color'
{% endhighlight %}

A lista completa de todas funções de cores disponíveis no Stylus pode ser encontrada na [documentação do Stylus](http://stylus-lang.com/docs/bifs.html).  

Veja um exemplo de como usar uma função de cores no Stylus:

{% highlight scss %}
color = #0982C1

h1
	background color
	border 3px solid darken(color, 50%)
{% endhighlight %}

## Operações

Fazer cálculos no CSS é bastante útil e agora totalmente possível. É bem simples e é dessa maneira que fazemos:

### Sass, LESS e Stylus

{% highlight scss %}
body {
	margin: (14px/2);
	top: 50px + 100px;
	right: 100px - 50px;
	left: 10 * 10;
}
{% endhighlight %}

## Aplicações Práticas

Nós falamos de diversas funcionalidades e novas coisas que pré-processadores podem fazer, mas não mostramos nada na prática ainda. Veja uma pequena lista de aplicações no mundo real em que um pré-processador é um salva-vidas.

### Vendor Prefixes

#### Sass

{% highlight scss %}
@mixin border-radius($values) {
	-webkit-border-radius: $values;
		-moz-border-radius: $values;
			border-radius: $values;
}

div {
	@include border-radius(10px);
}
{% endhighlight %}

#### LESS

{% highlight scss %}
.border-radius(@values) {
	-webkit-border-radius: @values;
		-moz-border-radius: @values;
			border-radius: @values;
}

div {
	.border-radius(10px);
}
{% endhighlight %}

#### Stylus

{% highlight scss %}
border-radius(values) {
	-webkit-border-radius: values;
		-moz-border-radius: values;
			border-radius: values;
}

div {
	border-radius(10px);
}
{% endhighlight %}

#### CSS Compilado

{% highlight scss %}
div {
	-webkit-border-radius: 10px;
		-moz-border-radius: 10px;
			border-radius: 10px;
}
{% endhighlight %}

### Texto 3D

Simular um texto 3D utilizando diversos text-shadows é uma grande ideia. O único problema é que mudar a cor depois de criar é difícil e incômodo. Usando mixins e funções de cores, podemos criar um texto 3D e mudar sua cor sem nenhuma dificuldade.

#### Sass

{% highlight scss %}
@mixin text3d($color) {
	color: $color;
	text-shadow: 1px 1px 0px darken($color, 5%),
			2px 2px 0px darken($color, 10%),
			3px 3px 0px darken($color, 15%),
			4px 4px 0px darken($color, 20%),
			4px 4px 2px #000;
}

h1 {
	font-size: 32pt;
	@include text3d(#0982c1);
}
{% endhighlight %}

#### LESS

{% highlight scss %}
.text3d(@color) {
	color: @color;
	text-shadow: 1px 1px 0px darken(@color, 5%),
			2px 2px 0px darken(@color, 10%),
			3px 3px 0px darken(@color, 15%),
			4px 4px 0px darken(@color, 20%),
			4px 4px 2px #000;
}

span {
	font-size: 32pt;
	.text3d(#0982c1);
}
{% endhighlight %}

#### Stylus

{% highlight scss %}
text3d(color)
	color: color
	text-shadow: 1px 1px 0px darken(color, 5%), 2px 2px 0px darken(color, 10%), 3px 3px 0px darken(color, 15%), 4px 4px 0px darken(color, 20%), 4px 4px 2px #000
span
	font-size: 32pt
	text3d(#0982c1)
{% endhighlight %}

Escolhi escrever os "text-shadows" do Stylus em apenas uma linha pois omiti as chaves.

#### CSS Compilado

{% highlight scss %}
span {
	font-size: 32pt;
	color: #0982c1;
	text-shadow: 1px 1px 0px #097bb7,
			2px 2px 0px #0875ae,
			3px 3px 0px #086fa4,
			4px 4px 0px #07689a,
			4px 4px 2px #000;
}
{% endhighlight %}

#### Resultado Final

![3D Text](https://cdn.tutsplus.com/net/uploads/legacy/1144_preprocshootout/text3d.png)

### Colunas

Usar operações numéricas e variáveis para colunas é uma ideia que tive da primeira vez que estava brincando com pré-processadores CSS. Declarando a largura desejada em uma variável, podemos facilmente alterá-la sem precisar de nenhum cálculo mental. Veja como fazer:

#### Sass

{% highlight scss %}
$siteWidth: 1024px;
$gutterWidth: 20px;
$sidebarWidth: 300px;

body {
	margin: 0 auto;
	width: $siteWidth;
}
.content {
	float: left;
	width: $siteWidth - ($sidebarWidth+$gutterWidth);
}
.sidebar {
	float: left;
	margin-left: $gutterWidth;
	width: $sidebarWidth;
}
{% endhighlight %}

#### LESS

{% highlight scss %}
@siteWidth: 1024px;
@gutterWidth: 20px;
@sidebarWidth: 300px;

body {
	margin: 0 auto;
	width: @siteWidth;
}
.content {
	float: left;
	width: @siteWidth - (@sidebarWidth+@gutterWidth);
}
.sidebar {
	float: left;
	margin-left: @gutterWidth;
	width: @sidebarWidth;
}
{% endhighlight %}

#### Stylus

{% highlight scss %}
siteWidth = 1024px;
gutterWidth = 20px;
sidebarWidth = 300px;

body {
	margin: 0 auto;
	width: siteWidth;
}
.content {
	float: left;
	width: siteWidth - (sidebarWidth+gutterWidth);
}
.sidebar {
	float: left;
	margin-left: gutterWidth;
	width: sidebarWidth;
}
{% endhighlight %}

#### CSS Compilado

{% highlight scss %}
body {
	margin: 0 auto;
	width: 1024px;
}
.content {
	float: left;
	width: 704px;
}
.sidebar {
	float: left;
	margin-left: 20px;
	width: 300px;
}
{% endhighlight %}

## Peculiaridades Notáveis

Existem algumas peculiaridades ao usar um pré-processador CSS. Irei falar de algumas engraçadas, mas se você está realmente interessado em encontrar todas elas eu recomendo você vasculhar toda a documentação, ou melhor, começar a usar um pré-processador na sua codificação diária.

### Relatório de Erros

Se você já escreveu CSS por uma boa quantia de tempo, tenho certeza que você já chegou a um ponto onde você tinha um erro em algum lugar e simplesmente não conseguia o encontrar. Se você é como eu, provavelmente passou a tarde toda arrancando os cabelos fora e comentando diversas coisas para caçar o erro.

Pré-processadores CSS relatam os erros. Simples assim. Se tem alguma coisa errada em seu código ele te fala onde e, se você estiver com sorte até mesmo o porquê. Você pode dar uma olhada [nesse post](http://tjholowaychuk.com/post/5002088731/stylus-vs-sass-vs-less-error-reporting) caso esteja interessado em ver como os erros são relatados em diferentes pré-processadores.

### Comentários

Quando um pré-processador CSS está compilando, qualquer comentário escrito com barras duplas é excluído e qualquer comentários escrito com barra e asterisco não é alterado. Dito isso, use comentários com barras duplas para comentários que você queira na versão não compilada e comentários com barra e asterisco para comentários que serão visíveis após a compilação.  

**Observação:** Se você compilar os arquivos, minificando-os, todos comentários são excluídos.

## Conclusão

Cada um dos pré-processadores que falamos (Sass, LESS e Stylus) possui um modo único de realizar a mesma tarefa - dando a nós desenvolvedor a habilidade de usar funcionalidades úteis mantendo a compatibilidade entre browsers e um código limpo.  

> Mesmo não sendo uma exigência para o desenvolvimento, pré-processadores podem economizar muito tempo e tem funcionalidades bastante úteis.  

Eu aconselho todos vocês a utilizar e testar a maior quantidade de pré-processadores possível, pois assim você poderá escolher efetivamente um favorito e saber o porquê ele é seu favorito dentre tantos outros. Se você ainda não testou usar nenhum pré-processador para escrever seu CSS, eu recomendo grandemente a você testar.  

Você tem alguma funcionalidade de seu pré-processador favorito que não foi mencionada? Há algo que algum pré-processador possa fazer e outros não? Conte-nos nos comentários abaixo!  

Traduzido e adaptado de: [http://code.tutsplus.com/tutorials/sass-vs-less-vs-stylus-preprocessor-shootout--net-24320](http://code.tutsplus.com/tutorials/sass-vs-less-vs-stylus-preprocessor-shootout--net-24320)
