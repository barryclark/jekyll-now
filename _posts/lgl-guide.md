---
layout: page
title: LGL - the Large Graph Layout
---
<img src="http://www.visualcomplexity.com/vc/images/120_big01.jpg" width="500"/>
<br>*[Protein Homology Graph, Edward Marcotte and Alex Adai, MOMA](http://www.moma.org/interactives/exhibitions/2008/elasticmind/#/211/)*

Last summer, I had a 500,000 node/million connection network, and no way to look at its structure. Cytoscape maxed out at about 100,000 connections, and for some reason which I can't remember now,  I never got my network to load on the million node capable OpenOrd Layout for Gephi. As nicely outlined by in Martin Krzywinski's  [Hive Plot pag](http://www.hiveplot.net/), even if a software is capable of laying out a giant network, it is more than likely to create an unintepretable hairball. The Large Graph Layout (LGL) was created by Alex Adai in [Edward Marcotte's lab](http://marcottelab.org/index.php/Main_Page) to visualize large networks while avoiding hairballs. The algorithm itself is described in the original paper, ["LGL: Creating a Map of Protein Function with an Algorithm for Visualizing Very Large Biological Networks"](http://www.marcottelab.org/paper-pdfs/jmb-lgl.pdf). Basically, the algorithm first discovers disconnected clusters in the data, and then lays them out indidually. LGL works radially, where each cluster begins with a seed node, and new connections are added on spheres which are force directed out from the existing cluster.          

As there aren't many resources on using the Large Graph Layout, I wanted to do a quick post on my tips for using the software. This post is meant to supplement the [main FAQ](http://www.opte.org/lgl/) and the [README](https://github.com/TheOpteProject/LGL/blob/master/README.txt). LGL is mainly maintained by the Opte Project to map the internet, and the most recent version of the software can be cloned from their [ Github](https://github.com/TheOpteProject/LGL), with git clone https://github.com/TheOpteProject/LGL.git . 

#### LGL tips

The input format to LGL is called .ncol, which is just a space separated list of two connected verteces with an optional third column of weight. 
```
vertex1 vertex2 [optional weight]
 ```
Key points for formatting the input .ncol
* Each line must be unique
* A vertex may connect to many other verteces
* A vertex cannot connect to itself
* If a line is B-A, there cannot also be a line A-B 
* There can't be blank lines
* There can't be blanks in any column
* No header line

```
vertex1 vertex2
vertex1 vertex3 # OK
vertex1 vertex2 # Will cause error
vertex1 vertex1 # Will cause error
vertex2 vertex1 # Will cause error
                # Will cause error
vertex3         # Will cause error
```

##### Coloring

In order to color an LGL, each pairwise connection must have an R G B value.  RGB values must be scaled to one 1, so just divide each number of an RGB value by 255. The rules for formatting an .ncol file apply here too, i.e. no blanks, no empty lines, no redundancy , etc. 
```
vertex1 vertex2 1.0 0.5 0.0 
vertex3 vertex4 0.0 1.0 0.8 
vertex5 vertex6 0.1 0.1 1.0
```

##### An LGL workflow

I would begin by making a file of all pairwise connections and their associated traits. It can be difficult to keep .ncol and .color files in sync, and so it will cause fewest headaches to begin with one file containing all the information to create both. 

*homology.txt*
```
#node1 node2 source score rank species1 species2
protein1 protein2 blastp 150 1 mouse human
protein3 protein4 blastp 50 2 wheat rat
protein2 protein5 hmmscan 60 3 human human
```
Then take the first two columns (minus the header) to create an .ncol file.
*homology.ncol*
```
$ awk '{print $1, $2, $3} homology.txt  | awk '{if(NR>1)print}' 
$ cat homology.ncol
protein1 protein2
protein3 protein4
protein2 protein5
```
Then choose a trait, and create a connections.colors file. I generally select the first two columns, and a trait to color by, then use sed to replace the trait values with the RGB value I want to color a connection by.

In this file, I want to color all connections predicted with the algorithm hmmscan red, and all connections found with blastp blue. 
```
$ awk '{print $1, $2, $3} homology.txt  | awk '{if(NR>1)print}' >  homology.ncol.tmp #get columns, remove header
$ sed -i 's/hmmer/1 0 0/g' homology.ncol.tmp
$ sed 's/blastp/0 0 1/g' homology.ncol.tmp > homology_algorithm.connection.colors
$ cat homology_algorithm.connection.colors
protein1 protein2 1 0 0
protein3 protein4 0 0 1
protein2 protein5 0 0 1
```
I can also color each vertex by some trait. In this file format, each vertex must have an associated RGB value. In this case, I want to color ever human protein red, and proteins from every other species blue. 

```
$ awk '{print $1, $6} homology.txt  | awk '{if(NR>1)print}'`> vertex1_species.tmp
$ awk '{print $2, $7} homology.txt  | awk '{if(NR>1)print}'`> vertex2_species.tmp
$ cat vertex1_species.tmp vertex2_species.tmp | sort -u > homology_human.vertex.colors.tmp
$ sed -i 's/human/1 0 0/' homology_human.vertex.colors.tmp
$ sed 's/mouse\|wheat\|rat/0 0 1/' homology_human.vertex.colors.tmp > homology_human.vertex.colors
$ cat homology_human.vertex.colors
protein1 0 0 1
protein2 1 0 0
protein3 0 0 1
protein4 0 0 1
protein5 1 0 0
```






##### Examples 
*  The Opte Project uses a minimal spanning LGL to [map the internet](http://www.opte.org/) every few years.   
*  Aaron Swartz used LGL for a neat [visualization of blogspace in 2006](http://www.aaronsw.com/weblog/blogviz). 
*  The Museum of Modern Art in New York picked an LGL of protein homologies (top image) for their 2008 exhibit ["Design and the Elastic Mind"](http://www.moma.org/interactives/exhibitions/2008/elasticmind/#/211/)

##### Conclusion

In the Marcotte lab, LGL is having a renaissance. Any type of pairwise data can be quickly formatted for LGL for a quick visual diagnostic of the data structure. Since  this layout has been so useful for me to look at my data, I hope these tips will encourage others to try it out for their giant network visualization issues! 
