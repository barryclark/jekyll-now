---
layout: post
title: Un pagina web per segnalare l’emergenza neve in provincia di Teramo
categories: blog
---

*pubblicato in origine sul [blog](http://blog.ondata.it/un-pagina-web-per-segnalare-lemergenza-neve-in-provincia-di-teramo/ "Permalink to Un pagina web per segnalare l’emergenza neve in provincia di Teramo") dell'associazione onData | autore: [Andrea Borruso](https://twitter.com/aborruso)*

La mattina di sabato 21 gennaio 2017 mi ha scritto Barbara Coccagna. È originaria di Teramo e colpita da quello che legge, vede e sente sull'**emergenza neve** in quell'area mi ha inviato questa email:

> […] Secondo me sarebbe utile una piattaforma che consenta di poter segnalare mappando il punto esatto in cui sono ubicate le case delle persone isolate e che magari consenta l'incontro tra mezzi di soccorso (soprattutto di privati volontari) e segnalazioni dei parenti.  
La cosa è diversa se non solo le istituzioni ma chiunque sul web sa esattamente dove si trova chi è bloccato in casa.  
Il tempo è pochissimo e i soccorsi sono lenti. Qualunque idea di una mente illuminata potrebbe salvare vite umane.  
Che tu sappia qualcuno sta lavorando a un progetto di questo tipo? Ti viene in mente qualcosa?[…]

L'incontro con Barbara è un po' come quello con [Erminio][1]: per me è una sconosciuta, ma scatta subito qualcosa e non solo per la gravità della situazione che descrive. Giro subito la sua email ai soci di [onData](http://ondata.it/), "vado di *mumbling*" e dopo poco mi trovo in *hangout* con Lorenzo Perone a immaginare come mettere in piedi rapidamente qualcosa di utile allo scopo.

Parte allora un fitto (quasi 40) e rapido scambio di email tra Barbara, me, Lorenzo e Gianluca Di Carlo (della Provincia di Teramo) e in serata riusciamo a mettere in piedi un **modulo** per raccogliere le **segnalazioni**, basato su [Ona][2].  
Ma più guardavo quanto realizzato, più mi sembrava un duplicato del *form* di [**Terremoto Centro Italia**][3].  
Allora ho scritto in chat a *M&M'S* (Matteo Tempestini e Matteo Fortini), i creatori di TCI. Ero un po' in imbarazzo - sia personale, che tecnologico - ma Tempesta per fortuna mi suggerisce una soluzione con cui cogliere "capre e cavoli": usare il nuovo form costruito per convogliare i dati raccolti sul [contenitore di segnalazioni][4] di TCI.  
Questo contenitore è secondo me la punta di diamante del progetto TCI, con migliaia di segnalazioni raccolte e gestite, grazie a lavoro di "redazione" che delle persone meravigliose fanno da mesi.

L'indomani allora mi sono messo a studiare [le API][5] di Ona, in modo da poterle fare dialogare con [quelle delle issue di GiTHub][6] e produrre delle segnalazioni dentro TCI, con lo stesso schema usato per questo progetto ([qui][7] una d'esempio), in modo che questo nuovo flusso possa essere "trasparente" rispetto alla destinazione.  
Inoltre Barbara ci ha chiesto di poter esporre su una mappa i dati raccolti e Gianluca invece su un foglio elettronico web.

[![Emergenza Neve in Abruzzo: invia una segnalazione](http://wp.ondata.it/ondata/wp-content/uploads/sites/5/2017/01/2017-01-23_09h12_39.png)]()

Gli elementi attivi sono questi:

- il **modulo** creato per raccogliere le segnalazioni [https://enketo.ona.io/x/#YBjh](https://enketo.ona.io/x/#YBjh);
- il centro di **raccolta** delle **segnalazioni** di TCI [https://github.com/emergenzeHack/terremotocentro_segnalazioni/issues](https://github.com/emergenzeHack/terremotocentro_segnalazioni/issues);
- la **mappa** creata per raccogliere queste segnalazioni [http://umap.openstreetmap.fr/it/map/emergenza-teramo-segnalazioni-emergenza-neve_122333](http://umap.openstreetmap.fr/it/map/emergenza-teramo-segnalazioni-emergenza-neve_122333).

È stato semplice: un po' per la forza che stimola una richiesta di questo tipo, un po' perché la parte tecnologica è robusta e ben documentata, e sopratutto per avere a disposizione un *hub* come quello di Terremoto Centro Italia (che, mi ripeto, ha alle spalle delle persone meravigliose e ormai esperte).

Ma il bello arriva lunedì 23, di pomeriggio: mi chiama Gianluca (che lavora in Provincia di Teramo) e mi dice "le segnalazioni che vengono dal form costruito per Teramo, allora le gestiamo noi".  
È una gran cosa, la **Pubblica Amministrazione** entra in modo ufficiale e concreto in questo processo di *civic tech*.

Mi auguro che quanto fatto possa essere utile. **Ringrazio Barbara** per essere apparsa in modo inatteso tra i messaggi di posta elettronica e averci dato questa opportunità.


[1]: https://medium.com/@aborruso/il-bello-dellintern%C3%A8t-1f93705fe8e8#.j3b2uvv5j
[2]: https://ona.io/
[3]: http://terremotocentroitalia.info/
[4]: https://github.com/emergenzeHack/terremotocentro_segnalazioni/issues
[5]: https://ona.io/static/docs/index.html
[6]: https://developer.github.com/v3/issues/
[7]: https://github.com/emergenzeHack/terremotocentro_segnalazioni/issues/2182
