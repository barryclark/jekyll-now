---
layout: post
title: "[OCEJWCD 6] - Criando um Servlet Simples"
permalink: "/2015/09/ocejwcd-6-criando-servlet-simples.html"
categories: [java, certificação, ocejwcd]
---

No [último post]({% post_url 2015-09-06-ocejwcd-6-estrutura-arquivos-diretorios-web %}) fiquei devendo uma explicação de como criar um Servlet, é bem simples basta só seguir alguns passos:

1. criar e compilar o servlet no ambiente de desenvolvimento;
2. copiar o arquivo compilado para o ambiente de implantação;
3. criar o web.xml (*deployement descriptor*) nos dois ambientes;
4. reiniciar o tomcat e testar o servlet.

Como o objetivo é entender o funcionamento, irei fazer os exemplos apenas com um editor de texto e a linha de comando (abandonando o eclipse), mas lembro que em um ambiente utilizando IDE muito desses passos são automáticos.

## OiMundoServlet.java

```java

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class OiMundoServlet extends HttpServlet {
    protected void doGet (HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();

        out.println("<html>");
        out.println("<body>");
        out.println("<h3>Primeira servlet</h3>");
        out.println("</body>");
        out.println("</html>");
    }
}

```

Basicamente o servlet OiMundoServlet utiliza um Writer, obtido do objeto de response, para imprimir no browser a mensagem "Primeira servlet". Salve o OiMundoServlet.java na pasta <unidade>/ocejwcd/OlaMundo/src entre no diretório e execute o comando:

```bash
javac -d ../classes OiMundoServlet.java -cp <caminho para seu servidor tomcat>/lib/servlet-api.jar
```

O comando irá colocar seu arquivo de classe compilada (.class) no diretório <unidade>/ocejwcd/OlaMundo/classes. Copie o arquivo .class criado para o ambiente de deployement em <caminho para seu servidor tomcat>/webapps/OlaMundo/WEB-INF/classes e crie o arquivo de deployement descriptor (web.xml) no mesmo lugar.

```xml

<?xml version="1.0" encoding="ISO-8859-1" ?>

<web-app xmlns="http://java.sun.com/xml/ns/j2ee"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"     
xsi:schemaLocation= "http://java.sun.com/xml/ns/j2ee     
http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd"
version="2.4">

<servlet>
<servlet-name>OiMundo</servlet-name>
<servlet-class>OiMundoServlet</servlet-class>
</servlet>
<servlet-mapping>
<servlet-name>OiMundo</servlet-name>
<url-pattern>/oimundo</url-pattern>
</servlet-mapping>

</web-app>

```

Execute o Tomcat e escreva o endereço http://localhost:8080/OlaMundo/oimundo e "Primeira servlet" deve aparecer em seu browser.

Então é isso! Nesse post aprendemos como criar um servlet no ambitende de implantação, compilando-o e executando-o.

Um abraço e até a próxima!
