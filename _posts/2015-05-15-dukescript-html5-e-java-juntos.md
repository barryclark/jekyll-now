---
layout: post
title: "DukeScript - HTML5 e Java juntos"
permalink: "/2015/05/dukescript-html5-e-java-juntos.html"
categories: [java, dukescript, html5]
---

O fundador do projeto Netbeans e arquiteto de software Jaroslav Tulach junto com Anton Epple consultor e instrutor Java, ganharam o Duke's Choice Award de 2014 ao apresentarem o Dukescript, uma tecnologia que tenta trazer o Java mais próximo da visão inicial de seu criador de levá-lo a todos os dispositivos escrevendo apenas um código (Write Once, Run Everywhere). Para isso utiliza o HTML5/Javascript como mecanismo de rendering e o Java no lado cliente (sem plug-in!!!) para a inteligência da aplicação.

{% include image.html url="/images/20150515/dca.jpg" description="Da esquerda pra direita: Anto Epple e Jaroslav Tulach" %}

O fundador do projeto [Netbeans](https://netbeans.org/) e arquiteto de software [Jaroslav Tulach](https://twitter.com/jaroslavtulach) junto com [Anton Epple](https://twitter.com/monacotoni) consultor e instrutor Java, ganharam o [Duke's Choice Award de 2014](https://www.java.net/dukeschoice) ao apresentarem o [Dukescript](https://dukescript.com/), uma tecnologia que tenta trazer o Java mais próximo da visão inicial de seu criador de levá-lo a todos os dispositivos escrevendo apenas um código (Write Once, Run Everywhere). Para isso utiliza o HTML5/Javascript, como mecanismo de rendering, e o Java no lado cliente (sem plug-in!!!) para as regras da aplicação.

##Funcionamento

A arquitetura do Dukescript é formada de três componentes: uma JVM, um componente HTML-Renderer e o Dukescript. Em uma entrevista para a InfoQ, Epple explicou que o Dukescript une o componente HTML e a JVM atuando como uma ponte entre a lógica de negócio em execução na JVM e a interface do usuário escrita em HTML / Javascript. A aplicação Dukescript roda dentro da JVM e usa o componente HTML para escrever a página. Assim que a página é carregada o Dukescript realiza um bind dos elementos dinâmicos da página com o modelo de dados (em Java e não Javascript) usando o Knockout.js por debaixo dos panos.

{% include image.html url="/images/20150515/dukescript.jpg" description="Dukescript e as VM's Utilizadas" %}

##Por onde começar?

O melhor início é no site oficial em [https://dukescript.com/](https://dukescript.com/), há um tutorial muito bom com o Netbeans (que surpresa) explicando os principais conceitos utilizando a aplicação demonstrativa gerada pela IDE. Claro que também é possível construir e executar o código do Dukescript fora do Netbeans, mas é um caminho mais tortuoso já que a IDE abstrai a maior parte das configurações necessária. Existe um vídeo de criação de CRUD utilizando o Dukescript que pode ser encontrado em [http://wiki.apidesign.org/wiki/DukeScript](http://wiki.apidesign.org/wiki/DukeScript).
Estou brincando um pouco com essa nova tecnologia e em breve postarei alguns experimentos aqui.

Um abraço e até a próxima!
