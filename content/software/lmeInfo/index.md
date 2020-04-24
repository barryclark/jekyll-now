---
date: "2020-04-24T00:00:00Z"
external_link: ""
header:
image: 
  preview_only: true
  focal_point: Smart

summary: Information Matrices for 'lmeStruct' and 'glsStruct' Objects

tags:
- hierarchical models
- effect size
- R

title: lmeInfo

authors:
- admin
- Man Chen

links:
- name: CRAN
  url: https://cran.r-project.org/package=lmeInfo

url_code: "https://github.com/jepusto/lmeInfo"
url_pdf: ""
url_slides: ""
url_video: ""
---

lmeInfo provides analytic derivatives and information matrices for fitted linear mixed effects models and generalized least squares models estimated using `nlme::lme()` and `nlme::gls()`, respectively. The package includes functions for estimating the sampling variance-covariance of variance component parameters using the inverse Fisher information. The variance components include the parameters of the random effects structure (for lme models), the variance structure, and the correlation structure. The expected and average forms of the Fisher information matrix are used in the calculations, and models estimated by full maximum likelihood or restricted maximum likelihood are supported. The package also includes a function for estimating standardized mean difference effect sizes ([Pustejovsky et al., 2014](/publication/design-comparable-effect-sizes/)) based on fitted lme or gls models.


- R package [available on the Comprehensive R Archive Network](https://cran.r-project.org/package=lmeInfo)
- [R source code on Github](https://github.com/jepusto/lmeInfo)
