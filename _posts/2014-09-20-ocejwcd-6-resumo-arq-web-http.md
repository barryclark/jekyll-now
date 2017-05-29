---
layout: post
title: "[OCEJWCD 6] - Resumo da Arquitetura Web e o Protocolo HTTP"
permalink: "/2014/09/ocejwcd-6-resumo-da-arquitetura-web-e-o.html"
categories: [java, certificação, ocejwcd]
---

A arquitetura web é baseada no modelo cliente-servidor onde o cliente faz uma requisição (*request*) para obter uma resposta (*response*). Para esse processo é necessário que os dois lados da comunicação possuam uma forma padrão de comunicação, um protocolo, para se entenderem no ambiente heterogêneo que é a Internet.

O protocolo para a navegação de páginas é o **_Hypertext Transfer Protocol_** o famoso HTTP, que define um formato para as *requests* e *responses*, composto de um header (cabeçalho) e um body (corpo). O header possui metadados úteis sobre o pacote.

Utilizando a ferramenta de TCP/IP Monitor do Eclipse é possível visualizar as requests e responses:

**REQUEST**
```bash
GET /OCEJWCD/OlaMundo HTTP/1.1
Host: localhost:7000
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36
Accept-Encoding: gzip,deflate,sdch
Accept-Language: pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2
```

**RESPONSE**
```bash
HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Content-Length: 0
Date: Sun, 07 Sep 2014 15:21:34 GMT
```

Na primeira parte da certificação é necessário ter conhecimento de Servlets e os métodos do protocolo HTTP. No total são oito métodos:

* **GET** - utilizado para retornar um recurso do servidor é o método mais simples, pode enviar dados para o servidor em forma de parâmetros limitados a 255 caracteres - método doGet() da API de Servlets;

* **POST** - parecido com o GET é utilizado quando há uma grande quantidade de dados para ser enviado para o servidor não limitado ao tamanho de 255 caracteres - método doPost() da API de Servlets;

* **HEAD** - retorna o header de um recurso, é como o GET sem o corpo apenas com o cabeçalho - método doHead() da API de Servlets;

* **TRACE** - permite rastrear o que o servidor está recebendo, permitindo o diagnóstico de problemas - método doTrace() da API de Servlets;

* **OPTIONS** - solicita os métodos HTTP que podem ser respondidos pela URL - método doOptions() da API de Servlets;

* **PUT** - faz uma requisição para colocar os dados anexados no corpo da mensagem na URL requisitada - método doPut() da API de Servlets;

* **DELETE** - solicita a remoção de um recurso no servidor da URL - método doDelete() da API de Servlets;

* **CONNECT** - método HTTP para a criação de tunelamento - não existe um método correspondente na API de Servlets.

Na prática os mais utilizados são o GET e o POST.

## Códigos de status HTTP

O HTTP é bem completo e fornece códigos de status de como a requisição foi processada pelo servidor, esses códigos são formados por três dígitos e são usados pelo lado cliente para determinar o que irá ser feito em seguida. Os códigos são divididos em cinco classes:

   * Informativa (1xx) - São códigos provisórios que não indicam o fim da requisição e informam um status intermediário;

   * Sucesso (2xx) - Indica sucesso no processamento da requisição;

   * Redirecionamento (3xx) - O código de redirecionamento indica que o recurso solicitado na requisição foi movido para outro lugar;

   * Erro de cliente (4xx) - Significa que houve erro na requisição criada pelo cliente;

   * Erro de Servidor (5xx) - Houve erro por parte do servidor para responder a solicitação.

### Cookies
São pequenos arquivos textos que são salvos no cliente para manter (persistir) configurações entre as visitas no site.

Um abraço e até a próxima!
