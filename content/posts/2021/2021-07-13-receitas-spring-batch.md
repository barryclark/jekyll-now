---
categories:
- spring
- batch
- dados
- ferramentas
date: "2021-07-13T00:00:00Z"
title: Dicas de Spring Batch
url: /2020/13/2021-07-13-receitas-spring-batch.html
tags: ["spring", "batch", "java"]
---

Costuma criar aplicações em lote em Java? Pois, saiba que além de ter uma [especificação](https://jcp.org/en/jsr/detail?id=352) para tratar essas aplicações, há
um framework muito bom para ajudar a criar e padronizar o código dos mesmos, o **Spring Batch**! Nesse artigo vou colocar umas pequenas dicas que podem servir
para outras pessoas assim como me ajudaram muito.

> "*É fazendo que se aprende a fazer aquilo que se deve aprender a fazer.*"
>
> -- Aristóteles

## Primeira dica: Spring Batch pode ou não rodar com o Spring Boot

O Spring Boot facilita a configuração de projetos Spring e muitas vezes é fácil ter impressão que todos os projetos precisam rodar com ele, mas isso é falso.
Apesar de particularmente recomendar o uso do Spring Boot, o Spring Batch é um _framework_ independente, construído para ajudar na construção de aplicações _batch_ mais robustas, sejam elas _web_ ou não.

Para alcançar o objetivo a ferramenta disponibiliza um modelo de funcionamento que visa padronizar o código implementado para a aplicação. Nada melhor do que a
documentação para explicar: [Spring Batch Introduction](https://docs.spring.io/spring-batch/docs/4.3.x/reference/html/index-single.html#spring-batch-intro)

## Segunda dica: iniciar uma aplicação Spring Batch pela linha de comando

O Spring Batch não foi construído para trabalhar como um gerenciador de execução e sim para ser chamado por um, no ambiente que trabalho, o cliente utiliza o
programa Control-M para agendar e executar processamentos, sendo assim a aplicação deve ser executada a partir de uma linha de comando. Existem várias
abordagens para conseguir isso no Spring Batch, aqui vou exemplificar a que mais achei simples.

1. configure o projeto com o Spring Boot;
2. na classe de execução (anotada com `@SpringBootApplication`) implemente a interface `CommandLineRunner`;
3. em `application.properties` defina a propriedade `spring.batch.job.enabled=false` (vai impedir que todos os jobs sejam executados automaticamente);
4. implemente o código de execução do _job_ no método `run()` .

Exemplo:

```java 
public static void main(String[] args) {
    System.exit(SpringApplication.exit(SpringApplication.run(SpringBatchDicasApplication.class, args)));
}

@Override
public void run(String... args) throws Exception {
    log.info("Executando.");
    Job job = appContext.getBean("importUserJob", Job.class);
    JobParameters params =
        new JobParametersBuilder().addString("importUserJob", String.valueOf(System.currentTimeMillis())).toJobParameters();
    jobLauncher.run(job, params);
}
```

## Terceira dica: separando a fonte de dados do `JobRepository` do resto da aplicação

Quando a classe de configuração é anotada com `@EnableBatchProcessing` o Spring Boot já configura um objeto `JobRepository` com o _datasource_ configurado pelo
usuário, mas e quando não quiser persistir as informações de execução na base principal? As vezes a informação da execução não vai ser utilizada, ou em casos em
que a execução é controlada externamente não é necessário persistir, nesses casos é possível definir outro _datasource_ para o _JobRepository_.

Em muitos exemplos que achei é utilizado o `MapJobRepositoryFactoryBean`, mas é um erro! Essa classe é para usar em ambientes de desenvolvimento, pois não é _thread safe_ e pode apresentar problemas em ambiente produtivo, uma melhor alternativa é utilizar um banco em memória (como H2, HSQL ou Derby) que lida melhor com transação e _threads_.

Para configurar bancos diferentes:

1. criar um _bean_ de `BatchConfigurer` na classe de configuração;
2. criar um _bean_ para o _datasource_ do banco que se deseja para o `JobRepository` e anotá-lo com `@BatchDataSource`;
3. como não há mais um _datasource_ padrão, é necessário criar um _bean_ para `DataSourceProperties` (responsável por obter os dados de configuração no
   application.properties), o _bean_ primario com o _datasource_ principal e outro do tipo `JdbcTemplate`.

Trecho do código:

```java 
  @Bean
  @Primary
  @ConfigurationProperties("spring.datasource")
  public DataSourceProperties dataSourceProperties() {
    return new DataSourceProperties();
  }

  @Bean
  @Primary
  @ConfigurationProperties("spring.datasource.configuration")
  public HikariDataSource dataSource(DataSourceProperties properties) {
    return properties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
  }

  @Bean
  public JdbcTemplate jdbcTemplate(@Autowired DataSource dataSource) {
    return new JdbcTemplate(dataSource);
  }
  /**
   * Datasource para o repositório do batch
   */
  @Bean
  @BatchDataSource
  DataSource batchDataSource() {
    return new EmbeddedDatabaseBuilder().addScript("classpath:org/springframework/batch/core/schema-drop-hsqldb.sql")
      .addScript("classpath:org/springframework/batch/core/schema-hsqldb.sql").setType(EmbeddedDatabaseType.HSQL).build();
  }

  @Bean
  public BatchConfigurer batchConfigurer() {
    return new DefaultBatchConfigurer() {
      @Override
      public PlatformTransactionManager getTransactionManager() {
        return new ResourcelessTransactionManager();
      }

      @Override
      protected JobRepository createJobRepository() throws Exception {
        JobRepositoryFactoryBean factory = new JobRepositoryFactoryBean();
        factory.setDataSource(batchDataSource());
        factory.setTransactionManager(getTransactionManager());
        factory.afterPropertiesSet();
        return factory.getObject();
      }
    };
  }
```

### Quarta dica: tratando os erros com _exit codes_

Ao executar uma aplicação em lote via agendadores, alguns utilizam o _exit code_ da execução para alarmes de erros. No Spring Batch é fácil configurar uma
manipulador que traduz os erros para códigos de erro, segue um exemplo simples:

```java 
@Bean
ExitCodeExceptionMapper exitCodeToexceptionMapper(){
   return exception -> 1;
}
```

O trecho implementa a interface funcional `ExitCodeExceptionMapper` o qual recebe um `Throwable` e retorna o código equivalente.

### Quinta dica: estrutura do projeto

Após ler sobre a [arquitetura do Spring Batch](https://docs.spring.io/spring-batch/docs/4.3.x/reference/html/index-single.html#springBatchArchitecture), e
alguns projetos criados, o conceito de _package by feature_ foi o que se encaixou melhor na maior parte dos projetos _batch_ que construí, não é intenção desse
artigo entrar no detalhe, mas posso sugerir o artigo [https://phauer.com/2020/package-by-feature/](https://phauer.com/2020/package-by-feature/) e
o [http://www.javapractices.com/topic/TopicAction.do?Id=205](http://www.javapractices.com/topic/TopicAction.do?Id=205) sobre o assunto.

Por ser muito flexível, há muitas maneiras de utilizar o modelo do Spring Batch, tento sempre deixar o `ItemReader` com a responsabilidade de buscar os dados,
o `Processor` irá transformar, executar regras ou tratar os dados e o `ItemWriter` fica responsável por persitir o resultado.

### Finalizando

Espero que esse artigo seja encarado como o que é, uma série de dicas que não são a bala de prata, mas que podem se encaixar em algum problema que algum leitor
precise resolver. Sugestões e _feedbacks_ serão bem-vindos!

### Código
* [https://github.com/ivanqueiroz/spring-batch-dicas](https://github.com/ivanqueiroz/spring-batch-dicas)

### Fontes

* https://docs.spring.io/spring-batch/docs/4.3.x/reference/html/index.html
* https://docs.spring.io/spring-boot/docs/2.5.1/reference/htmlsingle/
