---
layout: post
title: Sbírání dat z formuláře 
---

Jak a kde v PHP zjistit, jaká data uživatel poslal pomocí formuláře?

_Kódy v článku jsou určené pro pochopení principu přenosu dat z formuláře do jazyka PHP. Nepoužívej je prosím v produkčních aplikacích, chybí jim důležité náležitosti._ 

# Co je potřeba?
Co potřebuješ pro zpracovávání uživatelských informací na straně serveru?
 - u každého vstupu (textové políčko, checkbox, radiobutton...) správně nastavit jeho `id`
 - v souboru na serveru, který informace zpracovává, použít údaje pomocí `$_GET` nebo `$_POST`
 - ve formuláři je potřeba nastavit správně atribut `action`, který určuje, jaký soubor se má pro zpracování zavolat (technicky tam být nemusí, potom se použije atribut `GET`, vždy ho tam ale piš, protože na to není spoleh)

Důležitou věcí je uvědomit si, kde se používají jaké části naší aplikace. Protože vyznávám učení hrou, předestřu zde příklad. Ten bude mít dvě funkční části nebo strany: 
 - **uživatel** - v internetovém prohlížeči se vykresluje text v HTML - tedy i formulář, kam uživatel zadává data. Po stisku tlačítka _Odeslat_ se data odešlou na
 - **server** - tam je může zpracovat jazyk PHP a dál s nimi nakládat - třeba je uložit, přihlásit nebo nepřihlásit uživatele a mnoho dalšího. 

Pro příklad musíš mít zprovozněný PHP server - jak na to se dozvíš třeba ve [článku na JeČas.cz](http://jecas.cz/localhost). 

## Uživatelská část
Budeš potřebovat formulář v HTML, do kterého uživatel zadává informace. Měly by mít dvě textová políčka a tlačítko na odeslání. Soubor pojmenuj `index.html` a kód může vypadat třeba takto: 
 
```html
<!DOCTYPE html>
<form action="zpracuj.php" method="GET">
	1. text: <input id="prvni" type="text"><br/>
	2. text: <input id="druhy" type="text"><br/>
	<input type="submit" value="Zpracuj!">
</form>
```

Důležitý je zejména atribut `action="zpracuj.php"`, což je adresa, na který se bude formulář odesílat a `method="get"`, který určuje, jakým způsobem budou data na server doručena. K tomu se dočteš více za chvíli. Potřebuješ také správně nastavené `id` pro všechny vstupy, abychom je potom podle toho na serveru poznali. 

## Serverová část
Vytvoř si nový PHP soubor jménem `zpracuj.php`, na který soubor `index.html` bude posílat data. Soubor by měl zachytit oba textové vstupy, porovnat je a vypsat, zda jsou stejné či ne a mohl by vypadat třeba: 

```php
<?php
$prvniVstup = $_GET['prvni'];
$druhyVstup = $_GET['druhy'];

if ($prvniVstup === $druhyVstup) {
	echo ('Vstupy jsou stejné. ');
} else {
	echo ('Vstupy stejné nejsou. ');
}
```

To je vše, co potřebuješ - vyzkoušej ho!  

_Pokud ses ztratil nebo kód příkladu nechceš ručně tvořit, nalezneš ho na <https://github.com/tomtomklima/sbirani-dat-z-formulare>. Pokud ti stejně nepůjde zprovoznit, napiš do komentářů a poradím, co s tím._ 

## Úprava z GET na POST
Při vyzkoušení příkladu si můžeš všimnout, že se za výslednou adresou objevily další symboly - něco jako `zpracuj.php?prvni=text&druhy=text`. 

Zkus teď udělat úpravu v souboru `index.html`: 
 - v řádku `<form action="zpracuj.php" method="get">` změň `GET` na `POST` 
 - v souboru `zpracuj.php` zaměň `$_GET` na `$_POST`
Při vyzkoušení znaky z řádku zmizely, skript ale funguje pořád, takže informace stále server zachytává zprávně. Jak to? 

# Proměnné $_GET a $_POST
Všechny informace z formulářů najdeme v superglobální array `$_GET` nebo `$_POST`. Práce s nimi je stejná, jen se každý způsob používá pro něco jiného. Jako klíče se v array použíjí `id` formulářových součástí. Příklad: text z prvku s `id="age"` poslaný metodou GET nalezneme v proměnné `$_GET['age']`. 
 
**Superglobální array** znamená, že je daná pevně od PHP a že do nich můžeme přístupovat kdekoli v kódu. To není vždy žádané řešení. Většina aplikací to řeší obalením těchto array do vlastních struktur, kterým už můžou přířadit žádanou přístupnost. Typicky se používá třída `Request`. 

`GET` a `POST` se liší ve způsobu poslání dat na server. `GET` informace "zabuduje" do adresy a posílá jej ve tvaru `[adresa pro zpracování]?[název prvního parametru]=[hodnota]&[název druhého parametru]=[hodnota]&[název třetího parametru...`. Adresa je omezená na něco přes 2000 znaků, takže GET není vhodný pro posílání dlouhých textů. Informace jsou v adrese viditelné pro uživatele, proto se používá i třeba pro čísla článků (třeba ve tvaru `[adresa]/idClanku=42`) nebo pro vyhledávání. Když si totiž takovou adresu uživatel uloží do záložek, uloží ji i s žádaným článkem či vyhledáním - toto u POST nefunguje. 

`POST` naproti tomu posílá data v hlavičce pro normální uživatele většinou neviditelné (jde zobrazit třeba přes vývojářskou konzoli v každém prohlížeči). Není omezený délkou. Používá se hlavně pro delší texty a pro informace, které nemají být veřejné (například uživatelská jména a hesla). 

Obecně platí, že když se bude výsledek jen **zobrazovat**, měl bys použít metodu `GET`. Když bude výsledek něco **měnit** (ukládat, mazat), měl bys použít `POST`. 

# Too Long, Didn't Read?
Pro správné posílání dat na server potřebuješ mít `<form>`, u něj atribut `method="GET"` nebo `method="POST"` a na serverové straně najdeš data v superglobální array `$_GET` nebo `$_POST`. 
