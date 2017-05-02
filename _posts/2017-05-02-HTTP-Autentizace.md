---
layout: post
title: HTTP autentizace
---

Jak použít HTTP autentizaci pro jednoduchou ochranu webu heslem?

# K čemu to slouží
HTTP autentizace slouží k základnímu omezení přístupu uživatelů na část webu. Pomocí HTTP hlaviček, se kterými standardně pracují všechny moderní prohlížeče, se umí uživatele zeptat na login a heslo a ty předat na server. 

Mezi nevýhody se řadí špatné zabezpečení přenosu hesla. Tuto metodu tedy používej výhradně v kombinaci s HTTPS. 

# Příklad pro PHP
Nejlépe k ilustraci použití v PHP poslouží komentovaný příklad: 

```php
// označení úspěšného přihlášení (odborně flag)
$LoginSuccessful = false;
 
// kontrola vyplnění údajů klientem
if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
    
    $Username = $_SERVER['PHP_AUTH_USER'];
    $Password = $_SERVER['PHP_AUTH_PW'];
    
    // kontrola správnosti přihlašovacích údajů
    if ($Username == 'jmeno' && $Password == 'heslo') {
        $LoginSuccessful = true;
    }
}
 
// je všechno správně?
if (!$LoginSuccessful) {
    
    // při prvním přístupu se uživateli zobazí nabídka s textem `Zadej login a heslo: `
    header('WWW-Authenticate: Basic realm="Zadej login a heslo: "');
    header('HTTP/1.0 401 Unauthorized');

    // při nesprávných údajích (většinou po třech pokusech) se uživatel dostane sem
 
    echo 'Přihlášení nebylo úspěšné :-(';
 
} else {
    // při správných údajích se uživatel dostane sem
    echo 'Tajná stránka!';
}
```

# Příklad pro Apache2

Omezení přístupu pomocí HTTP hlaviček jde vynutit i přímo na serveru, například pomocí následujích souborů: 

```
soubor .htaccess

AuthType Basic
AuthName "Zadej login a heslo: "
AuthUserFile cesta/k/.htpasswd/souboru
AuthUser valid-user
```

```
soubor .htpasswd

#username je jmeno a heslo je password. Heslo musí být zakódováno do Base64
jmeno:cGFzc3dvcmQ=
```

K tomuto způsobu použití najdeš víc na [webu apache.org](https://httpd.apache.org/docs/current/howto/auth.html). 

# Technické fungování komunikace

## Server
Server by měl při neautorizaci vrátit status `HTTP 401 Unauthorized` a `WWW-Authenticate` pole. 

**Odhlášení** se nedá řešit nijak přímo. Serveru stačí poslat hlavičku se statusem 401. Klient většinou záměrně pošle nový request se špatnými přihlašovacími údaji. 

## Klient
Klient, který se chce autentizovat, použije `Authorization` pole, kam pomocí Base64 zakóduje své jméno a heslo (více podrobností v odkazech dole). Může se použít s jakoukoli metodou, nejen `GET`. 

Jsou tři druhy autentizačních **mechanizmů**: 
 - **Basic** - údaje se posílají nešifrovaně zakódované do Base64 (používat pouze přes HTTPS), 
 - **Digest** - heslo se zde posílá zahashované pomocí MD5 (takže stále radši používat přes HTTPS), 
 - **NTLM** - zde se používá zabezpečený přenos dat, ale funguje pouze při HTTP/1.1 a nemusí správně prostupovat některými proxy servery. 

Jméno a heslo se daly zakódovat i do URL přidáním `jmeno:heslo@` před cílovou stránku. Tento způsob je ale označený jako `deprecated` (překonaný), takže by se neměl používat. Některé prohlížeče, jako například Chromium, už ho ani nepodporují. 

# Další čtení
Více si můžeš o tématu anglicky přečíst na [blogu Narayana Prustyho](http://qnimate.com/understanding-http-authentication-in-depth/), nebo tradičně zhuštěně na [anglické Wikipedii](https://en.wikipedia.org/wiki/Basic_access_authentication ). 

# Too Long, Didn't Read?
HTTP autentizace je jednoduchý způsob, jak omezit přístup do části webu. Dá se použít v PHP nebo přímo přes server (viz příklady výše). 
