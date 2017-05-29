---
layout: post
title: "[OCEJWCD 6] - Ciclo de Vida do Servlet"
permalink: "/2015/04/ocejwcd-6-ciclo-de-vida-do-servlet.html"
categories: [java, certificação, ocejwcd]
---

O ciclo de vida do servlet passa através dos seguintes estágios:

* carregamento da classe servlet;
* instanciação da classe servlet;
* inicialização;
* serviço;
* destruição.

Lembrando que um servlet não tem um método main() e é controlado pelo container. Segue uma figura representativa do ciclo:

{% include image.html url="/images/20150429/servlet_lc.png" description="Ciclo de Vida do Servlet" %}

##Interação cliente-servidor

O que acontece quando uma __request__ vem do browser? Vejamos esse código html:
```html
<form action="HelloServlet" method="POST">
```

Quando clicamos no botão de submit do form em questão o browser envia a solicitação para o container e o mesmo identifica que a solicitação é para um servlet e cria dois objetos, um do tipo **HttpServletRequest** e um **HttpServletResponse**. Em seguida encontra o servlet correto para a solicitação e cria uma thread para ele, no passo seguinte envia os dois objetos e chama o método service(), que repassa os objetos para o método apropriado em função do tipo de solicitação (POST nesse caso). A resposta correta é criada e entregue ao objeto response que por sua vez é retornado para o cliente.

A figura seguinte representa o fluxo citado:

{% include image.html url="/images/20150429/client_server.png" description="Fluxo cliente-servidor" %}

##Repassando o tratamento de Request / Response

Relembrando:

1. O servlet recebe uma request do container;
2. o container cria um objeto do tipo HttpServletResponse e um HttpServletRequest baseado em encontrar o servlet correto;
3. o container cria uma thread separada para cada requisição ao servlet;
4. o container que entrega o objeto de requisição e resposta para a thread do servlet;
5. o container chama o método service() do servlet;
6. o método service() por sua vez, chama o método POST ou GET apropriado que foi definido na página HTML ou JSP.
7. a resposta é gerada, e por sua vez e é retornada para o cliente;
8. os objetos de resposta e de requisição são apagados pelo container.

##Repassando o Ciclo de Vida do Servlet

{% include image.html url="/images/20150429/ciclo_vida_detalhado.png" description="O Ciclo de Vida do Servlet em Detalhes" %}

Antes da classe do servlet ser criada, ela é carregada pelo container, e então é instanciada. Após a instanciação do servlet ele é iniciado através do método `init()`, é importante frisar que o servlet é inicializado apenas uma vez e que o método `init()` pode ser sobrescrito, após a inicialização o container chama o método `service()` (onde a maior parte do tempo do servlet é utilizada).
O método `service()` não deve ser sobrescrito, para evitar comportamentos errados no servlet, a implementação padrão cria uma thread para a solicitação e identifica qual método deve ser chamado, `doGet()` ou `doPost()`, os quais devem ser sobrescritos para implementar o comportamento desejado. Após criação da resposta o conteiner chama o método `destroy()` e o servlet é finalizado, esse método é chamado apenas uma vez no ciclo de vida.

A interface Servlet possui cinco métodos dos quais três fazem parte do ciclo de vida (init, service e destroy) e os outros dois (`getServletConfig()` e `getServletInfo()`) que retornam um objeto do tipo `ServletConfig` e uma `String` com informações sobre o servlet (como versão, autor etc) respectivamente. Os parâmetros são passados pelo deployement descriptor e preenchido no objeto `ServletConfig` passado para o método `init()`. Só há um objeto `ServletConfig` por servlet e um `ServletContext` por aplicação web.

Em um post futuro irei detalhar melhor o ServletContext, até a próxima!
