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

r_SMD <- function(studies, mean_effect, sd_effect, n_min, n_max, na, nb, p_thresholds = .025, p_RR = .1) {
  
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
    p_onesided <- pt(t_i, df = df, lower.tail = FALSE)
    p_twosided <- 2 * pt(abs(t_i), df = df, lower.tail = FALSE)
    
    # effect censoring based on p-values
    p_observed <- c(1, p_RR)[cut(p_onesided, c(0, p_thresholds, 1), labels = FALSE)]
    observed <- runif(studies) < p_observed
    
    # put it all together
    if (nrow(dat) + sum(observed) > studies) observed <- which(observed)[1:(studies - nrow(dat))]
    new_dat <- data.frame(n = n_i[observed], t = t_i[observed], p = p_twosided[observed])
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
             p_thresholds = .025, p_RR = 0)


#--------------------------------------------
# estimate overall average effects
# using random effects, fixed effects,
# PET, PEESE, and modified versions of 
# PET (SPET) and PEESE (SPEESE)
#--------------------------------------------

TF_extract <- function(tf, V) {
  if ("rma.uni.trimfill" %in% class(tf)) {
    with(tf, data.frame(V = V, estimator = k0.est, est = as.numeric(b), se = se, p_val = pval, k0 = k0, p_nomissing = p.k0))  
  } else if ("ranktest.rma" %in% class(tf)) {
    with(tf, data.frame(V = V, estimator = "BM", est = NA, se = NA, p_val = NA, k0 = NA, p_nomissing = pval))
  } else {
    with(tf, data.frame(V = V, estimator = method, est = as.numeric(b), se = se, p_val = pval, k0 = NA, p_nomissing = NA))  
  }
}

TF_BM_tests <- function(dat, studies = nrow(dat)) {
  
  dat <- within(dat, {
    sd <- sqrt(Vg)
    Va <- 2 / n
    sda <- sqrt(Va)
    Top <- (1:studies) %in% (order(dat$n, decreasing = TRUE)[1:10])
  })
    
  require(metafor)
  rma_se <- rma(yi = g, vi = Vg, data = dat, method = "FE")
  ranktest_se <- ranktest(rma_se)
  TF_se_L0 <- trimfill(rma_se, estimator = "L0", side = "left")
  TF_se_R0 <- trimfill(rma_se, estimator = "R0", side = "left")
  
  rma_sa <- rma(yi = g, vi = Va, data = dat, method = "FE")
  ranktest_sa <- ranktest(rma_sa)
  TF_sa_L0 <- trimfill(rma_sa, estimator = "L0", side = "left")
  TF_sa_R0 <- trimfill(rma_sa, estimator = "R0", side = "left")
  
  rbind(
    TF_extract(rma_se, V = "se"),
    TF_extract(ranktest_se, V = "se"),
    TF_extract(TF_se_L0, V = "se"),
    TF_extract(TF_se_R0, V = "se"),
    TF_extract(rma_sa, V = "sa"),
    TF_extract(ranktest_sa, V = "sa"),
    TF_extract(TF_sa_L0, V = "sa"),
    TF_extract(TF_sa_R0, V = "sa")
  )
}

TF_BM_tests(dat)

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
      TF_BM_tests()
  }) %>%
  bind_rows() %>%
    group_by(estimator, V) %>% 
    summarise(
      est_M = mean(est),
      est_V = var(est),
      k0_M = mean(k0),
      k0_V = var(k0),
      reject_nomissing_025 = mean(p_nomissing < .025),
      reject_nomissing_050 = mean(p_nomissing < .050)
    )
}

runSim(reps = 10, studies = 100, mean_effect = 0.0, sd_effect = 0.2, 
       n_min = 12, n_max = 120, na = 1, nb = 1, p_thresholds = .025, p_RR = 0.2)

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
params$reps <- 2000
params$seed <- round(runif(1) * 2^30) + 1:nrow(params)
nrow(params)
head(params)

#--------------------------------------------------------
# run simulations in parallel
#--------------------------------------------------------

library(purrrlyr)
library(dplyr)
library(multidplyr)
library(Pusto)

cluster <- start_parallel(source_obj = source_obj, packages = "purrrlyr")

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

save(params, results, session_info, run_date, file = "files/Trim-and-Fill-Simulation-Results.Rdata")
