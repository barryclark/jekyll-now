---
layout: post
title: "Workflow für die Rückgabe von Prüfungen"
abstract: "Das Zurückgeben von Prüfungen sorgt regelmässig für Unruhe in
den Klassen. Hier beschreibe ich ein Work-Around für dieses Problem."
---
## Ausgangslage
Die Rückgabe von Prüfungen sorgt regelmässig für Unruhe in den Klassen.
Um dies zu vermeiden, bin ich dazu übergegangen, die korrigierten
Prüfungen nicht mehr während der Lektionen auszuteilen, sondern die
Prüfungen den Schülerinnen und Schülern digital zukommen zu lassen.

In einem ersten Anlauf habe ich die Prüfungen per Mail zugestellt. Dies
hat sich aber als sehr aufwändig und anfällig für Fehler herausgestellt
- und ich möchte es vermeiden, korrigierte Prüfungen einem falschen
Empfänger zuzustellen.  Daher habe ich in einer verbesserten Variante
eine Verteilung via SharePoint aufgesetzt.

Hier soll die Vorgehensweise für diese zweite Variante beschrieben werden.

## Erforderliche Software
* PDF Annotator
* Excel
* PDFtk
* RStudio
* gitBash
* texlive

## Vorbereitung
Als Vorbereitung für meinen Arbeitsablauf muss ich für jede Klasse auf
SharePoint einen Ordner anlegen, in welchem es einen Unterordner für
jeden Schüler hat. Für die Schülerordner sind die Berechtigungen so
gesetzt, dass jeder Schüler ausschliesslich einen Lesezugriff auf seinen
Ordner hat. Dieser Ordner ist Ablageort für alle seine korrigierten
Arbeiten in meinem Fach.  
Damit die korrigierten Prüfungen einfach verteilt werden können, muss
der SharePoint-Ordner lokal synchronisiert sein.

Im weiteren brauche ich pro Klasse und Semester eine Excel-Arbeitsmappe
zur Erfassung der Schülerleistungen. In dieser Arbeitsmappe bildet die
Adressliste aus dem Intranet das erste Tabellenblatt. Anschliessend an
die Adressliste folgt das Blatt zur Berechnung der Zeugnisnote und dann
pro Prüfung ein weiteres Blatt.  
Um die Tabellenblätter mit den Prüfungsresultaten direkt für die
Steuerung der Verteilung verwenden zu können, habe ich direkt auf der
ersten Zeile nur die Spaltenköpfe mit `Name`, `Aufgabennr` etc. (vgl.
Abbildung unten).

## Ablauf bei einer konkreten Prüfung
Meine Prüfungen werden den Schülern und Schülerinnen ungeheftet
ausgeteilt. So kann ich die Schülerarbeit ohne weiteren Zwischenschritt
einscannen. Ich scanne den ganzen Klassensatz in ein einziges PDF.
Dieses File lege ich in einen eigens für die Korrektur dieser Prüfung
angelegten Ordner ab. Die Korrektur erfolgt dann in PDF-Annotator
ebenfalls digital.

### Bereitstellen der Steuerungsdaten
Anschliessend an die Korrektur übertrage ich die Resultate in eine
Excel-Tabelle. Zusätzlich zu den Punkten pro Aufgabe muss ich noch die
erste und die letzte Seite pro Schüler erfassen. Für die Rückgabe
brauche ich die Spalten `Name`, `Punktzahl`, `Note`, `Erste Seite`,
`Zweite Seite` (wird durch Addition von 1 aus der ersten Seite berechnet
und muss nicht manuell erfasst werden), `Letzte Seite`, `Datum`,
`Stichwort` und `Null`.  Die Kopfzeile des entsprechenden
Tabellenblattes sieht dann folgendermassen aus:

![Kopfzeile Excel-Tabelle](/images/excel_header.png)

Um die erforderlichen Werte für die Verteilung verwenden zu können,
müssen die Spalten zwingend mit `Name`, `Punkte`, `Note`, `First`,
`Second`, `Last`, `Datum`, `Stichwort` und `Null` bezeichnet werden. Die
Spalte `Null` dient dabei lediglich dazu, dass in der Dateibezeichnung
der korrigierten Prüfung hinter dem Titelstichwort
keine Leerstelle entsteht.  
Damit das so ausgefüllte Tabellenblatt für die Steuerung der Verteilung
verwendet werden kann, muss es als CSV-Datei exportiert werden (Datei >
Exportieren > Dateityp ändern > CSV; anschliessend "Speichern unter").
Die Datei muss mit dem Namen `steuerung.csv` in den Ordner, in dem die
korrigierte Prüfung liegt, gespeichert werden.

Die so gewonnene Datei `steuerung.csv` muss noch dahingehend angepasst
werden, dass unterhalb des letzten Namens nichts mehr folgt.

### Verteilung der Prüfungen
Zur Verteilung der Prüfung verwende ich ein bash-Skript. Bevor das
Skript verwendet werden kann, muss es noch an die konkrete Prüfung
angepasst werden. Wie im Screenshot des Excel-Tabellenblattes zu sehen
ist, gibt es für jede Aufgabe eine Spalte. Diese Information findet sich
auch im Skript. Die Angaben findet sich in der Zeile, die mit `while
IFS=, read` beginnt. In dieser Zeile muss die durch römische Zahlen
ausgedrückte Nummer der Aufgaben an die zu verteilende Prüfung angepasst
werden. Es muss für jede Aufgabe eine Nummer vergeben werden.

Der Einfachheit halber lasse ich das Skript in RStudio laufen. In
RStudio kann das ganze File mit dieser Anleitung geöffnet werden. Eine
passende Datei zum Download findet sich [hier](https://github.com/Jacques-Mock-Schindler/tutorials/blob/main/korrekturworkflow.rmd).
Das Script kann dann direkt in RStudio ausgeführt werden.

{% highlight bash %}
#!/bin/bash

######################################################
######################################################
##                                                  ##
## Skript für Notenstempel und Prüfungsverteilung   ##
## 18. April 2021                                   ##
##                                                  ##
######################################################
######################################################


echo "\documentclass[a4paper]{article}"          >> bewertung.tex
echo "\usepackage{helvet}"                       >> bewertung.tex
echo "\renewcommand{\familydefault}{\sfdefault}" >> bewertung.tex
echo "\usepackage[absolute]{textpos}"            >> bewertung.tex
echo "\usepackage{xcolor}"                       >> bewertung.tex
echo ""                                          >> bewertung.tex
echo "\begin{document}"                          >> bewertung.tex
echo "\nopagecolor"                              >> bewertung.tex
echo "\begin{textblock*}{100mm}(110mm,50mm)"     >> bewertung.tex
echo "  \color{red}"                             >> bewertung.tex
echo "  \LARGE"                                  >> bewertung.tex
echo "  Punkte: \input{punkte.tex}"              >> bewertung.tex
echo ""                                          >> bewertung.tex
echo "  Note: \input{note.tex}"                  >> bewertung.tex
echo ""                                          >> bewertung.tex
echo "  \color{black}"                           >> bewertung.tex
echo "\end{textblock*}"                          >> bewertung.tex
echo "\end{document}"                            >> bewertung.tex

while IFS=";" read NAME VORNAME I II III IV V VI VII VIII PUNKTE NOTE FIRST SECOND LAST DATUM  STICHWORT NULL;

do

    mkdir ./$NAME
    

    echo $PUNKTE      > punkte.tex
    echo $NOTE        > note.tex

    pdflatex bewertung.tex

    pdftk fahne.pdf cat $FIRST output first$NAME.pdf
    pdftk fahne.pdf cat $SECOND-$LAST output rest$NAME.pdf

    pdftk first$NAME.pdf stamp bewertung.pdf output beurteilt$NAME.pdf

    pdftk beurteilt$NAME.pdf rest$NAME.pdf cat output $DATUM\_$NAME\_$STICHWORT.pdf

    mv $DATUM\_$NAME\_$STICHWORT.pdf ./$NAME
    
done < <(tail +2 steuerung.csv)

    rm rest*
    rm first*
    rm beurteilt*
    rm bewertung*
    rm note*
    rm punkte*
exit 0
{% endhighlight %}

Um das Skript auszuführen 
muss das Arbeitsverzeichnis von RStudio in den Ordner mit der
korrigierten Prüfung gewechselt werden (Session > Set Working Directory;
anschliessend den Ordner, in dem die Prüfung liegt auswählen). Damit das
Skript seine Arbeit erledigt, muss der Text von `echo "\documentclass[a4paper]{article}"` 
![Beginn Skript](/images/begin_script.png)

bis `exit
0` 

![Ende Skript](/images/end_script.png)

markiert werden. Anschliessend wird der Text durch das drücken der
Tastenkombination `Crtl` + `Alt` + `Enter` in die Konsole übertragen und
ausgeführt (nicht fragen, einfach maschen).

Wenn das Skript erfolgreich gelaufen ist, ist pro Schüler ein Ordner
erstellt worden, der seine korrigierte Prüfung enthält. Diese Ordner
können kopiert werden und in den SharePoint-Ordner mit den bereits
bestehenden Schülerordnern übertragen werden.

Nun brauchen die Schüler nur noch informiert zu werden, dass die
korrigierte Prüfung für sie bereit liegt.
