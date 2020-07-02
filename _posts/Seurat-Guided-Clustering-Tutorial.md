While the vignette on the Seurat website already provides good
instructions, I will be using this to give additional thoughts and
details that could help beginners to Seurat. In addition, I will provide
some recommendations on the workflow as well.

<h2>
Loading the files
</h2>
The first thing the tutorial asks you to do is download the raw data
from [10x
Genomics](https://s3-us-west-2.amazonaws.com/10x.files/samples/cell/pbmc3k/pbmc3k_filtered_gene_bc_matrices.tar.gz).
The raw data contains three key files within it: barcodes.tsv,
genes.tsv, and matrix.mtx. You will also notice they are contained in a
folder called hg19. That simply means the counts were generated using
the hg19 genome (Genome Reference Consortium Human Build 37 (GRCh37)) as
the reference transcriptome.

Let’s load in each of the files and take a look at them.

``` r
barcodes <- read.table("data/filtered_gene_bc_matrices/hg19/barcodes.tsv")
head(barcodes)
```

    ##                 V1
    ## 1 AAACATACAACCAC-1
    ## 2 AAACATTGAGCTAC-1
    ## 3 AAACATTGATCAGC-1
    ## 4 AAACCGTGCTTCCG-1
    ## 5 AAACCGTGTATGCG-1
    ## 6 AAACGCACTGGTAC-1

``` r
genes <- read.delim("data/filtered_gene_bc_matrices/hg19/genes.tsv", header=FALSE)
head(genes)
```

    ##                V1           V2
    ## 1 ENSG00000243485   MIR1302-10
    ## 2 ENSG00000237613      FAM138A
    ## 3 ENSG00000186092        OR4F5
    ## 4 ENSG00000238009 RP11-34P13.7
    ## 5 ENSG00000239945 RP11-34P13.8
    ## 6 ENSG00000237683   AL627309.1

``` r
library(Matrix)
mat <- readMM(file = "data/filtered_gene_bc_matrices/hg19/matrix.mtx")
mat[1:5, 1:10]
```

    ## 5 x 10 sparse Matrix of class "dgTMatrix"
    ##                         
    ## [1,] . . . . . . . . . .
    ## [2,] . . . . . . . . . .
    ## [3,] . . . . . . . . . .
    ## [4,] . . . . . . . . . .
    ## [5,] . . . . . . . . . .

You will notice when we take a look at the matrix file, it contains `.`.
These are used when no count is detected rather using a value of 0. This
is called a sparse matrix to reduce memory and increase computational
speed. It is pretty much standard to work using sparse matrices when
dealing with single-cell data.

<h2>
Generating the Seurat Object
</h2>
Next, we will generate a `Seurat` object based on the files we loaded up
earlier.

``` r
library(dplyr)
```

    ## 
    ## Attaching package: 'dplyr'

    ## The following objects are masked from 'package:stats':
    ## 
    ##     filter, lag

    ## The following objects are masked from 'package:base':
    ## 
    ##     intersect, setdiff, setequal, union

``` r
library(Seurat)
library(patchwork)

# Load the PBMC dataset
pbmc.data <- Read10X(data.dir = "data/filtered_gene_bc_matrices/hg19/")
# Initialize the Seurat object with the raw (non-normalized data).
pbmc <- CreateSeuratObject(counts = pbmc.data, project = "pbmc3k", min.cells = 3, min.features = 200)
```

    ## Warning: Feature names cannot have underscores ('_'), replacing with dashes
    ## ('-')

``` r
pbmc
```

    ## An object of class Seurat 
    ## 13714 features across 2700 samples within 1 assay 
    ## Active assay: RNA (13714 features, 0 variable features)

<h2>
Pre-processing the data
</h2>
Now we will pre-process the data and perform quality control on the
cells. There are a couple of metrics that are used within the community.

-   The number of unique genes detected in each individual cell.
    -   Low-quality cells or empty droplets will often have very few
        genes.
    -   Sometimes this could be ambient mRNA that is detected.
    -   Cell doublets or multiplets may exhibit an aberrantly high gene
        count. There are some additional packages that can be used to
        detect doublets.
-   The percentage of reads that map to the mitochondrial genome
    -   Low-quality / dying cells often exhibit extensive mitochondrial
        contamination.
    -   This is often calculated by searching for genes containing `MT-`

``` r
# The [[ operator can add columns to object metadata. This is a great place to stash QC stats
pbmc[["percent.mt"]] <- PercentageFeatureSet(pbmc, pattern = "^MT-")
```

Let’s take a look at the metadata which includes some of the QC metrics.

-   `nCount_RNA` is the number of unique counts in each cell.
-   `nFeature_RNA` is the number of unique genes in each cell.
-   `percent.mt` is the mitochondrial mapping that we just calculated.

``` r
head(pbmc@meta.data, 5)
```

    ##                  orig.ident nCount_RNA nFeature_RNA percent.mt
    ## AAACATACAACCAC-1     pbmc3k       2419          779  3.0177759
    ## AAACATTGAGCTAC-1     pbmc3k       4903         1352  3.7935958
    ## AAACATTGATCAGC-1     pbmc3k       3147         1129  0.8897363
    ## AAACCGTGCTTCCG-1     pbmc3k       2639          960  1.7430845
    ## AAACCGTGTATGCG-1     pbmc3k        980          521  1.2244898

Seurat recommends a threshold for filtering for the QC metrics.

-   Cells are filtereed for unique feature counts over 2,500 or less
    than 200
-   Cells are filtereed for &lt;5% mitochondrial counts

``` r
# Visualize QC metrics as a violin plot
VlnPlot(pbmc, features = c("nFeature_RNA", "nCount_RNA", "percent.mt"), ncol = 3)
```

![](Seurat-Guided-Clustering-Tutorial_files/figure-markdown_github/unnamed-chunk-8-1.png)

We can take a look and see that the unique counts and feature are
correlated. In addition, we see that low counts appear to correlate with
high mitochondrial mapping percentage.

``` r
# FeatureScatter is typically used to visualize feature-feature relationships, but can be used
# for anything calculated by the object, i.e. columns in object metadata, PC scores etc.

plot1 <- FeatureScatter(pbmc, feature1 = "nCount_RNA", feature2 = "percent.mt")
plot2 <- FeatureScatter(pbmc, feature1 = "nCount_RNA", feature2 = "nFeature_RNA")
plot1 + plot2
```

![](Seurat-Guided-Clustering-Tutorial_files/figure-markdown_github/unnamed-chunk-9-1.png)

I find that the density plots provide a better visualization of the
distributions in case you may have a bimodal distribution.

``` r
# Visualize QC metrics as ridge plots
RidgePlot(pbmc, features = c("nFeature_RNA", "nCount_RNA", "percent.mt"), ncol =1)
```

    ## Picking joint bandwidth of 36.2

    ## Picking joint bandwidth of 139

    ## Picking joint bandwidth of 0.153

![](Seurat-Guided-Clustering-Tutorial_files/figure-markdown_github/unnamed-chunk-10-1.png)
Let’s use an adaptive threshold rather than fixed threshold. This
provides a more elegant method of detecting the thresholds rather than
by eye using the graphs. First, we assume that most of the cells are
high-quality. Next, we then identify cells that are outliers using the
median absolute deviation (MAD) from the median value of each metric for
all cells. Outliers will be beyond the MAD threshold and we can specify
higher or lower than the threshold.

To identify outliers based on unique genes and counts, we use
log-transformed `nCount_RNA` and `nFeature_RNA` that are more than 3
MADs above and below the median. We will be using the `scater` library
for this.

``` r
library(scater)
```

    ## Loading required package: SingleCellExperiment

    ## Loading required package: SummarizedExperiment

    ## Loading required package: GenomicRanges

    ## Loading required package: stats4

    ## Loading required package: BiocGenerics

    ## Loading required package: parallel

    ## 
    ## Attaching package: 'BiocGenerics'

    ## The following objects are masked from 'package:parallel':
    ## 
    ##     clusterApply, clusterApplyLB, clusterCall, clusterEvalQ,
    ##     clusterExport, clusterMap, parApply, parCapply, parLapply,
    ##     parLapplyLB, parRapply, parSapply, parSapplyLB

    ## The following objects are masked from 'package:dplyr':
    ## 
    ##     combine, intersect, setdiff, union

    ## The following object is masked from 'package:Matrix':
    ## 
    ##     which

    ## The following objects are masked from 'package:stats':
    ## 
    ##     IQR, mad, sd, var, xtabs

    ## The following objects are masked from 'package:base':
    ## 
    ##     anyDuplicated, append, as.data.frame, basename, cbind, colnames,
    ##     dirname, do.call, duplicated, eval, evalq, Filter, Find, get, grep,
    ##     grepl, intersect, is.unsorted, lapply, Map, mapply, match, mget,
    ##     order, paste, pmax, pmax.int, pmin, pmin.int, Position, rank,
    ##     rbind, Reduce, rownames, sapply, setdiff, sort, table, tapply,
    ##     union, unique, unsplit, which, which.max, which.min

    ## Loading required package: S4Vectors

    ## 
    ## Attaching package: 'S4Vectors'

    ## The following objects are masked from 'package:dplyr':
    ## 
    ##     first, rename

    ## The following object is masked from 'package:Matrix':
    ## 
    ##     expand

    ## The following object is masked from 'package:base':
    ## 
    ##     expand.grid

    ## Loading required package: IRanges

    ## 
    ## Attaching package: 'IRanges'

    ## The following objects are masked from 'package:dplyr':
    ## 
    ##     collapse, desc, slice

    ## Loading required package: GenomeInfoDb

    ## Loading required package: Biobase

    ## Welcome to Bioconductor
    ## 
    ##     Vignettes contain introductory material; view with
    ##     'browseVignettes()'. To cite Bioconductor, see
    ##     'citation("Biobase")', and for packages 'citation("pkgname")'.

    ## Loading required package: DelayedArray

    ## Loading required package: matrixStats

    ## 
    ## Attaching package: 'matrixStats'

    ## The following objects are masked from 'package:Biobase':
    ## 
    ##     anyMissing, rowMedians

    ## The following object is masked from 'package:dplyr':
    ## 
    ##     count

    ## Loading required package: BiocParallel

    ## 
    ## Attaching package: 'DelayedArray'

    ## The following objects are masked from 'package:matrixStats':
    ## 
    ##     colMaxs, colMins, colRanges, rowMaxs, rowMins, rowRanges

    ## The following objects are masked from 'package:base':
    ## 
    ##     aperm, apply, rowsum

    ## 
    ## Attaching package: 'SummarizedExperiment'

    ## The following object is masked from 'package:Seurat':
    ## 
    ##     Assays

    ## Loading required package: ggplot2

``` r
qc.nCount_RNA <- isOutlier(pbmc$nCount_RNA, log=TRUE, type="both")
qc.nFeature_RNA  <- isOutlier(pbmc$nFeature_RNA, log=TRUE, type="both")
```

We can see the thresholds that are identified in both QC metric.

``` r
attr(qc.nCount_RNA , "thresholds")
```

    ##     lower    higher 
    ##  802.1223 6012.0706

``` r
attr(qc.nFeature_RNA, "thresholds")
```

    ##     lower    higher 
    ##  399.7497 1665.6823

We can also do the same for `percent.mt`. In this case, we want to
remove cells above the MAD.

``` r
qc.percent.mt <- isOutlier(pbmc$percent.mt,  type="higher")
attr(qc.percent.mt, "thresholds")
```

    ##    lower   higher 
    ##     -Inf 4.436775

Another reason to use adapative thresholds is if your data contains
multiple batches. In this case, you would detect the QC threshold for
each batch rather than for your entire dataset. It makes little sense to
a single threshold from a data set with samples from multiple batches.
While there are no batches in this current data set, you would need to
include a `batch` parameter when using the `isOutlier` function.

Let’s continue on with the original tutorial and use the thresholds that
were fixed but feel free to try the adaptive thresholds.

``` r
pbmc <- subset(pbmc, subset = nFeature_RNA > 200 & nFeature_RNA < 2500 & percent.mt < 5)
```

<h2>
Normalizing the data
</h2>
After filtering out the low quality cells from the dataset, the next
step is to normalize the data. By default, `Seurat` employs a
global-scaling normalization method “LogNormalize” that normalizes the
feature expression measurements for each cell by diviing by the total
expression, multiplies the result by a scale factor (10,000 by default),
and then log-transforms the result to obtain the normalized data.

``` r
pbmc <- NormalizeData(pbmc)
```

It is common to identify highly variable features or genes for
dimensional reduction. By reducing your analysis to the highly variable
genes, you account for most of the biolgical heterogeneity or factors in
your data and hopefully ignore a majority of the noise while reducing
computational work and time. As such, the highly variable genes should
enable us to isolate the real biological signals.

``` r
pbmc <- FindVariableFeatures(pbmc, selection.method = "vst", nfeatures = 2000)

# Identify the 10 most highly variable genes
top10 <- head(VariableFeatures(pbmc), 10)

# plot variable features with and without labels
plot1 <- VariableFeaturePlot(pbmc) + theme(legend.text = element_text(size = 6))
plot2 <- LabelPoints(plot = plot1, points = top10, repel = TRUE) + theme(legend.text = element_text(size = 6))
```

    ## When using repel, set xnudge and ynudge to 0 for optimal results

``` r
plot1 + plot2
```

    ## Warning: Transformation introduced infinite values in continuous x-axis

    ## Warning: Transformation introduced infinite values in continuous x-axis

![](Seurat-Guided-Clustering-Tutorial_files/figure-markdown_github/unnamed-chunk-17-1.png)

<h1>
Scaling the data
</h1>
Next, we will need to scale the data. This is a standard pre-processing
step prior dimensional reduction, like PCA, which I discussed in a
previous post.

-   All gene expression will be centered to 0.
-   Scales the expression of each gene to have a variance of 1 so all
    genes have equal contributions

As an additional step, we typically scale the highly variable genes as
these are the genes that will be used for dimensional reductiobn.

``` r
pbmc <- ScaleData(pbmc, features = VariableFeatures(object = pbmc)) #VariableFeatures is used to call the highly variable genes from the object.
```

    ## Centering and scaling data matrix

<h2>
Perform linear dimensional reduction
</h2>
PCA is already built into `Seurat` and can be called the function
`RunPCA`.

``` r
pbmc <- RunPCA(pbmc, features = VariableFeatures(object = pbmc), verbose = FALSE)
# Examine and visualize PCA results a few different ways
print(pbmc[["pca"]], dims = 1:5, nfeatures = 5)
```

    ## PC_ 1 
    ## Positive:  CST3, TYROBP, LST1, AIF1, FTL 
    ## Negative:  MALAT1, LTB, IL32, IL7R, CD2 
    ## PC_ 2 
    ## Positive:  CD79A, MS4A1, TCL1A, HLA-DQA1, HLA-DQB1 
    ## Negative:  NKG7, PRF1, CST7, GZMB, GZMA 
    ## PC_ 3 
    ## Positive:  HLA-DQA1, CD79A, CD79B, HLA-DQB1, HLA-DPB1 
    ## Negative:  PPBP, PF4, SDPR, SPARC, GNG11 
    ## PC_ 4 
    ## Positive:  HLA-DQA1, CD79B, CD79A, MS4A1, HLA-DQB1 
    ## Negative:  VIM, IL7R, S100A6, IL32, S100A8 
    ## PC_ 5 
    ## Positive:  GZMB, NKG7, S100A8, FGFBP2, GNLY 
    ## Negative:  LTB, IL7R, CKB, VIM, MS4A7

We can visualize the first two prinicpal components.

``` r
DimPlot(pbmc, reduction = "pca")
```

![](Seurat-Guided-Clustering-Tutorial_files/figure-markdown_github/unnamed-chunk-20-1.png)

Let’s inspect the contribution of each of the prinicpal components.
Typically only the the principal components containing a majority of the
variance is used. This can be estimated by using an ‘elbow plot’ and
observing where there is a large drop off in variance.

``` r
ElbowPlot(pbmc)
```

![](Seurat-Guided-Clustering-Tutorial_files/figure-markdown_github/unnamed-chunk-21-1.png)

It may be difficult to estimate by visualization so you can use the
second derivative which should find the maximum change in the slope. The
following code should provide another method for estimating the drop
off.

``` r
variance <- pbmc@reductions[["pca"]]@stdev
dy <- -diff(range(variance))
dx <- length(variance) - 1
l2 <- sqrt(dx^2 + dy^2)
dx <- dx/l2
dy <- dy/l2
dy0 <- variance - variance[1]
dx0 <- seq_along(variance) - 1
parallel.l2 <- sqrt((dx0 * dx)^2 + (dy0 * dy)^2)
normal.x <- dx0 - dx * parallel.l2
normal.y <- dy0 - dy * parallel.l2
normal.l2 <- sqrt(normal.x^2 + normal.y^2)
below.line <- normal.x < 0 & normal.y < 0
if (!any(below.line)) {
    length(variance)
} else {
    which(below.line)[which.max(normal.l2[below.line])]
}
```

    ## [1] 3

While the largest drop off does occur at PC3, we can see that there in
additional drop off at around PC9-10, suggesting that the majority of
true signal is captured in the first 10 PCs.

<h2>
Cluster the cells
</h2>
To aid in summarizing the data for easier interpretation, scRNA-seq is
often clustered to empirically define groups of cells within the data
that have similar expression profiles. This generates discrete groupings
of cells for the downstream analysis. `Seurat` uses a graph-based
clustering approach. There are additional approaches such as k-means
clustering or hierachical clustering.

The major advantage of graph-based clustering compared to the other two
methods is its scalability and speed. Simply, `Seurat` first constructs
a KNN graph based on the euclidean distance in PCA space. Each node is a
cell that is connected to its nearest neighbors. Edges, which are the
lines between the neighbors, are weighted based on the similarity
between the cells involved, with higher weight given to cells that are
more closely related. A refinement step (Jaccard similarity) is used to
refine the edge weights between any two cells based on the shared
overlap in their local neighborhoods.

Here we use the first 10 PCs to construct the neighbor graph.

``` r
pbmc <- FindNeighbors(pbmc, dims = 1:10)
```

    ## Computing nearest neighbor graph

    ## Computing SNN

Next, we can apply algorithms to identify “communities” of cells. There
are two main community detection algorithm,
Louvain[Louvain](https://perso.uclouvain.be/vincent.blondel/research/louvain.html)
and the improved version
Leiden[Leiden](https://www.nature.com/articles/s41598-019-41695-z). We
use the default Louvain while controlling the `resolution` parameter to
adjust the number of clusters.

``` r
pbmc <- FindClusters(pbmc, resolution = 0.5)
```

    ## Modularity Optimizer version 1.3.0 by Ludo Waltman and Nees Jan van Eck
    ## 
    ## Number of nodes: 2638
    ## Number of edges: 96033
    ## 
    ## Running Louvain algorithm...
    ## Maximum modularity in 10 random starts: 0.8720
    ## Number of communities: 9
    ## Elapsed time: 0 seconds

<h2>
Visualization of 2D Embeddsings
</h2>
The high-dimensional space can be embedded in 2D using either tSNE and
UMAP to visualize and explore the datasets. These embeddings attempt to
summarize all of the data using a 2D graph to organize the data to
better interpret the relationships between the cells. Cells that are
more similar to one another should localize within the graph. Different
types of embeddings will relay different information on the relationship
between cells. UMAP is more recommended to be more faithful to the
global connectivity of the manifold than tSNE, while tSNE might preserve
the local structure more.

``` r
# If you haven't installed UMAP, you can do so via reticulate::py_install(packages =
# 'umap-learn')
# Here we generate a UMAP embedding.
pbmc <- RunUMAP(pbmc, dims = 1:10)
```

    ## Warning: The default method for RunUMAP has changed from calling Python UMAP via reticulate to the R-native UWOT using the cosine metric
    ## To use Python UMAP via reticulate, set umap.method to 'umap-learn' and metric to 'correlation'
    ## This message will be shown once per session

    ## 13:36:49 UMAP embedding parameters a = 0.9922 b = 1.112

    ## 13:36:49 Read 2638 rows and found 10 numeric columns

    ## 13:36:49 Using Annoy for neighbor search, n_neighbors = 30

    ## 13:36:49 Building Annoy index with metric = cosine, n_trees = 50

    ## 0%   10   20   30   40   50   60   70   80   90   100%

    ## [----|----|----|----|----|----|----|----|----|----|

    ## **************************************************|
    ## 13:36:49 Writing NN index file to temp file /var/folders/05/_drvy3j57yb2pndzt041kp9c0n9q3g/T//RtmpLpoZdq/file176bf67fb8bb8
    ## 13:36:49 Searching Annoy index using 1 thread, search_k = 3000
    ## 13:36:50 Annoy recall = 100%
    ## 13:36:50 Commencing smooth kNN distance calibration using 1 thread
    ## 13:36:51 Initializing from normalized Laplacian + noise
    ## 13:36:51 Commencing optimization for 500 epochs, with 105132 positive edges
    ## 13:36:55 Optimization finished

``` r
# Here we generate a tSNE embedding.
pbmc <- RunTSNE(pbmc, dims = 1:10)
```

We can visualize all three of the dimensional reductions that we
generated. You will notice that UMAP and tSNE generate better
visualizations as they are more adept at interpreting non-linear data.
PCA is linear technique and does not capture the non-linear relationship
of gene expression profiles very well.

``` r
# note that you can set `label = TRUE` or use the LabelClusters function to help label
# individual clusters
plot1 <- DimPlot(pbmc, reduction = "umap")
plot2 <- DimPlot(pbmc, reduction = "tsne")
plot3 <- DimPlot(pbmc, reduction = "pca")
plot1 +  plot2 + plot3 + plot_layout(nrow = 2)
```

![](Seurat-Guided-Clustering-Tutorial_files/figure-markdown_github/unnamed-chunk-26-1.png)

We can see that cells are clustered closer toether while also providing
some global relationship between the clusters within the UMAP embedding.
tSNE generates some similar clusters with the same local relationship
but the global relationship can not be estimated using tSNE. In
addition, tSNE does not scale with larger data sets. The PCA captures
highest variation within the first two PCs but does not include
information from the additional PCs. You can see here the failure of PCA
to resolve the differences between the clusters unlike UMAP and tSNE.

<h2>
Finding Marker Genes
</h2>
To interpret our clusters, we can identify the genes and markers that
drive separation of the clusters. `Seurat` canfind these markers via
differential expression. By default, `FindAllMarkers` uses Wilcoxon
rank-sum (Mann-Whitney-U) test to find DEs. You can choose which test by
modifying the `test.use` parameter. If you have blocking factors (i.e.,
batches), you can include it using the `latent.vars` parameter.

``` r
# find markers for every cluster compared to all remaining cells, report only the positive ones
pbmc.markers <- FindAllMarkers(pbmc, only.pos = TRUE, min.pct = 0.25, logfc.threshold = 0.25)
```

    ## Calculating cluster 0

    ## Calculating cluster 1

    ## Calculating cluster 2

    ## Calculating cluster 3

    ## Calculating cluster 4

    ## Calculating cluster 5

    ## Calculating cluster 6

    ## Calculating cluster 7

    ## Calculating cluster 8

``` r
pbmc.markers %>% group_by(cluster) %>% top_n(n = 2, wt = avg_logFC)
```

    ## # A tibble: 18 x 7
    ## # Groups:   cluster [9]
    ##        p_val avg_logFC pct.1 pct.2 p_val_adj cluster gene    
    ##        <dbl>     <dbl> <dbl> <dbl>     <dbl> <fct>   <chr>   
    ##  1 1.96e-107     0.730 0.901 0.594 2.69e-103 0       LDHB    
    ##  2 1.61e- 82     0.922 0.436 0.11  2.20e- 78 0       CCR7    
    ##  3 7.95e- 89     0.892 0.981 0.642 1.09e- 84 1       LTB     
    ##  4 1.85e- 60     0.859 0.422 0.11  2.54e- 56 1       AQP3    
    ##  5 0.            3.86  0.996 0.215 0.        2       S100A9  
    ##  6 0.            3.80  0.975 0.121 0.        2       S100A8  
    ##  7 0.            2.99  0.936 0.041 0.        3       CD79A   
    ##  8 9.48e-271     2.49  0.622 0.022 1.30e-266 3       TCL1A   
    ##  9 2.96e-189     2.12  0.985 0.24  4.06e-185 4       CCL5    
    ## 10 2.57e-158     2.05  0.587 0.059 3.52e-154 4       GZMK    
    ## 11 3.51e-184     2.30  0.975 0.134 4.82e-180 5       FCGR3A  
    ## 12 2.03e-125     2.14  1     0.315 2.78e-121 5       LST1    
    ## 13 7.95e-269     3.35  0.961 0.068 1.09e-264 6       GZMB    
    ## 14 3.13e-191     3.69  0.961 0.131 4.30e-187 6       GNLY    
    ## 15 1.48e-220     2.68  0.812 0.011 2.03e-216 7       FCER1A  
    ## 16 1.67e- 21     1.99  1     0.513 2.28e- 17 7       HLA-DPB1
    ## 17 7.73e-200     5.02  1     0.01  1.06e-195 8       PF4     
    ## 18 3.68e-110     5.94  1     0.024 5.05e-106 8       PPBP

You can export the markers as a ‘csv’ for analysis outside of R.

``` r
write.csv(pbmc.markers, 'pbmc.markers.csv')
```

We can visualize some of these markers using `VlnPlot`.

``` r
VlnPlot(pbmc, features = c("MS4A1", "CD79A"))
```

![](Seurat-Guided-Clustering-Tutorial_files/figure-markdown_github/unnamed-chunk-29-1.png)

``` r
# you can plot raw counts as well
VlnPlot(pbmc, features = c("NKG7", "PF4"), slot = "counts", log = TRUE)
```

![](Seurat-Guided-Clustering-Tutorial_files/figure-markdown_github/unnamed-chunk-30-1.png)

We can visualize the localization of these markers in a UMAP embedding
by using `FeaturePlot`.

``` r
FeaturePlot(pbmc, features = c("MS4A1", "GNLY", "CD3E", "CD14", "FCER1A", "FCGR3A", "LYZ", "PPBP", 
    "CD8A"))
```

![](Seurat-Guided-Clustering-Tutorial_files/figure-markdown_github/unnamed-chunk-31-1.png)

We can generate a dot plot to visualize the markers.

``` r
DotPlot(pbmc, features = c("MS4A1", "GNLY", "CD3E", "CD14", "FCER1A", "FCGR3A", "LYZ", "PPBP", 
    "CD8A")) + theme(axis.text.x = element_text(angle = 90))
```

![](Seurat-Guided-Clustering-Tutorial_files/figure-markdown_github/unnamed-chunk-32-1.png)

Another common method of visualization is to generate a heatmap. We can
use `DoHeatmap` to see the top 10 markers per cluster.

``` r
top10 <- pbmc.markers %>% group_by(cluster) %>% top_n(n = 10, wt = avg_logFC)
DoHeatmap(pbmc, features = top10$gene) + NoLegend()
```

    ## Warning in DoHeatmap(pbmc, features = top10$gene): The following features were
    ## omitted as they were not found in the scale.data slot for the RNA assay: CD8A,
    ## VPREB3, TRAT1, PIK3IP1, PRKCQ-AS1, LEF1, NOSIP, CD3E, CD3D, CCR7, LDHB, RPS3A

![](Seurat-Guided-Clustering-Tutorial_files/figure-markdown_github/unnamed-chunk-33-1.png)

<h2>
Assigning cell type identity to clusters
</h2>
We can use canonical markers to easily match the unbiased clustering to
known cell types based on the table below:

| Cluster ID | Markers               | Cell Type    |
|------------|-----------------------|--------------|
| 0          | IL7R, CCR7            | Naive CD4+ T |
| 1          | IL7R, S100A4          | Memory CD4+  |
| 2          | CD14, LYZ CD14+       | Mono         |
| 3          | MS4A1                 | B            |
| 4          | CD8A CD8+             | T            |
| 5          | FCGR3A, MS4A7 FCGR3A+ | Mono         |
| 6          | GNLY, NKG7            | NK           |
| 7          | FCER1A, CST3          | DC           |
| 8          | PPBP                  | Platelet     |

``` r
new.cluster.ids <- c("Naive CD4 T", "Memory CD4 T", "CD14+ Mono", "B", "CD8 T", "FCGR3A+ Mono", 
    "NK", "DC", "Platelet")
names(new.cluster.ids) <- levels(pbmc)
pbmc <- RenameIdents(pbmc, new.cluster.ids)
DimPlot(pbmc, reduction = "umap", label = TRUE, pt.size = 0.5) + NoLegend()
```

![](Seurat-Guided-Clustering-Tutorial_files/figure-markdown_github/unnamed-chunk-34-1.png)

We can also use annotation packages like `SingleR` to perform automatic
annotation. You can find more information
[here](https://bioconductor.org/packages/release/bioc/html/SingleR.html).
We initialize the Humany Primary Cell Atlas data.

``` r
library(SingleR)
ref <- HumanPrimaryCellAtlasData()
```

    ## Warning: `select_()` is deprecated as of dplyr 0.7.0.
    ## Please use `select()` instead.
    ## This warning is displayed once every 8 hours.
    ## Call `lifecycle::last_warnings()` to see where this warning was generated.

    ## Warning: `filter_()` is deprecated as of dplyr 0.7.0.
    ## Please use `filter()` instead.
    ## See vignette('programming') for more help
    ## This warning is displayed once every 8 hours.
    ## Call `lifecycle::last_warnings()` to see where this warning was generated.

    ## snapshotDate(): 2019-10-22

    ## see ?SingleR and browseVignettes('SingleR') for documentation

    ## loading from cache

    ## see ?SingleR and browseVignettes('SingleR') for documentation

    ## loading from cache

We can see some of the labels within this reference set.

``` r
as.data.frame(colData(ref))
```

    ##                                              label.main
    ## GSM112490                                            DC
    ## GSM112491                                            DC
    ## GSM112540                                            DC
    ## GSM112541                                            DC
    ## GSM112661                                            DC
    ## GSM112664                                            DC
    ## GSM112665                                            DC
    ## GSM112666                                            DC
    ## GSM112667                                            DC
    ## GSM112668                                            DC
    ## GSM112669                                            DC
    ## GSM112670                                            DC
    ## GSM116101                           Smooth_muscle_cells
    ## GSM116102                           Smooth_muscle_cells
    ## GSM116103                           Smooth_muscle_cells
    ## GSM116104                           Smooth_muscle_cells
    ## GSM116105                           Smooth_muscle_cells
    ## GSM116106                           Smooth_muscle_cells
    ## GSM119354                              Epithelial_cells
    ## GSM119357                              Epithelial_cells
    ## GSM119359                              Epithelial_cells
    ## GSM119360                              Epithelial_cells
    ## GSM119361                              Epithelial_cells
    ## GSM119362                              Epithelial_cells
    ## GSM119366                              Epithelial_cells
    ## GSM119369                              Epithelial_cells
    ## GSM119371                              Epithelial_cells
    ## GSM119372                              Epithelial_cells
    ## GSM1209554_HH1763_UI33plus2_201004               B_cell
    ## GSM1209555_HH1778_u133plus2_211004               B_cell
    ## GSM1209556_HH1786_U133plus2_091104               B_cell
    ## GSM1209557_HH1791_u133plus2_251104               B_cell
    ## GSM1209558_HH1713_u133plus2_011004          Neutrophils
    ## GSM1209559_HH1712_u133plus2_011004          Neutrophils
    ## GSM1209560_HH1714_u133plus2_011004          Neutrophils
    ## GSM1209561_TW1681_u133plus2_061004              T_cells
    ## GSM1209562_TW1685_u133plus2_061004              T_cells
    ## GSM1209563_TW1689_u133plus2_061004              T_cells
    ## GSM1209564_HH1765_UI33plus2_201004              T_cells
    ## GSM1209565_HH1769_UI33plus2_201004              T_cells
    ## GSM1209566_HH1770_U133plus2_041104              T_cells
    ## GSM1209567_HH1774_u133plus2_211004              T_cells
    ## GSM1209568_HH1775_u133plus2_211004              T_cells
    ## GSM1209569_HH1780_u133plus2_211004              T_cells
    ## GSM1209570_HH1788_U133plus2_091104              T_cells
    ## GSM1209571_HH1792_u133plus2_251104              T_cells
    ## GSM1209572_HH1793_u133plus2_251104              T_cells
    ## GSM1209573_TW1678_u133plus2_061004              T_cells
    ## GSM1209574_TW1682_u133plus2_061004              T_cells
    ## GSM1209575_TW1686_u133plus2_061004              T_cells
    ## GSM1209576_TW1690_u133plus2_061004              T_cells
    ## GSM1209577_TW1675_u133plus2_061004              T_cells
    ## GSM1209578_TW1679_u133plus2_061004              T_cells
    ## GSM1209579_TW1683_u133plus2_061004              T_cells
    ## GSM1209580_TW1687_u133plus2_061004              T_cells
    ## GSM1209581_TW1676_u133plus2_061004              T_cells
    ## GSM1209582_TW1680_u133plus2_061004              T_cells
    ## GSM1209583_TW1684_u133plus2_061004              T_cells
    ## GSM1209584_TW1688_u133plus2_061004              T_cells
    ## GSM1209585_HH1762_UI33plus2_201004             Monocyte
    ## GSM1209586_HH1767_UI33plus2_201004             Monocyte
    ## GSM1209587_HH1772_u133plus2_211004             Monocyte
    ## GSM1209588_HH1777_U133plus2_041104             Monocyte
    ## GSM1209589_HH1785_U133plus2_011204             Monocyte
    ## GSM1209590_HH1790_U133plus2_091104             Monocyte
    ## GSM1209591_HH1719_u133plus2_011004         Erythroblast
    ## GSM1209592_HH1720_u133plus2_011004         Erythroblast
    ## GSM1209593_HH1721_u133plus2_011004         Erythroblast
    ## GSM1209594_HH1722_u133plus2_011004         Erythroblast
    ## GSM1209595_HH1723_u133plus2_011004         Erythroblast
    ## GSM1209596_HH1716_u133plus2_011004         Erythroblast
    ## GSM1209597_HH1717_u133plus2_011004         Erythroblast
    ## GSM1209598_HH1718_u133plus2_011004         Erythroblast
    ## GSM1209599_HH1715_u133plus2_011004           BM & Prog.
    ## GSM132919                                            DC
    ## GSM132921                                            DC
    ## GSM132922                                            DC
    ## GSM132923                                            DC
    ## GSM132924                                            DC
    ## GSM132925                                            DC
    ## GSM132926                                            DC
    ## GSM132927                                            DC
    ## GSM132928                                            DC
    ## GSM132929                                            DC
    ## GSM132930                                            DC
    ## GSM140244                                      Monocyte
    ## GSM140245                                      Monocyte
    ## GSM140246                                      Monocyte
    ## GSM140247                                      Monocyte
    ## GSM140248                                      Monocyte
    ## GSM140249                                      Monocyte
    ## GSM140953                                            DC
    ## GSM140968                                            DC
    ## GSM140969                                            DC
    ## GSM140970                                            DC
    ## GSM140971                                            DC
    ## GSM140973                                            DC
    ## GSM141251                             Endothelial_cells
    ## GSM141252                             Endothelial_cells
    ## GSM141253                             Endothelial_cells
    ## GSM141255                             Endothelial_cells
    ## GSM143717                             Endothelial_cells
    ## GSM143726                             Endothelial_cells
    ## GSM143727                             Endothelial_cells
    ## GSM143728                             Endothelial_cells
    ## GSM143729                             Endothelial_cells
    ## GSM143730                             Endothelial_cells
    ## GSM143731                             Endothelial_cells
    ## GSM143732                             Endothelial_cells
    ## GSM143733                             Endothelial_cells
    ## GSM143898                             Endothelial_cells
    ## GSM143900                             Endothelial_cells
    ## GSM143907                             Endothelial_cells
    ## GSM143910                             Endothelial_cells
    ## GSM143914                             Endothelial_cells
    ## GSM153893                                       T_cells
    ## GSM154073                                       T_cells
    ## GSM154077                                       T_cells
    ## GSM154078                                       T_cells
    ## GSM154081                                       T_cells
    ## GSM154084                                       T_cells
    ## GSM158468                                   Gametocytes
    ## GSM158470                                   Gametocytes
    ## GSM160530                                            DC
    ## GSM160532                                            DC
    ## GSM160534                                            DC
    ## GSM160536                                            DC
    ## GSM172865                                       Neurons
    ## GSM172866                                       Neurons
    ## GSM172867                                       Neurons
    ## GSM172868                                       Neurons
    ## GSM172869                                       Neurons
    ## GSM172870                                       Neurons
    ## GSM173532                                 Keratinocytes
    ## GSM173533                                 Keratinocytes
    ## GSM173534                                 Keratinocytes
    ## GSM173535                                 Keratinocytes
    ## GSM173536                                 Keratinocytes
    ## GSM173537                                 Keratinocytes
    ## GSM173538                                 Keratinocytes
    ## GSM173539                                 Keratinocytes
    ## GSM173540                                 Keratinocytes
    ## GSM173541                                 Keratinocytes
    ## GSM173542                                 Keratinocytes
    ## GSM173543                                 Keratinocytes
    ## GSM173544                                 Keratinocytes
    ## GSM173545                                 Keratinocytes
    ## GSM173546                                 Keratinocytes
    ## GSM173547                                 Keratinocytes
    ## GSM173548                                 Keratinocytes
    ## GSM173549                                 Keratinocytes
    ## GSM173550                                 Keratinocytes
    ## GSM173551                                 Keratinocytes
    ## GSM173552                                 Keratinocytes
    ## GSM173553                                 Keratinocytes
    ## GSM173554                                 Keratinocytes
    ## GSM173555                                 Keratinocytes
    ## GSM173556                                 Keratinocytes
    ## GSM178549                                    HSC_-G-CSF
    ## GSM178550                                    HSC_-G-CSF
    ## GSM178551                                    HSC_-G-CSF
    ## GSM178552                                    HSC_-G-CSF
    ## GSM178553                                    HSC_-G-CSF
    ## GSM178554                                    HSC_-G-CSF
    ## GSM178555                                    HSC_-G-CSF
    ## GSM178556                                    HSC_-G-CSF
    ## GSM178557                                    HSC_-G-CSF
    ## GSM178558                                    HSC_-G-CSF
    ## GSM181857                                            DC
    ## GSM181930                                            DC
    ## GSM181931                                            DC
    ## GSM181932                                            DC
    ## GSM181933                                            DC
    ## GSM181934                                            DC
    ## GSM181971                                            DC
    ## GSM181972                                            DC
    ## GSM181973                                            DC
    ## GSM181974                                            DC
    ## GSM181976                                            DC
    ## GSM181978                                            DC
    ## GSM181980                                            DC
    ## GSM181981                                            DC
    ## GSM181982                                            DC
    ## GSM181983                                            DC
    ## GSM181984                                            DC
    ## GSM181997                                            DC
    ## GSM181998                                            DC
    ## GSM181999                                            DC
    ## GSM182000                                      Monocyte
    ## GSM182001                                      Monocyte
    ## GSM182002                                      Monocyte
    ## GSM182003                                      Monocyte
    ## GSM182004                                      Monocyte
    ## GSM183165                                    Macrophage
    ## GSM183193                                    Macrophage
    ## GSM183196                                    Macrophage
    ## GSM183201                                    Macrophage
    ## GSM183209                                    Macrophage
    ## GSM183217                                    Macrophage
    ## GSM183305                                    Macrophage
    ## GSM183306                                    Macrophage
    ## GSM183315                                    Macrophage
    ## GSM183316                                    Macrophage
    ## GSM183392                                    Macrophage
    ## GSM183393                                    Macrophage
    ## GSM183394                                    Macrophage
    ## GSM183462                                    Macrophage
    ## GSM183463                                    Macrophage
    ## GSM183464                                    Macrophage
    ## GSM183465                                    Macrophage
    ## GSM183466                                    Macrophage
    ## GSM183467                                    Macrophage
    ## GSM183482                                    Macrophage
    ## GSM183483                                    Macrophage
    ## GSM183484                                    Macrophage
    ## GSM183485                                    Macrophage
    ## GSM183486                                    Macrophage
    ## GSM183487                                    Macrophage
    ## GSM189447                                      Monocyte
    ## GSM189448                                      Monocyte
    ## GSM189449                                      Monocyte
    ## GSM189450                                      Monocyte
    ## GSM189451                                      Monocyte
    ## GSM189452                                      Monocyte
    ## GSM189453                                      Monocyte
    ## GSM189454                                      Monocyte
    ## GSM198942                                       NK_cell
    ## GSM198943                                       NK_cell
    ## GSM198944                                       NK_cell
    ## GSM198945                                       NK_cell
    ## GSM225042                          Embryonic_stem_cells
    ## GSM230294                          Embryonic_stem_cells
    ## GSM239260                             Tissue_stem_cells
    ## GSM239379                             Tissue_stem_cells
    ## GSM239457                             Tissue_stem_cells
    ## GSM239606                                  Chondrocytes
    ## GSM239612                                  Chondrocytes
    ## GSM239613                                  Chondrocytes
    ## GSM239616                                   Osteoblasts
    ## GSM239668                                   Osteoblasts
    ## GSM239669                                   Osteoblasts
    ## GSM250019                             Tissue_stem_cells
    ## GSM250020                             Tissue_stem_cells
    ## GSM250021                             Tissue_stem_cells
    ## GSM260305                                   Osteoblasts
    ## GSM260306                                   Osteoblasts
    ## GSM260307                                   Osteoblasts
    ## GSM260308                                   Osteoblasts
    ## GSM260309                                   Osteoblasts
    ## GSM260310                                   Osteoblasts
    ## GSM260311                                   Osteoblasts
    ## GSM260312                                   Osteoblasts
    ## GSM260313                                   Osteoblasts
    ## GSM260314                                   Osteoblasts
    ## GSM260321                                   Osteoblasts
    ## GSM260322                                   Osteoblasts
    ## GSM260657                             Tissue_stem_cells
    ## GSM260658                             Tissue_stem_cells
    ## GSM260659                             Tissue_stem_cells
    ## GSM260661                             Tissue_stem_cells
    ## GSM260662                             Tissue_stem_cells
    ## GSM260663                             Tissue_stem_cells
    ## GSM260664                             Tissue_stem_cells
    ## GSM260665                             Tissue_stem_cells
    ## GSM260666                             Tissue_stem_cells
    ## GSM260667                             Tissue_stem_cells
    ## GSM260668                             Tissue_stem_cells
    ## GSM260669                             Tissue_stem_cells
    ## GSM260670                             Tissue_stem_cells
    ## GSM260671                             Tissue_stem_cells
    ## GSM260672                             Tissue_stem_cells
    ## GSM260673                             Tissue_stem_cells
    ## GSM260674                             Tissue_stem_cells
    ## GSM260675                             Tissue_stem_cells
    ## GSM260676                             Tissue_stem_cells
    ## GSM260678                             Tissue_stem_cells
    ## GSM260679                             Tissue_stem_cells
    ## GSM260680                             Tissue_stem_cells
    ## GSM260681                             Tissue_stem_cells
    ## GSM260682                             Tissue_stem_cells
    ## GSM260683                             Tissue_stem_cells
    ## GSM260684                             Tissue_stem_cells
    ## GSM260685                             Tissue_stem_cells
    ## GSM260686                             Tissue_stem_cells
    ## GSM260689                                            DC
    ## GSM260690                                            DC
    ## GSM260691                                            DC
    ## GSM260692                                            DC
    ## GSM260693                                            DC
    ## GSM260694                                            DC
    ## GSM260695                                            DC
    ## GSM260696                                            DC
    ## GSM260697                                            DC
    ## GSM260698                                            DC
    ## GSM260699                                            DC
    ## GSM260700                                            DC
    ## GSM260701                                            DC
    ## GSM264755                                            DC
    ## GSM264756                                            DC
    ## GSM264757                                            DC
    ## GSM264758                                            DC
    ## GSM265494                             Tissue_stem_cells
    ## GSM265495                             Tissue_stem_cells
    ## GSM265496                             Tissue_stem_cells
    ## GSM265497                             Tissue_stem_cells
    ## GSM265498                             Tissue_stem_cells
    ## GSM265499                             Tissue_stem_cells
    ## GSM279572                                       T_cells
    ## GSM279573                                       T_cells
    ## GSM279574                                       T_cells
    ## GSM279575                                       T_cells
    ## GSM279576                                       T_cells
    ## GSM279577                                       T_cells
    ## GSM279578                                       T_cells
    ## GSM279579                                       T_cells
    ## GSM279580                                       T_cells
    ## GSM279581                                       T_cells
    ## GSM279582                                       T_cells
    ## GSM279583                                       T_cells
    ## GSM279584                                       T_cells
    ## GSM286015                                            DC
    ## GSM286017                                            DC
    ## GSM286086                                            DC
    ## GSM286087                                            DC
    ## GSM286088                                            DC
    ## GSM286089                                            DC
    ## GSM286090                                            DC
    ## GSM286091                                            DC
    ## GSM287216                           Smooth_muscle_cells
    ## GSM287217                           Smooth_muscle_cells
    ## GSM287218                           Smooth_muscle_cells
    ## GSM287219                           Smooth_muscle_cells
    ## GSM287220                           Smooth_muscle_cells
    ## GSM287222                           Smooth_muscle_cells
    ## GSM289612                                            BM
    ## GSM289613                                            BM
    ## GSM289614                                            BM
    ## GSM289615                                            BM
    ## GSM289616                                            BM
    ## GSM289617                                            BM
    ## GSM289618                                            BM
    ## GSM290414                                     Platelets
    ## GSM290415                                     Platelets
    ## GSM290420                                     Platelets
    ## GSM290421                                     Platelets
    ## GSM290423                                     Platelets
    ## GSM299095                              Epithelial_cells
    ## GSM299096                              Epithelial_cells
    ## GSM299097                              Epithelial_cells
    ## GSM299098                              Epithelial_cells
    ## GSM299099                              Epithelial_cells
    ## GSM299100                              Epithelial_cells
    ## GSM299556                                    Macrophage
    ## GSM299557                                    Macrophage
    ## GSM299558                                    Macrophage
    ## GSM299559                                    Macrophage
    ## GSM299560                                    Macrophage
    ## GSM299561                                    Macrophage
    ## GSM299562                                    Macrophage
    ## GSM299563                                    Macrophage
    ## GSM299564                                    Macrophage
    ## GSM299565                                    Macrophage
    ## GSM300389                                    Macrophage
    ## GSM300390                                    Macrophage
    ## GSM300392                                    Macrophage
    ## GSM300393                                    Macrophage
    ## GSM300394                                    Macrophage
    ## GSM300395                                    Macrophage
    ## GSM300398                                    Macrophage
    ## GSM300399                                    Macrophage
    ## GSM300401                                    Macrophage
    ## GSM300402                                    Macrophage
    ## GSM300403                                    Macrophage
    ## GSM300404                                    Macrophage
    ## GSM304260                                   Gametocytes
    ## GSM304261                                   Gametocytes
    ## GSM304262                                   Gametocytes
    ## GSM305430                                      Monocyte
    ## GSM305432                                      Monocyte
    ## GSM305433                                      Monocyte
    ## GSM305434                                      Monocyte
    ## GSM305435                                      Monocyte
    ## GSM305436                                      Monocyte
    ## GSM305437                                      Monocyte
    ## GSM305438                                      Monocyte
    ## GSM305439                                      Monocyte
    ## GSM305440                                      Monocyte
    ## GSM305441                                      Monocyte
    ## GSM305442                                      Monocyte
    ## GSM305784                             Endothelial_cells
    ## GSM305785                             Endothelial_cells
    ## GSM305786                             Endothelial_cells
    ## GSM305787                             Endothelial_cells
    ## GSM310429                                        B_cell
    ## GSM310430                                        B_cell
    ## GSM310431                                        B_cell
    ## GSM310432                                        B_cell
    ## GSM310433                                        B_cell
    ## GSM310434                                        B_cell
    ## GSM310435                                        B_cell
    ## GSM310436                                        B_cell
    ## GSM310437                                        B_cell
    ## GSM310438                                        B_cell
    ## GSM310439                                        B_cell
    ## GSM310440                                        B_cell
    ## GSM320543                                            DC
    ## GSM320544                                            DC
    ## GSM320545                                            DC
    ## GSM320546                                            DC
    ## GSM320547                                            DC
    ## GSM320548                                            DC
    ## GSM320549                                            DC
    ## GSM320550                                            DC
    ## GSM320551                                            DC
    ## GSM320552                                            DC
    ## GSM322374                             Tissue_stem_cells
    ## GSM322375                             Tissue_stem_cells
    ## GSM322376                             Tissue_stem_cells
    ## GSM322377                             Tissue_stem_cells
    ## GSM330313                             Endothelial_cells
    ## GSM330314                             Endothelial_cells
    ## GSM330315                             Endothelial_cells
    ## GSM330316                             Endothelial_cells
    ## GSM335393                             Endothelial_cells
    ## GSM335395                             Endothelial_cells
    ## GSM335396                             Endothelial_cells
    ## GSM335851                             Endothelial_cells
    ## GSM335859                             Endothelial_cells
    ## GSM335904                             Endothelial_cells
    ## GSM335906                             Endothelial_cells
    ## GSM336559                             Endothelial_cells
    ## GSM343802                                    Macrophage
    ## GSM343803                                    Macrophage
    ## GSM343804                                    Macrophage
    ## GSM343805                                    Macrophage
    ## GSM343806                                    Macrophage
    ## GSM343807                                    Macrophage
    ## GSM343808                                    Macrophage
    ## GSM343809                                    Macrophage
    ## GSM343810                                    Macrophage
    ## GSM343811                                    Macrophage
    ## GSM343812                                    Macrophage
    ## GSM343813                                    Macrophage
    ## GSM343814                                    Macrophage
    ## GSM343815                                    Macrophage
    ## GSM343816                                    Macrophage
    ## GSM343817                                    Macrophage
    ## GSM343818                                    Macrophage
    ## GSM343819                                    Macrophage
    ## GSM343820                                    Macrophage
    ## GSM343821                                    Macrophage
    ## GSM343822                                    Macrophage
    ## GSM343823                                    Macrophage
    ## GSM343824                                    Macrophage
    ## GSM343825                                    Macrophage
    ## GSM343826                                    Macrophage
    ## GSM343827                                    Macrophage
    ## GSM343828                                    Macrophage
    ## GSM343829                                    Macrophage
    ## GSM343830                                    Macrophage
    ## GSM343831                                    Macrophage
    ## GSM346941                                   Fibroblasts
    ## GSM346942                                   Fibroblasts
    ## GSM346943                                   Fibroblasts
    ## GSM346944                                   Fibroblasts
    ## GSM346951                             Endothelial_cells
    ## GSM346952                             Endothelial_cells
    ## GSM346959                           Smooth_muscle_cells
    ## GSM346960                           Smooth_muscle_cells
    ## GSM347916                                     iPS_cells
    ## GSM347917                                     iPS_cells
    ## GSM347918                                     iPS_cells
    ## GSM347919                                     iPS_cells
    ## GSM347920                                     iPS_cells
    ## GSM347922                          Embryonic_stem_cells
    ## GSM347923                          Embryonic_stem_cells
    ## GSM347924                          Embryonic_stem_cells
    ## GSM347925                          Embryonic_stem_cells
    ## GSM349848                                       T_cells
    ## GSM349849                                       T_cells
    ## GSM350084                                      Monocyte
    ## GSM350085                                      Monocyte
    ## GSM350086                                      Monocyte
    ## GSM359332                                    Macrophage
    ## GSM359753                                    Macrophage
    ## GSM359754                                    Macrophage
    ## GSM359755                                    Macrophage
    ## GSM359758                                    Macrophage
    ## GSM359759                                    Macrophage
    ## GSM359760                                    Macrophage
    ## GSM361266                                   Neutrophils
    ## GSM361272                                   Neutrophils
    ## GSM361278                                   Neutrophils
    ## GSM361283                                   Neutrophils
    ## GSM361285                                   Neutrophils
    ## GSM366942                                     iPS_cells
    ## GSM367061                          Embryonic_stem_cells
    ## GSM367062                          Embryonic_stem_cells
    ## GSM367219                                     iPS_cells
    ## GSM367240                                     iPS_cells
    ## GSM367241                                     iPS_cells
    ## GSM367242                                     iPS_cells
    ## GSM367243                                     iPS_cells
    ## GSM367244                                     iPS_cells
    ## GSM367245                                     iPS_cells
    ## GSM367258                                     iPS_cells
    ## GSM372142                                     iPS_cells
    ## GSM372144                                     iPS_cells
    ## GSM372146                                     iPS_cells
    ## GSM372154                                     iPS_cells
    ## GSM372155                                     iPS_cells
    ## GSM372156                                     iPS_cells
    ## GSM372157                                     iPS_cells
    ## GSM372158                                     iPS_cells
    ## GSM372159                                     iPS_cells
    ## GSM372800                                       T_cells
    ## GSM372801                                       T_cells
    ## GSM372802                                       T_cells
    ## GSM372803                                       T_cells
    ## GSM372804                                       T_cells
    ## GSM372805                                       T_cells
    ## GSM372806                                       T_cells
    ## GSM372807                                       T_cells
    ## GSM372808                                       T_cells
    ## GSM372809                                       T_cells
    ## GSM372810                                       T_cells
    ## GSM372811                                       T_cells
    ## GSM372812                                       T_cells
    ## GSM372813                                       T_cells
    ## GSM372814                                       T_cells
    ## GSM372815                                       T_cells
    ## GSM372816                                       T_cells
    ## GSM372817                                       T_cells
    ## GSM372818                                       T_cells
    ## GSM378811                          Embryonic_stem_cells
    ## GSM381339                                        B_cell
    ## GSM381340                                        B_cell
    ## GSM381341                                        B_cell
    ## GSM381342                                        B_cell
    ## GSM381343                                        B_cell
    ## GSM381344                                        B_cell
    ## GSM381345                                        B_cell
    ## GSM381346                                        B_cell
    ## GSM385333                             Endothelial_cells
    ## GSM385338                             Endothelial_cells
    ## GSM385350                             Endothelial_cells
    ## GSM385353                             Endothelial_cells
    ## GSM402707                                     iPS_cells
    ## GSM402717                                     iPS_cells
    ## GSM402752                                     iPS_cells
    ## GSM402806                                     iPS_cells
    ## GSM410666                             Endothelial_cells
    ## GSM410667                             Endothelial_cells
    ## GSM410668                             Endothelial_cells
    ## GSM410669                             Endothelial_cells
    ## GSM410672                             Endothelial_cells
    ## GSM410673                             Endothelial_cells
    ## GSM410674                             Endothelial_cells
    ## GSM410675                             Endothelial_cells
    ## GSM410678                             Endothelial_cells
    ## GSM410679                             Endothelial_cells
    ## GSM410680                             Endothelial_cells
    ## GSM410681                             Endothelial_cells
    ## GSM410684                             Endothelial_cells
    ## GSM410685                             Endothelial_cells
    ## GSM410686                             Endothelial_cells
    ## GSM410687                             Endothelial_cells
    ## GSM413840                                  Chondrocytes
    ## GSM413842                                  Chondrocytes
    ## GSM413846                                  Chondrocytes
    ## GSM413847                                  Chondrocytes
    ## GSM413848                                  Chondrocytes
    ## GSM419987                                    Macrophage
    ## GSM419988                                    Macrophage
    ## GSM419989                                    Macrophage
    ## GSM419990                                    Macrophage
    ## GSM419991                                    Macrophage
    ## GSM419992                                    Macrophage
    ## GSM422109                                      Monocyte
    ## GSM422110                                      Monocyte
    ## GSM422111                                      Monocyte
    ## GSM422112                                      Monocyte
    ## GSM422113                                      Monocyte
    ## GSM422114                                      Monocyte
    ## GSM422116                                      Monocyte
    ## GSM432175                                      Monocyte
    ## GSM432176                                      Monocyte
    ## GSM432177                                      Monocyte
    ## GSM432178                                      Monocyte
    ## GSM432179                                      Monocyte
    ## GSM432180                                      Monocyte
    ## GSM451153                             Tissue_stem_cells
    ## GSM451154                             Tissue_stem_cells
    ## GSM451155                             Tissue_stem_cells
    ## GSM451156                             Tissue_stem_cells
    ## GSM451157                             Tissue_stem_cells
    ## GSM451158                             Tissue_stem_cells
    ## GSM451160                             Tissue_stem_cells
    ## GSM451161                             Tissue_stem_cells
    ## GSM456349                                   Hepatocytes
    ## GSM456350                                   Hepatocytes
    ## GSM456351                                   Hepatocytes
    ## GSM466515                                   Neutrophils
    ## GSM466516                                   Neutrophils
    ## GSM466517                                   Neutrophils
    ## GSM466518                                   Neutrophils
    ## GSM466519                                   Neutrophils
    ## GSM469125                                           MSC
    ## GSM469126                                           MSC
    ## GSM469127                                           MSC
    ## GSM469128                                           MSC
    ## GSM469129                                           MSC
    ## GSM469130                                           MSC
    ## GSM469131                                           MSC
    ## GSM469132                                           MSC
    ## GSM469136                                           MSC
    ## GSM469409                          Neuroepithelial_cell
    ## GSM469411                                     Astrocyte
    ## GSM469412                                     Astrocyte
    ## GSM476782                             Endothelial_cells
    ## GSM476783                             Endothelial_cells
    ## GSM476784                             Endothelial_cells
    ## GSM476785                             Endothelial_cells
    ## GSM476786                             Endothelial_cells
    ## GSM483480                                     HSC_CD34+
    ## GSM483481                                     HSC_CD34+
    ## GSM483482                                     HSC_CD34+
    ## GSM483483                                     HSC_CD34+
    ## GSM483484                                     HSC_CD34+
    ## GSM483485                                     HSC_CD34+
    ## GSM488968                                           CMP
    ## GSM488969                                           CMP
    ## GSM488970                                           GMP
    ## GSM488971                                           GMP
    ## GSM488972                                        B_cell
    ## GSM488973                                        B_cell
    ## GSM488974                                           MEP
    ## GSM488975                                           MEP
    ## GSM488976                                     Myelocyte
    ## GSM488977                                     Myelocyte
    ## GSM488978                              Pre-B_cell_CD34-
    ## GSM488979                              Pre-B_cell_CD34-
    ## GSM488980                              Pro-B_cell_CD34+
    ## GSM488981                              Pro-B_cell_CD34+
    ## GSM488982                                 Pro-Myelocyte
    ## GSM488983                                 Pro-Myelocyte
    ## GSM492832                             Endothelial_cells
    ## GSM492833                             Endothelial_cells
    ## GSM492834                           Smooth_muscle_cells
    ## GSM492835                           Smooth_muscle_cells
    ## GSM500995                                     iPS_cells
    ## GSM500996                                     iPS_cells
    ## GSM500997                                     iPS_cells
    ## GSM500998                                     iPS_cells
    ## GSM500999                                     iPS_cells
    ## GSM501000                                     iPS_cells
    ## GSM501001                                     iPS_cells
    ## GSM501002                                     iPS_cells
    ## GSM501003                                     iPS_cells
    ## GSM501004                                     iPS_cells
    ## GSM501005                                     iPS_cells
    ## GSM501006                                     iPS_cells
    ## GSM501007                                     iPS_cells
    ## GSM501008                                     iPS_cells
    ## GSM501009                                     iPS_cells
    ## GSM501890                                   Fibroblasts
    ## GSM501891                                   Fibroblasts
    ## GSM501892                                   Fibroblasts
    ## GSM501893                                   Fibroblasts
    ## GSM501894                                   Fibroblasts
    ## GSM501895                                   Fibroblasts
    ## GSM514669                                      Monocyte
    ## GSM514670                                      Monocyte
    ## GSM514671                                      Monocyte
    ## GSM514672                                      Monocyte
    ## GSM530601                          Embryonic_stem_cells
    ## GSM530602                          Embryonic_stem_cells
    ## GSM530603                          Embryonic_stem_cells
    ## GSM530604                          Embryonic_stem_cells
    ## GSM530605                          Embryonic_stem_cells
    ## GSM530606                          Embryonic_stem_cells
    ## GSM530607                          Embryonic_stem_cells
    ## GSM530611                          Embryonic_stem_cells
    ## GSM53382                                        Neurons
    ## GSM53383                                        Neurons
    ## GSM53384                                        Neurons
    ## GSM53385                                        Neurons
    ## GSM53386                                        Neurons
    ## GSM53387                                        Neurons
    ## GSM540714                             Tissue_stem_cells
    ## GSM540715                             Tissue_stem_cells
    ## GSM540716                             Tissue_stem_cells
    ## GSM542578                                       NK_cell
    ## GSM547998                                       T_cells
    ## GSM547999                                       T_cells
    ## GSM548000                                       T_cells
    ## GSM548001                                       T_cells
    ## GSM549577                                   Neutrophils
    ## GSM549578                                   Neutrophils
    ## GSM549579                                   Neutrophils
    ## GSM549580                                   Neutrophils
    ## GSM549581                                   Neutrophils
    ## GSM549582                                   Neutrophils
    ## GSM549583                                   Neutrophils
    ## GSM549584                                   Neutrophils
    ## GSM551183                             Endothelial_cells
    ## GSM556647                                      Monocyte
    ## GSM556663                                      Monocyte
    ## GSM556665                                      Monocyte
    ## GSM92231                                        Neurons
    ## GSM92232                                        Neurons
    ## GSM92233                                        Neurons
    ## GSM92234                                        Neurons
    ##                                                                                label.fine
    ## GSM112490                                                    DC:monocyte-derived:immature
    ## GSM112491                                                    DC:monocyte-derived:immature
    ## GSM112540                                                    DC:monocyte-derived:immature
    ## GSM112541                                                  DC:monocyte-derived:Galectin-1
    ## GSM112661                                                  DC:monocyte-derived:Galectin-1
    ## GSM112664                                                  DC:monocyte-derived:Galectin-1
    ## GSM112665                                                         DC:monocyte-derived:LPS
    ## GSM112666                                                         DC:monocyte-derived:LPS
    ## GSM112667                                                         DC:monocyte-derived:LPS
    ## GSM112668                                                             DC:monocyte-derived
    ## GSM112669                                                             DC:monocyte-derived
    ## GSM112670                                                             DC:monocyte-derived
    ## GSM116101                                             Smooth_muscle_cells:bronchial:vit_D
    ## GSM116102                                             Smooth_muscle_cells:bronchial:vit_D
    ## GSM116103                                             Smooth_muscle_cells:bronchial:vit_D
    ## GSM116104                                                   Smooth_muscle_cells:bronchial
    ## GSM116105                                                   Smooth_muscle_cells:bronchial
    ## GSM116106                                                   Smooth_muscle_cells:bronchial
    ## GSM119354                                                      Epithelial_cells:bronchial
    ## GSM119357                                                      Epithelial_cells:bronchial
    ## GSM119359                                                      Epithelial_cells:bronchial
    ## GSM119360                                                      Epithelial_cells:bronchial
    ## GSM119361                                                      Epithelial_cells:bronchial
    ## GSM119362                                                      Epithelial_cells:bronchial
    ## GSM119366                                                      Epithelial_cells:bronchial
    ## GSM119369                                                      Epithelial_cells:bronchial
    ## GSM119371                                                      Epithelial_cells:bronchial
    ## GSM119372                                                      Epithelial_cells:bronchial
    ## GSM1209554_HH1763_UI33plus2_201004                                                 B_cell
    ## GSM1209555_HH1778_u133plus2_211004                                                 B_cell
    ## GSM1209556_HH1786_U133plus2_091104                                                 B_cell
    ## GSM1209557_HH1791_u133plus2_251104                                                 B_cell
    ## GSM1209558_HH1713_u133plus2_011004                                             Neutrophil
    ## GSM1209559_HH1712_u133plus2_011004                                             Neutrophil
    ## GSM1209560_HH1714_u133plus2_011004                                             Neutrophil
    ## GSM1209561_TW1681_u133plus2_061004                             T_cell:CD8+_Central_memory
    ## GSM1209562_TW1685_u133plus2_061004                             T_cell:CD8+_Central_memory
    ## GSM1209563_TW1689_u133plus2_061004                             T_cell:CD8+_Central_memory
    ## GSM1209564_HH1765_UI33plus2_201004                                            T_cell:CD8+
    ## GSM1209565_HH1769_UI33plus2_201004                                            T_cell:CD4+
    ## GSM1209566_HH1770_U133plus2_041104                                            T_cell:CD8+
    ## GSM1209567_HH1774_u133plus2_211004                                            T_cell:CD4+
    ## GSM1209568_HH1775_u133plus2_211004                                            T_cell:CD8+
    ## GSM1209569_HH1780_u133plus2_211004                                            T_cell:CD8+
    ## GSM1209570_HH1788_U133plus2_091104                                            T_cell:CD8+
    ## GSM1209571_HH1792_u133plus2_251104                                            T_cell:CD4+
    ## GSM1209572_HH1793_u133plus2_251104                                            T_cell:CD8+
    ## GSM1209573_TW1678_u133plus2_061004                         T_cell:CD8+_effector_memory_RA
    ## GSM1209574_TW1682_u133plus2_061004                         T_cell:CD8+_effector_memory_RA
    ## GSM1209575_TW1686_u133plus2_061004                         T_cell:CD8+_effector_memory_RA
    ## GSM1209576_TW1690_u133plus2_061004                         T_cell:CD8+_effector_memory_RA
    ## GSM1209577_TW1675_u133plus2_061004                            T_cell:CD8+_effector_memory
    ## GSM1209578_TW1679_u133plus2_061004                            T_cell:CD8+_effector_memory
    ## GSM1209579_TW1683_u133plus2_061004                            T_cell:CD8+_effector_memory
    ## GSM1209580_TW1687_u133plus2_061004                            T_cell:CD8+_effector_memory
    ## GSM1209581_TW1676_u133plus2_061004                                      T_cell:CD8+_naive
    ## GSM1209582_TW1680_u133plus2_061004                                      T_cell:CD8+_naive
    ## GSM1209583_TW1684_u133plus2_061004                                      T_cell:CD8+_naive
    ## GSM1209584_TW1688_u133plus2_061004                                      T_cell:CD8+_naive
    ## GSM1209585_HH1762_UI33plus2_201004                                               Monocyte
    ## GSM1209586_HH1767_UI33plus2_201004                                               Monocyte
    ## GSM1209587_HH1772_u133plus2_211004                                               Monocyte
    ## GSM1209588_HH1777_U133plus2_041104                                               Monocyte
    ## GSM1209589_HH1785_U133plus2_011204                                               Monocyte
    ## GSM1209590_HH1790_U133plus2_091104                                               Monocyte
    ## GSM1209591_HH1719_u133plus2_011004                                           Erythroblast
    ## GSM1209592_HH1720_u133plus2_011004                                           Erythroblast
    ## GSM1209593_HH1721_u133plus2_011004                                           Erythroblast
    ## GSM1209594_HH1722_u133plus2_011004                                           Erythroblast
    ## GSM1209595_HH1723_u133plus2_011004                                           Erythroblast
    ## GSM1209596_HH1716_u133plus2_011004                                           Erythroblast
    ## GSM1209597_HH1717_u133plus2_011004                                           Erythroblast
    ## GSM1209598_HH1718_u133plus2_011004                                           Erythroblast
    ## GSM1209599_HH1715_u133plus2_011004                                                     BM
    ## GSM132919                                                             DC:monocyte-derived
    ## GSM132921                                               DC:monocyte-derived:rosiglitazone
    ## GSM132922                                                       DC:monocyte-derived:AM580
    ## GSM132923                                                             DC:monocyte-derived
    ## GSM132924                                               DC:monocyte-derived:rosiglitazone
    ## GSM132925                                                       DC:monocyte-derived:AM580
    ## GSM132926                                     DC:monocyte-derived:rosiglitazone/AGN193109
    ## GSM132927                                                             DC:monocyte-derived
    ## GSM132928                                               DC:monocyte-derived:rosiglitazone
    ## GSM132929                                                       DC:monocyte-derived:AM580
    ## GSM132930                                     DC:monocyte-derived:rosiglitazone/AGN193109
    ## GSM140244                                                                        Monocyte
    ## GSM140245                                                                        Monocyte
    ## GSM140246                                                                        Monocyte
    ## GSM140247                                                                        Monocyte
    ## GSM140248                                                                        Monocyte
    ## GSM140249                                                                        Monocyte
    ## GSM140953                                                             DC:monocyte-derived
    ## GSM140968                                                             DC:monocyte-derived
    ## GSM140969                                                             DC:monocyte-derived
    ## GSM140970                                             DC:monocyte-derived:anti-DC-SIGN_2h
    ## GSM140971                                             DC:monocyte-derived:anti-DC-SIGN_2h
    ## GSM140973                                             DC:monocyte-derived:anti-DC-SIGN_2h
    ## GSM141251                                                         Endothelial_cells:HUVEC
    ## GSM141252                                    Endothelial_cells:HUVEC:Borrelia_burgdorferi
    ## GSM141253                                    Endothelial_cells:HUVEC:Borrelia_burgdorferi
    ## GSM141255                                                    Endothelial_cells:HUVEC:IFNg
    ## GSM143717                                                     Endothelial_cells:lymphatic
    ## GSM143726                                                         Endothelial_cells:HUVEC
    ## GSM143727                                                         Endothelial_cells:HUVEC
    ## GSM143728                                         Endothelial_cells:HUVEC:Serum_Amyloid_A
    ## GSM143729                                         Endothelial_cells:HUVEC:Serum_Amyloid_A
    ## GSM143730                                         Endothelial_cells:HUVEC:Serum_Amyloid_A
    ## GSM143731                                         Endothelial_cells:HUVEC:Serum_Amyloid_A
    ## GSM143732                                         Endothelial_cells:HUVEC:Serum_Amyloid_A
    ## GSM143733                                         Endothelial_cells:HUVEC:Serum_Amyloid_A
    ## GSM143898                                                     Endothelial_cells:lymphatic
    ## GSM143900                                                     Endothelial_cells:lymphatic
    ## GSM143907                                            Endothelial_cells:lymphatic:TNFa_48h
    ## GSM143910                                            Endothelial_cells:lymphatic:TNFa_48h
    ## GSM143914                                            Endothelial_cells:lymphatic:TNFa_48h
    ## GSM153893                                                                 T_cell:effector
    ## GSM154073                                                                 T_cell:effector
    ## GSM154077                                                                 T_cell:effector
    ## GSM154078                                                                 T_cell:effector
    ## GSM154081                                         T_cell:CCR10+CLA+1,25(OH)2_vit_D3/IL-12
    ## GSM154084                                         T_cell:CCR10-CLA+1,25(OH)2_vit_D3/IL-12
    ## GSM158468                                                        Gametocytes:spermatocyte
    ## GSM158470                                                        Gametocytes:spermatocyte
    ## GSM160530                                                             DC:monocyte-derived
    ## GSM160532                                  DC:monocyte-derived:A._fumigatus_germ_tubes_6h
    ## GSM160534                                                             DC:monocyte-derived
    ## GSM160536                                  DC:monocyte-derived:A._fumigatus_germ_tubes_6h
    ## GSM172865                                        Neurons:ES_cell-derived_neural_precursor
    ## GSM172866                                        Neurons:ES_cell-derived_neural_precursor
    ## GSM172867                                        Neurons:ES_cell-derived_neural_precursor
    ## GSM172868                                        Neurons:ES_cell-derived_neural_precursor
    ## GSM172869                                        Neurons:ES_cell-derived_neural_precursor
    ## GSM172870                                        Neurons:ES_cell-derived_neural_precursor
    ## GSM173532                                                                   Keratinocytes
    ## GSM173533                                                                   Keratinocytes
    ## GSM173534                                                                   Keratinocytes
    ## GSM173535                                                              Keratinocytes:IL19
    ## GSM173536                                                              Keratinocytes:IL19
    ## GSM173537                                                              Keratinocytes:IL19
    ## GSM173538                                                              Keratinocytes:IL20
    ## GSM173539                                                              Keratinocytes:IL20
    ## GSM173540                                                              Keratinocytes:IL20
    ## GSM173541                                                              Keratinocytes:IL22
    ## GSM173542                                                              Keratinocytes:IL22
    ## GSM173543                                                              Keratinocytes:IL22
    ## GSM173544                                                              Keratinocytes:IL24
    ## GSM173545                                                              Keratinocytes:IL24
    ## GSM173546                                                              Keratinocytes:IL24
    ## GSM173547                                                              Keratinocytes:IL26
    ## GSM173548                                                              Keratinocytes:IL26
    ## GSM173549                                                              Keratinocytes:IL26
    ## GSM173550                                                               Keratinocytes:KGF
    ## GSM173551                                                               Keratinocytes:KGF
    ## GSM173552                                                               Keratinocytes:KGF
    ## GSM173553                                                              Keratinocytes:IFNg
    ## GSM173554                                                              Keratinocytes:IFNg
    ## GSM173555                                                              Keratinocytes:IL1b
    ## GSM173556                                                              Keratinocytes:IL1b
    ## GSM178549                                                                      HSC_-G-CSF
    ## GSM178550                                                                      HSC_-G-CSF
    ## GSM178551                                                                      HSC_-G-CSF
    ## GSM178552                                                                      HSC_-G-CSF
    ## GSM178553                                                                      HSC_-G-CSF
    ## GSM178554                                                                      HSC_-G-CSF
    ## GSM178555                                                                      HSC_-G-CSF
    ## GSM178556                                                                      HSC_-G-CSF
    ## GSM178557                                                                      HSC_-G-CSF
    ## GSM178558                                                                      HSC_-G-CSF
    ## GSM181857                                                    DC:monocyte-derived:immature
    ## GSM181930                                                    DC:monocyte-derived:immature
    ## GSM181931                                                    DC:monocyte-derived:immature
    ## GSM181932                                                    DC:monocyte-derived:immature
    ## GSM181933                                                    DC:monocyte-derived:immature
    ## GSM181934                                                    DC:monocyte-derived:immature
    ## GSM181971                                                      DC:monocyte-derived:mature
    ## GSM181972                                                    DC:monocyte-derived:immature
    ## GSM181973                                                      DC:monocyte-derived:mature
    ## GSM181974                                                      DC:monocyte-derived:mature
    ## GSM181976                                                      DC:monocyte-derived:mature
    ## GSM181978                                                      DC:monocyte-derived:mature
    ## GSM181980                                                      DC:monocyte-derived:mature
    ## GSM181981                                                      DC:monocyte-derived:mature
    ## GSM181982                                                    DC:monocyte-derived:immature
    ## GSM181983                                                    DC:monocyte-derived:immature
    ## GSM181984                                                    DC:monocyte-derived:immature
    ## GSM181997                                                    DC:monocyte-derived:immature
    ## GSM181998                                                    DC:monocyte-derived:immature
    ## GSM181999                                                    DC:monocyte-derived:immature
    ## GSM182000                                                                        Monocyte
    ## GSM182001                                                           Monocyte:anti-FcgRIIB
    ## GSM182002                                                                        Monocyte
    ## GSM182003                                                                        Monocyte
    ## GSM182004                                                           Monocyte:anti-FcgRIIB
    ## GSM183165                                          Macrophage:monocyte-derived:IL-4/cntrl
    ## GSM183193                                          Macrophage:monocyte-derived:IL-4/cntrl
    ## GSM183196                                          Macrophage:monocyte-derived:IL-4/cntrl
    ## GSM183201                                          Macrophage:monocyte-derived:IL-4/cntrl
    ## GSM183209                                          Macrophage:monocyte-derived:IL-4/cntrl
    ## GSM183217                                      Macrophage:monocyte-derived:IL-4/Dex/cntrl
    ## GSM183305                                      Macrophage:monocyte-derived:IL-4/Dex/cntrl
    ## GSM183306                                      Macrophage:monocyte-derived:IL-4/Dex/cntrl
    ## GSM183315                                      Macrophage:monocyte-derived:IL-4/Dex/cntrl
    ## GSM183316                                      Macrophage:monocyte-derived:IL-4/Dex/cntrl
    ## GSM183392                                       Macrophage:monocyte-derived:IL-4/Dex/TGFb
    ## GSM183393                                       Macrophage:monocyte-derived:IL-4/Dex/TGFb
    ## GSM183394                                       Macrophage:monocyte-derived:IL-4/Dex/TGFb
    ## GSM183462                                       Macrophage:monocyte-derived:IL-4/Dex/TGFb
    ## GSM183463                                       Macrophage:monocyte-derived:IL-4/Dex/TGFb
    ## GSM183464                                       Macrophage:monocyte-derived:IL-4/Dex/TGFb
    ## GSM183465                                       Macrophage:monocyte-derived:IL-4/Dex/TGFb
    ## GSM183466                                       Macrophage:monocyte-derived:IL-4/Dex/TGFb
    ## GSM183467                                       Macrophage:monocyte-derived:IL-4/Dex/TGFb
    ## GSM183482                                       Macrophage:monocyte-derived:IL-4/Dex/TGFb
    ## GSM183483                                           Macrophage:monocyte-derived:IL-4/TGFb
    ## GSM183484                                           Macrophage:monocyte-derived:IL-4/TGFb
    ## GSM183485                                           Macrophage:monocyte-derived:IL-4/TGFb
    ## GSM183486                                           Macrophage:monocyte-derived:IL-4/TGFb
    ## GSM183487                                           Macrophage:monocyte-derived:IL-4/TGFb
    ## GSM189447                                                                        Monocyte
    ## GSM189448                                                                        Monocyte
    ## GSM189449                                                                        Monocyte
    ## GSM189450                                                                        Monocyte
    ## GSM189451                                                         Monocyte:leukotriene_D4
    ## GSM189452                                                         Monocyte:leukotriene_D4
    ## GSM189453                                                         Monocyte:leukotriene_D4
    ## GSM189454                                                         Monocyte:leukotriene_D4
    ## GSM198942                                                                         NK_cell
    ## GSM198943                                                                     NK_cell:IL2
    ## GSM198944                                                                     NK_cell:IL2
    ## GSM198945                                                                     NK_cell:IL2
    ## GSM225042                                                            Embryonic_stem_cells
    ## GSM230294                                                            Embryonic_stem_cells
    ## GSM239260                                                     Tissue_stem_cells:iliac_MSC
    ## GSM239379                                                     Tissue_stem_cells:iliac_MSC
    ## GSM239457                                                     Tissue_stem_cells:iliac_MSC
    ## GSM239606                                                        Chondrocytes:MSC-derived
    ## GSM239612                                                        Chondrocytes:MSC-derived
    ## GSM239613                                                        Chondrocytes:MSC-derived
    ## GSM239616                                                                     Osteoblasts
    ## GSM239668                                                                     Osteoblasts
    ## GSM239669                                                                     Osteoblasts
    ## GSM250019                                                        Tissue_stem_cells:BM_MSC
    ## GSM250020                                                        Tissue_stem_cells:BM_MSC
    ## GSM250021                                                        Tissue_stem_cells:BM_MSC
    ## GSM260305                                                                     Osteoblasts
    ## GSM260306                                                                     Osteoblasts
    ## GSM260307                                                                     Osteoblasts
    ## GSM260308                                                                Osteoblasts:BMP2
    ## GSM260309                                                                Osteoblasts:BMP2
    ## GSM260310                                                                Osteoblasts:BMP2
    ## GSM260311                                                                     Osteoblasts
    ## GSM260312                                                                     Osteoblasts
    ## GSM260313                                                                     Osteoblasts
    ## GSM260314                                                                Osteoblasts:BMP2
    ## GSM260321                                                                Osteoblasts:BMP2
    ## GSM260322                                                                Osteoblasts:BMP2
    ## GSM260657                                                        Tissue_stem_cells:BM_MSC
    ## GSM260658                                                        Tissue_stem_cells:BM_MSC
    ## GSM260659                                                        Tissue_stem_cells:BM_MSC
    ## GSM260661                                                        Tissue_stem_cells:BM_MSC
    ## GSM260662                                                        Tissue_stem_cells:BM_MSC
    ## GSM260663                                                   Tissue_stem_cells:BM_MSC:BMP2
    ## GSM260664                                                   Tissue_stem_cells:BM_MSC:BMP2
    ## GSM260665                                                   Tissue_stem_cells:BM_MSC:BMP2
    ## GSM260666                                                   Tissue_stem_cells:BM_MSC:BMP2
    ## GSM260667                                                   Tissue_stem_cells:BM_MSC:BMP2
    ## GSM260668                                                   Tissue_stem_cells:BM_MSC:BMP2
    ## GSM260669                                                   Tissue_stem_cells:BM_MSC:BMP2
    ## GSM260670                                                   Tissue_stem_cells:BM_MSC:BMP2
    ## GSM260671                                                   Tissue_stem_cells:BM_MSC:BMP2
    ## GSM260672                                                   Tissue_stem_cells:BM_MSC:BMP2
    ## GSM260673                                                   Tissue_stem_cells:BM_MSC:BMP2
    ## GSM260674                                                   Tissue_stem_cells:BM_MSC:BMP2
    ## GSM260675                                                  Tissue_stem_cells:BM_MSC:TGFb3
    ## GSM260676                                                  Tissue_stem_cells:BM_MSC:TGFb3
    ## GSM260678                                                  Tissue_stem_cells:BM_MSC:TGFb3
    ## GSM260679                                                  Tissue_stem_cells:BM_MSC:TGFb3
    ## GSM260680                                                  Tissue_stem_cells:BM_MSC:TGFb3
    ## GSM260681                                                  Tissue_stem_cells:BM_MSC:TGFb3
    ## GSM260682                                                  Tissue_stem_cells:BM_MSC:TGFb3
    ## GSM260683                                                  Tissue_stem_cells:BM_MSC:TGFb3
    ## GSM260684                                                  Tissue_stem_cells:BM_MSC:TGFb3
    ## GSM260685                                                  Tissue_stem_cells:BM_MSC:TGFb3
    ## GSM260686                                                  Tissue_stem_cells:BM_MSC:TGFb3
    ## GSM260689                                                             DC:monocyte-derived
    ## GSM260690                                                         DC:monocyte-derived:LPS
    ## GSM260691                                                         DC:monocyte-derived:LPS
    ## GSM260692                                                         DC:monocyte-derived:LPS
    ## GSM260693                                                    DC:monocyte-derived:Poly(IC)
    ## GSM260694                                                    DC:monocyte-derived:Poly(IC)
    ## GSM260695                                                    DC:monocyte-derived:Poly(IC)
    ## GSM260696                                                       DC:monocyte-derived:CD40L
    ## GSM260697                                                       DC:monocyte-derived:CD40L
    ## GSM260698                                                       DC:monocyte-derived:CD40L
    ## GSM260699                                           DC:monocyte-derived:Schuler_treatment
    ## GSM260700                                           DC:monocyte-derived:Schuler_treatment
    ## GSM260701                                           DC:monocyte-derived:Schuler_treatment
    ## GSM264755                                                             DC:monocyte-derived
    ## GSM264756                                                             DC:monocyte-derived
    ## GSM264757                                             DC:monocyte-derived:antiCD40/VAF347
    ## GSM264758                                             DC:monocyte-derived:antiCD40/VAF347
    ## GSM265494                                                   Tissue_stem_cells:dental_pulp
    ## GSM265495                                                   Tissue_stem_cells:dental_pulp
    ## GSM265496                                                   Tissue_stem_cells:dental_pulp
    ## GSM265497                                                   Tissue_stem_cells:dental_pulp
    ## GSM265498                                                   Tissue_stem_cells:dental_pulp
    ## GSM265499                                                   Tissue_stem_cells:dental_pulp
    ## GSM279572                                                      T_cell:CD4+_central_memory
    ## GSM279573                                                      T_cell:CD4+_central_memory
    ## GSM279574                                                      T_cell:CD4+_central_memory
    ## GSM279575                                                      T_cell:CD4+_central_memory
    ## GSM279576                                                      T_cell:CD4+_central_memory
    ## GSM279577                                                     T_cell:CD4+_effector_memory
    ## GSM279578                                                     T_cell:CD4+_effector_memory
    ## GSM279579                                                     T_cell:CD4+_effector_memory
    ## GSM279580                                                     T_cell:CD4+_effector_memory
    ## GSM279581                                                               T_cell:CD4+_Naive
    ## GSM279582                                                               T_cell:CD4+_Naive
    ## GSM279583                                                               T_cell:CD4+_Naive
    ## GSM279584                                                               T_cell:CD4+_Naive
    ## GSM286015                                                      DC:monocyte-derived:mature
    ## GSM286017                                                      DC:monocyte-derived:mature
    ## GSM286086                                                      DC:monocyte-derived:mature
    ## GSM286087                                                      DC:monocyte-derived:mature
    ## GSM286088                                                    DC:monocyte-derived:immature
    ## GSM286089                                                    DC:monocyte-derived:immature
    ## GSM286090                                                    DC:monocyte-derived:immature
    ## GSM286091                                                    DC:monocyte-derived:immature
    ## GSM287216                                                    Smooth_muscle_cells:vascular
    ## GSM287217                                              Smooth_muscle_cells:vascular:IL-17
    ## GSM287218                                                    Smooth_muscle_cells:vascular
    ## GSM287219                                              Smooth_muscle_cells:vascular:IL-17
    ## GSM287220                                                    Smooth_muscle_cells:vascular
    ## GSM287222                                              Smooth_muscle_cells:vascular:IL-17
    ## GSM289612                                                                              BM
    ## GSM289613                                                                              BM
    ## GSM289614                                                                              BM
    ## GSM289615                                                                              BM
    ## GSM289616                                                                              BM
    ## GSM289617                                                                              BM
    ## GSM289618                                                                              BM
    ## GSM290414                                                                       Platelets
    ## GSM290415                                                                       Platelets
    ## GSM290420                                                                       Platelets
    ## GSM290421                                                                       Platelets
    ## GSM290423                                                                       Platelets
    ## GSM299095                                                        Epithelial_cells:bladder
    ## GSM299096                                                        Epithelial_cells:bladder
    ## GSM299097                                                        Epithelial_cells:bladder
    ## GSM299098                                                        Epithelial_cells:bladder
    ## GSM299099                                                        Epithelial_cells:bladder
    ## GSM299100                                                        Epithelial_cells:bladder
    ## GSM299556                                                     Macrophage:monocyte-derived
    ## GSM299557                                               Macrophage:monocyte-derived:M-CSF
    ## GSM299558                                          Macrophage:monocyte-derived:M-CSF/IFNg
    ## GSM299559                                       Macrophage:monocyte-derived:M-CSF/Pam3Cys
    ## GSM299560                                  Macrophage:monocyte-derived:M-CSF/IFNg/Pam3Cys
    ## GSM299561                                                     Macrophage:monocyte-derived
    ## GSM299562                                               Macrophage:monocyte-derived:M-CSF
    ## GSM299563                                          Macrophage:monocyte-derived:M-CSF/IFNg
    ## GSM299564                                       Macrophage:monocyte-derived:M-CSF/Pam3Cys
    ## GSM299565                                  Macrophage:monocyte-derived:M-CSF/IFNg/Pam3Cys
    ## GSM300389                                                Macrophage:monocyte-derived:IFNa
    ## GSM300390                                                Macrophage:monocyte-derived:IFNa
    ## GSM300392                                                Macrophage:monocyte-derived:IFNa
    ## GSM300393                                                Macrophage:monocyte-derived:IFNa
    ## GSM300394                                                Macrophage:monocyte-derived:IFNa
    ## GSM300395                                                Macrophage:monocyte-derived:IFNa
    ## GSM300398                                                     Macrophage:monocyte-derived
    ## GSM300399                                                     Macrophage:monocyte-derived
    ## GSM300401                                                     Macrophage:monocyte-derived
    ## GSM300402                                                     Macrophage:monocyte-derived
    ## GSM300403                                                     Macrophage:monocyte-derived
    ## GSM300404                                                     Macrophage:monocyte-derived
    ## GSM304260                                                              Gametocytes:oocyte
    ## GSM304261                                                              Gametocytes:oocyte
    ## GSM304262                                                              Gametocytes:oocyte
    ## GSM305430                                                                        Monocyte
    ## GSM305432                                                                        Monocyte
    ## GSM305433                                                 Monocyte:F._tularensis_novicida
    ## GSM305434                                                                        Monocyte
    ## GSM305435                                                 Monocyte:F._tularensis_novicida
    ## GSM305436                                                                        Monocyte
    ## GSM305437                                                 Monocyte:F._tularensis_novicida
    ## GSM305438                                                                        Monocyte
    ## GSM305439                                                 Monocyte:F._tularensis_novicida
    ## GSM305440                                                                        Monocyte
    ## GSM305441                                                 Monocyte:F._tularensis_novicida
    ## GSM305442                                                 Monocyte:F._tularensis_novicida
    ## GSM305784                                                         Endothelial_cells:HUVEC
    ## GSM305785                                                         Endothelial_cells:HUVEC
    ## GSM305786                                         Endothelial_cells:HUVEC:B._anthracis_LT
    ## GSM305787                                         Endothelial_cells:HUVEC:B._anthracis_LT
    ## GSM310429                                                          B_cell:Germinal_center
    ## GSM310430                                                          B_cell:Germinal_center
    ## GSM310431                                                          B_cell:Germinal_center
    ## GSM310432                                                              B_cell:Plasma_cell
    ## GSM310433                                                              B_cell:Plasma_cell
    ## GSM310434                                                              B_cell:Plasma_cell
    ## GSM310435                                                                    B_cell:Naive
    ## GSM310436                                                                    B_cell:Naive
    ## GSM310437                                                                    B_cell:Naive
    ## GSM310438                                                                   B_cell:Memory
    ## GSM310439                                                                   B_cell:Memory
    ## GSM310440                                                                   B_cell:Memory
    ## GSM320543                                                             DC:monocyte-derived
    ## GSM320544                                             DC:monocyte-derived:AEC-conditioned
    ## GSM320545                                                             DC:monocyte-derived
    ## GSM320546                                             DC:monocyte-derived:AEC-conditioned
    ## GSM320547                                                             DC:monocyte-derived
    ## GSM320548                                             DC:monocyte-derived:AEC-conditioned
    ## GSM320549                                                             DC:monocyte-derived
    ## GSM320550                                             DC:monocyte-derived:AEC-conditioned
    ## GSM320551                                                             DC:monocyte-derived
    ## GSM320552                                             DC:monocyte-derived:AEC-conditioned
    ## GSM322374                                            Tissue_stem_cells:lipoma-derived_MSC
    ## GSM322375                                            Tissue_stem_cells:lipoma-derived_MSC
    ## GSM322376                                       Tissue_stem_cells:adipose-derived_MSC_AM3
    ## GSM322377                                       Tissue_stem_cells:adipose-derived_MSC_AM3
    ## GSM330313                                                         Endothelial_cells:HUVEC
    ## GSM330314                                            Endothelial_cells:HUVEC:FPV-infected
    ## GSM330315                                            Endothelial_cells:HUVEC:PR8-infected
    ## GSM330316                                           Endothelial_cells:HUVEC:H5N1-infected
    ## GSM335393                                                         Endothelial_cells:HUVEC
    ## GSM335395                                            Endothelial_cells:HUVEC:FPV-infected
    ## GSM335396                                            Endothelial_cells:HUVEC:PR8-infected
    ## GSM335851                                                         Endothelial_cells:HUVEC
    ## GSM335859                                            Endothelial_cells:HUVEC:FPV-infected
    ## GSM335904                                            Endothelial_cells:HUVEC:PR8-infected
    ## GSM335906                                           Endothelial_cells:HUVEC:H5N1-infected
    ## GSM336559                                           Endothelial_cells:HUVEC:H5N1-infected
    ## GSM343802                                                     Macrophage:monocyte-derived
    ## GSM343803                                           Macrophage:monocyte-derived:S._aureus
    ## GSM343804                                                     Macrophage:monocyte-derived
    ## GSM343805                                           Macrophage:monocyte-derived:S._aureus
    ## GSM343806                                                     Macrophage:monocyte-derived
    ## GSM343807                                           Macrophage:monocyte-derived:S._aureus
    ## GSM343808                                                     Macrophage:monocyte-derived
    ## GSM343809                                           Macrophage:monocyte-derived:S._aureus
    ## GSM343810                                                     Macrophage:monocyte-derived
    ## GSM343811                                           Macrophage:monocyte-derived:S._aureus
    ## GSM343812                                                     Macrophage:monocyte-derived
    ## GSM343813                                           Macrophage:monocyte-derived:S._aureus
    ## GSM343814                                                     Macrophage:monocyte-derived
    ## GSM343815                                           Macrophage:monocyte-derived:S._aureus
    ## GSM343816                                                     Macrophage:monocyte-derived
    ## GSM343817                                           Macrophage:monocyte-derived:S._aureus
    ## GSM343818                                                     Macrophage:monocyte-derived
    ## GSM343819                                           Macrophage:monocyte-derived:S._aureus
    ## GSM343820                                                     Macrophage:monocyte-derived
    ## GSM343821                                           Macrophage:monocyte-derived:S._aureus
    ## GSM343822                                                     Macrophage:monocyte-derived
    ## GSM343823                                           Macrophage:monocyte-derived:S._aureus
    ## GSM343824                                                     Macrophage:monocyte-derived
    ## GSM343825                                           Macrophage:monocyte-derived:S._aureus
    ## GSM343826                                                     Macrophage:monocyte-derived
    ## GSM343827                                           Macrophage:monocyte-derived:S._aureus
    ## GSM343828                                                     Macrophage:monocyte-derived
    ## GSM343829                                           Macrophage:monocyte-derived:S._aureus
    ## GSM343830                                                     Macrophage:monocyte-derived
    ## GSM343831                                           Macrophage:monocyte-derived:S._aureus
    ## GSM346941                                                            Fibroblasts:foreskin
    ## GSM346942                                                            Fibroblasts:foreskin
    ## GSM346943                                                            Fibroblasts:foreskin
    ## GSM346944                                                            Fibroblasts:foreskin
    ## GSM346951                                                         Endothelial_cells:HUVEC
    ## GSM346952                                                         Endothelial_cells:HUVEC
    ## GSM346959                                                    Smooth_muscle_cells:vascular
    ## GSM346960                                                    Smooth_muscle_cells:vascular
    ## GSM347916                                               iPS_cells:skin_fibroblast-derived
    ## GSM347917                                               iPS_cells:skin_fibroblast-derived
    ## GSM347918                                               iPS_cells:skin_fibroblast-derived
    ## GSM347919                                                       iPS_cells:skin_fibroblast
    ## GSM347920                                                       iPS_cells:skin_fibroblast
    ## GSM347922                                                            Embryonic_stem_cells
    ## GSM347923                                                            Embryonic_stem_cells
    ## GSM347924                                                            Embryonic_stem_cells
    ## GSM347925                                                            Embryonic_stem_cells
    ## GSM349848                                                              T_cell:gamma-delta
    ## GSM349849                                                              T_cell:gamma-delta
    ## GSM350084                                                                  Monocyte:CD14+
    ## GSM350085                                                                  Monocyte:CD14+
    ## GSM350086                                                                  Monocyte:CD14+
    ## GSM359332                                                             Macrophage:Alveolar
    ## GSM359753                                                             Macrophage:Alveolar
    ## GSM359754                                                             Macrophage:Alveolar
    ## GSM359755                                                             Macrophage:Alveolar
    ## GSM359758                                          Macrophage:Alveolar:B._anthacis_spores
    ## GSM359759                                          Macrophage:Alveolar:B._anthacis_spores
    ## GSM359760                                          Macrophage:Alveolar:B._anthacis_spores
    ## GSM361266                                                                      Neutrophil
    ## GSM361272                                                               Neutrophil:inflam
    ## GSM361278                                                               Neutrophil:inflam
    ## GSM361283                                                               Neutrophil:inflam
    ## GSM361285                                                               Neutrophil:inflam
    ## GSM366942                                                       iPS_cells:PDB_fibroblasts
    ## GSM367061                                                            Embryonic_stem_cells
    ## GSM367062                                                            Embryonic_stem_cells
    ## GSM367219                                                     iPS_cells:PDB_1lox-17Puro-5
    ## GSM367240                                                    iPS_cells:PDB_1lox-17Puro-10
    ## GSM367241                                                    iPS_cells:PDB_1lox-21Puro-20
    ## GSM367242                                                    iPS_cells:PDB_1lox-21Puro-26
    ## GSM367243                                                            iPS_cells:PDB_2lox-5
    ## GSM367244                                                           iPS_cells:PDB_2lox-22
    ## GSM367245                                                           iPS_cells:PDB_2lox-21
    ## GSM367258                                                           iPS_cells:PDB_2lox-17
    ## GSM372142                                                      iPS_cells:CRL2097_foreskin
    ## GSM372144                                                      iPS_cells:CRL2097_foreskin
    ## GSM372146                                                      iPS_cells:CRL2097_foreskin
    ## GSM372154                             iPS_cells:CRL2097_foreskin-derived:d20_hepatic_diff
    ## GSM372155                             iPS_cells:CRL2097_foreskin-derived:d20_hepatic_diff
    ## GSM372156                             iPS_cells:CRL2097_foreskin-derived:d20_hepatic_diff
    ## GSM372157                                      iPS_cells:CRL2097_foreskin-derived:undiff.
    ## GSM372158                                      iPS_cells:CRL2097_foreskin-derived:undiff.
    ## GSM372159                                      iPS_cells:CRL2097_foreskin-derived:undiff.
    ## GSM372800                                                                     T_cell:CD4+
    ## GSM372801                                                                     T_cell:CD4+
    ## GSM372802                                                                     T_cell:CD4+
    ## GSM372803                                                                     T_cell:CD4+
    ## GSM372804                                                                     T_cell:CD4+
    ## GSM372805                                                                     T_cell:CD4+
    ## GSM372806                                                                     T_cell:CD4+
    ## GSM372807                                                                     T_cell:CD4+
    ## GSM372808                                                                     T_cell:CD4+
    ## GSM372809                                                                     T_cell:CD8+
    ## GSM372810                                                                     T_cell:CD8+
    ## GSM372811                                                                     T_cell:CD8+
    ## GSM372812                                                                     T_cell:CD8+
    ## GSM372813                                                                     T_cell:CD8+
    ## GSM372814                                                                     T_cell:CD8+
    ## GSM372815                                                                     T_cell:CD8+
    ## GSM372816                                                                     T_cell:CD8+
    ## GSM372817                                                                     T_cell:CD8+
    ## GSM372818                                                                     T_cell:CD8+
    ## GSM378811                                                            Embryonic_stem_cells
    ## GSM381339                                                       B_cell:CXCR4+_centroblast
    ## GSM381340                                                        B_cell:CXCR4-_centrocyte
    ## GSM381341                                                       B_cell:CXCR4+_centroblast
    ## GSM381342                                                        B_cell:CXCR4-_centrocyte
    ## GSM381343                                                       B_cell:CXCR4+_centroblast
    ## GSM381344                                                        B_cell:CXCR4-_centrocyte
    ## GSM381345                                                       B_cell:CXCR4+_centroblast
    ## GSM381346                                                        B_cell:CXCR4-_centrocyte
    ## GSM385333                                                         Endothelial_cells:HUVEC
    ## GSM385338                                                    Endothelial_cells:HUVEC:VEGF
    ## GSM385350                                                    Endothelial_cells:HUVEC:VEGF
    ## GSM385353                                                    Endothelial_cells:HUVEC:VEGF
    ## GSM402707                                                           iPS_cells:fibroblasts
    ## GSM402717                                 iPS_cells:fibroblast-derived:Direct_del._reprog
    ## GSM402752                                 iPS_cells:fibroblast-derived:Direct_del._reprog
    ## GSM402806                                  iPS_cells:fibroblast-derived:Retroviral_transf
    ## GSM410666                                                     Endothelial_cells:lymphatic
    ## GSM410667                                                     Endothelial_cells:lymphatic
    ## GSM410668                                                     Endothelial_cells:lymphatic
    ## GSM410669                                                     Endothelial_cells:lymphatic
    ## GSM410672                                                Endothelial_cells:lymphatic:KSHV
    ## GSM410673                                                Endothelial_cells:lymphatic:KSHV
    ## GSM410674                                                Endothelial_cells:lymphatic:KSHV
    ## GSM410675                                                Endothelial_cells:lymphatic:KSHV
    ## GSM410678                                                  Endothelial_cells:blood_vessel
    ## GSM410679                                                  Endothelial_cells:blood_vessel
    ## GSM410680                                                  Endothelial_cells:blood_vessel
    ## GSM410681                                                  Endothelial_cells:blood_vessel
    ## GSM410684                                                  Endothelial_cells:blood_vessel
    ## GSM410685                                                  Endothelial_cells:blood_vessel
    ## GSM410686                                                  Endothelial_cells:blood_vessel
    ## GSM410687                                                  Endothelial_cells:blood_vessel
    ## GSM413840                                                        Chondrocytes:MSC-derived
    ## GSM413842                                                        Chondrocytes:MSC-derived
    ## GSM413846                                                        Chondrocytes:MSC-derived
    ## GSM413847                                                        Chondrocytes:MSC-derived
    ## GSM413848                                                        Chondrocytes:MSC-derived
    ## GSM419987                                                     Macrophage:monocyte-derived
    ## GSM419988                                                     Macrophage:monocyte-derived
    ## GSM419989                                                     Macrophage:monocyte-derived
    ## GSM419990                                                Macrophage:monocyte-derived:IFNa
    ## GSM419991                                                Macrophage:monocyte-derived:IFNa
    ## GSM419992                                                Macrophage:monocyte-derived:IFNa
    ## GSM422109                                                                  Monocyte:CD16-
    ## GSM422110                                                                  Monocyte:CD16-
    ## GSM422111                                                                  Monocyte:CD16-
    ## GSM422112                                                                  Monocyte:CD16-
    ## GSM422113                                                                  Monocyte:CD16+
    ## GSM422114                                                                  Monocyte:CD16+
    ## GSM422116                                                                  Monocyte:CD16+
    ## GSM432175                                                                  Monocyte:CD16-
    ## GSM432176                                                                  Monocyte:CD16-
    ## GSM432177                                                                  Monocyte:CD16-
    ## GSM432178                                                                  Monocyte:CD16+
    ## GSM432179                                                                  Monocyte:CD16+
    ## GSM432180                                                                  Monocyte:CD16+
    ## GSM451153                                             Tissue_stem_cells:BM_MSC:osteogenic
    ## GSM451154                                             Tissue_stem_cells:BM_MSC:osteogenic
    ## GSM451155                                             Tissue_stem_cells:BM_MSC:osteogenic
    ## GSM451156                                             Tissue_stem_cells:BM_MSC:osteogenic
    ## GSM451157                                             Tissue_stem_cells:BM_MSC:osteogenic
    ## GSM451158                                             Tissue_stem_cells:BM_MSC:osteogenic
    ## GSM451160                                             Tissue_stem_cells:BM_MSC:osteogenic
    ## GSM451161                                             Tissue_stem_cells:BM_MSC:osteogenic
    ## GSM456349                                                                     Hepatocytes
    ## GSM456350                                                                     Hepatocytes
    ## GSM456351                                                                     Hepatocytes
    ## GSM466515                                          Neutrophil:uropathogenic_E._coli_UTI89
    ## GSM466516                                             Neutrophil:commensal_E._coli_MG1655
    ## GSM466517                                             Neutrophil:commensal_E._coli_MG1655
    ## GSM466518                                                                      Neutrophil
    ## GSM466519                                                                      Neutrophil
    ## GSM469125                                                                             MSC
    ## GSM469126                                                                             MSC
    ## GSM469127                                                                             MSC
    ## GSM469128                                                                             MSC
    ## GSM469129                                                                             MSC
    ## GSM469130                                                                             MSC
    ## GSM469131                                                                             MSC
    ## GSM469132                                                                             MSC
    ## GSM469136                                                                             MSC
    ## GSM469409                                                Neuroepithelial_cell:ESC-derived
    ## GSM469411                                           Astrocyte:Embryonic_stem_cell-derived
    ## GSM469412                                           Astrocyte:Embryonic_stem_cell-derived
    ## GSM476782                                                         Endothelial_cells:HUVEC
    ## GSM476783                                                   Endothelial_cells:HUVEC:IL-1b
    ## GSM476784                                                   Endothelial_cells:HUVEC:IL-1b
    ## GSM476785                                                         Endothelial_cells:HUVEC
    ## GSM476786                                                   Endothelial_cells:HUVEC:IL-1b
    ## GSM483480                                                                       HSC_CD34+
    ## GSM483481                                                                       HSC_CD34+
    ## GSM483482                                                                       HSC_CD34+
    ## GSM483483                                                                       HSC_CD34+
    ## GSM483484                                                                       HSC_CD34+
    ## GSM483485                                                                       HSC_CD34+
    ## GSM488968                                                                             CMP
    ## GSM488969                                                                             CMP
    ## GSM488970                                                                             GMP
    ## GSM488971                                                                             GMP
    ## GSM488972                                                                 B_cell:immature
    ## GSM488973                                                                 B_cell:immature
    ## GSM488974                                                                             MEP
    ## GSM488975                                                                             MEP
    ## GSM488976                                                                       Myelocyte
    ## GSM488977                                                                       Myelocyte
    ## GSM488978                                                                Pre-B_cell_CD34-
    ## GSM488979                                                                Pre-B_cell_CD34-
    ## GSM488980                                                                Pro-B_cell_CD34+
    ## GSM488981                                                                Pro-B_cell_CD34+
    ## GSM488982                                                                   Pro-Myelocyte
    ## GSM488983                                                                   Pro-Myelocyte
    ## GSM492832                                                         Endothelial_cells:HUVEC
    ## GSM492833                                                         Endothelial_cells:HUVEC
    ## GSM492834                                              Smooth_muscle_cells:umbilical_vein
    ## GSM492835                                              Smooth_muscle_cells:umbilical_vein
    ## GSM500995                                                   iPS_cells:foreskin_fibrobasts
    ## GSM500996                                                iPS_cells:iPS:minicircle-derived
    ## GSM500997                                                iPS_cells:iPS:minicircle-derived
    ## GSM500998                                                iPS_cells:iPS:minicircle-derived
    ## GSM500999                                                iPS_cells:iPS:minicircle-derived
    ## GSM501000                                                iPS_cells:iPS:minicircle-derived
    ## GSM501001                                                    iPS_cells:adipose_stem_cells
    ## GSM501002                                                    iPS_cells:adipose_stem_cells
    ## GSM501003                                                    iPS_cells:adipose_stem_cells
    ## GSM501004                                  iPS_cells:adipose_stem_cell-derived:lentiviral
    ## GSM501005                                  iPS_cells:adipose_stem_cell-derived:lentiviral
    ## GSM501006                                  iPS_cells:adipose_stem_cell-derived:lentiviral
    ## GSM501007                          iPS_cells:adipose_stem_cell-derived:minicircle-derived
    ## GSM501008                          iPS_cells:adipose_stem_cell-derived:minicircle-derived
    ## GSM501009                          iPS_cells:adipose_stem_cell-derived:minicircle-derived
    ## GSM501890                                                              Fibroblasts:breast
    ## GSM501891                                                              Fibroblasts:breast
    ## GSM501892                                                              Fibroblasts:breast
    ## GSM501893                                                              Fibroblasts:breast
    ## GSM501894                                                              Fibroblasts:breast
    ## GSM501895                                                              Fibroblasts:breast
    ## GSM514669                                                                   Monocyte:MCSF
    ## GSM514670                                                                   Monocyte:MCSF
    ## GSM514671                                                                  Monocyte:CXCL4
    ## GSM514672                                                                  Monocyte:CXCL4
    ## GSM530601                                                            Embryonic_stem_cells
    ## GSM530602                                                            Embryonic_stem_cells
    ## GSM530603                                                            Embryonic_stem_cells
    ## GSM530604                                                            Embryonic_stem_cells
    ## GSM530605                                                            Embryonic_stem_cells
    ## GSM530606                                                            Embryonic_stem_cells
    ## GSM530607                                                            Embryonic_stem_cells
    ## GSM530611                                                            Embryonic_stem_cells
    ## GSM53382                                                Neurons:adrenal_medulla_cell_line
    ## GSM53383                                                Neurons:adrenal_medulla_cell_line
    ## GSM53384                                                Neurons:adrenal_medulla_cell_line
    ## GSM53385                                                Neurons:adrenal_medulla_cell_line
    ## GSM53386                                                Neurons:adrenal_medulla_cell_line
    ## GSM53387                                                Neurons:adrenal_medulla_cell_line
    ## GSM540714                                                   Tissue_stem_cells:CD326-CD56+
    ## GSM540715                                                   Tissue_stem_cells:CD326-CD56+
    ## GSM540716                                                   Tissue_stem_cells:CD326-CD56+
    ## GSM542578                                                            NK_cell:CD56hiCD62L+
    ## GSM547998                                                               T_cell:Treg:Naive
    ## GSM547999                                                               T_cell:Treg:Naive
    ## GSM548000                                                               T_cell:CD4+_Naive
    ## GSM548001                                                               T_cell:CD4+_Naive
    ## GSM549577                                                                  Neutrophil:LPS
    ## GSM549578                                                                  Neutrophil:LPS
    ## GSM549579                                                                  Neutrophil:LPS
    ## GSM549580                                                                  Neutrophil:LPS
    ## GSM549581                                                          Neutrophil:GM-CSF_IFNg
    ## GSM549582                                                          Neutrophil:GM-CSF_IFNg
    ## GSM549583                                                          Neutrophil:GM-CSF_IFNg
    ## GSM549584                                                          Neutrophil:GM-CSF_IFNg
    ## GSM551183                                                         Endothelial_cells:HUVEC
    ## GSM556647                                                                        Monocyte
    ## GSM556663                                                                        Monocyte
    ## GSM556665                                               Monocyte:S._typhimurium_flagellin
    ## GSM92231                                                             Neurons:Schwann_cell
    ## GSM92232                                                             Neurons:Schwann_cell
    ## GSM92233                                                             Neurons:Schwann_cell
    ## GSM92234                                                             Neurons:Schwann_cell

We use our `ref` reference to annotate each cell in `pbmc` via the
`SingleR` function.

``` r
pbmc.sce <- as.SingleCellExperiment(pbmc) #convert to SingleCellExperiment
pred.pbmc <- SingleR(test = pbmc.sce, ref = ref, assay.type.test=1,
    labels = ref$label.main)
```

Each row of the output DataFrame contains prediction results for each
cell.

``` r
pred.pbmc
```

    ## DataFrame with 2638 rows and 5 columns
    ##                                                                      scores
    ##                                                                    <matrix>
    ## AAACATACAACCAC-1  0.188643513016495:0.126545677221482:0.148817362386119:...
    ## AAACATTGAGCTAC-1  0.262440847080309:0.141877125510439:0.173883875462993:...
    ## AAACATTGATCAGC-1  0.201531694691989:0.102183839968423:0.119175368433024:...
    ## AAACCGTGCTTCCG-1   0.29535017400362:0.130158307902165:0.157554338627856:...
    ## AAACCGTGTATGCG-1  0.149838962207997:0.0789937558147814:0.09940263612008:...
    ## ...                                                                     ...
    ## TTTCGAACTCTCAT-1   0.32171248767637:0.146440795008671:0.176046214253916:...
    ## TTTCTACTGAGGCA-1  0.255811947610562:0.175397380908548:0.194313874751393:...
    ## TTTCTACTTCCTCG-1 0.189605052702718:0.0707210463786043:0.120214202766769:...
    ## TTTGCATGAGAGGC-1 0.157296302532056:0.0703783076303343:0.109879822603735:...
    ## TTTGCATGCCTCAC-1  0.192359514330612:0.105920696799686:0.144491410113365:...
    ##                      first.labels                        tuning.scores
    ##                       <character>                          <DataFrame>
    ## AAACATACAACCAC-1          T_cells   0.30197542955515:0.213314539202627
    ## AAACATTGAGCTAC-1           B_cell 0.326635981507555:0.0220241142719439
    ## AAACATTGATCAGC-1          T_cells  0.307280332559489:0.109094837818784
    ## AAACCGTGCTTCCG-1         Monocyte   0.28638593546712:0.236027443382121
    ## AAACCGTGTATGCG-1          NK_cell  0.299925203850882:0.210705283688696
    ## ...                           ...                                  ...
    ## TTTCGAACTCTCAT-1 Pre-B_cell_CD34-  0.259345379219524:0.134352894882063
    ## TTTCTACTGAGGCA-1 Pre-B_cell_CD34-  0.157335894267966:0.129646880250965
    ## TTTCTACTTCCTCG-1           B_cell  0.235416822028172:0.173612567558807
    ## TTTGCATGAGAGGC-1           B_cell  0.228548164914059:0.149524152731392
    ## TTTGCATGCCTCAC-1          T_cells  0.288418116982557:0.194117507349502
    ##                            labels    pruned.labels
    ##                       <character>      <character>
    ## AAACATACAACCAC-1          T_cells          T_cells
    ## AAACATTGAGCTAC-1           B_cell           B_cell
    ## AAACATTGATCAGC-1          T_cells          T_cells
    ## AAACCGTGCTTCCG-1         Monocyte         Monocyte
    ## AAACCGTGTATGCG-1          NK_cell          NK_cell
    ## ...                           ...              ...
    ## TTTCGAACTCTCAT-1         Monocyte         Monocyte
    ## TTTCTACTGAGGCA-1 Pre-B_cell_CD34- Pre-B_cell_CD34-
    ## TTTCTACTTCCTCG-1           B_cell           B_cell
    ## TTTGCATGAGAGGC-1           B_cell           B_cell
    ## TTTGCATGCCTCAC-1          T_cells          T_cells

``` r
# Summarizing the distribution:
table(pred.pbmc$labels)
```

    ## 
    ##           B_cell              CMP         Monocyte          NK_cell 
    ##              333                4              615              193 
    ##        Platelets Pre-B_cell_CD34- Pro-B_cell_CD34+          T_cells 
    ##               12               65                5             1411

Let’s see how it compared to our manual annotations. First, we will add
the predicted labels as new metadata.

``` r
pbmc <- AddMetaData(pbmc, pred.pbmc$labels, col.name = 'SingleR.Annotations')
plot1 <- DimPlot(pbmc, reduction = "umap", label = TRUE, pt.size = 0.5) + NoLegend() + ggtitle('Manual Annotations')
plot2 <- DimPlot(pbmc, reduction = "umap", group.by = 'SingleR.Annotations', label = TRUE, pt.size = 0.5) + NoLegend() + ggtitle('SingleR Annotations')
plot1 + plot2
```

![](Seurat-Guided-Clustering-Tutorial_files/figure-markdown_github/unnamed-chunk-40-1.png)

We can see that the predicted labels and manually anotated labels match
up pretty well. Your choice of reference data and parameters can be used
to further fine-tine the predicted labels. Here we used a bulk reference
data set but a single-cell reference data that is well-annotated set
could be used as well.

Finally, always make sure to save your data.

``` r
saveRDS(pbmc, file = "pbmc3k_final.rds")
```
