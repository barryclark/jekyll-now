---
layout: page
title: 
permalink: /holder/
---
#This is outdated
The Ortholog Database Connector gives a comprehensive view of multiorganism orthologs of a given human gene, as produced by diverse ortholog sorting algorithms.  For example, the table for the human gene P00395 has columns containing the membership of the ortholog group P00395 belongs to according to each database.       

### Rationale
Orthologous genes are genes which arise from speciation, for example, Human Talin, and Mouse Talin. Identification and accuracy of genes classed as orthologs is key for comparative genomic approaches, however there is no consensus model.  Approximately 30 independent algorithms exist to classify orthologous genes; some based on species and gene phylogeny and some using exclusively sequence comparison.  Phylogeny based approaches have the advantage of tracking genes through realistic evolutionary paths, however tend to be computationally intensive, and subject to error from misconstructed gene trees.  BLAST approaches are much faster, generally using an all-by-all blast of multispecies proteomes in order to generate best matches, however lack the added power of phylogenetic information.  

There is often no clear answer for which database to use to generate lists of orthologs for a comparative project.  Confounding this problem is the lack of a method to easily compare results from different databases.  Additionally, precomputed data available from the databases use various gene naming methods, or different releases of the same naming type with non-overlapping gene names.  The Orthology Database Connector attempts to inform research using orthologs by standardizing and aligning ortholog groups from ten separate ortholog grouping algorithms.  Additionally, the number of databases which call a gene as an ortholog may be used as a proxy for confidence of that gene's assignment of orthology to the reference gene. The ability to visualize and compare ortholog groupings from multiple sources will aid comparative study of proteins and genes.  


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
  <li>Ensembl release 79, March 2015</li>
  <li>69 Eukaryotic species</li>
</ul>

<a href="http://www.ncbi.nlm.nih.gov/COG/">COGS - Phylogenetic classification of proteins encoded in complete genomes </a>
<ul>
  <li>COG uses pairwise sequence comparisons and best hit analysis to group proteins into clusters, with a focus on funcational category prediction and annotation</li>
  <li>2014 Update</li>
  <li>Focus on bacteria and archaea, 711 species</li>
</ul>

<a href="http://www.uniprot.org/database/DB-0044">The HOGENOM Database of Homologous Genes from Fully Sequenced Organisms </a>

<ul>
  <li>HOGENOME uses all-by-all blastP2 followed by clustering, multiple sequence alignment and phylogenetic tree analysis</li>
  <li>Release 06, December 2011</li>
  <li>1233 bacteria, 97 archaea, 140 eukaryotes</li>
</ul>

<a href="http://www.uniprot.org/database/DB-0045">The HOVERGEN Database of Homologous Vertebrate Genes </a>
<ul>
  <li>HOVERGEN uses all-by-all blastP2 followed by clustering, multiple sequence alignment and phylogenetic tree analysis</li>
  <li>Release 49, December 2009</li>
  <li>All vertebrate protein sequences from the Uniprot Knowledgebase</li>
</ul>

<a href="http://www.uniprot.org/database/DB-0164">KEGG Orthology - Linking genomes to pathways by ortholog annotation(KO)</a>
<ul>
  <li>"The KO system is a collection of manually defined ortholog groups (KO entries), which are categorized under the hierarchy of KEGG pathways and BRITE ontologies".</li>
  <li>KEGG release 74, April 2015</li>
  <li>304 eukaryotes, 3504 prokaryotes</li>
</ul>

<a href="http://www.uniprot.org/database/DB-0137">OMA - Identification of Orthologs from Complete Genome Data - Orthologous MAtrix</a>
<ul>
  <li>OMA uses an all-by-all Smith Waterman alignment to find mutually closest homologs based on evolutionary distance.  Orthologs are clustered to (1) pairwise to identify OMA ortholog cliques, or (2) hierarchically to identify HOGS (Hierarchical Ortholog Groups)  </li>
  <li>September 2014 release</li>
  <li>1706 species (eukaryote, bacteria, archaea)</li>
</ul>

<a href="http://www.uniprot.org/database/DB-0143">OrthoDB - Database of Orthologous Groups</a>
<ul>
  <li>OrthoDB clusters based on best-reciprocal-hits from an all-by-all Smith-Waterman algorithm, and then references clusters to species phylogenies.</li>
  <li>Version 8</li>
  <li>52 vertebrates, 45 arthropods, 142 fungi, 13 basal metazoans, and 1115 bacteria</li>
</ul>

<a href="http://phylomedb.org/">PhylomeDB 4 - Database for complete collections of gene phylogenies, Human Phylome (3)</a>
<ul>
  <li>"PhylomeDB provides genome-wide orthology and paralogy predictions which are based on the analysis of the phylogenetic trees. The automated pipeline used to reconstruct trees aims at providing a high-quality phylogenetic analysis of different genomes, including Maximum Likelihood tree inference, alignment trimming and evolutionary model testing."</li>
  <li>Human Phylome version 3, 2011, PhylomeDB version 4</li>
  <li>39 species proteomes referenced to human proteome</li>
</ul>
<a href="http://www.uniprot.org/database/DB-0185">TreeFam database of animal gene trees</a>
<ul>
  <li> "TreeFam is a database composed of phylogenetic trees inferred from animal genomes. It provides orthology/parology predictions as well the evolutionary history of genes."</li>
  <li>Release 9, March 2013</li>
  <li>109 Species, 15,736 gene families</li>
</ul>

## Citations
Expanded microbial genome coverage and improved protein family annotation in the COG database. Galperin, M.Y.; Makarova, K.S.; Wolf, Y.I.; Koonin, E.V.  Nucleic Acids Res. 2014, 43, D261–D269. 

eggNOG v4.0: nested orthology inference across 3686 organisms
Sean Powell, Kristoffer Forslund, Damian Szklarczyk, Kalliopi Trachana, Alexander Roth, Jaime Huerta-Cepas, Toni Gabaldón, Thomas Rattei, Chris Creevey, Michael Kuhn, Lars J. Jensen, Christian von Mering and Peer Bork
Nucleic Acids Res.
Epub 2013 Dec 1; PubMed 24297252. 

EnsemblCompara GeneTrees: Analysis of complete, duplication aware phylogenetic trees in vertebrates. Vilella AJ, Severin J, Ureta-Vidal A, Durbin R, Heng L, Birney E. Genome Research 2008 Nov 4.

The KEGG resource for deciphering the genome. Kanehisa, M., Goto, S., Kawashima, S., Okuno, Y. & Hattori, M. Nucleic Acids Res. 32, D277–D280 (2004)

Databases of homologous gene families for comparative genomics
Penel S, Arigon AM, Dufayard JF, Sertier AS, Daubin V, Duret L, Gouy M and Perrière G (2009), BMC Bioinformatics, 10 (Suppl 6):S3 

HOVERGEN: database and software for comparative analysis of homologous vertebrate genes.Duret, L., Perrière, G. and Gouy, M. (1999)  In Bioinformatics Databases and Systems, Letovsky, S. (ed.), Kluwer Academic Publishers, Boston, pp. 13-29.
    
The OMA orthology database in 2015: function predictions, better plant support, synteny view, and other improvements, Adrian M. Altenhoff, Nives Škunca, Natasha Glover, Clément-Marie Train, Anna Sueki, Ivana Piližota, Kevin Gori, Bartlomiej Tomiczek, Steven Müller, Henning Redestig, Gaston H Gonnet and Christophe Dessimoz, Nucleic Acids Research, 2015, in press

OrthoDB: a hierarchical catalog of animal, fungal and bacterial orthologs.Waterhouse RM, Zdobnov EM, Tegenfeldt F, Li J, Kriventseva EV.NAR, Nov 2012, PMID:23180791

PhylomeDB v4: zooming into the plurality of evolutionary histories of a genome. Huerta-Cepas J, Capella-Gutiérrez S, Pryszcz LP, Marcet-Houben M, Gabaldón T. Nucleic Acids Res. 2014 Jan;42(Database issue):D897-902. doi: 10.1093/nar/gkt1177.

TreeFam: 2008 Update Jue Ruan, Heng Li, et al. Nucleic Acids Research (2008)
doi: 10.1093/nar/gkm1005 

Tree pattern matching in phylogenetic trees: automatic search for orthologs or paralogs in homologous gene sequence databases. Dufayard J.F., Duret L., Penel S., Gouy M., Rechenmann F. and Perrière G. (2005) Bioinformatics, vol. 21 pp.2596-2603 


### Contact me

claire.mcwhite (at) utexas.edu
