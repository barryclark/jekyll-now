---
title: "Leitura do livro: O Mítico Homem-Mês"
permalink: "/2020/12/2020-12-26-livro-mitico-homem-mes.html"
categories: [engenharia, software, gestao, metodologia]
---

No início desse ano comprei o livro [O Mítico Homem-Mês](https://www.amazon.com.br/M%C3%ADtico-Homem-M%C3%AAs-Ensaios-Engenharia-Software/dp/8550802530) por vê-lo em uma lista de livros que todo desenvolvedor de software deveria ler, e ao pesquisar sobre o mesmo, a sinopse me deixou curioso o suficiente para investir na compra. O livro foi escrito em 1975 por [Frederick P. Brooks Jr](https://en.wikipedia.org/wiki/Fred_Brooks) respeitado professor e considerado o criador do mainframe [IBM System/360](https://pt.wikipedia.org/wiki/IBM_System/360), atuando como gerente de desenvolvimento no projeto. A biografia de Brooks fala por si só, recomendo uma pesquisa prévia sobre o mesmo pois no artigo irei abordar apenas o livro.

## A abordagem do autor

Apesar do contexto em que a obra foi escrita ser de mais de 40 anos, é interessante o formato de relato de Brooks, pois logo trouxe a mim a ação de traçar o paralelo com a minha realidade (acredito que aconteça o mesmo com a maior parte dos leitores) criando um interesse em ler de forma contínua a narrativa do autor, diferentemente de um livro mais técnico.

Cada capítulo é aberto com uma introdução reflexiva (através de figura e frases) que facilita a memorização do assunto e mantém o interesse na narrativa, um cuidado muito legal do autor que mostra o conhecimento do mesmo de forma sutil. 

Devido a idade do livro é necessário lembrar que a realidade a qual Brooks escreveu mudou muito para os tempos atuais, por isso o livro mais atual traz dois novos capítulos que realizam um "de-para" das mudanças. 

Mas o que poderia ser algo negativo para alguns, pra mim foi o ponto mais forte da obra, pois deixou mais evidente que as conclusões e conceitos do mesmo são válidos até hoje. Sugiro a quem ler exercitar desde o início a identificação dos conceitos que atualmente são abordados com novas denominações.

## Os capítulos e assuntos abordados

Cada problema ou proposição é abordada de forma franca e direta, com argumentos, acadêmicos ou de experiências do autor; o mesmo traz as conclusões que talvez tenham sido polêmicas na época, mas com certeza são enriquecedoras até os dias atuais. O livro não tem medo de expor as conclusões como verdades, mas sabe reconhecer que não são absolutas, isso o torna atual e relevante até os dias atuais.

Vi muitos artigos que afirmam que conceitos do Agile são apresentadas nesse livro, bom eu concordo em parte. Acredito que o Agile tenta solucionar muito dos problemas apresentados no livro, assim como o autor nas conclusões, mas acredito que o livro não foi utilizado pela metodologia como referência, mas é muito interessante ver como as dores são comuns.

O livro é dividido em 15 capítulos, e arrisco dizer que alguns são mais atuais que muitas metodologias que apareceram nesses anos de vida do livro. Vou citar os que mais me marcaram.

### O Poço de Alcatrão

Capítulo introdutório que aborda os problemas do desenvolvimento de software, foi o capítulo que mais fiquei atento e o qual os conceitos ficaram enraizados. 

Nesse capítulo o autor esclarece o esforço de construção dos tipos de software, apresentando uma razão não empírica mas estimada dos custos do desenvolvimento. Explica o prazer e as dores de desenvolver um software de forma envolvente, lembrando como programar não é fácil e o porquê de ver em funcionamento algo criado para a resolução de um problema é tão gratificante. O ônus também é abordado de forma honesta e sem eufemismo, trazendo a realidade para o leitor e iniciando o processo de identificação com o próprio dia a dia.

A metáfora do poço de alcatrão é explicada logo no início e casa perfeitamente com a ideia do capítulo, de que quando os ônus superam as vantagens é como um poço de piche que te puxa cada vez mais para o fundo.

### O Mítico Homem-Mês

O capítulo que carrega o título do livro (não à toa) traz a principal causa da falha dos projetos de software e apresenta de forma honesta como é uma falácia a adição de mais pessoas para acelerar o desenvolvimento de software. O livro aborda como colocar mais pessoas em um projeto atrasado vai fazê-lo atrasar ainda mais, sendo a tarefa mais difícil determinar a quantidade ideal de pessoas para o melhor tempo possível. 

Algumas frases que me marcaram foram ***...adicionar mais pessoas irá atrasar o projeto no mesmo tempo (ou mais) pelo dobro do custo ...*** e ***... como um projeto pode atrasar um ano? Atrasando um dia de cada vez...***, não enxergava essas verdades, apenas sentia os efeitos, o livro me esclareceu muito bem.

### A Equipe Cirúrgica

Outra verdade controversa (pois acredito que dependerá do produto desenvolvido), mas que se encaixou na minha realidade foi a apresentada nesse capítulo. Acredito que se resume a ideia do autor em que ***...excelentes programadores profissionais são até 10 vezes mais produtivos do que os fracos, com o mesmo treinamento e dois anos de experiência...***, acho que essa é uma verdade que incomoda, infelizmente apenas o tempo e a experiência (em programar) permite uma produtividade na construção de soluções, é necessário passar pelos problemas para conseguir torná-los fáceis na próxima vez que os encontra.

Esse capítulo propõe uma equipe pequena e coesa como a espinha dorsal de um projeto de software, sendo uma "equipe cirúrgica" essencial para o desenvolvimento. Acredito que não é mais assim, as linguagens atualmente são mais acessíveis (alto nível) do que no tempo em que o livro foi escrito, mas acho que é importante ter uma equipe que mantenha um nível de conhecimento equilibrado e documentado. Acredito que dessa forma é possível atingir a ideia apresentada no capítulo a seguir.

### Aristocracia, Democracia e o projeto de software

Manter a ideia conceitual de um software é a segunda tarefa mais difícil para mim e nesse capítulo Brooks decreta que a integridade conceitual é a parte mais importante no projeto de sistemas. Segundo o autor é necessário uma mente, ou um grupo de mentes que definam o conceito do software. Em uma frase Brooks decreta: *...Se um sistema deve ter integridade conceitual, alguém deve controlar os conceitos. Esta é uma aristocracia que não há como escapar...*, uma equipe ciente disso deve defender com todo o profissionalismo esperado.

Em equipes há grandes chances das pessoas entregarem sem verificar se o objetivo inicial foi alcançado, geralmente devido ao prazo. Infelizmente não são calculadas as consequências que isso acarreta no software como um todo. Na minha opinião, não adianta a equipe saber conceitos como *Clean Code*, *DDD* ou *Design Patterns* se não há uma checagem contínua da coerência do software em si, e acredito que isso separa as grandes empresas das outras, o melhor produto deveria ser tão importante quanto o prazo.

### Inclua em seus planos o verbo descartar

Criar um projeto piloto é uma prática muito valiosa, antecipa problemas, orienta o caminho da evolução do sistema e economiza tempo. Nesse capítulo Brooks destrincha as vantagens e compara com outras engenharias, os benefícios da prática de descarta e redesenhar em um sistema piloto, alfa etc.

Na época em que o livro foi escrito não era uma prática comum criar um projeto inicial experimental, e tenho minhas dúvidas se hoje é. Minha experiência é sempre o de lutar para reservar um tempo para criar uma prova de conceito (*Proof of Concept - POC*) nos projetos que participo e sempre ouço que isso deve ser feito (erroneamente) na *Sprint 0*, demonstrando claramente a falta de conhecimento da importância de ter um laboratório prático do que se vai construir.

Esse capítulo me mostrou a importância de orientar o desenvolvimento a partir de um projeto piloto e inicial, que irá mostrar os caminhos da implementação de forma mais clara e assertiva.

### Concluindo

É um excelente livro, deveria ser obrigatório nas graduações de software como material auxiliar. Apresenta várias provocações e verdades sem ser polêmico e vazio,  trazendo argumentos para embasar as propostas bem como exemplos e referências acadêmicas. Não me surpreende o livro ser famoso por ser ainda atual, apesar dos 40 anos de idade, e acertar na visão dos problemas de software, Brooks possui muito conhecimento tanto acadêmico quanto profissional e soube apresentar as ideias da obra de forma clara e direta.

Devido ao contexto da época que foi escrito, bem como a escolha formal do autor, a leitura pode ser cansativa em alguns pontos e algumas ideias parecerem pessimistas, mas acredito que não foi a intenção de Brooks, para mim ficou que ele tenta provocar a discussão sobre o assunto e traz para o leitor a reflexão, isso ficou mais claro nos capítulos adicionados nas revisões de 20 e 30 anos.

Recomendo a leitura a todos da área de software, principalmente aos que querem ser gestores na área.
