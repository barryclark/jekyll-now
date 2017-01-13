---
layout: post
title: "Linguagens da JVM: Kotlin"
permalink: "/2017/01/linguagens-jvm-kotlin.html"
categories: [java, linguagem, plataforma, ferramentas, kotlin]
---

Atualmente a plataforma Java possui diversas linguagens de programação suportadas pela [Java Virtual Machine (JVM)](https://docs.oracle.com/javase/specs/jvms/se8/html/). As linguagens criadas podem ser interpretadas pela JVM através de compiladores que geram _bytecodes_ (linguagem intermediária que a máquina virtual entende) ou criando uma _engine_ utilizando a Java Scripting API (definida pela [JSR 223](https://www.jcp.org/en/jsr/detail?id=223)).

Apesar de particularmente gostar muito da **linguagem** Java, acredito ser importante um desenvolvedor conhecer diversas linguagens de programação para que tenha mais opções para atacar problemas que venha a enfrentar.

Pensando em melhorar a produtividade na criação de produtos, a JetBrains (criadora da IDE IntelliJ Idea) criou a linguagem [Kotlin](https://kotlinlang.org/) e a tornou [código aberto](https://github.com/JetBrains/kotlin) para incentivar a comunidade a utilizar. Nesse post irei tentar analisar a linguagem e mostrar um pouco das características.

> "Sem uma língua comum não se podem concluir os negócios."
>
> -- _Confúcio_

# História

[Segundo a JetBrains](https://blog.jetbrains.com/kotlin/2015/11/the-kotlin-language-1-0-beta-is-here/) o Kotlin começou a ser desenvolvido em 2010 devido a uma percepção da empresa. A JetBrains já desenvolvia em Java a 10 anos e acumulava bastante conhecimento na utilização da plataforma, e sentiram que poderiam aumentar a produtividade do desenvolvimento dos produtos utilizando uma outra linguagem mais moderna. Após avaliarem as opções já existentes, decidiram juntar toda a bagagem e experiência que tinham para criar a tal linguagem.

## Características

O Kotlin foi pensado para ser uma linguagem moderna e voltada para a indústria em geral e possui as seguintes características:

* **estaticamente tipado** - pensando para projetos de vida longa e que possuem grande crescimento, a linguagem possui tipagem estática que facilita a manutenção de código;
* **fácil migração** - integração transparente com a linguagem Java, sendo possível utilizar qualquer framework ou biblioteca existente. Isso facilita muito a migração entre as linguagens, tornando-a suave e natural;
* **pequena curva de aprendizagem** - possui sintaxe enxuta e intuitiva,  [documentação](https://kotlinlang.org/docs/reference/) completa, uma [ferramenta online](http://try.kotlinlang.org/) para a execução de códigos e exemplos através de exercícios chamados [Koans](http://try.kotlinlang.org/koans);
* **multi-paradigma** - não força o desenvolvedor a utilizar um paradigma específico como o funcional ou orientado a objetos, suportando ambos;
* **compatível com a versão 6 do java** - projetos antigos podem se beneficiar de recursos não existentes anteriormente como lambdas e programação funcional;

A linguagem foi criada para ser pragmática na resolução de problemas além de trazer diversas funcionalidades que vemos em outras linguagens modernas.

## Configuração e suporte de IDE's

Existem plugins para o [IntelliJ IDEA](https://kotlinlang.org/docs/tutorials/getting-started.html), [Eclipse](https://kotlinlang.org/docs/tutorials/getting-started-eclipse.html) e [Netbeans](http://plugins.netbeans.org/plugin/68590/kotlin), mas a [configuração](https://kotlinlang.org/docs/tutorials/command-line.html) é bem simples para qualquer plataforma, basta efetuar o [download](https://github.com/JetBrains/kotlin/releases/tag/v1.0.5-2) do compilador e colocar a pasta bin no PATH do sistema (para os sistemas Posix pode-se utilizar o [SDKMAN](http://sdkman.io/)).

{% include image.html url="/images/20170103/kotlinc.gif" description="Teste do funcionamento do compilador do Kotlin" %}

## Comparando com a linguagem Java

O Kotlin possui funcionalidades muito úteis e interessantes, irei listar os que me chamaram mais atenção. 