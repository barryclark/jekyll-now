## ----setup, include = FALSE----------------------------------------------
library(knitr)
opts_chunk$set(echo = FALSE, warning = FALSE, message = FALSE)
library(stringr)
library(tidyr)
library(dplyr)
library(ggplot2)
library(trelliscopejs)

load("../files/PET-PEESE Simulation Results.Rdata")

## ----cleaning------------------------------------------------------------

results <- 
  results %>%
  mutate(
    study_dist = ifelse(na == nb, "Uniform distribution of studies", 
                        ifelse(na > nb, "More large studies", "More small studies")),
    study_dist = factor(study_dist, 
                        levels = c("More small studies","Uniform distribution of studies","More large studies"))
  ) %>%
  select(-reps, -seed, -studies, -na, -nb, -n_min) %>%
  unnest() %>%
  mutate(
    RMSE = sqrt((est_M - mean_effect)^2 + est_V)
  )


## ---- eval=FALSE---------------------------------------------------------
## 
## plot_dat <-
##   results %>%
##   select(-n_min, -na, -nb, -V) %>%
##   rename(maximum_n = n_max) %>%
##   filter(estimator %in% selected_estimators) %>%
##   group_by(study_dist, studies, maximum_n) %>%
##   summarise(panel = panel(bias_plot(.)))
## 
## plot_dat %>%
##   trelliscope(name = "Estimator expectation", nrow = 1, ncol = 1, self_contained = TRUE)

