---
layout: page
title: 
permalink: /codesnippets/
---


#### Personal reference for useful one liners/short coding tasks 

#### <font color="red">Linux Command Line</font>

##### Run a script on multiple files in a directory 
for file in *2col; do echo $file; done

##### Most recent 5 modified files
ls -1t -l | head -5

##### remove a line if it has a blank
awk '!/^\t|\t\t|\t$/' file.tab | awk '!a[$0]++' > newfile.tab

##### Delete the first line of a file 
sed -i '1d' file.txt

#### <font color="red">Bash script</font>

##### Command line arguments
FILENAME=$@

##### Current directory
LOC=$(pwd)

#### <font color="red">vim</font>

##### Split two Ensembl identifiers between a number and a letter
:%s/[0-9]E/E\t/g

ex. ENS0000001ENS0000002 -> ENS0000001 ENS0000002

#### <font color="red">Python</font>

##### Command line arguments
import sys

infile = sys.argv[1]

#### <font color="red">Pandas</font>

##### Query a dataframe
df.query("COL1==a")

##### Column bind - equivalent to R cbind()
pd.concat([a], [b], axis = 1)

Axis = 0 for row bind

##### Row count
df.sum(axis=1)<br>
axis = 0 for column sum

##### Move row index to a column
df.reset_index(inplace=True)

##### Change csv to string to manipulate values (save pandas df with integers instead of floats)
import csv<br>
import StringIO<br>
s=StringIO.StringIO()<br>
df.to_csv(s)<br>
t=string.getvalue()<br>
t = t.replace(".0", "")<br>
t = t.replace(",0", ",")<br>
filename=open(path/to/save, "w")<br>
filename.write(t)<br>


##### Get value from location in dataframe
first_value_in_COL1 = df['COL1'].iloc[0] 

##### Save a pandas dataframe 
df.to_csv(filenameA, sep="\t", index=True)

##### Make an empty dataframe
cols = ['hold']<br>
df = DataFrame(columns = cols)

##### Set two level column index
df.columns = pd.MultiIndex.from_tuples([a, b])
##### Take certain columns from a pandas dataframe

cols = ['col1', 'col2']

final = original[cols]

#### <font color="red">R</font>

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


