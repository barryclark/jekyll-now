#
# This is a Shiny web application. You can run the application by clicking
# the 'Run App' button above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

### By Clement Wee, uploaded Jul 2021 ###
### If errors encountered, try renaming to app.R ###

########################
### 0. Preliminaries ###
########################

### Load libraries ###

library(tidyverse)
library(httr)
library(rvest)
library(jsonlite)
library(shiny)
library(lubridate)
library(plotly)

rm(list=ls())

##########################
### 1. Data Extraction ###
##########################

### Establish pattern to data extract ###

### Note: Not necessary to run - just to show the logic behind the data extraction process

# prelim_url <- "https://data.gov.sg/api/action/datastore_search?resource_id=778814b8-1b96-404b-9ac9-68d6c00e637b"
#     
# prelim_response <- GET(url = prelim_url) 
# 
# status_code(prelim_response) #code of 200 means success
# http_type(prelim_response) #checks that it is json
# 
# prelim_rainfall_data_list <- fromJSON(prelim_url) #pulls the raw data in entirety
# prelim_rainfall_data <- prelim_rainfall_data_list$result$records #pulls the actual results we want - notice there are only 100

#notice the next 100 results are in prelim_rainfall_data_list$result$`_links`$`next`


### Actual data extraction - via API ###

url_base <- "https://data.gov.sg"
bridge <- "/api/action/datastore_search?"
resource_id <- "resource_id=778814b8-1b96-404b-9ac9-68d6c00e637b"


param_count <- as.vector(seq(from = 0, to = 500, by = 100)) 
    # sufficient to stop at 400 (see get_rainfall_data function - offset 400 means collect up to 500 results), 
    # but setting extra buffer so it will still run correctly in future for quite a long while yet


get_rainfall_data <- function(count) {
    if (count == 0){
        get_url <- paste0(url_base, bridge, resource_id)
    } else {
        get_url <- paste0(url_base, bridge, "offset=",count,"&", resource_id)
    }  
    
    response <- GET(get_url)
    status_code(response)
    
    rainfall_data_list <- fromJSON(get_url)
    rainfall_data <- rainfall_data_list$result$records
    
    return(rainfall_data)
    
    
}

rainfall_data <- map_dfr(param_count, get_rainfall_data)

#test1 <- get_rainfall_data(400) #should have some obs
#test2 <- get_rainfall_data(500) #should have no obs at point of comment (Jun 2021)

rainfall_data <- rainfall_data %>%
    
    mutate(total_rainfall = as.numeric(total_rainfall),
           date = ymd(paste0(month,"-01")),
           year = year(date),
           month = month(date),
           jan2021_marker = as.factor(ifelse(date == "2021-01-01", 1, 0)),
           date_factor = as.factor(paste(month(date, label = TRUE), year(date))),
           date_top_n = paste0(year(date),"-",month(date))
           )


min_date <- min(rainfall_data$date)
max_date <- max(rainfall_data$date)



#####################
### 2. RShiny app ###
#####################


### 2.1 Define UI for application ###

ui <- fluidPage(

    # Application title
    titlePanel("How heavy was the Jan 2021 rainfall?"),
    

    # Input selection
    sidebarLayout(
        sidebarPanel(
            dateRangeInput(inputId = "daterange1",
                           label = "Select time period",
                           startview = "year",
                           start = max_date - years(5),
                           end = max_date,
                           min = min_date,
                           max = max_date,
                           format = "yyyy-mm"
                           ),
            
            helpText("Select month-year only. Selection of specific days within the same month has no effect as the data is at monthly level"),
            
            sliderInput(inputId = "top_n",
                        "Display top N months with most rainfall",
                        min = 1,
                        max = 30,
                        value = 10),
            
            
            
            helpText("Source: Monthly rainfall data, data.gov.sg")
            
            
            
            
        ),

        # Show output
        mainPanel(
            tabsetPanel(
                tabPanel("Overview",
                
                h3("Monthly rainfall across selected period (mm)"),
                h6("Jan 2021 indicated in red"),
                h6("Dashed line: Average monthly rainfall in selected period"),
                plotlyOutput("timeplot")
                ),
                
                tabPanel("Top N months",
            
                h3("Top N months with most rainfall (mm) in selected period"),
                h6("Jan 2021 indicated in red"),
                plotOutput("topnplot"),
                dataTableOutput("topntable")
                )
            )
        )
    )
)

### 2.2 Define server logic (backend) ###


server <- function(input, output) {
    
    
    #Reactive dates to reduce computation. Same dates are used across three outputs
    graphstartdate <- reactive({
        ymd(paste0(year(input$daterange1[1]),
                                 "-",
                                 month(input$daterange1[1]),
                                 "-01"))
    })
    
    graphenddate <- reactive({
                    ymd(paste0(year(input$daterange1[2]),
                               "-",
                               month(input$daterange1[2]),
                               "-01"))
    
    })
    
    
    
    #Output plot 1: Bar chart of monthly rainfall over time
    output$timeplot <- renderPlotly({
        
        local_avg <- rainfall_data %>%
            filter(date >= graphstartdate() & date <= graphenddate()) %>%
            summarise(mean(total_rainfall)) %>%
            as.numeric()


        rainfall_data %>%
           filter(date >= graphstartdate() & date <= graphenddate()) %>%
            
           ggplot(aes(x=date,
                       y=total_rainfall,
                       fill = jan2021_marker)) +
                   
                   geom_bar(stat = "identity", show.legend = FALSE) +
                   geom_hline(yintercept = local_avg, linetype = "dashed") +
            
                   scale_fill_manual(values = c("black", "red")) +
                   scale_x_date(date_breaks = "1 year", labels = year) +       
            
                   labs(
                    x = "Date",
                    y = ""
                    ) +
                    
                    
                    theme_classic()
        

        
    })
            
    
    
    #Output plot 2: Top N months of monthly rainfall within the chosen period
    output$topnplot <- renderPlot({
        
        
        rainfall_data %>%
            filter(date >= graphstartdate() & date <= graphenddate()) %>%
            slice_max(total_rainfall, n = input$top_n) %>%
            
            
            ggplot(aes(x=reorder(date_factor, total_rainfall),
                       y=total_rainfall,
                       fill = jan2021_marker)) +
            
            
            geom_bar(stat = "identity", show.legend = FALSE) +
            
            scale_fill_manual(values = c("black", "red")) +
            
            coord_flip() +
            
            
            labs(
                x = "",
                y = ""
            ) +
            
            
            theme_classic()
        
    })

    #Output table: Data table form of the output plot 2
    output$topntable <- renderDataTable({
        
      rainfall_data %>%
            filter(date >= graphstartdate() & date <= graphenddate()) %>%
            slice_max(total_rainfall, n = input$top_n) %>%
            select(date_top_n, total_rainfall) %>%
            rename(Date = date_top_n,
                   "Total Monthly Rainfall (mm)" = total_rainfall)
        
        
    })

}

# Run the application 
shinyApp(ui = ui, server = server)
