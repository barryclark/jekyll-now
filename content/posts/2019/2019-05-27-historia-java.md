---
categories:
- java
- linguagem
- história
- programação
date: "2019-05-27T00:00:00Z"
title: 'Java: do carvalho ao café!'
url: /2019/05/2019-05-27-historia-java.html
tags: ["java"]
---

Dia 23/05 foi celebrado o aniversário da plataforma Java, completando em 2019 vinte quatro anos de lançamento! Mas a história da plataforma é um pouco mais antiga, e começou com um projeto inovador para a época, e que se desdobrou na plataforma de desenvolvimento presente em bilhões de dispositivos. Nesse artigo será abordada essa história, que não é somente sobre tecnologia, mas também sobre uma comunidade de usuários que teve (e tem) voz ativa no rumo da plataforma e moldou o caminho da mesma.

> "Write once, run anywhere" 
>
> -- _Sun Microsystems_

# Como tudo começou

Em 1991 um grupo de engenheiros de software foi encarregado de desenvolver um produto que antecipasse a próxima "onda" no mundo digital, parecia bem pretensioso, mas eles eram funcionários trabalhando em um escritório de uma empresa na Sand Hill Road 3000 em Menlo Park, berço de várias empresas criadas de _capital venture_ (investimento de risco) como Google, Amazon, Verisign, Symantec, Netscape e America Online, que ditam ou ditaram rumos na tecnologia, e ali não estavam para brincadeiras, ser pretensioso e inovador era pre-requisito.

O grupo de funcionários era Patrick Naughton, Mike Sheridan e James Gosling  que se uniram a Andy Bechtolsheim e Bill Joy, fundadores da empresa, a _Sun Microsystems_, e concluíram que a nova onda seria a convergência de computadores aos dispositivos e eletrodomésticos utilizados no dia a dia, todos conectados e controlados remotamente (isso te lembra [algo](https://pt.wikipedia.org/wiki/Internet_das_coisas)?). 

O projeto inicialmente chamava-se _Stealth Project_ mas logo mudou para _Green_ e a equipe foi nomeada de _Green Team_, foi dado a Mike Sheridan o desenvolvimento de negócios, Patrick Naughton, o sistema gráfico, e James (líder do projeto) a definição da linguagem de programação adequada e que atendesse a premissa de suportar um ambiente de software que fosse super legal (isso mesmo)! O projeto _Green_ foi ganhando novos membros, chegando a ter 13 pessoas, conforme figura a seguir.

{% include image.html url="/images/2019/05/green-team-sun.jpg" description="The Green Team - Da esquerda para a direita, Al Frazier, Joe Palrang, Mike Sheridan, Ed Frank, Don Jackson, Faye Baxter, Patrick Naughton, Chris Warth, James Gosling, Bob Weisblatt, David Lavallee e Jon Payne. Ausentes: Cindy Long, Chuck Clanton, Sheueling Chang e Craig Forrest." %}

## O Star7

O resultado do time foi um _Personal Digital Assitance_ (PDA) chamado de Star7 (_StarSeven_), que possuía uma tela LCD colorida de 5 polegadas, rede sem fio de 900 MHz, aúdio multimídia e entrada PCMCIA. Para os padrões de hoje isso não significa nada, mas se pensar que esse dispositivo foi lançado em 1992, mesmo ano em que a Internet começou a ser disponibilizada para o grande público, foi algo muito inovador (talvez até demais). Veja o vídeo a seguir:

[![The Star7 PDA Prototype]({{site.baseurl}}/images/2019/05/star-seven.png)](https://www.youtube.com/watch?v=Ahg8OBYixL0 "The Star7 PDA Prototype")

No dispositivo estava o SunOS (Unix da Sun), o interpretador Oak, bibliotecas gráficas, objetos de interface, as aplicações, imagens, sons e animações, tudo rodando 4 megabytes de memória RAM. O Star7 funcionava como um tipo de controle remoto para vários dispositivos. Na interface tínhamos um simpático personagem que guiava o usuário nas interações do dispositivo, 
chamado de _Duke_ e que no futuro seria adotado como o mascote da plataforma Java, liberado pela Sun com licença BSD para ser utilizado pelos desenvolvedores Java.

{% include image.html url="/images/2019/05/duke-java.svg" description="O mascote Duke" %}

Logo surgiu uma boa oportunidade para o grupo Green, a equipe deu origem a _FirstPerson_ uma empresa subsidiária da _Sun_ e preparou uma demonstração da sua tecnologia aos produtores de transcodificadores de TV e aluguel de vídeo. Na mesma época o NCSA apresentou o **MOSAIC 1.0**, o primeiro navegador gráfico para Web. Então a empresa _FirstPerson_ apostou nos testes da TV da _Time-Warner_, mas a empresa acabou escolhendo a tecnologia oferecida pela Silicon Graphics. Além disso dois dos principais executivos saíram da _FirstPerson_ e o Star7 nunca chegou a ser comercializado (com apenas 6 aparelhos construídos), com isso o projeto acabou sendo "encubado" novamente na _Sun_.

Mas de toda essa inovação, algo havia nascido despercebido, mas tinha muito potencial!

## Morre o Star7 e nasce o Java

Após alguns anos, com o insucesso do Star7, Bill Joy e John Gage analisavam oportunidades que a Internet poderia trazer. Enxergaram na Web uma possibilidade de interatividade frente ao conteúdo estático predominante, tomaram uma decisão bem arriscada e inusitada, disponibilizaram o código fonte do Oak na Internet. Para demonstrar o poder do Oak numa web baseada na Internet, fizeram um clone do navegador **MOSAIC** o **WebRunner** (influenciados pelo filme Blade Runner), que mais tarde seria conhecido como HotJava, e reescreveram o compilador em Oak.

Em 1995 John Gage foi convidado para palestrar em um encontro de profissionais de Internet e entretenimento (SunWorld) e decidiu mostrar o WebRunner, a princípio ele entrou na sala de Gosling e perguntou se ele tinha alguns cabos de rede e computadores sobrando, Gosling falou que sim mas ficou curioso em saber para quê ele queria, quando Gage explicou o motivo, Gosling não teve dúvidas! Foi junto para a conferência, ele ficou aterrorizado ao imaginar o WebRunner falhar na apresentação e trabalhou 30 horas na configuração da rede e nos testes da apresentação. 

Durante a apresentação de Gage, Gosling auxiliou controlando a demostração e moveu uma ilustração em 3D de uma molécula no meio de um texto, a platéia ficou entusiasmada. Na sequência apresentou um algoritmo de ordenação de letras na tela de forma animada e mudou a visão dos profissionais presentes.

O WebRunner era apenas uma demo, mas impressionava por apresentar animações, movimentação de objetos e execução de conteúdo dinâmico dentro de um navegador Web, não havia nada parecido antes. A possibilidade que a apresentação representava, saltou aos olhos de todos da platéia, que aplaudiu e logo a notícia se espalhou. 

{% include image.html url="/images/2019/05/webrunner.jpg" description="O mascote Duke" %}

A linguagem foi lançada em uma versão alpha (1.0a2), através de um endereço na Internet com o intuíto de deixar que os desenvolvedores decidissem por eles mesmos, se o Java valia a pena e a resposta veio rápida.

### O sucesso

Em alguns meses após o lançamento, o código fonte do Java já havia sido baixado milhares de vezes, e a banda de upload do site teve que ser ajustada várias vezes para atender a demanda, a Sun logo viu a popularidade e disponibilizou um espaço no site oficial da empresa para divulgar a plataforma. Em 23 de maio de 1995 a primeira versão do Java (1.0) foi anunciada na SunWorld com a afirmação da Netscape de que a linguagem seria integrada ao navegador da empresa.

### De onde veio a linguagem?

A linguagem primeiramente teve o nome de Greentalk, mas depois Gosling mudou o nome para Oak, inspirado por um carvalho que existia na frente do seu escritório. Já próximo do lançamento, por conta de uma outra linguagem homônima, foi necessário mudar, e o nome e o escolhido foi **Java** (não há certeza de quem escolheu o nome e inclusive é uma [boa história](https://www.javaworld.com/article/2077265/so-why-did-they-decide-to-call-it-java-.html) para ler).

Devido ao objetivo de operar em dispositivos de recursos limitados, era necessária uma linguagem acessível para todos, inicialmente C/C++ foi escolhida, mas Gosling logo percebeu que deveria dar um passo para uma nova linguagem que possuísse algumas características bem peculiares:

* **sintaxe parecida com C/C++** - ser parecida com uma linguagem bem conhecida ajudaria na adesão;
* **segurança** - sem ponteiros de memória para não ter referenciamento errado de endereços;
* **confiável** - não poderia ter comportamentos errôneos (telas da morte);
* **independente de plataforma** - o código fonte deveria ser interpretado da mesma maneira em hardwares diferentes lema "Write Once, Run Anywhere" (WORA);
* **API completa** - possuir por padrão funcionalidades básicas e avançadas;
* **coletor de lixo** - ter um coletor de lixo para uso eficiente da memória;

Todas as características contribuíram para a utilização da linguagem, mas sem dúvidas, a principal é a **independência de plataforma**.

### A Java Virtual Machine (JVM)

Imagine um desenvolvedor que precisa criar um player de música com duas funções básicas: ler um arquivo de áudio e executar o som nas caixas multimídias (bem anos 90). Para controlar o som da placa de áudio, existe um *driver* que conversa com o Sistema Operacional e esse sistema operacional possui uma API específica para chamar funções de som. 

Pense que agora que esse desenvolvedor precisa criar um player para cada *SO* do mercado (Windows, Mac e Linux), ele vai precisar traduzir o código para cada um com um compilador, mas cada sistema pode ter sua particularidade e API diferente para interagir. Lembrando que em 1995, o hardware e software ainda estavam mais para *plug and pray* (instale e reze).

O Java apresentou uma solução que se tornou o principal pilar da tecnologia: a *Java Virtual Machine* ou para bom português Máquina Virtual Java. Como o próprio nome diz trata-se de um software que simula uma máquina física e consegue executar vários programas, gerenciando os processos, memória e arquivos, mas com uma diferença fundamental: por ser virtual não dependia de hardwares. Na época a maioria dos ambientes de desenvolvimento dominantes eram baseados em linguagens compiladas, precisavam transpor o código para o ambiente específico o qual se desejava rodar aquele programa, algo assim: 

{% include image.html url="/images/2019/05/compilador-tradicional.svg" description="Compilações em Diversos Sistemas" %}

Outra abordagem seria ter um interpretador do código para a máquina, o que faz com que o mesmo código rode sem alterações em outros pontos, mas ele é mais lento que o código compilado.

O Java pegou o melhor dos dois mundos! Dos compiladores trouxe a execução rápida e dos interpretadores a independência de plataforma. Um vídeo bem legal para entender como isso é possível:

[![JVM (Java Virtual Machine)]({{site.baseurl}}/images/2019/05/jvm.png)](https://www.youtube.com/watch?v=5Bp6GLU6HKE "JVM (Java Virtual Machine)")

Isso possibilitou que o Java evoluísse além da linguagem, pois a JVM possui um coletor de lixo muito eficiente com [vários tipos de algorítimos](https://docs.oracle.com/javase/9/gctuning/introduction-garbage-collection-tuning.htm#JSGCT-GUID-223394DF-2E27-4F5D-A7DF-83151EB577BB) que [podem ser trocados](https://blog.caelum.com.br/comecando-com-parametros-e-configuracoes-da-jvm/) em função do comportamento da aplicação. Outro ponto forte é o just-in-time (JIT) compiler com as heurísticas que possui, ele é responsável por tornar a execução do programas javas serem tão ou mais rápidos que o código compilado nativamente. Tem duvída? Dê uma olhada no vídeo muito interessante de Paulo Silveira sobre o assunto:

[![Java é lento? JIT e Otimizações na Java Virtual Machine)]({{site.baseurl}}/images/2019/05/jit.png)](https://www.youtube.com/watch?v=5Bp6GLU6HKE "Java é lento? JIT e Otimizações na Java Virtual Machine)")

Muitos falam mal da sintaxe da linguagem Java, por ser verbosa, não ter cast inteligente etc, particularmente eu acho um dos pontos fortes da plataforma, pois para mim é verbosa no tamanho certo (ajuda muito a leitura de códigos antigos), é equilibrada nas operações que o compilador abstrai para o desenvolvedor e evoluiu muito de forma crescente e segura. Mas como a linguagem é uma ferramenta, e assim como uma IDE, cada um pode gostar da que quiser e a JVM permite isso, pois como ela interpreta bytecode só é necessário um compilador para a linguagem preferida que gere o _.class_ e pronto! Com isso a plataforma Java se tornou [poliglota](https://www.oracle.com/technetwork/articles/java/architect-languages-2266279.html).

### O poder da comunidade

O Java tem um processo de definição dos padrões da tecnologia, esse processo envolve desenvolvedores e empresas que discutem entre si os rumos de cada tecnologia a ser incluída, excluída ou alterada dentro do Java. Sempre houve uma preocupação de manter a retrocompatibilidade e de adotar os melhores padrões e práticas para a plataforma. 

A própria comunidade tem o poder da manter os rumos da tecnologia nos trilhos, depois que a Oracle adquiriu a Sun muitos criticaram a venda, pois achavam que o Java se tornaria pago e que era uma empresa que visava apenas os lucros (nada mais natural gostar de $$$), mas esqueceram que a Sun já havia [aberto o código fonte do Java](https://pt.wikipedia.org/wiki/OpenJDK) em 2006 e o projeto OpenJDK garante um Java livre. 

Fora isso todas as especificações do Java são públicas e abertas através do *Java Specification Request* (JSR), se uma nova tecnologia for aprovada ela então é implementada (versão de referência) em uma versão livre, não gostou da implementação? Tem toda a liberdade de criar uma proprietária e colocar as extensões que queira, mas para ser certificada como uma implementação padrão, tem que obedecer a critérios mínimos.

Esse processo permitiu que muitas soluções ótimas do mercado se tornassem especificações, como o JPA (muitas idéias do Hibernate), o Java Time (Joda Time) dentre outras. O exemplo do JPA é perfeito por hoje termos mais de uma implementação a gosto do desenvolvedor, apesar do Hibernate ser o mais famoso, outras implementações ganharam espaços por explorar pontos fracos da concorrência (como o Batoo que promete ser a mais rápida).

#### Resgate do JavaEE

Recentemente a Oracle [liberou o JavaEE para o open source](https://opensource.com/article/18/5/jakarta-ee), isso permitiu que o futuro da plataforma voltada para sistemas corporativos possa ser agora cuidado pela própria comunidade sob o nome de JakartaEE. Pra mim foi uma excelente notícia, pois o JavaEE estava sendo muito criticado por não apresentar evoluções frente as novas tendências de mercado.

{% include image.html url="/images/2019/05/jakarta-ee.jpeg" description="JakartaEE" %}

Mais uma vez o futuro de uma tecnologia da plataforma está nas mãos da comunidade e pegando o exemplo do OpenJDK, posso afirmar que está em ótimas mãos. O JCP e JSR garatem uma evolução madura e confiável, já vi muitos reclamarem da lentidão em se tomar alguma decisões, mas nada é perfeito. Além disso tomar uma decisão de design ou de inclusão/exclusão de tecnologia de uma plataforma tão utilizada no mundo, pensando em retrocompatibilidade, desempenho e segurança deve ser bem estudada.

## Grandes Evoluções

Essa lista que vou colocar é uma opnião pessoal, das principais mudanças e evoluções da plataforma durante os anos, fique a vontade para comentar e dar seu pitaco:

* JDK 1.1 (19/02/1997) - A inclusão dos JavaBeans, JDBC, RMI e reflexão deram a base para o que viria na plataforma;

* J2SE 1.2 (08/12/1998) - foi marcada pela divisão da plataforma com foco em aplicações corporativas (Java 2 Platform, Enterprise Edition), dispositivos móveis (Java 2 Platform, Micro Edition) e a de uso comum (Java 2 Platform, Standard Edition) que ditou até os dias atuais a nomeclatura. Nessa versão a adição do *framework* de coleções e a adição do JIT.

* J2SE 1.3 (08/05/2000) - pra mim a versão menos empolgante, poderia destacar aqui a inclusão a API do JavaSound, mas nem sei se é muito utilizado;

* J2SE 1.4 (06/02/2002) - primeira versão sobre o controle da JCP. Trouxe muitas API´s, destaco a Java Web Start e as de manipulação de XML;

* J2SE 5.0 (30/09/2004) - essa versão foi a primeira grande evolução da **linguagem** Java, trouxe a API de genéricos, conversão automáticam de primitivos para objetos, enum e outros. Para mim o principal foi a [api de concorrência](https://java.sun.com/j2se/1.5.0/docs/api/java/util/concurrent/package-summary.html) que trouxe muitas utilidades para lidar com Threads.

* Java SE 6 (11/12/2006) - nova versão do JDBC (4) e o _Scripting Language Support_ que posso destacar;

* Java SE 7 (07/07/2011) - após um hiato de 5 anos, trouxe poucas mas significativas mudanças como a nova API de I/O que trouxe um salto de desempenho e o gerenciamento automático de recursos no try-catch.

* Java SE 8 (18/03/2014) - a segunda grande evolução da **linguagem** com a inclusão de paradigma funcional (com lambdas e *default methods*) e a inclusão de *streams*;

* Java SE 9 (21/09/2017) - a Oracle deu uma nova vida as atualizações do Java e trouxe nessa versão o projeto de modularização do Java (*Jigsaw*) ([Java Plataform Module System](https://en.wikipedia.org/wiki/Java_Platform_Module_System)), o JShell e preparou a linguagem para programação reativa com o [Reactive Streams](https://en.wikipedia.org/wiki/Reactive_Streams);

* Java SE 10 (20/03/2018) - o que me chamou mais atenção foi o *Application class-data sharing* que reduz significativamente o footprint e o startup das aplicações, a inclusão de um JIT feito em Java e  uma sintaxe para variáveis locais com *var*;

* Java SE 11 (25/09/2018) - essa versão fez uma limpeza no JDK, retirando os módulos do JavaFx, JavaEE e do CORBA. O JavaFX e o JavaEE viraram projetos a parte. O que mais destaco é por ser a segunda versão após o novo ciclo de atualizações, que definiu duas atualizações no Java ao ano;

* Java SE 12 (19/03/2019) - novo algoritimo de *Garbage Collector* o *Shenandoah* em fase experimental mas bem promissor.

* Java SE (?) - cogita-se a introdução de objetos sem identidade (value types), bem como a progressão para arrays de 64-bits a fim de suportar grandes data sets. 

#### E o futuro?

 Não teria como falar do futuro sem olhar algumas mudanças recentes que a Oracle fez. A primeira não tão polêmica foi o novo ciclo de desenvolvimento que passa a ser de seis meses e LTS, com mudanças no JCP agora é possível adicionar recursos que alteram a especificação a cada seis meses. Isso traz uma agilidade na evolução da plataforma, sem perder a maturidade e segurança que a JCP traz.

 O segundo ponto foi o fim do suporte grátis a atualizações de segurança públicas de versões antigas do Java, desde a versão de janeiro de 2019 do Java 8. Se você chegou até aqui, sabe que o Java tem as versões de código fonte aberto e livre que podem ser utilizadas sem problema, mas caso tenha dúvidas, sugiro que leia o artigo [*Java is Still Free 2.0.3*](https://medium.com/@javachampions/java-is-still-free-2-0-0-6b9aa8d6d244) e se acalme.
 
   O futuro da plataforma está na mão de nós desenvolvedores; cada vez que discutimos, utilizamos, divulgamos e criamos software baseados em Java, contribuímos para a relevância da tecnologia, mas podemos nos envolver mais [através do JCP](https://jcp.org/en/participation/membership), [de uma JSR](https://community.oracle.com/docs/DOC-996150) ou contribuindo com o [OpenJDK](https://openjdk.java.net/contribute/).

   Espero os comentários! Até mais!

## Fontes

Alura: Java é lento? JIT e Otimizações na Java Virtual Machine - [https://www.youtube.com/watch?v=rrhO_P0IM3s&t=1s](https://www.youtube.com/watch?v=rrhO_P0IM3s&t=1s) - por Paulo Silveira

Codearchery: Java Virtual Machine - [https://www.youtube.com/watch?v=5Bp6GLU6HKE](https://www.youtube.com/watch?v=5Bp6GLU6HKE)

Devmedia: A História da Tecnologia Java - Easy Java Magazine 1 - [https://www.devmedia.com.br/a-historia-da-tecnologia-java-easy-java-magazine-1/18446](https://www.devmedia.com.br/a-historia-da-tecnologia-java-easy-java-magazine-1/18446) - por Bruno Souza, Fabiane Biznella Nardon e Serge Rehem

Tech Insider: The Green Team - [https://tech-insider.org/java/research/1998/05-a.html](https://tech-insider.org/java/research/1998/05-a.html)
