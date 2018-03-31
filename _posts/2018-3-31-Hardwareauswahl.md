---
layout: post
title: Sensor- und Elektronikauswahl
lang: DE
ref: Sensorauswahl
teaserImage: /images/Prototyping.jpg
---

Die letzten Tage waren wir ziemlich aktiv und haben viel
an der Hardware und Software für den CanSat gearbeitet. Wir geben
euch hier mal einen kurzen Überblick über die Sensoren und Elektronik
die wir verwenden werden.

### Primärmission
Die Primärmission besteht darin, während des Fluges den Luftdruck und
die Temperatur zu messen. Dazu verwenden wir den [BMP180](https://www.amazon.de/kwmobile-Luftdruck-digitalem-Barometric-Raspberry/dp/B01M0LU3KF/), 
einen ziemlich akuraten und einfach anzusteuernden Sensor.
Preis: 8,40€


### Sekundärmission
Für unsere Sekundärmission wollen wir während des Fluges die Feinstaubverteilung
in der Atmosphäre messen. Ursprünglich wollten wir den Nova SDS011 verwenden, da
dieser extrem genau ist und bereits einen Ventilator eingebaut hat.
Allerdings war dieser ca. 2 mm zu groß für die Dose.
Deswegen haben wir uns für den [Waveshare GP2Y1010AU0F](https://www.amazon.de/Waveshare-Dust-Sensor-GP2Y1010AU0F-Conditioner/dp/B00T2T7FUS/)
entschieden. Der ist zwar nicht ganz so genau, sollte aber für unsere Zwecke ausreichen, 
da wir hauptsächlich die Verteilung in der Atmosphäre messen wollen und keine absoluten Werte brauchen (obwohl die immer noch besser wäre).
Preis: 15,99€


### Steuerung
Zum Ansteuern der einzelnen Komponenten verwenden wir nicht nur einen, sondern gleich zwei [Arduino nanos](https://www.amazon.de/gp/product/B0713ZRJLC/)!
Warum zwei? Nach ersten Versuchen haben wir herausgefunden, dass das Loggen der Daten auf die SD Karte mehr als
30% Arbeitsspeicher auf dem kleinen ATmega328P Chip des Arduino Nanos verbraucht: Platz, den man auch anders nutzen kann.
Deswegen sammelt der erste Arduino die gesamten Datensätze und sendet sie über die serielle Schnittstelle an den
zweiten Arduino, der sie dann auf die SD Karte logt. 
Preis: ca. 4,75€ pro Arduino nano


### SD Kartenleser + SD Karte
Wir waren uns nicht sicher, ob wir wirklich einen Kartenleser brauchten. Aber was wäre, wenn die Funkkommunikation versagt und
wir keine Daten empfangen? Das waren uns die 4g bzw. 6,10€ doch wert. Wir verwenden den [MicroSD card breakout](https://www.adafruit.com/product/254)
von Adafruit. Der ist einfach zu verwenden und funktioniert zuverlässig (wenn man ihn richtig ansteuert).
Preis: 6,10€ (+ 8,90€ für SD Karte)


### GPSModul
Das [GPS Modul](http://www.watterott.com/de/Adafruit-Ultimate-GPS-Breakout-66-channel) ist nicht nur hilfreich, um die Posistion und Bewegung des CanSats zu bestimmen, 
es hat auch einen anderen Vorteil, an den viele vielleicht nicht denken: Es kann die Zeit bestimmen.
Für viele kleine Mikrokontroller wie den Arduino ist es schwierig, eine genaue Zeit anzugeben, da die intere Uhr irgendwann nicht mehr im Takt ist.
Mit dem GPS Modul können wir ziemlich akurat die Zeit bestimmen und unsere Datensätze mit einem Zeitstempel versehen, damit
wir sie auch richtig auswerten können.
Das Modul das wir verwenden wurde auch von Adafruit hergestellt, allerdings haben wir unseres von watterott.com bestellt.
Watterott unterstützt den CanSat Wettbewerb auch dieses Jahr und ermöglicht es uns, sonst relativ teure Komponenten umsonst zu erhalten.
Preis: 44,90€


### Funkmodul
Auch das Funkmodul das wir verwenden ist von Adafruit. Wir senden auf 433 Mhz mit dem [RFM69HCW](https://www.adafruit.com/product/3071). Dieses Modul bietet
eine Netzwerkfunktion und Datenverschlüsselung (nicht, dass noch jemand unsere Daten klaut). Die Daten werden vom CanSat
in Paketen gesendet und mit der Bodenstation empfangen und entschlüsselt. An sich gibt es hier nicht viel zu sagen, außer
dass es ein nettes, kleines Funkmodul mit vielen Funktionen ist.
Preis: 8,10€


### Und sonst so?
Das hier Aufgelistete ist natürlich nicht alles. Eventuell kommt noch ein Luftfeuchtigkeitssensor dazu, um
den Feinstaubsensor zu kalibrieren. Oder wir finden noch einen tollen anderen Sensor, den wir unbedingt mit einbauen wollen.
Aber das, was hier steht wurde schon bestellt und erfolgreich getestet, deswegen bleibt es auf jeden Fall in dem Paket.
Die nächsten Tage werden wir noch weiter die Software für unseren CanSat anpassen und verbessern, also kannt ihr dafür auch 
schonmal einen Blogeintrag erwarten.

Wir wünschen allen frohe Ostern!
