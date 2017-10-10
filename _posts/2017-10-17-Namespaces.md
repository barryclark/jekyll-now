---
layout: post
title: Namespaces
---

Namepsaces dělí začínajícího programátora od mírné pokročilého.

# Přiblížení jmenných prostorů

Namespaces, česky jmenné prstory, v podstatě fungují jako jakési imaginární složky pro kód, do kterých se zařazují jednotlivé třídy. Jestli progarmuješ v Javě nebo v C#, budou ti důvěrně známé, protože v PHP se používají velmi podobně. Přibyly v verzi 5.3 a byla to jedna s nejdůležitějších změn v této verzi.

Výhody použití namespaces jsou stejné jako při používání složek pro soubory v normálním systému - najednou nemusíš mít hromadu souborů na jedné hromadě, ale je možné je mít roztřídené do logických složek. Pro tři soubory to asi nemá význam, pro tři sta tříd už je to velmi zajímavé.

V různých namespaces lze používat stejně pojmenované třídy i funkce, stejně jako je možné mít stejné soubory v různých složkách. Tuto vlastnost oceníš zejména když začneš používat cizí kód - najednou můžeš přestat řešit, že si někdo pojmenovat funkci stejně jako ty (což vůbec není dobré).

Namespaces jsou v PHP hierarchické, můžeš je tedy vnořovat navzájem do sebe.

S namespaces úzce pracují standardy PSR-0 (zastaralý) a [PSR-4](http://jakpsatphp.cz/PSR4/). Tyto standardy určují, jak namespaces používat a vyplatí se o nich aplespoň vědět, když už ne rovnou používat.

# Použití

Namespace musí být definované na vrchu PHP souboru, takže například jako

```php
<?php

namespace ApplicationOne;
```

Takový soubor teď celý patří do namespacu pojemnovaného `ApplicationOne`. V rámci souboru je není možné zanořovat, lze ale mít více namespaces v jednou souboru, jako třeba

```php
<?php

namespace ApplicationOne;
// stuff

namespace DifferentOne;
// different stuff

namespace Database {
	// another stuff with alternative syntax
}
```

Takovéto řešení namespaces bych nedoporučoval, ale lze to.

## Hierarchie

Používat vnořené namespaces lze třeba takto:

```php
<?php

namespace ApplicationOne/Service;
public function functionService() {
	// service stuff
}

namespace ApplicationOne/Service/Database;

static class Connector {
	static public functionStuff() {
		// stuff
	}
}
```

## Globální namespace

Všechny třídy, funkce, proměnné a konstanty, které nemají daný namespace, jsou alokovány v **globálním namespace**. Ten je dostupný pomocí znaku zpětného lomítka - `\`. Opět se podívej na příklad:

```php
<?php

functionOne() {
	// stuff
}

namespace ApplicationOne();

// volání globálního namespace v pojmenovaném namespace
\functionOne();
```

## Volání

Když voláš třídu nebo funkci z namespace, při jejím použití musíš předstadit správný namespace se zpětným lomítkem. Příklad volání pro minulý kód:

```php
<?php

\ApplicationOne\Service\functionService();
\ApplicationOne\Service\Database\Connector::functionStuff();
```

Pokud danou funkci nebo třídu potřebuješ často, je velmi nepraktické opisovat dlouhé řetězce vnořených namespaces. Proto se může používat `use` pro import často používaných namespaces. Příklad výše by se dal přepsat následujícím způsobem:

```php
<?php

use ApplicationOne\Service;
use ApplicationOne\Service\Database\Connector

functionService();
Connector::functionStuff();
```

Tento import pomocí `use` se může i pojmenovat, takže je to potom spíše zkrácení názvu. Opět příklad:

```php
<?php

use ApplicationOne\Service as Sr;
use ApplicationOne\Service\Database\Connector as C;

Sr\functionService();
C\Connector::functionStuff();
```


# Alternativy

Pokukd z nějakého důvodu nechceš používat namespaces (třeba že používáš PHP verze 5.2 nebo nižší), moc možností není. Jednu z variant používá například Wordpress, který všechny své funkce pojmenovává s prefixem `wp_`.

Jinou možností je pečlivě si kontrolovat všechny třídy a funkce, že žádná nepoužívá stejné jméno, s čím by mohlo pomoci kvalitní IDE.

# Další materiál pro studium
Pěkný třídílný souhrn v angličtině najdeš na [SitePointu](https://www.sitepoint.com/php-53-namespaces-basics/), delší článek na [blogu Daylera Reese](https://daylerees.com/php-namespaces-explained/) a [vyčerpávající popis klasicky v manuálu](https://secure.php.net/manual/en/language.namespaces.php).

# Too Long, Didn't Read?
 Namespaces fungují jako složky pro kód. Mohou být hirearchické. A pokud máš alespoň dvě minuty času, zkus tutoriál na [Knup univerzity](https://knpuniversity.com/screencast/php-namespaces-in-120-seconds/namespaces).