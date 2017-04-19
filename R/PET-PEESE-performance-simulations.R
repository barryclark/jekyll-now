#--------------------------------------------
# required packages
# install.packages("metafor")
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

dat <- r_SMD(studies = 50, mean_effect = 0.4, sd_effect = 0.2, 
             n_min = 12, n_max = 50, na = 1, nb = 1, 
             p_thresholds = .05, p_RR = 1)


#--------------------------------------------
# estimate overall average effects
# using random effects, fixed effects,
# PET, PEESE, and modified versions of 
# PET (SPET) and PEESE (SPEESE)
#--------------------------------------------

estimate_effects <- function(dat, studies = nrow(dat)) {
  require(metafor)
  
  dat$sd <- sqrt(dat$Vg)
  dat$Va <- 2 / dat$n
  dat$sda <- sqrt(dat$Va)
  dat$Top <- 1:studies %in% order(dat$n)[studies - 0:9]
  
  RE_meta <- rma(yi = g, vi = Vg, data = dat, method = "HE")
  FE_meta <- rma(yi = g, vi = Vg, data = dat, method = "FE")
  Top10 <- rma(yi = g, vi = Vg, data = subset(dat, Top), method = "FE")
  PET <- lm(g ~ sd, data = dat, weights = 1 / Vg) 
  PEESE <- lm(g ~ Vg, data = dat, weights = 1 / Vg)
  PET_test <- coef(PET)[[2]] / sqrt(diag(summary(PET)$cov.unscaled)[[2]]) > qnorm(0.975)
  SPET <- lm(g ~ sda, data = dat, weights = 1 / Va) 
  SPEESE <- lm(g ~ Va, data = dat, weights = 1 / Va)
  SPET_test <- coef(SPET)[[2]] / sqrt(diag(summary(SPET)$cov.unscaled)[[2]]) > qnorm(0.975)
  
  data.frame(
    RE_meta = RE_meta$b,
    FE_meta = FE_meta$b,
    Top_10 = Top10$b,
    PET = coef(PET)[[1]],
    PEESE = coef(PEESE)[[1]],
    PET_PEESE = ifelse(PET_test, coef(PEESE)[[1]], coef(PET)[[1]]),
    SPET = coef(SPET)[[1]],
    SPEESE = coef(SPEESE)[[1]],
    SPET_SPEESE = ifelse(SPET_test, coef(SPEESE)[[1]], coef(SPET)[[1]])
  )
}

estimate_effects(dat)

#------------------------------------------------------
# Simulation Driver
#------------------------------------------------------

runSim <- function(reps, 
                   studies, mean_effect, sd_effect, 
                   n_min, n_max, na, nb, 
                   p_thresholds = .05, p_RR = .1,
                   seed = NULL, ...) {
  require(purrr)
  require(dplyr)
  
  if (!is.null(seed)) set.seed(seed)
  
  rerun(reps, {
    r_SMD(studies, mean_effect, sd_effect, n_min, n_max, na, nb, p_thresholds, p_RR) %>%
    estimate_effects()
  }) %>%
  bind_rows() %>%
    summarise_all(funs(M = mean, V = var))
}

source_obj <- ls()

#--------------------------------------------------------
# Simulation conditions from http://datacolada.org/59
#--------------------------------------------------------

set.seed(20170417)

design_factors <- list(studies = c(50, 100),
                       mean_effect = seq(0,1,0.1), 
                       sd_effect = c(0, 0.1, 0.2, 0.3),
                       n_min = 12,
                       n_max = c(50, 120),
                       na = c(1, 3),
                       nb = c(1, 3),
                       p_RR = c(1, 0.2, 0))

lengths(design_factors)
prod(lengths(design_factors))

params <- expand.grid(design_factors)
params <- subset(params, na == 1 | nb == 1)
params$reps <- 1000
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

cluster <- start_parallel(source_obj = source_obj, packages = "purrr")

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

save(params, results, session_info, run_date, file = "files/PET-PEESE Simulation Results.Rdata")


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
  select(-reps, -seed) %>%
  mutate(
    study_dist = ifelse(na == nb, "Uniform distribution of studies", 
                        ifelse(na > nb, "More small studies", "More large studies")),
    study_dist = factor(study_dist, 
                        levels = c("More small studies","Uniform distribution of studies","More large studies"))
  ) %>%
  unnest() %>%
  gather("estimator","val", ends_with("_M"), ends_with("_V")) %>%
  separate(estimator, c("estimator","stat"), sep = -2) %>%
  spread(stat, val) %>%
  mutate(
    estimator = str_replace(str_sub(estimator, 1, -2), "_","-"),
    estimator = factor(estimator, levels = c("FE-meta","RE-meta","Top-10","PET","PEESE","PET-PEESE","SPET","SPEESE","SPET-SPEESE")),
    RMSE = sqrt((M - mean_effect)^2 + V)
  )

table(results$estimator)

bias_plot <- function(dat) {
  ggplot(dat, aes(mean_effect, M, color = estimator, shape = estimator)) + 
    geom_point() + geom_line() + 
    geom_abline(slope = 1, intercept = 0) + 
    facet_grid(sd_effect ~ study_dist) + 
    theme_light()
}

RMSE_plot <- function(dat) {
  ggplot(dat, aes(mean_effect, RMSE, color = estimator, shape = estimator)) + 
    geom_point() + geom_line() + 
    facet_grid(sd_effect ~ study_dist, scales = "free_y") + 
    theme_light()
}

selected_estimators <- c("FE-meta","Top-10","PET-PEESE","SPEESE","SPET","SPET-SPEESE")

#-------------------------------
# Expectation plots
#-------------------------------

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

-------------------------------------------
# expectation of SMD given n
-------------------------------------------
  
library(purrr)
library(tidyr)
library(dplyr)
library(ggplot2)

SMD_means <- 
  list(studies = 1000,
       mean_effect = seq(0,1,0.2), 
       sd_effect = c(0, 0.1, 0.2, 0.3),
       n_min = 10:100,
       p_RR = c(1, 0.2, 0)) %>%
  cross_d() %>%
  mutate(
    n_max = n_min,
    na = 1,
    nb = 1
  ) %>%
  invoke_rows(.d = ., .f = r_SMD, .to = "SMD") %>%
  unnest() %>%
  group_by(mean_effect, sd_effect, n_min, p_RR) %>%
  summarise(E_SMD = mean(g))

ggplot(SMD_means, aes(2 / n_min, E_SMD, color = factor(mean_effect))) +
  geom_smooth(method = "loess", se = FALSE) + 
  geom_hline(aes(yintercept = mean_effect, color = factor(mean_effect)), linetype = "dotted") + 
  expand_limits(x = 0) + 
  facet_grid(p_RR ~ sd_effect, labeller = "label_both") + 
  theme_light() + 
  labs(x = "2 / n", y = "E(SMD)", color = "true mean effect")