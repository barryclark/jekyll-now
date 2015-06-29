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
```shell
GET /OCEJWCD/OlaMundo HTTP/1.1
Host: localhost:7000
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36
Accept-Encoding: gzip,deflate,sdch
Accept-Language: pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2
```
