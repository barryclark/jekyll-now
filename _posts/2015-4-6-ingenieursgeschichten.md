---
layout: post
title: Der Ingenieur ist der Gearschte. Aber immer der Held. Am Ende.
published: true
categories: [arbeit]
tags: [jobgedanke, elektronik]
---

Was vor zwei Wochen ein einfaches „Natürlich löte ich dir mal eben die Platinen.“ war, wurde zu einer meiner lehrreichsten Lektionen.

Ein befreundeter Ingenieur hatte mich gefragt, ob ich 2 Platinen für ihn zusammen bauen könnte. Natürlich springt man da ein – es war relativ dringend und er plante mit drei Stunden Arbeit.
Es sollte natürlich asap – as soon as possible – passieren; die Teile sollten Freitag ankommen und Montag zusammengebaut werden. Natürlich kamen die Teile Freitag, die Platinen erst Dienstag.

**Lesson 1 – Kenne dein Werkzeug**

SMD löten sollte kein Problem sein. Allerdings war ich aus meiner Ausbildung high-end Lötstationen gewohnt und ich hatte vergessen, wie schlimm <100€ low-end Geräte sind – die mir da leider nur zur Verfügung standen. Es war ein Krampf. Wenn ein Bauteil 1.6 mm × 0.8 mm groß ist (Bauform: 0603), dann müssen Lötspitzen bis zum letzen Millimeter ihre Temperatur halten und Pinzetten können dann nicht am Ende relativ exakt zusammenlaufen. Jedes Werkzeug hat seine Grenzen. Es gibt gute Gründe für teures Werkzeug.

**Lesson 2 – Arbeit kennt keine Freizeit**

Ich hatte meinen freien Tag leer geräumt, statt 3 Stunden 5 Stunden eingeplant und im Werkstatt-Kühlschrank lagen meine Grillwürstchen für den Nachmittag. Dank fehlender kompatibler Lötspitzen (-> Es gibt gute Gründe für teures Werkzeug.) und einer laut beschimpften Lötstation, wurde aus 14 Uhr dann 16 Uhr. Ich musste weg. Natürlich hatte mein Auftraggeber seinen Urlaub genau für den nächsten Tag geplant und so wurde vereinbart, dass ich an den restlichen Tagen die Platine teste und sie am Freitag alleine dem Kunden übergebe. Als Student macht einem die Uni natürlich einen Stich durch alle Rechungen und so konnte ich die Platinen erst Donnerstag Nachmittag prüfen. Zeitdruck, Unsicherheit und „nicht wissen ob die Platinen überhaupt funktionieren“- macht sich natürlich auch in der Psyche und somit auch in jeder freien Minute bemerkbar. Man muss wohl lernen abschalten zu können (toDo).

**Lesson 2,5 – Vertraue dir selbst**

Man nimmt natürlich keinen Job an, von dem man nicht halbwegs glaubt ihn schaffen zu können. Druck und Stress verändern die Wahrnehmung. Natürlich stellte sich Donnerstag Abend heraus, dass ich ordentlich gearbeitet hab. Man sollte, vor allem in stressigen Situationen, auf seine Ausbildung vertrauen.

**Lesson 3 – Der Ingenieur muss die Probleme lösen. Alle.**

Der Kunde, dem ich per Mail als ‚another engineer will do it‘ vorgestellt wurde, sollte die Platinen am Freitag selber in Betrieb nehmen. Denn Hauptsächlich bestand die Platine aus einem Mikrocontroller, den er dann selbst flashen würde. Ich hatte die Platinen getestet; aber nur die Verbindungen, nicht die eigentliche Funktion. Um so schlimmer war es, als die Boards beim Kunden nicht das taten, was sie sollten. Nach einem kurzen SmallTalk – bei dem klar wurde, dass er die Platinen wirklich dringend braucht – und einer Stunde Fehlersuche, lief es immer noch nicht.
In der Ausbildung ist es einfach: Da kann man sagen, dass man keine Ahnung hat und einem wird irgendwie unter die Arme gegriffen(zumindest war es bei mir so). Nicht im Business. Nicht, wenn Du der Einzige bist, der das Problem lösen könnte. Er musste weg, ließ die Boards bei mir. Ich deutete meine Ahnungslosigkeit an, versprach aber natürlich mein Möglichstes zu tun.

**Lesson 4 – Der Ingenieur weiß alles**

Ich hatte weder Ahnung wie ich die Boards programmiere, noch was die eigentlich machen. Ich hab daraus kein Geheimnis gemacht und es war im Grunde auch nicht mehr meine Aufgabe; aber das interessiert natürlich niemanden(->Nicht im Business.), (Ehrgeiz und Interesse darf man natürlich auch nicht vergessen). Nach der Uni ging es dann also ans Problemlösen, ohne Werkstatt, ohne Messgeräte. Die folgenden 4+4 Stunden verbrachte ich mit Kompilieren, Treiberinstallation, Dokumentationlesen, auf Downloads warten, virtuelle Linux-PCs installieren/klonen/auf PCs übertragen und viel dabei lernen. Man wird in der Ausbildung und Uni auf vieles Vorbereitet, oft bringt es einem wenig für direkte Anwendung. Aber ein möglichst großes Grundverständnis von irgendwie Allem hilft einem, Probleme schneller zu lösen. Bei so kleinen, aber zeitfressenden Dingen denkt man dann oft seufzend an „Es gibt gute Gründe für teures Werkzeug“ zurück.

**Final Lesson – Der Ingenieur ist immer der Held**

Samstag Vormittag, noch bevor ich dann endlich Brötchen für meine, schon leicht angenervte, Freundin holen gegangen bin (-> Arbeit kennt keine Freizeit) SORRY!:(, war das Problem dann gefunden und beseitigt. Und die Antwortmail des Kunden, auf die gefundene Lösung, ist wohl das, weshalb man sich diesen Stress antut:

> # That is awesome, you are a hero!
