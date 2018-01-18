---
layout: post
title: California Public Enrollment Data
categories: Education Data
---

#### Charter schools are stealing our students and destroying public education.

#### Students are leaving public schools because they have better chart options.

I hope to eventually explore the two clickbait claims above. tl;dr You can skip to the [conclusions section](#conc) where I address them. The more general purpose of this post is to outline my process to explore this data starting from the raw form on the web. 
  
I will follow a process similar to [EliteDataScience](https://elitedatascience.com/birds-eye-view):
  - [Exploratory Analysis](#explore)
  - [Data Cleaning](#clean)
  - [Feature Engineering](#feature)
  - [Algorithm Selection](#algo)
  - [Model Training](#model)

# Exploration<a name="explore"></a>
CA Student & School Data Files can be found on [California's DoE website](https://www.cde.ca.gov/ds/sd/sd/). However, they are tab delimited .txt files with fields that vary across years ('81-92, '93-97, '98-08, '09-16). 

## Enrollment
Data files are saved on a yearly basis.

# Cleaning<a name="clean"></a>
I first convert them to data tables:

```RMarkdown
    # Returns a datatable from a list of tab delimited files and a list of names
    listToDataTable <- function(file.list, names.list, id) {
      DT.list <- lapply(file.list, read.table, fill=TRUE, na.strings=c("", "NA"), sep ="\t", quote = "", header=TRUE)
      setattr(DT.list, 'names', names.list)
      return(rbindlist(DT.list, use.names=TRUE, fill=TRUE, idcol=id))
    }
```
# Features<a name="feature"></a>


# Algorithm<a name="algo"></a>


# Model<a name="model"></a>


# Conclusions<a name="conc"></a>

There are many claims about lowered enrollment in public schools. I taught at Franklin Sr. High School and experienced the following drop in enrollment:

<INSERT IMG Franklin_enrollment_2005-2013>

My experience was local and anecdotal. Sure there are some charters that opened up, but the housing crisis hit, and the Highland Park area is a classic example of gentrification. Our community was RED HOT on redfin due to foreclosures, our city council member increased police presence, there was a huge gang raid in 2009, and changing deomographics of homeowners contributes to enrollment patterns.

The point of my experience is to inform the fluctuations we will now explore in public enrollment data. Clearly, we would need to do a lot data cleaning, merging, and feature engineering to get anywhere close to explaining enrollment fluctuations in any given community.

