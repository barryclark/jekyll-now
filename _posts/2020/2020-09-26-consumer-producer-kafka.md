---
title: "Criando consumers e producers em Kafka com Java"
permalink: "/2020/09/2020-09-26-consumer-producer-kafka.html"
categories: [kafka, mensageria, dados, ferramentas]
---

A algum tempo fiz um post sobre [Apache Kafka]({{ site.baseurl }}{% post_url /2020/2020-06-14-conceitos-kafka %}) explicando os conceitos principais como o funcionamento, produtores, consumidores, tópicos e outros. Também escrevi sobre um pouco da história do Kafka e aplicabilidade. Para esse post pretendo dar continuidade ao assunto, mostrando na prática o funcionamento dessa ferramenta.

> "*Para ganhar conhecimento, adicione coisas todos os dias. Para ganhar sabedoria, elimine coisas todos os dias.*"
> 
> -- Lao-Tsé

# Configurando o ambiente

Inicialmente é necessário ter o Kafka rodando na máquina para poder praticar a codificação. No endereço https://kafka.apache.org/quickstart ensina como baixar, configurar e executar com um passo a passo bem explicativo. Para esse artigo irá ser utilizado um *container* que é mantido pela Confluent devido a comodidade que a abordagem possibilita.

## Antes de começar

Para seguir o post é necessário instalar as ferramentas necessárias que são o *Docker*, *Docker Compose* e o *GIT*. Para instalar o *Docker* em Linux baseado em Ubuntu siga as instruções encontradas em [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/) para o *Windows* siga as instruções em [https://docs.docker.com/docker-for-windows/install/](https://docs.docker.com/docker-for-windows/install/).

O *Docker Compose* pode ser instalado seguindo os passos em [https://docs.docker.com/compose/install/#install-compose](https://docs.docker.com/compose/install/#install-compose) e o *GIT* em [https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Instalação e inicialização do Kafka

Para facilitar será utilizado um arquivo *docker-compose* disponível no repositório GIT mantido pela Confluent em [https://github.com/confluentinc/kafka-images](https://github.com/confluentinc/kafka-images).

Primeiro passo é clonar o projeto:

```git
git clone https://github.com/confluentinc/kafka-images.git
```

Após copiar o projeto, deve-se ir até a pasta ./kafka-images/examples/kafka-single-node. Na pasta irá encontrar o seguinte arquivo docker-compose.yml:

```yaml
---
version: '2'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  kafka:
      image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - 9092:9092
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
```

Esse arquivo irá subir o Zookeper e o Kafka na máquina, para isso utilizamos o comando `docker-compose up -d`. Com isso os servidores serão executados em segundo plano, pode ser verificado com `docker-compose ps`:

```docker
               Name                           Command            State              Ports            
-----------------------------------------------------------------------------------------------------
kafka-producer-example_kafka_1       /etc/confluent/docker/run   Up      0.0.0.0:9092->9092/tcp      
kafka-producer-example_zookeeper_1   /etc/confluent/docker/run   Up      2181/tcp, 2888/tcp, 3888/tcp
```

É possível  checar se o Kafka inicializou corretamente através do comando `docker-compose logs kafka | grep -i started`, que irá mostrar uma listagem parecido com:

```docker
kafka_1      | [2020-09-16 17:09:48,718] INFO [SocketServer brokerId=1] Started 2 acceptor threads for data-plane (kafka.network.SocketServer)
kafka_1      | [2020-09-16 17:09:49,017] DEBUG [ReplicaStateMachine controllerId=1] Started replica state machine with initial state -> Map() (kafka.controller.ZkReplicaStateMachine)
kafka_1      | [2020-09-16 17:09:49,024] DEBUG [PartitionStateMachine controllerId=1] Started partition state machine with initial state -> Map() (kafka.controller.ZkPartitionStateMachine)
kafka_1      | [2020-09-16 17:09:49,111] INFO [SocketServer brokerId=1] Started data-plane processors for 2 acceptors (kafka.network.SocketServer)
kafka_1      | [2020-09-16 17:09:49,116] INFO [KafkaServer id=1] started (kafka.server.KafkaServer)
```

### Criando um tópico

Para criar um tópico deve-se executar o comando diretamente no container que está rodando o Kafka com o comando `docker-compose exec`. No exemplo a seguir é criado um tópico com o nome EXEMPLO_TOPICO:

```docker
docker-compose exec kafka kafka-topics --create --topic EXEMPLO_TOPICO --partitions 1 --replication-factor 1 --if-not-exists --zookeeper zookeeper:2181
```

Para confirmar que foi criado com sucesso, executamos o seguinte comando:

```shell
docker-compose exec kafka kafka-topics --describe --topic EXEMPLO_TOPICO --zookeeper zookeeper:2181

Topic: EXEMPLO_TOPICO   PartitionCount: 1       ReplicationFactor: 1    Configs: 
Topic: EXEMPLO_TOPICO   Partition: 0    Leader: 1       Replicas: 1     Isr: 1
```

### Produzindo uma mensagem com um Producer

Com o tópico criado, é possível enviar mensagens para ele através do comando `kafka-console-producer`, segue um exemplo para docker:

```docker
docker-compose exec kafka bash -c "seq 100 | kafka-console-producer --request-required-acks 1 --broker-list kafka:29092 --topic EXEMPLO_TOPICO && echo 'Produzido 100 mensagens.'"
```

Funcionando corretamente irá aparece algo como: `Produzido 100 mensagens.`

### Lendo as mensagens com um Consumer

Para ler as mensagens criadas utiliza-se o comando:

```docker
docker-compose exec kafka kafka-console-consumer --bootstrap-server kafka:29092 --topic EXEMPLO_TOPICO --from-beginning --max-messages 100
```

Irá aparecer todos os números gerados.

## Criando um produtor em Java

Antes de iniciar o código é preciso configurar a dependência `kafka-clients` no maven:

```xml
<dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>kafka-clients</artifactId>
    <version>2.6.0</version>
</dependency>
```

Para criar um *producer* utilizamos a classe `KafkaProducer` com o tipo da chave e da mensagem, para o exemplo o tipo da mensagem será String:

```java
var producer = new KafkaProducer<String,String>(properties());
```

O construtor da classe `KafkaProducer` recebe um objeto `Properties` o qual serão passados os parâmetros de configuração do produtor. A seguir o método que constrói o objeto de configuração:

```java
private static Properties properties() {
    var properties = new Properties();
    properties.setProperty(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka:29092");
    properties.setProperty(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
    properties.setProperty(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
    return properties;
}
```

No código apresentado é configurado o endereço do *broker* para conectar e logo na sequência é configurado o tipo de serialização da chave e valor, que será realizado pelo serializador `StringSerializer.class.getName()` que converte Strings para bytes.

Ainda é necessário configurar o envio e a mensagem, o que pode ser visto no código a seguir:

```java
 public static void main(String[] args) throws ExecutionException, InterruptedException {
    var producer = new KafkaProducer<String,String>(properties());
    var key = "TEMPERATURA";
    var value = "34º";
    var record = new ProducerRecord<String, String>("EXEMPLO_TOPICO", key, value);
    Callback callback = (data, ex) -> {
        if (ex != null) {
            ex.printStackTrace();
            return;
        }
        System.out.println("Mensagem enviada com sucesso para: " + data.topic() + " | partition " + data.partition() + "| offset " + data.offset() + "| tempo " + data.timestamp());
    };
    producer.send(record, callback).get();
}
```

No código apresentado foi configurado um objeto `ProduceRecord` que irá conter a mensagem e o nome do tópico para publicá-la. O método `send` do produtor é **assíncrono**, fazendo necessário a utilização de um objeto `Callback` para obter informações sobre a operação.

Utilizando um consumidor pelo terminal é possível obter o resultado do envio:

```shell
❯ docker-compose exec kafka kafka-console-consumer --bootstrap-server kafka:29092 --topic EXEMPLO_TOPICO --from-beginning --max-messages 100
34º
```

## Criando um consumidor em Java

Para criar o consumidor basicamente são os mesmos passos do produtor com poucas mudanças, a primeira é a classe utilizada para representar o consumidor que é a `KafkaConsumer`. A mesma também recebe um objeto *properties* de configuração e é preciso definir o tipo da chave e do valor, conforme foi observado na construção do produtor:

```java
var consumer = new KafkaConsumer<String, String>(properties());
```

A configuração muda pouco também:

```java
private static Properties properties() {
    var properties = new Properties();
    properties.setProperty(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
    properties.setProperty(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
    properties.setProperty(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
    properties.setProperty(ConsumerConfig.GROUP_ID_CONFIG, TemperatureControl.class.getName());
    return properties;
}
```

Agora como é preciso consumir a mensagem é necessário configurar o deserializador, que irá transformar a mensagem de bytes para o formato desejado. No exemplo é utilizado o `StringDeserializer` para converter a mensagem em String, para o consumidor sempre será necessário informar o ID do grupo o qual ele pertence, para isso deve-se configurar a propriedade `ConsumerConfig.GROUP_ID_CONFIG` e definir um nome.

Para ouvir a mensagem é necessário realizar a assinatura no tópico para obter os registros, segue o código que simula o consumo e processamento de uma mensagem:

```java
public static void main(String[] args) {
    var consumer = new KafkaConsumer<String, String>(properties());
    consumer.subscribe(Collections.singletonList("EXEMPLO_TOPICO"));

    while (true) {
        var records = consumer.poll(Duration.ofMillis(100));
        for (ConsumerRecord<String, String> registro : records) {
            System.out.println("------------------------------------------");
            System.out.println("Recebendo nova temperatura");
            System.out.println(registro.key());
            System.out.println(registro.value());

            final String valor = registro.value().replaceAll("º", "");
            final Integer temperatura = Integer.valueOf(valor);
            if (temperatura > 30) {
                System.out.println("Está calor");
            } else if (temperatura < 20) {
                System.out.println("Está frio");
            }

            System.out.println("Temperatura processada.");
        }
    }
} 
```

Ao deixar o consumidor executando e realizando mais um envio de mensagem com o produtor criado, o seguinte resultado é obtido:

```shell
------------------------------------------
Recebendo nova temperatura
TEMPERATURA
34º
Está calor
Temperatura processada.
```

## Conclusão

A ideia do artigo é fornecer uma base simples para entender os conceitos do Kafka. Espero que seja útil para evoluir os estudos dessa tecnologia para quem lê. Se você quiser acessar o código completo, ele está disponível no meu [github](https://github.com/ivanqueiroz/kafka-producer-example/tree/master).
