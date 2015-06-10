---
layout: page
title: 
permalink: /codesnippets/
---


#### Personal reference for useful one liners/short coding tasks 

### <font color="red">Linux Command Line</font>

##### Run a script on multiple files in a directory 

    for file in *2col; do echo $file; done

##### Most recent 5 modified files
 
     ls -1t -l | head -5

##### remove a line if it has a blank

     awk '!/^\t|\t\t|\t$/' file.tab | awk '!a[$0]++' > newfile.tab

##### Delete the first line of a file 

     sed -i '1d' file.txt

### <font color="red">Bash script</font>

##### Command line arguments

    FILENAME=$@

##### Current directory

    LOC=$(pwd)

##### Get filename without the extension, ex. filename.txt -> filename

    F=${FILENAME%.*}


### <font color="red">vim</font>

##### Delete a block of text
in normal mode, type ma at beginning of block and d'a at end of block. 
"mark a" then "delete to a"

##### Split two Ensembl identifiers between a number and a letter

    :%s/[0-9]E/E\t/g

ex. ENS0000001ENS0000002 -> ENS0000001 ENS0000002

### <font color="red">Python</font>

##### Command line arguments

    import sys
    infile = sys.argv[1]

### <font color="red">Pandas</font>

##### Query a dataframe

    df.query("COL1==a")

##### Column bind - equivalent to R cbind()

    pd.concat([a], [b], axis = 1)

(axis = 0 for row bind)

##### Row sum

    df.sum(axis=1)

(axis = 0 for column sum)

##### Move row index to a column

    df.reset_index(inplace=True)

##### Change csv to string to manipulate values (save pandas df with integers instead of floats)
     import csv
     import StringIO
     s=StringIO.StringIO()
     df.to_csv(s)
     t=string.getvalue()
     t = t.replace(".0", "")
     t = t.replace(",0", ",")
     filename=open(path/to/save, "w")
     filename.write(t)


##### Get value from location in dataframe
 
     first_value_in_COL1 = df['COL1'].iloc[0] 

##### Save a pandas dataframe 
 
     df.to_csv(filenameA, sep="\t", index=True)

##### Make an empty dataframe
 
     cols = ['hold']
     df = DataFrame(columns = cols)

##### Set two level column index

     df.columns = pd.MultiIndex.from_tuples([a, b])
  
##### Take certain columns from a pandas dataframe
  
     cols = ['col1', 'col2']
     final = original[cols]
 
### <font color="red">BioPython</font>

##### get ORF from sequence


     def orf(s):
         length = len(s)
         i = 0
         while i<length-2:
            tri = s[i:i+3]
            if tri == "atg":
                break
            i = i + 1
        j = i
        while j<length-2:
            tri = s[j:j+3]
            if tri == "tga" or tri == "taa" or tri == "tag":
                break
            j = j + 3
        seq = Seq(s[i:j], generic_dna)
        return seq

##### Parse a FASTA file

    handle = open("filename.fasta", "rU")
    for record in SeqIO.parse(handle, "fasta"):
    

### <font color="red">R</font>

##### Command line arguments 
  
     args<-commandArgs(TRUE)
     genename=args[1]


##### Make binary black and white heatmap on table of 1's and blanks 

     df <- read.csv(gene, sep="\t", header=TRUE, row.names=1)
     m <- as.matrix(df, rownames.force=TRUE)
     class(m) <- "numeric"
     m[m==""] <- 0
     m[is.na(m)] <- 0
     nr <- nrow(m)
     heatmap.2(m, scale="none", col=c("white", "black"), cexRow=0.2/log10(nr), trace="none", colsep=c(1,2,3,4,5,6,7,8,9,10), sepcolor="grey", sepwidth=0.01, key=FALSE, xlab="DATABASES", ylab="GENES", margins=c(15,10))


<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-63890959-1', 'auto');
  ga('send', 'pageview');

</script>
