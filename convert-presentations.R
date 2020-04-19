library(tidyverse)

talk_md <- "content/talks-old/ABAI-2013-effect-sizes.md"

talks <- 
  list.files("content/talks-old/", full.names = TRUE) %>%
  keep(~ .x != "content/talks-old/_index.md")

read_talk_data <- function(talk_md) {

  tibble(line = read_lines(talk_md)) %>%
    filter(!str_detect(line, "^#")) %>%
    filter(str_detect(line, " = ")) %>%
    mutate(
      talk = talk_md,
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
  rename(publishDate = date, date = time_start, featured = selected) %>%
  mutate_at(vars(abstract, event_url, url_video), ~ "") %>%
  mutate(
    url_custom = str_sub(str_extract(url_custom, "url = .+\\}"), 7, -2),
    url_pdf = if_else(!is.na(url_custom), url_custom, url_pdf),
    authors = "[]",
    projects = "",
    summary = "",
    tags = "[]"
  ) %>%
  mutate_at(vars(everything()), ~ if_else(is.na(.), "", .))


talk_lines <- 
  talk_data %>%
  select(-url_custom) %>%
  mutate(
    talk = str_replace(talk, "talks-old", "talk")
  ) %>%
  pivot_longer(-talk, names_to = "key", values_to = "val") %>%
  mutate(
    string = paste(key, val, sep = ": ")
  ) %>%
  group_by(talk) %>%
  summarise(
    string = list(c("---",string,"---"))
  )

talk_lines %>%
  mutate(
    out = walk2(string, talk, ~ write_lines(.x, path = .y))
  )
