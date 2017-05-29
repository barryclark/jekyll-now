---
title: "Aprendendo GO/GOLANG"
permalink: "/2015/04/aprendendo-gogolang.html"
categories: [go, golang, programação]
---

Quando ouvi falar da linguagem Go em 2009 achei muito interssante, a sintaxe proposta para a utilização de concorrência através de _goroutines_, de _duck typing_ e _garbage colector_, mas na época eu não fiquei interessado o suficiente para querer aprender a linguagem.

Alguns anos se passaram desde então e eu senti a necessidade de aprender uma nova linguagem (principalmente após ler o livro O Progamador Apaixonado) e decidi pelo Go por ser bem diferente de Java (pra me tirar da zona de conforto) e por ser compilado.

###Por onde começar?
Uma leve pesquisada no [site oficial](https://golang.org/) e todas as instruções para instalar e configurar podem ser encontradas nesse [link](https://golang.org/doc/install), apenas chamo atenção para a importância da configuração das varáveis de ambiente ```GO_PATH``` e ```GO_ROOT``` que ficam sem muito destaque.

No site oficial também tem um ótimo tutorial em várias línguas, dentre elas o [português](http://go-tour-br.appspot.com/welcome/1), que apresenta a sintaxe básica e de forma interativa através do [Go Playground](https://play.golang.org/p/3VsQMI4Rx5), uma ferramenta on-line bem simples e eficiente para execução de código Go.

###Ferramentas do SDK
O sdk do Go vem com algumas ferramentas interessantes que demonstram a preocupação dos criadores quanto a manutenção do código e do gerenciamento de dependências, dentre elas as que achei mais importantes são:

* **go fmt** - formata o código de acordo com o guia de estilo do Go;
* **go fix** - reescreve o código substituido chamadas obsoletas por novas;
* **go vet** - reporta erros em construções suspeitas da linguagem.

Existem muitas outras ferramentas na SDK a função e a sintaxe delas pode ser encontrada na [documentação on-line](https://golang.org/cmd/go/).

###IDE
Existem algumas IDE's e plugins que auxiliam muito o desenvolvimento, mas decidi usar o editor de texto Atom para o aprendizado, que já vem com reconhecimento da sintaxe do Go. Indico utilizar o plugin go-plus com o Atom.

###Indo além do tutorial

Decidi obter o livro Programando em Go de [Caio Filipini](http://www.casadocodigo.com.br/products/livro-google-go) publicado pela Casa do Código por ser para iniciantes na linguagem e o único em português. Além disso existem livros on-line grátis em inglês que vão além do básico que vale muito a pena indicar:

* [An Introduction to Programming in Go](http://www.golang-book.com/) - apresenta uma introdução mais completa da linguagem;
* [Build Web Application with Golang](https://docs.google.com/file/d/0B2GBHFyTK2N8TzM4dEtIWjBJdEk/) - mostra como desenvolver aplicações web com a linguagem;
* [Building Web Apps with Go](http://codegangsta.gitbooks.io/building-web-apps-with-go/content/) - mostra alguns frameworks em Go para auxiliar o desenvolvimento web;
* [Network programming with Go](http://jan.newmarch.name/go/) - os poderes da programação em rede do Go são mostrados nesse livro;
* [Practical Cryptography With Go](https://leanpub.com/gocrypto/read) - criptografia em Go.

###Aplicação de aprendizado
Para aprender vou começar com um programa simples, uma biblioteca para utilizar a [API Web do Steam](https://developer.valvesoftware.com/wiki/Steam_Web_API), que pretendo utilizar no futuro para uma ideia de aplicativo. Vou disponibilizar o código no GitHub em [https://github.com/ivanqueiroz/steam4go](https://github.com/ivanqueiroz/steam4go) e tentando trazer sempre dicas que eu aprenda no processo aqui para meu blog.

Um abraço e até a próxima!
