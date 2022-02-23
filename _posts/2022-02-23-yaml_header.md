---
layout: post
title: "YAML-Header Vorlagen"
---

## Header für kurze Texte

Für Texte wie kleine Rechtsfälle oder Essays reicht ein kurzer Header
mit Titel, Name des Autors und Angaben zur Bibliographie. Folgendes
Beispiel dürfte das wesentliche abdecken.

```yaml
---
title: Titel
author: Verfasser
date: 23.02.2022

# Bibliographie
bibliography: Bibliographie.yaml
csl: chicago-note-bibliography.csl

# output
output: 
    pdf_document:
        latex_engine: xelatex
    fontsize: 12pt
    papersize: a4
    lang: de-CH 
---

````

Der Header bietet die Möglichkeit, Kommentare einzufügen. Kommentare
werden mit einer Raute gekennzeichnet.
