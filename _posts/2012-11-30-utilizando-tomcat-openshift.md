---
layout: post
title: "Utilizando Tomcat 6 nas nuvens com o OpenShift"
permalink: "/2012/11/utilizando-tomcat-openshift.html"
categories: [java, dicas, tomcat, openshift]
---

Recentemente tive a vontade de colocar meu currículo on-line disponível em meu domínio principal (www.ivanqueiroz.com) e para isso tive a idéia de utilizar a plataforma Openshift da Red Hat. Para quem não conhece trata-se de uma plataforma como serviço (PaaS) de computação em nuvem, que possui suporte a várias plataformas (Java, Node.js, PHP, Python, Perl e Ruby) fornecendo a infra-estrutura  para o desenvolvimento, teste, construção e execução de aplicativos. A solução possui planos gratuitos (a utilizada nesse artigo) e pagos, para quem quer um suporte mais robusto.

Não é meu objetivo fazer um artigo com muitos detalhes da plataforma (até porque o site do projeto é muito rico em detalhes), e sim um artigo em que eu possa compartilhar as informações que não encontrei facilmente nas documentações do projeto.

{% include image.html url="/images/20121130/opass.png" description="Overview of Pass" %}

## Iniciando

O OpenShift fornece duas maneiras de manipular a configuração do ambiente, através de interface Web e via linha de comando. Aconselho utilizar o gerenciamento por linha de comando, pois é simples e completa e a parte de deploy não está disponível via browser (no caso da opção gratuita). A instalação do client de gerenciamento e a configuração inicial está muito bem detalhada para todos os principais sistemas operacionais neste [link](https://openshift.redhat.com/community/get-started), e é necessário criar uma conta no site para ter acesso a plataforma.

## Tomcat 6 Cartridge

A plataforma da Red Hat permite que na criação da infra-estrutura seja possível escolher a configuração do ambiente adicionando os chamados cartridges (cartuchos), que ao meu ver nada mais são do que módulos que adicionam funções ao ambiente montado.
Um desses módulos é um servidor Tomcat 6, e para criar uma aplicação com utilizando-o é só digitar o seguinte comando:

```$ rhc app create jbossews-1.0```

Após executar o comando, será criado uma pasta com o nome escolhido para aplicação, gerenciado pelo GIT e com um projeto Web de exemplo com uma estrutura padrão. Se quiser utilizar a estrutura padrão é só criar os arquivos JSP e classes Java dentro dessa estrutura, mas se quiser efetuar um deploy de um arquivo WAR siga os seguintes passos:

1. Exclua o arquivo **pom.xml** e o diretório **src**;
1. gere o WAR em sua IDE de preferência e renomeio-o para **ROOT.war** (para que a chamada ao endereço raiz de sua aplicação seja direcionada para a aplicação);
1. coloque o WAR na pasta webapps;
1. execute: **`$ git add -A;`**
1. em seguida: **`$ git commit -m ""`;**
1. e finalize com um push para o servidor: **`$ git push`**.

Pronto, após esses passos acesse no browser sua aplicação: **<http://nomedesuaaplicacao.rhcloud.com>**

Se quiser pode alterar o endereço da aplicação para responder a um nome de domínio contratado. Pressupondo que já tenha configurado no seu provedor de DNS o redirecionamento do novo endereço para o endereço padrão, execute o seguinte comando: **`$ rhc app add-alias -a --alias`**.

Agora sua aplicação está no ar em um servidor Tomcat 6 nas nuvens e respondendo através de um endereço próprio.

Abraços e até a próxima!
