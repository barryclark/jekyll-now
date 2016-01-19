library(lubridate)
library(stringr)
library(knitr)

r2jekyll <- function(filename) {
  
  # process inline math 
  content <- readLines(paste0("_Rmd/", filename, ".Rmd"))
  content_math <- str_detect(content, "\\$")
  content_mathjaxed <- str_replace_all(content, "[:blank:]\\${1}([^\\$]+)\\${1}", " $$\\1$$")

  # get post date from yaml
  frontMatter <- which(substr(content, 1, 3) == '---')
  dateline <- str_subset(content[(frontMatter[1] + 1):(frontMatter[2] - 1)], "date:")
  date <- as.character(parse_date_time(str_sub(dateline, 7), "mdy"))
  
  # knit to markdown
  outfile <- paste0("_posts/", date, "-", filename, ".md")
  render_jekyll()
  knit(text = content_mathjaxed, output = outfile)
  
  # Copy .png files to the images directory.
  fromdir = "{{ site.url }}/figures"
  todir = "../figures"
  
  pics = list.files(fromdir, ".png")
  pics = sapply(pics, function(x) paste(fromdir, x, sep="/"))
  file.copy(pics, todir)
}

# r2jekyll("clubSandwich-for-CRVE-FE")
# r2jekyll("SPED-Pro-Sem")
# r2jekyll("Correlations-between-SMDs")
