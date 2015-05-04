---
layout: page
title: More Information
permalink: /about/
---

### Rationale
Orthologous genes are genes which arise from speciation, for example, Human Talin, and Mouse Talin. Identification and accuracy of genes classed as orthologs is key for comparative genomic approaches, however there is no consensus model.  Approximately 30 independent algorithms exist to classify orthologous genes; some based on species and gene phylogeny and some using exclusively sequence comparison.  Phylogeny based approaches have the advantage of tracking genes through realistic evolutionary paths, however tend to be computationally intensive, and subject to error from misconstructed gene trees.  BLAST approaches are much faster, generally using an all-by-all blast of multispecies proteomes in order to generate best matches, however lack the added power of phylogenetic information.  

There is often no clear answer for which database to use to generate lists of orthologs for a comparative project.  Confounding this problem is the lack of a method to easily compare results from different databases.  Additionally, precomputed data available from the databases uses various gene naming methods, or different releases of the same naming type with non-overlapping gene names.  The Orthology Database Connector attempts to inform research using orthologs by standardizing and aligning ortholog groups from ten separate ortholog grouping algorithms.  Additionally, the number of databases which call a gene as an ortholog may be used as a proxy for confidence of that gene's assignment of orthology to the reference gene.  


### Ortholog databases

The <a href="http://www.uniprot.org/database/?query=*&fil=category%3A%22Phylogenomic+databases%22">cross-referencing of UniProt</a> with phylogenomic databases facilitated this project.  UniProt entries can be filtered by presence in a ortholog database, and downloaded along with their database assigned group ID.  This approach was used for retrieving eggNOG, GeneTree, HOGENOM, HOVERGEN, KO, OMA, OrthoDB, and TreeFAM databases. The entire 2014 release of the COG database was download directly from the COG website, and the given RefSeqIDs converted to UniProt using the downloadable UniProt ID mapping table.  The Human PhylomeDB was downloaded from the PhylomeDB website formatted with Uniprot Accession.  For both COG and PhylomeDB databases it was necessary to convert deprecated Accessions to current versions, as well as map up to date UniProt gene names.    

## Database details

<a href="http://www.uniprot.org/database/DB-0152">eggNOG - evolutionary genealogy of genes:Non-supervised Orthologous Groups</a>
<ul>
  <li>eggNOG clusters protein sequences using the FASTA algorithm to derive maximum likelihood gene family trees</li>
  <li>Version 4.0 </li>
  <li>2031 species, 7.7 million proteins, 1.7 million ortholog groups</li>

</ul>


<a href="http://useast.ensembl.org/info/genome/compara/homology_method.html">EnsemblCompara GeneTrees </a>
<ul>
  <li>"Protein trees are constructed using a representative protein for every gene in Ensembl: proteins are clustered using hcluster_sg based on NCBI BLAST+ e-values, and each cluster of proteins is aligned using M-Coffee or Mafft. Finally, TreeBeST is used to produce a gene tree from each multiple alignment, reconciling it with the species tree to call duplication events."
  <li>Ensembl release 79, March 2015/li>
  <li> </li>
</ul>

<a href="http://www.ncbi.nlm.nih.gov/COG/">COGS - Phylogenetic classification of proteins encoded in complete genomes </a>

<a href="http://www.uniprot.org/database/DB-0044">The HOGENOM Database of Homologous Genes from Fully Sequenced Organisms </a>

<a href="http://www.uniprot.org/database/DB-0045">The HOVERGEN Database of Homologous Vertebrate Genes </a>

<a href="http://www.uniprot.org/database/DB-0164">KEGG Orthology (KO)</a>

<a href="http://www.uniprot.org/database/DB-0137">OMA - Identification of Orthologs from Complete Genome Data</a>

<a href="http://www.uniprot.org/database/DB-0143">OrthoDB - Database of Orthologous Groups</a>

<a href="http://phylomedb.org/">PhylomeDB 4 - Database for complete collections of gene phylogenies, Human Phylome (3)</a>
<ul>
  <li>"PhylomeDB provides genome-wide orthology and paralogy predictions which are based on the analysis of the phylogenetic trees. The automated pipeline used to reconstruct trees aims at providing a high-quality phylogenetic analysis of different genomes, including Maximum Likelihood tree inference, alignment trimming and evolutionary model testing."</li>
  <li>Human Phylome version 3, 2011, PhylomeDB version 4/li>
  <li>39 species proteomes referenced to human proteome/li>
</ul>
<a href="http://www.uniprot.org/database/DB-0185">TreeFam database of animal gene trees</a>
<ul>
  <li> "TreeFam is a database composed of phylogenetic trees inferred from animal genomes. It provides orthology/parology predictions as well the evolutionary history of genes."</li>
  <li>Release 9, March 2013</li>
  <li>109 Species, 15,736 gene families</li>
</ul>






### Contact me

claire.mcwhite (at) utexas.edu
