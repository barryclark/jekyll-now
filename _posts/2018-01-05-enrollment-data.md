---
layout: post
title: California Public Enrollment Data
categories: Education Data
---

#### Charter schools are stealing our students and destroying public education.

#### Students are leaving public schools because they have better charter options.

I hope to eventually explore the two clickbait claims above. The primary purpose of this blog is to address them, get in touch if this interests you. 

The purpose of this post is to outline my process to explore California enrollment data starting from the raw form on the web. As I progress though the steps, I will write additional posts to share results and/or go into specifics on troubleshooting technical difficulties. 
  
I will follow a process similar to [EliteDataScience](https://elitedatascience.com/birds-eye-view):
  - [Exploratory Analysis](#explore)
  - [Data Cleaning](#clean)
  - [Feature Engineering](#feature)
  - [Algorithm Selection](#algo)
  - [Model Training](#model)

# Exploration<a name="explore"></a>
CA Student & School Data Files can be found on [California's DoE website](https://www.cde.ca.gov/ds/sd/sd/). They are tab delimited .txt files with fields that vary across years. 

## Enrollment
Within student enrollment data lies a story. I hope that visualizing the data will encourage others to tell their sides of that story and bring it to light. 

Data files are saved on a yearly basis with minor field changes across 4 timespans (['81-92](https://www.cde.ca.gov/ds/sd/sd/fsenr81to92.asp), ['93-97](https://www.cde.ca.gov/ds/sd/sd/fsenr93.asp), ['98-08](https://www.cde.ca.gov/ds/sd/sd/fsenr98.asp), ['09-16](https://www.cde.ca.gov/ds/sd/sd/fsenr.asp)). Mainly, the changes are to racial/ethnic designation codes, so analysis involving ethnicity will require some wrangling.

Here is quick exploration of '92, '97, '08, '16 enrollment data.

### Using Dataframes

```R
df9798 <- read.table("./Data/ent1997-1998.txt", fill=TRUE, na.strings=c("", "NA"), sep ="\t", quote = "", header=TRUE)
df0809 <- read.table("./Data/rol2008-2009.txt", fill=TRUE, na.strings=c("", "NA"), sep ="\t", quote = "", header=TRUE)
df1617 <- read.table("./Data/rol2016-2017.txt", fill=TRUE, na.strings=c("", "NA"), sep ="\t", quote = "", header=TRUE)
```
```
> head(df0809)
        CDS_CODE    COUNTY              DISTRICT              SCHOOL ETHNIC GENDER KDGN GR_1 GR_2 GR_3 GR_4 GR_5 GR_6 GR_7 GR_8 UNGR_ELM GR_9 GR_10 GR_11 GR_12 UNGR_SEC ENR_TOTAL ADULT
1 33671243331071 Riverside Moreno Valley Unified Vista del Lago High      4      M    0    0    0    0    0    0    0    0    0        0    5    14     7     6        0        32     0
2 33671243331071 Riverside Moreno Valley Unified Vista del Lago High      5      F    0    0    0    0    0    0    0    0    0        0  199   225   183   151        0       758     0
3 33671243331071 Riverside Moreno Valley Unified Vista del Lago High      5      M    0    0    0    0    0    0    0    0    0        0  239   229   191   152        0       811     0
4 33671243331071 Riverside Moreno Valley Unified Vista del Lago High      8      M    0    0    0    0    0    0    0    0    0        0    3     5     3     1        0        12     0
5 33671243331071 Riverside Moreno Valley Unified Vista del Lago High      2      M    0    0    0    0    0    0    0    0    0        0   10    13     8     9        0        40     0
6 33671243331071 Riverside Moreno Valley Unified Vista del Lago High      1      M    0    0    0    0    0    0    0    0    0        0    1     2     3     1        0         7     0
> str(df1617)
'data.frame':	129813 obs. of  23 variables:
$ CDS_CODE : num  30665226028690 30665226028690 30665226028690 30665226028690 30665226028690 ...
$ COUNTY   : Factor w/ 58 levels "Alameda","Alpine",..: 30 30 30 30 30 30 30 30 30 30 ...
$ DISTRICT : Factor w/ 1012 levels "ABC Unified",..: 305 305 305 305 305 305 305 305 305 305 ...
$ SCHOOL   : Factor w/ 8745 levels "21st Century Learning Institute",..: 6030 6030 6030 6030 6030 6030 6030 6030 6030 6030 ...
$ ETHNIC   : int  2 4 7 6 4 9 5 3 2 0 ...
$ GENDER   : Factor w/ 2 levels "F","M": 1 2 1 1 1 2 1 2 2 1 ...
> str(df0809)
'data.frame':	121068 obs. of  23 variables:
$ CDS_CODE : num  33671243331071 33671243331071 33671243331071 33671243331071 33671243331071 ...
$ COUNTY   : Factor w/ 58 levels "Alameda","Alpine",..: 33 33 33 33 33 33 33 33 33 33 ...
$ DISTRICT : Factor w/ 1031 levels "ABC Unified",..: 578 578 578 578 578 578 578 578 578 578 ...
$ SCHOOL   : Factor w/ 8517 levels "A. E. Arnold Elementary",..: 8005 8005 8005 8005 8005 8005 8005 8005 8005 8005 ...
$ ETHNIC   : int  4 5 5 8 2 1 7 6 6 8 ...
> str(df9798)
'data.frame':	89053 obs. of  20 variables:
$ CDS_CODE : num  1100170130401 1100170130401 1100170130401 1100170130401 1100170130401 ...
$ ETHNIC   : int  1 1 2 2 3 4 4 5 5 6 ...
$ GENDER   : Factor w/ 2 levels "F","M": 1 2 1 2 2 1 2 1 2 1 ...
```

All of the data contains a CDS_CODE that is a unique identifier for County, District, School. This is ideal for linking data across tables. Notice that school enrollment is seperated across ethnicity, gender, and grade. Therefore, for any given school we can get a breakdown of the student population across these factors. For example, Benjamin Franklin High School (where I taught) has the following:

1617                    0809                  9798

(insert enrollment count for ethnicity by grade and gender by grade)

# Cleaning<a name="clean"></a>
I first convert them to data tables:

```R
# Returns a datatable from a list of tab delimited files and a list of names
listToDataTable <- function(file.list, names.list, id) {
DT.list <- lapply(file.list, read.table, fill=TRUE, na.strings=c("", "NA"), sep ="\t", quote = "", header=TRUE)
setattr(DT.list, 'names', names.list)
return(rbindlist(DT.list, use.names=TRUE, fill=TRUE, idcol=id))
}
```

I will bind the data tables across years together into one large data.table in order to visualize change over time. Before doing so, I need to make sure that the column headers are the same for each data table and each col contains the same type of data.

# Features<a name="feature"></a>
The first thing to notice is that enrollments seem to be decreasing in many areas even though population has been rising. Normalizing for population growth seems like something worth trying.

In California, a child must be five years old BEFORE September 1 in order to enroll in kindergarten. Elementary school is kindergarten through 5th grade (ages 5-10), middle school is grades 6-8 (ages 11-13), and high school is grades 9-12 (ages 14-18). I will use these figures copied from a [Stanford resource](https://cardinalatwork.stanford.edu/benefits-rewards/worklife/children-family/school-age-resources) to define school-aged children and pull that data from Census resources.

I want to understand locations where enrollment is trending down or trending up

I want to identify schools with high diversity entropy and low diversity entropy

I want to identify schools with high class entropy and low class entropy

# Algorithm<a name="algo"></a>


# Model<a name="model"></a>


# Conclusions<a name="conc"></a>

There are many claims about lowered enrollment in public schools. I taught at Franklin Sr. High School and experienced the following drop in enrollment:

<INSERT IMG Franklin_enrollment_2005-2013>

My experience was local and anecdotal. Some charters opened up, the housing crisis hit, and the Highland Park area is a classic example of gentrification. Our community was RED HOT on redfin due to foreclosures, our city council member increased police presence, there was a huge gang raid in 2009, and changing deomographics of homeowners contributes to enrollment patterns.

The point of my experience is to inform the fluctuations I will explore in public enrollment data. We will need to do a lot data cleaning, merging, and feature engineering to get anywhere close to explaining enrollment fluctuations in any given community.

