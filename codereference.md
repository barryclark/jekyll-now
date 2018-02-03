---
layout: page
title: 
permalink: /codereference/
---


#### Personal reference for useful one liners/short coding tasks/anything I've ever had to google more than once.  

Things that are now obvious kept for posterity's sake

### <font color="red">Linux Command Line</font>

##### Blast a FASTA against another FASTA

     makeblastdb -in uniprot-proteome%3AUP000000763.fasta -dbtype prot -out uniprot-proteome%3AUP000000763.fasta.db
     blastp -num_threads 2 -evalue 1e-6 -use_sw_tback -outfmt 6 -query msu.rice.pep -db uniprot-proteome%3AUP000000763.fasta.db > result


##### Run a script on multiple files in a directory 

    for file in *2col; do echo $file; done
    
##### Copy terminal output to clipboard
http://jetpackweb.com/blog/2009/09/23/pbcopy-in-ubuntu-command-line-clipboard/

     alias pbcopy='xclip -selection clipboard'
     alias pbpaste='xclip -selection clipboard -o'
     whatever | pbcopy
     
 

http://jetpackweb.com/blog/2009/09/23/pbcopy-in-ubuntu-command-line-clipboard/

##### Add a .gitkeep statement recursively so that empty directories are kept in git structure 

(http://stackoverflow.com/questions/14541253/commit-empty-folder-structure-with-git)

    find . -type d -empty -not -path "./.git/*" -exec touch {}/.gitkeep \; 
 
##### Convert pdf to png using imagemagick
      for f in *pdf
      do 
          convert -density 150 -antialias "$f" -append -resize 1024x -quality 100 "${f%.pdf}.png"
      done
 
##### Convert variable space separated table to tab separated table

        unexpand -a file.txt > newfile.tab
##### Size of a directory in human readable format (ex. Kb, Mb) - disk usage -sum human

        du -sh
##### Count occurences of a string within one line
gsub counts the number of substitutions made, as a proxy for number of matches. source: http://stackoverflow.com/a/21765379

        awk '{print gsub(/string/,"")}' file

##### find files matching a pattern ("*PROTEOME) in subdirectories and move them up a level

        find . -type f -name \*PROTEOME
        find . -type f -name \*PROTEOME -exec mv {} . \;

##### Running parallel

        ls *PROTEOME | ~/bin/parallel -j 3 bash sort.sh {}
        # *PROTEOME is the argument to sort.sh
        #3 is the number of processes

##### See what processes are running in a directory

        lsof +D /path/to/directory/

##### Kill all processes from a user

        killall --user nameofuser

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
     
##### Create a backup while doing inplace sed
     sed -i.bak '1d' file.txt

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

#### Remove empty fastq entries 

:%s/@.*\n\n+\n\n//

Matches and removes the pattern:
@Illumina_header

[blankline]

+

[blankline]



##### Indent block of text 4 spaces

Esc Vj:le 4

In Visual mode, each additional j selects another line


##### Delete a block of text
in normal mode, type ma at beginning of block and d'a at end of block. 
"mark a" then "delete to a"

##### Show lines in vim
    set nu
##### Show hidden characters   
     set list


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
Add /g to the end of the :s/a/b statement to replace multiple occurences of pattern in line
Without /g, it will only replace the first occurance

Replace only the last occurence of a string in a line
%s/.*\zsmcl/mclLECA/ is a greedy replacement that replaces only the last occurence of a string
source: http://vi.stackexchange.com/questions/2103/how-to-change-last-occurrence-of-the-string-in-the-line

##### replace within a range of lines

    :1,10s/a/b
##### Split two Ensembl identifiers between a number and a letter

    :%s/[0-9]E/E\t

ex. ENS0000001ENS0000002 -> ENS0000001 ENS0000002

### <font color="red">Python</font>

##### Read in a file as a single string

        r = open(filename, "r")
        rejectstring = r.read().replace("\n","")


##### When python setup.py register doesn't work...do sudo python.py register 

     claire2@cLAIRE-pc:~/test$ python setup.py register 
     running register 
     running egg_info 
     deleting test.egg-info/requires.txt
     error: [Errno 13] Permission denied: 'test.egg-info/requires.txt'
     claire2@cLAIRE-pc:~/test$ sudo python setup.py register   
     now it works
##### Get current working directory

        import os
        currentwd = os.getcwd()
        
##### Install pandas on TACC

     git clone the github repository
     python setup.py build_ext --inplace --force --user
     
##### Make a python package
 
     Use skeleton of flupan

##### Import python3 print functions
    from __future__ import print_function

##### Apply pairwise comparison function to all possible pair combinations of rows in a matrix
     # normally np.correlate([1, 2, 3], [0, 1, 0.5]) = array [3.5]
     dist.squareform( dist.pdist(df, lambda x,y: np.correlate(x,y)) )


##### argparse Command line args
    import argparse
    
    parser = argparse.ArgumentParser(description='Whatever')

    parser.add_argument('identified_elution', action="store", type=str)
    parser.add_argument("--prots", action="store", dest="proteins", nargs='+', required=False)
    parser.add_argument('--bla', action="store", type=str)
    inputs = parser.parse_args()
    print(inputs.proteins)


##### sys.argv Command line arguments. Not using these anymore in favor of argparse

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
##### [Many useful pandas things](https://gist.github.com/why-not/4582705)

##### Query a dataframe

    df.query("COL1==a")
##### Dataframe to list of lists

        ListA = dfA.values.tolist()

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
 
### <font color="red">Git</font>

##### Insufficient permissions error

        cd <path to repo>
        cd .git/objects
        sudo chown -R username:username *

##### Three main commands
        git add [file]
        git commit -a 
        git push

##### Clone a repository
        git clone <address from github>
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

##### Get to R studio server

    In browser, go to http://<yourserverIP>:8787

##### Better R color palette 

        cbPalette <- c("#999999", "#E69F00", "#56B4E9", "#009E73", "#F0E442", "#0072B2", "#D55E00", "#CC79A7")
        # grey, orange, blue, forest green, banana yellow, navy blue, red, purplypink
        #http://www.cookbook-r.com/Graphs/Colors_(ggplot2)/
        
##### My R color palette
     palette <- c("#FF0000","#0072B2","#E69F00","#009E24", "#979797","#5530AA", "#111111")
     #Red, Blue, Orange,Green, Grey, Purple,Black

##### Sort a vector by another vector function
    sort_func <- function(x){ 
            y <- c("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "T", "U", "V", "W", "X", "Y", "Z", "R", "S") 
      z <- unlist(strsplit(x, ""))
      return(paste(z[order(match(z, y))], collapse=""))
    }

     #sort_func("ZRACB") outputs "ABCZR"
    
     #Apply to a column
     df %>% 
           rowwise %>% 
           mutate(sortedCode = sort_func(Code))
    

##### Get r.squared from a linear regression
        a <- summary(lm(a ~ b), data =d)
        a$r.squared
##### Make r variables on the fly, and assign them values (very rare to do)

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

### <font color="red">MySQL</font>

##### Reminders
Functions
http://dev.mysql.com/doc/refman/5.7/en/functions.html

Indexed from 1
SELECT
IFNULL("colname", "None")
NOW()


##### Selecting data

        SELECT * FROM <tablename>
select all columns from a table
        WHERE <columname> = "Texas" AND <columnname2> > 5 AND <columname3> in ("USA", "MEX")
conditions
        ORDER BY <columname> desc;
order the rows descending
    
##### String functions (from https://wikis.utexas.edu/display/CcbbShortMySql/SQL+Functions+and+Data+Types)
concat
        select concat('a', '_', 'b');
replace
        select replace('a_b_c', '_', '.');
trim
        select trim(' 123 ');
##### Numeric functions (from https://wikis.utexas.edu/display/CcbbShortMySql/SQL+Functions+and+Data+Types))
round
        select round(78421/100, 2);
% (modulus) (If/Else conditional)
        select if( 587 % 2 = 0, 'even', 'odd');
##### Date functions  (from https://wikis.utexas.edu/display/CcbbShortMySql/SQL+Functions+and+Data+Types))
now
        select now();
year, monthname
       select year(now()) as year, monthname(now()) as month;
##### Get data from UCSC genome browser
First, connect to remote https://wikis.utexas.edu/display/CcbbShortMySql/Connect+to+a+remote+DB
      select name, chrom, strand,
           cast(exonStarts as char(100)) as exon_starts_data,
           convert(exonEnds, char(100)) as exon_ends_data
        from sacCer3.sgdGene limit 200;
##### Make a view of the data
        create or replace view my_saved_view as
       select round(avg(GNP * 1000000 / Population), 0) as "Per capita GNP ($)",
       round(std(GNP * 1000000 / Population), 0) as "Std deviation ($)"
        from country;
