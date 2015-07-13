---
layout: page
title: 
permalink: /codesnippets/
---


#### Personal reference for useful one liners/short coding tasks 

### <font color="red">Linux Command Line</font>

##### Run a script on multiple files in a directory 

    for file in *2col; do echo $file; done

##### Convert variable space separated table to tab separated table

        unexpand -a file.txt > newfile.tab
##### Size of a directory in human readable format (ex. Kb, Mb) - disk usage -sum human

        du -sh
##### Count occurences of a string within one line
    
    gsub counts the number of substitutions made, as a proxy for number of matches. source: http://stackoverflow.com/a/21765379

        awk '{print gsub(/string/,"")}' file


##### Place something between two sequential tabs, Ex. NA. (<a href="http://unix.stackexchange.com/questions/53448/replacing-missing-value-blank-space-with-zero">Source</a>)

    
        awk 'BEGIN { FS = OFS = "\t" } { for(i=1; i<=NF; i++) if($i ~ /^ *$/) $i = "NA" }; 1' file.tab > newfile.tab

##### Or statement in grep
        grep "cilia\|axone" genome.txt > ciliagenes.txt

##### Most recent 5 modified files
 
     ls -1t -l | head -5

##### remove a line if it has a blank

     awk '!/^\t|\t\t|\t$/' file.tab | awk '!a[$0]++' > newfile.tab

##### Delete the first line of a file 

     sed -i '1d' file.txt

### <font color="red">Bash script</font>

##### Loop through files in  a directory

        for f in out_*.txt
        do
               echo $f
        done
##### Append to a file
        python test.py >> holder.txt

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
##### Visual mode things
esc v gets into visual mode
y copies
d cuts
p pastes

##### Navigating things
in command mode:
$ goes to end of the line
shift-g to bottom of document
gg to top of document
e moves cursor forward faster
ctrl-f forward a page
ctrl-g back a page

##### replacing
Add /g to the end of the :s/a/b statement to replace multiple occurances of pattern in line
Without /g, it will only replace the first occurance

##### replace within a range of lines

    :1,10s/a/b
##### Split two Ensembl identifiers between a number and a letter

    :%s/[0-9]E/E\t

ex. ENS0000001ENS0000002 -> ENS0000001 ENS0000002

### <font color="red">Python</font>

##### Command line arguments

    import sys
    infile = sys.argv[1]

##### Skip first argv

        args = sys.argv[1:]
            
##### Check that there are the right number of command line arguments
        if len(sys.argv) != 2:
            print "Please provide infile as a command-line argument"


##### Check if one string contains another string

        if string1 in string 2:
            ...

##### Get unique members of a list
        uniqlist = list(set(nonUniqList)

##### Make a modified filename out of another filename
        g1 = open("20112015%s" % infile, "w")

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

##### Better R color palette (colorblind sensitive)

        cbPalette <- c("#999999", "#E69F00", "#56B4E9", "#009E73", "#F0E442", "#0072B2", "#D55E00", "#CC79A7")
        # grey, orange, blue, forest green, banana yellow, navy blue, red, purplypink
        #http://www.cookbook-r.com/Graphs/Colors_(ggplot2)/

##### Get r.squared from a linear regression
        a <- summary(lm(a ~ b), data =d)
        a$r.squared
##### Make r variables on the fly, and assign them values

        ct <- 1
        assign(paste("value.", ct, sep=""), 5)
        ct <- ct + 1
        assign(paste("value.", ct, sep=""), 10)
        
        #value.1 = 5
        #value.2 = 10

##### Make a bar chart with colored groups
        r.vals <- c(value.1a, value.2a, value.1b, value.2b)  #values
        r.names<-c(r.1, r.2, r.3, r.4)  #names
        groups <- c("group1", "group2", "group1", "group2" #categories
        df <- data.frame(r.square = vals, names = factor(r.names, levels=r.names), groups)
        cbbPalette <- c("#000000", "#E69F00") #black and orange
        scale_fill_manual(values=cbbPalette)
        a<-ggplot(aes(x = names, y = r.square), data = df) +
            geom_bar(stat = 'identity', aes(fill=rows)) +
            ylab(expression(paste("Variance Explained (R"^"2", ')', sep=''))) +
            xlab("Predictor Variables") + scale_fill_manual(values=cbbPalette) +
            theme(axis.text.x = element_text(angle = 45, hjust = 1, vjust = 1)) +
            scale_y_continuous(limits = c(0, 0.3))

##### Make binary black and white heatmap on table of 1's and blanks 

     df <- read.csv(gene, sep="\t", header=TRUE, row.names=1)
     m <- as.matrix(df, rownames.force=TRUE)
     class(m) <- "numeric"
     m[m==""] <- 0
     m[is.na(m)] <- 0
     nr <- nrow(m)
     heatmap.2(m, scale="none", col=c("white", "black"), cexRow=0.2/log10(nr), trace="none", colsep=c(1,2,3,4,5,6,7,8,9,10), sepcolor="grey", sepwidth=0.01, key=FALSE, xlab="DATABASES", ylab="GENES", margins=c(15,10))

##### Heatmap with overlayed values
    
        library("lattice")
        myPanel <- function(x, y, z, ...) {
        panel.levelplot(x,y,z,...)
        panel.text(x, y, round(z,2))
        }
        colors <- colorRampPalette(c('red', 'seashell'))(256)

        # fullcorr is a numeric 15x15 matrix
        hmap <- print(levelplot(fullcorr[,15:1],  xlab="", ylab="",panel = myPanel, col.regions=colors ,scales=list(tck=0, x=list(rot=45,alternating=2))))
##### Make a multipanel figure with cowplot

        library("cowplot)
        ab <- qplot(a, b)
        bc <- qplot(b, c)
        cd <- qplot(c, d)
        de <- qplot(d, e)
        allplotted <- plot_grid(ab, bc, cd,de, labels = c("A", "B", "C", "D"), ncol = 2)

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-63890959-1', 'auto');
  ga('send', 'pageview');

</script>


