---
layout: post
title: Tiling Convolutions
---

So a traditional kernel in a conv net maps from an image (dxwxw) to a single output value (1). 

This can be understood as an expert giving their prediction of ... Eg an expert that recognises faces votes, with some level of certainty, on whether they think that the image they are looking at has a face.

What if these experts could tell us more information?
What if ... added together?

What would it gain us if we 