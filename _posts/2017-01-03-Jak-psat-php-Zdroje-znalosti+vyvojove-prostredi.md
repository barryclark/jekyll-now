---
layout: post
title: Jak psát PHP? (1/3) - Zdroje znalostí + vývojové prostředí
---

Cíl tohoto článku je dát praktický přehled o nástrojích okolo programovacího jazyka PHP. Co je tedy potřeba pro to, abych mohl kvalitně programovat v PHP? 

# Zdroje informací o PHP
Programovací jazyk se někde nebo od někoho musíte naučit. Soukromí učitelé bývají drazí a ti státní jsou sice zadarmo, ale u nich si zase nemůžete příliš vybírat, koho byste rádi. **Proto je nejlepší se držet online materiálů** - bývají zdarma a snadno dostupné. O PHP toho bylo naštěstí napsáno hodně a ještě více v angličtině. Pokud moc cizími jazyky nevládnete, možná je na čase to pomaličku začít měnit.
 
## Dokumentace a statické informace
Základní nástroj na vyhledávání, který není potřeba představovat, je [Google](https://google.com). PHP má velmi [kvalitně zpracovanou dokumentaci](https://secure.php.net/manual/en/), která včetně komentářové sekce velmi dobře poslouží při hledání v základech jazyka. Pokud máte problémy s implementací nebo jiným programátorským problémem, mohu doporučit [StackOverflow](https://stackoverflow.com/questions/tagged/php). StackOverflow je platforma pro formát otázek/nejlepších odpovědí. Začínala jako síť, kde se kdokoliv mohl zeptat na cokoliv programátorského, avšak jak přibývaly otázky, díky karmickému přidělování práv portál začali ovládat privilegovaní uživatelé. Proto je vhodné nejdřív důkladně hledat, než začít rovnou otázky pokládat. Odpovědi tam ale najdete velmi kvalitní a většinou i zasazené do širšího kontextu. 

## Učíme se PHP
Pokud se toužíte PHP spíše učit, mohu jen doporučit [kurz na portálu CodeAcademy](https://www.codecademy.com/learn/php). Je interaktivní, všechno, co se učíte, si také můžete hned vyzkoušet. A samozřejmě existuje nespočet dalších návodů, tutoriálů a průvodců světem  PHP, které lze pohodlně nalézt přes Google. 

## Lidský kontakt
Doporučuji sledovat dění v komunitách a také přímo činnost aktivních lidi. Nejzajímavější jsou pravidelná i jednorázová setkání (meetupy). Je jich mnoho a jejich výběr si můžete nechat posílat pomocí stránky [eventigo.cz](https://eventigo.cz). Z komunit chci doporučit mladé a ambiciózní [PéHáPkaře](http://pehapkari.cz/) i s jejich [Slackem](https://pehapkari.slack.com/) a [twitterem](https://twitter.com/pehapkari). Twitter je vůbec dobrá platforma pro sledování PHP. Víc zajímavých účtů můžete najít na mém [twitterovém profiu v patičce webu](https://twitter.com/tomtomklima). A v neposlední řadě můžete začít sledovat tento blog, nové články tu vycházejí přibližně každý týden. 

# Editor kódu aneb vývojové prostředí (Integrated Developement Editor, IDE)
Ačkoli jsou programátoři, kteří zvládnou napsat nový blogovací systém jednou rukou v notepad.exe pod půl hodiny, většina z nás mezi ně nepatří (včetně mě). Proto byste si pro kvalitní vývoj měli pořídit i kvalitní integrované vývojové prostředí, které s vývojem hodně pomůže. 

Sám delší dobu používám [PhpStorm od firmy JetBrains](https://www.jetbrains.com/phpstorm/). Ti jsou známí zejména díky svému IDE IntelliJ pro Javu, kupříkladu vyvíjejí ale i WebStorm pro frontend vývojáře a DataGrip pro databáze a SQL. PhpStorm je neuvěřitelně rozsáhlý a propracovaný nástroj, začít s ním je ale překvapivě snadné, protože je dost intuitivní a má kvalitní nápovědu. Jedinná nevýhoda je ta, že je placený - za první rok za něj dáte 2,5 tisíce korun, prodlužování licence je potom levnější. Nicméně, existuje tu trik - studenti ho mají zadarmo - stačí zadat číslo svojí ISIC karty. Další možnost je používat jejich [Early Access Program](https://confluence.jetbrains.com/display/PhpStorm/PhpStorm+Early+Access+Program), který nabízí měsíční používání zdarma; přibližně každý měsíc vydávají verzi novou. Pokud nejste student a nemáte žádného v dosahu a nechcete používat nestabilní verze, JetBrains často dává svoje licence jako výhru na spoustu akcí. Takže se stačí slušně umístit na nějakém lokálním hackatonu :)

Mezi další používané editory se řadí [Sublime Text](https://www.sublimetext.com/), který je oproti PhpStormu podstatně lehčí a nabízí mnohem širší paletu doplňkových pluginů, kterými si lze editor dotvořit ke spokojenosti. Jako další známé a mnou nevyzkoušené IDE bych zmínil Eclipse, phpDesigner a Brackets. Existuje i mnoho dalších editorů vhodných pro psaní PHP. Jejich seznam naleznete například na <https://en.wikipedia.org/wiki/List_of_PHP_editors>. 

# Too Long, Didn't Read?
Na psaní kódu si určitě prvně pořiďte kvalitní vývojové prostředí. Já doporučuji [PhpStorm](https://www.jetbrains.com/phpstorm/). Když si s něčím v kódu nebudete vědět rady, navštivte [dokumentaci](https://secure.php.net/manual/en/) nebo [StackOverflow](https://stackoverflow.com/questions/tagged/php). A zaměřte do hledáčku [komunity](http://pehapkari.cz), [twitter](https://twitter.com/tomtomklima) a [tento blog](http://jakpsatphp.cz). 

Příště se těšte na debugging, verzovací systémy a řešení závislostí v PHP! 
