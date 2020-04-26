library(dplyr)
library(readr)
library(ggplot2)

tail_prob = function(k, n, p = 0.5) {
  xs = 0:n
  sum(dbinom(xs[abs(xs - n/2) >= abs(k - n/2)], n, p))
}

coin_flipping = function(size = 10,
                         phead = 1/2,
                         replicates = 50000,
                         fp_rate = 0.05,
                         randomize = FALSE) {
  xs = rbinom(replicates, size = size, prob = phead)
  possible_outcomes = 0:size
  most_likely_outcome = size/2
  
  if(randomize) {
    tail_probs = sapply(0:most_likely_outcome, tail_prob, n = size)
    actual_pvalue = dplyr::last(tail_probs[tail_probs < fp_rate])
    alpha = (1 - fp_rate - actual_pvalue) / (1 - 2 * actual_pvalue)
  }
  
  decisions = sapply(xs, function(x) {
    at_least_as_extreme_as_x =
      abs(possible_outcomes - most_likely_outcome) >= abs(x - most_likely_outcome)
    pvalue = sum(choose(size, possible_outcomes[at_least_as_extreme_as_x])) * (1/2)^size
    if(!randomize) return(pvalue < fp_rate)
    else {
      a = if(pvalue < fp_rate) alpha else 1 - alpha
      return(runif(1) < a)
    }
  })

  mean(decisions)
}

simulate = function(rand) {
  pheads = seq(.01, .50, by = .01)
  sizes = c(10, 50, 100, 1000)
  d = expand.grid(pheads, sizes) %>%
    as_tibble() %>%
    transmute(phead = Var1, size = Var2, power = numeric(nrow(.)))
  for(i in 1:nrow(d)) {
    print(i/nrow(d))
    d$power[i] = coin_flipping(phead = d$phead[i], size = d$size[i], randomize = rand)
  }
  d
}

d1 = simulate(rand = TRUE)
d2 = simulate(rand = FALSE)

tmp1 = tempfile()
tmp2 = tempfile()

write_rds(d1, tmp1)
write_rds(d2, tmp2)

# plots

drand = read_rds(tmp1)
d2rand = drand %>%
  filter(phead < 0.5) %>%
  mutate(phead = 1 - phead)
test_rand = bind_rows(drand, d2rand) %>% mutate(rand = TRUE)

d = read_rds(tmp2)
d2 = d %>%
  filter(phead < 0.5) %>%
  mutate(phead = 1 - phead)
test_basic = bind_rows(d, d2) %>% mutate(rand = FALSE)

# images/hypothesis-testing/power-functions.png
bind_rows(test_basic, test_rand) %>%
  mutate(rand = factor(rand, levels = c(T,F), ordered = T)) %>%
  filter(power < .25) %>%
  ggplot(aes(phead, power, color = factor(size), lty = rand)) +
  geom_line(lwd = 1) +
  geom_hline(yintercept = 0.05) +
  theme_light(base_size = 15) +
  scale_x_continuous(
    name = "p = Pr(heads outcome)",
    breaks = seq(0, 1, by = .1),
    labels = scales::percent
  ) +
  scale_y_continuous(
    name = "Power = Pr(deciding that p is not 50%)",
    labels = scales::percent,
    breaks = seq(0, 1, by = .02)
  ) +
  scale_color_brewer(name = "Coin tosses", palette = "Set1") +
  scale_linetype(name = "Randomized?")

# gap between tail probabilities around 0.05
ns = seq(10, 1000, by = 1)
gaps = numeric(length(ns))
for(i in seq_along(ns)) {
  ps = sapply(0:(ns[i]/2), tail_prob, n = ns[i])
  k1 = which(diff(sign(ps - 0.05)) == 2)
  gaps[i] = ps[k1 + 1] - ps[k1]
}

n_converged = function(gap_threshold) {
  n = gaps[1]
  for(i in seq_along(ns)) {
    if(all(gaps[-(1:i)] < gap_threshold)) {
      n = ns[i]
      break
    }
  }
  n
}

print(n_converged(0.05)) # 37
print(n_converged(0.01)) # 624

# images/hypothesis-testing/tail-prob-gap.png
ggplot(data.frame(gap = gaps, n = ns)) +
  geom_line(aes(n, gap)) +
  geom_hline(yintercept = c(0.01, 0.05), lty = 2) +
  theme_light(base_size = 15) +
  scale_x_continuous(name = "Coin tosses (sample size)",
                     breaks = seq(10, 1000, by = 50)) +
  scale_y_continuous(name = "Tail probabilities gap around 5%",
                     breaks = seq(0, 1, by = .01),
                     labels = scales::percent)

