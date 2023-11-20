---
categories:
- java
- linguagem
- funcional
- programação
date: "2019-08-18T00:00:00Z"
title: Interfaces Funcionais no Java 8
url: /2019/05/2019-08-18-interfaces-funcionais-java.html
tags: ["algoritmo", "java", "funcional", "programação"]
---

Este artigo é uma tradução do [Functional Interfaces in Java 8](https://www.baeldung.com/java-8-functional-interfaces) o qual a mesma foi gentilmente autorizada por  [Baeldung](https://www.baeldung.com/) e [Eugen](https://www.baeldung.com/about/), responsável por excelentes artigos referentes a engenharia de software e Java, bem como [cursos sobre Spring](https://www.baeldung.com/learn-spring-course) .

> “A melhor maneira de iniciar é parar de falar e começar a fazer!”
>
> -- _Walt Disney_

# 1. Introdução

Este artigo é um guia para diferentes interfaces funcionais presentes no Java 8, seus casos de uso gerais e a utilização na biblioteca padrão do JDK.

# 2. Lambdas em Java 8

O Java 8 trouxe uma nova melhoria sintática poderosa na forma de expressões lambda. Um lambda é uma função anônima que pode ser manipulada como um *cidadão de primeira classe* da linguagem, por exemplo, passado ou retornado de um método.

Antes do Java 8, você normalmente criaria uma classe para cada caso em que precisasse encapsular uma única peça de funcionalidade. Isso implicava muito código clichê desnecessário para definir algo que servia como uma representação de função primitiva.

Existe um artigo no próprio site do Baeldung que explica sobre lambdas, interfaces funcionais e melhores práticas de trabalho com eles, chamado  ["Lambda Expressions and Functional Interfaces: Tips and Best Practices”](https://www.baeldung.com/java-8-lambda-expressions-tips). Aqui no artigo o foco é concentrado em algumas interfaces funcionais específicas que estão presentes no pacote java.util.function.

# 3. Interfaces Funcionais

Todas as interfaces funcionais são recomendadas para ter uma anotação *@FunctionalInterface* informativa . Isso não apenas comunica claramente a finalidade dessa interface, mas também permite que um compilador gere um erro se a interface anotada não satisfizer as condições.

Qualquer interface com um *Single Abstract Method* (SAM) é uma interface funcional e sua implementação pode ser tratada como expressões lambda.

Observe que os *default methods* do Java 8 não são *abstract* e não contam: uma interface funcional ainda pode ter vários *default methods* . Você pode observar isso lendo o [Javadoc da Function](https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html).

# 4. Funções

O caso mais simples e geral de um lambda é uma interface funcional com um método que recebe um valor e retorna outro. Esta função de um único argumento é representada pela interface *Function* , que é parametrizada pelos tipos de seu argumento e um valor de retorno:

	public interface Function<T, R> { … }

Um dos usos do tipo de *Function* na biblioteca padrão é o método *Map.computeIfAbsent* que retorna um valor de um mapa por chave, mas calcula um valor se uma chave não estiver presente em um mapa. Para calcular um valor, ele usa a implementação da função passada:

	Map<String, Integer> nameMap = new HashMap<>();
	Integer value = nameMap.computeIfAbsent("John", s -> s.length());

Um valor, neste caso, será calculado aplicando uma função a uma chave, colocada dentro de um mapa e também retornada de uma chamada de método. A propósito, **podemos substituir o lambda por uma referência de método que corresponda aos tipos de valor passados ​​e retornados** .

Lembre-se de que um objeto no qual o método é invocado é, na verdade, o primeiro argumento implícito de um método, que permite converter a referência do método de instância *length* para uma interface *Funtion* :

	Integer value = nameMap.computeIfAbsent("John", String::length);

A interface *Function* também possui um *default method* chamado *compose*  que permite combinar várias funções em uma e executá-las sequencialmente:

	Function<Integer, String> intToString = Object::toString;
	Function<String, String> quote = s -> "'" + s + "'";
 
	Function<Integer, String> quoteIntToString = quote.compose(intToString);
 
	assertEquals("'5'", quoteIntToString.apply(5));

A função *quoteIntToString* é uma combinação da função *quote* aplicada a um resultado da função *intToString* .

# 5. Especializações de função primitiva

Como um tipo primitivo não pode ser um argumento de tipo genérico, há versões da interface *Function* para os tipos primitivos mais usados double , int , long e suas combinações nos tipos de argumento e retorno:

* *IntFunction* , *LongFunction* , *DoubleFunction*: os argumentos são do tipo especificado, o tipo de retorno é parametrizado
* *ToIntFunction* , *ToLongFunction* , *ToDoubleFunction*: o tipo de retorno é do tipo especificado, os argumentos são parametrizados
* *DoubleToIntFunction* , *DoubleToLongFunction* , *IntToDoubleFunction* , *IntToLongFunction* , *LongToIntFunction* , *LongToDoubleFunction* - tendo o tipo de argumento e retorno definido como tipos primitivos, conforme especificado pelos seus nomes

Não existe uma interface funcional pronta para uso, digamos, para uma função que demora um pouco e retorna um *byte* , mas nada impede que você escreva o seu próprio:

    @FunctionalInterface
    public interface ShortToByteFunction {
 
        byte applyAsByte(short s);
 
    }

Agora podemos escrever um método que transforma um *array* de *shorts* em um *array* de *byte* usando uma regra definida por um *ShortToByteFunction* :

    public byte[] transformArray(short[] array, ShortToByteFunction function) {
        byte[] transformedArray = new byte[array.length];
        for (int i = 0; i < array.length; i++) {
            transformedArray[i] = function.applyAsByte(array[i]);
        }
        return transformedArray;
    }
    
Veja como podemos usá-lo para transformar uma matriz de *shorts* em uma matriz de *bytes* multiplicada por 2:

    short[] array = {(short) 1, (short) 2, (short) 3};
    byte[] transformedArray = transformArray(array, s -> (byte) (s * 2));
 
    byte[] expectedArray = {(byte) 2, (byte) 4, (byte) 6};
    assertArrayEquals(expectedArray, transformedArray);
    
# 6. Especializações de Funções com Dois Argumentos (Aridade Dois)

Para definir lambdas com dois argumentos, precisamos usar interfaces adicionais que contenham a palavra-chave “*Bi*” em seus nomes: *BiFunction* , *ToDoubleBiFunction* , *ToIntBiFunction* e *ToLongBiFunction* .

*BiFunction* tem ambos os argumentos e um tipo de retorno generalizado, enquanto *ToDoubleBiFunction* e outros permitem que você retorne um valor primitivo.

Um dos exemplos típicos de uso dessa interface na API padrão é o método *Map.replaceAll* , que permite substituir todos os valores em um mapa por algum valor computado.

Vamos usar uma implementação *BiFunction* que receba uma chave e um valor antigo para calcular um novo valor para o salário e devolvê-lo.

    Map<String, Integer> salaries = new HashMap<>();
    salaries.put("John", 40000);
    salaries.put("Freddy", 30000);
    salaries.put("Samuel", 50000);
 
    salaries.replaceAll((name, oldValue) -> 
      name.equals("Freddy") ? oldValue : oldValue + 10000);
      
# 7. Suppliers
 
 A interface funcional *Supplier* é outra especialização de *Function* que não aceita argumentos. É normalmente usado para gera valores de forma *lazy*. Por exemplo, vamos definir uma função que faça um valor *double* . Não receberá um valor em si, mas um Fornecedor deste valor:

    public double squareLazy(Supplier<Double> lazyValue) {
        return Math.pow(lazyValue.get(), 2);
    }

Isso nos permite gerar lentamente o argumento para invocação dessa função usando uma implementação *Supplier*. Isso pode ser útil se a geração desse argumento demorar um tempo considerável. Vamos simular isso usando o método *sleepUninterruptibly* da Guava :

    Supplier<Double> lazyValue = () -> {
        Uninterruptibles.sleepUninterruptibly(1000, TimeUnit.MILLISECONDS);
        return 9d;
    };
 
    Double valueSquared = squareLazy(lazyValue);

Outro caso de uso para *Supplier* é definir uma lógica para gerar a sequência. Para demonstrá-lo, vamos usar um método Stream.generate estático para criar um fluxo de números Fibonacci:

    int[] fibs = {0, 1};
    Stream<Integer> fibonacci = Stream.generate(() -> {
        int result = fibs[1];
        int fib3 = fibs[0] + fibs[1];
        fibs[0] = fibs[1];
        fibs[1] = fib3;
        return result;
    });

A função que é passada para o método *Stream.generate* implementa a interface funcional *Supplier* . Observe que para ser útil como um gerador, o *Supplier* geralmente precisa de algum tipo de estado externo. Neste caso, seu estado é composto de dois últimos números de seqüência de Fibonacci.

Para implementar esse estado, usamos uma matriz em vez de algumas variáveis, porque ** todas as variáveis ​​externas usadas dentro do lambda precisam ser efetivamente finais**.

Outras especializações da interface funcional *Supplier* incluem *BooleanSupplier* , *DoubleSupplier* , *LongSupplier* e *IntSupplier* , cujos tipos de retorno são primitivos correspondentes.

# 8. Consumers

Ao contrário do *Supplier*, o *Consumer*  aceita um argumento genérico e não retorna nada. É uma função que representa efeitos colaterais.

Por exemplo, vamos cumprimentar todos em uma lista de nomes imprimindo a saudação no console. O lambda passado para o método *List.forEach* implementa a interface funcional *Consumer* :

    List<String> names = Arrays.asList("John", "Freddy", "Samuel");
    names.forEach(name -> System.out.println("Hello, " + name));

Existem também versões especializadas do *Consumer* - *DoubleConsumer* , *IntConsumer* e *LongConsumer* - que recebem valores primitivos como argumentos. Mais interessante é a interface *BiConsumer* . Um dos casos de uso é iterar pelas entradas de um *map*:

    Map<String, Integer> ages = new HashMap<>();
    ages.put("John", 25);
    ages.put("Freddy", 24);
    ages.put("Samuel", 30);
 
    ages.forEach((name, age) -> System.out.println(name + " is " + age + " years old"));

Outro conjunto de versões especializadas do *BiConsumer* é composto por *ObjDoubleConsumer* , *ObjIntConsumer* e *ObjLongConsumer*, que recebem dois argumentos, um dos quais é genérico e outro é um tipo primitivo.

# 9. Predicates

Na lógica matemática, um predicado é uma função que recebe um valor e retorna um valor booleano.

A interface funcional *Predicate* é uma especialização de uma *Function* que recebe um valor genérico e retorna um booleano. Um caso de uso típico do lambda de predicado é filtrar uma coleção de valores:

    List<String> names = Arrays.asList("Angela", "Aaron", "Bob", "Claire", "David");
 
    List<String> namesWithA = names.stream()
      .filter(name -> name.startsWith("A"))
      .collect(Collectors.toList());

No código acima, filtramos uma lista usando a API *Stream* e mantemos apenas nomes que começam com a letra “A”. A lógica de filtragem é encapsulada na implementação do *Predicate* .

Como em todos os exemplos anteriores, existem as versões *IntPredicate* , *DoublePredicate* e *LongPredicate* dessa função que recebem valores primitivos.

# 10. Operators

As interfaces *Operator* são casos especiais de uma função que recebe e retorna o mesmo tipo de valor. A interface *UnaryOperator* recebe um único argumento. Um de seus casos de uso na API *Collections* é substituir todos os valores em uma lista por alguns valores calculados do mesmo tipo:

    List<String> names = Arrays.asList("bob", "josh", "megan");
 
    names.replaceAll(name -> name.toUpperCase());

A função *List.replaceAll* retorna void , pois substitui os valores de lugar. Para ajustar a finalidade, o lambda usado para transformar os valores de uma lista deve retornar o mesmo tipo de resultado que recebe. É por isso que o *UnaryOperator* é útil aqui.

Naturalmente, em vez de *name -> name.toUpperCase ()* , você pode simplesmente usar uma referência de método:

    names.replaceAll(String::toUpperCase);

Um dos casos de uso mais interessantes de um *BinaryOperator* é uma operação de redução. Suponha que queremos agregar uma coleção de inteiros em uma soma de todos os valores. Com a API *Stream*, podemos fazer isso usando um *Collector* , mas uma maneira mais genérica de fazer isso é usar o método *reduce* :

    List<Integer> values = Arrays.asList(3, 5, 8, 9, 12);
 
    int sum = values.stream()
      .reduce(0, (i1, i2) -> i1 + i2);

O método reduce recebe um valor inicial de acumulador e uma função *BinaryOperator* . Os argumentos dessa função são um par de valores do mesmo tipo, e uma função em si contém uma lógica para uni-los em um único valor do mesmo tipo. A função passada deve ser associativa , o que significa que a ordem de agregação de valor não importa, ou seja, a seguinte condição deve ser mantida:

    op.apply(a, op.apply(b, c)) == op.apply(op.apply(a, b), c)

A propriedade associativa de uma função do operador *BinaryOperator* permite facilmente paralelizar o processo de redução.

Claro, também existem especializações de *UnaryOperator* e *BinaryOperator* que podem ser usadas com valores primitivos, como *DoubleUnaryOperator* , *IntUnaryOperator* , *LongUnaryOperator* , *DoubleBinaryOperator* , *IntBinaryOperator* e *LongBinaryOperator* .

# 11. Interfaces Funcionais Antigas

Nem todas as interfaces funcionais apareceram no Java 8. Muitas interfaces de versões anteriores do Java estão em conformidade com as restrições de uma *FunctionalInterface* e podem ser usadas como lambdas. Um exemplo proeminente são as interfaces *Runnable* e *Callable* que são usadas em APIs de concorrência. No Java 8, essas interfaces também são marcadas com uma anotação *@FunctionalInterface* . Isso nos permite simplificar bastante o código de programação concorrente:

    Thread thread = new Thread(() -> System.out.println("Hello From Another Thread"));
    thread.start();

# 12. Conclusão

Neste artigo, descrevemos diferentes interfaces funcionais presentes na API do Java 8 que podem ser usadas como expressões lambda. O código fonte do artigo está disponível no [GitHub](https://github.com/eugenp/tutorials/tree/master/core-java-modules/core-java-lambdas)  .

## Fontes

Functional Interfaces in Java 8 - [https://www.baeldung.com/java-8-functional-interfaces](https://www.baeldung.com/java-8-functional-interfaces) - por Baeldung 