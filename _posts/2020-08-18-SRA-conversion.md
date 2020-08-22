---
layout: post
title: Converting Multiple SRA to FASTQ
tags: tutorials bioinformatics
---

In this post, I will detail how to download some raw sequence data from GEO/SRA in fastq format.

We will be using data from the following publication as an example:
Rauch A, Haakonsson AK, Madsen JGS, Larsen M et al. Osteogenesis depends on commissioning of a network of stem cell transcription factors that act as repressors of adipogenesis. Nat Genet 2019 Apr;51(4):716-727. PMID: [30833796](https://pubmed.ncbi.nlm.nih.gov/30833796/)

The data was deposited at GEO/SRA and is accessible through the GEO data set [GSE113253](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE113253){:target="_blank"}. You can further link to the relevant SRP [SRP140638](https://www.ncbi.nlm.nih.gov/sra?term=SRP140638)

Typically, this will be performed using High Performance Computing (HPC) with Platform Load Sharing Facility (or simply LSF), which is a workload management platform, job scheduler, for distributed high performance computing. Your HPC should have most of the modules needed installed for you already. If not, then please find the related-links below. 


[The SRA toolkit](https://github.com/ncbi/sra-tools)

For example, to get fastq files for the sample:GSM3405962: RNA-seq, SHSY5Y adipocyte diff 7d; Homo sapiens; RNA-Seq, you would go to the [SRP](https://www.ncbi.nlm.nih.gov/sra?term=SRP140638){:target="_blank"} linked above. 

Go to the corresponding SRA page: [https://www.ncbi.nlm.nih.gov/sra/SRX4774806[accn]](https://www.ncbi.nlm.nih.gov/sra/SRX4774806[accn]){:target="_blank"}

Copy down the appropriate Accession: `SRR7939701`

Type the following into the command line to begin downloading your data:

``` sh
prefetch -v SRR7939701
```

If you wanted to download multiple files, it is recommended to use the `RunSelector`. On the [SRP](https://www.ncbi.nlm.nih.gov/sra?term=SRP140638){:target="_blank"} page, you should see a link at the top for [Send results to Run selector](https://www.ncbi.nlm.nih.gov/Traces/study/?WebEnv=MCID_5f3a99e644419764265753ed&query_key=1){:target="_blank"}.

Here select the samples or Runs that you want to download by clicking on the appropriate checkboxes. Then download the `Accession List` and the `Metadata` if needed.

Depending on the nameing convention or format of the `Accession List`, you can download all of the Runs with the following:
``` sh
prefetch $(<SRA_Acc_List.txt)
```

Make sure you know where the files will be downloaded to or set it up in the options.

I use the following bash script for converting multiple SRA to fastq. The script will search through my SRA directory for `.SRA` files and provide these files as the input for `fasterq-dump`

``` sh
#!/bin/bash
#fasterq-dump script
#loadmodules
module load sratoolkit/2.9.4
module load parallel
#find directory
find $SCRATCH/opt/sra/*sra | parallel 'fasterq-dump -O $SCRATCH/opt/fastq {}'
```

If you have only one file, then just simply type the following the command line:

``` sh
fasterq-dump SRR7939701
```

In another post, I will detail how to align the FASTQ to a reference genome. 
