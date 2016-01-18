library(knitr)

filename <- "correlations-between-SMDs"
date = "2015-09-17"

r2jekyll <- function(filename, date = Sys.Date()) {
  infile <- paste0("_Rmd/", filename, ".Rmd")
  outfile <- paste0("_posts/", date, "-", filename, ".md")
  render_jekyll()
  knit(infile, outfile)
  
  # Copy .png files to the images directory.
  fromdir = "{{ site.url }}/images"
  todir = "../images"
  
  pics = list.files(fromdir, ".png")
  pics = sapply(pics, function(x) paste(fromdir, x, sep="/"))
  file.copy(pics, todir)
}