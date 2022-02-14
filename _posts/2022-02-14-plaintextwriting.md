# Überlegungen zur Textredaktion in unformatiertem Text

> ## Motivation
> Textredaktion ist eine zentrale Arbeit eines jeden Wissensarbeiters.
> Die Office-Suite von Microsoft und damit Microsoft Word hat sich dabei
> als Quasi-Standard etabliert.
>
> Word gibt vielen Anwendern ein Gefühl der Sicherheit, weil man
> vermeintlich die Kontrolle über die Darstellung der erstellten
> Dokumente hat. Verlockend ist auch die Möglichkeit, in Echtzeit mit
> anderen 
> zusammenzuarbeiten und dabei den Versionsverlauf des Dokumentes
> anzeigen zu lassen.
> 
> Das Verfassen des Textes darf jedoch nicht mit seiner schlussendlichen
> Darstellung verwechselt werden. Ich erachte es im Gegenteil als
> sinnvoll die Textredaktion von seiner Darstellung zu trennen.
> 
> Mit dieser Anleitung möchte ich eine mögliche Vorgehensweise aufzeigen.


## Software Voraussetzungen

Jede Arbeit am Computer ist an Software gebunden. Deshalb hier als
erstes eine Liste von erforderlicher Software. Die vorgeschlagenen
Programme sind alle Kostenlos verfügbar.

* [**Visual Studio Code**](https://code.visualstudio.com/download) ist
  ein Texteditor der sich für viele Formate
  eignet und durch viele Plugins an die eigenen Bedürfnisse anpassen
  lässt. Für den von mir vorgeschlagenen Einsatz ist die
  Standardausstattung grundsätzlich ausreichend. Einzig das Plugin
  `Rewrap` sollte installiert werden, damit die Zeilen nach einer
  vorbestimmten Länge automatisch umgebrochen werden (dies erleichtert
  den später beschriebenen Vergleich verschiedener Versionen).
* [**Pandoc**](https://pandoc.org/installing.html) ist das Programm, mit
  dem der nicht formatierte Text in ein beliebiges Ausgabeformat
  umgewandelt wird.
* [**TexLive**](https://www.tug.org/texlive/) muss installiert sein,
  damit Pandoc PDF Dokumente erstellen kann. Ausser dass es installiert
  sein muss, hat man als Benutzer - sofern man keine mathematischen
  Formeln schön darstellen will - nichts damit zu tun.  
* [**GitHub-Desktop**](https://desktop.github.com/) für die
  Versionsverwaltung und die Zusammenarbeit im Team.

Neben der Software braucht es für die von mir vorgeschlagene
Vorgehensweise noch einen Account bei [GitHub.com](https://github.com/).
Diese Plattform dient dem Backup der eigenen Dateien und der
Zusammenarbeit im Team.

## Texte in Visual Studio Code erstellen

Wenn man Visual Studio Code zum ersten Mal öffnet, wird man von einem
Fenster mit einem Reiter `Erste Schritte` begrüsst. Diesen Reiter kann
man schliessen. In diesem (nun leeren) Fenster öffnet man über das Menü
`Datei > Neue Datei` eine neue Datei. Diese Aktion öffnet einen Reiter mit
dem Titel `Untitled-1` und einer Zeile *Sprache auswählen aus, um
loszulegen. Beginnen Sie mit der Eingabe, um die Meldung zu schliessen,
oder zeigen Sie diese Meldung nicht mehr an.* (Die Übersetzung entstammt
wohl einer maschinellen Übersetzung der ersten Generation.) Diese
Meldung kann ignoriert werden. Wenn man zu schreiben beginnt,
verschwindet sie. Damit Visual Studio Code erkennt, was wir tun wollen,
ist die Datei über das Menü `Datei > Speichern` unter im gewünschten
Ordner abzuspeichern. Wichtig ist dabei, das die Dateiendung `.md`
lautet. In der Kopfzeile ist dann der Pfad zur Datei (`C: > ... > ... >
...md`) mit einem blauen nach unten zeigenden Pfeil zu sehen. Damit
wurde eine Markdown Datei angelegt.

Nun kann grundsätzlich der Text erstellt werden. Ich empfehle allerdings
bevor man mit dem Schreiben beginnt,
noch ein paar Einstellungen in Visual Studio Code zu ändern:

* Zeilenumbruch: Um die verschiedenen Versionen des Textes
  zeilenweise zu vergleichen, ist es hilfreich, die Zeilenlänge auf 70
  bis 80 Zeichen pro Zeile zu limitieren. Dazu muss in den Einstellungen
  (Datei > Einstellungen > Einstellungen) im Suchfenster nach
  `editor.rulers` gesucht werden. Die Suche bietet dann die Möglichkeit
  an, die Datei `settings.json` zu bearbeiten. In dieser Datei ist an
  den Positionen `"editor.wordWrapColumn":` und
  `"editor.minimap.maxColumn":` je der Wert `72` einzutragen (anstelle
  von 72 kann auch ein anderer Wert gewählt werden).

  Damit der Zeilenumbruch automatisch erfolgt, muss noch die Erweiterung
  `Rewrap` installiert werden.

* Rechtschreibeprüfung: Eine Rechtschreibeprüfung ist in eine gute
  Sache. Dazu ist die Erweiterung `Spell Right` zu installieren. Diese
  erlaubt den Zugriff auf alle in Windows installierten Sprachpakete.
  Die im aktuellen Dokument gewünschten Sprachen können dann am unteren
  Rand des Fensters ausgewählt werden.

Nach diesen Änderungen an den Grundeinstellungen kann der Text erstellt
werden. Der Vorteil der Textredaktion in Markdown liegt darin, dass man
sich nicht um die Formatierung des Textes zu kümmern braucht. Die
Formatierung wird durch den weiter unten beschriebenen Prozess
gesteuert. Der Text muss damit nur strukturiert werden. Dafür stellt
Markdown die folgenden Gliederungselemente zur Verfügung.

```
# Titel

## Untertitel

### Unteruntertitel
```

Insgesamt stehen so sechs Hierarchieebenen zur Verfügung. Absätze werden
durch Leerzeilen abgegrenzt. Auch nach einer Überschrift muss eine Zeile
leer gelassen werden.

Selbstverständlich stehen auch noch weitere Formatierungswerkzeuge zur
Verfügung. *Kursiv* wird der Text durch die Eingabe `*Kursiv*`, **fett**
durch die Eingabe von `*fett*`. [Eine Beschreibung von weiteren
Formatierungsmöglichkeiten findet sich hier.](https://www.markdownguide.org/basic-syntax/).

Es können auch Referenzen in den Text eingebaut werden. Die
entsprechende Vorgehensweise wird
[hier](https://jacques-mock-schindler.github.io/fallbearbeitungen/#:~:text=Wer%20eine%20Fallbearbeitung,Zotero%0Aerfasst%20worden.)
beschrieben.

## Ausgabeformat

Der in Markdown verfasste Text kann mit Hilfe von *Pandoc* und *TexLive* in praktisch
jedem gewünschten Format ausgegeben werden. Für die Ausgabe des Textes
als PDF muss man folgendermassen vorgehen: Im Menü `Terminal > Neues
Terminal` wählen. Dies öffnet im unteren Drittel des Fensters ein
Terminal (jener Ort, an dem der Computer via Textbefehle gesteuert
wird). In diesem Fenster gibt man den Befehl `pandoc dateiname.md
--pdf-enginge=xelatex -o name_ausgabedatei.pdf` ein. Damit wird das
Programm Pandoc angewiesen, die Datei `dateiname.md` zu nehmen und mit
dem TexLive-Hilfsprogramm pdflatex in ein PDF mit dem Namen
`name_ausgabedatei.pdf` umzuwandeln. Falls man lieber eine Word-Datei
erstellen möchte, lautet der Befehl `pandoc dateiname.md -o
name_ausgabedatei.docx`.

Pandoc lässt eine feine Steuerung des Ausgabeformates zu. Dazu empfiehlt
es sich allerdings, dem eigentlichen Text der Datei einen sogenannten
`YAML-Header` voranzustellen. In diesem Header kann festgelegt werden,
wie die Ausgabe für jedes gewünschte Format aussehen soll. Hier eine
kurzes Beispiel eines solchen Haders für die Ausgabe eines PDF in A4 mit
Schriftgrösse 11pt.

```
---
title: Titel des Dokuments
author: Name des Autors
date: 13. Februar 2022
output: 
    pdf_document:
        latex_engine: xelatex
    fontsize: 11pt
    papersize: a4
    lang: de-CH
---
```

Mit diesem Header reicht dann der Befehl `pandoc dateiname.md -o
name_ausgabedatei.pdf` um eine PDF-Datei auszugeben. Die Spezifikation
der Sprache (`lang: de-CH`) stellt die korrekte Trennung sicher. Die
Vollständige Liste der möglichen Dateikonversionen findet sich auf der
Website von [Pandoc](https://pandoc.org/MANUAL.html).

## Versionierung (und Backup)

Das wichtigste Backup ist immer dasjenige, das man gerade für den Tag, nachdem
man die Kaffeetasse in die Tastatur des Laptop gekippt hat, geplant hat.
Aus diesem Grund ist es wichtig, eine Backupstrategie zu verfolgen, die
ohne grossen Aufwand funktioniert.

Ich habe mich für Github entschieden, weil dies ein externes Backup und
eine Versionskontrolle gleichzeitig sicherstellt. Dies funktioniert in
Visual Studio Code sehr einfach. In der Seitenliste muss das Symbol für
die Versionskontrolle (![Symbol
Versionskontrolle](images/versionskonrolle.png)) ausgewählt werden. In dieser
Spalte können die letzten Änderungen mit dem Plus-Symbol vorgemerkt
werden. Mit dem Korrekturhakensymbol öffnet sich dann ein Fenster für
eine Texteingabe. In dieser Texteingabe ist eine kurze Zusammenfassung
der letzten Änderungen einzutragen. Dies ist eine Botschaft an das
zukünftige selbst oder, wenn man in einem Team arbeitet, an die
Teammitglieder. Anschliessend kann mit dem dann erscheinenden
Synchronisations-Knopf der aktuelle Stand der Arbeit an Github
übertragen werden.

Im Unterfenster `FILE HISTORY` kann der Verlauf der Arbeit nachvollzogen
werden. Git und Github ermöglichen es auch, Textvarianten zu erstellen.
Dies geschieht, in dem man sogenannte `Branches` erstellt. Dies würde
aber den Rahmen dieser Einleitung sprengen.
