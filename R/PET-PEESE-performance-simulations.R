#--------------------------------------------
# required packages
# install.packages("sandwich")
# install.packages("purrr")
# install.packages("dplyr")
# install.packages("stringr")
# install.packages("tidyr")
# install.packages("ggplot2")
# devtools::install_github("hadley/multidplyr")
# devtools::install_github("jepusto/Pusto")
#--------------------------------------------

rm(list=ls())

#--------------------------------------------
# simulate standardized mean differences
#--------------------------------------------

r_SMD <- function(studies, mean_effect, sd_effect, n_min, n_max, na, nb, p_thresholds = .05, p_RR = .1) {
  
  n_diff <- n_max - n_min
  
  # sample t-statistics until sufficient number of studies obtained
  dat <- data.frame()
  while (nrow(dat) < studies) {
    # simulate true effects
    delta_i <- rnorm(studies, mean = mean_effect, sd = sd_effect)
    
    # simulate sample sizes
    n_i <- round(n_min + n_diff * rbeta(n = studies, shape1 = na, shape2 = nb))
    df <- 2 * (n_i - 1)
    
    # simulate t-statistics and p-values
    t_i <- rnorm(n = studies, mean = delta_i * sqrt(n_i / 2)) / sqrt(rchisq(n = studies, df = df) / df)
    p_pseudo <- 2 * pt(t_i, df = df, lower.tail = FALSE)
    p_i <- 2 * pt(abs(t_i), df = df, lower.tail = FALSE)
    
    # effect censoring based on p-values
    p_observed <- c(1, p_RR)[cut(p_pseudo, c(0, p_thresholds, 2), labels = FALSE)]
    observed <- runif(studies) < p_observed
    
    # put it all together
    if (nrow(dat) + sum(observed) > studies) observed <- which(observed)[1:(studies - nrow(dat))]
    new_dat <- data.frame(n = n_i[observed], t = t_i[observed], p = p_i[observed])
    dat <- rbind(dat, new_dat)
  }
  
  # calculate standardized mean difference estimates (Hedges' g's)
  J_i <- with(dat, 1 - 3 / (8 * n - 9))
  dat$g <- with(dat, J_i * sqrt(2 / n) * t)
  dat$Vg <- with(dat, J_i^2 * (2 / n + g^2 / (4 * (n - 1))))
  
  return(dat)
}

studies <- 100
dat <- r_SMD(studies = studies, mean_effect = 0.4, sd_effect = 0.2, 
             n_min = 12, n_max = 50, na = 1, nb = 1, 
             p_thresholds = .05, p_RR = 0)


#--------------------------------------------
# estimate overall average effects
# using random effects, fixed effects,
# PET, PEESE, and modified versions of 
# PET (SPET) and PEESE (SPEESE)
#--------------------------------------------

MA_test <- function(formula, dat, wt, estimator) {
  wt <- eval(substitute(wt), dat)
  lm_fit <- lm(as.formula(formula), weights = wt, data = dat)
  est <- coef(lm_fit)
  vcr <- vcovHC(lm_fit, type = "HC2")
  se <- sqrt(diag(vcr))
  data.frame(
    estimator = estimator,
    coef = names(est),
    est = as.numeric(est),
    se = se,
    p_val = pnorm(est / se, lower.tail = FALSE)
  )
}

estimate_effects <- function(dat, studies = nrow(dat)) {
  require(sandwich)
  dat <- within(dat, {
    sd <- sqrt(Vg)
    Va <- 2 / n
    sda <- sqrt(Va)
    Top <- (1:studies) %in% (order(dat$n, decreasing = TRUE)[1:10])
  })
    
  FE_meta <- MA_test("g ~ 1", dat = dat, wt = 1 / Vg, "FE-meta")
  Top_10 <- MA_test("g ~ 1", dat = subset(dat, Top), wt = 1 / Vg, "Top-10")
  
  PET <- MA_test("g ~ sd", dat = dat, wt = 1 / Vg, "PET") 
  PEESE <- MA_test("g ~ Vg", dat = dat, wt = 1 / Vg, "PEESE")
  PET_PEESE <- if (PET$p_val[1] < .10) PEESE[1,] else PET[1,]
  PET_PEESE$estimator <- "PET-PEESE"
  
  SPET <- MA_test("g ~ sda", dat = dat, wt = 1 / Va, "SPET") 
  SPEESE <- MA_test("g ~ Va", dat = dat, wt = 1 / Va, "SPEESE")
  SPET_SPEESE <- if (SPET$p_val[1] < .10) SPEESE[1,] else SPET[1,]
  SPET_SPEESE$estimator <- "SPET-SPEESE"
  
  rbind(FE_meta, Top_10, PET, PEESE, PET_PEESE, SPET, SPEESE, SPET_SPEESE)
}

estimate_effects(dat)

#------------------------------------------------------
# Simulation Driver
#------------------------------------------------------

runSim <- function(reps, 
                   studies, mean_effect, sd_effect, 
                   n_min, n_max, na, nb, 
                   p_thresholds = .05, p_RR = 1,
                   seed = NULL, ...) {
  require(purrr)
  require(dplyr)
  
  if (!is.null(seed)) set.seed(seed)
  
  rerun(reps, {
    r_SMD(studies, mean_effect, sd_effect, n_min, n_max, na, nb, p_thresholds, p_RR) %>%
    estimate_effects()
  }) %>%
  bind_rows() %>%
    group_by(estimator, coef) %>% 
    summarise(
      est_M = mean(est),
      est_V = var(est),
      reject_025 = mean(p_val < .025),
      reject_050 = mean(p_val < .050)
    )
}

runSim(reps = 100, studies = 100, mean_effect = 0.0, sd_effect = 0.2, 
       n_min = 12, n_max = 120, na = 1, nb = 1, p_thresholds = .05, p_RR = 1)

source_obj <- ls()

#--------------------------------------------------------
# Simulation conditions based on http://datacolada.org/59
#--------------------------------------------------------

set.seed(20170417)

design_factors <- list(studies = 100,
                       mean_effect = seq(0, 1, 0.1), 
                       sd_effect = c(0, 0.1, 0.2, 0.4),
                       n_min = 12,
                       n_max = c(50, 120),
                       na = c(1, 3),
                       nb = c(1, 3),
                       p_RR = c(1, 0.2, 0))

lengths(design_factors)
prod(lengths(design_factors))

params <- expand.grid(design_factors)
params <- subset(params, na == 1 | nb == 1)
params$reps <- 5000
params$seed <- round(runif(1) * 2^30) + 1:nrow(params)
nrow(params)
head(params)

#--------------------------------------------------------
# run simulations in parallel
#--------------------------------------------------------

library(purrr)
library(dplyr)
library(multidplyr)
library(Pusto)

cluster <- start_parallel(cores = 4, source_obj = source_obj, packages = "purrr")

system.time(
  results <- 
    params %>%
    partition(cluster = cluster) %>%
    do(invoke_rows(.d = ., .f = runSim, .to = "res")) %>%
    collect() %>% ungroup() %>%
    select(-PARTITION_ID)
)

#--------------------------------------------------------
# Save results and details
#--------------------------------------------------------

session_info <- sessionInfo()
run_date <- date()

save(params, results, session_info, run_date, file = "files/PET-PEESE-Simulation-Results.Rdata")


#--------------------------------------------------------
# Graphs
#--------------------------------------------------------
library(stringr)
library(tidyr)
library(dplyr)
library(ggplot2)

load("files/PET-PEESE Simulation Results.Rdata")

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

#-------------------------------
# Expectation plots
#-------------------------------

bias_plot <- function(dat) {
  ggplot(dat, aes(mean_effect, M, color = estimator, shape = estimator)) + 
    geom_point() + geom_line() + 
    geom_abline(slope = 1, intercept = 0) + 
    facet_grid(sd_effect ~ study_dist) + 
    theme_light()
}

selected_estimators <- c("FE-meta","Top-10","PEESE","SPET","SPEESE","SPET-SPEESE")

# maximum study size of 50, no publication bias

results %>%
  filter(studies == 100, p_RR == 1, n_max == 50, estimator %in% selected_estimators) %>%
  bias_plot()

# maximum study size of 120, no publication bias

results %>%
  filter(studies == 100, p_RR == 1, n_max == 120, estimator %in% selected_estimators) %>%
  bias_plot()

# maximum study size of 50, with intermediate publication bias

results %>%
  filter(studies == 100, p_RR == 0.2, n_max == 50, estimator %in% selected_estimators) %>%
  bias_plot()

# maximum study size of 120, with intermediate publication bias

results %>%
  filter(studies == 100, p_RR == 0.2, n_max == 120, estimator %in% selected_estimators) %>%
  bias_plot()

# maximum study size of 50, with strong publication bias

results %>%
  filter(studies == 100, p_RR == 0, n_max == 50, estimator %in% selected_estimators) %>%
  bias_plot()

# maximum study size of 120, with strong publication bias

results %>%
  filter(studies == 100, p_RR == 0, n_max == 120, estimator %in% selected_estimators) %>%
  bias_plot()

#-------------------------------
# RMSE plots
#-------------------------------

RMSE_plot <- function(dat) {
  ggplot(dat, aes(mean_effect, RMSE, color = estimator, shape = estimator)) + 
    geom_point() + geom_line() + 
    facet_grid(sd_effect ~ study_dist, scales = "free_y") + 
    theme_light()
}

selected_estimators <- c("FE-meta","Top-10","PEESE","SPET","SPEESE","SPET-SPEESE")


# maximum study size of 50, no publication bias

results %>%
  filter(studies == 100, p_RR == 1, n_max == 50, estimator %in% selected_estimators) %>%
  RMSE_plot()

# maximum study size of 120, no publication bias

results %>%
  filter(studies == 100, p_RR == 1, n_max == 120, estimator %in% selected_estimators) %>%
  RMSE_plot()

# maximum study size of 50, with intermediate publication bias

results %>%
  filter(studies == 100, p_RR == 0.2, n_max == 50, estimator %in% selected_estimators) %>%
  RMSE_plot()

# maximum study size of 120, with intermediate publication bias

results %>%
  filter(studies == 100, p_RR == 0.2, n_max == 120, estimator %in% selected_estimators) %>%
  RMSE_plot()

# maximum study size of 50, with strong publication bias

results %>%
  filter(studies == 100, p_RR == 0, n_max == 50, estimator %in% selected_estimators) %>%
  RMSE_plot()

# maximum study size of 120, with strong publication bias

results %>%
  filter(studies == 100, p_RR == 0, n_max == 120, estimator %in% selected_estimators) %>%
  RMSE_plot()

