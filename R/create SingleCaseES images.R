library(ggplot2)
library(scdhlm)

data("Romaniuk")
Romaniuk <- subset(Romaniuk, condition %in% c("Choice","No Choice"))
Romaniuk$case <- factor(Romaniuk$case, 
                        levels = c("Brooke","Maggie","Gary","Riley","Christy","Rick"))

#-------------------------------------
# Make graph
#-------------------------------------

phase_trans <- 
  Romaniuk %>% 
  group_by(case, phase) %>%
  summarize(session = max(session) + 0.5) %>%
  group_by(case) %>%
  slice(1:(n()-1))

ggplot(Romaniuk, aes(session, outcome, color = condition, group = phase)) + 
  geom_point() + geom_line() + 
  expand_limits(y = 0) + 
  geom_vline(data = phase_trans, aes(xintercept = session), linetype = "dashed") + 
  facet_wrap(~ case, nrow = 3, scales = "free", dir = "v") + 
  theme_bw() + 
  labs(y = "Problem behavior") + 
  scale_color_brewer(type = "qual", palette = 2) + 
  theme(legend.position = "none")

ggsave("static/img/Romaniuk.png", width = 9, height = 8, scale = 0.5)

ggplot(Romaniuk, aes(session, outcome, color = condition, group = phase)) + 
  geom_point() + geom_line() + 
  expand_limits(y = 0) + 
  geom_vline(data = phase_trans, aes(xintercept = session), linetype = "dashed") + 
  facet_wrap(~ case, nrow = 2, scales = "free", dir = "v") + 
  theme_bw() + 
  labs(y = "Problem behavior") + 
  scale_color_brewer(type = "qual", palette = 2) + 
  theme(legend.position = "none")

ggsave("static/img/headers/Romaniuk-wide.png",width = 12, height = 4)
