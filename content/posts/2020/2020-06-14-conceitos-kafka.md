---
categories:
- kafka
- mensageria
- dados
- ferramentas
date: "2020-06-14T00:00:00Z"
title: Conceitos e introdução ao Kafka
url: /2020/06/2020-06-14-conceitos-kafka.html
tags: ["kafka", "java", "stream", "mensageria"]
---

Kafka é uma ferramenta de mensagens que tem como objetivo ser uma plataforma de *streaming* (fluxo contínuo) de dados. Um cliente da empresa que trabalho, irá utilizar o Kafka como solução para integrar um grande volume de dados com o sistema que desenvolvemos, isso me fez querer aprender mais sobre a ferramenta e o que ela traz de diferente de outras tecnologias de integração com que trabalhei. 
Nesse artigo irei escrever sobre esse novo aprendizado e minhas impressões sobre o Kafka, a ideia é fazer uma série de artigos a medida que os estudos avançam, por isso o primeiro será abordando os conceitos e o objetivo do Kafka.

> “O cotidiano em si já é maravilhoso. Eu não faço nada mais do que registrá-lo.”
> 
> -- _Franz Kafka_

# Apache Kafka

O Apache Kafka foi criado como uma solução interna de infra-estrutura na LinkedIn para lidar com os dados como um fluxo contínuo e crescente de informação para aplicações. Externamente ele se comporta como um sistema de mensageiria onde mensagens são publicadas e consumidas, similar a soluções como ActiveMQ, RabbitMQ, IBM’s MQSeries e outros, mas internamente foi desenhado para ser um sistema distribuível, escalável e confiável. 

O Kafka funciona como um *cluster* de *brokers* e isso permite configurações interessantes de disponibilidade, o que atrai a grandes empresas com sistemas críticos.

{% include image.html url="/images/2020/01/arquitetura-macro-kafka.svg" description="Imagem 1. Arquitetura de Mensagens do Kafka." %}

## Por dentro do Kafka

Como visto na imagem 1, o Kafka funciona como uma fila de mensagens, possuindo **produtores** e **consumidores**, mas a implementação tem particularidades, a começar pela própria mensagem em si, no Kafka ela é simplesmente um array de bytes, sem um formato específico, que pode ou não possuir uma chave. Quando a chave é fornecida, é gerado um cálculo de *hash* que garante que mensagens com a mesma chave sejam escritas sempre na mesma partição, essa escrita é realizada em lotes compactados de mensagens, diminuindo a carga de rede nos casos em que o volume de mensagens seja grande. O tamanho do lote é configurável e deve ser pensado com cautela para no caso não ser grande demais e aumentar o tempo de registro da mensagem.

As mensagens são armazenadas pelo tempo que for configurado, e e as mesmas se tornam imutáveis e possuem garantias de entrega através de implementações de replicação e persistência, isso me fez entender que o Kafka também é um *storage* de dados.

## Tópicos

No Kafka as mensagens são categorizadas em **tópicos**, autores fazem a analogia de que são similares a tabelas de um banco ou a pastas de um sistema de arquivos, os mesmos são nomeados e divididos em **partições**. Cada partição é ordenada e as mensagens recebem um id incremental independente chamado de *offset* e ao criar um tópico é necessário informar a quantidade de partições. 

O "endereço" da mensagem se torna único ao combinar o nome do tópico, partição e offset. A estrutura de partições é pensada para uma melhor escalabilidade do Kafka.

{% include image.html url="/images/2020/01/particoes-kafka.png" description="Imagem 2. Representação de um tópico com múltiplas partições." %}

## Brokers e Clusters

As partições, explicadas anteriormente, estão contidas dentro do **broker**. Um *broker* simplesmente é um servidor Kafka, ele é identificado por um número arbitrário sendo responsável por receber e distribuir as mensagens. Ao receber uma mensagem o *broker* associa um *offset* para a mesma e realiza um *commit* da mensagem no disco, quando recebe uma requisição em uma partição o mesmo responde com a mensagem salva.

O *broker* Kafka foi construído para operar como parte de um *cluster* e se tornar um *controller* automaticamente caso seja eleito (eleição realizada aleatoriamente no *cluster*). Ao tornar-se um controlador, o *broker* é responsável por administrar o *cluster*, vinculando partições aos outros e monitorando falhas.

A estrutura do Kafka permite que uma partição seja associada múltiplos *brokers*, isso resulta em uma replicação da partição que provê uma redundância das mensagens armazenadas na mesma, caso um servidor caia outro pode assumir no lugar. Na replicação apenas um *broker* pode receber e veicular dados o chamado *leader*, os outros serão utilizados para sincronia dentro da replicação.

{% include image.html url="/images/2020/01/kafka-cluster.png" description="Imagem 3. Representação de um cluster Kafka." %}

Uma característica citada anteriormente e que é muito interessante é a retenção das mensagens, o qual a duração do armazenamento pode ser configurado pelo tempo (1 semana por exemplo) ou pelo tamanho limite (ex.: 2 gb). Quando o limite é atingido, as mensagens são marcadas como expiradas e excluídas.

Os tópicos podem ter configurações de armazenamento das mensagens individualmente, isso permite escolher mais tempo para tópicos julgados mais importantes para a solução.

## Produtores e consumidores

O Kafka utiliza o conceito de produtores e consumidores para definir os clientes que se conectam ao *broker*. Produtores criam as mensagens para um tópico específico, isso não é regra e sim o comportamento mais comum. O produtor no geral não se preocupa em qual partição a mensagem será salva e faz o balanceamento entre todas as disponíveis. Para enviar a um determinada partição é preciso utilizar um chave gerada internamente no formato de *hash* que é mapeada a uma partição, sempre que utilizar essa chave na mensagem ela será enviada para a mesma partição.

Consumidores leem as mensagens produzidas e controlam o consumo através dos *offsets* das mensagens. O *offset* da última mensagem é armazenado e com isso o consumidor pode parar e iniciar sem perder o histórico.

No Kafka os consumidores trabalham como parte de um **grupo de consumidores**, o qual pode ter um ou mais participantes que trabalhem juntos no consumo de um tópico. O grupo garante que cada partição seja consumida por apenas um membro, isso permite escalar horizontalmente os consumidores no caso de uma grande quantidade de mensagens. Se um consumidor tiver algum problema, as partições são redistribuídas entre os outros membros ativos.

## Conclusão

O Kafka é um sistema de mensageria que traz a proposta de unir o melhor dos modelos tradicionais de [fila](http://en.wikipedia.org/wiki/Message_queue) e [publish-subscribe](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern), permitindo a escalabilidade do processamento de mensagens do primeiro e a distribuição em massa das mensagens do segundo. Para entregar a proposta o Kafka utiliza o conceito de grupo de consumidores, distribuindo as mensagens para uma "fila" dos mesmos, permitindo a divisão do processamento por uma coleção de processadores.

Esse modelo proposto traz a vantagem de permitir que cada tópico criado possuam as propriedades de escalabilidade e de múltiplos canais de *subscribers*, sem necessidade de escolha entre uma abordagem ou outra. Além dessa propriedades a implementação do Kafka foi pensada para permitir o armazenamento das mensagens bem como alta velocidade de processamento das mesmas como um fluxo contínuo de dados (*streaming*) em baixa latência (*real-time*).

Nos próximos artigos irei abordar na prática as características e conceitos do Kafka, buscando entender o real potencial do software e como pode ajudar no dia a dia do trabalho.

Um abraço e tudo de melhor!

## Fontes

[Apache Kafka](https://kafka.apache.org/intro)