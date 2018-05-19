library(dplyr)
library(tidyr)
library(ggplot2)
library(scdhlm)

#-------------------------------------
# Schutte graph
#-------------------------------------


data("Schutte")
Schutte <- subset(Schutte, case != "Case 4")
Schutte$case <- factor(Schutte$case)
Schutte$trt_week <- with(Schutte, 
                         unlist(tapply((treatment=="treatment") * week, 
                                       list(treatment,case), 
                                       function(x) x - min(x))) + (treatment=="treatment"))

# time-point constants
A <- 2
B <- 9
# center at follow-up time
Center <- B
Schutte$week <- Schutte$week - Center

# fit model
hlm_fit <- lme(fixed = fatigue ~ week + treatment + trt_week, 
            random = ~ week + trt_week | case, 
            correlation = corAR1(0, ~ week | case),
            data = Schutte,
            method = "REML",
            control=lmeControl(msMaxIter = 50, apVar=FALSE, returnObject=TRUE))
            
Schutte$pred <- predict(hlm_fit)

change <- data.frame(case=unique(Schutte$case),
                     phase.change = with(subset(Schutte, treatment== "treatment"), 
                                         tapply(week, case, min)) - 0.5)

ggplot(Schutte, aes(week, fatigue, shape = treatment, color = treatment)) + 
  geom_point() + 
  geom_line(aes(y = pred)) + 
  scale_color_brewer(type = "qual", palette = 6) + 
  facet_wrap(~ case, ncol = 3) + 
  labs(color="Phase",shape="Phase", y ="Fatigue", x="Week") + 
  geom_vline(data = change, aes(xintercept=phase.change), linetype = "dashed") +
  theme_bw() + 
  theme(legend.position = "none")

ggsave("static/img/Schutte.png", width = 9, height = 8, scale = 0.5)



#-------------------------------------
# Rodriguez graph
#-------------------------------------

data("Rodriguez")
Rodriguez <- 
  Rodriguez %>%
  filter(case != "Candice's Group") %>%
  droplevels()

phase_trans <- 
  Rodriguez %>% 
  group_by(case) %>%
  summarize(session = max(session[condition=="A"]) + 0.5)

ggplot(Rodriguez, aes(session, outcome, color = condition)) + 
  geom_point() + 
  geom_line() + 
  geom_smooth(method = "lm", formula = y ~ 1, se = FALSE, size = 1, alpha = 0.5) +
  geom_vline(data = phase_trans, aes(xintercept = session), linetype = "dashed") + 
  facet_wrap(~ case, dir = "v") + 
  theme_bw() + 
  labs(y = "Problem behavior (% intervals)") + 
  scale_color_brewer(type = "qual", palette = 2) + 
  theme(legend.position = "none")

ggsave("static/img/headers/Rodriguez.png", width = 12, height = 5)
