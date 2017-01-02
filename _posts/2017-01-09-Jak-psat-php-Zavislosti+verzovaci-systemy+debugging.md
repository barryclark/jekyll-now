---
layout: post
title: Jak psát PHP? (2/3) - Závislosti + verzovací systémy + debugging
---

# Manažer pro závislosti - Composer
[Composer](https://getcomposer.org/) je software řešící závislosti v kódu. V podstatě se stará o to, aby všechny balíčky cizího kódu (na kterých závisíte, proto závislosti) byly stažené, ve správné verzi a nebily se mezi sebou. Composer je umí sám stahovat, komtrolovat nové verze i bezpečně odstraňovat. V PHP dlouho něco takového chybělo a všichni jsme rádi, že tu je (kdo z vás vzpomíná na stahování knihoven z php.net při rozcházení cizího projektu?). 

Pro základní používání Composeru si vystačíte si příkazy pro přidání, aktualizaci a odebrání balíčků a nemusíte ho dál řešit. Ovládá se pomocí příkazového řádku a souboru `/composer.json`. Ten obsahuje seznam všech balíčků a jejich dalších závislosti. Samotné soubory s kódem jsou potom standardně uloženy ve složce `/vendor`. 

Jakmile začnete používat framework nebo cizí kód, Composer se stane neocenitelným společníkem. Rozhodně se vyplatí ho začít používat co nejdříve. Za zmínku stojí, že pomocí něj můžou ostatní používat jednoduše kód váš. Více o jeho instalaci a použití najdete na <https://getcomposer.org/doc/00-intro.md>. 

Obzvláště v již existujícím kódu můžete narazit na starší systém pro správu PHP rozšíření [PEAR](https://pear.php.net/). Ten se používá pro správu PHP komponent, neřeší ovšem závislosti tak elegantně jako Composer a neposkytuje žádnou jinou zásadnější výhodu. Některé knihovny jsou ale historicky dostupné jen přes PEAR, v některých aplikacích se proto používá dodnes. 

# Verzovací systém (Version Control System, zkráceně verzování nebo VCS)
Jsou mezi námi dlouho a používá je míň lidí, než by bylo vhodné. Verzovací systémy slouží ke snadné správě kódu v čase. Můžete se podívat, kdy jaká změna v kódu nastala a který vývojář ji provedl. Umožňují jednoduše provést "rollback" (návrat v čase) nebo souběžný vývoj více různých větví programu a jejich následné sloučení do jednoho finálního projektu. Při vyvíjení v týmu větším než tři lidi už jsou prakticky nepostradatelné. 
 
Verzovací systém ze své podstaty poskytuje nástroje a výhody zálohování. Ve zdrojových kódech nemusí být zakomentované bloky kódu, které využijeme "někdy příště"; z verzování se v případě potřeby dají snadno vytáhnout z historie. Pomocí verzovacích systému se dá i jednoduše zálohovat i jinam než na vlastní disk, o tom ale více příště. 
   
Nejpoužívanějším verzovacím systémem je git (pozor, neplést s <github.com>, který git používá, je to ale cloudový správce kódu>). Git vymyslel a napsal [Linus Torvalds](https://cs.wikipedia.org/wiki/Linus_Torvalds), když vyvíjel Linux. Používá se pro správu takových projektů jako jsou linuxové jádro nebo programovací jazyk Ruby. Je zpočátku složitější na pochopení, ale jeho užitečnost daleko přesahuje počáteční náklady na nastudování. Doporučuju ho používat v podstatě na všechny projekty (mnohdy i na ty neprogramátorské, kde je potřeba pamatovat si historii, kupříkladu diplomek či jiných rozsáhlých textů). Mezi dalšími verzovacími systémy se používají [Subversion](https://subversion.apache.org/) od [Apache](https://www.apache.org/) a [Mercurial](https://www.mercurial-scm.org/) - práce s nimi je podobná jako s gitem, ale žádný jsem zatím nepoužíval a tak je nemůžu doporučit ani od nich odradit. 

Téměř každé IDE umožňuje nějaký stupeň integrace verzovacích systémů, neškodí se ale základy naučit přímo v příkazovém řádku a tedy univerzálně. Dobré návody a rozcestníky na git najdete třeba [tady](https://rogerdudler.github.io/git-guide/), [tady](https://stackoverflow.com/questions/315911/git-for-beginners-the-definitive-practical-guide) nebo [tady](https://www.sitepoint.com/git-for-beginners/). 

# Testování a debugging
Je dobrým zvykem mít kód otestovaný lépe než použitím `echo($foo)` a k tomu ručním proklikáním celého projektu v prohlížeči. To jsou první a intuitivní praktiky, kterými každý z nás prošel a používal, nesmíme na nich ale zamrznout! 

Pro testování projektu se používají automatizované testy. Je třeba tyto testy napsat a je třeba mít aplikaci, která testy provádí. Testování se většinou dělí na Unit Testing (jednotkové testování), který testuje jednotlivé třidy nebo jiné malé celky a Behaviour/Acceptance Testing (testy chování), který testuje chování aplikace jako celku. 

Pro Unit Testing se nejvíc používá [testovací framework PHPunit](https://phpunit.de/). Jako alternativy lze vyzkoušet mnohem jednodušší [SimpleTest](http://simpletest.org/) nebo český [tester](https://tester.nette.org/cs/) používaný ve frameworku Nette. Jako simulaci prohlížeče se pro Behaviour Testing používá [Selenium](http://www.seleniumhq.org/). Můžete zkusit i [Behat](http://behat.org/en/latest/) nebo [PHPSpec](http://www.phpspec.net/en/latest/). Pro komplexní testování lze využít třeba [Codeception](http://codeception.com/). 

Na testování můžete mít postavený celý vývoj. Ti, co to mají zavedené, si to nemůžou vynachválit, je ale těžší pro začínající vývojáře. Tento způsob kódování se nazývá Test Driven Developement (TDD) nebo Behaviour Driven Developement (BDD). Obsáhlejší tutoriál najdete například [tady](https://code.tutsplus.com/tutorials/the-newbies-guide-to-test-driven-development--net-13835). 

Vedle testování se pro ladění aplikace používají debuggery. V zásadě slouží k zastavení aplikace v libovolné fázi běhu a nahlédnutí do proměnných, objektů a podobně. Není potom potřeba rozbíjet výstup aplikace výpisy proměnných, které potřebujeme zkontrolovat. Pro PHP jsou rozšířené debuggery [Xdebug](https://xdebug.org/) (který používám), [Advanced PHP Debugger](https://pecl.php.net/package/apd) nebo [DBG degubber](http://www.php-debugger.com/dbg/). Debuggery jsou standardně implementované do vývojových prostředí a vyplatí se s nimi naučit dobře zacházet, protože umí řádově zrychlit ladění aplikace. 

# Too Long, Didn’t Read?
Začněte co nejdříve používat verzovací systém, nejlépe git. Naučte se ho používat do hloubky a ušetří vám spoustu zbytečných starostí. Mrkněte na Composer. Používejte debugger místo vypisování proměnných  do prohlížeče. Zkuste si vývoj založený na testování; spoustě lidem vyhovuje více než ostatní schémata práce.    

Příště se podíváme kam ukládat projekty, na databáze a dotkneme se PHP frameworků. 