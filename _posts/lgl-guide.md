---
layout: page
title: LGL - the Large Graph Layout
---
<img src="http://www.visualcomplexity.com/vc/images/120_big01.jpg" width="500"/>
<br>*[Protein Homology Graph, Edward Marcotte and Alex Adai, MOMA](http://www.moma.org/interactives/exhibitions/2008/elasticmind/#/211/)*

Last summer, I had a 500,000 node/million connection network, and no way to look at its structure. Cytoscape maxed out at about 100,000 connections, and for some reason which I can't remember now,  I never got my network to load on the million node capable OpenOrd Layout for Gephi. As nicely outlined by in Martin Krzywinski's  [Hive Plot pag](http://www.hiveplot.net/), even if a software is capable of laying out a giant network, it is more than likely to create an unintepretable hairball. The Large Graph Layout (LGL) was created in [Edward Marcotte's lab](http://marcottelab.org/index.php/Main_Page) to visualize large networks while avoiding hairballs. The algorithm itself is described in the original paper, ["LGL: Creating a Map of Protein Function with an Algorithm for Visualizing Very Large Biological Networks"](http://www.marcottelab.org/paper-pdfs/jmb-lgl.pdf). Basically, the algorithm first discovers disconnected clusters in the data, and then lays them out indidually. LGL works radially, where each cluster begins with a seed node, and new connections are added on spheres which are force directed out from the existing cluster.          



As there aren't many resources on using the Large Graph Layout, I wanted to do a quick post on my tips for using the software. This post is meant to supplement the [main FAQ](http://www.opte.org/lgl/). LGL is mainly maintained by Alex Adai, and the most recent version of the software can be cloned from the [Opte Project Github](https://github.com/TheOpteProject/LGL), with git clone https://github.com/TheOpteProject/LGL.git . 


### Examples 
The Opte Project uses the minimal LGL to [map the internet](http://www.opte.org/) every few years.   
Aaron Swartz used LGL for a neat [visualization of blogspace in 2006](http://www.aaronsw.com/weblog/blogviz). 
The Museum of Modern Art in New York picked an LGL of protein homologies (top image) for their 2008 exhibit ["Design and the Elastic Mind"](http://www.moma.org/interactives/exhibitions/2008/elasticmind/#/211/)



In the Marcotte lab, LGL is having a renaissance. Any type of pairwise data can be quickly formatted for LGL for a quick visual diagnostic of the data structure. Since it's been so useful for me looking at my data, I hope these tips will encourage others to try it out! 
