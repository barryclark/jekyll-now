library(tidyverse)

pubs <- 
  list.files("content/publication/", full.names = TRUE, pattern = ".+\\.md") %>%
  keep(~ .x != "content/publication/_index.md")

pub_md <- pubs[[1]]


read_pub_data <- function(pub_md) {
  
  txt <- 
    tibble(line = read_lines(pub_md))  %>%
    mutate(
      breaks = lag(cumsum(str_detect(line, "^\\+\\+\\+")))
    )
  
  plain_lines <- 
    txt %>% 
    filter(breaks > 1) %>% 
    pull(line)

  txt %>%
    filter(breaks == 1) %>%
    filter(!str_detect(line, "^#")) %>%
    filter(str_detect(line, " = ")) %>%
    mutate(
      pub = pub_md,
      line = str_split(line, " = ", n = 2),
      key = map_chr(line, ~ .[[1]]),
      val = map_chr(line, ~ .[[2]]),
    ) %>%
    select(-breaks, -line) %>%
    pivot_wider(names_from = key, values_from = val) %>%
    mutate(
      plain_lines = list(plain_lines)
    )
}

make_authors <- function(x) {
  names <- 
    str_sub(x, 3, -3) %>%
    str_split("\\\", \\\"")
  
  paste("-", names[[1]]) %>%
    recode(`- James E. Pustejovsky` = "- admin")
}

make_links <- function(x) {
  if (is.na(x)) return(x)
  
  x_tokens <- str_split(x, ",")[[1]]
  
  token_names <- 
    str_extract(x_tokens, "(name|url) = \\\"") %>%
    str_sub(1, -5) %>%
    paste(if_else(. == "name", "-"," "), .)
  
  token_values <- 
    str_extract(x_tokens, "= \\\".+\\\"") %>%
    str_sub(4, -2)
  
  paste(token_names, token_values, sep = ": ")
}

pub_data <- 
  map_dfr(pubs, read_pub_data) %>%
  mutate(
    date = paste0("\"",date,"\""),
    publishDate = date,
    authors = map(authors, make_authors),
    publication_types = str_sub(publication_types, 2, -2),
    publication_types = map(publication_types, ~ c(paste("-",.))),
    links = map(url_custom, make_links),
    projects = "[]",
    tags = "",
    slides = "",
    summary = "",
    image = ""
  ) %>%
  mutate_at(vars(starts_with("url")), ~ if_else(is.na(.), "", .)) %>%
  select(
    pub, date, publication_types, 
    authors, publishDate, title, 
    publication, abstract,
    featured = highlight, image, projects, tags, 
    slides, summary, links,
    url_preprint, url_code, url_dataset, url_pdf, url_poster,
    url_project, url_slides, url_source, url_video,
    plain_lines
  )

  
pub_lines <- 
  pub_data %>%
  mutate(
    path = str_remove(pub, ".md"),
    pub = str_replace(pub, ".md", "/index.md")
  ) %>%
  group_by(pub, path) %>%
  mutate_if(~ !is.list(.), ~ list(.)) %>%
  pivot_longer(cols = c(-pub,-path, -plain_lines), names_to = "key", values_to = "val") %>%
  mutate(
    string_single = if_else(key %in% c("publication_types","authors","links"),
                      "", paste(key, val, sep = ": ")),
    string_single = map(string_single, ~ list(.)),
    string_list = map2(key, val, ~ c(paste0(.x, ":"),.y)),
    string = if_else(key %in% c("publication_types","authors","links"),
                     string_list, string_single)
  ) %>%
  summarise(
    string = list(c("---",unlist(string),"---",plain_lines[[1]]))
  )


pub_lines %>%
  mutate(
    # path = walk(path, dir.create),
    out = walk2(string, pub, ~ write_lines(.x, path = .y))
  )
  