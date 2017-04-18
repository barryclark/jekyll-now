---
layout: post
title: Ternární operátor
---

Co v PHP dělá `?:` operátor, proč se jmenuje ternání a jak se správně používá?

# Teorie o názvu
Ternární operátor je jakýkoliv příkaz, který přijmá tři parametry/operandy. Takže technicky je to celá skupina operací, v PHP praxi je ale jen jeden. Říká se mu ternární a všichni rozumí. 

# Užití
Ternární operátor v PHP je vlastně syntactic sugar (syntaktický cukr, jiný způsob zápisu) pro obyčejnou `if else` podmínku. Funguje od PHP verze 5.3. 

Pro zapamatování si stačí vzpomenout, že značka `?:` vypadá jako smajlík s vlasy Elvise a potom už ho nikdy neotočíš (jako občas já). Pořadí vstupů je #podmínka, #když\_ano, #když\_ne. Je dobrým zvykem celou podmínku obalovat závorkami, aby byla jasná. Celé to potom může vypadat takto: `(#podmínka ? #když_ano : #když ne)`. Občas se používají i závorky okolo samotné podmínky, tím ale celý operátor ztratí trochu přehlednost - někdo to ale preferuje a naopak vše vidí lépe. 

# Příklad
```php
if ($age >= 18) {
    echo "Jsi dospělý, protože ti je $age let.";
} else {
    echo "Jsi dítě nebo mladistvý, protože ti je $age let.";
}
```

Trochu se to tam duplikuje, takže podle metody DRY budeme refraktorovat: 

```php
if ($age >= 18) {
    $status = 'dospělý';
} else {
    $status = 'dítě nebo mladistvý';
}

echo "Jsi $status, protože ti je $age let.";
```

Celá podmínka je ale stále dost roztahaná. Pomocí ternárního operátoru ji zredukujeme na jeden řádek: 

```php
echo 'Jsi '.($age>=18 ? 'dospělý' : 'dítě nebo mladistvý').", protože ti je $age let.";
```
 
# Polemika o používání
Někomu může ternární operátor připadat nepřehledný. Je pravda trochu zvláštní na zápis i čtení tím, že jako jediný potřebuje tři operandy. Osobně mi v takto krátkých příkladech nevadí, jakmile je ale výsledek delší než dvě slova, čitelnost začne trpět. 

Používej při jeho použítí hlavu (jako při všem). Když tím pomůžeš čitelnosti kódu, není v něm problém a neboj se ho použít. 

# Další odkazy
Další vysvětlení najdeš na [blogu Jakuba Vrány](https://php.vrana.cz/ternarni-operator.php) a anglicky na krásné stránce [A Beautiful Site](https://www.abeautifulsite.net/how-to-use-the-php-ternary-operator). 

# Too Long, Didn't Read?
Ternární operátor je zkrácený způsob zápisu pro if else podmínku. Tvar je `(#podmínka ? #když_ano : #když ne)`. Používej ho při ultrakrátkých podmínkách pro zpřehlednění kódu. 
