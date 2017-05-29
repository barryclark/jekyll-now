---
title: "Revisando Padrões com Java 8: O Padrão Strategy"
permalink: "/2017/01/revisando-padroes-java-8-o-padrao-strategy.html"
categories: [java, padroes, desing, comportamental]
---

Esse post será o início de uma série o qual vou tentar explicar os padrões de projeto utilizando as novidades do Java 8, se visitou esse assunto espero que já conheça os conceitos de orientação a objetos, a linguagem java e [Padrões de Projeto](https://pt.wikipedia.org/wiki/Padr%C3%A3o_de_projeto_de_software).

> "O conceito de estratégia, em grego strateegia, em latim strategi, em francês stratégie..."
>
> -- _Capitão Nascimento (Filme Tropa de Elite)._

# Strategy

É um padrão comportamental utilizado quando uma classe possui muitos algoritmos que tem o mesmo propósito e que podem ser alternados na lógica da aplicação. A execução do algoritmo fica sob responsabilidade de uma instância que compõe a classe principal.

{% include image.html url="/images/20170102/padrao_estrategia.svg" description="Diagrama do projeto de exemplo utilizanco o padrão Strategy" %}

## Aplicabilidade

Use o padrão Strategy quando:

* muitas classes relacionadas diferem somente no seu comportamento. As estratégias fornecem uma maneira de configurar uma classe comum dentre muitos comportamentos;

* você necessita de variantes de um algoritmo. Por exemplo, pode definir algoritmos que refletem diferentes soluções de compromisso entre espaço/ tempo. As estratégias podem ser usadas quando essas variantes são implementadas como uma hierarquia de classes de algoritmos;

* um algoritmo usa dados dos quais os clientes não deveriam ter conhecimento. Use o padrão Strategy para evitar a exposição das estruturas de dados complexas, específicas do algoritmo;

* uma classe define muitos comportamentos, e estes aparecem em suas operações como múltiplos comandos condicionais da linguagem. Em vez de usar muitos comandos condicionais, mova os ramos condicionais relacionados para a sua própria classe Strategy.

## Implementação

Para exemplo criei uma classe AgenteSecreto que irá consumir os algoritmos de estratégia, possui um método que executa a ação (no caso combater) e outro método que muda a estratégia em tempo de execução:

```java
public class AgenteSecreto {

    private EstrategiaAgente estrategia;

    public AgenteSecreto(EstrategiaAgente estrategia) {
        this.estrategia = estrategia;
    }

    public void mudarEstrategia(EstrategiaAgente estrategia) {
        this.estrategia = estrategia;
    }

    public void combater() {
        estrategia.executar();
    }

}
```

A interface que define o algoritmo de execução:

```java
public interface EstrategiaAgente {

    public void executar();

}
```

Criei três implementações da interface com os algoritmos: [EstrategiaEngenharia](https://raw.githubusercontent.com/ivanqueiroz/padroes-projeto-java/master/strategy/src/main/java/com/ivanqueiroz/padroes/strategy/EstrategiaEngenharia.java), [EstrategiaLinhaDeFrente](https://raw.githubusercontent.com/ivanqueiroz/padroes-projeto-java/master/strategy/src/main/java/com/ivanqueiroz/padroes/strategy/EstrategiaLinhaDeFrente.java) e [EstrategiaSuporte](https://raw.githubusercontent.com/ivanqueiroz/padroes-projeto-java/master/strategy/src/main/java/com/ivanqueiroz/padroes/strategy/EstrategiaSuporte.java). Agora vamos a Implementação do programa.

## Antes do Java 8

Após definir a interface que encapsula o algoritmo só precisamos instanciar a estratégia que queremos utilizar, passando por construtor para a classe AgenteSecreto ou chamando o método mudarEstrategia():

```java
LOGGER.info("Inimigos localizados dentro do forte!");
AgenteSecreto agente = new AgenteSecreto(new EstrategiaLinhaDeFrente());
agente.combater();

LOGGER.info("Inimigos efetuando disparos!");
agente.mudarEstrategia(new EstrategiaEngenharia());
agente.combater();

LOGGER.info("Equipe sendo alvejada!");
agente.mudarEstrategia(new EstrategiaSuporte());
agente.combater();
```

## Após o Java 8

A partir do Java 8 e o suporte a programação funcional, podemos utilizar novas sintaxes para alterar os algoritmos.

### Lambdas

Com o suporte a [Lambdas](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html), podemos "passar" a implementação do algoritmo diretamente para o construtor de AgenteSecreto ou ao método mudarEstrategia():

```java
LOGGER.info("Java 8 Lambdas");
LOGGER.info("Inimigos localizados dentro do forte!");
agente = new AgenteSecreto(() -> LOGGER.info("Segurar escudo e invadir."));
agente.combater();

LOGGER.info("Inimigos efetuando disparos!");
agente.mudarEstrategia(() -> LOGGER.info("Armar torreta, jogar granadas de efeito e plantar minas."));
agente.combater();

LOGGER.info("Equipe sendo alvejada!");
agente.mudarEstrategia(()-> LOGGER.info("Esperar feridos e ajudar."));
agente.combater();
```

A vantagem dessa abordagem é de não termos que criar uma classe para algoritmos pequenos, diminuindo o número de classes do projeto.

### Referência a métodos

Outra facilidade da programação funcional do Java 8 é o de referenciar métodos ou o chamado [Method Reference](https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html), essa facilidade é interessante quando a expressão lâmbda chama métodos já existentes, para exemplo criei em cada implementação de estratégia um método estático que realiza em si a ação requerida, com isso é possível utilizar a sintaxe do method reference e "passar" os métodos diretamente para o AgenteSecreto:

```java
LOGGER.info("Java 8 Method References");
LOGGER.info("Inimigos localizados dentro do forte!");
agente.mudarEstrategia(EstrategiaLinhaDeFrente::combaterComoLinhaDeFrente);
agente.combater();

LOGGER.info("Inimigos efetuando disparos!");
agente.mudarEstrategia(EstrategiaEngenharia::combaterComoEngenheiro);
agente.combater();

LOGGER.info("Equipe sendo alvejada!");
agente.mudarEstrategia(EstrategiaSuporte::combaterComoSuporte);
agente.combater();
```

Essa abordagem é interessante para os casos em que temos expressões lambda que apenas chamam outros métodos. Com ela deixamos o código mais legível além de chamarmos diretamente o método de ação.

### Executando

Ao executarmos a aplicação temos o seguinte resultado:

```text

padroes.strategy.Aplicacao - Inimigos localizados dentro do forte!
padroes.strategy.EstrategiaLinhaDeFrente - Segurar escudo e invadir.
padroes.strategy.Aplicacao - Inimigos efetuando disparos!
padroes.strategy.EstrategiaEngenharia - Armar torreta, jogar granadas de efeito e plantar minas.
padroes.strategy.Aplicacao - Equipe sendo alvejada!
padroes.strategy.EstrategiaSuporte - Esperar feridos e ajudar.
padroes.strategy.Aplicacao - Java 8 Lambdas
padroes.strategy.Aplicacao - Inimigos localizados dentro do forte!
padroes.strategy.Aplicacao - Segurar escudo e invadir.
padroes.strategy.Aplicacao - Inimigos efetuando disparos!
padroes.strategy.Aplicacao - Armar torreta, jogar granadas de efeito e plantar minas.
padroes.strategy.Aplicacao - Equipe sendo alvejada!
padroes.strategy.Aplicacao - Esperar feridos e ajudar.
padroes.strategy.Aplicacao - Java 8 Method References
padroes.strategy.Aplicacao - Inimigos localizados dentro do forte!
padroes.strategy.EstrategiaLinhaDeFrente - Segurar escudo e invadir.
padroes.strategy.Aplicacao - Inimigos efetuando disparos!
padroes.strategy.EstrategiaEngenharia - Armar torreta, jogar granadas de efeito e plantar minas.
padroes.strategy.Aplicacao - Equipe sendo alvejada!
padroes.strategy.EstrategiaSuporte - Esperar feridos e ajudar.
```

## Vantagens e desvantagens do Strategy

Em outras fontes você irá encontrar diversas vantagens e desvantagens sobre o padrão, para mim as principais vantagens são:

* criar novos algoritmos com modificações mínimas da aplicação;
* poder alterar os algoritmos em tempo de execução;
* diminuição de estruturas condicionais na classe cliente.

Já as desvantagens:

* aumento no número de classes;
* aumento na complexidade de criação do objeto, já que a instância da dependência precisa ser criada e configurada.

## Finalizando

Na versão 8 a linguagem Java trouxe ótimas novidades que ajudam bastante no desenvolvimento de soluções de código mais simples e legíveis. O suporte a programação funcional trás um novo paradigma para os desenvolvedores que utilizam a linguagem, cabe a nós avaliar e escolher a melhor forma de aproveitá-la. Um forte abraço e até a próxima.

### Código no Github

[https://github.com/ivanqueiroz/padroes-projeto-java](https://github.com/ivanqueiroz/padroes-projeto-java)

## Créditos

* [Design Patterns: Elements of Reusable Object-Oriented Software](http://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)
* [http://java-design-patterns.com/](http://java-design-patterns.com/)
* [Design Patterns com Java](https://www.casadocodigo.com.br/products/livro-design-patterns)