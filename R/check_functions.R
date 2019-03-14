
check_clients <- function(clients = NULL){
  # check if the file exists, create if not.
  if(!file.exists("./Data/fidino_clients.csv")){
    # add a client_category
    readr::write_csv(clients,"./Data/fidino_clients.csv")
  }
  # if it does exist, check to see if any new clients need to be added.
  if(file.exists("./Data/fidino_clients.csv")){
    clients_csv <- readr::read_csv("./Data/fidino_clients.csv",
                                   col_types = list(
                                     client_id = readr::col_character(),
                                     client_name = readr::col_character()
                                   ))
    if(!'client_category' %in% colnames(clients_csv) ){
      clients_csv$client_category <- NA
    }
    # update the client names
    clients_csv <- clients_csv %>%
      dplyr::select(client_id, client_category) %>%
      dplyr::left_join(., clients, by = 'client_id') %>%
      dplyr::select(client_id, client_name, client_category)
    # fill NAs
    if(any(is.na(clients_csv$client_category))){
      cat('\n\t',crayon::cyan(cli::symbol$pointer),
          crayon::cyan('There are clients that need to be categorized'))
      to_fill <- which(is.na(clients_csv$client_category))
      tmp_names <- rep(NA, length(to_fill))
      for(i in 1:length(to_fill)){

        cat('\n', crayon::magenta('client:'),
 crayon::underline( clients_csv$client_name[to_fill[i]]))
        cat('\n      1: UWI',
            '\n      2: UWIN',
            '\n      3: C&S Department',
            '\n      4: External')
        my_input <- readline(prompt="  Input: ")
        tmp_names[i] <- switch(my_input,
                               '1' = 'UWI',
                               '2' = 'UWIN',
                               '3' = 'C&S department',
                               '4' = 'External')
      }
      clients_csv$client_category[to_fill] <- tmp_names
    }

      readr::write_csv(clients_csv, "./Data/fidino_clients.csv")
  }
  return(clients_csv)
    }


check_times <- function(times = NULL){
  if(!file.exists("./Data/fidino_times.csv")){
    write.csv(times,"./Data/fidino_times.csv", row.names = FALSE)
  }
  # if it does exist, check to see if any new times need to be added.
  if(file.exists("./Data/fidino_times.csv")){
    times_csv <-read.csv("./Data/fidino_times.csv",
                           stringsAsFactors = FALSE) %>%
      tibble::as_tibble()
    # check to see if they are not identical
    #  if not, add new records and append to file.
    if(!identical(times_csv, times)){
      times_to_add <- dplyr::anti_join(times ,times_csv,"id")
      cat(crayon::cyan("Adding new records to times data."))
      write.table(times_to_add,
                  "./Data/fidino_times.csv",
                  append = TRUE,
                  row.names = FALSE,
                  col.names = FALSE,
                  sep = ",")
    }
    }
}

check_tibble <- function(x){
  if(tibble::is_tibble(x) & nrow(x) > 0) {
    cat(crayon::green( cli::symbol$tick), "\n")
  } else {
    cat(crayon::red( cli::symbol$cross), "\n")
  }
}

check_all <- function(data = NULL, stop_on_empty = TRUE){
  cat(cli::rule(center = " * CHECKING DATA * ", col = "purple"),"\n")
  cat(crayon::cyan( cli::symbol$bullet," Projects: "),
      "No checks currently made.\n")
  cat(crayon::cyan( cli::symbol$bullet," Clients: "),
      " Checking if client categories need to be added...\n")
  data$clients <- check_clients(data$clients)
  cat("\t", crayon::green('     Clients check complete\n'))
  cat(crayon::cyan( cli::symbol$bullet," Times: "),
      "   No checks currently made.\n")
  return(data)
}
