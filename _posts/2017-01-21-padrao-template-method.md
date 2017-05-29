---
layout: post
title: "Revisando Padrões com Java 8: O Padrão Template Method"
permalink: "/2017/01/revisando-padroes-java-8-template-method.html"
categories: [java, padroes, desing, comportamental]
---

No [último post da série sobre padrões]({{ site.baseurl }}{% post_url 2017-01-02-padrao-strategy %}) foi explicado o padrão Strategy, uso, vantagens e desvantagens e uma ótica de utilização com o Java 8. Continuando a série falarei do padrão Template Method seguindo a mesma linha e com exemplos. Será que conseguimos utilizá-lo com as _features_ do Java 8? Vamos ver.


> "Estamos presos ao modelo, somos parte dele."
>
> -- _V de Vingança_

# Template Method

Esse padrão define um modelo (_template_) de algoritmo, com pontos de extensão para serem utilizados por subclasses que irão adicionar comportamentos sem alterar a estrutura do algoritmo.

{% include image.html url="/images/20170102/padrao_template_method.svg" description="Diagrama do Padrão Template Method" %}

## Aplicabilidade

Podemos utilizar quando:

* queremos escrever as partes invariáveis de um algoritmo somente uma vez e deixar a implementação das partes variáveis para as suas subclasses;
* existe comportamento em comum entre as subclasses, então movemos (uma refatoração) esse comportamento para uma classe comum, evitando duplicação de código;
* queremos controlar a extensão das subclasses. Define-se um método template e a partir dele chamar várias _hook operations_ (um método padrão geralmente vazio) que podem ter os comportamentos definidos pelas subclasses.

## Implementação

Criei a classe [Lutador](https://raw.githubusercontent.com/ivanqueiroz/padroes-projeto-java/master/template-method/src/main/java/com/ivanqueiroz/templatemethod/Lutador.java) que é a classe cliente que utiliza o algoritmo implementado pelo template:

```java
public class Lutador {

    private MetodoLuta metodo;

    public Lutador() {
    }

    public void mudarMetodo(MetodoLuta metodo) {
        this.metodo = metodo;
    }

    public void finalizar() {
        metodo.finalizar();
    }
}
```

O método ```finalizar()``` chama o algoritmo de uma instância da subclasse de [MetodoLuta](https://raw.githubusercontent.com/ivanqueiroz/padroes-projeto-java/master/template-method/src/main/java/com/ivanqueiroz/templatemethod/MetodoLuta.java) que é o template de como o algoritmo será executado:

```java

public abstract class MetodoLuta {

    private static final Logger LOGGER = LoggerFactory.getLogger(MetodoLuta.class);

    public MetodoLuta() {
    }

    protected abstract String desafiarOponente();

    protected abstract void socarOponente(String oponente);

    protected abstract void chutarOponente(String oponente);

    protected abstract void atirarMagiaOponente(String oponente);

    public final void finalizar() {

        String oponente = desafiarOponente();
        LOGGER.info("Lutador desafiado: {}.", oponente);
        socarOponente(oponente);
        chutarOponente(oponente);
        atirarMagiaOponente(oponente);

    }

}

````

Criei as subclasses [MetodoForcaBruta](https://raw.githubusercontent.com/ivanqueiroz/padroes-projeto-java/master/template-method/src/main/java/com/ivanqueiroz/templatemethod/MetodoForcaBruta.java) e [MetodoAgil](https://raw.githubusercontent.com/ivanqueiroz/padroes-projeto-java/master/template-method/src/main/java/com/ivanqueiroz/templatemethod/MetodoAgil.java) que implementam os métodos abstratos.

## Antes do Java 8

Para utilizar o padrão é só criar uma instância da classe cliente, configurar o template e chamar o método executor do algoritmo:

```java
Lutador lutador = new Lutador();

lutador.mudarMetodo(new MetodoForcaBruta());
lutador.finalizar();

lutador.mudarMetodo(new MetodoAgil());
lutador.finalizar();
```

A saída da execução evidencia a mudança do algoritmo:

```shell
com.ivanqueiroz.templatemethod.MetodoLuta - Lutador desafiado Lutador de Karatê Milenar.
com.ivanqueiroz.templatemethod.MetodoForcaBruta - Soco forte no Lutador de Karatê Milenar pelo alto.
com.ivanqueiroz.templatemethod.MetodoForcaBruta - Chute forte giratório no ar em direção ao Lutador de Karatê Milenar
com.ivanqueiroz.templatemethod.MetodoForcaBruta - Hadounken de fogo no Lutador de Karatê Milenar
com.ivanqueiroz.templatemethod.MetodoLuta - Lutador desafiado Lutador de Sumô.
com.ivanqueiroz.templatemethod.MetodoForcaBruta - Soco rápido na linha de cintura do Lutador de Sumô
com.ivanqueiroz.templatemethod.MetodoForcaBruta - Chute médio com duas pernas na linha dos pés do Lutador de Sumô
com.ivanqueiroz.templatemethod.MetodoForcaBruta - Chute do pássaro giratório no Lutador de Sumô
```

## Após o Java 8

Para utilização do Java 8 deixarei de utilizar classes abstratas e irei utilizar interfaces com uma das novidades do Java 8 o controverso [Default Method](https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html).

### Default Method

Essa novidade do Java 8 gerou alguns questionamentos de design da linguagem por permitir herança múltipla caso existam interfaces com default methods com a mesma assinatura. Mas particularmente acho que trouxe muito mais benefícios do que malefícios, pois essa decisão permitiu a alteração da API sem quebrar códigos antigos.

Bom, voltando ao que interessa, criei a interface [MetodoLutaIf](https://raw.githubusercontent.com/ivanqueiroz/padroes-projeto-java/master/template-method/src/main/java/com/ivanqueiroz/templatemethod/java8/MetodoLutaIf.java) (que será o template) baseada na classe abstrata ```MetodoLuta```, somente transformando o método ```finalizar()``` no default method:

```java
public interface MetodoLutaIf {

    static final Logger LOGGER = LoggerFactory.getLogger(MetodoLutaIf.class);

    public String desafiarOponente();

    public void socarOponente(String oponente);

    public void chutarOponente(String oponente);

    public void atirarMagiaOponente(String oponente);

    public default void finalizar(){

        String oponente = desafiarOponente();
        LOGGER.info("Lutador desafiado: {}.", oponente);
        socarOponente(oponente);
        chutarOponente(oponente);
        atirarMagiaOponente(oponente);

    }
}
```

Após criar as implementações [MetodoAgilImpl](https://raw.githubusercontent.com/ivanqueiroz/padroes-projeto-java/master/template-method/src/main/java/com/ivanqueiroz/templatemethod/java8/MetodoAgilImpl.java) e [MetodoForcaBrutaImpl](https://raw.githubusercontent.com/ivanqueiroz/padroes-projeto-java/master/template-method/src/main/java/com/ivanqueiroz/templatemethod/java8/MetodoForcaBrutaImpl.java) o código executor ficará da seguinte maneira:

```shell
LutadorAtual lutadorJava8 = new LutadorAtual();

lutadorJava8.mudarMetodo(new MetodoAgilImpl());
lutadorJava8.finalizar();

lutadorJava8.mudarMetodo(new MetodoForcaBrutaImpl());
lutadorJava8.finalizar();
```

Analisando o código, não houve grande ganho do uso de Default Method (do ponto de vista na sintaxe), já que a interface possui mais de um método a ser implementado não podemos utilizar lambdas para passar novas implementações. Veremos então como seria, criei a interface [MetodoXiterIf](https://raw.githubusercontent.com/ivanqueiroz/padroes-projeto-java/master/template-method/src/main/java/com/ivanqueiroz/templatemethod/java8/MetodoXiterIf.java) e a classe [LutadorPreguicoso](https://raw.githubusercontent.com/ivanqueiroz/padroes-projeto-java/master/template-method/src/main/java/com/ivanqueiroz/templatemethod/java8/LutadorPreguicoso.java) que utiliza o template:

```java
public interface MetodoXiterIf {

    static final Logger LOGGER = LoggerFactory.getLogger(MetodoXiterIf.class);

    public String desafiarOponente();

    public default void soltarMagiaEmCima() {
        LOGGER.info("Hadouken na cara de {}", desafiarOponente());
    }

    public default void soltarMagiaEmbaixo() {
        LOGGER.info("Hadouken nas pernas de {}", desafiarOponente());
    }

    public default void soltarMagiaNoAr() {
        LOGGER.info("Hadouken na cabeça de {}", desafiarOponente());
    }

    public default void finalizar() {
        LOGGER.info("Lutador desafiado: {}.", desafiarOponente());
        soltarMagiaEmCima();
        soltarMagiaEmbaixo();
        soltarMagiaNoAr();
    }
}
```

Agora fica possível utilizar a sintaxe lambda na execução do código:

```java
LutadorPreguicoso lutadorXiter = new LutadorPreguicoso();

lutadorXiter.mudarMetodo(()->"Lutador de sumô");
lutadorXiter.finalizar();

lutadorXiter.mudarMetodo(()->"Lutador de Karatê Milenar");
lutadorXiter.finalizar();
```

E ter o resultado esperado:

```shell
MetodoXiterIf - Lutador desafiado: Lutador de sumô.
MetodoXiterIf - Hadouken na cara de Lutador de sumô
MetodoXiterIf - Hadouken nas pernas de Lutador de sumô
MetodoXiterIf - Hadouken na cabeça de Lutador de sumô
MetodoXiterIf - Lutador desafiado: Lutador de Karatê Milenar.
MetodoXiterIf - Hadouken na cara de Lutador de Karatê Milenar
MetodoXiterIf - Hadouken nas pernas de Lutador de Karatê Milenar
MetodoXiterIf - Hadouken na cabeça de Lutador de Karatê Milenar
```

## Vantagens e desvantagens

As vantagens principais para mim do Template Method são:

* o reaproveitamento de código comum;
* controlar a sequência da execução das subclasses ou implementações;
* ter pontos que chamam código ainda não implementado (hook);
* com o Java 8, podemos utilizar mais de um template, reutilizando mais código.

E as desvantagens:

* no caso da implementação com as classes (pré Java 8) devemos tomar cuidado com os modificadores de métodos para garantir o contrato da superclasse com os clientes;
* por outro lado na implementação com interfaces (pós Java 8) os métodos não podem ser finais, o que não garante o comportamento do algoritmo;
* com o uso de Default Methods deve-se ter cuidado com a herança múltipla;
* após instanciar um algoritmo, não será possível alterar o passo da execução;

## Finalizando

Apesar de parecer não haver muito ganho em utilizar a abordagem com o Java 8, é preciso estar atento a esses ganhos no contexto de sua aplicação, é como um jogo de estratégia onde o que vale é saber equilibrar as perdas e ganhos. Pode-se discutir que não seja adequado utilizar interface para a construção do Template Method, já que não é intenção do padrão deixar que as subclasses (ou implementações) consigam alterar o contrato de execução, mas se dentro do contexto da minha aplicação os benefícios de utilizar lambdas ou múltiplas interfaces superarem os problemas (ou eles sejam mitigados) por quê não usar?

Nesse post tive a intenção de justamente mostrar que os padrões não são soluções perfeitas, são boas soluções que devemos utilizar com cuidado, sempre observando as consequências.

Um forte abraço e até a próxima.

## Código no Github

[https://github.com/ivanqueiroz/padroes-projeto-java](https://github.com/ivanqueiroz/padroes-projeto-java)

## Créditos

* [Design Patterns: Elements of Reusable Object-Oriented Software](http://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)
* [http://java-design-patterns.com/](http://java-design-patterns.com/)
* [Design Patterns com Java](https://www.casadocodigo.com.br/products/livro-design-patterns)