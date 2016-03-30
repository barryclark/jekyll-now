---
layout: post
title: "Como escalonar o Laravel horizontalmente com Docker"
date: 2016-03-30 13:40:21
author: wendell
image: '/assets/img/'
description: 'Aprenda a escalonar uma aplicaço Laravel horizontalmente utilizando o Docker'
tags:
- php
- laravel
- docker
categories:
- Otimizando Workflow com Docker
twitter_text: 'Aprenda a escalonar uma aplicaço Laravel horizontalmente utilizando o Docker'
---

## Introdução

Pessoas importantes como **Jeffery Way, Matt Stauffer e claro Taylor Ottwell** trouxeram uma mudança de paradigma para muitos desenvolvedores **PHP**. Eles introduziram muitos dos princípios fundamentais, padrões de projeto e melhores práticas que outras comunidades como a de **Ruby** e **Java** têm desfrutado durante anos.  

O **Homestead** foi criado por Taylor para facilitar a criação de ambientes de desenvolvimento **PHP**, ele oferece aos desenvolvedores um ambiente consistente entre projetos e é totalmente compatível com o **"ecossistema" do Laravel**.  

## Então, o que é o Docker e por que eu deveria estar utilizando ele?

O **Docker** é basicamente uma infraestrutura programável, ou simplesmente: o **Docker** permite que você crie um ambiente para seu projeto através de um arquivo de configuração. Com o **Docker** você sempre estará ***executando o mesmo ambiente*** seja em produção, desenvolvimento ou teste. Como o seu ambiente é controlado por um arquivo, este é adicionado no controle de código-fonte (versionamento) dando às equipes a mesma consistência entre a base de código e até mesmo oferecendo diferenciação de versões de seu código.

## Por que isso é importante?

Você já trabalhou em um projeto e ouviu a frase: "na minha máquina funciona". Desenvolvedores vão sempre instalar dependências como **RabbitMQ, Redis, MySQL e ElasticSearch** como ferramentas de apoio em um projeto. Atualmente eles tem de notificar todos os desenvolvedores sobre cada dependência ou checar enormes orquestrações em **máquinas virtuais**. Isso pode ser um pesadelo, sem mencionar os conflitos entre versões de dependências e também entre diferentes versões do código-fonte. Complexidade extremamente elevada...

## Containers do Docker

O **Docker** separa cada processo executando em uma máquina **Linux** (seja física ou virtual) individualmente em `containers`. Por exemplo você pode ter `containers` executando: **PHP-FPM, MySQL, Redis**. Esses processos (leia `containers`) todos executam em um ambiente totalmente isolado, não sofrendo conflito algum. Pense nos `containers` como o `name-spacing` do **Linux**, assim como os `name-spaces` do **PHP**, os `containers` do Docker são isolados e totalmente livres de conflitos!  

Os `containers` são independentes de um `host` já que eles podem estar rodando no mesma máquina, em máquinas diferentes ou até mesmo em **provedores de serviços em nuvem completamente diferentes**. Isso permite um escalonamento horizontal extremamente poderoso e também proteção contra falhas em mecanismos, infraestrutura, etc. Mas iremos falar mais sobre isso depois...

## Então vamos ao que interessa, mostrando alguns exemplos!

Irei demonstrar o poder do ecossistema do **Docker** através de uma outra ferramenta chamada **Docker Compose**: uma ferramente de orquestração de `containers` desenvolvida em cima do **Docker**. Essa ferramenta nos permite iniciar diversos `containers` do **Docker** ao mesmo tempo a partir de um único arquivo de configuração, ao invés de iniciar cada `container` individualmente.  

Primeiro instale o **[Docker toolbox](https://www.docker.com/products/docker-toolbox)**.  

Agora clone uma instalação limpa do **Laravel**:  

{% highlight shell %}
git clone https://github.com/laravel/laravel.git

cd laravel

composer install --prefer-dist
{% endhighlight %}

Depois do **Laravel** ter sido clonado e suas dependências terem sido instaladas abra seu editor e crie um arquivo chamado `docker-compose.yml` na raiz do seu projeto com o seguinte conteúdo:  

{% highlight javascript %}
load_balancer:
    image: tutum/haproxy
    links:
        - web
    ports:
        - "80:80"

cache:
    image: redis

database:
    image: mysql
    environment:
        - MYSQL_ROOT_PASSWORD=SuperSecretPassword123
        - MYSQL_DATABASE=laravel

web:
    image: andrewmclagan/nginx-hhvm
    links:
        - database
        - cache
    volumes:
        - ./:/var/www
    environment:
        - APP_ENV=production
        - DB_DATABASE=laravel
        - DB_PASSWORD=SuperSecretPassword123
        - VIRTUAL_HOST=laravel.local
{% endhighlight %}

Nós também precisamos inciar um `host` com o **Docker Machine** para nossos `containers` (apenas caso esteja usando OSX ou Windows, pois eles ainda não suportam `containers` **Linux**). Com o **Docker**, interagir com essa **VM** não é diferente de interagir com um servidor em um provedor como **Digital Ocean** ou **AWS**. O **Docker** possui drivers para os maiores provedores de serviços em nuvem, nós iremos utilizar o driver do **VirtualBox** para inciar uma máquina local.  

{% highlight shell %}
docker-machine create laravel-app-host --driver virtualbox
{% endhighlight %}

Não esqueça de editar seu arquivo `hosts` para refletir o `host` que criamos acima: `laravel.local`, sua **docker-machine** poderá ter um número de IP diferente:  

{% highlight shell %}
/etc/hosts file

192.168.99.100 laravel.local # the IP of your docker-machine
{% endhighlight %}  

Para iniciar nossa aplicação **Laravel** basta simplesmente rodar o seguinte comando na raiz do projeto:  

{% highlight shell %}
docker-compose up
{% endhighlight %}

O **Docker** irá fazer o download de todas as camadas para cada um de nossos serviços, **load_balancer, cache, banco de dados e PHP HHVM**. Então irá iniciar um `container` para cada um desses serviços.  

Inicialmente irá demorar um tempo até fazer o download de todas as camadas para cada `container`, embora isso seja muito mais rápido do que provisionar uma **VM do Homestead**. Assim que sua `docker machine` tiver guardado uma imagem você poderá iniciar quantos `containers` você quiser dela...e será extremamente rápido!  

Assim que iniciar, vá para: [http://laravel.local](http://laravel.local) para ver sua aplicação **Laravel** executando. Para parar os `containers` que estão em execução basta apertar (command+c, ctrl+c) para sair dos processos. Você também pode digitar o seguinte comando para parar a execução	de qualquer container que esteja iniciado:  

{% highlight shell %}
docker-compose stop
{% endhighlight %}

## Laravel escalonado horizontalmente de um jeito fácil!

Digamos que você tenha um site que tenha um alto tráfego ou que está rodando uma aplicação crítica que requer um `uptime` de 99.99%. Você irá precisar escalonar sua aplicação **Laravel** através de vários servidores, rodando múltiplas instâncias da aplicação para conseguir lidar com a carga de dados e falhas. Rodando por trás de um balanceador de carga como o **HAProxy** ou **Nginx**.  

Como você gerencia isso em um ambiente de desenvolvimento? Você poderia desenvolver sua aplicação em apenas uma instância, mas dessa forma você nunca irá saber como ela irá se comportar quando tiver sido escalonada. Você também poderia executar diversas máquinas virtuais, apesar de que isso é um pesadelo absoluto, enfrentando todos os problemas descritos anteriormente, porém dez vezes pior.  

Com o **Docker** é uma tarefa realmente simples... com todos os `containers` parados, vamos escalonar nosso servidor web:  

{% highlight shell %}
docker-compose scale web=3

docker-compose up
{% endhighlight %}

Veja qual fácil foi iniciar:  

- 3 servidores PHP HHVM
- 1 banco de dados MySQL
- 1 cache Redis
- 1 balanceador de carga HAProxy

No momento não conseguimos ver qual o `container` web está respondendo as nossas requisições por detrás do balanceador de carga, vamos arrumar isso. Em seu editor abra o arquivo: `resources/views/welcome.blade.php` e adicione o seguinte código:  

{% highlight html %}
<div class="content">
 <div class="title">Laravel 5</div>
 <h3>{{ gethostname() }}</h3> <!-- cole essa linha -->
</div>
{% endhighlight %}

Salve o arquivo e entre em [http://laravel.local](http://laravel.local) e você agora irá ver o nome do `host` do `container` que respondeu nossa requisição. Continue atualizando a página e veja o nome do `host` alterar. Agora você tem uma aplicação **Laravel** horizontalmente escalonada, distribuída e livre de erros!  

Para testar nós podemos utilizar o **Docker** para parar um dos `containers` da seguinte maneira:  

{% highlight shell %}
docker ps
{% endhighlight %}

Encontre um `container` web e pare ele pelo seu `id` ou `nome`:  

{% highlight shell %}
docker stop laravel_web_2
{% endhighlight %}

Atualizando agora o [http://laravel.local](http://laravel.local) você irá ver que um de nossos `containers` está parado e a aplicação ainda está funcionando normalmente!

## Conclusão

Você pode utilizar uma imagem alternativa do PHP, para esse exemplo eu estou usando uma imagem criada aqui na [http://www.ethicaljobs.com.au/](http://www.ethicaljobs.com.au/). Ela é baseada na **HHVM** e **Nginx** e tem um tempo de resposta incrível comparado ao **PHP-FPM**. Também é otimizado para produção. Veja aqui: [https://github.com/andrewmclagan/nginx-hhvm-docker](https://github.com/andrewmclagan/nginx-hhvm-docker).  

Agora você poderá correr livremente jovem desenvolvedor, sem os problemas com Máquinas Virtuais!  

Bem vindo ao incrível mundo que é o **DOCKER!!!**  

Artigo traduzido e adaptado de: [https://medium.com/@andrewmclagan/you-thought-laravel-homestead-was-easy-say-hello-to-docker-2c0639a0501#.u60erqde5](https://medium.com/@andrewmclagan/you-thought-laravel-homestead-was-easy-say-hello-to-docker-2c0639a0501#.u60erqde5)
