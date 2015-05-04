---
layout: page
title: More Information
permalink: /about/
---

### Rationale
Orthologous genes are genes which arise from speciation, for example, Human Talin, and Mouse Talin. Identification and accuracy of genes classed as orthologs is key for comparative genomic approaches, however there is no consensus model.  Approximately 30 independent algorithms exist to classify orthologous genes; some based on species and gene phylogeny and some using exclusively sequence comparison.  Phylogeny based approaches have the advantage of tracking genes through realistic evolutionary paths, however tend to be computationally intensive, and subject to error from misconstructed gene trees.  BLAST approaches are much faster, generally using an all-by-all blast of multispecies proteomes in order to generate best matches, however lack the added power of phylogenetic information.  

There is often no clear answer for which database to use to generate lists of orthologs for a comparative project.  Confounding this problem is the lack of a method to easily compare results from different databases.  Additionally, precomputed data available from the databases uses various gene naming methods, or different releases of the same naming type with non-overlapping gene names.  The Orthology Database Connector attempts to inform research using orthologs by standardizing and aligning ortholog groups from ten separate ortholog grouping algorithms.  Additionally, the number of databases which call a gene as an ortholog may be used as a proxy for confidence of that gene's assignment of orthology to the reference gene.  


### Ortholog database details

The <a href="http://www.uniprot.org/database/?query=*&fil=category%3A%22Phylogenomic+databases%22">cross-referencing of UniProt</a> with phylogenomic databases facilitated this project.  UniProt entries can be filtered by presence in a ortholog database, and downloaded along with their database assigned group ID.  This approach was used for retrieving eggNOG, GeneTree, HOGENOM, HOVERGEN, KO, OMA, OrthoDB, and TreeFAM databases. The entire 2014 release of the COG database was download directly from the COG website, and the given RefSeqIDs converted to UniProt using the downloadable UniProt ID mapping table.  The Human PhylomeDB was downloaded from the PhylomeDB website formatted with Uniprot Accession.  For both COG and PhylomeDB databases it was necessary to convert deprecated Accessions to current versions, as well as map up to date UniProt gene names.    

1. EggNOG = 









### Contact me

claire.mcwhite (at) utexas.edu
