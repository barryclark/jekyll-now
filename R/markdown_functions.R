make_md <- function(x = NULL){
  sink(paste0("./_posts/",x$next_meeting,"-time_report.md"))
cat(
paste0("---\n"),
paste0("layout: post\n"),
paste0("title: Time report for ",as.character(x$next_meeting),"\n"),
paste0("---\n\n"),
paste0("This is a summary of what I have done between ", as.character(x$time_range$start)," and " ,as.character(x$time_range$end),".\n"),
paste0("At the most broad scale, here is the proportion of time I have spent working across four different categories: for UWIN, for those in UWI, for those in the Conservation & Science department, and external collaborations.\n"),
paste0("![_config.yml]({{ site.baseurl}}/images/",x$next_meeting,"_category_plot.jpg)\n"),
paste0("Within each of these categories, I have worked with ", as.character(nrow(x$client))," clients. Split across these clients my last two weeks looked like:\n"),
paste0("![_config.yml]({{ site.baseurl}}/images/",x$next_meeting,"_client_plot.jpg)\n"),
paste0("I worked on ", paste0(nrow(x$project))," projects. My time split amongst them was:\n"),
paste0("![_config.yml]({{ site.baseurl}}/images/",x$next_meeting,"_project_plot.jpg)\n"),
paste0("Of the projects that I work on there are ",nrow(x$weeks_since), " that I believe will result in publication.\n"),
paste0("Here is the last I have worked on each of these projects:\n"),
paste0("![_config.yml]({{ site.baseurl}}/images/",x$next_meeting,"_weeks_since.jpg)")
,fill = TRUE, sep = "")
  sink()
}

add_to_github <- function(x = NULL){
  system('git add .')
  system(paste0('git commit -am ', "'new report for ", as.character(x$next_meeting), "'"))
  system('git push origin master')
}

 make_post <- function(x = NULL){
   cat(cli::rule(center = " * GENERATING REPORT * ", col = "purple"),"\n")
   cat(crayon::cyan( cli::symbol$bullet," Generating markdown file: "))
   make_md(x = x)
   cat(crayon::green( cli::symbol$tick), "\n")
   cat(crayon::cyan( cli::symbol$bullet," Pushing to github:\n"))
   add_to_github(x=x)
   cat(cli::rule(center = " * TIME REPORT COMPLETE * ", col = "green"),"\n")

}
