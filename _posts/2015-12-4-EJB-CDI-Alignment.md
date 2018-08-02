---
layout: post
title: EJB and CDI - Alignment and Strategy
---

I often get questions related to EJB and CDI, to the convergence (or the divergence!) between those 2 important Java EE technologies. <!--more-->That particular topic was discussed a few months ago by Linda De Michiel (Java EE Specification Lead and former JPA Specification Lead) during JavaDay Tokyo 2015.

In her session, Linda first set the stage by discussing the history of both EJB and CDI, and how those 2 technologies have evolved over time. She then discussed the advantages and disadvantages, some of the gaps between those 2 technologies. Linda finally concluded by discussing some strategies to improve things going forward. For example, the @Transactional interceptors was introduced in Java EE 7. In Java EE 8, the idea is to continue on the path of extracting additional container services to make those more widely and more easily available in the platform. Java EE 8's CDI Security Interceptors and the new 'flexible MDB' comes to mind.
This is an interesting talk as it discusses the past, the present and the future of fundamental Java EE technologies. It should be mentioned that David Blevins and Jean-Louis Monteiro (TomEE) gave a similar talk during JavaOne : "EJB/CDI Alignment (What does it Mean?)

<center><iframe width="743" height="418" src="https://www.youtube.com/embed/vhGcbUAPFvk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></center>


<center><iframe src="//www.slideshare.net/slideshow/embed_code/key/Eh5jBfcQ6pxORN?startSlide=3" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <a href="//www.slideshare.net/delabassee/ejb-and-cdi-alignment-and-strategy" title="￼EJB and CDI - Alignment and Strategy" target="_blank">￼EJB and CDI - Alignment and Strategy</a> from <a href="//www.slideshare.net/delabassee" target="_blank">Linda DeMichiel</a></div></center>

<center><iframe src="//www.slideshare.net/slideshow/embed_code/key/aQW0DkQEsBQUv" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"><a href="//www.slideshare.net/dblevins1/2015-javaone-ejbcdi-alignment" title="2015 JavaOne EJB/CDI Alignment" target="_blank">2015 JavaOne EJB/CDI Alignment</a> from <a href="https://www.slideshare.net/dblevins1" target="_blank">David Blevins</a></div></center>


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/ejb-and-cdi-alignment-and-strategy)* blog.
