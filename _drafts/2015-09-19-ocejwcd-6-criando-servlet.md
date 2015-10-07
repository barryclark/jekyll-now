---
layout: post
title: "[OCEJWCD 6] - Criando um Servlet Simples"
permalink: "/2015/09/ocejwcd-6-criando-servlet-simples.html"
categories: [java, certificação, ocejwcd]
---

No [último post]({% post_url 2015-09-06-ocejwcd-6-estrutura-arquivos-diretorios-web %}) fiquei devendo uma explicação de como criar um Servlet, para isso é só seguir alguns passos:

1. criar e compilar o servlet no ambiente de desenvolvimento;
2. copiar o arquivo compilado para o ambiente de implantação;
3. criar o web.xml (*deployement descriptor*) nos dois ambientes;
4. reiniciar o tomcat e testar o servlet.

## O código do servlet

O código do servlet

{% include image.html url="/images/20150906/MVC.png" description="Tríade MVC" %}

Com os conceitos do MVC em mente, podemos avançar para a estrutura de arquivos e diretórios das aplicação Web servlet, onde podemos afirmar que há dois ambientes, o de desenvolvimento e o de deployement (implantação). Para melhor entendimento, sugiro criar os dois ambientes.

Para o ambiente de desenvolvimento a seguinte estrutura foi criada:

{% include image.html url="/images/20150906/ambiente_desenvolvimento.png" description="Estrutura de arquivos do ambiente de desenvolvimento" %}

* a pasta OlaMundo é a pasta principal da aplicação;
* a pasta etc contém o arquivo web.xml também conhecido como deployement descriptor;
* as bibliotecas da aplicação ficam na pasta lib;
* os códigos fontes da aplicação ficam na pasta src;
* arquivos compilados (.class) ficam na pasta classes;
* os arquivos HTML e jsp's são colocados na pasta web.

Já o ambiente de implantação fica da seguinte maneira:

{% include image.html url="/images/20150906/ambiente_deployement.png" description="Estrutura de arquivos do ambiente de implantação" %}

A imagem é autoexplicativa e mostra como é a estutura de pastas e arquivos dentro do servidor web (no caso o tomcat), nosso ambiente de implantação está pronto mas há alguns pontos relevantes a citar:

* o arquivo web.xml sempre deve ficar na pasta WEB-INF;
* o contúdo da pasta WEB-INF não fica disponível para os clientes da aplicação.

Concluíndo o post, discutimos aqui brevemente o MVC e como configurar o ambiente de desenvolvimento e implantação, o que nos permite começar a trabalhar com pequenas aplicações web.

No próximo post sobre o ocejwcd irei mostrar como criar um servlet no ambiente de desenvolvimento e como testá-lo no ambiente de implantação.

Um abraço e até a próxima!
