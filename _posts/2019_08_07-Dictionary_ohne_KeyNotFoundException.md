---
layout: post
title: Dictionary ohne KeyNotFoundException
---

Derzeit arbeite ich mit dem DevExpress DataGrid für WPF und erstelle die Spalten dynamisch, auf der Basis des Datenbankmappings. Dabei greifen die Daten auf normale Properties, aber auch Felder in einem Dictionary zu.

{% gist b8246fc93e0b747476f7b18ce303ae0f notCareAboutMissingFieldsDictionary_DataRow.cs %}

Problem: Nicht jedes Feld aus dem Mapping z.B. "title" hat auch in dem Dictionary einen entsprechenden Schlüssel. Das DataGrid, bzw. das Binding wirft hierbei allerdings eine Exception, die auf eine KeyNotFoundException zurück zu führen ist. Also muss eine neue Implmentierung des Dictionarys diese Exception verhindern.

Nun ist es so, dass man nicht einfach von Dictionary erben kann und den nicht-virtuellen Indexer überschreibt. Außerdem sind, selbst wenn man mittels "new" den Indexer überschreibt, viele Methoden private und nicht zugreiffbar. Also musste eine neue Implementierung eines IDictionary her, die bei einem fehlenden Schlüssel den Default für TValue zurück gibt und keine Exception wirft.

Hier der kleine Gist für Copy&Paste

{% gist b8246fc93e0b747476f7b18ce303ae0f notCareAboutMissingFieldsDictionary.cs %}
