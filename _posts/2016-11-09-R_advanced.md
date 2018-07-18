---
title:  "Useful R tools"
date:   2017-3-21
layout: single
author_profile: true
comments: true
tags: [R]
---

A great advantage of R over other statistical software (such as SAS, STATA) is that it is open source, and allows millions of programmers to contribute to the community.

Tons of R packages are being created everyday. Mastering a couple of useful packages can help a great deal in daily statistical analysis. This article is indended to introduce you to a few widely-used R packages in topics such as data cleanning, data presentation, and advanced plotting.

### Other resource:
- [R for data science](http://r4ds.had.co.nz/introduction.html) by Garrett Grolemund and Hadley Wickham   
- [Advanced R](http://adv-r.had.co.nz/) by Hadley Wickham
- List of useful _R_ packages: [R packages](https://support.rstudio.com/hc/en-us/articles/201057987-Quick-list-of-useful-R-packages)

### Quick links to contents:
- [**R regular expressions**](#regex)
- [**How to read in large datasets in R**](#large_data)
- [**Use package _dyplr_ for data handling**](#dyplr)
- [**Data cleaning: _tidyr_**](#tidyr)
- [**Use _ggplot2_  for data presentation**](#ggplot2)
- [**For Bayesians: _coda_**](#coda)
- [**Use package _igraph_**](#igraph)
- [**Others**](#others)

## <a name="regex"></a> R regular expressions
[Regular expression in R](http://stat545.com/block022_regular-expression.html)


## <a name="large_data"></a> How to read large datasets in R  

Say you have one file as big as 10+ GB, but only a subset of the data would be useful. Reading the file as a whole basically copies the file in R,  takes a lot of space and requires large memory.   

#### solution 1: line by line

One way to solve is by importing dataset line by line. Check if this row is needed; if yes, save it; else go to next line.

Here's how to import in a line-by-line fashion:

```r
# open connection with  target file
con  <- file(inputfile, open = "r")

# while loop: if a new line exists, continue scanning
while (length(oneLine <- scan(con, nlines = 1,what='character',
sep='\t',quiet = T)) > 0)
{
  if( oneLine should be selected ){
    save oneLine
    ct=ct+1
  }

  # keep track of how many rows you've scanned
  if(ct_row %% 100000 ==0 ){
    cat('at row',ct_row,'\n')
  }

  ct_row=ct_row+1
}

# finally close connection with target file
close(con)

```

The `file()` function enables users to build a connection to the specified file. When a connection is opened, one can incrementally read or write  a piece of data from or to the specified file, using functions such as `readLines, writeLines` etc.

#### solution 2: `data.table` package

A `data.table` is like a `data.frame`, but with much simpler manipulation operations. The package also enables faster data importation into `data.table` format:   
`my_table = fread("file_name.txt")`

**`data.table` subsetting**   
Subsetting a data.table follows similar syntax as subsetting a data.frame: `DT[i,j,g]`, where `i` for rows, `j` for columns and `g` for grouping. 

- `i`, row selection examples:   
	`DT[1:3]`   
	`DT[1:3,]`   or   
	`DT[logical_vector,]` such as:  `DT[var1=="certain_value",]` 

- `j`, column selection or column calculation:   
	`DT[,1:3]` : select column 1 to 3     
	`DT[,.(new_var =  var1 + var2)]` : only return the new column `new_var`   
	`DT[,.(var1,var2)]` : column selection
	`DT[,.(mean=sum(var1),max=max(var2))]`: column calculations   
	`DT[selection, .N]`: `.N` is a special sentence to return number of observations

- `g`: calculation by group:   
	`DT[,.(mean_arr_delay = mean(arr_delay),.(carrier, origin)]` # mean arr_delay by carrier and origin
	   
	`DT[, .(mean_arr_delay = mean(arr_delay), .(distance > 1000)]` # mean arrival delay in flights with `distance > 1000` and `distance <= 1000`
	- `with = `:   
		some times we want to refer to columns by string variables , but data.table wouldn't recognize that. To be able to do this, we need to restore the data.frame functionality by setting `with=F`: 
		
	```r
	x="arr_delay"  # column name in string
	DT[,x, with=F]  # considered as data.frame if with=F
	```


**`data.table` functions**   

- `set(DT,i,j,value)`:    
 used to change value of elements in a data.table. Eg:

	```r
	r = c(1:3)
	c = c(1:3)
	set(DT,r,c,value = 1) # set top left 3*3 to 1
	```



More introductions: [data.table cheat sheet](https://s3.amazonaws.com/assets.datacamp.com/img/blog/data+table+cheat+sheet.pdf), and [data.table introduction](https://cran.r-project.org/web/packages/data.table/vignettes/datatable-intro.html).

## <a name="dyplr"></a> Use package _dyplr_ for data handling

- `filter(data, logical _vector1, logical _vector2)`:   

	get the data subset, where  `logical _vector` is true.

- `arrange(data, var1, var2, var3)`:    
  - sort rows of data first by `var1`, then `var2`, and `var3` in increasing order   
  - to use decreasing order, replace variable by   `desc(variable)`
  - missing values are always arranged to the end

- `select( data, var1, var2, var3)`:   
	- like  filter, but it selects columns.    
	- can use other column specifications:
 	 -  `var1:var2` (all columns from `var1` to `var2`)
	 -  `start _with('***')` (columns whose names start with `***`)
	 -  `ends _with('***')`
	 -  `contains('***')`
	 -  $\ldots$

-   `mutate(data, new_var= value_vec)`    

	add a new column `new_var` and assign it with value `value_vec`  
	use  `transmute()` when only want to keep new variables. Eg:

	```r
	>head(mutate(iris,neg_sepal=-Sepal.Width),2) # doesn't change the original data frame
	 Sepal.Length Sepal.Width Petal.Length Petal.Width Species neg_sepal
   1	     5.1         3.5          1.4         0.2  setosa      -3.5
   2  	     4.9         3.0          1.4         0.2  setosa      -3.0
	> head(transmute(iris,neg_sepal=-Sepal.Width),2) # only give new variable
	  neg_sepal
1      -3.5
2      -3.0
	```

<br><br>

-  `summarise(data, var_name= < calculation of variables in data> )`
	- output the given calculation under the name `var _name`
	- it's more useful when  `summarise()` is combined with  `group_by()`:

```r	  
# group rows
grouped = group_by(data, group_var)
# summarize by each group
summarise (grouped, var_name= < calculation of variables in data>)  
#
# example:
> temp=group_by(iris,Species)
> summarise(temp,out=mean(Sepal.Length/Sepal.Width))
Source: local data frame [3 x 2]
	  Species      out
   	   <fctr>    <dbl>
1     setosa 1.470188
2 versicolor 2.160402
3  virginica 2.230453
```

The first command group data rows by `group_var`, then the second command will return summary statistics with regarding each group. (can use function  `n()` to calculate number of samples in each group)

- The use of pipe  `%>%` :  ` x %>% f(y)  = f(x,y)`

	simply leave the position of `x` unspecified in `f(y)`.

- work with package  `tibble` :advanced version of data frame.

	- Some useful functions:  
	 `as _data _frame(), data _frame()`



## <a name="tidyr"></a> Data cleaning: _tidyr_
-  `spread(data, key= var1, value= var2)`:
	- `var1` is categorical, and `var2` is `var1`'s corresponding value
	- this function then spreads `var1` into multiple columns
	convert a dataset from long to wide

- `gather(data, key, values, columns)`
	- `columns` are gathered,  `key` are  column names, and `values` are corresponding column values
	- convert from wide to long

-  `separate(data, var, into=c(...), sep)`
	- separate a column of data into columns, by using separator `sep`
	- `var` is the variable to be separated, `into` gives column names after separation, and `sep` stands for the separator (e.g. `sep=2` means separating from the second character)

- `unite(data, new_var, cols, sep )`
	- does the opposite of `separate()`
	- `new_var` is the new variable's name after union, `cols` are for specification of columns to be united, and `sep` is the separator to be used


## <a name="ggplot2"></a> Use _ggplot2_ for data presentation
### General syntax of **ggplot2**:

```r
pic = ggplot(data = <DATA>) + 
	   <GEOM_FUNCTION>(mapping = aes(<MAPPINGS>), 
	   stat = <STAT>, position = <POSITION> ) +  
  <COORDINATE_FUNCTION> +  <FACET_FUNCTION> 
plot(pic)
```

### resources:
 - chapter from _R for data science_: [R_data_science](http://r4ds.had.co.nz/data-visualisation.html)
 - Introduction from plotly: [plotly_ggplot2](https://plot.ly/ggplot2/)

### all kinds of plot:
- Plot heatmap:    
[gglot2-- heatmap guide](http://www.sthda.com/english/wiki/ggplot2-quick-correlation-matrix-heatmap-r-software-and-data-visualization) 

- Plot lines:    
`ggplot( data, aes(x_axis, y_axis, group= grouping_variable) ) + geom_line()` 

- Plot boxplots: 	
`ggplot(data) + geom_boxplot( aes( ... )) + etc.`
	

- Plot bars: (count data, or histogram)	    
`ggplot(data) + geom_bar( aes(x=x_variable), fill=x_var )` 	
will plot counts for `x_variable` in the data; `fill=.` determines the color of each bar; set parameter position to be `stack, dodge` or `identity` for different bar presentation.

- Plot points: 	
  `ggplot(data) + geom_point(mapping = aes(x= x_var,y=y_var, color = group_var, size= size_indicator))` 	
Plot `y` against `x`, and points are grouped by `group_var`, and point size determined by `size_indicator`. Other useful parameters are: `shape, alpha( for transparency)`  

- Plot ribbons or areas:	
  `ggplot(data) + geom_area(aes(x,y,fill, group),position='stack')`

- Add legends:	

### Frequently used commands:   

```r
+ xlab('xlab name') # add x/y axis names

+ ggtitle('title name')} # add title to ggplot

+ ylim(low_bound, up_bound) # set limits to axis limits to figure. Same thing for + xlim()

+ geom_smooth() 
 	# can be used in geom_point() mode to plot a smoothed line; 
 	# often used with subset() function embedded 
 	
+ geom_hline(yintercept = value, size = , color = )
+ geom_vline(xintercept = value, size = , color = )
	# add horizontal, vertical lines

+ coord_polar() 
	# use polar coordinate instead of the default cartesian coordinate.

+ coord_flip() # transpose x and y

+ geom_histogram()

+ geom_density()  # plot fitted density curve (using kernel density estimation)

+ geom_freqpoly() # plot fitted frequency curve

+ geom_violin(aes(...) ) # violin plot

+ facet_wrap(~ var_name) 
	# plot one figure for each level of variable var_name}.

+ facet_grid(var1 ~ var2) 
 	# similar to facet_wrap, treat var1*var2 as the level indicator

+ coord_trans(x='...',y='...') 
	# replace ... with 'sqrt', 'log10' etc to perform data transformation

+ coord_cartesian(xlim= , ylim= , expand= )
  # set coordinate limits

+ annotate("text",x,y,label="lable") 
	# add text at coordinate (x,y)

+ theme(axis.text.x = element_text(angle = 90),hjust=1)
	# rotate x axis text
```

### FAQ:

- [Rotate x-axis texts](http://stackoverflow.com/questions/1330989/rotating-and-spacing-axis-labels-in-ggplot2)



## <a name="coda"></a> For Bayesians: _coda_

-   `mcmc(data, ... )`:
	- create `mcmc` object
	- `data`  is a vector of samples for one parameter, or matrix of samples for multiple parameter (each columns for one parameter )

-  `plot(mcmc_obj)`  can get traces and density estimates

-  use `autocorr.diag(), autocorr.plot()` to check out auto-correlation between samples.

-  `rejectionRate( mcmc_obj )` 	
	Calculate rejection probability for each parameter in the mcmc object.
	
-  `geweke.diag(mcmc_obj)` and `geweke.plot(mcmc_obj)`:
	- visualization of mixing performance
	- difference of mean test between the first 0.1 and the last 0.5 proportion. Lots of points outside the Z-score [-2,2] region indicates bad mixing





## <a name="igraph"></a> Use package _igraph_



#### plot trees and networks
-  plot directed network:

```r
parents=c(1,1,2,2,3,4) # specify parent of each node
ids=c(2,3,3,4,5,5) # id of each child
data=data.frame(id,parent)
g=graph.data.frame(data) # create igraph type of graph
plot(g) # plot the graph
```

- plot trees  
  Steps are similar to plotting networks, but you need to specify layout method so that the output is clearly a tree.
  
```r
data=data.frame(id=c(1:5),parent=c(1,1,2,2,3))
g=graph.data.frame(data) # create igraph type of graph
plot(g,layout=layout.reingold.tilford) # plot the graph
```
	 
## <a name="others"></a> Others
#### Global variable
There are two ways to assign values to parameters in the global environment, either using `<<-` or `assign()`:

```r
x=3
temp=function(){
x <<- x+3
# or: assign("x",x+3,envir=.GlobalEnv)
}
```

#### Install R packages on server
Sometimes when using `install.packages("pack_name")` in a cluster environment it returns `package *** not found`, which doesn't happen when we run it on our own computer.  
Fortunately, this usually could be solved just by adding `repos="http://cran.case.edu"`(See [install R packages in cluster](https://orfe.princeton.edu/help/r-packages))

#### Useful functions

- `match(x,elts)`: returns a vector of the first appearance location of each elements of `elts` in `x`   

- `tabulate(x)` :  like `table(x)`, but just returns the vector, no other attributes is returned
