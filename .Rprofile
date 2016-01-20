r2jekyll <- function(filename, dpi = ) {

  require(knitr)
  require(stringr)
  require(lubridate)
  
  # process inline math 
  content <- readLines(paste0("_Rmd/", filename, ".Rmd"))
  content_math <- str_detect(content, "\\$")
  content_mathjaxed <- str_replace_all(content, "[:blank:]\\${1}([^\\$]+)\\${1}", " $$\\1$$")

  # get post date from yaml
  frontMatter <- which(substr(content, 1, 3) == '---')
  dateline <- str_subset(content[(frontMatter[1] + 1):(frontMatter[2] - 1)], "date:")
  date <- as.character(parse_date_time(str_sub(dateline, 7), "mdy"))
  
  # figure directory
  todir <- paste0("figure/",date,"-", filename,"/")
  fromdir <- paste0("{{site.url}}/",todir)
  
  # knit to markdown
  outfile <- paste0("_posts/", date, "-", filename, ".md")
  render_jekyll()
  opts_chunk$set(fig.path = fromdir, dpi = 192)
  knit(text = content_mathjaxed, output = outfile)
  
  # Copy .png files to the images directory.
  pics <- list.files(fromdir, full.name=TRUE)
  dir.create(todir)
  file.copy(pics, todir, overwrite = TRUE)
  unlink("{{site.url}}", recursive=T)
}

# r2jekyll("clubSandwich-for-CRVE-FE")
# r2jekyll("SPED-Pro-Sem")
# r2jekyll("Correlations-between-SMDs")
# r2jekyll("Crashes-by-city")