library(dplyr)
library(tidyr)
library(purrr)
library(stringr)
library(ggplot2)

a <- read.csv("http://datacolada.org/wp-content/uploads/2017/10/Smaller-ManyLabs-Cleaned-Dataset-file.csv")  

metak <- function(x, group, lab) {
  
  m <- tapply(x, list(lab, group), mean, na.rm = TRUE)
  s <- tapply(x, list(lab, group), sd, na.rm = TRUE)
  n <- tapply(x, list(lab, group), function(x) sum(!is.na(x)))
  
  
  meta_RE <- rma(measure="SMD",
                 m1i = m[,1], m2i= m[,2], 
                 sd1i = s[,1], sd2i = s[,2], 
                 n1i = n[,1], n2i = n[,2],
                 method="HE")
  
  with(meta_RE, data.frame(b = as.numeric(b), tau = sqrt(tau2), Isq = I2, p = QEp))
}

meta_boot <- function(x, group, lab, boots = 1000, seed = NULL) { 
  if (!is.null(seed)) set.seed(seed)
  
  rerun(boots, {
    lab.boot=sample(lab)
    metak(x = x, group = group, lab = lab.boot)
  }) %>%
    bind_rows()
}

run_meta_boot <- function(x, group, lab, boot = 1000, seed = NULL) {
  
  meta_actual <- metak(x = x, group = group, lab = lab)
  meta_null <- meta_boot(x = x, group = group, lab = lab, boot = boot, seed = seed)
  
  par(mfrow=c(2,2))
  
  b_rng <- range(c(meta_actual$b, meta_null$b))
  hist(meta_null$b, main="Effect size", xlab = "", xlim = b_rng)
  abline(v = meta_actual$b, col = "red")
  
  p_rng <- range(c(meta_actual$p, meta_null$p))
  hist(meta_null$p, main="p-value for heterogeneity under the null", xlim = p_rng)
  abline(v = meta_actual$p, col = "red")
  
  Isq_rng <- range(c(meta_actual$Isq, meta_null$Isq))
  hist(meta_null$Isq, main="Distribution of I2 under-null", xlim = Isq_rng)
  abline(v = meta_actual$Isq, col = "red")
  
  tau_rng <- range(c(meta_actual$tau, meta_null$tau))
  hist(meta_null$tau, main="tau", xlim = tau_rng)
  abline(v = meta_actual$tau, col = "red")
  
  
  list(actual = meta_actual, boot = meta_null)
}

#-----------------------------------------------
# Replicate Uri's bootstrapping approach
#-----------------------------------------------

Ranch1_res <- with(a, run_meta_boot(x = Ranch1, group = anch1group, lab = referrer))
Ranch2_res <- with(a, run_meta_boot(x = Ranch2, group = anch2group, lab = referrer))
Ranch3_res <- with(a, run_meta_boot(x = Ranch3, group = anch3group, lab = referrer))
Ranch4_res <- with(a, run_meta_boot(x = Ranch4, group = anch4group, lab = referrer))

# Note that the actual average effect size estimates are far outside the range of simulated values.
# This means that the simulation process (re-randomizing the lab) is imposing a further restriction
# in addition to the null of zero between-study heterogeneity.


# simulated data

sim_dat <- select(a, group = anch1group, lab = referrer)
n <- nrow(sim_dat)
sim_dat$y1 <- with(sim_dat, rnorm(n, mean = 0, sd = 1))
sim_dat$y2 <- with(sim_dat, rnorm(n, mean = ifelse(group==1, 0.5, 0), sd = 1))
sim_dat$y3 <- with(sim_dat, rnorm(n, mean = ifelse(group==1, nchar(as.character(lab)) / 8, 0), sd = 1))
sim_dat$y4 <- with(sim_dat, rnorm(n, mean = ifelse(group==1, 0.5, 0), sd = 1) + rnorm(nlevels(lab), sd = 0.3)[lab])
sim_dat$y5 <- with(sim_dat, rnorm(n, mean = ifelse(group==1, nchar(as.character(lab)) / 8, 0), sd = 1) + rnorm(nlevels(lab), sd = 0.3)[lab])

sim1_res <- with(sim_dat, run_meta_boot(x = y1, group = group, lab = lab))
mean(sim1_res$boot$p < .05)

sim2_res <- with(sim_dat, run_meta_boot(x = y2, group = group, lab = lab))
mean(sim2_res$boot$p < .05)

sim3_res <- with(sim_dat, run_meta_boot(x = y3, group = group, lab = lab))
mean(sim3_res$boot$p < .05)

sim4_res <- with(sim_dat, run_meta_boot(x = y4, group = group, lab = lab))
mean(sim4_res$boot$p < .05)

sim5_res <- with(sim_dat, run_meta_boot(x = y5, group = group, lab = lab))
mean(sim5_res$boot$p < .05)

#-----------------------------------------------
# Calculate summary statistics
#-----------------------------------------------


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
  

summary_stats <- 
  long_dat %>%
  group_by(lab, dv, group) %>%
  summarize(
    m = mean(y, na.rm = TRUE),
    sd = sd(y, na.rm = TRUE),
    n = sum(!is.na(y))
  ) %>%
  summarise(
    m0 = m[group==0],
    sd_pooled = sqrt(sum((n - 1) * sd^2) / sum(n - 1))
  )

ggplot(summary_stats, aes(sd_pooled)) + 
  geom_histogram() + 
  facet_wrap(~ dv, scales = "free") + 
  theme_minimal()

