---
layout: default
title: 
permalink: /orthoblender/
---

<H1>OrthoBlender</H1>
<HR>
<div class="Instructions">

<H5>Search for multispecies orthologs</H5>
 <h3>Work in progress</h3>
<p>
Tables are organized by reference to individual protein coding genes. Note: Orthologs are defined at the phylogenetic level of Last Universal Common Ancestor</p>
<p>
<b></b>Enter a <a href="https://raw.githubusercontent.com/clairemcwhite/clairemcwhite.github.io/master/humanProteomeDetails.tsv"> Uniprot Accession </a> to pull a table of orthologs to that protein.<br> ex. P00395</b>
</p>
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

<input type='text' id='userInput' value='' />
<input type='button' onclick='changeText3()' value='Go'/>
<p>
Link to Excel view of most recent search: <a href="" id=lnk></a><br>
</p>
<br>

<HR>

<div class="More"> 
<h5>About</h5>
 
 <h3>Work in progress</h3>
    <p>OrthoBlender displays multispecies orthologs to a reference human protein coding gene according to diverse ortholog sorting algorithms.</p>
    </p>
    <img src="https://cloud.githubusercontent.com/assets/11052278/8072170/17ff4800-0ed8-11e5-806b-0ec7fec2a7e7.png" alt="simplified example table"><br
    <sub><i>Simplified example table of ortholog calls from three algorithms.<br> Rows: Proteins called as orthologous to the reference human protein, here P04637/P53_HUMAN. <br>Columns:"ACC" = UniProt Accession, "ENTRY_NAME" = UniProt Entry Name, "ROW_COUNT" = The count of databases which call that row's protein as an ortholog to the reference protein  </i> </sub> <br><br>
    
     <p>
    Tables indexed by UniProt Accession are currently available for the <a href="https://raw.githubusercontent.com/clairemcwhite/clairemcwhite.github.io/master/humanProteomeDetails.tsv">20,188 human protein coding genes</a> from the 2015 release of the UniProt reviewed human proteome ("UP000005640").  

    <p>
    
    Tables are created by searching for a gene within ortholog lists, and listing genes named as orthologs to it according to each database.  Table rows contain putative orthologs, labeled by Uniprot Accession, Uniprot Entry Name, and number of databases where that gene was called as an ortholog to the query. A protein which is called as an ortholog by a database will have a "1" in that database's column.   
    </p>    
   
</div> 

<div class="currentdatabases">

Ortholog groups are pulled from the <a href="http://orthology.benchmarkservice.org/cgi-bin/gateway.pl?f=ShowProject">Quest for Orthologs reference proteome benchmarking</a>.  The following algorithms ortholog calling algorithms were run on identical proteome sets covering <a href="http://www.ebi.ac.uk/reference_proteomes">66 species</a>, including eukaryotes, archaea and bacteria.
<ul>
  
  <li>Hieranoid 2.0 (KO) release 74</li>
  <li><a href="http://www.ensembl.org/index.html">EnsemblCompara v2</a></li>
  <li><a href="http://inparanoid.sbc.su.se/cgi-bin/index.cgi">InParanoid</a></li>
  <li><a href="http://inparanoid.sbc.su.se/cgi-bin/index.cgi">InParanoidCore</a></li>
  <li><a href="http://orthology.phylomedb.org/">metaPhOrs</a> missing genomes: {PYRKO,STRCO,THEMA}</li>
  <li><a href="http://omabrowser.org/oma/home/">OMA GETHOGs</a></li>
  <li><a href="http://omabrowser.org/oma/home/">OMA Groups (RefSet5)</a> </li>
  <li><a href="http://omabrowser.org/oma/home/">OMA OMA Pairs (Refset5)</a></li>
  <li><a href="http://www.lbgi.fr/orthoinspector/">orthoinspector 1.30</a></li>
  <li><a href="http://pantherdb.org/">PANTHER 8.0 (all)</a></li>
  <li><a href="http://pantherdb.org/">PANTHER 8.0 (LDO only)</a></li>
  <li><a href="http://phylomedb.org/">phylomeDB</a></li>
  <li>RBH - 26 genomes missing</li>
  <li>RSD 0.8 1e-5 Deluca (Roundup)</li>
</ul>
    
</div>
<HR>
<div class="More">

<p>


<h5>Table viewing instructions</h5>
Github initially renders a ".csv" file as an interactive table.  To save a table, click the "Raw" icon, and then save the page.  The <a href="https://github.com/clairemcwhite/OrthologLinking">entire collection of tables</a> can be downloaded as a zip file. <br>
OrthoBlender gives a comprehensive view of multiorganism orthologs of a given human gene, as produced by diverse ortholog sorting algorithms. For example, the table for the human gene P00395 has columns containing the orthologs to P00395 to according to each database.
<HR>
    <h5>Rationale</h5>

Orthologous genes are genes which arise from speciation, for example, Human Talin, and Mouse Talin. Identification and accuracy of genes classed as orthologs is key for comparative genomic approaches, however there is no consensus model. Approximately 30 independent algorithms exist to classify orthologous genes; some based on species and gene phylogeny and some using exclusively sequence comparison. Phylogeny based approaches have the advantage of tracking genes through realistic evolutionary paths, however tend to be computationally intensive, and subject to error from misconstructed gene trees. BLAST approaches are much faster, generally using an all-by-all blast of multispecies proteomes in order to generate best matches, however lack the added power of phylogenetic information.  <br><br>

There is often no clear answer for which database to use to generate lists of orthologs for a comparative project. Confounding this problem is the lack of a method to easily compare ortholog calls from different databases. OrthoBlender attempts to inform research using orthologs by standardizing and aligning ortholog groups from separate ortholog grouping algorithms. Additionally, the number of databases which call a gene as an ortholog may be used as a proxy for confidence of that gene's assignment of orthology to the reference gene. The ability to visualize and compare ortholog groupings from multiple sources will aid comparative study of proteins and genes.    

    </p>
</div>     
    


<div class="posts">
  {% for post in paginator.posts %}
  <article class="post">
    <h1 class="post-title">
      <a href="{{ site.baseurl }}{{ post.url }}">
        {{ post.title }}
      </a>
    </h1>

    <time datetime="{{ post.date | date_to_xmlschema }}" class="post-date">{{ post.date | date_to_string }}</time>

    {{ post.content }}
  </article>
  {% endfor %}
</div>
<HR>
<div class="source">

    <p>
Page template : <a href="https://github.com/barryclark/jekyll-now">Jekyll-now</a> 
    </p>
</div>     
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-63890959-1', 'auto');
  ga('send', 'pageview');

</script>
    
