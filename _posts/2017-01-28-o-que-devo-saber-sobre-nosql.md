---
title: "O que devo saber sobre NoSQL?"
permalink: "/2017/01/o-que-devo-saber-sobre-nosql.html"
categories: [nosql, banco de dados]
---

O modelo relacional é o tipo mais utilizado pela maioria dos bancos de dados mais populares do mercado, mas ao passar dos anos o volume de dados foi crescendo e a forma de se extrair informações foram se tornando cada vez mais custosas nesse modelo, o que levou a criação de novas técnicas como utilizar *datawarehouses* para geração de relatórios, views materializadas etc. Além disso novas necessidades surgiram como escalabilidade, baixo tempo de leitura e resposta e flexibilidade de modelagem, esse novo ambiente fez com que algumas pessoas questionassem a forma de armazenamento de dados e desse pensamento surgiu o NoSQL (not only SQL).

Mas o que é o NoSQL? É melhor que o modelo relacional? Nesse post irei explicar o que acho importante saber sobre a tecnologia.

> O modo como você reúne, administra e usa a informação determina se vencerá ou perderá.
>
> -*Bill Gates*

## Motivações do modelo relacional

O modelo foi criado pensando na consistência dos dados e em uma época em que o volume de registros não era tão grande quanto nos dias atuais, o valor dos bytes eram altos e cada economia de espaço importava. Dentro desse contexto o banco relacional é excelente, pois após a criação do *schema* na base, temos certeza que os registros serão armazenados sempre da mesma forma e, caso a normalização esteja bem feita, não teremos dados redundantes salvos.

Então acredito que o modelo não é falho, longe disso, na realidade é tão bom que a anos não houve intenção de mudá-lo e hoje ainda é possível utilizá-lo com ambientes não propícios, escalando as máquinas horizontalmente ou verticalmente (apesar de também ser um processo custoso) ou simplesmente abrindo mão de algumas características da normalização (chaves, relacionamentos etc).

## Cenários em que o relacional não atende bem

Mas sabemos que nunca há uma solução definitiva no mundo do software, e o modelo relacional mostrou-se pouco flexível em algumas situações:

* **em sistemas distribuídos** - particionar as informações em várias máquinas, torna a manutenção das tabelas bem difícil e complicado;
* **alto volume de dados com baixa velocidade de resposta** - a medida que os dados crescem na base, fica cada vez mais difícil a disponibilização rápida das informações;
* **os dados mudam constantemente** - alterar a entidade no mundo relacional em algumas situações não é fácil, dependendo do tipo do dado alguns bancos simplesmente bloqueiam o acesso a tabela para realizar uma simples alteração de coluna;
* **o modelo relacional não representa bem o real** - em algumas situações é difícil traduzir para o modelo relacional o mundo real que estamos querendo representar;

Por conta desses problemas surgiu o modelo NoSQL.

## Aparece o NoSQL

O termo NoSQL foi utilizado pela primeira vez em 1998 por Carlo Strozzi para nomear um banco de dados relacional leve, open source, que não utilizava SQL. Depois o termo foi utilizado para descrever uma alternativa mais flexível ao modelo relacional, sem intenção de substituí-lo.

Com o surgimento de sistemas com conceitos de nuvem e o crescimento das redes sociais, o desenvolvimento da tecnologia ganhou força. Grandes empresas começaram a implementar suas próprias soluções para prover um melhor suporte aos seus sistemas distribuídos como o Google e o BigTable, a Amazon e o Dynamo e o Facebook com o Cassandra (que seria utilizada futuramente pelo Twitter).

Depois disso novos bancos foram surgindo como o Apache CouchDB e o MongoDB, tornando a adoção mais fácil e popularizado entre os desenvolvedores.

## NoSQL pra que te quero!?!

Tendo qualquer um dos problemas já citados, há grandes chances de potencialmente utilizar o NoSQL na sua aplicação, mas é fundamental o desenvolvedor entender os tipos de bancos NoSQL para saber qual o melhor para a sua necessidade. Atualmente existem 4 tipos:

* **chave-valor** - os registros são armazenados como uma coleção de elementos indexados que são recuperados por uma chave. Funciona muito bem para informações no formato de listas;

{% include image.html url="/images/20170128/key_value_nosql.svg" description="Modelo chave valor" %}

* **colunar** - registro são armazenados em uma tabela, mas cada registro pode possuir várias colunas;

{% include image.html url="/images/20170128/column_nosql.svg" description="Modelo colunar" %}

* **documento** - cada registro é um documento que pode ou não fazer parte de uma coleção;

{% include image.html url="/images/20170128/document_nosql.svg" description="Modelo orientado a documentos" %}

* **grafo** - os registros são nós em um grafo interligados por arestas que representam o tipo de relacionamento entre eles;

{% include image.html url="/images/20170128/graph_nosql.svg" description="Modelo orientado a documentos" %}

Cada tipo possui vantagens e desvantagens para cenários diversos e devem ser avaliados de acordo com a necessidade da aplicação.

## Avalie se é o que precisa

Como foi já foi citado a tecnologia relacional possui um esquema rígido, já no modelo NoSQL não há essa restrição (na realidade o esquema passa a ser controlado pela aplicação) e essa flexibilidade é muito bem vinda nos dias atuais de "Big Data". Atualmente para avaliarmos a necessidade de utilizar um modelo relacional ou NoSQL são utilizados três critérios: escalonamento, consistência de dados e disponibilidade.

### Escalonamento

Como o escalonamento foi um dos pilares do desenvolvimento dos bancos NoSQL, eles levam vantagem em relação aos SGBD's relacionais nesse critério, possuem estruturas flexíveis e se comportam melhor em cenários em que o escalonamento é necessário.

### Consistência dos dados

O modelo relacional de longe é o que leva vantagem no critério consistência, possui uma estrutura rígida de controle em suas transações já que usa o paradigma **ACID** (**A**tomicity, **C**onsistency, **I**solation, **D**urability) que garante a consistência ao final de cada operação. O NoSQL utiliza o paradigma **BASE** (**B**asically **A**vailable, **S**oft state, **E**ventual consistency) que é mais voltado para disponibilidade e eventualmente consistente (quando necessário).

### Disponibilidade

Por ser mais complexo de distribuir os dados no modelo relacional (devido a natureza estruturada), fica mais difícil melhorar a disponibilidade dos mesmo, e o modelo NoSQL apresenta vantagem no critério disponibilidade já que é muito mais fácil distribuir dados nesse modelo.

Existe um teorema criado por Eric Brewer, chamado Teorema **CAP** (**C**onsistency, **A**vailability e **P**artition Tolerance) que diz ser impossível para um sistema distribuído garantir consistência, disponibilidade e tolerância ao particionamento. Só é possível conseguir duas destas três características ao mesmo tempo.

## Abra sua mente

A tecnologia NoSQL não é nova e promete ajudar a crescente demanda por gerenciamento de grandes volumes de dados, escalonamento e alta disponibilidade, mas tenha em mente que sempre há um perde e ganha, e nesse caso abre-se mão da consistência dos dados em favor da flexibilidade da tecnologia.

Além disso existe ainda um outro ponto que é a falta de uma linguagem comum (como o SQL) entre os diversos bancos existentes, atualmente em Java pode-se facilmente contornar esse problema com excelentes ferramentas como o [jnosql](http://jnosql.org/) (que será uma JSR) e o [Spring Data](http://projects.spring.io/spring-data/), mas nem todas as plataformas de desenvolvimento possuem essas alternativas e o desenvolvedor deve lidar com as peculiaridades de sintaxe de cada banco.

## Finalizando

Acredito que o NoSQL veio para ficar e parece ter um futuro promissor, devemos utilizá-lo com critérios definidos, buscando a melhor solução dentro das características da aplicação desenvolvida.

Espero neste post ter dado uma pequena noção sobre NoSQL, as características da tecnologia e quando utilizá-la. Um forte abraço e até a próxima.

## Para saber mais

Aqui em Salvador será realizado um [evento sobre NoSQL](http://javabahia.blogspot.com.br/2017/01/abertas-as-chamadas-de-trabalho-para-o.html) organizado pelo Javabahia com várias atrações explorando o tema, eu pretendo participar realizando uma palestra sobre o Spring Data e a implementação Spring Data MongoDB. Venha participar desse evento que será o maior da Bahia! Todos serão bem vindos!

## Fontes

* Site Devmedia - [Comparando o NoSQL ao modelo relacional](http://www.devmedia.com.br/comparando-o-nosql-ao-modelo-relacional/30917)
* Livro da Casa do Código - [NoSQL Como armazenar os dados de uma aplicação moderna](https://www.casadocodigo.com.br/products/livro-nosql)