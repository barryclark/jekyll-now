library(dplyr)
library(tidyr)
library(purrr)
library(purrrlyr)
library(stringr)
library(ggplot2)
library(metafor)

a <- read.csv("http://datacolada.org/wp-content/uploads/2017/10/Smaller-ManyLabs-Cleaned-Dataset-file.csv")  

# labs <- 26
# referrer <- factor(rep(LETTERS, rpois(labs, lambda = 40)))
# n <- length(referrer)
# anch1group <- sample(c(0,1), size = n, replace = TRUE)
# anch2group <- sample(c(0,1), size = n, replace = TRUE)
# anch3group <- sample(c(0,1), size = n, replace = TRUE)
# anch4group <- sample(c(0,1), size = n, replace = TRUE)
# Ranch1 <- rnorm(n, mean = 0, sd = 1)
# Ranch2 <- rnorm(n, mean = ifelse(anch2group==1, 0.5, 0), sd = 1)
# Ranch3 <- rnorm(n, mean = ifelse(anch4group==1, 0.5, 0), sd = 1) + 
#   rnorm(nlevels(referrer), sd = 0.3)[referrer]
# Ranch4 <- rnorm(n, mean = ifelse(anch4group==1, 0.5, 0), sd = rexp(labs, rate = 1)[referrer]) + 
#   rnorm(labs, sd = 0.3)[referrer]
# 
# a <- data.frame(referrer, anch1group, anch2group, anch3group, anch4group, 
#                 Ranch1, Ranch2, Ranch3, Ranch4)

#----------------------------------------------------
# turn data into long format for easier processing
#----------------------------------------------------

long_dat <- 
  a %>%
  select(lab = referrer, Ranch1:Ranch4, anch1group:anch4group) %>%
  mutate(id = row_number()) %>%
  gather("x","val", Ranch1:Ranch4, anch1group:anch4group) %>%
  mutate(
    dv = str_extract(x, "[1-4]"),
    group = ifelse(str_sub(x, 1, 5)=="Ranch", "y", "group")
  ) %>%
  select(-x) %>%
  spread(group, val)


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

run_meta_RT <- function(x, group, lab, reps = 1000, seed = NULL, 
                          graph = TRUE, all_results = FALSE) {
  
  meta_actual <- metak(x = x, group = group, lab = lab)
  meta_null <- meta_reps(x = x, group = group, lab = lab, reps = reps, seed = seed)
  
  if (graph) {
    p <- par("mfrow")
    par(mfrow=c(2,2))
    
    b_rng <- range(c(meta_actual$b, meta_null$b))
    hist(meta_null$b, main="Effect size", xlab = "", xlim = b_rng)
    abline(v = meta_actual$b, col = "red")
    
    p_rng <- range(c(meta_actual$p, meta_null$p))
    hist(meta_null$p, main="p-value for heterogeneity under the null", xlab = "", xlim = p_rng)
    abline(v = meta_actual$p, col = "red")
    
    Isq_rng <- range(c(meta_actual$Isq, meta_null$Isq))
    hist(meta_null$Isq, main="Distribution of I2 under-null", xlab = "", xlim = Isq_rng)
    abline(v = meta_actual$Isq, col = "red")
    
    tau_rng <- range(c(meta_actual$tau, meta_null$tau))
    hist(meta_null$tau, main="tau", xlab = "", xlim = tau_rng)
    abline(v = meta_actual$tau, col = "red")
    
    par(mfrow = p)  
  }
  
  summary_vals <- data_frame(
    p_b = mean(abs(meta_actual$b) < abs(meta_null$b)),
    p_p = mean(meta_actual$p > meta_null$p),
    p_Isq = mean(meta_actual$Isq < meta_null$Isq),
    median_Isq = median(meta_null$Isq),
    sig_p = mean(meta_null$p < .05)
  )
  
  if (all_results) {
    return(list(summary_vals = summary_vals, actual = meta_actual, sim = meta_null))
  } else {
    return(summary_vals)
  }
}

#-----------------------------------------------
# Replicate Uri's randomization test analysis
#-----------------------------------------------

long_dat %>%
  group_by(dv) %>%
  do(metak(x = .$y, group = .$group, lab = .$lab))

long_dat %>%
  group_by(dv) %>%
  do(run_meta_RT(x = .$y, group = .$group, lab = .$lab, graph = TRUE))

# Note that the actual average effect size estimates are far outside the range of simulated values.
# This means that the simulation process (re-randomizing the lab) is imposing a further restriction
# in addition to the null of zero between-study heterogeneity.


# Uri's simulated data

Uri_sim_dat <- 
  select(a, group = anch1group, lab = referrer) %>%
  mutate(
    y1 = rnorm(n(), mean = 0, sd = 1),
    y2 = rnorm(n(), mean = ifelse(group==1, 0.5, 0), sd = 1),
    y3 = rnorm(n(), mean = ifelse(group==1, nchar(as.character(lab)) / 8, 0), sd = 1)
  ) %>%
  gather("mod","y", y1:y3)

Uri_sim_dat %>%
  group_by(mod) %>%
  do(run_meta_RT(x = .$y, group = .$group, lab = .$lab, graph = TRUE))

#-----------------------------------------------
# Calculate summary statistics
#-----------------------------------------------

summary_stats <- 
  long_dat %>%
  group_by(dv, lab, group) %>%
  summarize(
    m = mean(y, na.rm = TRUE),
    sd = sd(y, na.rm = TRUE),
    n = sum(!is.na(y)),
    nas = sum(is.na(y))
  ) %>%
  summarise(
    N = sum(n),
    na_pct = sum(nas) / sum(nas + N),
    f = n[group==1] / N,
    m0 = m[group==0],
    m1 = m[group==1],
    sd_pooled = sqrt(sum((n - 1) * sd^2) / sum(n - 1))
  ) %>%
  mutate(
    mean_diff = m1 - m0,
    d = mean_diff / sd_pooled
  )

summary_stats %>%
  ungroup() %>%
  select(-dv, -lab) %>%
  cor()

ggplot(summary_stats, aes(sd_pooled, mean_diff, size = N)) + 
  geom_point() + 
  facet_wrap(~ dv, scales = "free") + 
  theme_minimal()


#-----------------------------------------------
# Simulated data that matches summary stats
#-----------------------------------------------

James_sim_dat <- 
  long_dat %>%
  left_join(summary_stats, by = c("dv", "lab")) %>%
  mutate(
    y = ifelse(is.na(y), NA, 
               m0 + (rt(n(), df = 3) + ifelse(group==1, 0.5, 0)) * sd_pooled)
  ) %>%
  select(dv, lab, group, y)

James_sim_dat %>%
  group_by(dv) %>%
  do(run_meta_RT(x = .$y, group = .$group, lab = .$lab, graph = TRUE))

#-----------------------------------------------
# randomization test after transformation
#-----------------------------------------------

meta_results <- 
  long_dat %>%
  group_by(dv) %>%
  do(metak(x = .$y, group = .$group, lab = .$lab))

transformed_dat <- 
  long_dat %>%
  left_join(meta_results, by = "dv") %>%
  left_join(summary_stats, by = c("dv", "lab")) %>%
  mutate(
    y_t1 = (y - m0) / sd_pooled,
    y_t2 = (y - ifelse(group==0, m0, m1)) / sd_pooled + ifelse(group==1, b, 0)
  ) %>%
  select(dv, lab, group, starts_with("y"))

transformed_dat %>%
  group_by(dv) %>%
  do(run_meta_RT(x = .$y_t1, group = .$group, lab = .$lab, graph = TRUE))

transformed_dat %>%
  group_by(dv) %>%
  do(run_meta_RT(x = .$y_t2, group = .$group, lab = .$lab, graph = TRUE))

