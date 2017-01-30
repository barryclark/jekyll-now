---
layout: post
title: Git v PhpStormu a Github.com - jak začít?
---

[Git](https://git-scm.com/) je **verzovací systém**. Co to znamená? Je to systém umožňující správu souborů v čase. 

Svého druhu verzovací systém je třeba i _Historie revizí dokumentů_ používaných v Google dokumentech nebo prosté _Zpět_ a _Dopředu_ používané v prohlížečích. Oproti tomu [Github](http://github.com/) je internetová služba, která Git využívá a díky ní je spolupráce ve více lidech velmi zjednodušená. V základu je pro opensourcované projekty zdarma a v článku ho budu používat spolu s gitem. 

# Proč zrovna Git?
Git byl stvořený hlavně pro práci s **textovými soubory** - programátorské kódy jsou přeci jen snůška texťáků, proto Git funguje hlavně pro kodéry a jejich práci. Dobře bude fungovat třeba i pro psaní knihy, blogu (tento blog je taky verzovaný v Gitu) nebo i bakalářky či diplomky. 
 
Git poskytuje pohled na texty v čase. Díky tomu se už nemusí ukládat víc verzí jednoho dokumentu ručně. Navíc velmi zjednodušuje spolupráci více lidí najednou nebo udržování více paralelních verzí projektu - tam se projeví jeho pravá síla. 

Git je primárně určen pro ovládání z příkazové řádky. Většina IDE ho ovšem má integrovaný, proto je možné používat klávesové zkratky a rozbalovaní meníček přímo v editoru. A to bude náš případ - zbytek článku budu popisovat práci v PhpStormu. Jestli máte zájem se naučit používat Git nativně, několik odkazů na kvalitní návody jsem připojil na konec článku. 

# Praxe - jdeme na to!
Jestli se chceš s Gitem naučit v příkazovém řádku (což je těžší, ale užitečnější), přeskoč na [další článek, který vyjde týden po tomto](http://jakpsatphp.cz/git-v-prikazovem-radku). Zbytek článku je psán pro PhpStorm 2016, práce v novější verzi ale bude velmi podobná. 

> Všechny praktické rady budou formátovány tímto způsobem. Pokud chceš rychle načíst jen teorii, tyto pasáže přeskakuj - ovšem nedoporučuju to, protože půlka mojí práce potom přijde nazmar. 

## Repozitář
Místo, kde se všechna Gitovská magie odehrává, se nazývá **repozitář** nebo i slangově **repo**. Repozitář je složka v počítači, kterou Git sleduje. Dá se určit, že se nějaké soubory sledovat nemají (například lokální konfigurace, privátní klíče nebo přístupová hesla), nemůžeme ale do repozitáře zahrnout soubory mimo tuto složku. 

> Založ si nový Gitový repozitář. Jak na to? Vytvoř si nový projekt v PhpStorm a vyber z horní nabídky _VCS_ (zkratka z Version Control Systems) > _Enable Version Controll Integration..._, tam vyber _git_ a potvrď. Tím se vytvořil Gitový repozitář pro celý projekt. Když se teď podíváš do složky s projektem, objevila se tam nová složka _.git_ Pozor, je označená systémem jako skrytá, takže bude viditelná až po povolení zobrazování skrytých souborů. Jestli ji nevidíš, nemusíš to moc řešit, není to příliš důležité. Když tuto složku smažeš, efektivně tím zrušíš repozitář, kde složka _.git_ byla. 

## Commit
Základním kamenem pro práci s Gitem je **commit**. Commit je zachycení stavu souborů tak, jak zrovna jsou. Commit jako takový není dál dělitelný, je tou nejmenší jednotkou, s kterou se při běžném používání v Gitu potkáš. Commity se řadí za sebou v čase, jeden následuje druhý tak, jak byly postupně pořizovány. 

> Vytvoř si nový soubor `index.php`. V tomto momentě by měl PhpStorm nabídnout přidání souboru do verzovacího systému - tuto nabídku potvrď. Pokud ji nenabídl, klikni pravým tlačítkem myši na soubor a z místní nabídky vyber _Git_ > _Add_. Název přidaného souboru se defaultně zbarví z červené do zelené - to značí, že je soubor nově přidaný do verzovacího systému. 
> Do `index.php` zapiš obligátní pozdrav celému světu, aby si měl dál s čím pracovat. Vlož tedy třeba
 
 ```php
 <?php echo('Hello World!');
 ```
 
> A teď soubor ulož v čase - slangově commitni. Zvol z horního menu _VCS_ > _Commit changes_ (klávesová zkratka _Ctrl + K_). Otevře se okno, do kterého v dolní části vlož popis commitu (commit message), třeba `první commit`. Okno potvrď a je to! 

Správné vymyšlení názvu a popisu commitu (commit message) je celkem náročné. Jsou to totiž zásadní informace, podle kterých se potom v commitech dá nebo nedá vyznat. Název commitu by měl být výstižný a vyjadřovat, co commit s projektem dělá. Dobré názvy jsou třeba `added sending request via API gate` nebo `fixed parsing for emails`. Naopak se vyhni popisům typu `repaired` nebo: `next commit`. Výjimku tvoří používaný `initial commit` pro úplně první commit oobsahující třeba jen `readme.md` nebo stávající kód nově přesunovaný do repozitáře. Pozor si tady dej při názvech typu `fixed bug #42`. Na první pohled je to dobré řešení, problém ale nastane, když se změní systém pro zaznamenávání bugů (bugtracker). Tuto informace je lepší zmínit spíše v popisu. 

Název commitu by se měl vejít do 50 znaků, do popisu commitu potom patří zbytek. Nepiš tam ale podrobný výčet všeho, čeho všeho se commit dotkl - to si čtenář může najít přímo v kódu. Do popisu patří třeba důvod zvolení daného řešení nebo jiné podobně vysvětlení. 

Ve velkých projektech se stejně jako na čistotu kódu dbá i na čistotu názvů commitů a jejich popisů. Všechny commity tam jsou popsány stejným stylem - jen tak lze udržet v rozsáhlých projektech přehled a pořádek. Tento přístup se hodí dodržovat i v malých a svých projektech - stejně jako správná úprava kódu tě v budoucnosti ušetří od nejednoho bolení hlavy. Osobně popisuji commity pouze v angličtině a vždy začínám slovesem v minulém čase - popisuji tím, co se s projektem stalo, když se commit objevil. Není to ale jediný ani univerzálně správný způsob. Příklady najdeš v [repozitáři tohoto blogu](https://github.com/tomtomklima/tomtomklima.github.io). 

## Vzdálený repozitář
Repozitářů může být pro jeden projekt i více a tady přichází ke slovu Github. Github slouží jako hosting pro **vzdálený repozitář** (remote repository), což je výraz pro složku s projektem někde jinde než lokálně. Důležité je, že repozitáře se automaticky nesynchronizují, jak by někdo mohl čekat. Vypadá to neprakticky, ale má to svoje výhody: díky tomuto triku si můžeme udržovat rozpracovanou práci (klidně verzovanou commity) a nikam ji ještě nenahrávat online, když není hotová, takže ji ještě nikdo nemusí vidět. 

Práci se vzdáleným repozitářem zabezpečí příkazy **push**, který práci nahraje online a **pull**, který aktuální projekt stáhne a lokálně uloží. 

> Připrav se na založení si **vzdáleného repozitáře** na Githubu a nahrání svého rozpracovaného projektu. Zaregistruj se nebo přihlaš na [Github](https://github.com/). Po přihlášení klikni na tlačítko s pluskem vpravo nahoře a vyber položku _New repository_. Zvol jméno (například `hello-git`) a klikni na _Create repository_. 
> Vrať se zpátky do PhpStormu a ve svém projektu z horního menu zvol položku _VCS_ > _Git_ > _Push_. V dialogu je vidět seznam commitů (tvůj jeden `první commit`) a na horní liště klikací položku `master -> define remote`. Klikni na ní a do kolonky URL zadáme adresu vedoucí k založenému repozitáři na githubu, který jsme před chvíli opustili. Potvrdíme, zadáme přihlašovací jméno a heslo a znovu potvrdíme. Pro kontrolu refreshneme stránku s githubím repozitářem a v prohlížeči je vidět náš `index.php` online. A to je vše, projekt máme nahraný ve vzdáleném repozitáři! 
 
## Update projektu
Představ si, že se do tvého projektu nadchnul druhý vývojář jménem Nina. Nina si projekt prohlédla online a po získání práv od tebe jako vlastníka si teď chce projekt stáhnout, aby na něm mohla začít pracovat, a potom ho chcě opět nahrát, aby ses ke změnám dostal i ty. 

Nina si založí v PhpStormu nový projekt a zkušeně vybere _Checkout from verison control_ > _GitHub_. Do dialogu vloží webovou adresu projektu, potvrdí a projekt má stažený lokálně u sebe, jednoduše a rychle. 

Po přidání svého kódu projekt commitne a pushne ho zpět na github stejně, jako před tím ty. Github ti pošle email, že Nina projekt aktualizovala a ty by sis měl stáhnout novější verzi, abys třeba nezačal kódovat něco, co už Nina zapracovala za tebe. 

V PhpStormu získáš aktuální verzi projektu přes volbu _VCS_ > _Git_ > _Pull..._ (nebo zkatkou _Ctrl + T_) a potvrzením dialogu. Pokud mezitím neuděláš žádně konfliktní změny (nebo žádně změny jako takové), projekt se aktualizovat a ty máš u sebe Nininu práci. 

# Jak a kam dál?
Pro git a Gihub je na internetu celá řada kvalitních tutoriálů, například na [Treehouse](http://blog.teamtreehouse.com/git-for-designers-part-1), na [blogu Rogera Dudlera](http://rogerdudler.github.io/git-guide/) nebo na [Pluralsightu](https://www.pluralsight.com/blog/software-development/github-tutorial). Čím více ho budeš využívat, tím více se ti dostane pod kůži a stane se tvojí přirozenou věcí stejně jako ukládání. 
 
 Mimo git existují i jiné verzovací systémy, například [Mercurial](https://www.mercurial-scm.org/) nebo [Subversion od Apache](https://subversion.apache.org/). Pro Github jsou alternativy také, kupříkladu [GitLab](https://about.gitlab.com/) či [BitBucket](https://bitbucket.org/). Pokud ti něco doporučeného z článku nevyhovuje, vyzkoušej třeba tyto alternativy. Verzování za to stojí! 
 
 # Too Long, Don't Read?
Základem práce s Gitem je **commit**. Ty se ukládají do **lokálního repozitáře**. Pro ukázání kódu světu se používá **vzdálený repozitář**, hosting na něj poskytuje například github.com. Při práci v PhpStormu se při práci s gitovým repozitářem používá menu **VCS** (zkratka z Version Control Systems). 