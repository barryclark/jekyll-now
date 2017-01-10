---
layout: post
title: Jak psát PHP? (3/3) - Úložiště kódu, databáze a frameworky
---

V poslední části přehledu o nástrojích vhodných pro jazyk PHP se podíváme nejen na github + gitlab, řekneme si něco málo o databázích a předestřu základy frameworků. Tady můžete najít [druhý](http://jakpsatphp.cz/Jak-psat-php-Zavislosti+verzovaci-systemy+debugging/) nebo [první](http://jakpsatphp.cz/Jak-psat-php-Zdroje-znalosti+vyvojove-prostredi/) díl série. 

# Úložiště kódu
Když nebudete pracovat sami nebo se budete chtít pochlubit novým projektem,
 
Všechny úložiště poskytují základní funkce jako jsou větvení a klonování kódu, Pull Requesty, Code Review, Issues nebo Markdown Support. 

Nejpoužívanějším úložištěm je [github.com](https://github.com). Je úzce provázaný s gitem a díky němu je možné snadno nahrávat, stahovat, opravovat i větvit cizí i vlastní kód. Jedinnou nevýhodou je možnost soukromých repozitářů pouze v placené verzi. 

[Gitlab.com](https://about.gitlab.com/) je mladší služba, která proti githubu nabízí i soukromé repozitáře a jako jeden z mála úložišť je opensourcovaný a můžete si ho tedy zdarma nasadit i do vlastního řešení. Oproti githubu ale nenabízí sledování jednotlivých uživatelů. 

[Bitbucket](https://bitbucket.org/) není pro projekty tak rozšířený jako předchozí varianty, jako jediný ale nabízí podporu [verzovacího systému Mercurial](https://www.mercurial-scm.org/). Navíc velmi ochotně spolupracuje s dalšími aplikacemi od firmy [Atlassian](https://www.atlassian.com/) jako je [Confluence](https://www.atlassian.com/software/confluence) nebo [Jira](https://www.atlassian.com/software/jira). 

Mezi dalšími chci zmínit [CodePlex](https://www.codeplex.com/) Mezi služby, které nechi doporučovat patří [SourceForge](https://sourceforge.net/), který měl veliké problémy s přibalováním nevyžádaných probramů do všech projektů. Používal se i [Google Code](https://code.google.com/archive/), který ale v roce 2016 ukončil svou činnost a je dostupný jen ve formě archívu. 

# Databáze
Databáze jsou nedílnou součástí PHP i webových aplikací obecně, přesto je vezmu velmi zkrátka - je to disciplína hodná vlastního blogu (šance založit jakpsatdb.cz!). 

Databáze slouží k ukládání dat. Data jdou řešit i jinak, například ukládat do textových souborů či posílat někam mimo aplikaci. Výhodou databází je ale přístupová rychlost a snadná udržitelnost a zálohovatelnost. 

Databáze se obecně dělí na strukturované (relační) a nestukturované. Relační databáze mají pevně danou strukturu tabulek a sloupců v nich. Asi nejpoužívanější je [MySQL](https://www.mysql.com/) od firmy Sun. Další známé systémy jsou [MariaDB](https://mariadb.org/) jako opensource klon MySQL, oblíbený [PostgresQL](https://www.postgresql.org/), [Firebird](http://www.firebirdsql.org/) používaný hlavně v komerční sféře a jednoduchý [SQLite](https://sqlite.org/) vhodný pro malé projekty. 

Do nestukturovaných databází (známých i jako noSQL) se většinou informaci ukládají ve tvaru `klíč:hodnota`. Používají se zejména tam, kde by byla nejasná či příliš složitá struktua relační databáze či při požadavcích na velkou rychlost a objem v jednoduché struktuře, jako je tomu například u dat generovaných z Internet of Things (internetu věcí). Mezi používané NoSQL systémy se řadí [MongoDB](https://www.mongodb.com/) nebo [Redis](https://redis.io/). 

Z pohledu ovládání databáze můžete používat funkce přímo z PHP, jako třeba [mysqli](https://secure.php.net/manual/en/book.mysqli.php) nebo [PDO](https://secure.php.net/manual/en/book.pdo.php). Často se také používá nějaká externí knihovna. Knihovny můžou pracovat s jazykem SQL napřímo, jako kupříkladu [Dibi](https://www.dibiphp.com/), nebo pomocí objektově relačního mapování (ORM), jako třeba [Doctrine](http://www.doctrine-project.org/). 

Pro ovládání databáze uživatelem se nejvíce používá [phpMyAdmin](https://www.phpmyadmin.net/). Za sebe můžu doporučit mnohem lehčí [adminer](https://www.adminer.org/cs/) od [Jakuba Vrány](https://www.vrana.cz/). 

# Frameworky
Ve vývoji webových aplikací je spousta požadavků na funkčnosti, které se prolínají většinou aplikací. Tyto funkce jsou od zkušenějších vývojářů už bezpočetněkrát popsané, vymyšlené a napsané. Neustále probíhají veliké diskuze, jak by se tyto standardní problémy měly nejlépe řešit. A frameworky jsou sady kódu, které by měly tyto běžné problémy implementovat pomocí nejlepšího dostupného řešení. 

Frameworky jsou tedy nástroje, které usnadňují tu nudnější kodérskou práci. Umí řešit například přihlašování uživatelů, routování nebo automatické ošetřování vstupů a výstupů. Dále se také starají o obecnější věci jako je struktura kódu (například rozdělení business logiky oproti vykreslování), řešení závislostí pomocí [Dependency Injection](https://cs.wikipedia.org/wiki/Vkl%C3%A1d%C3%A1n%C3%AD_z%C3%A1vislost%C3%AD) nebo tvorbu jednotlivých instancí tříd pomocí [factories (továrniček)](http://coderoncode.com/design-patterns/programming/php/coding/development/2014/01/19/design-patterns-php-factories.html). 

Frameworků existuje mnoho a stále vznikají další. K těm nejznámějším se řadí [Symphony](https://symfony.com/) a české [Nette](https://nette.org/). Dále se často potkáte s [Laravel](https://laravel.com/) a [Zend](https://framework.zend.com/). Z těch lehčích a snadnějších můžu doporučit začít s [CodeIgneter](https://www.codeigniter.com/) nebo se [SlimFramework](https://www.slimframework.com/). Není na mě rozhodnout, který je nejlepší nebo nejpoužitelnější - každému vyhovuje něco jiného. Pokud nevíte, zeptejte se v okolí nebo online. 

Pokud stojíte před úkolem napsat velkou aplikaci, zvolit si framework jako základ svojí práce je správná volba. Čisté PHP oproti tomu lépe poslouží na psaní jednorázových skriptů, pro řešení specifických úloh a je mnohem jednodušší v něm vypsat na obrazovku `Hello World!`. A také pozor na to, že techniky naučené v jednom frameworku nemusí často fungovat v těch dalších a ani v samotném PHP. 

# Too Long, Don't Read?
Zálohujte si kód i jinam než na vlastní disk. Načtěte si základy o databázích a používejte tu, která se na daný úkol hodí nejvíc. Vyzkoušejte dva tři frameworky a určitě nějaký zvažte, když začnete psát velkou aplikaci. 

*Mnoho vývojářů už většinu doporučení v tomto miniseriálu bude znát a někdy může mít jiný názor. Prosím, ozvěte se do komentářů s čím nesouhlasíte či byste doplnili, věcná polemika je mnohem přínosnější než taktní mlčení.* 