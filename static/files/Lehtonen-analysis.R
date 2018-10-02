library(tidyverse)
library(metafor)
library(robumeta)
library(clubSandwich)

#----------------------------
# Read in Lehtonen data 
# Retrieved from https://osf.io/365v8/
#----------------------------


rm(list=ls())

raw_data <- read_csv2("https://osf.io/sgq5m/download")

# Calculate effect sizes and variance for each row

raw_data <- escalc(measure = "SMD", vtype = "UB", 
                   m1i = MonoMean, m2i = BiMean, 
                   sd1i = MonoSD, sd2i = BiSD, 
                   n1i = MonoN, n2i = BiN, 
                   data = raw_data)

#----------------------------------
# Replicate Lehtonen munging
#----------------------------------

clean_data <- 
  raw_data %>%
  mutate(
    StimulusMaterial = ifelse(Task == "WisconsinCardSorting", "NV", as.character(StimulusMaterial)),
    Domain = factor(Domain, levels = c("Inhibition", "Monitoring","Shifting", "Attention", "WM", "Fluency"))
  ) %>%
  group_by(Study, Measure) 

# Note that grouping by measure involves aggregating 
# across some subsamples, clusters, and pairs from three studies

clean_data %>%
  summarise_at(vars(Subsample, Clusters, Pairs), funs(length(unique(.)))) %>%
  filter(Subsample > 1 | Clusters > 1 | Pairs > 1)

clean_covariates <-
  clean_data %>%
  select(-MonoN, -MonoMean, -MonoSD, -BiN, -BiMean, -BiSD, -Stimuli, -yi, -vi) %>%
  summarise_all(first)

pooled_data <-
  clean_data %>%
  summarise_at(vars(yi, vi), mean) %>%
  ungroup() %>%
  left_join(clean_covariates, by = c("Study", "Measure"))

pooled_dummies <- 
  model.matrix(~ 0 + Domain, data = pooled_data) %>%
  as_data_frame() %>%
  rename_all(str_sub, start = 7)

pooled_data <- 
  pooled_data %>%
  bind_cols(pooled_dummies) %>%
  arrange(Study, Subsample, Clusters, Pairs) 

trimmed_data <- 
  pooled_data %>%
  filter(sqrt(vi) <= 0.6, abs(yi) <= 1.5)

#----------------------------------------------------------
# summarise data structure
#----------------------------------------------------------

pooled_data %>%
  group_by(Study) %>%
  summarise(
    outcomes = length(unique(TaskMeasure)),
    ES = n()
  ) %>%
  summarise_at(vars(outcomes, ES), funs(min, max, median))

trimmed_data %>%
  group_by(Domain) %>%
  summarise(
    Studies = length(unique(Study)),
    ES = n()
  )

#------------------------------------------------
# Aggregate across treatment groups and outcomes
#------------------------------------------------

trimmed_aggregated <-
  trimmed_data %>%
  group_by(Study) %>%
  summarise_at(vars(yi, vi, Inhibition:Fluency), mean)
  
# using averaged variance estimates

agg_overall <- rma(yi, vi, data = trimmed_aggregated)
agg_overall
coef_test(agg_overall, vcov = "CR2", cluster = trimmed_aggregated$Study)

agg_domain <- rma(yi ~ 0 + Inhibition + Monitoring + Shifting + Attention + WM + Fluency, vi = vi, data = trimmed_aggregated)
agg_domain
coef_test(agg_domain, vcov = "CR2", cluster = trimmed_aggregated$Study)


#------------------------------------------------
# Shifting unit of analysis
#------------------------------------------------

# aggregating across outcomes and samples, separately by Domain

trimmed_by_domain <- 
  trimmed_data %>%
  group_by(Study, Domain) %>%
  summarise_at(vars(yi, vi), mean)

sua_domain <- rma(yi ~ 0 + Domain, vi = vi, data = trimmed_by_domain)
sua_domain
coef_test(sua_domain, vcov = "CR2", cluster = trimmed_by_domain$Study)



#------------------------------------------
# fully multi-variate, assuming r = 0.4
#------------------------------------------

V_mat <- with(trimmed_data, impute_covariance_matrix(vi = vi, cluster = Clusters, r = 0.4))
  
rma.mv(yi, V = V_mat, data = trimmed_data, 
       random = ~ 1 | Clusters / Measure,
       method = "REML", sparse = TRUE)


mv_domain <- rma.mv(yi ~ 0 + Domain, V = V_mat, data = trimmed_data, 
                    random = ~ 1 | Clusters / Measure,
                    method = "REML", sparse = TRUE)
mv_domain
coef_test(mv_domain, vcov = "CR2", cluster = trimmed_data$Study)

#------------------------------------
# multi-level meta-analysis
#------------------------------------

rma.mv(yi, V = vi, data = trimmed_data, 
       random = ~ 1 | Clusters / Measure,
       method = "REML", sparse = TRUE)

mlm_domain <- rma.mv(yi ~ 0 + Domain, V = vi, data = trimmed_data, 
                     random = ~ 1 | Clusters / Measure,
                     method = "REML", sparse = TRUE)
mlm_domain
coef_test(mlm_domain, vcov = "CR2", cluster = trimmed_data$Study)

#------------------------------------
# default RVE
#------------------------------------


robu_domain <- robu(yi ~ 0 + Domain, var = vi, data = trimmed_data, studynum = Study, modelweights = "HIER")
robu_domain
sqrt(robu_domain$mod_info$omega.sq)
sqrt(robu_domain$mod_info$tau.sq)
