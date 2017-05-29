---
title: "[OCEJWCD 6] - Respondendo o cliente"
permalink: "/2015/04/ocejwcd-6-respondendo-o-cliente.html"
categories: [java, certificação, ocejwcd]
---

Antes de escrever sobre a comunicação com o cliente HTTP, vou colocar aqui alguns benefícios da tecnologia Servlet do Java:

* Os servlets são independentes de plataforma, pois são integrados na tecnologia java;
* são mais leves que os processos CGI (Common Gateway Inteface), já que cada requisição não gera um novo processo no servidor;
* oferecem segurança, escalabilidade e robustez;
* são integrados com toda a API J2EE tirando proveito de todos os serviços disponíveis como JNDI, JTA, JAAS e RMI.

## API de Servlets

A interface **javax.servlet.http.HttpServletRequest** representa a requisição feita pelo cliente para o servidor e é subinterface da **javax.servlets.ServletRequest**, ambas definem vários métodos importantes, dentre eles:

####ServletRequest
* getParameter();
* getContentLength();
* getRequestDispatcher();
* getServletContext();
* getAttribute();
* e mais...

####HttpServletRequest
* getHeader();
* getHeaderNames();
* e mais...

###Método getParameter
Obtém o valor do parâmetro passado pelo formulário na requisição, recebe uma String que representa o nome do parâmetro e retorna uma String com o valor do parâmetro. Ex:

```java
String var = req.getParameter("parametro");
```

###Método getHeader e getIntHeader
O ```getHeader(String value)``` obtém informação do cabeçalho (header) da requisição, recebe uma String com o nome do cabeçalho desejado e retorna uma String com o valor do mesmo.

```java
String head = req.getHeader("nome");
```

Já o método ```getIntHeader(String value)``` retorna o valor do cabeçalho escolhido como um int ou -1 caso não seja possível retornar valor.

```java
int i = req.getIntHeader("value");
```

###Método getInputStream
Retorna um **ServletInputStream** que permite obter o corpo (body) da requisição como dados binários (stream).

```java
InputStream is = req.getInputStream();
```

Esse método está definido na interface ServletRequest.

A interface **javax.servlet.http.HttpServletResponse** representa a resposta do servidor para a solicitação, sendo subinterface da **javax.servlets.ServletResponse**, definindo os seguintes métodos importantes:

####ServletResponse
* setContentType();
* setContentLength(int Len);
* getOutputStream();
* getWriter();
* e mais...

####HttpServletResponse

* addCookie();
* addHeader();
* encodeRedirect(URL)
* setHeader()
* e mais...

###Método setContentType
Configura o tipo do conteúdo respondido para o cliente, seja um texto, imagem ou arquivo. No exemplo seguinte é configurada uma resposta html na codificação UTF-8:

```java
res.setContentType("text/html; charset=UTF-8");
```

###Método setHeader
Configura um determinado cabeçalho com um valor passado, caso o cabeçalho já exista o valor é sobrescrito. Segue exemplo:

```java
res.setHeader("Content-Language", "es");
```

###Método addHeader
Adiciona um cabeçalho com o valor informado na resposta, permitindo que a mesma tenha um ou mais cabeçalhos.

```java
response.addHeader("Content-Disposition","inline");
```

###Método sendRedirect
Esse método envia uma resposta de redirecionamento para o cliente utilizando  a url informada, ele aceita caminhos relativos a raiz da aplicação, caso a url tenha um "/", ou absolutos.
Só deve ser chamado antes da resposta não ter sido efetivada, caso contrário será lançada uma ```IllegalStateException```. No exemplo seguinte uma forma de direcionar uma consulta para o Google utilizando o sendRedirect:

```java
String name=request.getParameter("name");
response.sendRedirect("https://www.google.co.in/#q="+name);
```

###RequestDispatcher
O RequestDispatcher redireciona a requisição para outro elemento dentro do servidor (um servlet, jsp etc). Exemplo:

```java
RequestDispatcher requestDispatcher = request.getRequestDispatcher("/endereco.jsp");
```

Por ser realizado no lado do servidor o cliente não sabe que ocorreu o redirecionamento e a url no browser não muda.

###Cookie
Cookies são pequenos pedaços de informação enviados pelo servlet para o browser segundo a documentação da API. Para criar um cookie basta instanciar um objeto do mesmo passando o nome e valor.

```java
Cookie cookie = new Cookie("usuario","1234");
```

Com o objeto cookie criado adicioná-lo a resposta através do método addCookie.

```java
res.addCookie(cookie);
```

Sem mistérios e bem simples a utilização dos Cookies pela API.

Por enquanto é só, próximo post será sobre o ciclo de vida dos servlets.
