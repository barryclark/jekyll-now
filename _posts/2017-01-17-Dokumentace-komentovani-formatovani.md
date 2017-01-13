---
layout: post
title: Jak psát PHP? (4/3) - Dokumentace, komentování a formátování
---

Čtvrtý díl ze tří přehledu nástrojů pro PHP. Podíváme se na dokumentování v kódu, komentáře a formátování kódu. A kdyby náhodou bylo potřeba, tady najdete [první]((http://jakpsatphp.cz/Jak-psat-php-Zdroje-znalosti+vyvojove-prostredi/)), [druhý](http://jakpsatphp.cz/Jak-psat-php-Zavislosti+verzovaci-systemy+debugging/) i [třetí] díl. 

# Komentování v kódu
Pro pořádek a úplné začátečníky, komentáře v PHP se značí `//` pro komentář na jeden řádek, nebo `/* komentář */` pro blokový komentář přes jeden i víc řádků. Tak, a když teď nejste úplní začátečníci, jdeme na věc. 

Komentáře mají odrážet ideje a myšlenky, které nejsou v kódu vidět na první ani na druhý pohled. Nemusí popisovat to, co kód dělá - to by mělo být jasné z kódu samotného. Komentáře by měly zachycovat širší rámec, proč kód něco dělá, a ne co dělá. Uvedu příklad, jak komentáře vypadat nemají: 
```php
<?php
function square($base, $exponent) {
    //kontrola, jestli jsou to čísla
    if (!(is_numeric($base) || is_numeric($exponent))) {
        throw new Exception('Jedno ze vstupů není číslo');
    }
    //spočítáme mocninu
    $result = $base ** $exponent;
    //vrátíme vypočtený výsledek
    return $result;
}
```
Komentáře tu jen slepě popisují, co se dozvíme hned na dalším řádku. Takto by se sotva hodily na první seznámení se s jazykem. Druhý příklad je lepší: 
```php
<?php
function square($base, $exponent) {
    if (!(is_numeric($base) || is_numeric($exponent))) {
        //chceme radši výjimku než error, protože aplikace ji umí zachytit a poslat ticket
        throw new Exception('Jedno ze vstupů není číslo');
    }
    //můžeme použít i pow() pro případ nasazení na nižší verzi než PHP 5.6
    $result = $base ** $exponent;
    
    return $result;
 }
```
Komentáře zachycují proč je zde použití výjimka nebo rychlý fix při potřebě použít kompatibilní kód. 

Komentáře taky můžou pomoci vysvětlit složitější kontstrukci nebo důvod, proč je něco použito zrovna tímto způsobem: 
```php
<?php
//pro nastavení používáme konstanty, protože je to nejrychlejší způsob načtení do paměti
define('DB_server', 'localhost');
define('DB_login', 'login');
define('DB_pass', 'pass');
 ```
 
Jsou i zastánci ne-komentářů v kódu. Tvrdí, že když je kód dostatečně čitelný, nejsou potřeba. Sám ale komentáře používám spíše víc - zjednodušují čtení kódu pro ostatní. Správně napsaný komentář umí zrychlit pochopení smyslu kódu i těm, co nejsou tak zkušení jako autor nebo třeba daný jazyk vůbec neznají. 
 
Šikovná je komentářová formule `//TODO popis úkolu`. Používá se pro místo, kde je potřeba ještě v kódu trochu zapracovat, ne ale hned teď. IDE umí tuto značku zvýraznit, označit výraznější barvou nebo i vyfiltrovat jejich seznam. V PHPstorm tento seznam najdete pod zkratkou `Alt + 6`. 
 
Poslední otázkou zůstává jazyk komentářů. Preferuje se jazyk použitý i v kódu například pro funkce či proměnné. Pokud vyvíjíte aplikaci v angličtině, která ale zůstane vždy u českých vývojářů, klidně použijte české komentáře. Hlavní účel totiž vždy zůstává lépe pochopit kód. 

# Dokumentace v kódu
U funkcí a metod by mělo být jasné, co dělají. Občas jsou ale složitější a tak se do komentářů okolo nich dávají informace, které čtenářům kódu jejich smysl více objasňují. U PHP se nejvíce ustálil zápis PHPdocs. Vznikl z JavaDoc a není nikde formalizovaný, ale je to standard, který se dodržuje nejvíce. 

U funkcí a metod se používá DocBlocks. Začíná vždy `/**` a pokračuje `*` na každém dalším řádku. Nahoru se píše krátké shrnutí, dále delší popis funkce nebo metody a nejblíže ke kódu parametry, co funkce nebo metoda vrací a popřípadě jestli vrhá nějakou výjimku. Opět uvedu příklad: 
```php
<?php
/**
 * Počítá mocninu ze zadaných čísel
 *
 * Funkce zkontroluje oba vstupní parametry, zda jsou to čísla. 
 * Pokud ano, spočítá mocninu jednoho druhým a vrátí výsledek. 
 * Pokud ne, vyhodí výjimku s popisem problému. 
 *
 * @param int $base
 * @param int $exponent
 * @return int
 * @throws Exception Když jedno ze vstupů není číslo
 */
function square($base, $exponent) {
   if (!(is_numeric($base) || is_numeric($exponent))) {
	   throw new Exception('Jedno ze vstupů není číslo');
   }
   $result = $base ** $exponent;
   
   return $result;
}
```
Takto vlastně vůbec nemusíme číst kód, stačí prolétnout dokumentaci a hned je vidět, co má za úkol a co funkce nebo metoda dělá. U takto krátké funkce to asi není nutné, ale u delších je to velmi užtečné. 

IDE umí s generováním dokumentace v kódu pomoci. V PhpStorm stačí nastavit kurzor na funkci, kliknout na žlutou žárovku a vybrat `Generate PHPdocs for function`. Nebo můžeme před funkci napsat `/**` a stisknout `Enter`. Pro vygenerování základní dokumentace pro celou třídu nebo i projekt můžeme použít funkce kontroly kódu, která se nachází v `Code > Inspect Code`. Ta po potvrzení otevře dialogové okno a tam v řádku PhpDocs pravým tlačítkem zvolíme `Apply Fix`. 

# Formátování kódu
Pro formátování je několik obecných standardů. Pravdou však je, že co projekt a kodér, to jiný styl. Někomu se čte kód lépe s více odsazeními, někdo preferuje mezery mezi operandy. Možná už máte nějaký svůj styl zaběhaný, možná ho ještě hledáte - na tom není nic špatného. A když se pořád nemůžete rozhodnout, prostě si jeden vyberte a ten potom ve svých kódech používejte. 

Jak formátujete kód ve svých projektech je čistě na vás. Důležité je zůstat konzistentní. Vyberte si tedy mezery nebo tabulátory, hlavně je potom používejte všude. Složené závorky odsazujte nebo ne, ale všude je ne/odsazuje stejně. V konzistentnosti hodně pomůže IDE, o tom víc níže. 
 
V práci nebo při sdílených projektech je požadavek na konzistentnost kódu ještě větší. Konzistentní kód je velké výhoda v momentě, kdy v projektu přecházíte z jednoho zákoutí do druhého a všude je kód psaný jakoby jedním vývojářem. Styl potom tolik neruší a je možnost se lépe soustředit na obsah. 

Většina velkých projektů má vypsané standardy, které je třeba dodržovat. Důležité je ctít je, ať už je mají sepsané, nebo ne. Na začátku hodně opisujte styl okolo sebe a napodobujte svůj kód tak, jak ho vidíte. Ze začátku se na to sice musíte víc soustředit, později se to stane přirozenou věcí. 

IDE opět může hodně s formátováním pomoci. V PhpStorm se styl formátování nastaví `Settings > Editor > Code Style > PHP`. Klávesová zkratka pro zformátování kódu podle nastavení je `Ctrl + Alt + L`, používám ji stejně často jako zkratku pro uložení. Někteří lidé si dokonce `Ctrl + S` nastaví na tyto dva příkazy přímo. 

Vhodné je si i zatrhnout při commitování volbu `Reformat code` pro automatické zformátování před commitem. Potom můžete celé formátování pustit z hlavy a psát svým stylem. Jen občas svůj kód už potom nepoznáte (: Širší náhled na PhpDocs najdete třeba na [SitePointu](https://www.sitepoint.com/introduction-to-phpdoc/). 

# Too Long, Didn't Read?
Komentujte s rozvahou a proč, ne co kód dělá. Dokumentujte v kódu, usnadněte si život automatikou. Ve formátování kódu buďte konzistentní a dodržujte stardardy dané projektem. 

*Mnoho vývojářů už většinu doporučení v tomto miniseriálu bude znát a někdy může mít jiný názor. Prosím, ozvěte se do komentářů s čím nesouhlasíte či byste doplnili, věcná polemika je mnohem přínosnější než taktní mlčení.* 
