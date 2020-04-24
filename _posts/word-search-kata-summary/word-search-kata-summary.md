# Word search kata summary - first real F# kata

Recently I decided to start learning F#. In this blog post I will try to desribe my journey with a first bigger kata made by me. It was supposed to be a small and sumple kata, but I ended up with a much bigger and more complex code than I was expecting. At the beginning I'd like to thank Bizmonger (Scott Nimrod) for helping me with this exercise. Without him I wouldn't be able to do this whole thing. And here's a link to his [twitter](https://twitter.com/Bizmonger). Drop him a follow, he's a really helpful guy :)

The whole exercise took me about 20 hours, distibuted over about two weeks.

---

## About kata

The kata I was doing is called `Word search` and you can find it on [exercim](https://exercism.io/)

Here's a description of this kata:
```
Introduction
In word search puzzles you get a square of letters and have to find specific words in them.

For example:

    jefblpepre
    camdcimgtc
    oivokprjsm
    pbwasqroua
    rixilelhrs
    wolcqlirpc
    screeaumgr
    alxhpburyi
    jalaycalmp
    clojurermt

There are several programming languages hidden in the above square.

Words can be hidden in all kinds of directions: left-to-right, right-to-left, vertical and diagonal.

Given a puzzle and a list of words return the location of the first and last letter of each word.
```

## Example test cases provided by kata

Just to help you understand a problem a bit more.

It should find a word left to right, right to left, words in up - down axis and also diagonal words in every direction.

```fsharp
[<Fact>]
let ``Should locate one word written left to right`` () =
    let grid = ["clojurermt"]
    let wordsToSearchFor = ["clojure"]
    let expected = [("clojure", Some ((1, 1), (7, 1)))] |> Map.ofList
    search grid wordsToSearchFor |> should equal expected
```

An example of more complex test would be this one:

```fsharp
[<Fact>]
let ``Should fail to locate a word that is not in the puzzle`` () =
    let grid = 
        [ "jefblpepre";
          "camdcimgtc";
          "oivokprjsm";
          "pbwasqroua";
          "rixilelhrs";
          "wolcqlirpc";
          "screeaumgr";
          "alxhpburyi";
          "jalaycalmp";
          "clojurermt" ]
    let wordsToSearchFor = ["clojure"; "elixir"; "ecmascript"; "rust"; "java"; "lua"; "lisp"; "ruby"; "haskell"]
    let expected = 
        [ ("clojure", Some ((1, 10), (7, 10)));
          ("elixir", Some ((6, 5), (1, 5)));
          ("ecmascript", Some ((10, 1), (10, 10)));
          ("rust", Some ((9, 5), (9, 2)));
          ("java", Some ((1, 1), (4, 4)));
          ("lua", Some ((8, 9), (6, 7)));
          ("lisp", Some ((3, 6), (6, 3)));
          ("ruby", Some ((8, 6), (5, 9)));
          ("haskell", Option<((int * int) * (int * int))>.None) ]
        |> Map.ofList
    search grid wordsToSearchFor |> should equal expected
```

In my solution, I went off-the-track a little bit. At some point I decided to stop trying to fit into this tests and the domain created by this kata, and I started to treat this requirements as a loose direction in which I should go. The dirrerences between final solution and kata requirements is a slightly different contract (I'm capable of searching only a single word), and instead of returning a position of a given word, I'm just returning a true / false whether the word has been found or not. All differences are I'd say not-that-hard to change so that all the kata requirements would be fulfilled, but I haven't decided to try to do this as for now.

### General overview of my solution

The solution consists of three projects:
* Interpreter
    * That's where the whole logic is
* Specification
    * I have my domain types in here, both tests and interpreter depend on specification
* Tests
    * A project for tests

#### Types

I've created some simple and complex types to help myself with implementation (more on this in DDD paragraph). Some of them are:
* Word (string) - a word I'm looking for
* SingleLine (string) - a single line within grid (may be horizontal / vertical / diagonal line, converted into a string type)
* Grid (SingleLine list) - a list of single lines (horizontal lines in this case)
* Index (int) - an index (horizontal or vertical) within grid
* Coordinate (Index; Index) - a coordinate within grid
* FirstLetter (char) - a first letter of a word I'm looking for. Used as a part of my algorithm.
* Coordinates (Coordinate list) - a set of coordinates, used to keep position of letters found at the grid. If within grid there is more than one FirstLetter, I get more than one Coordinate 

#### Algorithm

The whole idea of this solution was pretty simple: 
* Get a Word's FirstLetter
* Find all accurences of FirstLetter within grid.
* Using a recurring function, find all chars between FirstLetter's position and adge of the grid. Do it in all directions, and persist this characters as SingleLines
* Since I've got SingleLine for every direction, starting with FirstLetter, I just need to take this list and apply a `List.Contains` to determine whether there is a Word in a grid or not.

My modules:
* `WordSearch`: top - level module. It has main `find` function, and it also does logic of finding Word within SingleLines
* `Straight` and `Diagonal`: given a `Grid` and `FirstLetter`, it returns a list of `SingleLine` in a given directions (straight or diagonal)
* `LineGetter` and `Coordinates`: modules shared between `Straight` and `Diagonal`, with functions used to find first letter of Word and transforming this `Coordinate` into list of `SingleLine` in every direction
* `Converters`: helper module, doing convertions between my types

## Revelations on DDD (Domain Driven Design)

### Wrapping simple types into domain types

In F# it is possible to warp a simple type into my custom domain type, which in my case, for example chages a simple `string`, which by itself represents only a set of characters, into a `Word`, which is exactly the same type as `string`, but represents the word I'm looking for. Also, there's another custom type, called `SingleLine`, which in also of type `string`, but it represents a single line within a grid. Using this technique, the compiler helps me by checking if the function expecting a `Word` gets exactly the same type I'm expecting, since if it recieves a `SingleLine`, which under the hood is the same simple type `string`, just with some 'alias' on top of it, the code will not compile. This way I cannot acidentally pass wrong type into my function.

### Creating complex types

F# is capable of not only wraping simple types, but is also great at aggregating this simple types into a more complex types.

```fsharp
type Submission =
    {
        Grid : Grid
        Word : Word
    }
```

The type `Submission` consists of:
* `type Grid = SingleLine list`
    * `type SingleLine = string`
* `type Word = string`

What it means is that `Grid` is a `List of string` and `Word` is a `string`, but since it's type - safe, I'm unable to put a `SingleLine` into `Word` field just by mistake, it just won't compile. The same way, I'm unable to put a `Word` into a `Grid`.

The above type is called a `record`, but there are more cool complex types. In this project I used also `discriminated union`.

Discriminate union:
```fsharp
type Directions =
    | Diagonal of DiagonalDirections list
    | Straight of StraightDirections list
```

Types used in discriminated union:
```fsharp
type DiagonalDirections =
    {
        NE : SingleLine
        NW : SingleLine
        SE : SingleLine
        SW : SingleLine
    }

type StraightDirections =
    {
        Up : SingleLine
        Down : SingleLine
        Left : SingleLine
        Right : SingleLine
    }
```

What it means is that I've got a type called `Directions`, which contains either `DiagonalDirections list` or `StraightDirections list`. I'm using `Directions` as a type returned by a `GetLine` function, which can be used in two contexts - straight and diagonal. This way I can return a type, which has different meaning in a different context.

## TDD

### Using TDD to incrementally build the application

I've started from the hardest task - getting diagonal single lines. The idea behind it was that if I was able to convert letters from a grid placed diagonal into a single string or a list of strings, then getting a 'straight' (up / down / left / right) lines should be a piece of cake. It later appeared to be true (partially), from the point of view of my algorithm. Getting diagonal lines was the hardest thing, and having it done I was able to take a 'ready-to-go' solution and almost immediately (with minor changes) apply it to getting straight lines. 

I started with a simplest of the hardest case - given a word which was starting in top left corner of a grid, I wanted to return a single line that goes in bottom right direction. That was my basline, on top of which I built up the rest of the algorithm.


First, I started with implementing a failing test:
```fsharp
[<Fact>]
    let ``Given a grid and a word, it should return diagonal bottom right starting with words first letter``() =

        let grid = [ "abc"
                     "def"
                     "ghi" ]
        let word = { FirstLetter = 'a' ; Remaining = ['x' ; 'y'] }

        let submission : FirstLetterSubmission =
            { Grid = grid
              Word = word }

        let expected =
            [ { SE = "aei" } ]

        // Act & Assert
        submission
        |> Diagonal.singleLines  
        |> should equal expected
```

As soon as I has this test passing, I added another test - the one checking if the function `singleLines` works properly for a different index than (0, 0). It turned out that it doesn't work properly, but fortunatelly I had a test proving me that it's wrong, and it turned green as soon as I fixed this problem. After adding line one more test for this single - direction case, I added to `expected` variable more cases - so it checked for single lines going in all directions.
```fsharp
let expected =
    [ { NW = "a"
        NE = "a"
        SW = "a"
        SE = "aei" } ]
```
As soon as this test was passing, I was able to use a similar approach to a vertical and horizontal `singleLines` function. Starting small, I incremetally made tests pass, as I was building up my solution. 

After I had all tests confiming that both diagonal and straight single lines are being fetched correctly, I added an end-to-end test, which returned true or false, depending on whether the word I was looking for was present at the grid or not.

After I made this test pass, I added some more tests for happy path (find diagonal word, given it exists in a grid, find horizaontal work given it exists in a grid) and at the end I added a test for a sad path (find a word given it does not exist). Fortunaltelly, the last 3 tests were green from the beginning.

And as a last thing, a test coverage of the whole solution. I'm pretty satisfied with this coverage (it's really high, but it's because this is a simple and small project), and also this tests saved me some work, by just failing after doing some changes, so i could fix them immiediately.

![](images/test_coverage.png)

## Surprises of F#

I'm working as a C# developer. In this chapter I'll try to describe things which was unexpected for me, or not-that-easy to adapt by my brain.

### Unable to reference code that is above
This one is pretty obvious, but it surprised me a lot. In C#, folders and files are sorted alphabetically

![Solution explorer view](images/solution_explorer.png)

In F#, folders and files are sorted in the way you organize them. You can move them up and down as you wish, and they will stay where you dropped them. It was kinda strange at first, but after a while it totally made sense, since in F# it's impossible to reference anything from above. 

### Program.fs has to be at the end of the whole solution

I was struggling with this one way to much. I realised right now (writing this words it just 'clicked') why it is required to have `Program.fs` at the end of solution - it's related to the previous point - an entry point of a F# solution, witch is `Program.fs`, needs to have an access to all the code it's using. So naturally, it has to be the last file.

### F# coding conventions

It wasn't much of a purprise, but I'm still struggling with this one. I still tend to mix `PascalCase` (used in type names) with `camelCase` (used in function names. But this is my day-to-day struggle, since I also tend to mix things up in C#, in which I already shouldn't do such mistakes ;) 

### Type inference

Really hard understand, really helpful as soon as I figured it out. There are written type names above every function (this little gray letters), it's a concept called 'type inference'.

![](images/type_inference1.png)

At first it seemed like a black magic to me. Only after some time it started to make sense. The compiler can be privided with a signature it should apply for a given function (like in first screenshot), or can determine types by itself (return value in second screenshot). It can be thought of as a function signature.The first part represents parameters, and the last type is a type returned by function. In the above example, we can see that a function named `getSingle` takes a tuple as a parameter [`*` symbol represents that it's a tuple]. The tuple is made of given types:
* Grid
* Coordinate
* a function taking `Coordinate` as a parameter and returning `Coordinate`
and returns a variable of type `string`.

![](images/type_inference2.png)

This above function is a bit simpler, it takes a parameter of a type `FirstLetterSubmission` and returns a list of `Coordinate` type. As you can see, there is no implicitly defined type returned by this function, but compiler managed to figure it out by itself.

It is also useful when I'd like to create a new function. Instead of writing the whole function signature, I could just write a function and use it. Compiler will help me with determinig function signature via type inference. This made some things easier, to start with function of an empty signature and just check if types are correct or not.

### Type as interface

If F# there's an interesting concept of interface - it's done by creating a `type` with a signature of a function, which represents the transformation that function makes. In other words, it's a function signature, written in the same way as type inference.

In here I've got a type `GetDirections`, which defines a signature of a function implementing it. Then there's a `getDirections` function, which implements `GetDirections` type, so it transfroms a `Submission` type into an option of `Directions`:

```fsharp
type GetDirections = Submission -> Directions option
```
```fsharp
let getDirections : GetDirections = (...)
```

Later, the `GetDirections` type is used in a `GetLine` fuction, as a parameter. It means, that I can pass a function fulfilling the signature of a `GetDirections` type into `GetLine` function to change the behaviour of `GetLine` function.

```fsharp
type GetLine = GetDirections -> Submission -> Directions option
```

Final usage of `GetLine` function is presented below. I've got a `directions` function, which fulfills the `GetLine` type, and then is used in `getLinesInAllDirections`. 
It's used in two places: `|> directions Diagonal.getDirections` and `|> directions Straight.getDirections`, so I'm using directions function with two different behaviors injected (it's a strategy patter). It's capable of getting both diagonal and straight directions, depending on a function it gets.

```fsharp
let directions : GetLine =
            fun fn submission ->
                fn submission
    
let getLinesInAllDirections (submission : Submission) =
    { Lines =
        submission
            |> directions Diagonal.getDirections
            |> function
                | Some x -> Converters.directionsIntoSingleLinesList x
                | None -> []
        |> List.append (
            submission
                |> directions Straight.getDirections
                |> function
                    | Some x -> Converters.directionsIntoSingleLinesList x
                    | None -> [])}
```

### Using pipe operator where it is possible

F# heavily depends on pipe operator `|>`. This operator passes a value from a previous function or variable into another function. This below is a code from one of my tests. In first version passes a `submission` parameter to a function `find` from a module `WordSearch` in a 'regular' way, in the second version it passes the same parameter using a pipe operator. I've got an impression that the second way of doing this is more 'correct', or maybe should I call it 'more functional'?
```fsharp
WordSearch.find submission
|> should equal expected
```
```fsharp
submission
|> WordSearch.find
|> should equal expected
```

Also, as a side note, module name can be omitted. If only there's no names conflict, I could go with code like this:

```fsharp
submission
|> find
|> should equal expected
```

### Using modules as syntax

This thing was also quite new to me - module name at function call is an optional thing. It can be used when it improves readability, but also can be omitted when it feels redundant and not adding an value to the code.

```fsharp
submission
    |> Diagonal.singleLines 
    |> should equal expected
```

In the above example, the `Diagonal` part is totally optional and can be omitted.


```fshapr
NE = LineGetter.getSingle(grid, {HorizontalIndex = maxPosition; VerticalIndex = maxPosition}, initialPosition, northEast);
```

In an above example, name of a module feels redundant - I got rid of `LineGetter`, and left `getSingle` only, to improve readability.

```fshapr
NE = getSingle(grid, {HorizontalIndex = maxPosition; VerticalIndex = maxPosition}, initialPosition, northEast);
```