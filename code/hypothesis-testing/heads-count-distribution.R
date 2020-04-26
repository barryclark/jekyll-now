# images/hypothesis-testing/heads-count.png

library(ggplot2)
library(dplyr)

fill_cols = c("TRUE" = "lightsalmon", "FALSE" = "lightgrey")
size = 10
prob = 0.5
ps = dbinom(0:size, size, prob)

gg = tibble(x = 0:size, p = ps) %>%
  mutate(label = paste0(round(100 * p, 2), "%"),
         fill = as.character(x %in% c(0, 1, 9, 10))) %>%
  ggplot(aes(x, p, label = label, fill = fill)) +
  geom_bar(stat = "identity", color = "white") +
  geom_text(
    position = position_dodge(width = 0.9),
    vjust = -0.25
  ) +
  theme_light(base_size = 13) +
  scale_x_continuous(
    name = "Number of heads",
    breaks = as.integer(0:size),
    labels = as.integer(0:size)
  ) +
  scale_y_continuous(
    name = "Expected frequency",
    labels = scales::percent,
    breaks = seq(0, 1, .05),
    limits = c(0, max(ps) + 0.01)
  ) +
  scale_fill_manual(values = fill_cols, guide = FALSE)
