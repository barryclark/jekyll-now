---
layout: post
title: Jak psát PHP? (2/3) - Závislosti + verzovací systémy + debugging
---

Druhý díl přehledu o nástrojích pro jazyk PHP. Mrkneme na composer, git a spoustu dalšího. Minuli jsi první díl o zdrojích znalostí a editorech pro kódování? Najdeš ho [tady](http://jakpsatphp.cz/Jak-psat-php-Zdroje-znalosti+vyvojove-prostredi/). 

# Manažer pro závislosti

## Composer
[Composer](https://getcomposer.org/) je software řešící závislosti v kódu. V podstatě se stará o to, aby všechny balíčky cizího kódu (na kterých vlastním kódem závisíte, proto závislosti) byly stažené, ve správné verzi a nebily se mezi sebou. Composer je sám stahuje, komtroluje nové verze a je umí i bezpečně odstraňovat. Za zmínku stojí, že pomocí něj můžou ostatní používat jednoduše kód váš. 

Pro základní používání Composeru si vystačíš si příkazy pro přidání a aktualizaci balíčků a nemusíš ho dál řešit. Pomocí příkazového řádku přidáš balíček třeba s [Dibi](https://dibiphp.com/) příkazem `composer require dibi/dibi` - tím se vytvoří soubor `/composer.json`, kde teď můžeš najít název balíčku. Samotné soubory se staženým kódem jsou potom standardně uloženy ve složce `/vendor`. Příkaz `composer update` aktualizuje všechny současné balíčky na nejaktuálnější možnou verzi. Při ručním vymazání řádku s balíčkem ze souboru `/composer.json` se dá tento příkaz použít i pro bezpečné odstanění balíčku z projektu pryč. 

Jakmile začneš používat framework nebo cizí kód, Composer se stane neocenitelným společníkem. Rozhodně se vyplatí ho začít používat co nejdříve, protože umí automaticky řešit mnoho problémů, které nastávají s používáním cizího kódu. Více o jeho instalaci a podrobnějším použití najdeš [v dokumentaci na stránce projektu](https://getcomposer.org/doc/00-intro.md). 

## Pear
Obzvláště v již existujícím kódu můžeš narazit na starší systém pro správu PHP rozšíření [PEAR](https://pear.php.net/). Ten se používá pro správu PHP komponent, neřeší ovšem závislosti tak elegantně jako Composer. Některé knihovny jsou ale historicky dostupné jen přes PEAR, v některých aplikacích se proto používá dodnes. V nových projektech ale neposkytuje žádnou výhodu, proto bych ho radil už vůbec nepoužívat. 

# Verzovací systém (Version Control System, zkráceně VCS nebo verzování)
Verzovací systémy slouží ke snadné správě kódu v čase. Můžeš se díky nim podívat, kdy jaká změna v kódu nastala a který vývojář ji provedl. Umožňují v aplikaci provést rollback (návrat v čase) nebo souběžný vývoj více různých větví programu a jejich následné sloučení do jednoho finálního projektu. Při vyvíjení v týmu větším než tři lidi už jsou prakticky nepostradatelné - umožňují vyvíjet projekt po částech a nezávisle implementovat jednotlivé funkce. 
 
Je to nástroj, který ze své podstaty poskytuje výhody zálohování. Ve zdrojových kódech nemusí být zakomentované bloky kódu, které využiješ někdy příště - z verzování se v případě potřeby dají snadno vytáhnout z historie. Dá se také jednoduše zjistit, kdo a kdy změnil a uložil daný soubor a na jakou verzi se zrovna díváš. 

Verzovací systémy jsou zpočátku složitější na pochopení, ale jejich užitečnost daleko přesahuje počáteční úsilí na nastudování. Doporučuju je používat v podstatě na všechny textové projekty (mnohdy i na ty neprogramátorské, kde je potřeba pamatovat si historii; kupříkladu na tvorbu diplomek či jiných rozsáhlejších textů). Výhodou je i snadné zálohování mimo primární úložiště, které se velmi hodí při krádeži nebo fatálním selhání počítače. Potom opláčete pouze hardware a i mnohdy cenější data v něm nezůstanou schovaná a ztracená. 

Nejpoužívanějším verzovacím systémem je git (pozor, neplést s [github.com](https://github.com), který git používá, je to ale cloudový správce kódu). Git vymyslel a napsal [Linus Torvalds](https://cs.wikipedia.org/wiki/Linus_Torvalds). Používá se pro správu takových projektů, jako jsou [linuxové jádro](https://github.com/torvalds/linux), programovací jazyk [Ruby](https://github.com/ruby/ruby) a spousta dalších. Mezi dalšími se používají [Subversion](https://subversion.apache.org/) od [Apache](https://www.apache.org/) nebo [Mercurial](https://www.mercurial-scm.org/) - práce s nimi je podobná jako s gitem, ale žádný jsem zatím nepoužíval a tak je nemůžu doporučit ani od nich odradit. 

Téměř každé IDE umožňuje nějaký stupeň integrace verzovacích systémů, neškodí se ale základy naučit přímo v příkazovém řádku - git se tím stane univerzálně použitelným mezi platformami i vývojovými prostředími. Dobré návody a rozcestníky pro git najdeš třeba [přímo na githubu](https://rogerdudler.github.io/git-guide/), na [StackOverflow](https://stackoverflow.com/questions/315911/git-for-beginners-the-definitive-practical-guide) nebo na [sitepointu](https://www.sitepoint.com/git-for-beginners/). Po napsání článku tady na blog tu najdeš odkaz i sem. 

# Testování a debugging
Je dobrým zvykem mít kód otestovaný lépe než použitím `echo($foo)` a k tomu ručním proklikáním celého projektu v prohlížeči. To jsou první a intuitivní praktiky, kterými každý z nás prošel a používal; nesmíš na nich ale zamrznout! 

Pro testování projektu se používají automatizované testy. Je tedy třeba mít aplikaci, která testy provádí a je třeba tyto testy napsat. Testování se většinou dělí na Unit Testing (jednotkové testování), které testuje jednotlivé třidy nebo jiné malé celky a Behaviour/Acceptance Testing (testy chování), které testuje chování aplikace jako celku. Pro testování se nejvíc používá [framework PHPunit](https://phpunit.de/). Jako alternativu lze vyzkoušet jednodušší [tester](https://tester.nette.org/cs/) používaný v frameworku Nette.  

Na testování můžeš mít i postavený celý vývoj. Tento způsob kódování se nazývá Test Driven Developement (TDD) nebo Behaviour Driven Developement (BDD). Ti, co ho mají zavedený, si to nemůžou vynachválit, je ale těžší pro začínající vývojáře. Obsáhlejší tutoriál najdeš například na [tutplus.com](https://code.tutsplus.com/tutorials/the-newbies-guide-to-test-driven-development--net-13835). 

Vedle testování se pro ladění aplikace používají debuggery. Ty slouží k zastavení aplikace v libovolné fázi běhu a nahlédnutí do proměnných, objektů a podobně. Není potom potřeba rozbíjet výstup aplikace výpisy proměnných, které potřebuješ zkontrolovat. Debuggery jsou standardně implementované do vývojových prostředí a vyplatí se s nimi naučit dobře zacházet, protože umí řádově zrychlit ladění aplikace. Pro PHP je rozšířený debugger [Xdebug](https://xdebug.org/). 

# Too Long, Didn’t Read?
Začni co nejdříve používat verzovací systém, nejlépe git. Nauč se ho používat do hloubky a ušetří ti spoustu zbytečných starostí. Mrkni na Composer. Používej debugger místo vypisování proměnných do prohlížeče. Zkus si vývoj založený na testování; spoustě lidem vyhovuje více než jiná schémata práce.    

Příště se podíváme kam ukládat projekty, mrkneme na databáze a dotkneme se PHP frameworků. 