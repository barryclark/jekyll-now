---
layout: post
title: Git v příkazovém řádku
---

Hutný soupis příkazů pro Git aneb Jak používat Git v příkazové řádce?

Tento článek je spíše seznamem příkazů pro Git s krátkým vysvětlením než návodem, jak začít s Gitem. Pro podrobnější a důkladnější vysvětlení základů zkus [dřívěji publikovaný článek o Gitu v PhpStormu]({{site.baseurl}}/git_v_PhpStormu/). 

# Instalace
Nainstaluj si Git. Pro osX najdeš návod třeba na [code.google.com](http://code.google.com/p/git-osx-installer/downloads/list?can=3), pro Windows na [github.io](https://git-for-windows.github.io/) a pro Linux na [git-scm.com](http://git-scm.com/book/en/Getting-Started-Installing-Git). Úspěšnou instalaci ověříš třeba příkazem pro nápovědu

```
git help
```

Správě by ti měl ukázat všechny nově dostupné možnosti Gitu. Pokud ne, někde v instalaci nastala chyba. 

# Základní příkazy

## Nový repozitář
Vytvoř si složku pro nový projekt. Otevři ji v příkazovém řádku a v ní spusť příkaz

```
git init
```

Tím se pro tuto složku vytvoří nový gitový repozitář. Data repozitáře jsou uložená ve složce _.git_. 

## Zkopírování (checkout) repozitáře
Zkopírovat nebo slagnově checkoutnout celý repozitář s aktuálním stavem projektu se vykoná příkazem

```
git clone [cesta k novému repozitáři]
#takže pro github třeba
git clone https://github.com/tomtomklima/tomtomklima.github.io.git
```

## Přidání souboru do repozitáře a vytvoření commitu
Soubor se do repozitáře sám **nepřidá**, dokud se Gitu specificky neřekne, že ho má přidat. Soubory se tedy nepřidávají automaticky - je to neintuitivní, ale ve výsledku velmi užitečné. 

```
git add index.php #přidej soubor index.php
#nebo
git add * #přidej všechny soubory v aktuální složce
```

Pro odeslání všech změn do commitu použij příkaz

```
git commit -m "zpráva, která popisuje commit"
```

Tímto se soubory dostanou do lokálního repozitáře, ale ještě ne do toho vzdáleného. 

## Nahrání změn do vzdáleného repozitáře
Když jsi spokojený se stavem svého lokálního repozitáře, můžeš ho svěřit světu. 
 
Pokud je projekt *klonovaný*, není potřeba vzdálený repozitář přidávat ručně, git už ho tam přidal sám. Pokud jsi svůj projekt neklonoval, ale *vytvářel nový*, je potřeba do repozitáře přidat tvůj nový vzdálený repozitář třeba na githubu (nezapomeň si ho tam online založit!) pomocí příkazu

```
git remote add origin [cesta na vzdálený repozitář]
#takže třeba 
git remote add origin https://github.com/tomtomklima/muj-novy-awesome-projekt
```

Teď můžeme nahrát (pushnout) změny na vzdálený repozitář příkazem

```
git push origin master
```

## Současný a minulý stav repozitáře
Abys zobrazil současný stav repozitáře, napiš příkaz

```
git status
```

Pro kontrolu, co vlastně Git zaznamenal v čase, napiš

```
git log
```

Pro zobrazení logu s jedním commitem na řádek použij
```
git log --pretty=oneline
```

a pro hezký ASCII art zobrazení větví třeba
```
git log --graph --oneline --decorate --all
```

Nastavení příznaků pro příkaz `git log` je hodně. Všechny najdeš pomocí `git log --help`. 

A to je ze základních příkazů vše, teď můžeš používat Git jako každý průměrný uživatel! 

# Pokročilé příkazy

## Větvení (branching) projektu na víc verzí
Větve v Gitu se používají pro držení více verzí projektu najednou. Hlavní projekt je většinou obsažen v hlavní větvi standardně pojmenované `master`. Když chceš začít v projektu vyvíjet novou funkci, tak je nejlepší pracovat na své vlastní, nezávislé verzi (větvi) kódu a teprve až s ní budeš spokojený, obě větve projektu spojit - nebo přesněji, provést se svou větví do té hlavní *merge* (bude vysvětleno níže). 

Novou větev projektu založíš příkazem

```
git checkout -b nova-funkce-foo
```

Pro změnu aktuální větve, kde pracuješ, použij příkaz

```
git checkout [chtěná větev]
#tedy pro hlavní větev
git checkout master
#a zpět do naší nové větve
git checkout nova-funkce-foo
```

Na smazání větve, kterou už nepotřebuješ, napiš příkaz

```
git branch -d [nepotřebná větev]
#takže třeba
git branch -d nova-funkce-foo
#a pokud chceš větev smazat, i když není nikde zařazená
git branch -D nova-nepotrebna-funkce-boo
```

## Aktualizace projektu
Aktualizace ze vzdáleného repozitáře do lokálního se provádí příkazem

```
git pull
#nebo při potřebě konkrétní větve
git pull [vzdálený repozitář] [žádaná větev]
#takže
git pull origin master
```

Je důležité aktualizaci dělat často, protože bys jinak mohl pracovat s neaktuálním kódem a třeba vyvíjet či opravovat něco, co už jiný vývojář zvládnul před tebou. V praxi se pro představu spouští minimálně ráno a potom třeba po obědě. 

## Spojení (merge) různých verzí projektu
Pro náhled spojení dvou verzí projektu použij příkaz 

```
git diff [zdrojová větev] [cílová větev]
# tedy pro nás
git diff nova-funkce-foo master
```

Pro spojení tvé lokální verze do hlavní větve projektu (nezapomň přepnout do hlavní větve pomocí `git checkout master`) použij příkaz

```
git merge [tvoje větev]
#pro tebe tedy
git merge nova-funkce-foo
```

Merge může vyústit ve dva výsledky. V lepším připadě proběhne merge čistě a všechno je dobré. Někdy se ale Git nemůže rozhodnout, která změna je správná (zda nová, stará nebo nějaká jejich kombinace) a příkaz vyústí v **conflict**. Stává se typicky při snaze udělat v kódu změnu tam, kde už nějaká změna od rozdělení větví nastala. Konflikty je třeba vyřešit ručně. Po vyřešení znovu použij příkaz `diff` pro kontrolu a `merge` pro spojení. 

## Vrácení změn
V případě že se do kódu beznadějně zamotáš a už se nevíš rady, bývá nejrychlejší začít zase od začátku. 

Pro vrácení obsahu souboru stačí použít příkaz

```
git checkout -- [název souboru]
#tedy třeba
git checkout -- index.php
```

Smazání všech lokálních změn a navrácení projektu do stejného stavu jako je ve vzdáleném repozitáři provedeš příkazem

```
git fetch origin #aktualizace vzdáleného repozitáře
git reset --hard origin/master
```

To je zatím z pokročilých příkazů vše. Chybí ti nějaký příkaz nebo řešení časté situace? Ozvi se, rád je doplním!

# Odkazy a zdroje
Návodů na git je mnoho a stále vznikají další. Na jejich vyhledání je nejlepší použít [Google](https://www.google.com). 

Inspirací pro článek byla volná inspirace zdroje *git - the simple guilde* na adrese <https://rogerdudler.github.io/git-guide/>. 