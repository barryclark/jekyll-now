---
layout: post
title: Trajectory Analysis with Diffusion Pseudotime
tags: single-cell tutorials bioinformatics R
---

The beauty of single-cell RNA-seq is the ability to delineate the cell
state of each single-cell. This brings a novel advantage when
considering developmental trajectories during organ development or cell
differentiation. The reason for this is that biological processes are
not always in synchrony. 

In other words, not all cells will exist at the
same stage of differentiation. In that regard, a sample that is
sequenced could contain the entire spectrum of cells between early to
late stages of differention. To quantitate the measure of biological
progress outside of defined time-points, a new metric called
‘pseudotime’ was introduced, which is defined as a distance metric
between the ‘starting’ cell and ‘ending’ cell along the trajectory.

<h2>
Loading the files
</h2>
In this example, we will be using the [HSMM data set](http://www.bioconductor.org/packages/release/data/experiment/html/HSMMSingleCell.html){:target="_blank"}
of differentiating myoblasts developed by [Trapnell et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4122333/){:target="_blank"}. The data is
already FPKM normalized so we will add a pseudocount and log-transform
the data. Here we will generate a [SingleCellExperiment](https://bioconductor.org/packages/release/bioc/html/SingleCellExperiment.html){:target="_blank"}
object to contain our expression matrix.

``` r
library(HSMMSingleCell)
library(SingleCellExperiment)
library(scater) #http://bioconductor.org/packages/release/bioc/html/scater.html
data(HSMM_expr_matrix)
data(HSMM_sample_sheet)
m = log10(HSMM_expr_matrix + 1)
HSMM <- SingleCellExperiment(assay=list(logcounts = m), colData = HSMM_sample_sheet)
```

<h2>
Principal Component Analysis
</h2>
First, let’s run a PCA and visualize it to see if we can delineate the
different cell states. Here we have `Hours` as our cell state metadata.
As you can see, time does not separate very well within PC1 and PC2 as
there is still overlap.

``` r
HSMM <- runPCA(HSMM, ncomponents = 50)
plotReducedDim(HSMM, dimred="PCA", colour_by="Hours")
```

![]({{ site.baseurl }}/images/Diffusion-Pseudotime_files/figure-markdown_github/unnamed-chunk-2-1.png)

We can order each cell using the first principal component. The result
appear to be flipped which could be resolved using `rev()`.

``` r
pca <- reducedDim(HSMM, type = 'PCA')

HSMM$pseudotime_PC1 <- rank(pca[,1]) 
ggplot(as.data.frame(colData(HSMM)), aes(x = pseudotime_PC1, y = Hours, 
                                             colour = Hours)) +
    geom_point() + theme_classic() +
    xlab("PC1") + ylab("Timepoint") +
    ggtitle("Cells ordered by first principal component")
```

![]({{ site.baseurl }}/images/Diffusion-Pseudotime_files/figure-markdown_github/unnamed-chunk-3-1.png)
<h2>
Diffusion Mapping
</h2>
[Haghverdi et
al.](https://www.nature.com/articles/nmeth.3971.pdf?origin=ppub)
developed a method called ‘Diffusion Maps’ to infer the temporal order
of differentiating cells by modeling it as a diffusion process.
Diffusion maps is a nonlinear method that could better resolve complex
trajectories and branching than linear methods such as PCA. This method
has been implemented in the R packaged
[destiny](http://bioconductor.org/packages/release/bioc/html/destiny.html).

``` r
library(destiny)
matrix <- assay(HSMM, i = 'logcounts') #  Prepare a counts matrix with labeled rows and columns. 

dm <- DiffusionMap(t(matrix), n_pcs = 50) # Make a diffusion map.
reducedDim(HSMM, type = 'DC') <- dm@eigenvectors
plotReducedDim(HSMM, dimred="DC", colour_by="Hours")
```

![]({{ site.baseurl }}/images/Diffusion-Pseudotime_files/figure-markdown_github/unnamed-chunk-4-1.png)

As you can see, the temporal ordering of the cells is better resolved in
the diffusion map as opposed to PCA. In addition, it looks like there
are two terminal branches which actually reflects the outcome from the
original article. Next, we can try ordering the cells like we did before
by ranking the eigenvectors and seeing if the cells separate based on
time.

``` r
HSMM$pseudotime_diffusionmap <- rank(eigenvectors(dm)[,1])   # rank cells by their dpt
ggplot(as.data.frame(colData(HSMM)), 
       aes(x = pseudotime_diffusionmap, 
           y = Hours, color = Hours)) + geom_point() + theme_classic() +
    xlab("Diffusion component 1 (DC1)") + ylab("Timepoint") +
    ggtitle("Cells ordered by DC1")
```

![]({{ site.baseurl }}/images/Diffusion-Pseudotime_files/figure-markdown_github/unnamed-chunk-5-1.png)

It looks like we can at least resolve the earliest time-point (0 hours)
and there is some separation with the final time-point (72 hours). Let’s
compare with the original pseudotime by Trapnell et al.

``` r
ggplot(as.data.frame(colData(HSMM)), 
       aes(x = Pseudotime, 
           y = Hours, color = Hours)) + geom_point() + theme_classic() +
    xlab("Monocle Pseudotime") + ylab("Timepoint") +
    ggtitle("Cells ordered by Pseudotime")
```

![]({{ site.baseurl }}/images/Diffusion-Pseudotime_files/figure-markdown_github/unnamed-chunk-6-1.png)

Now let’s calculate the Diffusion Pseudotime (DPT) by setting the first
ranked cell as the root cell.

``` r
index <- 1:length(HSMM$pseudotime_diffusionmap)
dpt <- DPT(dm, tips = index[HSMM$pseudotime_diffusionmap == 1])
HSMM$dpt <- dpt$dpt

ggplot(as.data.frame(colData(HSMM)), 
       aes(x = dpt, 
           y = Hours, color = Hours)) + geom_point() + theme_classic() +
    xlab("DPT") + ylab("Timepoint") +
    ggtitle("Cells ordered by DPT")
```

![]({{ site.baseurl }}/images/Diffusion-Pseudotime_files/figure-markdown_github/unnamed-chunk-7-1.png)

<h2>
Visualizing Pseudotime in Different Embeddings
</h2>
Here we can compare between `Hours`, `dpt`, and `Pseudotime` on the
diffusion map embedding.

``` r
library(patchwork)
p1 <- plotReducedDim(HSMM, dimred="DC", colour_by="Hours")
p2 <- plotReducedDim(HSMM, dimred="DC", colour_by="dpt")
p3 <-plotReducedDim(HSMM, dimred="DC", colour_by="Pseudotime")
p1 + p2 + p3 + plot_layout(nrow=2)
```

![]({{ site.baseurl }}/images/Diffusion-Pseudotime_files/figure-markdown_github/unnamed-chunk-8-1.png)

We can also use t-stochastic neighbor embedding (t-SNE) for
visualization. You can see the branching but the large spread of cells
makes it challenging to identify the terminal points.

``` r
set.seed(42)
HSMM <- runTSNE(HSMM, dimred='PCA')

p1 <- plotReducedDim(HSMM, dimred="TSNE", colour_by="Hours")
p2 <- plotReducedDim(HSMM, dimred="TSNE", colour_by="dpt")
p3 <-plotReducedDim(HSMM, dimred="TSNE", colour_by="Pseudotime")
p1 + p2 + p3 + plot_layout(nrow=2)
```

![]({{ site.baseurl }}/images/Diffusion-Pseudotime_files/figure-markdown_github/unnamed-chunk-9-1.png)

When visualizing by UMAP, we start seeing separation of clusters which
suggests that there may be two root cells within the population and that
could explain the reasoning for the two terminal points that was
idenfied by Trapnell et al. and we observed using the diffusion map.

``` r
set.seed(42)
HSMM <- runUMAP(HSMM, dimred='PCA')

p1 <- plotReducedDim(HSMM, dimred="UMAP", colour_by="Hours")
p2 <- plotReducedDim(HSMM, dimred="UMAP", colour_by="dpt")
p3 <-plotReducedDim(HSMM, dimred="UMAP", colour_by="Pseudotime")
p1 + p2 + p3 + plot_layout(nrow=2)
```

![]({{ site.baseurl }}/images/Diffusion-Pseudotime_files/figure-markdown_github/unnamed-chunk-10-1.png)

<h2>
Gene Expression Trends
</h2>
We can observe gene expression trends as a function of `dpt`. Analyzing
gene expression trends are important in understanding the genes that
regulate development of differentiation. First, we load libraries that
will help us re-map from Ensembl to Official Symbol.

``` r
library(AnnotationDbi)
library(org.Hs.eg.db)
library(EnsDb.Hsapiens.v86)

matrix <- assay(HSMM, i = 'logcounts')

Ensembl_id <- rownames(matrix)
Ensembl_id <- sapply(strsplit(Ensembl_id, split="[.]"), "[[", 1)
head(Ensembl_id)
```

    ## [1] "ENSG00000000003" "ENSG00000000005" "ENSG00000000419" "ENSG00000000457"
    ## [5] "ENSG00000000460" "ENSG00000000938"

``` r
gene_ids <- ensembldb::select(EnsDb.Hsapiens.v86, keys = Ensembl_id, keytype = 'GENEID', columns = 'SYMBOL')
rownames(matrix) <- Ensembl_id
matrix <- matrix[gene_ids$GENEID,]
rownames(matrix) <- gene_ids$SYMBOL
head(rownames(matrix))
```

    ## [1] "TSPAN6"   "TNMD"     "DPM1"     "SCYL3"    "C1orf112" "FGR"

We will investigate the same genes that Trapnell et al. used in their
article. First, we will generate a data frame that organizes the genes
and metadata for `ggplot2`.

``` r
require(tidyr)
```

    ## Loading required package: tidyr

    ## 
    ## Attaching package: 'tidyr'

    ## The following object is masked from 'package:S4Vectors':
    ## 
    ##     expand

``` r
gene <- c('CDK1' , 'ID1', 'MKI67', 'MYOG') #You can modify this list to whichever genes you want
expr_matrix <- as.data.frame(t(rbind(matrix[gene, , drop = FALSE], dpt = HSMM$dpt, Hours = as.character(HSMM$Hours), Pseudotime = HSMM$Pseudotime)))

df <- pivot_longer(expr_matrix, gene, names_to = 'feature', values_to = 'expr')

df$expr <- as.numeric(as.character(df$expr)) #Some of the columns changed to characters after `pivot_longer` for some reason.
df$dpt <- as.numeric(as.character(df$dpt))
df$Pseudotime <- as.numeric(as.character(df$Pseudotime))
df$Time <- as.numeric(as.character(df$Hours)) #Generated a separate column for plotting purposes. 
```

To put it into perspective, we first order the cells based on time and
you can see there gene expression trend is difficult to resolve. We
expect an increase of MYOG over time but the trendline is flat. As
discussed earlier, time as a measure of biological progress may not be
adequate since not all cells start at time 0. In other words, they are
not in synchrony. Ordering cells by pseudotime should resolve this and
enable a measurement of biological progression regardless if cells are
in different cell states.
``` r
require(ggplot2)
p <- ggplot(df, mapping = aes(x=Time, y=expr, color=Hours)) + geom_jitter(size=2) + theme_classic() + xlab('DPT') + ylab('Expression') + theme(plot.title = element_text(size=16, hjust =  0.5, face = 'bold'), strip.text = element_text(size=12, face = 'bold') ,strip.background = element_rect(size = 0)) + guides(color = guide_legend(override.aes = list(linetype = 'blank'))) + scale_y_log10() + facet_wrap(~feature,scales = "free_y") 
p + stat_summary(fun.y=mean, colour="black", geom="line", size = 1)
```

![]({{ site.baseurl }}/images/Diffusion-Pseudotime_files/figure-markdown_github/unnamed-chunk-14-1.png)

Here the cells are ordered by `dpt` and we can observe the expected gene
expression trends.

``` r
p <- ggplot(df, mapping = aes(x=dpt, y=expr, color=Hours)) + geom_jitter(size=2) + theme_classic() + xlab('DPT') + ylab('Expression') + theme(plot.title = element_text(size=16, hjust =  0.5, face = 'bold'), strip.text = element_text(size=12, face = 'bold') ,strip.background = element_rect(size = 0)) + guides(color = guide_legend(override.aes = list(linetype = 'blank'))) + scale_y_log10() + facet_wrap(~feature,scales = "free_y") 
p + geom_smooth(aes(color = expr), method = 'gam', se=F, color = 'black')
```

![]({{ site.baseurl }}/images/Diffusion-Pseudotime_files/figure-markdown_github/unnamed-chunk-15-1.png)

Likewise, we can look at the original `Pseudotime` and observe fairly
the same gene expression trends.

``` r
p <- ggplot(df, mapping = aes(x=Pseudotime, y=expr, color=Hours)) + geom_jitter(size=2) + theme_classic() + xlab('Pseudotime') + ylab('Expression') + theme(plot.title = element_text(size=16, hjust =  0.5, face = 'bold'), strip.text = element_text(size=12, face = 'bold') ,strip.background = element_rect(size = 0)) + guides(color = guide_legend(override.aes = list(linetype = 'blank'))) + scale_y_log10() + facet_wrap(~feature,scales = "free_y") 
p + geom_smooth(aes(color = expr), method = 'gam', se=F, color = 'black')
```

![]({{ site.baseurl }}/images/Diffusion-Pseudotime_files/figure-markdown_github/unnamed-chunk-16-1.png)

<h2>
Identifying Temporally Regulated Genes</h2>

Let’s take it a step further and find significant genes that change with
`dpt`. Here we employ a Generalized Additive Model to model non-linear
changes in the gene expression trend.

``` r
require(gam)

t <- HSMM$dpt
var1K <- names(sort(apply(matrix, 1, var),decreasing = TRUE))[1:100] #We select the top variable genes to speed up the calculations. You are more than welcome to use all genes. 
matrix <- matrix[var1K, ] 

# fit a GAM using a spline
gam.pval <- apply(matrix,1,function(z){
    d <- data.frame(z=z, t=t)
    suppressWarnings({
      tmp <- suppressWarnings(gam(z ~ s(t), data=d))
    })
    p <- summary(tmp)[4][[1]][1,5]
    p
})

topgenes <- sort(gam.pval, decreasing = FALSE)[1:16] #selecting top 16 genes that are temporally expressed
topgenes <- topgenes[topgenes<0.05] %>% names() #filter for p < 0.05

expr_matrix <- as.data.frame(t(rbind(matrix[topgenes, , drop = FALSE], dpt = HSMM$dpt, Hours = as.character(HSMM$Hours))))

df <- pivot_longer(expr_matrix, topgenes, names_to = 'feature', values_to = 'expr')

df$expr <- as.numeric(as.character(df$expr)) #Some of the columns changed to characters after `pivot_longer` for some reason.
df$dpt <- as.numeric(as.character(df$dpt))

p <- ggplot(df, mapping = aes(x=dpt, y=expr, color=Hours)) + geom_jitter(size=2) + theme_classic() + xlab('DPT') + ylab('Expression') + theme(plot.title = element_text(size=16, hjust =  0.5, face = 'bold'), strip.text = element_text(size=12, face = 'bold') ,strip.background = element_rect(size = 0)) + guides(color = guide_legend(override.aes = list(linetype = 'blank'))) + scale_y_log10() + facet_wrap(~feature,scales = "free_y") 
p + geom_smooth(aes(color = expr), method = 'gam', se=F, color = 'black')
```

![]({{ site.baseurl }}/images/Diffusion-Pseudotime_files/figure-markdown_github/unnamed-chunk-17-1.png)

There are additional R libraries that I won’t demonstrate here but feel
free to explore them. Descriptions are from their websites. More complex
data sets will have multiple trajectories and branches that could be
better analyzed with the following packages.

-   [Monocle 3](https://cole-trapnell-lab.github.io/monocle3/){:target="_blank"}:
    Single-cell transcriptome sequencing (sc-RNA-seq) experiments allow
    us to discover new cell types and help us understand how they arise
    in development. The Monocle 3 package provides a toolkit for
    analyzing single-cell gene expression experiments.
-   [TSCAN](https://www.bioconductor.org/packages/release/bioc/html/TSCAN.html){:target="_blank"}:
    TSCAN enables users to easily construct and tune pseudotemporal cell
    ordering as well as analyzing differentially expressed genes. TSCAN
    comes with a user-friendly GUI written in shiny. More features will
    come in the future.
-   [slingshot](https://bioconductor.org/packages/release/bioc/html/slingshot.html){:target="_blank"}:
    Provides functions for inferring continuous, branching lineage
    structures in low-dimensional data. Slingshot was designed to model
    developmental trajectories in single-cell RNA sequencing data and
    serve as a component in an analysis pipeline after dimensionality
    reduction and clustering. It is flexible enough to handle
    arbitrarily many branching events and allows for the incorporation
    of prior knowledge through supervised graph construction.
