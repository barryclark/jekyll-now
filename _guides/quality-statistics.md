---
layout: page
title: Quality Statistics
permalink: /guides/quality-statistics
---

### Stop Paying for Minitab

A key component of manufacturing (or any business really) is how processes are measured to drive improvement. Whatever method you choose, it's important to have some sort of way to distill all the data you collect into a few critical values that can be presented to management or other stakeholders.

Two common buzzwords (buzz-acronyms maybe?) when talking about processes are Cpk and G R&R. Cpk will tell you how capable a process is and can be a quick way to check if a process is in control or not.

> Before I get a bunch of emails, I'm going to somewhat conflate Pp, Ppk, Cp, and Cpk because in my experience, aside from other CQEs, I can count on one hand the number of people that care about the differences between each metric.

Cpk tends to get used to measure how capable a process is in addition to how capable it is, so we're just going to use it to 'score' a control chart, which can take what you see visually and make a single number out of it.

G R&R, or Gage Repeatability & Reproducibility, can be thought of as a Cpk for a measurement system. It's incredibly useful for determining if you're using the right tools to measure a process, and how much you can trust the data that comes from those measurements.

If you go and google how to use two tools and calculate them, you'll end up with a bunch of symbols and equations that don't really make sense if you don't have a strong statistics background (I definitely don't). Because of this, most organizations will use a software like Minitab to calculate everything, which is fine, but a bit overkill.

Minitab is incredibly powerful software, but most places I've worked have only used it to calculate these two metrics. A license fee to do the same calculations over and over is ridiculous once you see how easy it can be to implement in something like Python. Further, automation in Minitab is annoyingly difficult, as the macro language is not well documented and there are few online resources to use. When compared to something like Python or VBA, you end up spending more time looking for help than actually implementing what you want.

Minitab is great, just make sure you actually need it.

## Cpk

### Overview

## G R&R

## Overview
