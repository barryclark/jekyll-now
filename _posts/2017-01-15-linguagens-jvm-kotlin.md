---
title: "Linguagens da JVM: Kotlin"
permalink: "/2017/01/linguagens-jvm-kotlin.html"
categories: [java, linguagem, plataforma, ferramentas, kotlin]
---

Atualmente a plataforma Java possui diversas linguagens de programação suportadas pela [Java Virtual Machine (JVM)](https://docs.oracle.com/javase/specs/jvms/se8/html/). As linguagens criadas podem ser interpretadas pela JVM através de compiladores que geram _bytecodes_ (linguagem intermediária que a máquina virtual entende) ou criando uma _engine_ utilizando a Java Scripting API (definida pela [JSR 223](https://www.jcp.org/en/jsr/detail?id=223)).

Apesar de particularmente gostar muito da **linguagem** Java, acredito ser importante um desenvolvedor conhecer diversas linguagens de programação para que tenha mais opções para atacar problemas que venha a enfrentar.

Pensando em melhorar a produtividade na criação de produtos, a JetBrains (criadora da IDE IntelliJ Idea) criou a linguagem [Kotlin](https://kotlinlang.org/) e a tornou [código aberto](https://github.com/JetBrains/kotlin) para incentivar a comunidade a utilizar. Nesse post irei fazer uma análise rápida da linguagem e apontar pontos que gostei.

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

## Funcionalidades

O Kotlin possui muitas funcionalidades úteis para o desenvolvedor, mas vou destacar as que mais me chamaram atenção.

### Data Classes

Muitas vezes precisamos criar classes anêmicas que só servem para armazenar dados, para esses casos a linguagem fornece o conceito de [data classes](https://kotlinlang.org/docs/reference/data-classes.html) e para utilizar é só colocar a marcação **data** na declaração do construtor que faz com que o compilador crie os **getters**, **setters** e implemente **equals()**, **hashCode()** e **toString()** para cada propriedade declarada. Segue exemplo:

```kotlin
data class Usuario(val nome: String, val idade: Int)
```

Essa declaração já é suficiente para criar o seguinte código:

```kotlin
fun main(args: Array<String>) {
    val usuario = Usuario("João", 35)
    val usuario2 = Usuario("Maria", 35)

    println("Nome: ${usuario.nome}")
    println("Idade: ${usuario.idade}")
    println(usuario.toString())
    println("Hashcode: ${usuario.hashCode()}")

    println("Nome: ${usuario2.nome}")
    println("Idade: ${usuario2.idade}")
    println(usuario2.toString())
    println("Hashcode: ${usuario2.hashCode()}")

    println("usuario.equals(usuario2) = ${usuario.equals(usuario2)}")
}
```

Resultado:

```bash
Nome: João
Idade: 35
Usuario(nome=João, idade=35)
Hashcode: 71868978
Nome: Maria
Idade: 35
Usuario(nome=Maria, idade=35)
Hashcode: -1997441011
usuario.equals(usuario2) = false
````

Muito prático, não?

### String Templates

No código de exemplo anterior, você pode ter notado algo diferente ao declarar a escrita de strings na saída do console, caso não segue destaque:

```kotlin
println("Nome: ${usuario.nome}")
```

Essa é a sintaxe do [string templates](https://kotlinlang.org/docs/reference/basic-types.html#string-templates) que permite utilizar expressões ou valores de variáveis sem precisar concatenar sendo, em minha opnião, uma forma mais limpa de declarar strings literais.

### Null Safety

Tornar o programa à prova de **null** é uma boa prática, inclusive existe um [padrão](https://www.google.com.br/url?sa=t&rct=j&q=&esrc=s&source=web&cd=4&cad=rja&uact=8&ved=0ahUKEwjx3uOzwcTRAhUGkZAKHYLTCUIQFggsMAM&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FNull_Object_pattern&usg=AFQjCNGR73DVLM27yHD-6_HvvIX57jS6Hg&sig2=koz_XhkSGdzOK5Sz6dEzaw&bvm=bv.144224172,d.Y2I) para ajudar, o Kotlin ajuda nessa tarefa trazendo para a checagem do compilador a tarefa de verificar se a variável pode ou não conter nulos, exemplo:

```kotlin
val usuario3: Usuario? = Usuario("Pedro", 30)
println(usuario3.nome) //Erro de compilação
```

Ao declarar usuario3 com a marcação '?', estamos dizendo ao compilador que essa variável pode ter nulos, logo o compilador só irá permitir operações desde que haja uma verificação explícita, corrigindo o código ficaria assim:

```kotlin
val usuario3: Usuario? = Usuario("Pedro", 30)
if (usuario3 != null) {
    println(usuario3.nome) //Agora sim! Compila sem erros
}
```

Esses foram os pontos que achei mais interessantes da linguagem, mas existem muitos outros que vale a pena citar como o [named arguments](https://kotlinlang.org/docs/reference/functions.html#named-arguments), [compilação para Javascript](https://kotlinlang.org/docs/reference/js-interop.html) e a [destructuring declaration](https://kotlinlang.org/docs/reference/multi-declarations.html).

## Concluindo

A sintaxe linguagem ajuda a diminuir as linhas de código, não só pelo suporte a programação funcional, mas pelas utilidades apresentadas. Acredito que o objetivo de ser uma linguagem mais prática para o desenvolvedor foi alcançada, principalmente por apresentar muitas facilidades que só encontramos em bibliotecas à parte.

## Fonte

* Kotlin reference - [https://kotlinlang.org/docs/reference/](https://kotlinlang.org/docs/reference/)
* Mike's Blog - [Why Kotlin is my next programming language](https://blog.plan99.net/why-kotlin-is-my-next-programming-language-c25c001e26e3#.5lxbveh71)
* InfoQ - [JetBrains lança o Kotlin 1.0](https://www.infoq.com/br/news/2016/03/jetbrains-kotlin-1)

## Código

Código fonte - [https://github.com/ivanqueiroz/kotlin](https://github.com/ivanqueiroz/kotlin)