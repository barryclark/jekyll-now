---
layout: post
title: Single-Cell Notes
tags: single-cell list tutorials bioinformatics R
---

I have been working on single-cell data for almost a year now and I will be using this blog to detail what I have learned along with some tips and tricks. 

My research focuses on development of mesenchymal tissues and how genes that regulate these processes could be used to better understand soft tissue sarcomas and osteosarcomas. 

Below are some publications, tutorials, and workshops that I found helpful. 

## Publications

- [Comprehensive Integration of Single-Cell Data](https://www.cell.com/cell/pdf/S0092-8674(19)30559-8.pdf) - This article comes from the [Satija lab](https://satijalab.org/), who developed [Seurat](https://satijalab.org/seurat/), one of the most popular R package for single-cell RNA-seq data. This paper highlights Seurat V3 which added methods for single-cell integration, normalization using sctransform, as well as a restructured Seurat object for multi-modal data (i.e., RNA, ATAC, protein, etc.). I highly recommend reading and re-reading this article as I always find myself learning something new. 

- [Current best practices in single‐cell RNA‐seq analysis: a tutorial](https://www.embopress.org/doi/10.15252/msb.20188746) - This is a must read for anyone entering the single-cell space. It details all of the current best practices while providing rationale and many alternate methods. It answered a majority of my questions when the tutorials I previously read did not give a reason as to why such methods were being performed on the data. 


## Tutorials

- [Seurat](https://satijalab.org/seurat/vignettes.html){:target="_blank"}

- [Monocle 3](https://cole-trapnell-lab.github.io/monocle3/docs/introduction/){:target="_blank"}

- [Scanpy](https://scanpy.readthedocs.io/en/stable/tutorials.html){:target="_blank"}


## Workshops

- [BioC 2020: Where Software and Biology Connect](https://bioc2020.bioconductor.org/workshops){:target="_blank"} - Added 2020/07/19. Over 20 workshops related to single-cell analysis. 

- [Orchestrating Single-Cell Analysis with Bioconductor](https://scrnaseq-course.cog.sanger.ac.uk/website/index.html){:target="_blank"} - This is a very in-depth and comprehensive workshop for single-cell RNA-seq analysis in R using packages from Bioconductor. I have not yet gone through it because I saw it today and it was posted online 2 days ago.

- [ANALYSIS OF SINGLE CELL RNA-SEQ DATA](https://broadinstitute.github.io/2019_scWorkshop/){:target="_blank"} - This workshop may be a bit outdated now but it runs through the entire workflow of single-cell RNA-seq processing and analysis. I found it incredibly useful as not only does it provide many alternate methods for processing, this workshop also includes the code to run the different packages too. 

- [Analysis of single cell RNA-seq data](https://scrnaseq-course.cog.sanger.ac.uk/website/index.html){:target="_blank"} - The above workshop and this one may be outdate as well since both were published in 2019. Nonetheless, they still contain useful information including comparisons between different analytical methods, albeit perhaps outdated as well.  

- [Single Cell Genomics Day: A Practical Workshop](https://satijalab.org/scgd/){:target="_blank"} - Definitely keep an eye on this as it is updated yearly. This is in-person workshop but the presentations are recorded (some of them) and the slides are posted. It is a good place to check out if you are interested in seeing how the latest techniques are being used. 

That's it for now. I may update this if I see new information.

