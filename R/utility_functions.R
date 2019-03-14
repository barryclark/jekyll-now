
meeting_days <- function( first_meeting = "2018-12-24", by = "biweekly"){
  # Get the year from the computer
  the_year <- lubridate::year(Sys.Date())
  # convert first_meeting to a date if it is a character.
  if(is.character(first_meeting)){
    first_meeting <- lubridate::ymd(first_meeting)
  }
  # meeting frequency, used with modulus operator in filter
  mf <- switch(by,
    "weekly" = c(1, 0),
    "biweekly" = c(2, 1),
    "monthly" = c(4, 1)
  )
  tibble::tibble(start = seq(lubridate::ymd(first_meeting),
                             lubridate::ymd(paste0(the_year,"-12-31")),
                             by = "1 day")) %>%
    dplyr::filter( weekdays(.$start) == weekdays(first_meeting)) %>%
    dplyr::filter(dplyr::row_number() %% mf[1] == mf[2]) %>%
    dplyr::mutate(end = lubridate::ymd(dplyr::lead(.$start)) - 1) %>%
    dplyr::filter(complete.cases(.)) %>%
    return(.)
}

# just using for now while I work on the reporting stuff
open_graph = function( width=7 , height=7 , mag=1.0 , ... ) {
  if ( .Platform$OS.type != "windows" ) { # Mac OS, Linux
    tryInfo = try( X11( width=width*mag , height=height*mag , type="cairo" ,
                        ... ) )
    if ( class(tryInfo)=="try-error" ) {
      lineInput = readline("WARNING: Previous graphics windows will be closed because of too many open windows.\nTO CONTINUE, PRESS <ENTER> IN R CONSOLE.\n")
      graphics.off()
      X11( width=width*mag , height=height*mag , type="cairo" , ... )
    }
  } else { # Windows OS
    tryInfo = try( windows( width=width*mag , height=height*mag , ... ) )
    if ( class(tryInfo)=="try-error" ) {
      lineInput = readline("WARNING: Previous graphics windows will be closed because of too many open windows.\nTO CONTINUE, PRESS <ENTER> IN R CONSOLE.\n")
      graphics.off()
      windows( width=width*mag , height=height*mag , ... )
    }
  }
}

plot_cols <- function(){
  return(c('#1A8998', '#7D20A6','#EFF726', '#F98B26'))
}


