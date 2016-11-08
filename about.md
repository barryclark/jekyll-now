---
layout: page
title: About
permalink: /about/
---

<div class="text-center">
	<a href="#il-progetto" class="btn btn-primary btn-lg" role="button">Il Progetto</a>
	<a href="#credits" class="btn btn-primary btn-lg" role="button">Credits</a>
	<a href="#contatti" class="btn btn-primary btn-lg" role="button">Contatti</a>
	<a href="#press" class="btn btn-primary btn-lg" role="button">Press</a>
</div>

### Il Progetto


Questo è un progetto non profit, organizzato interamente da volontari. È nato per condividere informazioni utili e
verificate sugli eventi sismici che hanno coinvolto il centro Italia durante il 2016.

Il terremoto ha interessato molti comuni del centro Italia causando numerose vittime e notevoli danni. Al momento in cui viene scritta questa pagina le notizie che provengono dalle fonti ufficiali sono sempre in divenire e vengono aggiornate con informazioni dettagliate e puntuali non appena possibile.

Il progetto si pone come scopo quello di aggregare e non disperdere contenuti utili a tutti provenienti da fonti di varia natura (ufficiali e non) al fine creare valore in un momento di crisi per il paese.

Il progetto non vuole in alcun modo sostituirsi a fonti istituzionali di informazione a cui rimandiamo caldamente per l'attendibilità.

Il progetto è descritto tramite il nostro [wiki](https://github.com/emergenzeHack/terremotocentro/wiki).

L'idea è di [Matteo Tempestini](https://twitter.com/il_tempe) e [Matteo Fortini](https://twitter.com/matt_fortini) e nasce a seguito di maturata esperienza di hacking civico, ma il sostegno è di chiunque vuole darlo (privati, associazioni, imprese, istituzioni) purché l'iniziativa non sia strumentalizzata per secondi fini e di questo chi ha ideato il progetto cerca di farsi garante. Sotto riportiamo chi sta già collaborando, ti aspettiamo!


### Credits

Un grazie sentito a :

- Lo staff di [ActionAid Italia](https://www.actionaid.it/) per il supporto, la gestione delle informazioni web, la produzione di contenuti e il dominio.
- [Emergenza24](http://www.emergenza24.org) per il supporto sul web
- [Openstreetmap Italia](https://openstreetmap.it/) per il lavoro di mappatura nelle zone del terremoto
- [Andrea Borruso](https://twitter.com/aborruso); [Nino Galante](https://twitter.com/picomiles); [Maurizio de Magnis](https://twitter.com/olistik); [Sabas](https://twitter.com/__sabas);[Alberto Cottica](https://twitter.com/alberto_cottica); [Piersoft](https://twitter.com/piersoft?lang=it) [Andrea Nelson Mauro](https://twitter.com/nelsonmau) per il loro contributo da civic hackers
- [Francesco Pinzauti](https://twitter.com/pinzauti7);[Timothy Redaelli](https://twitter.com/drizztbsd);[Vincenzo Tilotta](https://twitter.com/SprayLinux) per il loro contributo nello sviluppo software
- [Rosy Battaglia](https://twitter.com/rosybattaglia), [Donata Columbro](https://twitter.com/dontyna), [Marieva Favoino](https://twitter.com/marievafavoino), [Cristina Galasso](https://twitter.com/cristigalas), [Fabio Manfrin](https://twitter.com/FManfri), [Gloria Schiavi](https://twitter.com/gloria_schiavi) per la gestione della comunicazione
- [Chiara Spinelli](https://twitter.com/ChiaraPeggy) per il supporto nella verifica del crowdfounding
- [Valeria Villan](https://twitter.com/Tersillina) per la sua esperienza in crisi management
- Il team della [standbytaskforce](http://www.standbytaskforce.org/) per il supporto
- Marco Milesi e [Piersoft](https://twitter.com/Piersoft) per il bot Telegram
- [Ernesto Belisario](https://twitter.com/diritto2punto0?lang=it) per gli aspetti legali
- Il gruppo di ricerca [geoSDI](http://www.geosdi.org) del CNR IMAA per il supporto ai test della piattaforma e la generazione del servizio WMS

.....
(i ringraziamenti sono in progress ogni giorno....Non avertene a male se non compari ancora, grazie lo stesso!)

### Credit per la Mappa

- [Maptune](https://github.com/gjrichter/maptune)
- [Mapstraction](http://mapstraction.com)
- [Leaflet](http://leafletjs.com)
- [Mapicons](http://mapicons.nicolasmollet.com)
- [Bootstrap](http://getbootstrap.com/)
- [Glyphicons](http://glyphicons.com)

### Contatti
- [Mail](mailto:terremotocentroita@gmail.com): per segnalare informazioni utili;
- [Gruppo Facebook](https://www.facebook.com/groups/1758670357733881/): per condividere informazioni utili;
- [Twitter](https://twitter.com/terremotocentro): dove trovi informazioni già verificate dal team;
- [Gruppo Telegram](https://telegram.me/joinchat/BgW6eEBsI3rLKsJk9L7FJg) per contribuire alla discussione sul progetto;
- [Tutti i canali ufficiali](http://terremotocentroitalia.info/canali/) dove trovi tutte le modalità per partecipare e comunicare con noi.

### Press

|Data         | Dove    | Titolo |
|:------------|:--------|:------|
|{% for member in site.data.press %}{{member.data}} | {{member.dove}} | [{{member.titolo}}]({{member.link}})|
{% endfor %}
