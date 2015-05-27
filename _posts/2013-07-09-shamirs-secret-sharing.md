---
title: Shamir's Secret Sharing
link: https://literals.wordpress.com/2013/07/09/shamirs-secret-sharing/
author: jamesbuckland
description: 
post_id: 120
created: 2013/07/09 18:00:25
created_gmt: 2013/07/09 23:00:25
comment_status: open
post_name: shamirs-secret-sharing
status: publish
post_type: post
layout: post
---

# Shamir's Secret Sharing

[Shamir's Secret Sharing](http://en.wikipedia.org/wiki/Shamir's_Secret_Sharing) is a method of encrypting information by splitting it into _n__ _parts, such that the number of parts necessary to entirely reconstruct the information is less than _n_, often considerably. It has applications in coding theory, cryptography, and error-correcting codes. [caption id="" align="aligncenter" width="200"]![](http://upload.wikimedia.org/wikipedia/commons/thumb/6/66/3_polynomials_of_degree_2_through_2_points.svg/200px-3_polynomials_of_degree_2_through_2_points.svg.png) Any two parabolas define a set of two points.[/caption] It works on a very simple geometric principle. Take two points on a plane. Each has an _x_ and _y_ coordinate, some of them possibly negative. Through these two points pass any number of polynomials — we'll stick with parabolas so that the degree _k_ is low. We'll select, say, three parabolas that pass through these two points. This is the basis for the entire encryption algorithm. Shamir's Secret Sharing can be expanded outwards into any number of points (the more points, the more information in this chunk) with any number _n_ of _k_-degree polynomials. The actual secret to be shared is the first term of each polynomial. The mathematics is [not terribly complicated](http://en.wikipedia.org/wiki/Shamir's_Secret_Sharing), but it works on this incredibly simple geometric principle.