---
layout: project
title: Quadrotor Navigation
date: September 29, 2014
image: quad.png
---

## Background
Toy-level quadcopters have substantially decreased in price over the last few years, but at a cost for quality hardware.  Specifically, lower-level tier quadcopters typically have no technology onboard for pose feedback and localization.  As a result, the craft tends to drift in random directions.

## Description
Largely inspired by the work in monocular tracking at the (University of Zurich)[https://www.youtube.com/watch?v=8Ui3MoOxcPQ], the motivation of this project is to derive a six dimensional pose of a quadcopter through a perceived configuration of IR LEDs attached onboard to the craft.  A large aspect of the project is developing a controller that is fast enough to avoid instabilities, especially in the presence of humans.  