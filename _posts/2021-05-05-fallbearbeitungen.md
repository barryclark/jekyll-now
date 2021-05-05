---
layout: post
title: "Erstellen einer Fallbearbeitung in Markdown"
---

## Motivation

Im Rahmen der Besprechung des ausservertraglichen Haftpflichtrechts in
der Klasse cW\_18-22 habe ich eine Musterlösung in Markdown verfasst.
Markdown bietet die Möglichkeit, den gleichen Inhalt in
unterschiedlichen Formaten abzugeben. Da es sich bei Markdown um reine
Textdateien handelt, bietet sich darüber hinaus die Möglichkeit, mit Git
eine Versionskontrolle sicherzustellen.

Der untenstehende Text ist eine aus dieser Erfahrung entstandene
Anleitung, die verwendeten Werkzeuge für andere Schreibprojekte
einzusetzen.

## Erforderliche Software

Für das Projekt braucht es folgende Software:

* **Texteditor** - Grundsätzlich gib es auf jedem Computer einen Texteditor.
  Die meisten vorinstallierten Editoren sind allerdings ziemlich
  rudimentär.
  Aus Gründen des Komforts empfehle ich hier [Typora](https://typora.io/).

* **Pandoc** - [Pandoc ](https://pandoc.org/) ist das Programm, mit dem Texte von
  unterschiedlichsten Ausgangsformaten in die unterschiedlichsten
  Zielformate umgewandelt werden können.

* **GitHub-Desktop** - Git ist eine Software zur Versionskontrolle von
  Dateien. [GitHub](https://github.com/) ist ein Server, auf dem über
  diese Software verschiedene Versionen einer Datei abgelegt und
  verglichen werden können.  [GitHub-Desktop](https://desktop.github.com/)
  ist ein Programm, mit dem die entsprechenden Prozesse abgewickelt werden
  können.

* **LaTeX** - LaTeX ist ein Programm mit dem druckreife wissenschaftliche
  Publikationen erstellt werden können. Für den geplanten Workflow muss
  LaTex nicht bedient werden können, aber Pandoc braucht das Programm im
  Hintergrund. Aus diesem Grund muss es auf dem Computer installiert sein.
  Für Windows wird die Installation von [MiKTex](https://miktex.org/) oder
  [TeX Live](https://miktex.org/) empfohlen. Für Mac wird die Installation
  von [MacTeX](https://www.tug.org/mactex/) empfohlen.
  Von Linux Usern wird erwartet, dass sie wissen, was sie zu tun haben.

* **Zotero** - [Zotero](https://www.zotero.org/) wird für die Verwaltung der für die
  Fallbearbeitung erforderlichen bibliographischen Angaben verwendet.
  Neben der Installation des Desktop-Clients ist die Einrichtung eines
  Kontos auf der Website sinnvoll. Für die Datenmenge, die beim hier
  beschriebenen Beispiel anfällt, reicht das Datenvolumen des
  Gratiskontos.
  Was aber zusätzlich erforderlich ist, ist das
  [Browser-Plugin](https://www.zotero.org/download/), mit dem
  Websites direkt in Zotero abgelegt werden können. Ausserdem braucht man
  das Plugin [Better BibTeX](https://github.com/retorquere/zotero-better-bibtex/releases/download/v5.2.117/zotero-better-bibtex-5.2.117.xpi).
  Eine Installationsanleitung für Zotero-Plugins findet sich auf der
  Website von [Better Bibtex for Zotero](https://retorque.re/zotero-better-bibtex/installation/).

## Workflow

### Arbeit mit Quellen und Resultaten von Recherchen

Wer eine Fallbearbeitung verfassen muss, muss sich in aller Regel zuerst
in die theoretischen Grundlagen einlesen. Im vorliegenden Beispiel
hatten die Schülerinnen und Schüler als Grundlage die Auszüge zu den
Art. 41 und 56 OR aus dem Basler Kommentar als PDF zur Verfügung. Die beiden
Artikel sind beide auch bereits in der Vorbereitung via ISBN in Zotero
erfasst worden.

Dazu muss in Zotero das Menu mit dem Zauberstab geöffnet werden und die
ISBN in das sich öffnende Fenster eingegeben werden.
![Zotero Zauberstab Menu](/images/zauberstabmenu.png)
Zotero durchsucht dann verschiedene Bibliothekskataloge nach der
eingegebenen ISBN und erstellt so einen Eintrag.
Der Eintrag kann natürlich auch manuell erfolgen, in dem das grüne
Plus-Symbol ausgewählt wird und dann alle erforderlichen Einträge von
Hand gemacht werden.

Ganz ohne manuelle Nacharbeit geht es allerdings auch mit der ISBN
nicht. Mit der ISBN wird der Kommentar als Buch erfasst. Kommentare
haben aber oft mehrere Autoren. Um in der Fallbearbeitung die
Kommentarteile korrekt zitieren zu können, müssen diese als "Buchteil"
erfasst werden. Dazu muss der neu
entstandene Eintrag in Zotero geöffnet werden und im linken Fensterteil
unter dem Register Infos von "Buch" auf "Buchteil" geändert werden.
Anschliessend müssen die Herausgeber noch um die Autoren des
spezifischen Abschnittes ergänzt werden.

Zu guter letzt muss im
Abschnitt "Extra" noch die Ergänzung `Citation Key:BKOR41` eingetragen
werden. Der Text des Citation Key ist frei wählbar. Eine Empfehlung für
die Wahl des Textes ist der Name des Autors ergänzt um das
Erscheinungsjahr. Da "Basler Kommentar" jedoch so etwas wie eine Marke
ist, bin ich in diesem Fall von der eben gemachten Empfehlung
abgewichen.
Diesen Citation Key brauchen wir später, wenn der Basler
Kommentar in der Fallbearbeitung als Referenz eingetragen werden soll.
Der angepasste Eintrag sollte dann so aussehen:
![Fertiger Eintrag zu BK Art. 41 OR](/images/bkor41.png)

Falls man über ein PDF der in Zotero erfassten Quelle verfügt,
empfiehlt es sich, diese an den Eintrag anzuhängen und nur noch mit
dieser Kopie der Datei zu arbeiten. So ist sichergestellt, dass man die
Datei über die Suchfunktion in Zotero wieder findet und immer mit der
gleichen Datei arbeitet.
Die Datei anhängen erfolgt über das Menu mit der Büroklammer und dort
mit dem Eintrag "Gespeicherte Kopie der Datei anhängen...".

Neben dem Basler Kommentar mussten die Schülerinnen und Schüler
zusätzlich Referenzentscheide des Bundesgerichts suchen und für die
Fallbearbeitung verwenden.
Da die Schule über keinen Zugang zum Register des Bundesgerichts
verfügt, haben die Schülerinnen und Schüler die entsprechenden
Entscheide mit der erweiterten Google Suche gefunden. Die Syntax dazu
lautet `"Art. 41 OR" site:relevancy.bger.ch`. So werden als Suchresultat
alle Entscheide der amtlich publizierten Bundesgerichtsentscheide,
welche "Art. 41 OR" enthalten, ausgegeben. Allenfalls muss die
Suchanfrage um weitere Stichworte ergänzt werden.

Um einen so gefundenen Entscheid in Zotero zu erfassen, kann das Browser
Plugin verwendet werden. Wenn das entsprechende Symbol in der Menu Liste
des Browser (hier rot eingerahmt) angeklickt wird, wird der Entscheid in Zotero zusammen mit
einem Snapshot der Website erfasst.

![Zotero Browser Plugin](/images/browser-plugin.png)

Allerdings braucht auch dieser Eintrag noch etwas manuelle Nacharbeit.
Der Eintrag wird durch das Plugin als Website erfasst. Die richtige Eintragsform ist aber
"Fall". Ausserdem muss beim "Autor" etwas geschummelt werden. Hier muss
ein zweites Mal die Referenz eingefügt werden, damit der Eintrag im Text
korrekt wiedergegeben wird. Als Citation Key für
Bundesgerichtsentscheide empfiehlt sich die Referenz des Entscheides im
vorliegenden Beispiel also `Citation Key:BGE129III331`.
Der vollständige Eintrag eines Bundesgerichtsentscheides sollte
folgendermassen aussehen:

![BGE 129 III 331](/images/BGE129III331.png)

Es lohnt sich, aus den gesammelten Materialien "Textbausteine"
anzulegen. Diese kurzen Textbausteine, die beispielsweise die
bundesgerichtliche Umschreibung des Schadens zusammenfassen, können dann
in Zotero als Notiz abgelegt werden.

### Textredaktion

Der Text kann in Typora oder jedem anderen Texteditor verfasst werden.
Der Text wird in der Markdown Syntax erstellt. Markdown verlangt, dass
Formatierungen über Befehle in den Text eingefügt werden. Im
Wesentlichen handelt es sich dabei um Befehle, welche den Text
strukturieren. Das Internet bietet eine Fülle von [Markdown
Anleitungen](https://rmarkdown.rstudio.com/authoring_pandoc_markdown.html).

Bei längeren Texten ist es allenfalls hilfreich, den Text in einzelne
Dateien aufzuteilen. Auch wenn dies im vorliegenden Beispiel
möglicherweise etwas übertrieben ist, habe ich mich dazu entschieden,
die einzelnen Textteile in je einer eigenen Datei zu verfassen.

### Versionskontrolle

Wenn man am Computer mit Texten arbeitet, kommt es vor, dass man
Textvarianten als Zwischenstand ablegen möchte. Dies endet oft damit,
dass ein nicht sehr übersichtlicher Dateiensalat mit Version 1, Version
B, Version B2 etc. entsteht. An dieser Stelle kommt Git auf den Plan.
Git ist eine Software, die zur Unterstützung der Entwicklung von
Computerprogrammen entwickelt worden ist. Mit Hilfe von Git können
verschiedene Varianten eines Dokuments abgelegt und miteinander
verglichen werden. Es ist auch möglich, verschiedene Versionen wieder
herzustellen.

Diese für Programmierer entwickelten Funktionen können auch bei der
Textredaktion genutzt werden. Es kommt immer wieder vor, dass man etwas
an einem Text ändert, was man im Nachhinein als nicht so gelungene
Überarbeitung empfindet. In diesen Fällen ermöglicht es Git, die
beiden Versionen tatsächlich miteinander zu vergleichen und die besseren
Textstellen der beiden Varianten für die Weiterarbeit zu übernehmen.

Die Versionskontrolle funktioniert lokal auf dem eigenen Computer. Wenn
durch die Versionskontrolle gleichzeitig ein Backup erstellt und
allenfalls eine Zusammenarbeit in einem Team ermöglicht werden soll,
muss die Versionskontrolle über einen Server abgewickelt werden.
Es gibt verschiedene Anbieter entsprechender Server. Einer der
Bekanntesten ist [GitHub](https://github.com/). GitHub operiert nach dem Freemium Modell. Das
heisst, die Basisdienstleistungen sind gratis, aber wenn man
Dienstleistungen braucht, die darüber hinaus gehen, muss man einen
gebührenpflichtigen Vertrag abschliessen. Für schulische Belange dürfte
das Basisangebot ausreichen.

Die eigentliche Bedienung der Versionskontrolle erfolgt beispielsweise
über [GitHub-Desktop](https://desktop.github.com/). Um einen Text in die
Versionskontrolle aufzunehmen, muss ein sogenanntes Repositroy erstellt
werden. Ein Repository kann mit einem Ordner in der eigenen Dateiablage
verglichen werden.

Die folgende Beschreibung setzt voraus, dass ein Konto bei GitHub
besteht.

Um ein Repository anzulegen, öffnet man das Menu `File > New
Repository...` Im sich öffnenden Dialog gibt man dem Repository einen
Namen.

![Dialog New Repositroy](/images/new_repositroy.png)

Optional kann an dieser Stelle auf der zweiten Zeile eine Beschreibung
des Projektes eingegeben werden. Dann wählt man den Ordner, in welchem
man den so neu erstellten Ordner abgelegt haben will. Im Beispiel wurde
der Ordner auf dem Desktop angelegt. Unterhalb des Speicherortes findet
sich die Checkbox "Initialize this Repositroy with a README". Ich
empfehle, diese Box auszuwählen. Wenn man das macht, gibt es automatisch
eine Datei "README.md". In dieser Datei kann eine Beschreibung des
Projektes angelegt werden. Der vorliegende Text findet sich in einer
solchen README.md Datei. Wenn alle diese Angaben gemacht sind, geht es
mit "Create Repository" weiter. Im nächsten Dialog ist darauf zu achten,
dass "Keep this code private" angewählt ist.

![Dialog Publish Repository](/images/publish_repo.png)

Dann weiter mit "Publish repositroy".

Diese Schritte erstellen auf dem eigenen Computer am ausgewählten Ort
einen neuen Ordner mit - in meinem Beispiel - dem Namen
"210218_dummyordner" und auf dem Server von GitHub ein Repository mit
dem gleichen Namen.
Der Ordner und das Repository beinhalten je die beiden Dateien
".gitattributes" und "README.md". Um die Datei ".gitattributes" muss man
sich nicht weiter kümmern. In ihr werden für Git die notwendigen Angaben
abgelegt, dies geschieht aber automatisch. Die Datei "README.md" kann
mit Typora oder jedem beliebigen Texteditor bearbeitet werden.

Fall bereits ein Entwurf des zu versionierenden Textes besteht, kann
dieser nun in den erstellten Ordner verschoben werden.

Um eine Version als solche zu kennzeichnen, braucht es einen sogenannten
"Commit". Dieser kann in GitHub-Desktop erstellt werden. Der
entsprechende Dialog findet sich in GitHub-Desktop links unten.

![Commit Dialog](/images/commit_dialog.png)

Die Minimalangabe zur Kennzeichnung der Version ist ein Stichwort. Es
lohnt sich hier allerdings, etwas mehr als nur "Zwischenstand"
anzugeben. Man kann sich das Stichwort und die optionale Beschreibung
als Flaschenpost an sein zukünftiges Selbst vorstellen. Insbesondere
wenn viele Texte parallel über längere Zeit verfasst werden, ist es
hilfreich, die eigene Absicht bezüglich des aktuellen Redaktionsstandes
so präzise wie möglich zusammenzufassen.

Anschliessend muss im Dialog im Hauptfenster "Push origin" angeklickt
werden.

![Push origin](/images/push_dialog.png)

Dies führt zur Ablage des aktuellen Arbeitsstandes auf dem Server von
"GitHub". Die Liste der verschiedenen Versionen kann einerseits unter
"History" in GitHub-Desktop und andererseits auf dem Server von "GitHub"
angezeigt werden.

![Versionsliste GitHub-Desktop](/images/versionsliste_desktop.png)

Für die Anzeige der Liste auf dem Server muss die entsprechende Datei
ausgewählt werden und dann am oberen rechten Rand der Datei "History"
ausgewählt werden. Dies führt zur Anzeige der Versionen auf dem Server.

![Versionsliste auf GitHub](/images/versionsliste_github.png)

Durch die Auswahl der gewünschten Version kann der Unterschied zur
letzten Version angezeigt werden. Dabei werden rot die alten und grün
die in der gewählten Version neu dazugekommenen Textstellen dargestellt.

![Vergleich zweier Versionen](/images/vergleich.png)

Auf dem Server können unter folgender Adresse auch beliebige Versionen
miteinander verglichen werden.

<https://github.com/Jacques-Mock-Schindler/201200_haftpflichtrecht_hund/compare/132371f347de99330337f210b9f95429cb2089d9..3d74df48f18ec7441d869b4c6bd9500b5e3fc2b5>

Dabei ist `Jacques-Mock-Schindler` durch den eigenen Username und
`201200_haftpflichtrecht_hund` durch den Namen des eigenen Repositorys
zu ersetzen. Die langen Identifikatoren können aus der Versionsliste mit
einem Klick auf das Clip Board-Symbol kopiert werden.


### Belege

Besondere Erwähnung verdient die Verarbeitung von Referenzen. Um die in
Zotero gesammelten Materialien in den Text verarbeiten zu können, müssen
die Referenzen in ein Bibtex-File exportiert werden. Dazu fasst man die
für die Fallbearbeitung relevanten Zotero-Einträge in einem Ordner
zusammen. Den so erstellten Ordner exportiert man mittels Rechtsklick.
![Menu nach Rechtsklick auf Sammlung](/images/export.png)
Im dann erscheinenden Menu wählt man Better BibTex aus und wählt
unbedingt die Option "Halte Aktuell" aus. So ist sichergestellt, dass
Einträge, die später in Zotero eingefügt werden, automatisch in das
exportierte BibTeX-File eingefügt werden.
Als Speicherort muss unbedingt der gleiche Ordner gewählt werden, in dem
auch der Text gespeichert ist.
An der Stelle, an der eine Referenz eingefügt werden soll, ist ein
Eintrag in der folgenden Form vorzunehmen:
`[@CitationKey,Seitenzahl]` Wenn also auf den Entscheid BGE 129 III 331
E. 2.1 verwiesen werden soll, dann wird an der entsprechenden Stelle
`[@BGE129III331, E.2.1]` geschrieben. Die Vorschau von Typora wird dies
noch in genau der Form darstellen. Die Umwandlung in die für
Fallbearbeitung erforderliche Form erfolgt in einem nächsten Schritt.

Für die Darstellung braucht Pandoc, das Programm, das für die Umwandlung
des Rohtextes in das gewünschte Endformat zuständig ist, eine `.csl`
Datei (csl steht für "Citation Style Language"). Die entsprechenden Dateien finden sich im [Zotero Style Repository](https://www.zotero.org/styles). Auf dieser Website
finden sich Vorlagen verschiedenster Universitäten, Zeitschriften oder
wissenschaftlicher Disziplinen. Für eine Fallbearbeitung in der Schweiz
passt der Stil [Juristische Zitierweise Schweizer](https://www.zotero.org/styles/juristische-zitierweise-schweizer) (sic!)
am besten. Die ausgewählte Datei muss im gleichen Ordner wie der Text
gespeichert werden.

### Erstellen des formatierten Textes
Damit der fertig geschriebene Text auch noch in der richtigen
Darstellung erscheint, kommt Pandoc zum Zug.
Bei einfachen Texten kann dies direkt aus Typora heraus erledigt werden.
Dazu ist über das Menu Datei folgende Auswahl zu treffen: `Datei >
Exportieren > gewünschtes Format`.

Das so generierte Dokument entspricht in der Darstellung noch nicht den
Anforderungen an eine Fallbearbeitung.
Um das zu ändern, muss am Beginn des
Dokumentes ein Textblock eingefügt werden, mit dem die gewünschte
Formatierung bestimmt wird. Dieser Textblock heisst "YAML-Header" und
wird mit `---` eingeleitet und abgeschlossen.

Im vorliegenden Beispielfall sieht der YAML-Header folgendermassen aus.

```
  ---
# Angaben fürs Deckblatt (Text hinter einer Raute wird ignoriert)
  title: Fallbearbeitung Tierhalterhaftung
  author: Jacques Mock Schindler
  date: 28. Dezember 2020
  institute: Kantonsschule Büelrain Winterthur
# Einstellungen für die Erstellung eines PDF
  output:
    pdf_document:
      latex_engine: xelatex
  fontsize: 12pt
  papersize: a4
  lang: de-CH
# Angaben zur Bibliographie
  bibliography: bibliography.bib               # Aus Zotero exportiertes Datenbankfile
  csl: juristische-zitierweise-schweizer.csl   # Darstellung der bibliographischen Angaben
  ---
```

Damit dieser YAML-Header seine Wirkung entfalten kann, muss der Ordner,
in dem sich die Fallbearbeitung befindet, in einem Terminal geöffnet
werden. In Windows erfolgt dies durch einen Rechtsklick auf den Ordner
und dann die Wahl des Menu-Punktes "Open in Windows Terminal".

![Open in Windows Terminal](/images/windows_terminal.png)

Das Terminal ist das schwarze Fenster, in dem Befehle über die Tastatur
eingegeben werden. Wenn das Terminal-Fenster aufgeht, ist dort der Pfad
zum aktuellen Ordner mit dem abschliessenden Zeichen `>` zu sehen. Der
Pfad zum Ordner ist inhaltlich dasselbe, wie in der Adresszeile des
Windows-Explorers zu sehen ist.

![Pfad im Windows Explorer](/images/windows_explorer_paht.png)

![Pfad im Windows Terminal](/images/windows_terminal_paht.png)

Die Umwandlung des Texte erfolgt über die Eingabe des folgenden Befehls
über die Tastatur:

`pandoc 01_sachverhalt.md 11_schaden_rl.md 12_schaden_ra.md
21_widerrechtlichkeit.md 22_widerrechtlichkeit_ra.md 31_kausalitaet.md
32_kausalitaet_ra.md 41_hund_rl.md 42_hund_ra.md 50_fazit.md --citeproc
-s -o fallbearbeitung.pdf`

Im konkreten Beispiel sind es etliche Dateien, die auf `.md` enden, weil
ich mich dazu entschieden habe, den Text auf einzelne Dateien
aufzuteilen. Es wäre auch möglich, den ganzen Text in nur einer Datei zu
erstellen. Übersetzt in menschliche Sprache bedeutet dies ungefähr
"Pandoc nimm die Dateien 01\_sachverhalt.md, 11\_schaden\_rl.md,
12\_schaden\_ra.md, 21\_widerrechtlichkeit.md, 22\_widerrechtlichkeit\_ra.md,
31\_kausalitaet.md, 32\_kausalitaet\_ra.md, 41\_hund\_rl.md, 42\_hund\_ra.md
und 50\_fazit.md, verarbeite die bibliographischen Angaben und schreibe
das Resultat in eine eigenständige Datei mit dem Namen
fallbearbietung.pdf". Es wäre auch möglich, als Ausgabedatei
fallbearbeitung.docx, fallbearbeitung.html oder fallbearbeitung.epub zu
wählen. Die vollständige Liste möglicher Ausgabeformate findet sich auf
der Startseite von [Pandoc](https://pandoc.org/).

## Pendenzen

Noch offen ist

- [ ] die Verwendung eines externen Vergleichswerkzeuges, mit dem Versionen einander gegenübergestellt werden können
- [ ] das Zusammenspiel mit einem Vorlagefile
