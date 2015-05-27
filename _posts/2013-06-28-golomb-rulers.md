---
title: Golomb Rulers
link: https://literals.wordpress.com/2013/06/28/golomb-rulers/
author: jamesbuckland
description: 
post_id: 77
created: 2013/06/28 12:00:02
created_gmt: 2013/06/28 17:00:02
comment_status: open
post_name: golomb-rulers
status: publish
post_type: post
layout: post
---

# Golomb Rulers

[Golomb rulers](http://en.wikipedia.org/wiki/Golomb_ruler) are mathematical structures (rulers, really) which almost perfectly demonstrate [my earlier article](http://literals.wordpress.com/2013/06/17/time-dilation-and-gps-satellites/) on the oft-delayed values of pure mathematics. A perfect Gombol ruler will be a set of markings which can measure every consecutive integer distance below its total length. For example: the gombol ruler of order four (four markings) and length six (in total, six units long) contains, within it, the measurements: 
    
    
    ![golomb_4_optimal](http://literals.files.wordpress.com/2013/06/golomb_4_optimal.png)

which are consecutive, optimal, and non-repeating. This is a fascinating mathematical structure — particularly the [proof](http://cgm.cs.mcgill.ca/~athens/cs507/Projects/2003/JustinColannino/#Perfect Golomb Rulers) that a perfect (non-repeating) Golomb ruler with more than four marks on it cannot exist. However, it is the _applications, _as duly noted in [Bill Rankin's 1993 thesis on the topic](http://people.ee.duke.edu/~wrankin/golomb/golomb_thesis.pdf) (section 1.2), that are of particular interest — indeed, it has applications in radio telecommunications, [x-ray crystallography](http://en.wikipedia.org/wiki/X_ray_crystallography), radio arrays, and anything else which requires the deliberate and efficient _mechanical_ use of [integer-valued nodes on wavelengths](http://en.wikipedia.org/wiki/Node_\(physics\)) — that is, the need for an apparent continuum to be split into integer values. In addition, Golomb rulers can be used by information theory to produce efficient [error-correcting codes](http://en.wikipedia.org/wiki/Error_Correction) (transmissions with additional information about their coherent communication) as a sort of [hash function](http://en.wikipedia.org/wiki/Hash_function); a self-orthogonal structure which reacts predictably to any errors in communication. In conclusion — Golomb rulers are wicked cool.