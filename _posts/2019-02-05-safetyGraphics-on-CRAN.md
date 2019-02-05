---
layout: post
title: safetyGraphics are live
---

We're excited to report that the `safetyGraphics` R package is now on [CRAN](https://cran.r-project.org/web/packages/safetyGraphics/index.html)!  `safetyGraphics` is designed to make it easy to create create interactive graphics related to clinical trial safety. We're still in beta, but are very excited about the progress so far - here's a sneak peek: 

![edishapp-take2_smallish](https://user-images.githubusercontent.com/3680095/51296057-e3195380-19df-11e9-971a-430c3be930a4.gif)

You can try the shiny app for yourself by pasting the following code in to RStudio:

```
intsall.packages("safetyGraphics)" 
library("safetyGraphics") 
safetyGraphicsApp()
```

Rho collaborates on the `safetyGraphics` package as members of the ASA Biopharm/DIA Safety Working Group’s Interactive Safety Graphics Taskforce, which combines stakeholders from across the pharmaceutical industry, including the FDA. To learn more about this project you can:

- See the package on [CRAN](https://cran.r-project.org/web/packages/safetyGraphics/index.html)
- View the [vignette](https://cran.r-project.org/web/packages/safetyGraphics/vignettes/shinyUserGuide.html) for detailed guidance on using the Shiny application
- Explore the [github repo](https://github.com/ASA-DIA-InteractiveSafetyGraphics/safetyGraphics) for the package. Issues and pull requests strongly encouraged!
- Look at our [rstudio::conf(2019) ePoster](https://github.com/RhoInc/RStudioConf2019-ePoster) about this project. 
- Check out the underlying [javascript library](https://github.com/ASA-DIA-InteractiveSafetyGraphics/safety-eDISH) used to create the [eDish Chart](https://asa-dia-interactivesafetygraphics.github.io/safety-eDISH/)
- Try out a hosted version of the [shiny app](https://becca-krouse.shinyapps.io/safetyGraphicsApp/) (or run it locally using the code above)
- See Rho's [other interactive graphics](https://rhoinc.github.io/safety-explorer-suite/) for safety monitoring.  We also wrote [a paper](https://journals.sagepub.com/doi/abs/10.1177/2168479018754846) about these. Our plan is to add some of them to the `SafetyGraphics` package in future releases
- Take a look at the [technical framework](https://user-images.githubusercontent.com/3680095/51296179-6f2b7b00-19e0-11e9-841a-afc2964a7e1a.png) being used to create the chart



