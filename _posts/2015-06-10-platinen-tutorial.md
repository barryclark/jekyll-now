---
layout: post
title: Teil 1
published: false
categories: general
tags: [elektro, howto, lernen]
---


Platine Titelbild
Aus irgendeinem Grund habe ich es immer verpasst, Platinen selbst zu ätzen. Immer von gelesen, nie probiert.
Weil es ziemlich einfach ist, Geld spart und Schaltungsbau ziemlich vereinfacht, hier der Versuch einer Anleitung.
Ohne Drucker, UV-Lampe und Dremel würde ich ca. 15€ für die ersten Versuche schätzen.

Das ganze geht in verschiedenen Varianten.

Toner-Transfer Methode
Hierbei wird der Toner, von einem Laserdruck, auf die Platine „gebügelt“. Diese Methode geht ohne UV-Licht. Allerdings ist jeder Druck nur einmal verwendbar und man ließt, dass die Kantenschärfe nicht 100% ist.
Platine mit der, auf Folie ausgedruckten, Schaltung belichten.
Die Platine ist hierbei UV-Licht-Empfindlich. Einmal ausgedruckt, kann man den Druck wiederbenutzen.
Diese Variante geht mit Tintenstrahl-Drucker und Laser Drucker. Laserdrucker können eine bessere Schärfe erreichen. Ich habe nur einen Tintenstrahl-Drucker, also zeige ich hier den Weg. Mit QFN-Gehäusen habe ich mit Tinte allerdings noch keine guten Erfahrungen gemacht.
Natürlich gibt es diese schon tausendfach. Ich versuch einfach meine Erfahrung mit einzubringen.


Was wird gebraucht?!
PCB Design Software
Ich nutze DesignSpark PCB. Das ist eine kostenlose Software vom Bauteilversand RS Components. Ich hab ein paar Tage einiges wie Eagle, Altium Designer, KiCAD ausprobiert – aber DesignSpark hatte einfach die kleinste Einstiegshürde. Außerdem hat es einen direkten Link zum gesamten Bestand von RS-Components; damit hat man für die meisten Teile gleich PCB footprints (also die realen Ausmessungen und Pin/Pad Layout). Bauteile, die in Eagle erstellt wurden, lassen sich außerdem schnell importieren – das verkürzt die Suchzeit.
Perfekt ist es nicht; ich finde die Positions/Abstands-Werkzeuge unpraktisch und es ist mir beim Gerber-File erstellen öfter abgestürzt. Aber für Einsteiger reicht es.
Alle Schritte unten beziehen sich auf DesignSpark PCB.
Adobe PDF Drucker
Ich „drucke“ die PCB-Dateien über den virtuellen PDF Drucker. Der von Adobe hat eine DPI Einstellmöglichkeit, die ich nutze, die aber vermutlich nicht lebenswichtig ist. Ich habe das Gefühl, dass PDFs mit mehr DPI qualitativ schon was rausholen. Als Alternative geht vermutlich auch „PDFCreator“.
 Bildbearbeitungsprogramm
Die erzeugte PDF bearbeite ich kurz. Dazu nutze ich die Tontrennung. Die Platine lässt sich außerdem besser platzieren, bescheiden und vervielfältigen. Ich nutze Photoshop, einfach weil ich nie mit Gimp und co gearbeitet hab. Das wird damit aber auch gehen.
Drucker (hier tintenstrahl)
Hier ist „mehr DPI“ = „mehr gut“. Ich nutze aber einen HP OfficeJet, den ich nicht als qualitäts-Wunder einstufen würde. Wichtig ist, dass man die zu nutzende Tintenmenge einstellen kann. Die Folie wird außerdem zwei Mal mit dem selben Motiv bedruckt. Die Wiederholbarkeit von Drucken sollte also gut sein.
UV-Lampe
Ich nutze einen Gesichtsbräuner mit 75W. Die gibts es öfter günstig/zu verschenken. Man kann sich die Lampe mit UV LEDs auch selber bauen. Im Netz findet man Hinweise, dass eine normale Glühlampe auch geht. Zur not eben die Sonne.
transparente inkjet Folien
Bauteile
fotobeschichtete Platinen
Hier am besten auf die Bungard Platinen nutzen. Die werden allgemein empfohlen und – wenn man sie bei Segor, in Berlin, kauft, sogar günstiger als die noName bei Conrad.
Für die Reproduzierbarkeit ist es vermutlich sinnvoll bei einem Hersteller zu bleiben.
Üblich ist: FR4 =  Epoxidharz. 35umKuperdicke mit einer Dicke von 1,5mm. Dünner = teurer
2 Tupperdosen
Für die Chemie bzw. die Platinen. In die Dosen sollte die Platine + ein paar cm zum bewegen passen. Je höher, desto besser (damit die Chemie nicht hoch spritzt. Verringert die Spritzgefahr beim Öffnen). Außerdem sollten sie einen Klick-Verschluss an allein Seiten haben. 5€ Dosen waren in meinem Test  – trotz 100% dicht-Aufdruck- wasserdichter als 2€ Dosen. Ich hab noch eine 3. Dose, in die ich eine der Dosen stelle. Sie sollte so hoch sein, dass 1-3cm lauwarmes Wasser +Dose reinpassen. Vermeidet zusätzlich die Fleckengefahr, falls Chemie an der Außenseite runterläuft.
Eisen(III)-chlorid
Die Chemie zum ätzen. Conrad verkauft es nicht mehr. Im Netz ohne Probleme zu bekommen. In Berlin ist Segor wieder der Laden der Wahl. Ich habe mit ca. 300ml jetzt 5 kleine Platinen ohne Ermüdungserscheinung geätzt  – ich vermute, dass man mit einem Liter lange auskommt. Das Zeug ist nicht Gesund, also vorsichtig sein. Es macht schwer zu lösende Flecken auf Textilien und Metallen.
Das Zeug ist Sondermüll und darf auf keinen Fall über den Abfluss entsorgt werden!
Entwickler-Chemie
Der Entwickler ist zum Entwickeln der belichteten Platinen. Ich nutze den von Bungard, wieder von Segor. Wird in Wasser aufgelöst. 300ml für 5 kleine Platinen, noch keine Ermüdungserscheinung.
Glasflasche
Zum aufbewahren des flüssigen Entwicklers. Luftdicht verschließbar mit Beschriftung zum Inhalt und Ansetz-Datum des Entwicklers.
Bilderrahmen
Zum fixieren der Folie auf der Platine. Möglichst kratzfrei und etwas größer, als die größte Platine, die man drucken will (DIN A4 vermutlich). Ich nutze einen für 2€ von Pfennigland, die billigen, mit den Metallschnallen an jeder Seite. Keine super Teuren nehmen, die blocken UV-Licht.
Aceton
Zum reinigen der fertigen Platine. Auf dem Baumarkt. Nagellack geht auch(da Acetonhaltig). Spiritus geht nicht, das löst die UV-belichtete Schicht nicht. Achtung: greift Plastik an.
Glasreiniger/Spühlmittel
Zum reinigen des Bilderrahmens und zum entfernen der Eisen3Chlorig-Flecken in der Umgebung;D
Pinzette
Zum bewegen/herausholen der Platine. Möglichst aus Plastik, da das Eisen3Chlorid Metalle angreift. Geht aber auch, die Pinzette wird sich nicht sofort auflösen.
Gummi-Handschuhe
Eisen3Chlorig, Entwickler und Aceton sind alle 3 nicht gerade hautfreundliche Flüssigkeiten! Haushaltshandschuhe gehen gut. Aceton kann unter Umständen das Gummi angreifen -> vorher checken, nicht in Aceton greifen.
Schutzbrille
Sicherheit zuerst. Chemie will man nicht im Auge haben
 Uhr/Timer
zum Belichten und Ätzen
Dremel/Bohrmaschine für 1mm-Bohrer
Bei Nutzung von through hole-Bauteilen werden natürlich Löcher dafür benötigt. Bei Pin-Headern bzw. Stiftleisten auch. Ich habe kein entsprechendes Werkzeug und leih mir das entweder oder gehe ganz auf SMD Bauteile.
Säge
Die Leiterplatten müssen natürlich irgendwie geschnitten werden. Ich habe leider noch keine einfache Möglichkeit gefunden. Beim sägen mit Dremel oder Säge sollte beachtet werden, dass die Expoydharzplatten gesundheitlichen Feinstaub erzeugen! Ich nutze zum Trennen eine „Schlagschere „, die ist eigentlich für Metall. Erzeugt aber den besten Schnitt und geht schnell. Vermutlich ist für zuhause eine Dremel die beste Variante.
Platine designen
Ein Kapitel für sich. Tutorials dazu gibt es hunderte. Einige Hinweise:

Für den Anfang ist eine Platine mit möglichst wenig Bauteilen sinnvoll. Es gibt auch damit genug Probleme beim ersten Mal. (z.B. eine 9V auf 5V Spannungsquelle)
Wer keinen Bohrer hat, kann 90° gebogene Stiftleisten, statt gerade nehmen. Die lassen sich einfach auf den Lötpunkt löten. Von Wago gibt es außerdem die SMD-Leiterplattenklemmen 2059. Die fixieren kleine Durchmesser sicher und können direkt auf die Oberseite gelötet werden. Gibt es nur bei Conrad und sind relativ teuer(42 cent/Stück). Dafür findet man auch Eagle-PCB Bibliotheken, die sich in DesignSpark PCB importieren lassen
Abstände/Schrift: Mit meinem Drucker bekomme ich Abstände ab 0.25mm hin, dadrunter gibt es Kurzschlüsse. Ich ätze Schrift direkt mit auf die Platte, da war 1.3mm „ok“ lesbar(Nullen und Kleinbuchstaben sind ab und zu fehlerhaft). Da muss man etwas experimentieren und kann die Werte dann im „Design-Rule-Check“ vorm Drucken überp.
Viele Pads, vor allem die für Stiftleisten, waren vom Programm zu klein ausgelegt. Die sollten, vor allem zum Handlöten, angepasst werden.
Bohrlöcher sollten größer ausgelegt werden. Nutzt man keine high-end CNC-Fräse dazu, hat man immer größere Toleranzen.
Beim Übertragen der Schaltung auf die Platine(im Programm), darauf achten, dass Bauteile+Schrift auf den Top-Ebenen liegt. Liegt ein Bauteil auf der Unterseite, wird es spiegelverkehrt.
DreamSpark PCB lässt nur ein PCB Design pro Projekt zu. Man kann sich behelfen, in dem man in einem PCB-File mehrere Versionen einer Schaltung aufbaut.
PCB Drucken
Alle Texte und Bauteile auf den Top-Layern?!
File -> Print Setup -> „Adobe PDF“ auswählen -> Eigenschaften -> Reiter „Papier/Qualität“ -> „Erweitert“ unten rechts
PDF Einstellungen
PDF Einstellungen
„Druckquallität“ auf 1200dpi stellen -> alles bestätigen
„File“ -> „Print“
PDF Drucken
PDF Drucken
„All Colors Black“: Ja!; „Mirror“: Nein!; Layers: „Top Copper“, „Board Outline“ und „Documentation“, falls Text auf der Ebene mit-geätzt werden soll.
-> „OK“ -> Speicherort wählen ->  speichern
PDF bearbeiten
Gerade erstelle PDF in Photoshop öffnen, beim Import die Auflösung auf 1200 Pixel/Zoll setzen
Platine zuschneiden
„Bild“ -> „Tontrennung“, Stufen: 2
„Bild“ -> „Modus“ -> „indizierte Farbe“, Palette: Exakt, Erzwungen: Schwarzweiß
„Bild“ -> „Bilddrehung“ -> „Arbeitsfläche horizontal spiegeln“ (so liegt die bedruckte Seite nachher direkt auf der Platine)
PDF bearbeiten, als Aktion
PDF bearbeiten, als Aktion
Damit könnte jetzt eine Platine gedruckt werden. Bei mehreren auf einer die Ebene auf eine neue DIN-A4 Arbeitsfläche mit 1200Pixel/Zoll kopieren und platzieren.

Platine drucken
Um Folie zu sparen, scheide ich mittlerweile ein entsprechend großes Stück davon aus und klebe es auf ein Blatt Papier. 1-2cm Rand an jeder Seite und dann Tesa an jede Seite.

„Datei“ -> „Drucken“
„Druckeinstellungen“, oben rechts für den Drucker
(Gilt vermutlich nur für meinen HP Drucker) Reiter: „Erweitert“ -> „Tintenmenge“ ändern auf „schwer, Trocknungszeit ändern auf „mehr“
Druckerinstellungen
Druckerinstellungen
Reiter: „Funktionen“ -> „Druckqualität“ auf „optimal ändern, „In Graustufen drucken“ auf „Nur schwarze Tinte“ ändern
Druckqualität und schwarze Tinte
Druckqualität und schwarze Tinte
Mit „OK“ bestätigen
In dem selben Fenster „Photoshop Druckereinstellungen“ kann die Position der Folie/bzw. des Drucks angegeben werden. Hier Also aufklebe-Position ausmessen und eintragen. Dabei überstehendes Tesa, auf der Folie, beachten.
Position eingeben
Position eingeben
Vor dem Druck auf die Folie empfiehlt sich ein Probedruck auf Papier! Mit dem kann man dann prüfen, ob die Bauteilgrößen alle richtig sind, die Orientierung und ob es generell passt. Lieber einmal zu viel Bauteile auf das Papier gelegt, als die fertige Platine versaut.
OK? -> Folie in den Drucker („raue“ Seite nach unten, checken ob der Papieranschlag angedrückt ist) -> Drucken
Nach dem Druck kurz warten -> Trocknung.
Druck überprüfen. Sind Streifen zu sehen? Nichts ausgefranst? Keine Kurzschlüsse?
Ok? -> Folie wieder in den Drucker(wieder raue Seite nach unten, „oben“ kommt zuerst in den Drucker)
Wieder: „Datei“ -> „Drucken“. Photoshop merkt sich die Position und passt sie entsprechend der „nichtdruckbaren-Bereiche an!“ also nichts ändern. (Zumindest hat es bei mir dann immer gepasst.) -> Drucken
Hat die Folie an der richtigen Stelle gelegen und ist der Drucker genau genug, sollten beide Drucke jetzt ziemlich genau deckungsgleich sein. Der Druck sollte, gegen das Licht gehalten, ziemlich Lichtdicht sein. Zur Not kann man mehrmals „drüberdrucken“ und dabei mit den Tintenmengen und Trockungszeiten spielen.

Platine belichten
Am Anfang hab ich ziemlich übertrieben, alles horizontal aufgebaut, mit Diffusorfolie und Gewichten. Am Ende war es ziemlich aufwendig und es gab mehr Fehlerquellen. Hier also eine ganz simple Variante.

Folie abziehen und möglichst Staubfrei irgendwo ablegen. Beim Abziehen die Folie nicht knicken.
Glas des Bilderrahmens reinigen (Fussel müssen ok sein, Probleme hatte ich bisher keine)
Folie auf der Platine abziehen (es empfiehlt sich das nicht im direkten Sonnenlicht zu tun, eine Minute im Zimmer mit offenem Fenster war aber kein Problem), auf die Biderrahmenrückseite legen. Dabei Oberseite möglichst nicht Berühren o.Ä.
bedruckte Folie auf die Platine legen. Mit der bedruckten Seite auf die Platine; das PCB Layout sollte dann von oben richtig rum sichtbar sein. Also so, wie sie am Ende aussehen soll
Glas auf die Platte legen und Klemmen vom Rahmen wieder befestigen.
Ich hab jetzt den Bilderrahmen irgendwo angelehnt, die UV-Lampe 10-15cm entfernt aufgestellt und etwas darunter gelegt, sodass sie parallel zum Bilderrahmen stand. Man könnte es auch im liegen machen. Hauptsache relativ gleichmäßig und nicht zu weit weg. Mit Entfernung und Zeit muss man etwas experimentieren. Bei mir war es so 10-15cm.
belichtung
Belichten des PCBs im Bilderrahmen
 Licht anmachen, Wecker stellen. Mit der Zeit muss man spielen. Ich hab von Anfang an 10 Minuten angesetzt, das hat funktioniert und dabei bin ich geblieben. Es ging aber auch mit weniger. Ich hab einmal nach 3 Minuten gesehen, dass die Folie verrutscht war – hab sie gerichtet und nach 10 Min war trotzdem alles perfekt.
Nach dem Belichten auspacken, möglichst nicht in die Sonne legen und direkt weiter zum Entwickeln
Platine entwickeln
Hierzu gibt es keine Fotos, aber auch nicht viel zu erzählen. Fließendes Wasser wird benötigt, also am besten nahe des Waschbeckens.

Entwickler 2-3 cm in eine der Dosen füllen, Deckel bereitlegen. Handschuhe anziehen. Wasser leicht laufen lassen (kalt reicht).
belichtete Platine in den Entwickler legen (Kupfer nach oben), Deckel drauf
es sollte ein farblicher Schleier über der Platine erkennbar sein, die Dose leicht hin und her bewegen, sodass der Schleier verschwindet und immer neuer Entwickler auf die Platine kommt
nach etwa einer Minute sollte die Schaltung vollständig sichtbar sein
Platine mit einer Pinzette oder Handschuhen rausnehmen und unter das fließende Wasser halten. Der Entwicklungsprozess wird dann gestoppt.
Deckel zu, wegstellen, Platine kurz abwaschen, fertig.
Platine ätzen
Die entwickelte Platine ist jetzt nicht mehr UV-Licht empflindlich. Kratzer sollten aber unbedingt vermieden werden.
Ich stelle die Dosen zum ätzen direkt in das Waschbecken. Das ist nicht optimal, wenn man mit dem Spritzern aufpasst und alles direkt danach reinigt, dann geht das.

Brille auf, Handschuhe an
Dose mit 2-3 cm Eisen3Chlorid füllen, Deckel zu
Dose in die größere Dose stellen und warmes Wasser einfüllen(die Wirkung des Eisen3 verstärkt sich, wenn es erwärmt wird), größere Dose mit Eisen3-Dose ins Waschbecken stellen
Deckel auf, Platine rein(Kuper oben), Deckel zu

Ätzen im Waschbecken


Timer stellen. Bei Freiflächen etwa 35 Min., ohne Freiflächen ca. 25 Min.
Dose leicht hin-und-her bewegen. Das Eisen3Chlorid „verschlammt“ mit Benutzung. Es bilden sich sand/schlammartige Ablagerungen, die Bewegung verhindert die Ablagerung auf der Platine. Wird die Platine immer wieder mit frischem Eisen3 benetzt, geht der Prozess schneller. Persönlich bewege ich die Dose alle 5-8 Minuten. Nach 20 Minuten wird man erste Ergebnisse sehen können. Platine mit Handschuhen/Pinzette rausholen – oder die Dose so Kippen, dass die Platine sichtbar wird.
So lange wiederholen, biss alles Kupfer weg ist, was weg sein soll. Bei mir ist das meist nach 30-35 Minuten. Dann sind nur noch leichte Reste zu sehen, ich schüttle die geschlossene Dose ein paar Sekunden recht häftig(Dichtigkeit der Dose beachten!;D), danach ist meist alles weg
Ich mach es dann so, dass ich die Platine in die Dose mit dem Wasser lege (-> Fleckengefahr verringern), Deckel zu, das Wasser dann leicht aufdrehe und das Wasser in den Abfluss gieße. (Das Benutze Eisen3 bleibt natürlich in der Dose -> Wiederverwendung). Dose Wegstellen, Platine und alles andere mit Wasser abspülen
Platine weglegen und alle Flecken, alle geblichen Schleier direkt wegwischen!
Platine dann mit Zewa und Aceton reinigen. Die belichtete Schicht geht dann ab und das Kupfer glänzt
fertig geätzte Platine
fertig geätzte Platine
Nacharbeiten
Zum Abschluss nochmal überprüfen, ob die Abstände und Größen richtig sind
Bahnen auf Kurzschlüsse prüfen. Falls vorhanden, mit einem Skalpell oder Cutter-Messer trennen
Bei Bedarf Löcher Böhren
Man kann das Kupfer noch verzinnen u.Ä. das kommt dann aber im nächsten Level.
Fertig

Der letzte Schritt, das Löten, sollte sich selbst erklären. Wie am Anfang beschrieben sollte man bei Stiftleisten darauf achten, dass sie von der Unterseite durchgeführt werden müssen – sitzt das Plastik auf den Löt-Pads, lassen sie sich quasi nicht löten. Beim Löten darauf achten, dass dünne Leiterbahnen sich bei zu langer Erhitzung von der Platine lösen können.
