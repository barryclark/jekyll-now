library(dplyr)
library(tidyr)
library(purrr)
library(purrrlyr)
library(metafor)

rm(list=ls())

metak <- function(x, group, lab, method = "HE") {
  
  m <- tapply(x, list(lab, group), mean, na.rm = TRUE)
  s <- tapply(x, list(lab, group), sd, na.rm = TRUE)
  n <- tapply(x, list(lab, group), function(x) sum(!is.na(x)))
  
  meta <- rma(measure="SMD",
              m1i = m[,1], m2i= m[,2], 
              sd1i = s[,1], sd2i = s[,2], 
              n1i = n[,1], n2i = n[,2],
              method = method)
  
  with(meta, data.frame(b = as.numeric(b), tau = sqrt(tau2), Isq = I2, p = QEp))
}

meta_reps <- function(x, group, lab, reps = 1000, seed = NULL) { 
  if (!is.null(seed)) set.seed(seed)
  
  rerun(reps, {
    lab_resample <- sample(lab)
    metak(x = x, group = group, lab = lab_resample)
  }) %>%
    bind_rows()
}

run_meta_RT <- function(x, group, lab, reps = 1000, seed = NULL) {
  
  meta_actual <- metak(x = x, group = group, lab = lab)
  meta_null <- meta_reps(x = x, group = group, lab = lab, reps = reps, seed = seed)
  
  data_frame(
    p_b = mean(abs(meta_actual$b) < abs(meta_null$b)),
    p_p = mean(meta_actual$p > meta_null$p),
    p_Isq = mean(meta_actual$Isq < meta_null$Isq)
  )
}

#------------------------------------------------------
# Simulate rejection rates of Uri's randomization test
#------------------------------------------------------

sim_reject_rate <- function(lab_n, ES = 0, btw = 0, df_scale = 0, df_err = Inf,
                            reps = 1000, RTs = 1000, alpha = 0.05, seed = NULL) {
  if (!is.null(seed)) set.seed(seed)
  
  n <- sum(lab_n)
  labs <- length(lab_n)
  lab <- factor(rep(1:labs, lab_n))
  group <- sample(c(0,1), n, replace = TRUE)
  
  rerun(reps, {
    y_btw <- rnorm(labs, mean = 0, sd = btw)
    scale <- if (df_scale > 0) rchisq(labs, df = df_scale) / df_scale else rep(1, labs)
    y <- (rt(n, df = df_err) + ifelse(group==1, ES, 0) + y_btw[lab]) * scale[lab]
    run_meta_RT(x = y, group = group, lab = lab, reps = RTs)  
  }) %>%
    bind_rows() %>%
    summarise_at(vars(starts_with("p_")), funs(mean(. < alpha)))
}

params <- cross_df(list(
  ES = c(0, 0.5), 
  btw = c(0, 0.3),
  df_scale = c(0, 10),
  df_err = c(Inf, 3)
))

lab_n <- c(68, 73, 67, 82, 87, 73, 71, 148, 66, 67, 233, 125, 
           83, 45, 926, 92, 113, 1196, 80, 90, 75, 142, 50, 
           110, 163, 80, 186, 57, 115, 99, 77, 91, 88, 84, 81, 79)

system.time(
  results <- 
    invoke_rows(sim_reject_rate, params, 
                lab_n = lab_n,
                reps = 10, RTs = 10)
)

results %>% 
  unnest()
