---
layout: post
title: "O Padrão Builder"
permalink: "/2017/02/o-padrao-builder.html"
categories: [java, padroes, desing, criacional]
---

Gosto muito de padrões que além de melhorar a manutenção do sistema, aumentam a legibilidade do código. Um desses padrões é o Builder, que mostra uma forma elegante de tratar classes com grande número de propriedades se tornando complexos para serem construídos.

> "Antes de construir um muro pergunto sempre quem estou
murando e quem estou deixando de fora."
>
> -- _Robert Frost_

# Builder

A definição do padrão Builder segundo o [GOF](http://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612) é "...separar a construção de um objeto complexo de sua representação de modo que o mesmo processo de construção possa criar diferentes representações...”, isso significa que o padão tem como objetivo simplificar a construção de objetos sem que precisemos conhecer os detalhes dessa construção.

{% include image.html url="/images/20170102/builder.png" description="Diagrama do Padrão Null Object" %}

## Aplicabilidade

Utilize quando você precisa separar a criação de um objeto complexo das partes que o constituem e como elas se combinam. Outro caso é quando o processo de construção precisa permitir diferentes formas de representação do objeto construído.

## Implementação

A classe [Soldado](https://raw.githubusercontent.com/ivanqueiroz/padroes-projeto-java/master/builder/src/main/java/com/ivanqueiroz/padroes/builder/Soldado.java) representa a motivação para utilizar o padrão, já que possui uma quantidade de propriedades que torna a criação dos construtores bem trabalhosa:

```java
public class Soldado {

    private final Aparelhos aparelho;
    private final String nome;
    private final Especialidade especialidade;
    private final ArmaPrimaria armaPrimaria;
    private final ArmaSecundaria armaSecundaria;
    private final Colete colete;

    private Soldado(Builder builder) {
        this.aparelho = builder.aparelho;
        this.nome = builder.nome;
        this.especialidade = builder.especialidade;
        this.armaPrimaria = builder.armaPrimaria;
        this.armaSecundaria = builder.armaSecundaria;
        this.colete = builder.colete;
    }
    .
    .
    .
```

Repare que a classe só possui um construtor privado, que apenas receberá o Builder para atribuição de valores do objeto, e não vários tentando prever N possibilidades de construção. A classe Builder será uma _inner class_ estática da classe ```Soldado```, para acessar o construtor privado e passar os valores:

```java
public static class Builder {

        private final String nome;
        private final Especialidade especialidade;
        private Aparelhos aparelho;
        private ArmaPrimaria armaPrimaria;
        private ArmaSecundaria armaSecundaria;
        private Colete colete;

        public Builder(Especialidade especialidade, String nome) {
            if (especialidade == null || nome == null) {
                throw new IllegalArgumentException("Especialidade ou nome não podem ser vazios");
            }
            this.especialidade = especialidade;
            this.nome = nome;
        }

        public Builder comArmaPrimaria(ArmaPrimaria armaPrimaria) {
            this.armaPrimaria = armaPrimaria;
            return this;
        }

        public Builder comArmaSecundaria(ArmaSecundaria armaSecundaria) {
            this.armaSecundaria = armaSecundaria;
            return this;
        }

        public Builder comColete(Colete colete) {
            this.colete = colete;
            return this;
        }

        public Builder comAparelho(Aparelhos aparelho) {
            this.aparelho = aparelho;
            return this;
        }

        public Soldado build() {
            return new Soldado(this);
        }
    }
```

O builder criado recebe propriedades obrigatórias através do construtor, as outras propriedades são recebidas por métodos que são nomeados para melhorar o entendimento da utilização do builder e sempre retornam um objeto com o estado atual das propriedades. Já o método ```build()``` retorna uma instância preenchida com os valores definidos ao longo do código. Na classe [Aplicacao](https://raw.githubusercontent.com/ivanqueiroz/padroes-projeto-java/master/builder/src/main/java/com/ivanqueiroz/padroes/builder/Aplicacao.java) temos o exemplo de utilização do padrão:

```java
private static final Logger LOGGER = LoggerFactory.getLogger(Aplicacao.class);

    public static void main(String[] args) {
        Soldado assalto = new Soldado.Builder(Especialidade.ASSALTO, "Cpt Nascimento")
                .comArmaPrimaria(ArmaPrimaria.FUZIL)
                .comArmaSecundaria(ArmaSecundaria.PISTOLA)
                .comColete(Colete.CERAMICO)
                .build();
        LOGGER.info(assalto.toString());

        Soldado suporte = new Soldado.Builder(Especialidade.SUPORTE, "Rambo")
                .comArmaPrimaria(ArmaPrimaria.METRALHADORA)
                .comAparelho(Aparelhos.C4)
                .build();
        LOGGER.info(suporte.toString());

        Soldado engenheiro = new Soldado.Builder(Especialidade.ENGENHEIRO, "Jack Bauer")
                .comAparelho(Aparelhos.SMOKE)
                .comArmaSecundaria(ArmaSecundaria.PISTOLA)
                .comColete(Colete.KEVLAR)
                .build();
        LOGGER.info(engenheiro.toString());

        Soldado batedor = new Soldado.Builder(Especialidade.BATEDOR, "Chris Kyle")
                .comArmaPrimaria(ArmaPrimaria.RIFLE)
                .comArmaSecundaria(ArmaSecundaria.REVOLVER)
                .comColete(Colete.ALUMINIO)
                .comAparelho(Aparelhos.SMOKE)
                .build();
        LOGGER.info(batedor.toString());
    }
```

Repare que a sintaxe do builder deixa o código muito claro e intuitivo, além de permitir uma flexibilização das propriedades que desejamos inicializar.

## Vantagens e desvantagens

Utilizar o Builder só tem sentido quando há uma grande quantidade de parâmetros para a construção do objeto, ou seja, não deve-se utilizá-lo quando há poucos parâmetros. Além disso existe um custo de performance (normalmente não perceptível) já que sempre deve-se chamar o Builder antes de utilizar o objeto, em sistemas de performance crítica pode ser uma desvantagem.

## Finalizando

O padrão Builder é um técnica que deve ser parte do arsenal de utilitários do desenvolvedor, melhorando o código de criação de objetos mas deve ser utilizado com cuidado e critério.

Um forte abraço e até a próxima.

## Código no Github

[https://github.com/ivanqueiroz/padroes-projeto-java](https://github.com/ivanqueiroz/padroes-projeto-java)

## Créditos

* [Design Patterns: Elements of Reusable Object-Oriented Software](http://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)
* [Effective Java](https://www.amazon.com/Effective-Java-2nd-Joshua-Bloch/dp/0321356683)