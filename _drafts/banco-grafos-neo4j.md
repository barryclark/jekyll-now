---
title: "Banco de Grafos Neo4j"
permalink: "/2017/04/banco-grafos-neo4j.html"
categories: [java, nosql, banco de dados, ferramentas, grafos]
---

O modelo relacional de banco de dados é provavelmente o mais utilizado pelas aplicações para a grande maioria das soluções de software, mas como vimos no [post sobre Nosql]({{ site.baseurl }}{% post_url 2017-01-28-o-que-devo-saber-sobre-nosql %}) existem outras alternativas para os problemas em que o relacional não atende bem. Uma dessas alternativas é o banco de grafos que foca nos relacionamentos dos registros, ajudando a obter informações complexas muito rapidamente. Nesse artigo será mostrada uma introdução sobre banco de grafos e o Neo4j, dando uma idéia sonbre a tecnologia.

> "É um erro terrível teorizar antes de termos informação."
>
> -- _Arthur Conan Doyle_

# História

A teoria dos grafos surgiu pela primeira vez em 1736 por Leonhard Euler para resolver um problema chamado de as 7 pontes de Königsberg (atual Kaliningrado). Seis delas interligavam duas ilhas às margens do Rio Pregel e uma que fazia a ligação entre as duas ilhas. O problema consistia na seguinte questão: como seria possível fazer um passeio a pé pela cidade de forma a se passar uma única vez por cada uma das sete pontes e retornar ao ponto de partida?

{% include image.html url="/images/20170423/7pontesKonigsberg.png" description="Sete pontes de Königsberg" %}

Euler focou apenas no problema removendo todos os detalhes geométricos do mesmo (distância, tamanho das pontes, formas etc) e apresentou uma solução que além de provar que não era possível passar apenas uma vez por cada ponte, como a forma de solução poderia ser aplicada a outros problemas semelhantes. Assim surgiu a teoria dos grafos.

## Definição de grafo

E o que é um grafo? São vértices unidos por arestas (linhas):

{% include image.html url="/images/20170423/pontes_grafo.jpg" description="Grafo" %}

Essa composição do grafo foi adaptada e trazida para a ótica do banco de dados que mudou um pouco os conceitos para **nós** e **relacionamentos**. Em uma base de grafos o nó armazena as informações de uma entidade e os relacionamentos as informações de como as entidades se relacionam.

# Quando o Relacional não Atende

Como citado anteriormente o modelo relacional atende a maior parte dos problemas, mas cria muitas dficuldades para o desenvolvedor quando há um **grande aumento da coleção dos dados** (performance) e/ou quando a **normalização introduz complexidade** (mapeamento do código para o modelo de dados).

No caso do aumento de dados e queda de performance o desenvolvedor pode criar índices nas colunas de junção (joins), mas cada vez que for necessário utilizar uma coluna que não tenha índice a performance irá cair, e a cada criação de índice será utilizado cada vez mais espaço em disco para os índices, criando um ciclo vicioso difícl de se administrar.

E a complexidade introduzida pela normalização? Quando é necessário criar joins entre mais de cinco tabelas ou alterar a forma de criar o código da aplicação para cada mudança de esquema do banco, isso faz com que o desenvolvedor distancie o modelo de código do mundo real e o adapte para o modelo do banco.

## Grafos são Bons para tratar Complexidade

Os bancos relacionais são excelentes para responder perguntas como "_quem comprou esse produto?_", mas não tão bons quando queremos perguntar "_quem comprou este produto que também comprou este produto?_", quando queremos extrair mais e mais informações relacionadas de forma transversal aumentamos a clomplexidades das consultas, para esses casos podemos utilizar o banco de grafos, pois a representação através de um gráfico não se afasta muito do mundo real e é fácil de entender.

Hoje o mundo real apresenta domínios ricos, complexos, conectados e muitas vezes semi estruturados. O banco de dados de grafos além de representar melhor dados e relacionamentos, possui uma performance superior aos bancos relacionais para consultas complexas com vários níveis de relações.

{% include image.html url="/images/20170423/relacional_grafo.png" description="Gráfico versus Relacional" %}

Observando a imagem anterior dá pra concluir qual modelo é mais natural?

## Banco de Dados de Grafos

O banco de grafos é uma base de dados que armazena explicitamente uma estrutura em grafo onde cada nó conhece os nós adjacentes. Devido a forma de como os nós estão estruturados ao ter aumento no número de registros, o custo de busca se mantém o mesmo.

# O Neo4j

Principal banco de grafos do mercado, foi criado em 2003 pela Neo Technology possui código aberto escrito sobre a JVM (com Scala e Java). O Neo4j é escalável, é ACID, possui suporte a alta disponibilidade (na versão enterprise), pode ser utilizado embarcado ou como servidor e fornece uma API REST para operações. O Neo4j possui uma linguagem própria de consulta chamada **Cypher**, uma linguagem declarativa, inspirada no SQL e que utiliza uma sintaxe ascii-art.

## Concluindo

A sintaxe linguagem ajuda a diminuir as linhas de código, não só pelo suporte a programação funcional, mas pelas utilidades apresentadas. Acredito que o objetivo de ser uma linguagem mais prática para o desenvolvedor foi alcançada, principalmente por apresentar muitas facilidades que só encontramos em bibliotecas à parte.

## Fonte

* Kotlin reference - [https://kotlinlang.org/docs/reference/](https://kotlinlang.org/docs/reference/)
* Mike's Blog - [Why Kotlin is my next programming language](https://blog.plan99.net/why-kotlin-is-my-next-programming-language-c25c001e26e3#.5lxbveh71)
* InfoQ - [JetBrains lança o Kotlin 1.0](https://www.infoq.com/br/news/2016/03/jetbrains-kotlin-1)

## Código

Código fonte - [https://github.com/ivanqueiroz/kotlin](https://github.com/ivanqueiroz/kotlin)