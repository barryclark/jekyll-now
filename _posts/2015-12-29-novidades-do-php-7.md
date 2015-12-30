---
layout: post
title: Novidades do PHP 7
author: wendell
---

Olá pessoal, com a versão estável do **PHP 7** lançada, muitas pessoas tem se perguntado se vale a pena mudar a versão ou se continuar na versão antiga
ainda é a melhor opção. Com esse post irei mostrar algumas novidades que irão fazer você mudar imediatamente para a nova versão da linguagem!!! :D
<!--more-->

## Performance

O principal ponto para você correr para a nova versão do PHP é pela sua performance. Quando você mudar a versão, sem alterar nenhuma linha de código,
suas aplicações já vão ganhar um **UP** que vai de **25% à 70%** apenas mudando a versão do PHP. Além disso a nova versão consegue responder aproximadamente
o dobro de requisições por segundo em comparação à versão anterior.

## Remoção de Itens Depreciados

Alguns itens que já estavão nessa condição por algum tempo foram removidos, dessa maneira algumas aplicações podem parar de funcionar corretamente caso
ainda utilizem algum desses itens.  

Os itens removidos foram:  
<ul>
  <li>As tags: <%, <%=, %>, < script language="php">;</li>
  <li>A extensão **ereg** e com isso todas as funções da mesma (devendo utilizar a partir de agora a extensão **PCRE**);</li>
  <li>A extensão **mysql** e com isso todas as funções da mesma (devendo utilizar a partir de agora a extensão **mysqli** ou **PDO**);</li>
</ul>

## Uniform Variable Syntax

Essa mudança veio para resolver diversas inconsistências ao resolver expressões "variáveis-variáveis". Vamos entender melhor analisando o código abaixo:

```php
<?php
  class Dog {
    public $name = 'Rex';
    public $age = 1;
  }

  $dog = new Dog();
  $property = [
    'first' => 'name',
    'second' => 'age'
  ];
  echo "My dog name is ". $dog->$property['first'];
```

No **PHP 5** a expressão **$dog->$property['first']** é interpretada de uma forma incoerente com a interpretação padrão (esquerda para direita), pois ela é
interpretada da seguinte forma: **$dog->{$property['first']}**.  

No **PHP 7** a mesma expressão é interpretada da forma padrão (esquerda para direita) e fica da seguinte maneira: **{$dog->$property}['first']** fazendo com que
essa expressão não funcione no **PHP 7**, pois **$property** é um array e não pode ser convertido em uma **String**.  

Mas com essa mudança outras expressões que nas versões anteriores eram inválidas agora passam a ser válidas, vamos ver alguns exemplos:

```php
<?php
  class Dog {
    public static $name = 'Rex';

    public function getRelatives() {
      return [
        'father' => function() {
          return 'Responsible old dog';
        },
        'mother' => function() {
          return 'Kind little dog';
        }
      ];
    }

    public function getWho($relative) {
      return $this->getRelatives()[$relative];
    }

    public function getNewDog() {
      return new Dog();
    }
  }
```

Com o **PHP 7** podemos criar diversas associações aninhadas que não funcionam em versões anteriores como por exemplo:

```php
<?php
  $dog = new Dog();
  echo $dog->getRelatives()['father']();
  echo $dog->getWho('mother')();
  $dog::getNewDog()::$name;
```

## Switch com apenas um default

Nas versões anteriores do PHP podíamos definir diversas cláusulas **default** em um **switch**. Lógico que isso não fazia sentido
pois apenas a última declarada era utilizada, mas não gerava nenhum erro nem alertas então era um problema difícil de se encontrar, porém agora no **PHP 7**
quando utilizamos mais de uma cláusula **default** em um **switch** o PHP retorna um **Fatal Error**.

## Engine Exceptions

As novas **exceptions** foram introduzidas para facilitar o tratamento de erros nas aplicações. As **Engine Exceptions** substituem os **Fatal Errors** e os
**Recoverable Fatal Errors**, fazendo com que agora possamos capturar essas exceções e tratá-las. As novas **exceptions** foram introduzidas nessa versão de uma
forma para manter a compatibilidade com versões anteriores. Para incorporar as novas **exceptions** com um impacto mínimo em códigos de versões anteriores, a
**Hierarquia das Exceptions** teve de sofrer algumas mudanças. Veja abaixo:  
<ul>
  <li>
    Throwable interface
    <ul>
      <li>
        Exception implements Throwable
        <ul>
          <li>ErrorException extends Exception</li>
          <li>RuntimeException extends Exception</li>
        </ul>
      </li>
      <li>
        Error implements Throwable
        <ul>
          <li>TypeError extends Error</li>
          <li>ParseError extends Error</li>
          <li>AssertionError extends Error</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

## Operador de Comparação Combinada (Spacheship Operator)

O operador **spacheship( <=> )** foi introduzido para nos ajudar a fazer comparações mais concisas. Veja a expressão abaixo:

```php
  $a <=> $b
```

A expressão acima pode nos retornar três resultados diferentes, dependendo do valor das variáveis:  
<ul>
  <li>Retorna **-1** se **$a** for menor que **$b**;</li>
  <li>Retorna **0** se **$a** e **$b** forem iguais;</li>
  <li>Retorna **1** se **$a** for maior que **$b**;</li>
</ul>

## Null Coalesce Operator (??)

Esse novo operador veio para diminuir o esforço que gastamos quando nos deparamos com a situação que temos que verificar se determinado valor existe antes de usá-lo.
Nas versões anteriores do PHP utilizamos a seguinte maneira:

```php
  $a = isset($b) ? $b : "default";
```

No **PHP 7** utilizando o novo operador, podemos fazer apenas assim:

```php
  $a = $b ?? "default";
```

## Scalar Type Hints

Agora podemos finalmente utilizar **strings**, **booleans**, **integers** e **floats** como **Type Hints** para nossas funções e métodos. Por padrão os **type hints** não
são restritivos, então se você passar uma **string** para um parâmetro **integer** ele vai apenas fazer a conversão sem gerar nenhum erro ou alerta. Porém é possível ativar
um **Modo Restrito** que irá gerar erros quando um tipo diferente do declarado for passado como parâmetro. Vamos entender melhor verificando o código abaixo:

```php
<?php
  function squareNumber(int $number) {
    return $number * $number;
  }

  $a = squareNumber("4");
  var_dump($a);
```

O código acima não irá gerar nenhum erro ou alerta, pois o **Modo Restrito** não está ativado, dessa forma quando passamos o valor **"4"** para nosso método, ele converte o valor
para um **integer**. Caso você queira restringir para que apenas **integers** possam ser passados para a função **squareNumber** devemos colocar uma diretiva na primeira linha de nosso
script como mostra o exemplo abaixo:

```php
<?php
  declare(strict_types = 1);

  function squareNumber(int $number) {
    return $number * $number;
  }

  $a = squareNumber("4");
  var_dump($a);
```

Com o **Modo Restrito** ativado esse código iria gerar um **Fatal Error** com a seguinte mensagem: **Fatal error: Uncaught TypeError: Argument 1 passed to squareNumber()
must be of the type integer, string given.**.

## Return Type Hints

Além de podermos declarar os tipos de nossos parâmetros, agora também podemos definir o tipo do retorno de nossos métodos e funções. Igual aos **Scalar Type Hints**, caso o
**Modo Restrito** não esteja ativado, o valor será convertido automaticamente para o tipo definido no **Return Type Hint**. Vejamos o exemplo abaixo:

```php
<?php
  function testReturn() : bool {
    return 1;
  }

  var_dump(testReturn());
```
No código acima o valor do retorno será convertido automaticamente para um **boolean**. Caso o **Modo Restrito** esteja ativado o código acima iria produzir um **Fatal Error** com a
seguinte mensagem: **Fatal error: Uncaught TypeError: Return value of testReturn() must be of the type boolean, integer returned.**.

### Observações importantes

Lembre-se que os erros descritos em **Scalar Type Hints** e **Return Type Hints** podem ser tratados com blocos **try/catch** e também é muito importante lembrar que você pode utilizar
outros tipos em seus métodos e funções, por exemplo objetos, etc.

## Conclusão

Espero que esse artigo possa dar uma base nas novidades que o **PHP 7** trouxe para nós desenvolvedores e que vocês continuem estudando e aprofundando mais nos estudos da linguagem.  

**Um grande abraço a todos!!! Espero que o artigo possa ajudar a melhorar seus conhecimentos!!! Até a próxima!!!**
