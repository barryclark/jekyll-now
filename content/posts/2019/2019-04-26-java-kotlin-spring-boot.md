---
categories:
- kotlin
- spring
- java
- desenvolvimento
date: "2019-04-26T00:00:00Z"
title: Do Java ao Kotlin com Spring Boot
url: /2019/04/java-kotlin-spring-boot.html
tags: ["kotlin", "java"]
---

Nesse artigo irei mostrar como migrei o código do meu [currículo on-line](https://currículo-ivanqueiroz.herokuapp.com/) para [Kotlin](https://kotlinlang.org/) e como foi a experiência.

A linguagem  [Kotlin](https://kotlinlang.org/) (cot-lin) sempre me atraiu assim como o [Go](https://golang.org/), ambas já foram mostradas aqui no blog em [Linguagens da JVM: Kotlin]({{ site.baseurl }}{% post_url 2017/2017-01-15-linguagens-jvm-kotlin %}) e [Aprendendo GO/GOLANG]({{ site.baseurl }}{% post_url 2015/2015-04-21-aprendendo-gogolang %}), mas o Kotlin me atraiu mais pelas possibilidades que possui, como ser compilável para Java, Javascript, Android e Nativo além de ter suporte a vários paradigmas de programação.

> A mudança é a lei da vida. E aqueles que apenas olham para o passado ou para o presente irão com certeza perder o futuro.
>
> -- _John Kennedy_

## O projeto

Fiz uma modelagem simples baseada nas informações que seriam importantes tornar dinâmicas:
{% include image.html url="/images/2019/04/diagrama-curriculo.png" description="Diagrama do Site Currículo" %}

Minha ideia foi produzir o mais rápido possível, por isso utilizei [Spring Initalizr](https://start.spring.io/) para configurar o projeto com Spring Data JPA, Web, Devtools etc. O principal foi selecionar o Kotlin como linguagem:
{% include image.html url="/images/2019/04/spring-initializer-kotlin.png" description="Configuração do Spring Initialzr" %}

Minha ideia era, além da mudança de tecnologia, adicionar as funcionalidades:

* possibilitar o cadastro dinâmico de informações;
* fornecer uma API REST para as informações;

Para as próximas versões tenho o desejo de criar a interface para administras as informações do site e suporte a webhooks.

### Mão na massa

Logo ao criar as entidades já da para perceber um ganho na redução de código, parecido quando se utiliza [Lombok](https://projectlombok.org/) só que com menos anotações. Criei as entidades JPA como [Data Classes](https://kotlinlang.org/docs/reference/data-classes.html), pois esse formato já me atendia:

```kotlin
@Entity
data class Curriculo(
        @Id
        var id: Long = 0L,

        @Column(length = 100, nullable = false, name = "PRIMEIRO_NOME")
        var primeiroNome: String = "",

        @Column(length = 100, nullable = false, name = "ULTIMO_NOME")
        var ultimoNome: String = ""
) {
    @Column(length = 240, nullable = false)
    var resumo: String = "";

    @Column(length = 240, nullable = false)
    var profissao: String = ""

    @OneToMany(cascade = [CascadeType.ALL])
    var historicos: List<Historico>? = null

    @OneToMany(cascade = [CascadeType.ALL])
    var contatos: List<Contato>? = null

    @OneToMany(cascade = [CascadeType.ALL])
    var conhecimentos: List<Conhecimento>? = null
}
```

Nesse código de exemplo não utilizei o [Null Saffety](https://kotlinlang.org/docs/reference/null-safety.html) e não declarei as propriedades com _val_, mas aproveitei a sintaxe [primary constructor](https://kotlinlang.org/docs/reference/classes.html#constructors) e a inferência dos _getters_ e _setters_ (em tempo de compilação), isso seguiu para todas as entidades do projeto.

_**Uma curiosidade**: em Kotlin a classe pública não precisa estar em um arquivo individual com o nome igual o da mesma (como em Java), bem como funções, por isso pode-se escolher entre reduzir o número de arquivos no projeto ou dividir o código em muitos. Particularmente prefiro ter um arquivo separando o propósito da classe, mas pode ser uma boa alternativa para pequenos projetos. Durante os estudos achei no Github [um projeto](https://github.com/olszewskimichal/Hateoas-SpringBoot-Kotlin/blob/master/src/main/kotlin/com/example/hateoas/kotlin/DemoApplication.kt) de exemplo que agrupou tudo em um arquivo._

Quando no projeto o repositório no Spring Data não precisa de _query methods_ específicos, basicamente você tem uma interface vazia que em Java são poucas linhas. No Kotlin ainda é possível remover os _brackets_:

```kotlin
package dev.ivanqueiroz.curriculo.dominio.curriculo

import org.springframework.data.jpa.repository.JpaRepository

interface CurriculoRepository: JpaRepository<Curriculo, Long>
```

Como ainda não criei um módulo de administração criei uma classe para popular as informações do banco, a classe implementa __CommandLineRunner__ do Spring para realizar operações quando a aplicação inicializa.

```kotlin
@Component
@ConditionalOnProperty(prefix = "banco", name = ["inicializar"], havingValue = "true")
class DbInitializer : CommandLineRunner {

    @Autowired
    lateinit var curriculoRepositorio: CurriculoRepository;

    @Autowired
    lateinit var historicoRepository: HistoricoRepository

    @Autowired
    lateinit var conhecimentoRepository: ConhecimentoRepository

    @Autowired
    lateinit var contatoRepository: ContatoRepository

    override fun run(vararg args: String?) {

        contatoRepository.deleteAll()
        conhecimentoRepository.deleteAll()
        historicoRepository.deleteAll()
        curriculoRepositorio.deleteAll()
        val curriculo = preencheCurriculo()
        curriculoRepositorio.save(curriculo)
    }
    .
    .
    .
```

Aqui a sintaxe da linguagem também me mostrou algumas coisas interessantes como a declaração de utilização da interface, que sai a palavra ```implements``` e entra apenas o ```:``` no lugar. Como as propriedades vão ser inicializadas pelo injetor do Spring, existe a palavra ```lateinit``` que informa ao compilador que aquela propriedade vai ser inicializada um pouco mais tarde (__late__), impedido que reclame de propriedade não inicializada.

Para a API REST adicionei o suporte HATEOAS do Spring Boot no Maven para agilizar o desenvolvimento. Devido a forma que criei meus modelos, precisei modificar as informações publicadas na API, para isso criei novas classes estendendo de ```ResourceSupport``` (Spring) que expõem somente os dados que desejamos:

```kotlin
class ConhecimentoResource @JsonCreator constructor(@JsonIgnore val conhecimento: Conhecimento) : ResourceSupport() {

    val id: Long = conhecimento.id

    @JsonProperty("assunto")
    val assunto: String = conhecimento.titulo

    @JsonProperty("valorNivel")
    val valorNivel: Float = conhecimento.nivel

    @JsonProperty("descricaoNivel")
    var descricaoNivel: String = ""
        get() {
            if(conhecimento.tipoConhecimento == TipoConhecimento.ESPECIFICO) {
                return if (conhecimento.nivel < 0.25f) {
                    "Iniciante"
                } else if (0.25f >= conhecimento.nivel && conhecimento.nivel < 0.75f) {
                    "Proficiente"
                } else if (conhecimento.nivel >= 0.75f || conhecimento.nivel < 1.0f) {
                    "Especialista"
                } else if (conhecimento.nivel == 1.0f) {
                    "Mestre"
                } else {
                    "Iniciante"
                }
            }else{
                return if (conhecimento.nivel < 0.25f) {
                    "Instrumental"
                } else if (0.25f >= conhecimento.nivel && conhecimento.nivel < 0.75f) {
                    "Básico"
                } else if (conhecimento.nivel >= 0.75f || conhecimento.nivel < 1.0f) {
                    "Intermediário"
                } else if (conhecimento.nivel == 1.0f) {
                    "Avançado"
                } else {
                    "Instrumental"
                }
            }
        }

    init {
        add(linkTo(methodOn(ConhecimentoRestController::class.java).conhecimento(id)).withSelfRel())
    }
}
```

Nesse trecho a classe recebe pelo construtor o objeto que contém as informações, transformando ele para a representação desejada. O trecho com ```init``` é para a configuração do hiperlink que representa o ```ConhecimentoResource``` do padrão HATOAS. Sobrescrevi o get da propriedade de descrição do nível com uma lógica que calcula o nível baseado no tipo do conhecimento.

Mais uma vez os recursos da linguagem me pouparam algumas linhas, no momento que fui escrever a classe ```ConhecimentoService``` e o método que obtém todos os conhecimentos cadastrados. Utilizando streams para transformar o retorno o código ficou bem simples:

```kotlin
fun obterTodosConhecimentos(): List<ConhecimentoResource> {
        return conhecimentoRepository.findAll().map { c -> ConhecimentoResource(c) }
}
```

Apesar de ser um detalhe, para mim fez diferença a não necessidade de utilizar a palavra __new__ para instanciar objeto em Kotlin, não sei explicar, mas me pareceu muito mais simples.

## Concluíndo

Achei a experiência de substituir o Java por Kotlin surpreendentemente praseroza! Foi bem natural e muitas vezes intuitiva, claro que o suporte da IDE do IntelliJ IDEA ajudou muito nos momentos que precisei saber de alguma sintaxe (através da ferramenta de conversão de Java para Kotlin, também disponível on-line), mas quando não ajudava a documentação me guiava com vários exemplos. Nem tudo para mim foram flores, algumas sintaxes achei bem estranhas como a que é para sobrescrever o __getters__ e __setters__ e o ```lateinit```, o fato de tudo ser __public__ por padrão me deixou um pouco confuso se isso é bom (pode ser só implicância minha). Outro ponto é que fora a documentação não há muitos locais que ensinem a linguagem sem atrelar ao Android, eu até entendo mas vejo tanto potencial além disso.

No geral o Kotlin tem mais vantagens do que desvantagens para mim, eu sugiro para você que chegou até aqui que dê uma chance e experimente, além da documentação, indico o livro [Kotlin em Ação](https://www.amazon.com.br/Kotlin-em-A%C3%A7%C3%A3o-Dmitry-Jemerov/dp/857522610X), está me ajudando muito nesse novo conhecimento. 

Quase ia esquecendo, o código do meu projeto está nesse [link](https://github.com/ivanqueiroz/curriculo). Espero que ajude em seus estudos!

Um abraço e até o próximo artigo!