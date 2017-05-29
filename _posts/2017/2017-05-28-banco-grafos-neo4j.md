---
title: "Banco de Grafos Neo4j"
permalink: "/2017/04/banco-grafos-neo4j.html"
categories: [java, nosql, banco de dados, ferramentas, grafos]
---

O modelo relacional de banco de dados é provavelmente o mais utilizado pelas aplicações para a grande maioria das soluções de software, mas como vimos no [post sobre Nosql]({{ site.baseurl }}{% post_url 2017-01-28-o-que-devo-saber-sobre-nosql %}) existem outras alternativas para os problemas em que o relacional não atende bem. Uma dessas alternativas é o banco de grafos que foca nos relacionamentos dos registros, ajudando a obter informações complexas muito rapidamente. Nesse artigo será mostrada uma introdução sobre banco de grafos e o Neo4j, dando uma idéia sonbre a tecnologia.

> "É um erro terrível teorizar antes de termos informação."
>
> -- _Arthur Conan Doyle_

<!-- more -->

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

Observando a imagem anterior dá pra perceber qual modelo é mais natural?

## Banco de Dados de Grafos

O banco de grafos é uma base de dados que armazena explicitamente uma estrutura em grafo onde cada nó conhece os nós adjacentes. Devido a forma de como os nós estão estruturados ao ter aumento no número de registros, o custo de busca se mantém o mesmo.

# O Neo4j

Principal banco de grafos do mercado, foi criado em 2003 pela Neo Technology possui código aberto escrito sobre a JVM (com Scala e Java). O Neo4j é escalável, é ACID,possui suporte a alta disponibilidade (na versão enterprise), pode ser utilizado embarcado ou como servidor, fornece uma API REST para operações e possui uma linguagem própria de consulta chamada **Cypher**.

## A Linguagem Cypher

É uma linguagem declarativa inspirada no SQL e que utiliza uma sintaxe ascii-art para representar padrões de nós e relações no gráfico. O Cypher possui conceito de variáveis que representam elementos e parâmetros. A linguagem permite criar, atualizar e remover nós, relacionamentos, rótulos e propriedades, além de gerenciar índices e restrições.

{% include image.html url="/images/20170423/query_cypher.png" description="Exemplo de query em Cypher" %}

Definir uma variável permite utilizar a mesma posteriormente para acessar determinada propriedade, exemplo:

```sql
MATCH (node:Label) RETURN node.property

MATCH (node1:Label1)-->(node2:Label2)
WHERE node1.propertyA = {value}
RETURN node2.propertyA, node2.propertyB
```

Você pode testar o Cypher on-line através do Console Neo4j em [console.neo4j.org](http://console.neo4j.org/?_ga=2.128238924.1502633414.1496016079-2066587822.1486982183) e ler a [documentação completa](https://neo4j.com/docs/developer-manual/3.2/cypher/) e utilizar o [cartão de referência](https://neo4j.com/docs/pdf/cypher-refcard-3.2.pdf) da linguagem.

## Concluindo

Conhecer outras formas de armazenar e recuperar dados irá ajudar nas suas soluções, permitindo utilizar o melhor das várias tecnologias existentes para o caso mais adequado. Torna-se um [poliglota de persistência](http://www.nosqldatabases.com/main/2010/7/2/polyglot-persistence-is-it-the-future-of-application-persist.html) permite escolher a fonte (ou fontes) de dados mais adequadas para o seu software.

## Aprenda Mais

Caso tenha se interessado e queira se aprofundar, recomendo que além da documentação procure as fontes a seguir, pois além de ensinarem sobre o Neo4J são ótimas referências para aprender sobre banco de dados de grafos.

* [https://neo4j.com/graphacademy/](https://neo4j.com/graphacademy/) - Vídeos, treinamentos online e certificações
* [https://neo4j.com/developer/](https://neo4j.com/developer/) - Documentações, materiais de referência, sandbox e vídeos
* [https://neo4j.com/books/](https://neo4j.com/books/) - Livros (gratuitos e pagos)
* [https://www.youtube.com/neo4j](https://www.youtube.com/neo4j) - Canal do Youtube

## Fontes

* Site Neo4J - [https://neo4j.com](https://neo4j.com)