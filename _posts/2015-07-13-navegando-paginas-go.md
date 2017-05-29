---
layout: post
title: "Navegando na Web com o Go/Golang"
categories: [go, golang, programação]
---

Após muito tempo trago mais um post sobre Go, confesso que a demora foi devido a o meu interesse atual pelo [Dukescript](https://dukescript.com/), que me fez deixar de lado um pouco os estudos do Go. Mas decidi retomar aos poucos os estudos da linguagem revendo meu pequeno projeto de manipulação da [API web do Steam](https://developer.valvesoftware.com/wiki/Steam_Web_API).

## HTTP em Go/Golang

Para usar a api do Steam precisei manipular chamadas HTTP e logo descobri que pode ser feito facilmente com a utilização do pacote ```net/http``` e ```net/url``` do Go.

```go
import (
	"net/http"
  "net/url"
)
```

Com o import desses pacotes, já se pode utilizar as funções cliente do pacote:

```go
resp, err := http.Get("http://teste.com/")

resp, err := http.Post("http://teste.com.br/upload", "image/jpeg", &buf)

resp, err := http.PostForm("http://teste.com.br/form",
	url.Values{"key": {"Value"}, "id": {"123"}})
```

Para o meu propósito coloquei uma função que trata o retorno de erro:

```go
func perror(err error) {
	if err != nil {
		panic(err)
	}
}
```

Basicamente a função ```perror``` verifica se houve erro e chama a função ```panic``` para interromper a execução do programa. Então criei uma função que recebe o endereço http e retorna uma string com o conteúdo da resposta:

```go
func navigateToString(address string) (response string) {
	_, err := url.Parse(address)
	perror(err)

	resp, err := http.Get(address)
	perror(err)

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	return string(body)
}
```

Como a função ```http.Get``` retorna o tipo [Response](https://golang.org/pkg/net/http/#Response) que possui o elemento ```Body``` (que é um Reader), usei a função ReadAll do pacote utilitário ```io/ioutil``` para convertê-lo em um array de bytes e construir a string de retorno. Segue o código completo para testar a função:

```go
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
)

func perror(err error) {
	if err != nil {
		panic(err)
	}
}

func navigateToString(address string) (response string) {
	_, err := url.Parse(address)
	perror(err)

	resp, err := http.Get(address)
	perror(err)

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	return string(body)
}

func main() {
	fmt.Println(navigateToString("http://www.atarde.com.br"))
}
```

O código de [webapiutils.go](https://raw.githubusercontent.com/ivanqueiroz/steam4go/9c67291b0e8c6f7bde8dffd11ca4fad44bba346d/webapiutils.go) que criei se baseia na utilização do pacote ```net/url``` para obter a lista de métodos disponíveis na Steam Web API, no formato JSON, e possui funções que retornam a resposta como string, array de bytes ou como uma ```struct```.

Em um futuro post mostrarei como manipular um objeto JSON no Go é fácil e como retornar uma ```struct``` que representa esse objeto.

Até mais!
