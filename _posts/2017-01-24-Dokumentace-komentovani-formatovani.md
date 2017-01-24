---
layout: post
title: Jak psát PHP? (4/3) - Dokumentace, komentování a formátování
---

Čtvrtý díl ze tří přehledu nástrojů pro PHP. Podíváme se na dokumentování v kódu, komentáře a formátování kódu. A kdyby náhodou bylo potřeba, tady najdete [první]({{site.baseurl}}/Jak-psat-php-Zdroje-znalosti+vyvojove-prostredi/), [druhý]({{site.baseurl}}/Jak-psat-php-Zavislosti+verzovaci-systemy+debugging/) i [třetí]({{site.baseurl}}/Uloziste-kodu+databaze+frameworky/) díl. 

# Komentování v kódu
Pro pořádek a úplné začátečníky, komentáře v PHP se značí `//` pro komentář na jeden řádek, nebo `/* komentář */` pro blokový komentář přes jeden i víc řádků. Tak, a když teď nejste úplní začátečníci, jdeme na mírně pokročilé. 

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

Komentáře tu jen slepě popisují to, co se dozvíme hned na dalším řádku. Takto by se sotva hodily na seznámení se s jazykem. Druhý příklad je okomentovám lépe: 

```php
<?php
function square($base, $exponent) {
    if (!(is_numeric($base) || is_numeric($exponent))) {
        //chceme radši výjimku než error, protože aplikace ji zachytí a pošle ticket
        throw new Exception('Jedno ze vstupů není číslo');
    }
    //můžeme použít i pow() pro případné nasazení na nižší verzi než PHP 5.6
    $result = $base ** $exponent;
    
    return $result;
 }
```

Komentáře tu zachycují proč je zde použita výjimka nebo ukazují rychlý fix při potřebě použít kompatibilní kód. 

Komentáře taky můžou pomoci vysvětlit složitější kontstrukci nebo důvod, proč je něco použito zrovna tímto způsobem: 

```php
<?php
//pro nastavení používáme konstanty; je to nejrychlejší způsob načtení do paměti
define('DB_server', 'localhost');
define('DB_login', 'login');
define('DB_pass', 'pass');
 ```
 
Jsou i zastánci nepoužívámí komentářů v kódu. Tvrdí, že když je kód dostatečně čitelný, nejsou potřeba. Sám ale komentáře používám - myslím, že zjednodušují čtení kódu pro ostatní. Správně napsaný komentář umí zrychlit pochopení smyslu kódu i těm, co nejsou tak zkušení jako autor nebo třeba daný jazyk vůbec neznají. 
 
Šikovná je komentářová formule `//TODO popis úkolu`. Používá se pro místo, kde je potřeba ještě v kódu trochu zapracovat, ne ale hned teď. IDE umí tuto značku označit výraznější barvou nebo vyfiltrovat jejich seznam. V PHPstorm tento seznam najddš pod zkratkou `Alt + 6`. 
 
Poslední otázkou zůstává jazyk komentářů. Preferuje se jazyk použitý v kódu. Pokud vyvíjíš aplikaci v angličtině, která ale zůstane vždy u českých vývojářů, klidně použij české komentáře. Hlavní účel totiž vždy zůstává lépe pochopit kód. 

# Dokumentace v kódu
U funkcí a metod by mělo být jasné, co dělají. Občas jsou ale složitější a tak se do komentářů okolo nich dávají informace, které čtenářům kódu jejich smysl více objasňují. U PHP se nejvíce ustálil zápis PHPdocs. Vznikl z JavaDoc a není nikde formalizovaný, ale je to standard, který se dodržuje nejvíce. 

U funkcí a metod se používá DocBlocks. Začíná vždy `/**` a pokračuje `*` na každém dalším řádku. Nahoru se píše krátké shrnutí, dále delší popis funkce nebo metody a nejblíže ke kódu parametry, co funkce nebo metoda vrací a popřípadě jestli vrhá nějakou výjimku. Opět pro lepší představu uvedu příklad: 

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

Takto vlastně vůbec nemusíme číst kód, stačí prolétnout dokumentaci a hned je vidět, co má za úkol a co funkce nebo metoda dělá. U takto krátké funkce to asi není nutné ani efektivní, ale u delších je to velmi užtečné. 

IDE umí s generováním dokumentace v kódu pomoci. V PhpStorm stačí nastavit kurzor na funkci, kliknout na žlutou žárovku a vybrat `Generate PHPdocs for function`; nebo můžeš před funkci napsat `/**` a stisknout `Enter`. Pro vygenerování základní dokumentace pro celou třídu nebo i projekt můžeš použít funkce kontroly kódu, která se nachází v `Code > Inspect Code`. Ta po potvrzení otevře dialogové okno a tam v řádku PhpDocs pravým tlačítkem zvolíme `Apply Fix`. Tím se vygenerují PHPDocs pro všechny metody v kódu. 

# Formátování kódu
Pro formátování je několik obecných standardů. Pravdou však je, že co projekt a kodér, to jiný styl. Někomu se čte kód lépe s většími odsazeními a někdo třeba preferuje mezery mezi operandy. Možná už máš nějaký svůj styl zaběhaný, možná ho ještě hledáš - na tom není nic špatného. A když se pořád nemůžeš rozhodnout, prostě si jeden vyber a ten potom ve svých kódech používej. 

Jak formátuješ kód ve svých projektech je čistě na tobě. Důležité je zůstat konzistentní. Vyber si tedy mezery nebo tabulátory, hlavně je potom používej všude. Složené závorky odsazuj nebo ne, ale všude je ne/odsazuj stejně. V konzistentnosti hodně pomůže IDE, o tom víc níže. 
 
V práci nebo při sdílených projektech je požadavek na konzistentnost kódu ještě větší. Konzistentní kód je velká výhoda v momentě, kdy v projektu přecházíte z jednoho zákoutí do druhého a všude je kód psaný jakoby jedním vývojářem. Styl potom tolik neruší a je možnost se lépe soustředit na obsah. 

Většina velkých projektů má vypsané či ustálené standardy, které je třeba dodržovat. Důležité je ctít je, ať už je mají sepsané, nebo ne. Na začátku hodně opisujte styl okolo sebe a napodobujte svůj kód tak, jak ho vidíte. Ze začátku se na to sice musíte víc soustředit, později se to stane přirozenou věcí. 

IDE může hodně s formátováním pomoci. V PhpStorm se styl formátování nastaví `Settings > Editor > Code Style > PHP`. Klávesová zkratka pro zformátování kódu je `Ctrl + Alt + L`, používám ji skoro stejně často jako zkratku pro uložení. Někteří lidé si dokonce `Ctrl + S` nastaví na oba dva příkazy dohromady, takže se provedou najednou a nemusí na úpravu kódu dál myslet. 

Vhodné je si i zatrhnout při commitování volbu `Reformat code` pro automatické zformátování před commitem. Potom můžete celé formátování pustit z hlavy a psát svým stylem. Jen občas svůj kód už potom nepoznáte (: Širší náhled na PhpDocs najdete třeba na [SitePointu](https://www.sitepoint.com/introduction-to-phpdoc/). 

# Too Long, Didn't Read?
Komentujte s rozvahou a proč, ne co kód dělá. Dokumentujte v kódu a usnadněte si život automatikou. Ve formátování kódu buďte konzistentní a dodržujte stardardy dané projektem. 

*Mnoho vývojářů už většinu doporučení v tomto krátkém seriálu bude znát a někdy může mít jiný názor. Prosím, ozvěte se do komentářů s čím nesouhlasíte či byste doplnili, věcná polemika je mnohem přínosnější než taktní mlčení.* 
