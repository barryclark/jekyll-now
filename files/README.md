### Background

Files and records related to a Letter to the Editor sent by me (Claire McWhite) and Daniel Boutz to the editors of Scientific Reports detailing flawed protein quantification methods used in two papers: 

1. Robin Mesnage, Sarah Z. Agapito-Tenfen, Vinicius Vilperte, George Renney, Malcolm Ward, Gilles-Eric Séralini, Rubens O. Nodari & Michael N. Antoniou. "An integrated multi-omics analysis of the NK603 Roundup-tolerant GM maize reveals metabolism disturbances caused by the transformation process". Scientific Reports. 2016
2. Robin Mesnage, George Renney, Gilles-Eric Séralini, Malcolm Ward & Michael N. Antoniou, "Multiomics reveal non-alcoholic fatty liver disease in rats following chronic exposure to an ultra-low dose of Roundup herbicide". Scientific Reports. 2017;7:39328

### Emails

#### Nov 2, 2017, 5:14 PM

Dear [editor at Scientific Reports],  

Attached is our Letter to the Editor describing our major concerns with the data analysis in srep37855 and srep39328. These papers use quantitative proteomics to identify protein expression differences in response to 1) maize genetic modification and 2) glyphosate ingestion in rats, respectively.

However, we found serious flaws in the methods applied, which render the analysis technically unsound. The methods deviate substantially from standards adopted by the field. Particularly, if any single peptide from a protein was found differently across samples, even just a single observation, the entire protein was counted as differentially expressed. We detail more methodological errors in the attached letter. 

Additionally, though requested, the authors have not provided the unprocessed mass spectrometry files required to reproduce their analysis. 

Sincerely,

Claire McWhite
and 
Daniel Boutz, Ph.D.
The University of Texas at Austin


#### Mar 20, 2018, 5:35 PM

Dear [editor at Scientific Reports]

Attached are our responses to what we would consider to be the technical claims in Dr. Antoniou’s response: 1)  That their methods are substantially similar to other TMT protein quantifications and 2) That their quantification is appropriate

Text from their response is in red.

Both of these publications actually quantify peptides, and then misleadingly claim to have quantified proteins. Quantification at the peptide-level is not statistically equivalent to quantification at the protein-level. Using single peptides to make conclusions about protein level while discarding information from other peptides from the same protein necessarily leads to false-positives, spurious conclusions, high noise, and lack of power.

They are essentially peptidomic analyses falsely presented as proteomic analyses. To our knowledge, no one has ever done this in a publication before. The authors claim to use conventional methods, but this idea is refuted by their own support citations (Ashton 2015, Höttlä 2015) and multiple other recent TMT protein quantification papers that correctly combine measurements from all peptides that map to a protein sequence to quantify proteins. 

Our position is that both of these papers are profoundly flawed and erroneous.

Any conclusions drawn from the analysis described as protein quantification in these papers are unsupported and not scientifically sound.

Any future paper that attempts to use the same quantification method will also be flawed and unreliable.


Claire McWhite

and

Daniel Boutz


### Updates

#### Wed, Feb 28, 11:33 AM 
Received response to our letter to the editor from Michael Antoniou et al. Will not be uploaded here after permission to post asked and denied by Dr. Antoniou. 

#### 8/21/2018
Raw machine files for the rat paper were made publically accessive in the PRIDE repository with accession number PXD010181

#### 10/20/2018
The raw machine files for the maize paper have been posted to PRIDE with accession number PXD011363


### Contents

#### These are our materials related to the project from before we had access to the .RAW machine files that were necessary to complete a complete reanalysis. These analyses and letters are based on a forensic data reanalysis working backwards from data originally provided with the paper.  

1. First Letter to the Editor: letter_re_mesnage.pdf

2. Our Response to Michael Antoniou's response to our initial letter: response_to_antoniou_response.pdf


#### first_analysis_maize: First analysis of the maize data (submitted with first letter to the editor prior to receiving raw data

1. Supporting Rmd analysis of protein quantification errors in Mesnage, 2016: response_mesnage2016_cdm_drb.Rmd
2. Rendered html and pdf of above markdown 
3. peptide summary for experiment 1: tmt1.csv
4. peptide summary for experiment 2: tmt2.csv
5. fold changes from the paper: sup5.csv

#### postrawdata_rat_analysis: Ongoing analysis of the rat data (begun after receipt of data data files in September 2018

1. rat_analysis.Rmd
2. Liver_Total_TMT1_PSMs.xlsx
3. Liver_Total_TMT2_PSMs.xlsx
4. fold changes from the paper: srep39328-s4.csv
5. First plots: rat_exp_fc_annot-01.png


#### Other files

1. srep37855-s6.xls - Supplementary Dataset 5 from Mesnage, 2016 - "List of proteins having their level significantly altered by the GM transformation process"
2. Srep37855_peps.xls - Provided to us by Mesnage and Antoniou. TMT peptide quantifications for Mesnage, 2016
3. srep37855.pdf - Mesnage R, Agapito-Tenfen SZ, Vilperte V, et al. An integrated multi-omics analysis of the NK603 Roundup-tolerant GM maize reveals metabolism disturbances caused by the transformation process. Scientific Reports. 2016;6:37855. doi:10.1038/srep37855
4. srep39328.pdf - Mesnage R, Renney G, Séralini G-E, Ward M, Antoniou MN. Multiomics reveal non-alcoholic fatty liver disease in rats following chronic exposure to an ultra-low dose of Roundup herbicide. Scientific Reports. 2017;7:39328. doi:10.1038/srep39328

### Conflicts of interest
Neither Claire McWhite nor Daniel Boutz have any conflict of interest regarding this letter

### Interest
Our interest is in maintaining rigor and standards in proteomics methods.





