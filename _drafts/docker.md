---
layout: post
title: "Primeiros passos com Docker"
date: 2016-11-17 23:54:21 
author: edson 
image: '/assets/img/' 
description: 'Iniciando com Docker' 
tags: # DÊ PREFERÊNCIA PARA TAGS QUE JÁ EXISTAM
- teste
categories: # DÊ PREFERÊNCIA PARA CATEGORIAS QUE JÁ EXISTAM E USE APENAS UMA - EXCETO CASOS RAROS
- teste
twitter_text: 'Minha primeira configuração na codeshare'
---

## Introdução

Docker está aqui para lhe oferecer uma maneira eficiente e rápida de transportar aplicativos em sistemas e máquinas, e leve e permite que você tenha rapidamente aplicativos executando em seu próprio ambiente. Então vamos estudar um pouco sobre Docker e ver como começar a usar essa ferramenta. 

Neste primeiro post nós vamos abordar a instalação do docker no ubuntu, mas caso vocês usem Windows ou mac vocês poderam 
usar o [Docker for Windows](http://www.docker.com/products/docker#/windows) ou 
[Docker for Mac](https://www.docker.com/products/docker#/mac), nestes dois casos eles faram download do instalador, e com isso vocês teram o docker instalado na versão mais atual.

O primeiro passo para instalar o docker no ubuntu e conferir se você tem o `curl` instalado.
```
which curl
```
Caso não esteja instalado você pode instalar com o seguinte comando.
```
apt-get install curl
```

Com o `curl` instalado vamos instalar o docker.
```
curl -sSL https://get.docker.com/ | sh
```
Este comando vai identificar automaticamente qual e a sua distribuição do linux e vai instalar a ultima versão do docker.
Para conferir se o docker esta instalado e so digitar:
```
docker
```
Com isso você verá uma lista de comandos que podem ser utilizados. Agora vamos conferir se o serviço do docker esta rodando, 
para isso basta digitar:
```
service docker status
```
Caso a mensagem retornada seja, `Docker is not running` devemos iniciar o serviço com o comando:
```
service docker start
```
Beleza, agora que temos o docker instalado e rodando podemos começar a trabalhar. Para utilizar o Docker precisamos conhecer alguns comandos básicos, abaixo eu vou listar alguns comandos que são necessário para começar a utilizar o Docker.

```
docker search ubuntu
```
Utilize este comando para procurar uma imagem.
> Com o comando acima o docker vai listar todas as imagens ubuntu que estão no `Docker Hub`.


```
docker pull ubuntu
```
Utilize este comando para baixar uma imagem.
 
```
docker images
```
Utilize este comando para listar todas as imagens que foram baixadas
> Após ter baixado a imagem com `docker pull` podemos executar o comando `docker images` para ver a imagem baixada.

```
docker rmi images
```
Utilize este comando para remover uma imagem que não esta mais sendo usada.

```
docker run ubuntu
```
Com este comando vamos criar nosso container baseado na imagem que foi baixada anteriormente. Abaixo segue algumas das variações do comando 
`docker run`:

* **docker run -i -t ubuntu /bin/bash:** Cria um container e acessa esse container em modo iterativo no bash-
* **docker run -it ubuntu /bin/bash:** Tem o mesmo resultado do comando acima, é somente uma forma simplificada com `-it`
* **docker run --name myFirstContainer --rm -i -t ubuntu bash:** cria um container com nome `myFirstContainer`, a flag `--rm` indica que o container deve ser removido ao sairmos da sessão.
* **docker run --name myFirstContainer ubuntu:** Cria um container com o nome de `myFirstContainer`.

```
docker ps -a
```
Comando para listar todos os container que foi criado.

```
docker ps
```
Assim como `docker ps -a` este comando lista apenas os containers que estão ativos.

```
docker start id_do_container/nome_container
```
Agora que já temos um container criado vamos inicializa-lo, para isso precisamos passar o `id` ou `nome` do container, para saber essas informações precisamos usar o comando `sudo docker ps -a` listado anteriormente.

```
docker exec 
```

Este comando possibilita executar qualquer comando sem que seja preciso estar no console do container. No exemplo abaixo vamos criar a pasta `myDocker` dentro do nosso container.
```
docker exec id_container ou nome_container mkdir /tmp/myDocker
```

> O docker exec executará apenas se o container estiver `running`.



```
docker stop id_do_container/nome_container
``` 
O `docker stop` ele desativa(deliga) um container que esta ativo(ligado), ele também espera receber o id` ou `nome` do container` que será parado(desligado), para saber essas informações precisamos usar o comando `docker ps`.

```                       |
docker rm id_do_container ou nome_do_container
```
Utilize o comando acima para remover um container passando para ele o `ID` ou `nome` que você pode pegar com o comando `docker ps`.


Estes são apenas alguns comandos, acredito ser os mais utilizados, vale lembrar também que o docker tem muitos outros comandos acessem a documentação [Use the Docker Engine command-line](https://docs.docker.com/engine/reference/commandline/cli/) para maiores informações.

Por hoje e isso pessoal, em breve estaremos estudando mais. Esse é o primeiro post sobre Docker, nos próximos artigos vamos ver como criar uma imagem e enviar ela para o Docker Hub, como usar Dockerfile e para finalizar vamos ver um pouco sobre Docker compose.







