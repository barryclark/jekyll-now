---
layout: post
title: "Como trabalhar com arquivos binários utilizando Java"
date: 2016-11-19 12:00:00
author: mcqueide
image: '/assets/img/'
description: 'Aprenda manipular arquivos binarios com Java'
tags:
- java
- servlet
- io
categories:
- Java IO
twitter_text: 'Aprenda manipular arquivos binarios com Java'
---

# Introdução
Para maioria dos desenvolvedores Java, é uma dor de cabeça só de pensar que será necessário fazer uma operação de entrada e saída de dados, principalmente quando estamos trabalhando com arquivo binário. Esse material tem objetivo ser um guia para facilitar essas operações.

# Então como fazer?

## Leitura e escrita binária

Para esse processo iremos utilizar de duas classes abstratas, InputStream e OutputStream, e também utilizaremos de uma de suas classes concretas, FileInputStream e FileOutputStream, essas classes são classes para trabalhar com arquivos binários, senão for o caso podemos utilizar de classes mais alto nível que manipulam texto.

A seguir temos um exemplo onde realizamos o processo de leitura de um arquivo em disco e escrevemos ele num arquivo de saída, assim replicando seu conteúdo.


{% highlight java %}
InputStream inputStream = new FileInputStream("in.txt");
OutputStream outputStream = new FileOutputStream("out.txt");

byte[] buffer = new byte[1024];
int numBytesDentroBuffer = 0;

while((numBytesDentroBuffer = inputStream.read(buffer))!= -1){
	outputStream.write(buffer,0,numBytesDentroBuffer);
}

inputStream.close();
outputStream.close();
{% endhighlight %}

Na linha ```InputStream inputStream = new FileInputStream("in.txt");``` criamos um *inputStream* para o arquivo *in.txt* para realizarmos sua leitura. Já na próxima linha ```OutputStream outputStream = new FileOutputStream("out.txt");``` criamos um *outputStream* para a gravação do arquivo.

O segredo se encontra nas próximas linhas, ```while((numBytesDentroBuffer = inputStream.read(buffer))!= -1)```, nessa linha o método *inputStream.read(buffer)* lê pedaço do arquivo e armazena dentro do array *buffer* e retorna a quantidade de bytes lidos que são atribuídos a variável *numBytesDentroBuffer*, isso se repete enquanto o arquivo não é totalmente lido, quando isso acontece é retornado o valor -1.

Dentro do *while* temos o processo de escrita dos buffer lidos, o método ```outputStream.write(buffer,0,numBytesDentroBuffer);``` como se vê ele recebe 3 parâmetros, o primeiro paramêtro é o array com o conteúdo lido durante o laço de repetição, o segundo é de onde será iniciada a escriva com o conteúdo do array, o offset. Já o terceiro argumento contém a quantidade de bytes para serem escrito no outputStream durante a interação do *while*.

As demais linhas são apenas para fecharem os streams abertos, já que são recursos caros para continuarem abertos se nenhuma utilidade.

Assim como falado anteriormente as classes InputStream e OutputStream tem outras implementações. Exemplos delas são ByteArrayInputStream utilizada para trabalhar diretamente com bytes, temos FileInputStream para arquivos e ObjectInputStream para objetos serializados.

## Leitura e escrita de textos

Anteriormente realizamos o processo de leitura e escrita manipulando byte a byte. Porém temos opções de classes melhores para facilitar nossa vida quando se trata da manipulação de textos.

Para isso utilizaremos da classes BufferedReader, que por sua vez necessita receber um objeto Reader como argumento de seu construtor.

{% highlight java %}
File file = new File("in.txt");
FileReader fileReader = new FileReader(file);
BufferedReader bufferedReader = new BufferedReader(fileReader);

String texto;
while((texto = bufferedReader.readLine())!= null){
	System.out.println(texto);
}
{% endhighlight %}

No trecho ```while((texto = bufferedReader.readLine())!= null){``` o *bufferedReader* realiza a leitura de uma linha se houver a retorna para nossa variável texto que é impressa na saída do terminal logo em seguida, e esse laço será repetido até quando não houver mais linhas para serem lidas, tendo assim o retorno de null dado pelo *bufferedReader.readLine()*.

No processo de escrita temos a classe BufferedWriter, que recebe um Writer como parâmetro em seu construtor.

{% highlight java %}
File file = new File("in.txt");
FileReader fileReader = new FileReader(file);
BufferedReader bufferedReader = new BufferedReader(fileReader);

String texto;

File file2 = new File("out.txt");
FileWriter fileWriter = new FileWriter(file2);
BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);

while((texto = bufferedReader.readLine())!= null){
	bufferedWriter.write(texto);
	bufferedWriter.newLine();
}

bufferedReader.close();
bufferedWriter.close();
{% endhighlight %}

O método ```bufferedWriter.write(texto);``` realiza a escrita da string passada por parâmetro, algo para se observar é que temos que indicar para *bufferedWriter* que queremos uma nova linha atravéz do método *newLine();*, caso contrário a escrita será realizada em apenas uma linha.
