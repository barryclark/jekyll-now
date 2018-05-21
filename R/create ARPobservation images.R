library(ARPobservation)
library(ggplot2)
library(dplyr)

#----------------------------------
# MTS versus prevalence
#----------------------------------

# set parameters
zeta <- 1 / 60
iterations <- 100
phi <- rep(seq(0.01, 0.99, 0.01), each = iterations)
mu <- phi / zeta 
lambda <- (1 - phi) / zeta

# generate behavior streams, apply continuous recording and MTS

BS <- r_behavior_stream(n = length(phi), mu = mu, lambda = lambda, 
                        F_event = F_exp(), F_interim = F_exp(), stream_length = 600)
obs <- reported_observations(BS, c("C","M"), interval_length = 15)

# plot results


ggplot(obs, aes(phi, M)) + 
  geom_point(alpha = 0.05, color = "black") + 
  geom_smooth(method = "loess", se = FALSE, color = "red") + 
  theme_light() + 
  labs(x = "Prevalence", y = "Momentary time sampling")
ggsave("static/img/Momentary-time-sampling.png", width = 4.5, height = 4)





#----------------------------------
# Simulate ABAB designs
#----------------------------------

# function for simulating ABAB data

get_phase_changes <- function(design, sessions_TR, phase_pattern, MB_phase_changes, cases) {
  if (design=="Treatment Reversal") {
    phase_labels <- strsplit(phase_pattern, "")[[1]]
    phase_changes <- sessions_TR * (1:(length(phase_labels) - 1))
  } else if (design=="Multiple Baseline") {
    lapply(MB_phase_changes, function(x) as.numeric(strsplit(x, split = ",")[[1]])) %>%
      sapply(function(x) rep(x, length.out = cases)) %>%
      as.data.frame() %>%
      mutate(case = paste("Case", LETTERS[1:cases])) %>%
      gather("phase",session, -case) ->
      phase_changes
  } else {
    phase_changes <- NULL
  }
  return(phase_changes)
}

phase_design <- function(design, n_trt, cases, phase_pattern, sessions_TR, 
                         sessions_MB, phase_changes, n_alternations, randomize_AT, samples) {
  
  case_names <- paste("Case", LETTERS[1:cases])
  
  sample_nr <- 1:samples
  
  if (design=="Treatment Reversal") {
    phase_labels <- strsplit(phase_pattern, "")[[1]]
    session_nr <- 1:(length(phase_labels) * sessions_TR)
    phase <- rep(1:length(phase_labels), each = sessions_TR)
    trt <- rep(phase_labels, each = sessions_TR)
  } else if (design=="Multiple Baseline") {
    session_nr <- 1:sessions_MB
    phase <- unlist(with(phase_changes,tapply(session, case, function(t) 
      rep(1:(n_trt + 1), times = diff(c(0,t,sessions_MB))))))
    trt <- LETTERS[phase]
  } else {
    n <- n_trt + 1
    session_nr <- 1:(n * n_alternations)
    phase <- rep(1:n_alternations, each = n)
    if (randomize_AT) {
      trt <- as.vector(replicate(n_alternations, sample(LETTERS[1:n])))
    } else {
      trt <- rep(LETTERS[1:(n_trt + 1)], n_alternations)
    }
  }
  
  dat <- expand.grid(session = session_nr, case = case_names, sample = sample_nr)
  dat$phase <- factor(phase)
  dat$trt <- factor(trt)
  return(dat)
}

impact <- function(trt, omega) {
  n <- length(trt)
  impact <- matrix(c(as.numeric(trt[1]==(levels(trt)[-1])), rep(NA, (n - 1) * (nlevels(trt) - 1))),
                   nlevels(trt) - 1, n)
  for (j in 2:n) impact[,j] <- omega * impact[,j - 1] + (1 - omega) * (trt[j]==(levels(trt)[-1]))
  data.frame(t(impact))
}

simulate_measurements <- function(dat, behavior, freq, freq_dispersion, 
                                  duration, interim_time, state_dispersion, 
                                  trt_effect_params,
                                  system, interval_length, session_length) {
  
  N <- nrow(dat)  
  omega <- 1 - trt_effect_params$immediacy / 100
  X_impact <- 
    group_by(dat, sample, case) %>%
    do(impact(.$trt, omega = omega)) %>%
    ungroup() %>% select(-sample, -case) %>%
    pull(t.impact.)
    
  
  if (behavior == "Event behavior") {
    mu <- rep(0, N)
    lambda <- 1 / (freq * (X_impact * trt_effect_params$freq_change / 100 + 1))
    F_event <- F_const()
    F_interim <- F_gam(shape = 1 / freq_dispersion)
  } else {
    mu <- duration * (X_impact * trt_effect_params$duration_change / 100 + 1) / 60
    lambda <- interim_time * (X_impact * trt_effect_params$interim_change / 100 + 1) / 60
    F_event <- F_gam(shape = 1 / state_dispersion)
    F_interim <- F_gam(shape = 1 / state_dispersion)
  }
  
  BS <- r_behavior_stream(n = N, mu = mu, lambda = lambda,
                          F_event = F_event, F_interim = F_interim, 
                          stream_length = session_length)
  
  # compute true trend lines
  if (system == "Frequency counting") {
    dat$truth <- session_length / lambda
  } else {
    dat$truth <- 100 * mu / (mu + lambda)
  }
  
  # compute observed data
  dat$Y <- switch(system,
                  "Frequency counting" = event_counting(BS),
                  "Continuous recording" = 100 * continuous_duration_recording(BS),
                  "Momentary time sampling" = 100 * momentary_time_recording(BS, interval_length / 60),
                  "Partial interval recording" = 100 * interval_recording(BS, interval_length / 60, partial = TRUE),
                  "Whole interval recording" = 100 * interval_recording(BS, interval_length / 60, partial = FALSE)
  )
  return(dat)
}

samples <- 8
behavior <- "Event behavior"
system <- "Frequency counting"
design <- "Treatment Reversal"
phase_pattern <- "ABAB"
sessions <- 10
trt_effect_params <- list(immediacy = 20, freq_change = -80, duration_change = 0, interim_change = 0)

phase_changes <- get_phase_changes(design = design, sessions_TR = sessions, phase_pattern = phase_pattern, cases = 1)
dat <- phase_design(design = design, n_trt = 1, cases = 1, phase_pattern = phase_pattern, 
                    sessions_TR = sessions, phase_changes = phase_changes, samples = samples)
dat <- simulate_measurements(dat, behavior = behavior, freq = 2, freq_dispersion = 1, 
                             duration = 30, interim_time = 60, state_dispersion = 1,
                             trt_effect_params = trt_effect_params, 
                             system = system, interval_length = 15, session_length = 10)

ggplot(dat, aes(session, Y, color = trt, group = interaction(phase, sample))) + 
  geom_point(alpha = 0.3) + 
  geom_line(alpha = 0.4) + 
  geom_vline(xintercept = phase_changes + 0.5, linetype = "dashed") + 
  geom_line(data = filter(dat, case=="Case A"), aes(session, truth), size = 1.0) + 
  scale_color_brewer(type = "qual", palette = 2) +
  labs(color = "Condition", y = "Events") + 
  expand_limits(y = 0) + 
  theme_light() + 
  theme(legend.position = "none")
ggsave("static/img/headers/ABAB-design.png", width = 12, height = 4)
