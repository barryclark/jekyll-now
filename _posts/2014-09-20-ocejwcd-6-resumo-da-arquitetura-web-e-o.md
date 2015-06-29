---
layout: post
title: "[OCEJWCD 6] - Resumo da arquitetura web e o protocolo HTTP"
categories: [java, certificação, ocejwcd]
---

## Arquitetura

A arquitetura web é baseada no modelo cliente-servidor onde o cliente faz uma requisição (*request*) para obter uma resposta (*response*). Para esse processo é necessário que os dois lados da comunicação possuam uma forma padrão de comunicação, um protocolo, para se entenderem no ambiente heterogêneo que é a Internet.

O protocolo para a navegação de páginas é o **_Hypertext Transfer Protocol_** o famoso HTTP, que define um formato para as *requests* e *responses*, composto de um header (cabeçalho) e um body (corpo). O header possui metadados úteis sobre o pacote.

Utilizando a ferramenta de TCP/IP Monitor do Eclipse é possível visualizar as requests e responses:

**REQUEST**
{% highlight bash %}
GET /OCEJWCD/OlaMundo HTTP/1.1
Host: localhost:7000
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36
Accept-Encoding: gzip,deflate,sdch
Accept-Language: pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2
{% endhighlight %}

**RESPONSE**
{% highlight bash %}
HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Content-Length: 0
Date: Sun, 07 Sep 2014 15:21:34 GMT
{% endhighlight %}

Na primeira parte da certificação é necessário ter conhecimento de Servlets e os métodos do protocolo HTTP. No total são oito métodos:

* **GET** - utilizado para retornar um recurso do servidor é o método mais simples, pode enviar dados para o servidor em forma de parâmetros limitados a 255 caracteres - método doGet() da API de Servlets;
