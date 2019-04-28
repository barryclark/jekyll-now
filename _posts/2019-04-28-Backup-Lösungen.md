---
layout: post
title: Zwei CanSats in einem!
lang: DE
ref: BackupCanSat
categories: [cansat2019]
teaserImage: /images/posts/2019-04-28_ATTiny-Testing.jpg
---

Im Vergleich zu unserem letztjährigem CanSat ist unsere geplante Hard- und Software für uns deutlich anspruchsvoller und komplexer geworden – und damit auch fehleranfälliger. Wir können uns nicht gegen jede Fehlerquelle absichern, und daher ist es gut, für alle Fälle ein Backup zu haben. 

Beispielsweise könnte eine einzelne verkehrt platzierte Leiterspur wortwörtlich den Prozessor grillen, eine falsch beschriebene Speicheradresse das gesamte Programm zum Stoppen bringen oder durch die Vibrationen beim Start die SD-Karte aus der Halterung fallen. Ein Backup-System, das gegen solche Fälle abgesichert ist, muss völlig separat vom Hauptsystem arbeiten und so robust wie möglich sein. Außerdem muss es selbstständig die Primärmission erfüllen können – also wie ein eigenständiger CanSat (nur ohne Sekundärmission)!

{% include post-figure.html path="/images/posts/2019-04-28_STM-vs-ATTiny.jpg" alignment="right" image_size="medium" caption="So klein ist unser Backup-ATTiny im Vergleich zum Development-Board des STM32, den wir für unsere Hauptsystem verwenden." %}

Alles was wir dafür brauchen ist einen Mikrocontroller zusammen mit einem kleinen Speichermodul, der ein eigenes Thermometer und Barometer ausliest und so wenig Strom wie möglich verbraucht, um komplett in den CanSat integriert zu werden. Klingt nach einer Aufgabe für den ATTiny85!

Der [ATTiny85](https://www.microchip.com/wwwproducts/en/ATtiny85) ist ein sehr kleiner Mikrocontroller von Microchip mit gerade mal fünf I/O-Pins (plus Reset-Pin), 8 KB Programmspeicher und 512 Byte Arbeitsspeicher. Das ist zwar nicht viel, aber durchaus ausreichend für unsere Anwendung. Zum Messen der Temperatur und des Luftdrucks verwenden wir den BMP280, einen kleinen und stromsparenden Sensor von Bosch. Dieser wird über I²C angesteuert. Die Messdaten werden als Datensätze von 8 Byte (Temperatur- und Luftdruckmessung zusammengenommen) auf einen M24M02 EEPROM von STMicroelectronics geschrieben. Dieser bietet mit 2 MB genug Speicherplatz für 31.250 Messungen, was bei einer Laufzeit von einer Stunde circa 8 Messungen pro Sekunde entspricht.

{% include post-figure.html path="/images/posts/2019-04-28_ATTiny-Testing.jpg" alignment="center" image_size="big" caption="Hier testen wir, den BMP280-Sensor und den M24M02-EEPROM mit dem ATTiny anzusteuern." %}

Auch das Backupsystem muss laut Designvorschriften eine Laufzeit von mindestens 4 Stunden erfüllen. Als Gesamtstromverbrauch der einzelnen Komponenten inklusive Fehlertoleranz rechnen wir mit 7 mA. Eine typische 12 mm Lithiumknopfzelle hat eine durchschnittliche Kapazität von 35 mAh, was bei unserem Setup für mehr als 5 Stunden ausreicht.

Für alle die es interessiert, habt ihr hier noch den Schaltplan:

{% include post-figure.html path="/images/posts/2019-04-28_Backup-Schematic.png" alignment="center" image_size="big" %}
