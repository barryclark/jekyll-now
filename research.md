---
layout: page
title: Research
permalink: /research/
---

Genome-wide analyses of the past few years have revealed that a substantial portion of the genetic control of complex traits is exerted through the regulation of gene expression. Much of the genetic variation associated with complex traits falls outside the protein coding regions of genes. Mechanistic understanding of how this variation contributes to phenotype is lacking, but gene regulation is thought to play a major role. We develop and apply methods that fully harness gene regulation within complex trait association and prediction studies.

##OmicKriging

We have developed a novel systems approach to complex trait prediction, which leverages and integrates similarity in genetic, transcriptomic or other omics-level data. Our method called OmicKriging (published in <a href="http://www.ncbi.nlm.nih.gov/pubmed/?term=PMC4072756"><i>Genetic Epidemiology</i></a>) emphasizes the use of a wide variety of systems-level data, such as those increasingly made available by comprehensive surveys of the genome, transcriptome and epigenome, for complex trait prediction. For example, integrating different omic correlation matrices such as a genetic relationship matrix (GRM) derived from SNPs and a gene expression correlation matrix (GXM) derived from gene expression levels may optimize predictive performance over either dataset alone.

![OKFig2]({{ site.baseurl }}/images/OKFig2.jpg)

##PrediXcan

We have developed a gene-based association method called PrediXcan (pronounced "predict-scan") that directly tests the molecular mechanisms through which genetic variation affects phenotype. The approach estimates the component of gene expression determined by an individual’s genetic profile and correlates the “imputed” gene expression with the phenotype under investigation to identify genes associated with the phenotype. The genetically regulated gene expression is estimated using whole-genome tissue-dependent prediction models trained with reference transcriptome datasets. The PrediXcan novel gene-based test is focused on the mechanism of gene regulation and comes with key information on direction of effect (i.e. whether high or low gene expression is associated with disease risk). Directional information can help to close in on potential drug targets.

![PredXFig2]({{ site.baseurl }}/images/Fig2-PrediXcan-Framework.jpg)

##Future research

For our future research, we will apply and extend methods like <a href="http://cran.r-project.org/web/packages/OmicKriging/index.html">OmicKriging</a> and <a href="https://github.com/hakyimlab/PrediXcan">PrediXcan</a> using data available to the public and researchers from databases like the Gene Expression Omnibus (<a href="http://www.ncbi.nlm.nih.gov/geo/">GEO</a>), the database of Genotypes and Phenotypes (<a href="http://www.ncbi.nlm.nih.gov/gap">dbGaP</a>), The Cancer Genome Atlas (<a href="http://cancergenome.nih.gov/">TCGA</a>), and the European Genome-Phenome Archive (<a href="https://www.ebi.ac.uk/ega/home">EGA</a>). These databases contain genome-wide genotype (genotyping array and exome sequencing) and gene expression (microarray and RNA-seq) datasets. Many funding sources (including the <a href="http://www.nih.gov/">NIH</a>) require database deposition of genome-wide datasets and thus the amount of data available will continue to grow. Combining gene expression data and multiple variants within a gene or pathway may reveal new genetic associations with a particular phenotype that were not discovered in an original association study where the genetic variants were analyzed singly. In addition, combining gene expression and genetic association data from multiple different studies may reveal new associations that were missed by single investigations. Because so much data is publicly available, students interested in joining our lab could potentially choose to study traits and diseases that interest them while learning how to mine the data and perform computational modeling. 

##Collaborators

<a href="https://imlab.uchicago.edu/">Haky Im Lab</a>

