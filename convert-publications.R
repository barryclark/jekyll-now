library(tidyverse)

pubs <- 
  list.files("content/publication/", full.names = TRUE, pattern = ".+\\.md") %>%
  keep(~ .x != "content/publication/_index.md")

pub_md <- pubs[[1]]


read_talk_data <- function(pub_md) {
  
  txt <- tibble(line = read_lines(pub_md)) 
  
  txt %>%
    filter(!str_detect(line, "^#")) %>%
    filter(str_detect(line, " = ")) %>%
    mutate(
      pub = pub_md,
      line = str_split(line, " = ", n = 2),
      key = map_chr(line, ~ .[[1]]),
      val = map_chr(line, ~ .[[2]]),
    ) %>%
    select(-line) %>%
    pivot_wider(names_from = key, values_from = val)
}

talk_data <- 
  map_dfr(talks, read_talk_data) %>%
  select(-abstract_short) %>%
  