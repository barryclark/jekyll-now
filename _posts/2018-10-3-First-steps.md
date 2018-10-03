---
layout: post
title: First steps
---

# De Opdracht
Voor ASD-APP moeten wij als opdracht een nieuwe programmeertaal leren. 
Het leerproces moeten wij in blogvorm vastleggen, ik ga dit aan de hand van een Github Pages blog doen.
Helaas konden wij niet elke programmeer taal kiezen maar was de keuze beperkt tot vijf mogelijkheden:  

1. Prolog
2. Scala
3. Erlang
4. Clojure
5. Haskell

Zoals de naam van de blog al deed voormoeden heb ik voor Haskell gekozen, dit omdat ik functioneel programmeren graag een keer zou willen proberen.  

# Haskell
Als eerste heb ik maar gewoon online gezocht naar Haskell [het eerste resultaat](https://www.haskell.org/) heeft op de voorpagina gelijk een een tutorial.  
Een goede start lijkt mij.  

## De tutorial
### Lijsten
Als eerste "regel" werd `5 + 7` voorgesteld. Niet heel ingewikkeld dacht ik, de output was echter compleet anders dan dat ik verwacht had: `12
:: Num a => a`. Gelukkig begint het met 12 zoals ik verwacht had. `:: Num` zal dan wel aangeven dat de 12 een nummer (getal) is, maar `a => a` zegt mij niet zo veel.  

```
λ "Lennard"
"Lennard" :: [Char]
```  
Het invoeren van een stuk tekst ziet Haskell blijkbaar als een lijst van Char, zoals Java een String intern volgens mij ook als een (Array)List van char bijhoudt.

### Functies

```
λ sort [42,13,22]
[13,22,42] :: (Num a, Ord a) => [a]
```

Bij het aanroepen van de `sort` functie op een lijst het blijkbaar niet nodig om de parameters tussen haakjes te zetten in tegen stelling tot veel andere (OO) programmeertalen die ik tot nu toe gebruikt heb.  

```
λ fst (28,"chirs")
28 :: Num a => a
```
De omschrijving van de functie `fst` vind ik wel verassend:  

> It's called "fst" because it's used a lot in Haskell so it really needs to be short!  

Blijkbaar zal er binnen Haskell veel gewerkt worden met tupels, of in ieder geval data representaties waarbij het eerste element van belang is. 

```
λ let x = 8 * 10 in x + x
160 :: Num a => a
```

In deze regel wordt er een variabele x gemaakt en vermenigvuldigd. `let` geeft blijkbaar aan dat iets een variabele is en `in` wat er mee moet gebeuren.

```
λ map (+1) [1..5]
[2,3,4,5,6] :: (Enum b, Num b) => [b]
```
De map functie vind ik qua resultaat en gebruik heel erg lijken de [Javascript Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) de syntax is echter wel compleet anders, hierbij wordt wel tussen haakjes aangegeven wat er met de list moet gebeuren `(+1)` maar niet hoe, bijvoorbeeld `result = entry + 1`, uit nieuwsgierigheid wilde ik testen wat er zou gebeuren als je `(+1)` op een lijst van Char doet. Ik verwachtte dat `"ABC"` dan `"BCD"` zou worden, maar helaas blijkt het alleen op Num te werken.
```
λ map (+1) "abc"
No instance for (Num Char) arising from a use of ‘+’ In the first argument of ‘map’, namely ‘(+ 1)’ In the expression: map (+ 1) "abc"
``` 
Het volgende deel van de tutorial is het definieeren van een functie, bijvoorbeeld:
```
λ let square x = x * x in square 3
9 :: Num a => a
```
dit lijkt heel erg op de syntax van een variabele. `let expression in body` waarbij hier de expression de functie in zijn geheel is. `square x = x * x` en de code waarin de functie gebruikt wordt de body `square 3`.

De functie toUpper veranderd een lowercase char naar een uppercase char, logisch, maar om een hele string naar uppercase te krijgen was het niet mogelijk om `toUpper "Lennard"` te doen. Achteraf is dit logisch omdat "Lennard" een lijst van char is, gelukkig kan het doormiddel van de map functie wel.
```
λ map toUpper "Chris"
"CHRIS" :: [Char]
```

Dat was de vierde les van de tutorial alweer, maar bij het einde viel mij iets (belangrijks) op. 
> Let's go over what you've learned in this lesson:
> 1. Functions like map take other functions as parameters.
> 2. Functions like (+1), (>5) and square can be passed to other functions.   

`+1` is niet de operatie die de map functie op de lijst uit moest voeren, maar de naam van de functie die hij voor elke entry in de lijst moest uitvoeren!

### Pattern matching
```
λ let (a,b) = (10,12) in a * 2
20 :: Num a => a
```
Pattern matching is volgens de tutorial een manier om verschillende entries in een tupel aan een variabele te kunnen koppelen. (zodat je er iets mee kan doen). In bovenstaand voorbeeld `a = 10` en `b = 12`. Voor een lijst is de syntax echter wel anders in onderstaand voorbeeld worden de variabelen niet geschijden met een `,` maar met een `:` daarnaast staat er ook nog een `:[]` achter, waarvoor deze dient weet ik niet. Daarnaast is het mogelijk om alle verdere waarden met een `_` te negeren. Bijvoorbeeld: `λ let (a:_) = "xyz" in a` ik denk dat dit handig is omdat je vaak niet weet hoe lang de input zal zijn.
```
λ let (a:b:c:[]) = "xyz" in a
'x' :: Char
```  

### Reflectie
Het moeilijkste aan Haskell lijkt hem voor mij tot nu toe in de syntax te zitten, de concepten begrijp ik (voor mijn gevoel) wel maar de syntax vind ik vaak niet heel logisch. Ik heb ook het gevoel dat de syntax heel veel impliciet definieerd.  
In de volgende blogpost ga ik beginnen met het hoofdstuk over haskell in het boek.
