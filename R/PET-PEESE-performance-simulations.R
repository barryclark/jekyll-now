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
    p_i <- 2 * pt(abs(t_i), df = df, lower.tail = FALSE)
    
    # effect censoring based on p-values
    p_observed <- c(1, p_RR)[cut(p_i, c(0, p_thresholds, 1), labels = FALSE)]
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

dat <- r_SMD(studies = 50, mean_effect = 0.4, sd_effect = 0.1, 
             n_min = 12, n_max = 50, na = 1, nb = 1, 
             p_thresholds = .05, p_RR = .1)

PET <- lm(g ~ sd, data = dat, weights = 1 / Vg) 

#--------------------------------------------
# estimate overall average effects
# using random effects, fixed effects,
# PET, PEESE, and modified versions of 
# PET (SPET) and PEESE (SPEESE)
#--------------------------------------------

estimate_effects <- function(dat) {
  require(metafor)
  
  dat$sd <- sqrt(dat$Vg)
  dat$Va <- 2 / dat$n
  dat$sda <- sqrt(dat$Va)
  
  RE_meta <- rma(yi = g, vi = Vg, data = dat, method = "HE")
  FE_meta <- rma(yi = g, vi = Vg, data = dat, method = "FE")
  PET <- lm(g ~ sd, data = dat, weights = 1 / Vg) 
  PEESE <- lm(g ~ Vg, data = dat, weights = 1 / Vg)
  SPET <- lm(g ~ sda, data = dat, weights = 1 / Va) 
  SPEESE <- lm(g ~ Va, data = dat, weights = 1 / Va)
  
  data.frame(
    RE_meta = RE_meta$b,
    FE_meta = FE_meta$b,
    PET = coef(PET)[[1]],
    PEESE = coef(PEESE)[[1]],
    SPET = coef(SPET)[[1]],
    SPEESE = coef(SPEESE)[[1]]
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
    summarise_all(mean)
}

source_obj <- ls()

#--------------------------------------------------------
# Simulation conditions from http://datacolada.org/59
#--------------------------------------------------------

set.seed(20170416)

design_factors <- list(studies = 100,
                       mean_effect = seq(0,1,0.1), 
                       sd_effect = c(0, 0.1, 0.2),
                       n_min = 12,
                       n_max = c(50, 120),
                       na = c(1, 3),
                       nb = c(1, 3),
                       p_RR = c(1L, 0L))
lengths(design_factors)
prod(lengths(design_factors))

params <- expand.grid(design_factors)
params <- filter(params, na == 1 | nb == 1)
params$reps <- 200
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
library(tidyr)
library(ggplot2)

results_long <- 
  results %>% 
  select(-reps, -seed) %>%
  mutate(
    study_dist = ifelse(na == nb, "Uniform", ifelse(na > nb, "More small", "More large")),
    study_dist = factor(study_dist, levels = c("More small","Uniform","More large"))
  ) %>%
  unnest() %>%
  gather("estimator","expectation", RE_meta:SPEESE)


# maximum study size of 50, no publication bias

results_long %>%
  filter(p_RR == 1, n_max == 50, na == 1 | nb == 1) %>%
  ggplot(aes(mean_effect, expectation, color = estimator, shape = estimator)) + 
    geom_point() + geom_line() + 
    geom_abline(slope = 1, intercept = 0) + 
    facet_grid(sd_effect ~ study_dist) + 
    theme_light()

# maximum study size of 120, no publication bias

results_long %>%
  filter(p_RR == 1, n_max == 120, na == 1 | nb == 1) %>%
  ggplot(aes(mean_effect, expectation, color = estimator, shape = estimator)) + 
  geom_point() + geom_line() + 
  geom_abline(slope = 1, intercept = 0) + 
  facet_grid(sd_effect ~ study_dist) + 
  theme_light()

# maximum study size of 50, with publication bias

results_long %>%
  filter(p_RR < 1, n_max == 50, na == 1 | nb == 1) %>%
  ggplot(aes(mean_effect, expectation, color = estimator, shape = estimator)) + 
  geom_point() + geom_line() + 
  geom_abline(slope = 1, intercept = 0) + 
  facet_grid(sd_effect ~ study_dist) + 
  theme_light()

# maximum study size of 120, no publication bias

results_long %>%
  filter(p_RR < 1, n_max == 120, na == 1 | nb == 1) %>%
  ggplot(aes(mean_effect, expectation, color = estimator, shape = estimator)) + 
  geom_point() + geom_line() + 
  geom_abline(slope = 1, intercept = 0) + 
  facet_grid(sd_effect ~ study_dist) + 
  theme_light()
