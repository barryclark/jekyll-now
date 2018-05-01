---
layout: post
title: Schaltplan und Platinendesign
lang: DE
ref: PCBDesign
teaserImage: /images/CanSat_PCB_V1.png
---

Nach einiger Zeit voller Prüfungen und Tests haben wir
uns endlich dazu durchgerungen, den nächsten Schritt im Design
unseres CanSats zu betreten: Die Platinen.

### Schritt 1: Schaltplan Design

Bevor man damit anfängt, einen PCB (Printed Circuit Board, zu deutsch Platine) zu drucken,
sollte man natürlich wissen, was man überhaupt designen will. Dazu hilft es, einen Schaltplan zu erstellen.
Dabei zeichnet man erstmal alle seine benötigten Komponenten und die elektrischen Verbindungen dazwischen ein
und ordnet alles an. 

{% include image.html path="/images/Erster_Schaltplan.jpg" caption="Unser erster Schaltplan, hier noch auf Papier" %}

Am besten macht man das Ganze digital, aber es hilft, sich das ganze auf Papier nochmal festzuhalten.
Wir haben als Design Tool die Webanwendung EasyEDA verwendet, mit der man gezeichnete Schalpläne auch direkt zu PCBs umwandeln kann.
Die Elektronik hatten wir vorher bereits auf Steckplatinen angeordnet, deswegen konnten wir diese Verbindungen eins zu eins übernehmen.

{% include image.html path="/images/CanSat_Schaltplan.png" caption="Unser Schaltplan. jeder Kasten steht für eine Schicht im CanSat, die dann übereinander angeordnet werden" %}

### Schritt 2: PCB Design

Nachdem man seinen Schaltplan erstellt hat, kann man zum PCB Design übergehen.
Dabei ordnet man wieder alle seine Komponenten an, diesmal aber so, wie alles später auch aussehen soll.
Auch muss man beachten, dass man alle Leiterbahnen sorgfältig anordnet, besonders, wenn man nur wenig Platz hat.
Wir haben dazu entschieden, drei verschiedene Platinen zu designen, welche im CanSat übereinander angeordnet werden sollen.

{% include image.html path="/images/CanSat_PCB_V1.png" caption="Unser PCB Design" %}

### Schritt 3: Ausdrucken und „Testbestückung“

Dieser Schritt ist nicht wirklich wichtig, aber bevor man sehr viel Geld für etwas ausgibt, das später nicht funktioniert,
lohnt es sich, das Design auszudrucken und auf Pappe zu kleben. Zwar kann man damit nicht die elektrischen Verbindungen an sich
überprüfen, allerdings kann man schauen, ob alle Komponenten auch so auf die Platine passen, wie man es sich gedacht hat.
Vor allem für uns ist das ganz hilfreich, da wir das Ganze in drei Raumebenen verschieben und vergleichen können, ob alle 
Verbindungen auch übereinander passen.

{% include image.html path="/images/CanSat_PCB_Layout.jpg" caption="Zum Testen: Alle drei Layer auf Pappe ausgedruckt und bestückt" %}

### Und jetzt?

An sich wären wir damit schon fertig. Allerdings gibt es noch ein paar Sachen, die wir optimieren wollen.
Zum Beipsiel möchten wir schauen, ob wir das Ganze platzsparender anordnen können. Auch wäre es hilfreich, drei 
übereinanderliegende Löcher zu haben, über die wir die PCBs fest miteinander verbinden können. Und den Antennenpin vom Funkmodul
wollen wir über einen Datenpin nach oben legen, damit die Antenne auch oben anstatt in der Mitte des CanSats liegt.
