---
layout: post
title: Text Mining in Asthma, Allergy and Immunology - Part 1 of 2
author: Preston Burns and Becca Krouse
---

In the field of clinical research, many important deliverables exist in the format of a PDF or other text-based document. Examples range from Protocols, SAPs, and CRFs to Manuals and Reports. These documents are essential for guiding research and disseminating results, but Researchers already derive great value from these documents as they read and reference them throughout the life of a study. But what if we could extract even more value from these same resources, even long after a study has been completed?  This idea motivated our interest in text mining, which is an extensive analytical domain centered on deriving quality information from text documents.  To showcase our explorations into the world of text mining, we present this blog post focusing on some of the simpler techniques we applied to study protocols.
We began by selecting a set of 15 protocols from studies within the Inner City Asthma Consortium  (ICAC). Each study captures a unique aspect of the disease, and some are more alike than others. From these 15 ICAC protocols, we obtained word counts, and calculated a statistic called TF-IDF (term frequency-inverse document frequency). TF-IDF is a metric capturing the *uniqueness* and *frequency* of a word that appears in a document.  For example, if we decided to only use raw term frequency as our metric of importance, the word ‘Asthma’ would receive a high score for each of the documents, but that doesn’t help us understand what makes each document unique. By penalizing these common words, TF-IDF helps us find words that are *meaningful* rather than just frequent. Using TF-IDF values, we plotted the top 12 most meaningful words in each document:

## Top 12 Meaningful Words by Study
<img src="{{ site.baseurl }}/images/Top-12-Meaningful-Words-By-Study-Cropped.png"/>

In these plots, each panel represents a study/document, the y-axis contains the top 12 words by document, and the x-axis shows the TF-IDF.  Notice that TF-IDF is comparable between documents.  For example, “extract” is uniquely and commonly found in multiple immunotherapy studies such as SCITCO, SCITMO, and SCSS, while “registry” is unique to RACR2, the only registry study of the group.  For this reason, the bar for “extract” has a lower magnitude than the bar for “registry”.  The top words in the panels give us clues about key features of the studies.  For example, “Xolair”/”omalizumab” are treatments provided in both ICATA and PROSE, and “mepolizumab” is the treatment given in MUPPITS-2.
So why should you care about this simple technique?
We just turned documents into numbers - and numbers unlock efficient analysis. Finding answers to important questions about these documents no longer requires reading all 15 of them. Let’s see what  answers we can find!
Using this metric as our base, we can apply another common text mining technique to determine the similarity of documents: cosine similarity. The following heatmap displays the results of this analysis; the darker the square the more similar the documents are.

## Heatmap of Cosine Similarity between Study Protocols
<img src="{{ site.baseurl }}/images/Heatmap-of-Cosine-Similarity-between-Study-Protocols.png"/>

Strong similarity scores exist between the immunotherapy studies (SCITCO, SCITMO, SCSS, BioCSI, and BioCSI2) and a few other small groups.  For example, PROSE and ICATA share a very dark square, as they are highly similar studies due to their treatment (Omalizumab) and outcome a shared endpoint (exacerbations). Otherwise we can see that there is minimal relative similarity across the other studies.
However, there may be some nuances in the relationships that are hard to see. Let’s re-visualize these similarities using a network diagram, driven by TF-IDF as the metric. Each node will be a study protocol, and the strengths of the relationships between protocols will be represented by the thickness and darkness of the connection.

## Network of Cosine Similarity between Study Protocols
<img src="{{ site.baseurl }}/images/Network-of-Cosine-Similarity-between-Study-Protocols.png"/>

That’s much better. Our findings from the heat map are confirmed: the immunotherapy studies are closely tied together with a few other strong associations in the network. It also looks like some natural groups are forming between the protocols. Let’s see if we can cluster them into groups using hierarchical cluster analysis, again using TF-IDF as the metric.

## Study Protocol Clusters
<img src="{{ site.baseurl }}/images/Study-Protocol-Clusters.png"/>

Here are the results of the cluster analysis in the form of a dendrogram.  Short branches following splits indicate similarity, while longer branches following splits reflect large differences between the studies.  As you can see, the analysis yielded 7 clusters, leaving RACR2, CoNAC, and Epigenetics in their own individual clusters. Now that we’ve defined our clusters, how can we determine what makes each one unique?  Below we pooled the documents in each cluster and recalculated the TF-IDF values to answer this question the same way we did in the first figure.

## Top TF-IDF words by Cluster
<img src="{{ site.baseurl }}/images/Top-TF-IDF-words-By-Cluster.png"/>

The top words for the clusters often provide convenient cluster names or clearly show shared treatments or outcomes as key commonalities. For some, like ‘Minimal Intervention’, clusters have formed that we might not have expected, but these are often the most exciting as they provide information we would not have found otherwise.
Using text mining we’ve been able to determine what makes documents unique, and explore relationships between them.  What other possibilities are thereexist for text mining in clinical trials research?
That’s what we’ll touch on next time when we scratch the surface of some of the applications for text mining in clinical trials research in Part 2.

The following R packages were used in this post:
- tidyverse
- tidytext
- proxy
- dendextend
- corrplot
- qgraph
- RColorBrewer
- drlib (helpful for ggplot facets)
