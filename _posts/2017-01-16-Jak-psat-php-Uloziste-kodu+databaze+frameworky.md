---
layout: post
title: Jak psát PHP? (3/3) - Úložiště kódu, databáze a frameworky
---

V poslední části přehledu o nástrojích vhodných pro jazyk PHP se podíváme nejen na github + gitlab, řekneme si něco málo o databázích a předestřu základy frameworků. Navíc si můžeš přečíst [předchozí díl o composeru, gitu a debuggingu](http://jakpsatphp.cz/Jak-psat-php-Zavislosti+verzovaci-systemy+debugging/) nebo [první díl o zdrojích a editorch](http://jakpsatphp.cz/Jak-psat-php-Zdroje-znalosti+vyvojove-prostredi/). 

# Úložiště kódu
Když nebudeš pracovat sám nebo se budeš chtít pochlubit svým novým projektem, musíš svůj kód dát někam online. Kód je vhodné dávat někam, kde se s ním bude dál dobře pracovat, kde ho snadno můžou najít a procházet ostatní a kde ho můžeš jednoduše stáhnout a použít jinde. Přesně pro tyto potřeby vznikly služby, které se specializují na tuto online práci s kódem. 

Nejpoužívanějším úložištěm je [github.com](https://github.com). Je úzce provázaný s gitem a díky němu je možné snadno nahrávat, stahovat, opravovat i větvit cizí i vlastní kód. Jedinnou nevýhodou v neplacené verzi je nemožnost soukromých repozitářů. I přes to bych ho doporučil jako první volbu, protože je vvelmi rozšířený a lze na něj najít spoustu dobrých návodů. 

[Gitlab.com](https://about.gitlab.com/) je mladší služba, která proti githubu nabízí i soukromé repozitáře pro všechny. Jako jedno z mála úložišť je opensourcovaný a můžete si ho tedy zdarma nasadit i do vlastního řešení. Bohužel nenabízí sledování jednotlivých uživatelů a nepoužívá ho tolik lidí jako github. 

[Bitbucket](https://bitbucket.org/) není tak rozšířený jako předchozí varianty, jako jediný ale nabízí podporu [verzovacího systému Mercurial](https://www.mercurial-scm.org/). Navíc velmi ochotně spolupracuje s dalšími aplikacemi od firmy [Atlassian](https://www.atlassian.com/) jako je [Confluence](https://www.atlassian.com/software/confluence) nebo [Jira](https://www.atlassian.com/software/jira). 

Existují i další služby které můžete zkusit, jen se prosím vyhněte SourceForge. Ta měl veliké problémy s přibalováním nevyžádaných probramů do všech hostovaných projektů a je možné, že to dělá dodnes. 

Všechna úložiště poskytují základní funkce jako jsou větvení a klonování kódu, žádosti o rozšíření (Pull Requesty), komentování kódu ostatními (Code Review), hlášení problémů (Issues) nebo podporu dokumentace (Wiki nebo manuály). Pro formátování textu se často na úložištích používá [Markdown](https://cs.wikipedia.org/wiki/Markdown). Neděste se, pokud některému z pojmů nerozumíte. Až tu bude článek popisující verzovací systémy více do hloubky, přibyde tu na něj vysvětlující odkaz. 

# Databáze
Databáze jsou nedílnou součástí PHP i webových aplikací obecně, přesto je vezmu velmi zkrátka - je to disciplína hodná vlastního blogu (šance založit jakpsatdb.cz!). 

Databáze slouží k ukládání dat. Data jdou řešit i jinak, například ukládat je do textových souborů či posílat někam mimo aplikaci. Výhodou databází je ale přístupová rychlost a snadná udržitelnost a zálohovatelnost. 

## Jak se pracuje s databází? 
Program do databázového systému (DMBS) posílá příkazy typicky v jazyce SQL (structured query language), systém je provede a vrátí výsledek. Mezi databázovy systém a PHP se může vložit další programová vrstva (knihovna nebo ORM), která zlepšuje čitelnost a použitelnost příkazů a dat v rámci projektu - více se dozvíš níže. 

Do databáze se pomocí jazyka SQL dají posílat jednoduché příkazy jako `vrať všechny sloupce z tabulky users`, což zapsáno v QL vypadá `SELECT * FROM users`. Příkaz pro vybírání je mocný a dá se hodně rozvinout, jako třeba `SELECT firstname, surname, photos FROM users JOIN userPhotos ON userPhotos.user = user.id WHERE user.gender = 'female' AND user.age BETWEEN 15 AND 25 AND user.city = 'Brno'`, což znamená něco jako `vrať všechny jména, příjmení a fotky uživatelů, kteří jsou ženy, mají od 15 do 25 let a jsou z Brna`. 

## Druhy databází
Databáze se obecně dělí na strukturované (relační) a nestukturované (známé i jako noSQL). **Relační databáze** mají pevně danou strukturu tabulek a sloupců v nich. Tabulky vypadají skoro stejně jako ty v Excelu nebo Calcu, relační databáze mezi nimi navíc definují předem dané vazby. Asi nejpoužívanější relační databázový systém je [MySQL](https://www.mysql.com/) od firmy Sun. Další známé systémy jsou [MariaDB](https://mariadb.org/) jako opensource klon MySQL, oblíbený [PostgresQL](https://www.postgresql.org/), [Firebird](http://www.firebirdsql.org/) používaný hlavně v komerční sféře a jednoduchý [SQLite](https://sqlite.org/) vhodný pro malé projekty. 

Do **nestukturovaných databází** se většinou informace ukládají ve tvaru `klíč:hodnota`. Používají se zejména tam, kde by byla nejasná či příliš složitá struktua relační databáze či při požadavcích na velkou rychlost a objem v jednoduché struktuře. Používají se například u ticketovacích systémů či dat generovaných z internetu věcí (Internet of Things). Mezi používané nestrukturované dtabáze se řadí [MongoDB](https://www.mongodb.com/) nebo [Redis](https://redis.io/). 

Z pohledu ovládání databáze se dají používat funkce nebo knihovny přímo z PHP, jako třeba [mysqli](https://secure.php.net/manual/en/book.mysqli.php) nebo [PDO](https://secure.php.net/manual/en/book.pdo.php). Často se také pro usnadnění práce používá nějaká externí knihovna. Knihovny můžou pracovat s jazykem SQL napřímo, jako kupříkladu [Dibi](https://www.dibiphp.com/), nebo pomocí objektově relačního mapování (ORM), jako třeba [Doctrine](http://www.doctrine-project.org/). Problematika databází je široká a určitě se jí někdy tento blog bude věnovat více. 

Pro ovládání databáze uživatelem se nejvíce používá [phpMyAdmin](https://www.phpmyadmin.net/). Za sebe můžu doporučit mnohem lehčí [adminer](https://www.adminer.org/cs/) od [Jakuba Vrány](https://www.vrana.cz/) - stačí stáhnout `adminer.php` soubor, ten nahrát na webhosting a přes prohlížeč se přihlásit. 

# Frameworky
Ve vývoji webových aplikací je spousta funkcionalit, které se v každém projektu opakují. Tyto funkce i s jejich problémy jsou zkušenějšími vývojáři bezpočetněkrát popsané, dobře vymyšlené i implementované. Tento hotový kód lze nalézt v knihovnách a balíčcích. A když je spojených více takových balíčků dohromady, vznikne **framework**. Frameworky jsou tedy sady kódu, které řeší běžné problémy projektů pomocí nejlepšího hotového řešení. 

Frameworky jsou nástroje, které usnadňují nudnější kodérskou práci. Řeší například přihlašování uživatelů, automatické ošetřování vstupů a výstupů nebo routování. Umí se stararat i o obecnější věci jako je struktura kódu (například rozdělení business logiky oproti vykreslování), řešení závislostí pomocí [Dependency Injection](https://cs.wikipedia.org/wiki/Vkl%C3%A1d%C3%A1n%C3%AD_z%C3%A1vislost%C3%AD) nebo tvorbu jednotlivých instancí tříd pomocí [factories (továrniček)](http://coderoncode.com/design-patterns/programming/php/coding/development/2014/01/19/design-patterns-php-factories.html). 

Frameworků existuje mnoho a stále vznikají další. K těm nejznámějším se řadí [Symfony](https://symfony.com/) a české [Nette](https://nette.org/). Dále se často potkáte s [Laravel](https://laravel.com/) a [Zend](https://framework.zend.com/). Z těch lehčích a snadnějších můžu doporučit začít s [CodeIgneter](https://www.codeigniter.com/) nebo se [SlimFramework](https://www.slimframework.com/). Není na mě rozhodnout, který je nejlepší nebo nejpoužitelnější - každému vyhovuje něco jiného. Pokud nevíte, zeptejte se v okolí nebo online. 

Pokud stojíte před úkolem napsat velkou aplikaci, zvolit si framework jako základ svojí práce je správná volba. Čisté PHP oproti tomu lépe poslouží na psaní jednorázových skriptů, pro řešení specifických úloh a je mnohem jednodušší v něm vypsat na obrazovku `Hello World!`. A také pozor na to, že techniky naučené v jednom frameworku nemusí často fungovat v těch dalších a ani v samotném PHP, zatímco použít PHP ve frameworku jde snadno a téměř vždy. 

# Too Long, Don't Read?
Zálohujte si kód i jinam než na vlastní disk. Načtěte si základy o databázích a používejte tu, která se na daný úkol hodí nejvíc. Vyzkoušejte alespoň jeden menší a jeden velký framework a určitě nějaký zvažte, když začnete psát velkou aplikaci. 

Na prosbu onlinu rozvinu třídílný seriál na čtyři díly a tak pokryjeme i komentování k=odu, jeho základní dokumentaci a jeho formátování. 