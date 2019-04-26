---
layout: post
title: Zwei CanSats in einem!
lang: DE
ref: Backup_Lösung
categories: [cansat2019]
teaserImage: 
---

Vieles was wir für unseren CanSat an Soft- und Hardware entwickeln ist für uns im Vergleich zum CanSat den wir letztes Jahr gebaut haben auf einem für uns völlig neuem Level. Das bedeutet auch, dass es mehr unentdeckte Fehlerquellen geben kann: Beispielsweise könnte eine einzelne falsch gelegte Leiterspur wortwörtlich den Prozessor grillen, eine falsch beschriebene Speicheradresse das gesamte Programm zum Stop bringen oder durch die Vibrationen beim Start die SD Karte aus der Halterung fallen. Es gibt viele Wege, in denen was schiefgehen kann, und wir können uns nicht auf jedes einzelne Ereignis vorbereiten.

Für solche Fälle ist es gut ein Backup zu haben. Es muss völlig separat vom Hauptsystem arbeiten und so robust wie möglich sein. Außerdem muss es die missionskritischsten Aufgaben nebenher erfüllen können - in diesem Fall die Primärmission. 
Also brauchen wir einen Mikrocontroller zusammen mit einem kleinen Speichermodul, der einen eigenes Thermometer und Barometer ausliest und so wenig Strom wie möglich verbraucht, um komplett in den CanSat integriert zu werden. 
Das klingt nach einer Aufgabe für den ATTiny85!

Der ATTiny85 ist ein sehr kleiner Mikrocontroller von Microchip mit gerade mal 5 I/O Pins (plus Reset Pin), 8 KB Programmspeicher und 512 Arbeitsspeicher. Das ist zwar nicht viel, aber durchaus ausreichend für unsere Anwendung.
Zum Messen der Temperatur und des Luftdrucks verwenden wir einen BMP280 - ein sehr kleiner und stromsparender Sensor von Bosch. Dieser wird über I2C angesteuert. Die Messdaten werden als Datensätze von 8 Byte (Temperatur- und Luftdruckmessung zusammengenommen) auf einen M24M02 EEPROM von STMicroelectronics geschrieben. Dieser bietet mit 2 MB genug Speicherplatz für 31.250 Messungen, was bei einer Laufzeit von einer Stunde circa 8 Messungen die Sekunde entspricht.

Auch das Backupsystem muss laut Designvorschriften eine Laufzeit von mindestens 4 Stunden haben muss. Addiert man den Stromverbrauch der einzelnen Komponenten unter unseren Bedingungen und setzt noch eine Fehlertoleranz drauf kommen wir auf einen Stromverbrauch von gerade mal 7 mA. Eine typische 12 mm Lithiumknopfzelle hat eine durchschnittliche Kapazität von 35 mAh, was bei unserem Setup für mehr als 5 Stunden ausreicht. 
