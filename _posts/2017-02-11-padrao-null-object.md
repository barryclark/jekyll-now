---
layout: post
title: "Revisando Padrões com Java 8: O Padrão Null Object"
permalink: "/2017/01/revisando-padroes-java-8-null-object.html"
categories: [java, padroes, desing, comportamental]
---

Existem padrões além dos famosos já mostrados pelo GOF (Gang of Four) e um desses é o padrão Null Object. Esse padrão é um bom exemplo de utilização de orientação a objetos e deve ser parte do "canivete suíço" de todo desenvolvedor que utiliza linguagens que podem ter referência nula.

> "O maior erro que você pode cometer, é o de ficar o tempo todo com medo de cometer algum."
>
> -- _Elbert Hubbard_

# Null Object

Define uma solução para conseguir lidar com referências nulas na aplicação (geralmente em linguagens orientadas a objetos).

{% include image.html url="/images/20170102/nullobject.png" description="Diagrama do Padrão Null Object" %}

## Aplicabilidade

Quando queremos tratar nulos de forma explícita, elegante e legível.

## Implementação

Primeira parte para construção do padrão será a criação da abstração para retorno:

```java
public abstract class Rota {

    abstract String getNome();
    abstract int getTamanhoRota();
    abstract Rota getEsquerda();
    abstract Rota getDireita();
    abstract void acelerar();

}
```

Essa abstração define o tipo esperado de retorno, agora podemos extendê-lo para criar uma implementação para receber os dados e outra com dados não nulos para "forçar" o desenvolvedor a lidar com a falta de dados. Criei então a RotaImpl que implementa os métodos abstratos e a classe RotaNulaImpl que também implementa os métodos abstratos mas retornando valores vazios. A RotaNulaImpl é a mais importante aqui para exemplificar:

```java
public class RotaNulaImpl extends Rota {

    private static final RotaNulaImpl INSTANCIA = new RotaNulaImpl();

    public static RotaNulaImpl getInstancia() {
        return INSTANCIA;
    }

    @Override
    String getNome() {
         return "";
    }

    @Override
    int getTamanhoRota() {
        return 0;
    }

    @Override
    Rota getEsquerda() {
        return null;
    }

    @Override
    Rota getDireita() {
        return null;
    }

    @Override
    void acelerar() {
    }

}
```

Basicamente ela implementa todos os métodos abstratos e retorna um valor que é esperado para a lógica da aplicação.

Vamos executar o programa principal:

```java
ublic class Aplicacao {

    public static void main(String[] args) {
        Rota pontoPartida = new RotaImpl("Terra",
                new RotaImpl("Marte",
                        new RotaImpl("Jupiter",
                                RotaNulaImpl.getInstancia(),
                                new RotaImpl("Saturno",
                                        new RotaImpl("Netuno",
                                                new RotaImpl("Urano",
                                                        RotaNulaImpl.getInstancia(),
                                                        RotaNulaImpl.getInstancia()),
                                                RotaNulaImpl.getInstancia()),
                                        RotaNulaImpl.getInstancia())),
                        RotaNulaImpl.getInstancia()),
                RotaNulaImpl.getInstancia());

        pontoPartida.acelerar();
    }

}
```

Obs.: apresento a identação bumerangue!!!!  :D

A execução do programa:

```shell
com.ivanqueiroz.padroes.nullobject.RotaImpl - Terra
com.ivanqueiroz.padroes.nullobject.RotaImpl - Marte
com.ivanqueiroz.padroes.nullobject.RotaImpl - Jupiter
com.ivanqueiroz.padroes.nullobject.RotaImpl - Saturno
com.ivanqueiroz.padroes.nullobject.RotaImpl - Netuno
com.ivanqueiroz.padroes.nullobject.RotaImpl - Urano
```

Repare que mesmo com pontos em que não passo dados de rotas (ao utilizar instâcias de RotaNulaImpl) a aplicação não quebra, já que no lugar de uma referência nula existe um objeto com valores padrões, não é preciso verificar nulidade no código.

Esse padrão é uma solução interessante por não ter efeito colateral, já que se existir métodos que não estão preparados para retornar a instância com valores padrões, o comportamento vai ser o "normal" de uma aplicação sem o padrão. Talvez os pontos fracos do null object sejam o aumento do número de classes e ser trabalhoso em classes com grandes números de propriedades.

## No Java 8

A pegadinha desse padrão para o Java 8 é que não precisamos dele! No Java 8 com a programação funcional veio uma forma de tratar objetos nulos com a utilização da classe [Optional](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html). A classe Optional pode ser encarada como uma caixa que pode ou não conter um valor não nulo, com isso a verificação de dados nulos ou vazios fica mais legível e elegante.

## Após o Java 8

E como poderíamos aplicar no nosso programinha de exemplo, o Optional? Primeiro não vamos mais precisar da classe RotaNulaImpl, pois ela será substituída pelo uso da Optional, mas precisamos alterar nossa abstração para que ela utilize a nova classe:

```java
public abstract class RotaOpcional {

    public abstract String getNome();
    public abstract int getTamanhoRota();
    public abstract Optional<RotaOpcional> getEsquerda();
    public abstract Optional<RotaOpcional> getDireita();
    public abstract void acelerar();

}
```

Agora que nossa abstração já foi alterada, podemos criar uma classe que implemente os métodos abstratos:

```java
public class RotaOpcionalImpl extends RotaOpcional {

//Propriedades alteradas para suportar a nova classe
private final Optional<RotaOpcional> direita;
private final Optional<RotaOpcional> esquerda;

//Métodos alterados para utilizar a optional
//o isPresent() verifica se há ou não valor dentro do optional
public int getTamanhoRota() {
    return 1 + (direita.isPresent() ? direita.get().getTamanhoRota() : 0) + (esquerda.isPresent() ? esquerda.get().getTamanhoRota() : 0);
}

//Com o filter verificamos se o valor tem o que precisamos
//e caso hava valor (ifPresent) executamos o método acelerar
public void acelerar() {
        esquerda.filter(r -> r.getTamanhoRota() > 0)
                .ifPresent(RotaOpcional::acelerar);

        direita.filter(r -> r.getTamanhoRota() > 0)
                .ifPresent(RotaOpcional::acelerar);
}
.
.
.
```

Repare que a sintaxe ficou mais legível.

Agora que as classes foram preparadas, alteramos o main e vemos que o resultado é o mesmo, mas não precisamos mais utilizar uma classe que implemente null;

```java
RotaOpcional terra = new RotaOpcionalImpl("Terra", Optional.ofNullable(null), Optional.ofNullable(null));
RotaOpcional marte = new RotaOpcionalImpl("Marte", Optional.ofNullable(null), Optional.ofNullable(terra));
RotaOpcional jupiter = new RotaOpcionalImpl("Jupiter", Optional.ofNullable(marte), Optional.ofNullable(null));
RotaOpcional saturno = new RotaOpcionalImpl("Saturno", Optional.ofNullable(null), Optional.ofNullable(jupiter));
RotaOpcional netuno = new RotaOpcionalImpl("Netuno", Optional.ofNullable(saturno), Optional.ofNullable(null));
RotaOpcional inicio = new RotaOpcionalImpl("Urano", Optional.ofNullable(netuno),Optional.ofNullable(null));

inicio.acelerar();
```

E executando:

```shell
com.ivanqueiroz.padroes.nullobject.opcional.RotaOpcionalImpl - Urano
com.ivanqueiroz.padroes.nullobject.opcional.RotaOpcionalImpl - Netuno
com.ivanqueiroz.padroes.nullobject.opcional.RotaOpcionalImpl - Saturno
com.ivanqueiroz.padroes.nullobject.opcional.RotaOpcionalImpl - Jupiter
com.ivanqueiroz.padroes.nullobject.opcional.RotaOpcionalImpl - Marte
com.ivanqueiroz.padroes.nullobject.opcional.RotaOpcionalImpl - Terra
```

## Vantagens e desvantagens

Como citei antes a vantagem principal do Null Object é proporcionar uma maneira elegante e legível de tratar referências nulas em códigos críticos. Deve ser utilizado em liguagens que não tenham nativamente esse tipo de suporte.

Apesar de não haver efeito colateral em se utilizar o Null Object, existem desvantagens, as que mais me chamam atenção é o aumento do número de classes e muito trabalho para implementar classes grandes.

**Obs.**: Em uma conversa com meu amigo [Mateus Malaquias](https://github.com/mmalaquias1) ele me chamou a atenção que na JSR-335 (responsável pelo Optional) não recomenda utilizar o Optional como atributo de DTO's, atributos de Entidades ou em construtores, pelo fato dele não ser serializável. Ele está certo na observação!

Mas no caso não vejo problema em utilizar em classes POJO que apenas manipulam os dados. Mas concordo que não deveria ser utilizado em construtores, pois perdemos a flexibilidade dos generics e utilização de práticas como o padrão builder.

Além disso os códigos que apresento são exemplos didáticos, ou seja, possuem o propósito de ilustrar o conhecimento que tento passar no texto.

Deêm uma olhada no [excelente post que Matheus fez](https://medium.com/@mmalaquias1/como-usar-o-optional-do-java-8-com-a-jpa-hibernate-c1e48a4aa546#.brmhrwves) sobre Optional.

## Finalizando

O Java 8 e a nova API funcional trouxe uma nova maneira de lidar com referência nula com a classe Optional, com isso temos a opção de desenhar soluções mais elegantes para o caso utilizando apenas as classes padrões.

Um forte abraço e até a próxima.

## Código no Github

[https://github.com/ivanqueiroz/padroes-projeto-java](https://github.com/ivanqueiroz/padroes-projeto-java)

## Créditos

* [http://java-design-patterns.com/](http://java-design-patterns.com/)
* [Design Patterns com Java](https://www.casadocodigo.com.br/products/livro-design-patterns)