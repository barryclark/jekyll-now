---
layout: post
title: Usare i dati di TerremotoCentroItalia con Google Sheet
categories: blog
---

Come potete leggere qui il nostro progetto consente libero riuso delle informazioni registrate in questo sito. Il che significa che i nostri dati sono aperti e riusabili purchè si citi la fonte dalla quale provengono.

Questo significa che non solo potete condivdere le informazioni registrate su TerremotoCentroItalia o segnalarle, ma che tecnicamente è possibile usare i nostri dati per analisi, statistiche, altri servizi di informazione etc...

Un modo semplicissimo per riusare i dati delle segnalazioni presenti sul nostro portale è quello di usare un foglio Google Sheet.

Questa la procedura:

  - Aprite un nuovo foglio Google Sheet
  - Nella cella A1 scrivete la formula =ImportJSON("https://raw.githubusercontent.com/emergenzeHack/terremotocentro/master/_data/issuesjson.json")
  - Attendere qualche secondo

Fatto. Questo comando non fa altro che importare in modo dinamico i dati presenti nel nostro file delle segnalazioni all'interno del google sheet, formattando le segnalazioni in colonne e rendendole quindi facilmente visibili ed elaborabili se volete fare ulteriori analisi.

La prima riga rappresenta l'intestazione dei dati, in particolare i record principali che potrebbero esservi utili sono:
  - Issue Body: corpo della segnalazione. All'interno vi sono i metadati della segnalazione taggati con appositi campi.
  - Issue Created At: data di creazione della segnalazione
  - Issue Data Cosa: oggetto della segnalazione
  - Issue Data Data: data inserita dall'utente
  - Issue Data Descrizione: descrizione della segnalazione
  - Issue Data Email: email di riferimento
  - Issue Data Immagine: immagine allegata alla segnalazione
  - Issue Data Indirizzo: indirizzo legato alla segnalazione
  - Issue Data Lon: longitudine
  - Issue Data Lat: latitudine
  - Issue Data link: link della segnalazione
  - Issue Labels: tag identificativi della segnalazione
  - State: stato della segnalazione

In questo modo lavorando sui filtri Google Sheet potete estrarre quelle che più vi interessano (ad esempio filtrando sul campo "issue labels"). Ricordatevi che il foglio Google si autoaggiorna via via che le segnalazioni si aggiornano quindi per fare analisi dovete elaborare i dati e poi farne una copia oppure no a seconda che vogliate avere un aggiornamento realtime oppure una "fotografia dei dati" in un certo istante di tempo.
