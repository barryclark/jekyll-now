---
layout: page
title: LGL - the Large Graph Layout
---
<img src="http://www.visualcomplexity.com/vc/images/120_big01.jpg" width="500"/>
<br>*Protein Homology Graph*

[New York Times article](http://www.nytimes.com/2015/09/08/science/the-tardigrade-water-bear.html?_r=0) 

Last summer, I had a 500,000 node/million connection network, and no way to look at its structure. Cytoscape maxes out at about 100,000 connections, and for some reason which I can't remember now,  I never got my network to load on the million node capable OpenOrd Layout for Gephi.      

As there aren't many resources on using the Large Graph Layout, I wanted to do a quick post on my tips for using the software.    
http://lgl.sourceforge.net/

Aaron Swartz used LGL for a visualization of blogspace in 2006 http://www.aaronsw.com/weblog/blogviz

Alex Adai 

The algorithm itself is described in the original paper, ["LGL: Creating a Map of Protein Function with an Algorithm for Visualizing Very Large Biological Networks"](http://www.marcottelab.org/paper-pdfs/jmb-lgl.pdf). Briefly, the algorithm first discovers disconnected clusters, and lays them out indidually. LGL works radially, where each cluster begins with a seed node, and new connections are added on spheres which are force directed out from the existing cluster.  

https://sourceforge.net/projects/lgl/

http://www.opte.org/lgl/
git clone https://github.com/TheOpteProject/LGL.git
Most recent source https://github.com/TheOpteProject/LGL

Moma book page
Protein Homology Graph
http://www.moma.org/interactives/exhibitions/2008/elasticmind/#/211/

https://books.google.com/books?id=u1kxPGb2hrQC&pg=PA132&lpg=PA132&dq=moma+large+graph+layout+lgl&source=bl&ots=eMCdUF4aIL&sig=roj3hAKVCgwv-tni22CE0aBCedA&hl=en&sa=X&ved=0ahUKEwjos-TR_ffKAhUF4iYKHfu2Cl8Q6AEINTAD#v=onepage&q=moma%20large%20graph%20layout%20lgl&f=false

In the lab, we've got somewhat LGL crazy. Any type of pairwise data can be quickly formatted for LGL for a quick visual diagnostic of the data structure.  
