# this goes through the nested list and returns what we need from
#  the times list.
scrape_times <- function(one_list = NULL){
  do.call(rbind,
          lapply(unname(one_list),
                 function(y){
                   data.frame(
                     description = ifelse(!is.null(y[[which(names(y) == "description")]]),
                                          y[[which(names(y) == "description")]],
                                          NA),
                     tags_id = ifelse(!is.null(y[[which(names(y) == "tags")]]),
                                   sapply(y[[which(names(y) == "tags")]],
                                          function(x){x[[1]]}),
                                   NA),
                     project_id = y[[which(names(y) == "projectId")]],
                     time_id = y[[which(names(y)=="id")]],
                     start = y[[which(names(y) =="timeInterval")]][["start"]],
                     end = y[[which(names(y) =="timeInterval")]][["end"]],
                     stringsAsFactors = FALSE
                   )})) %>% tibble::as_tibble()
}

scrape_projects <- function(one_list = NULL){
  do.call(rbind,
          lapply(unname(one_list),
                 function(y){
                   data.frame(
                     project_name = y[[which(names(y) == "name")]],
                     project_id = y[[which(names(y)=="id")]],
                     client_id = y[[which(names(y) == "clientId")]],
                     is_research = y[[which(names(y) == "public")]],
                     stringsAsFactors = FALSE
                   )})) %>% tibble::as_tibble()}

