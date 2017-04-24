#-------------------------------------------
# expectation of SMD given n
#-------------------------------------------
  
library(purrr)
library(tidyr)
library(dplyr)
library(ggplot2)

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

SMD_means <- 
  list(studies = 1000,
       mean_effect = seq(0,1,0.2), 
       sd_effect = c(0, 0.1, 0.2, 0.3),
       n_min = round(2 / seq(.005, .20, .005)),
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
  geom_point() + 
  geom_smooth(method = "loess", se = FALSE) + 
  geom_hline(aes(yintercept = mean_effect, color = factor(mean_effect)), linetype = "dotted") + 
  expand_limits(x = 0) + 
  facet_grid(p_RR ~ sd_effect, labeller = "label_both") + 
  theme_light() + 
  labs(x = "2 / n", y = "E(SMD)", color = "true mean effect")
