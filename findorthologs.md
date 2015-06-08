---
layout: page
title: 
permalink: /findorthologs/
---

<div class="Instructions">

##### Search for an ortholog table

**Currently testing. Transitioning to Quest for Orthologs Reference proteomes week of June 8th, 2015** Enter a human proteome Uniprot Accession, ex. P00395

</div>

<script type="text/javascript">
function changeText3(){
    var userInput = document.getElementById('userInput').value;
    var lnk = document.getElementById('lnk');
    lnk.href = "https://sheet.zoho.com/view.do?url=https://raw.githubusercontent.com/clairemcwhite/QfOreferencetables/master/" + userInput +".csv";
    lnk.innerHTML = lnk.href;
    window.open("https://github.com/clairemcwhite/QfOreferencetables/blob/master/" + userInput +".csv");
}
</script>
Link to Excel view of most recent search:<a href="" id="lnk"></a>  

* * *

<div class="More">

##### About

The Ortholog Database Connector displays multispecies orthologs to a reference human gene according to ten diverse ortholog sorting algorithms.

Tables indexed by UniProt Accession are currently available for the [20,188 human protein coding genes](https://raw.githubusercontent.com/clairemcwhite/clairemcwhite.github.io/master/humanProteomeDetails.tsv) from the 2015 release of the UNIPROT reviewed human proteome ("UP000005640").

Tables are created by searching for a gene within ortholog databases, and listing genes named as orthologs to it according to each database. Table rows contain putative orthologs, labeled by Uniprot Accession, Uniprot Gene Name, and number of databases where that gene was called as an ortholog to the query gene. Table column headers contain the database name and the ortholog group ID from that database. A gene which is called as an ortholog by a database will have a "1" in that database's column.

</div>

<div class="currentdatabases">Ortholog groups are pulled from the [Quest for Orthologs reference proteome benchmarking](http://orthology.benchmarkservice.org/cgi-bin/gateway.pl?f=ShowProject):

*   Hieranoid 2.0 (KO) release 74
*   [EnsemblCompara v2](http://www.ensembl.org/index.html)
*   [InParanoid](http://inparanoid.sbc.su.se/cgi-bin/index.cgi)
*   [InParanoidCore](http://inparanoid.sbc.su.se/cgi-bin/index.cgi)
*   [metaPhOrs](http://orthology.phylomedb.org/)
*   [OMA GETHOGs](http://omabrowser.org/oma/home/)
*   [OMA Groups (RefSet5)](http://omabrowser.org/oma/home/)OMA
*   [OMA OMA Pairs (Refset5)](http://omabrowser.org/oma/home/)
*   [orthoinspector 1.30](http://www.lbgi.fr/orthoinspector/)
*   [PANTHER 8.0 (all)](http://pantherdb.org/)
*   [PANTHER 8.0 (LDO only)](http://pantherdb.org/)
*   [phylomeDB](http://phylomedb.org/)
*   RBH
*   RSD 0.8 1e-5 Deluca (Roundup)

The current proteome set covers [66 species](http://www.ebi.ac.uk/reference_proteomes), including eukaryotes, archaea and bacteria.</div>

* * *

<div class="More">

##### Table viewing instructions

Github initially renders a ".csv" file as an interactive table. To save a table, click the "Raw" icon, and then save the page. The [entire collection of tables](https://github.com/clairemcwhite/QfOreferencetables) can be downloaded as a zip file. The Ortholog Database Connector gives a comprehensive view of multiorganism orthologs of a given human gene, as produced by diverse ortholog sorting algorithms. For example, the table for the human gene P00395 has columns containing the membership of the ortholog group P00395 belongs to according to each database.

##### Rationale

Orthologous genes are genes which arise from speciation, for example, Human Talin, and Mouse Talin. Identification and accuracy of genes classed as orthologs is key for comparative genomic approaches, however there is no consensus model. Approximately 30 independent algorithms exist to classify orthologous genes; some based on species and gene phylogeny and some using exclusively sequence comparison. Phylogeny based approaches have the advantage of tracking genes through realistic evolutionary paths, however tend to be computationally intensive, and subject to error from misconstructed gene trees. BLAST approaches are much faster, generally using an all-by-all blast of multispecies proteomes in order to generate best matches, however lack the added power of phylogenetic information. There is often no clear answer for which database to use to generate lists of orthologs for a comparative project. Confounding this problem is the lack of a method to easily compare results from different databases. Additionally, precomputed data available from the databases use various gene naming methods, or different releases of the same naming type with non-overlapping gene names. The Orthology Database Connector attempts to inform research using orthologs by standardizing and aligning ortholog groups from ten separate ortholog grouping algorithms. Additionally, the number of databases which call a gene as an ortholog may be used as a proxy for confidence of that gene's assignment of orthology to the reference gene. The ability to visualize and compare ortholog groupings from multiple sources will aid comparative study of proteins and genes.</div>

<div class="posts">{% for post in paginator.posts %}

<article class="post">

# [{{ post.title }}]({{ site.baseurl }}{{ post.url }})

<time datetime="{{ post.date | date_to_xmlschema }}" class="post-date">{{ post.date | date_to_string }}</time> {{ post.content }}</article>

{% endfor %}</div>
