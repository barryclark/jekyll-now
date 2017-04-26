## ----setup, include = FALSE----------------------------------------------

library(knitr)
opts_chunk$set(echo = FALSE, warning = FALSE, message = FALSE)
library(stringr)
library(tidyr)
library(dplyr)
library(ggplot2)

load("files/PET-PEESE-Simulation-Results.Rdata")


## ----cleaning------------------------------------------------------------

results <- 
  results %>%
  mutate(
    study_dist = ifelse(na == nb, "Uniform distribution of sample sizes", 
                        ifelse(na > nb, "More large studies", "More small studies")),
    study_dist = factor(study_dist, 
                        levels = c("More small studies","Uniform distribution of sample sizes","More large studies")),
    heterogeneity = paste("Between-study SD:", sd_effect),
    selection_level = factor(p_RR, levels = c(1, 0.2, 0), labels = c("No publication bias", "Intermediate publication bias", "Strong publication bias"))
  ) %>%
  select(-reps, -seed, -studies, -na, -nb, -n_min) %>%
  unnest() %>%
  mutate(
    RMSE = sqrt((est_M - mean_effect)^2 + est_V)
  )


## ----rejection_rates-----------------------------------------------------

Type_I_error_rates <- 
  results %>% 
  filter(coef != "(Intercept)", p_RR == 1) %>%
  select(-coef, -p_RR, -est_M, -est_V, -RMSE) %>%
  gather("rate","reject", starts_with("reject")) %>%
  mutate(rate = as.numeric(str_sub(rate,-3,-1)) / 1000)

rejection_rate_plot <- function(dat) {
  rate <- unique(dat$rate)
  ggplot(dat, aes(mean_effect, reject, linetype = estimator, color = factor(n_max))) + 
    geom_point() + geom_line() + 
    geom_hline(yintercept = rate, linetype = "dashed") + 
    facet_grid(heterogeneity ~ study_dist, scale = "free_y") + 
    coord_cartesian(ylim = c(0, 0.3)) + 
    theme_light() + 
    theme(legend.position = "bottom") + 
    labs(linetype = "", color = "Maximum n", x = "Mean effect size", y = "Rejection rate")
}

## ---- PET-PEESE-rejection-rates, fig.width = 8, fig.height = 8-----------

Type_I_error_rates %>%
  filter(estimator %in% c("PET","PEESE"), rate == .050) %>%
  rejection_rate_plot()


## ---- SPET-SPEESE-rejection-rates, fig.width = 8, fig.height = 8---------

Type_I_error_rates %>%
  filter(estimator %in% c("SPET","SPEESE"), rate == .050) %>%
  rejection_rate_plot()


## ----bias-of-PET-PEESE, fig.width = 8, fig.height = 8--------------------

estimator_performance <- 
  results %>%
  filter(coef == "(Intercept)") %>%
  select(-coef, -reject_025, -reject_050) %>%
  rename(maximum_n = n_max)
  
bias_plot <- function(dat) {
  title <- paste0(unique(dat$study_dist), ", maximum sample size of ", unique(dat$maximum_n))
  ggplot(dat, aes(mean_effect, est_M, color = estimator, shape = estimator)) + 
    geom_point() + geom_line() + 
    geom_abline(slope = 1, intercept = 0) + 
    coord_cartesian(ylim = c(0, 1)) + 
    facet_grid(heterogeneity ~ selection_level) + 
    theme_light() + 
    theme(legend.position = "bottom") + 
    labs(
      title = title, 
      color = "", shape = "", 
      x = "Mean effect size", y = "Expected value of estimator"
    )
}

estimator_performance %>%
  filter(study_dist == "Uniform distribution of sample sizes", 
         maximum_n == 50, 
         estimator %in% c("PET","PEESE","PET-PEESE")) %>%
  bias_plot()

## ----bias-of-SPET-SPEESE, fig.width = 8, fig.height = 8------------------

estimator_performance %>%
  filter(study_dist == "Uniform distribution of sample sizes", 
         maximum_n == 50, 
         estimator %in% c("FE-meta","PEESE","PET-PEESE","SPET","SPEESE","SPET-SPEESE")) %>%
  bias_plot()


## ----more-bias-of-SPET-SPEESE, fig.width = 8, fig.height = 8, fig.show = "hide"----

estimator_performance %>%
  filter(study_dist == "Uniform distribution of sample sizes", 
         maximum_n == 120, 
         estimator %in% c("FE-meta","PEESE","PET-PEESE","SPET","SPEESE","SPET-SPEESE")) %>%
  bias_plot()

estimator_performance %>%
  filter(study_dist == "More small studies", 
         maximum_n == 50, 
         estimator %in% c("FE-meta","PEESE","PET-PEESE","SPET","SPEESE","SPET-SPEESE")) %>%
  bias_plot()

estimator_performance %>%
  filter(study_dist == "More small studies", 
         maximum_n == 120, 
         estimator %in% c("FE-meta","PEESE","PET-PEESE","SPET","SPEESE","SPET-SPEESE")) %>%
  bias_plot()

estimator_performance %>%
  filter(study_dist == "More large studies", 
         maximum_n == 50, 
         estimator %in% c("FE-meta","PEESE","PET-PEESE","SPET","SPEESE","SPET-SPEESE")) %>%
  bias_plot()

estimator_performance %>%
  filter(study_dist == "More large studies", 
         maximum_n == 120, 
         estimator %in% c("FE-meta","PEESE","PET-PEESE","SPET","SPEESE","SPET-SPEESE")) %>%
  bias_plot()


## ------------------------------------------------------------------------
RMSE_plot <- function(dat) {
  ggplot(dat, aes(mean_effect, RMSE, color = estimator, shape = estimator)) + 
    geom_point() + geom_line() + 
    facet_grid(heterogeneity ~ study_dist, scales = "free_y") + 
    theme_light()
}

