---
layout: post
title: Rendering reactive R Markdown documents within a Shiny app.
---

This blog will serve as a technical(ish) post on how to generate dynamic, user-input specific R Markdown documents within a Shiny app. I am posting this guide primarily because I had some difficulty trying to figure this out myself, and couldn't find any existing posts on the topic on StackOverflow or similar sites. 

*What is Shiny?*

> Shiny is an R package that makes it easy to build interactive web apps straight from R. You can host standalone apps on a web-page or embed them in R Markdown documents or build dashboards. 

## The specific problem:

As noted in the official description of Shiny (above), one of the primary purposes of Shiny is to embed apps within R Markdown documents. 

The issue I will describe here is the opposite to this, in that I wanted to embed a dynamic R Markdown document in a tab within a Shiny app I am currently developing. 

Reactive/dynamic documents are ones which change in response to a set of parameters defined by a user. In the case of the app I am currently developing, users can select first-level administrative boundaries (i.e. districts) for a specific country, and generate a variety of summary statistics from existing surfaces. The dynamic elements of this app include the 'districts' selected, and the 'surfaces' for which the summary statistics are generated.

I wanted to render tables displaying the generated district-level summary statistics within a separate panel on the apps UI. This task, in itself, is relatively simple within Shiny if a single table is passed to each panel (see example code below):

*In ui.R:*
```
tabPanel(value ='tab3', title = "Summary Statistics", tableOutput("report")))
```

*In server.R:*
```
output$statistics <- renderTable({summary_statistics})
```

However, as you can see from the above code, `tableOutput` can only take one object. There is not a simple way to display multiple tables within one `tableOutput` call. To get around this, and display multiple tables within one `tabPanel`, I decided that I would produce an R Markdown document displaying tables for each of the 'surfaces' a user selects. 

I then planned to render this R Markdown document within the `tabPanel`. Rendering an existing R Markdown document in a tabPanel is straightforward, using the `includeMarkdown` function, however, since the UI builds when the app is deployed, there is no way to include the dynamic R Markdown which updates based on user input.

## The solution:

The key to solving this problem was to create an R Markdown document which was responsive to objects/parameters within the current R environment. The main steps I took are as follows:

1. Create a markdown template. 

This template was relatively simple, and consisted of several chunks of code utilising the `kable` function within the `knitr` package. The most important part of this document was a `params` argument situated in the header of the markdown document:

*In markdown.rmd:*
```
--- 
title: "Summary statistics"
output: html_document params:
stats_list: NA 
---
```

Setting objects within the `params` argument to NA allowed me to feed a list of parameters from the current global environment, directly into the R Markdown document. The above code defines a parameter `stats_list` as an empty object, I then refer to this within the Markdown document as:

*In markdown.rmd:*
```
params$stat_list
```

This Markdown document was then saved within the central directory for the app. Prior to updating this document based on user inputs, I had two lines of code which copy the template document to a temporary directory on the computer of the user of the app. This is because once the app is deployed, the user would not have write permissions to the current working directory. The template was copied using the following:

*In server.R:*
```
tempReport <- file.path(tempdir(), "markdown.rmd") 
file.copy("markdown.rmd", tempReport, overwrite = TRUE)
```

2. Feed a parameter object into the Markdown document. The parameter object changes based on each users `input` (selection of specified variables).

This parameter object is a list to feed into the Markdown document. The objects within the list are generated in another section of my code within the server.R file, based off of a user input object `input`. The parameter list is defined as:

*In server.R:*
```
params <- list(stats_list = stats_list)
```

When rendering the document using the `render` function in the `rmarkdown` document, I then specify `params` within the Markdown file to be the parameter list `params` defined above, as follows:

*In server.R:*
```
rmarkdown::render(tempReport, 
                  output_file = paste0(tempdir(), "/populated_markdown.html"), 
                  output_format = "html_document", 
                  params = params, 
                  envir = globalenv())
```

The `render` function will generate an output Markdown document in the specified `output_format`. The above code also saves this updated document in a temporary directory on each app users computer as defined in the `output_file` argument.

3. Render the updated Markdown file, and save it as an `output` object within the global environment.

Once the updated markdown file is saved in a temporary directory, I render this markdown within the server.R file, and assign it as a specified `output` object. To do this I define a bespoke function `get_page` as:

*In server.R:*
```
getPage <- function(){

return(includeHTML(paste0(tempdir(), "/populated_markdown.html")))

}
```
  
The above function returns the output file from the `render` function, as a chunk of html text. To assign this to an `output` object, which is then callable within the `tabPanel` argument in the UI, I then run the following code:

*In server.R:*
```
output$report <- renderUI({getPage()})
```

I can then render this Markdown (in html) within the `tabPanel` in the UI, by then calling the output object:

*In ui.R:*
```
tabPanel(value ='tab3', title = "Summary statistics", htmlOutput("report")))
```

This is a bit of a long-winded workaround, but allows me to generate a dynamic markdown document which can also be rendered as an output report for each user of the app.   
