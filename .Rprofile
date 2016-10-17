r2jekyll <- function(filename, dpi = 192) {

  require(knitr)
  require(stringr)
  require(lubridate)
  
  # process inline math 
  content <- readLines(paste0("_Rmd/", filename, ".Rmd"))
  content_math <- str_detect(content, "\\$")
  content_mathjaxed <- str_replace_all(content, "[:blank:]\\${1}([^\\$]+)\\${1}", " $$\\1$$")

  # get post date from yaml
  frontMatter <- which(substr(content, 1, 3) == '---')
  content_frontMatter <- content_mathjaxed[(frontMatter[1] + 1):(frontMatter[2] - 1)]
  dateline <- str_subset(content_frontMatter, "^date:")
  date <- as.character(parse_date_time(str_sub(dateline, 7), "mdy"))
  
  # add permalink to yaml
  content_md <- c("---",
                  content_frontMatter,
                  paste("permalink:",filename),
                  "---",content_mathjaxed[(frontMatter[2]+1):(length(content))])
  
  # figure directory
  todir <- paste0("figure/",date,"-",filename,"/")
  fromdir <- paste0("{{site.url}}/",todir)
  
  # knit to markdown
  outfile <- paste0("_posts/", date, "-", filename, ".md")
  render_jekyll()
  opts_chunk$set(fig.path = fromdir, dpi = dpi)
  knit(text = content_md, output = outfile)
  
  # Copy .png files to the images directory.
  pics <- list.files(fromdir, full.name=TRUE)
  dir.create(todir, recursive = TRUE)
  file.copy(pics, todir, overwrite = TRUE)
  unlink("{{site.url}}", recursive=T)
}

# r2jekyll("SCD-effect-size-sensitivities")
# r2jekyll("Simulation-studies-in-R-2016")
# r2jekyll("Bug-in-nlme-getVarCov")
# r2jekyll("alternative-formulas-for-the-SMD")
# r2jekyll("assigning-after-dplyr")
# r2jekyll("unlucky-randomization")
# r2jekyll("distribution-of-sample-variances")
# r2jekyll("Tau-U")
# r2jekyll("NAP-SEs-and-CIs")
# r2jekyll("rdd-interactions-again")
# r2jekyll("rdd-interactions")
# r2jekyll("clubSandwich-for-CRVE-FE")
# r2jekyll("SPED-Pro-Sem-again")
# r2jekyll("Correlations-between-SMDs")
# r2jekyll("Crashes-by-city")
# r2jekyll("Crashes-in-Austin-and-Travis-Co")
# r2jekyll("clubSandwich-for-RVE-meta-analysis")
# r2jekyll("Four-methods-for-analyzing-PIR-data")
# r2jekyll("getting-started-with-scdhlm")
# r2jekyll("Alternating-renewal-process-models-for-behavioral-observation")
# r2jekyll("wanted-PIR-data")
# r2jekyll("design-comparable-effect-sizes-in-multiple-baseline-designs")
# r2jekyll("ARPobservation-now-on-CRAN")
# r2jekyll("Robust-meta-analysis-3")
# r2jekyll("Robust-meta-analysis-2")
# r2jekyll("Robust-meta-analysis-1")
# r2jekyll("SPED-Pro-Sem")
# r2jekyll("parallel-R-on-TACC-update")
# r2jekyll("measurement-comparable-effect-sizes")
# r2jekyll("parallel-R-on-TACC")
# r2jekyll("Designing-simulation-studies-using-R")
# r2jekyll("PIR-overestimates-prevalence")
# r2jekyll("ARPobservation-basic-use")
# r2jekyll("getting-started-with-ARPobservation")
# r2jekyll("Shogren-reliability-analysis")
# r2jekyll("Another-project-idea")
# r2jekyll("Current-Projects")
