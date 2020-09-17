###############################################
### Web scraping public HDB BTO information ###
###############################################


### 0. Load libraries


  library(tidyverse)
  library(rvest)
  library(lubridate)


### 1. Define webscraping function

  get_bto_app_ratios_3Rplus <- function(period){
      
      # Check if the period is old enough (that the other table structure is applicable)
      # This is used further down to handle the scraping and cleaning differently as table formats were different prior to Nov 15
        
        old_indicator <- ifelse(as.numeric(str_sub(period, start = -2, end = -1)) <= 15 &
                                period != "Nov15", TRUE, FALSE)
      
      
      # Distinguish the URL differences and define URL
      
        if(period != "Aug20") {         
          
          base_url <- "https://services2.hdb.gov.sg/webapp/BP13BTOENQWeb/BP13J011BTO"
          url <- paste0(base_url, period, ".jsp")
          
          } else if(period == "Aug20") {
            
            url <- "https://services2.hdb.gov.sg/webapp/BP13BTOENQWeb/AR_Aug2020_BTO?strSystem=BTO"
        
        }
      
      
      # Bring in the info we want
      
        raw <- read_html(url)
      
        raw_tables <- html_nodes(raw, css = ".scrolltable") %>% 
          html_table(trim = TRUE, fill = TRUE)
      
      
        if(old_indicator == FALSE){
        
          table_2 <- raw_tables[[2]]
          
          colnames(table_2) <- c("proj_name", "flat_type", "num_units", "num_applicants", 
                             "first_timer_ratio", "second_timer_ratio", "overall_ratio")
          } else {
          
          table_2 <- raw_tables[[1]]
          
          colnames(table_2) <- c("proj_name", "flat_type", "num_units", "num_applicants", 
                               "first_timer_ratio", "second_timer_ratio", "singles_ratio", "overall_ratio")
        }
      
      # Further cleaning - clean mature vs non-mature variable and retain scraped totals

        # we are looking for the row which contains the header for the mature estate.
        # anything above that, we know is non-mature estate
        # anything below that, we know is mature estate
        
        if(length(which(str_detect(table_2$proj_name, "Mature Town") & 
                        !str_detect(table_2$proj_name, "Non-Mature Town"))) > 0) {
        
        mature_marker <- which(str_detect(table_2$proj_name, "Mature Town") & 
                                 !str_detect(table_2$proj_name, "Non-Mature Town"))
        
        
          } else {
           
            #dummy marker in case there are only non-mature releases (this happened in at least one release)
            #if so, then we want everything to be marked as non-mature
           
            mature_marker <- 999
         
        }
      
      if(old_indicator == FALSE){
      
          table_2 <- table_2 %>% 
            mutate(date = period,
                   temp_index = row_number(),
                   estate_type = ifelse(temp_index >= mature_marker, "Mature", "Non-mature")) %>%
          
          filter(str_detect(proj_name, "Project|Mature Town") == FALSE) %>%
            mutate(proj_name = ifelse(proj_name == "TOTAL", paste("total",period, sep = "_"), proj_name)) %>%
            select(-temp_index)
      
        } else {
        
          table_2 <- table_2 %>% 
            mutate(date = period,
                   temp_index = row_number(),
                   estate_type = ifelse(temp_index >= mature_marker, "Mature", "Non-mature")) %>% 
            
            filter(str_detect(proj_name, "Project|Mature Town") == FALSE,
                   str_detect(proj_name, "excluding Studio Apartment") == FALSE) %>%
            mutate(proj_name = ifelse(str_detect(proj_name, "TOTAL"), paste("total",period, sep = "_"), proj_name)) %>%
            select(-temp_index, -singles_ratio)
          
        
      }
      
      #not strictly necessary, but I find this helpful for finding errors when applying the function to a loop fails
      print(paste("Scraped", period)) 
      
      return(table_2)
      
  }
  
  
  
### 2. Webscrape the data!
  
  # Define periods
  
    #defined periods are based on contextual knowledge. 
    #site structure is different before Nov15, hence require diff scraping (modifying the function)
    #URLs for results prior to Sep14 can't seem to be found...
    
    all_periods <- c("Aug20", "Feb20", 
                     "Nov19", "Sep19", "May19", "Feb19", 
                     "Nov18", "Aug18", "May18", "Feb18",
                     "Nov17", "Aug17", "May17", "Feb17",
                     "Nov16", "Aug16", "May16", "Feb16",
                     "Nov15", "May15", "Feb15",
                     "Nov14", "Sep14")


  # Apply function to all periods using map()
    
    combined_data <- map_df(all_periods, get_bto_app_ratios_3Rplus)

    write_csv(combined_data, "scraped_data.csv") # not necessary, of course
    
    str(combined_data)

    
    
### 3. Further data cleaning
    
  clean_combined <- combined_data %>%
    
    #create a proper date variable
    separate(date, into = c("month", "year"), sep = 3) %>%
    mutate(year = as.numeric(year),
           year = as.character(2000 + year),
           date = paste("01", month, year, sep = "-")
           ) %>% 
    
    #clean flat type categories
    mutate(flat_type = ifelse(flat_type == "", "TOTAL", flat_type),
           flat_type = if_else(str_detect(flat_type, "5-room"), "5-room", flat_type)) %>% 
            #some 5-rooms was also tagged as 3GEN. I've simplified them to all be treated as 5-room flats
    
    #deal with variable types (e.g. parse date)
    mutate(date = dmy(date),
           year = year(date),
           estate_type = as.factor(estate_type)) %>% 
    
    mutate(across(matches("num|ratio"),as.numeric))

    # warning message comes from some "Not Applicable" or "NA" entries in the ratio/number columns.
    # in this case I think they come from older studio apartment release which isn't the central concern here

  
  str(clean_combined)

  
  
### 4. Cross check scraping by comparing scraped TOTAL versus constructed total ##

  crosscheck1 <- clean_combined %>%
    
    #construct a total from all non-total entries
    filter(str_detect(proj_name, "total_") == FALSE) %>% 
    group_by(date) %>%
    summarize(num_units  = sum(num_units)) %>% 
    
    
    #after joining, I should now have both the scraped totals and the constructed totals
    full_join(clean_combined, by = "date") %>%
    filter(str_detect(proj_name, "total_"))

  View(crosscheck1)
  
  #if not identical, something has gone wrong and we should check for errors
  stopifnot(identical(crosscheck1$num_units.x, crosscheck1$num_units.y))
    
  #throw out scraped totals
  clean_combined <- clean_combined %>%
    filter(str_detect(proj_name, "total_") == FALSE)
  

### 5. Time to plot
  
  ## Plot 1. Annual BTO supply (4R+) over time ----

    clean_combined %>%
      
      #filter out 2014 because incomplete year
      #filter only 4 or 5 rooms because that's the interest
      filter(year > 2014, str_detect(flat_type,"4-room|5-room")) %>% 
      
      
      group_by(year, estate_type) %>%
      
      summarize(num_units  = sum(num_units)) %>%
      
      mutate(year_total = sum(num_units),
             plot_alpha = ifelse(year == 2020, 0.7, 1)) %>%
      
      #plot_alpha is a helper variable for making the 2020 bar translucent
      
      ggplot(aes(x = as.factor(year), y = num_units, fill = estate_type, alpha = plot_alpha)) +
        geom_col() +
        geom_text(
          aes(label = num_units),
          position = position_stack(vjust = 0.5)
        ) +
      
      
      scale_alpha_continuous(range = c(0.7,1), guide = "none") +
    
      labs(
        title = "Number of 4R/5R BTO flats (annual)",
        x = "",
        y = "",
        fill = ""
        ) +
      
      theme_classic() +
      theme(legend.position = "bottom")
    
    #ggsave("45r_supply.png")
    ggsave("45r_supply_small.png", dpi = 150)

  ## Plot 2. Total applicants for 4R/5R -----

    clean_combined %>%
      
      #filter out 2014 because incomplete year
      #filter only 4 or 5 rooms because that's the interest
      filter(year > 2014, str_detect(flat_type,"4-room|5-room")) %>%
      
      group_by(year, estate_type) %>%
      
      summarize(num_applicants  = sum(num_applicants)) %>%
      
      mutate(year_total = sum(num_applicants),
             plot_alpha = ifelse(year == 2020, 0.7, 1)) %>%
      
      
      #plot_alpha is a helper variable for making the 2020 bar translucent
      
      ggplot(aes(x = as.factor(year), y = num_applicants, fill = estate_type, alpha = plot_alpha)) +
      geom_col() +
      geom_text(
        aes(label = num_applicants),
        position = position_stack(vjust = 0.5)
      ) +
      
      
      scale_alpha_continuous(range = c(0.7,1), guide = "none") +
      
      labs(
        title = "Number of applicants for 4R/5R BTO flats (annual)",
        x = "",
        y = "",
        fill = ""
      ) +
      
      theme_classic() +
      theme(legend.position = "bottom")
    
    #ggsave("45r_applicants.png")
    ggsave("45r_applicants_small.png", dpi = 150)

  ## Plot 3. Excess demand for BTOs -----

    clean_combined %>%
      
      #filter out 2014 because incomplete year
      #filter only 4 or 5 rooms because that's the interest
      filter(year > 2014, str_detect(flat_type,"4-room|5-room")) %>%
      
      ggplot(aes(x = date, y = first_timer_ratio, color = estate_type)) +
      
        geom_point(alpha = 0.6, size = 3) +
        
        geom_hline(yintercept = 1, linetype = "dashed") + 
    
        scale_x_date(date_breaks = "1 year", labels = year) +
      
        labs(
          title = "BTO first-timer application rate for 4R/5R (by project)",
          x = "",
          y = "",
          color = ""
          ) +
      
        theme_classic() +
        theme(legend.position = "bottom")
    
    #ggsave("first_timer_ratio.png")
    ggsave("first_timer_ratio_small.png", dpi = 150)


  ## Plot 4. Excess demand for BTOs, facet -----

    clean_combined %>%
      
      filter(year > 2014, str_detect(flat_type,"4-room|5-room")) %>%
      #filter out 2014 because incomplete year
      #filter only 4 or 5 rooms because that's the interest
      
      ggplot(aes(x = date, y = first_timer_ratio, color = estate_type, size = num_units)) +
      
      geom_point(alpha = 0.6) +
      
      geom_hline(yintercept = 1, linetype = "dashed") + 
      
      scale_x_date(date_breaks = "1 year", labels = year) +
      
      facet_grid(~estate_type) +
      
      labs(
        title = "BTO first-timer application rate for 4R/5R (by project)",
        subtitle = "Size denotes number of units offered",
        x = "",
        y = "",
        color = "",
        size = ""
      ) +
      
      theme_classic() +
      theme(legend.position = "bottom")
    
    #ggsave("first_timer_ratio_facet.png")
    ggsave("first_timer_ratio_facet_small.png", dpi = 200)