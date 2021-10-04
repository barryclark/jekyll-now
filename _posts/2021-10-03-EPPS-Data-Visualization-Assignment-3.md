# Run anscombe01.R (in Teams)
## a. Compare the regression models
As shown in Table 1, we could see all four OLS models are statistically significant. However, from the Figure 
named Anscombe's 4 Regression data sets, only the observations in the left-top one figure are distributed evenly
arround the regression line. Although the regression lines based on four different datasets show same tendency, 
but the last three distributions are not meet the basic OLS assumptions, including 1) Expected error is zero, 
2) uncorrelated errors, 3) no multicollinearity, 4) x fixed in repeated samples. This shows us that data visulization 
3) is very necessary for us to judge whether a regression model represents the distribution correctly or not besides 
4) and we should combine both regression statistical results and data visualizations in our research.
![images](https://MinShiMia.github.io/images/4OLS_Table.png)
![images](https://MinShiMia.github.io/images/Anscombe_4_Regression.png)

## b. Compare different ways to create the plots (e.g. changing colors, line types, plot characters)
There are basic ways and more fancy ways to creat plots.
Example 1 (basic ways): 
lm1 <- lm(y1 ~ x1, data=anscombe)
plot(anscombe$x1,anscombe$y1)
abline(coefficients(lm1))

Example 2 (fancy ways):

ff <- y ~ x ## class(ff) --> formula, there is no x and y alreay, they are for future use.
mods <- setNames(as.list(1:4), paste0("lm", 1:4))

*Plot using for loop*
for(i in 1:4) {
  ff[2:3] <- lapply(paste0(c("y","x"), i), as.name)
  mods[[i]] <- lmi <- lm(ff, data = anscombe) ### the i in lmi means 1, 2, 3, 4, ...
  print(anova(lmi))
}

sapply(mods, coef)  # Note the use of this function
lapply(mods, function(fm) coef(summary(fm))) ### get the summary of every model

*Preparing for the plots*
op <- par(mfrow = c(2, 2), mar = 0.1+c(4,4,1,1), oma =  c(0, 0, 2, 0))

*Plot charts using for loop*
for(i in 1:4) {
  ff[2:3] <- lapply(paste0(c("y","x"), i), as.name)
  plot(ff, data = anscombe, col = "red", pch = 21, bg = "orange", cex = 1.2,
       xlim = c(3, 19), ylim = c(3, 13))
  abline(mods[[i]], col = "blue")
}
mtext("Anscombe's 4 Regression data sets", outer = TRUE, cex = 1.5)
par(op)

# 2. Can you finetune the charts without using other packages (consult RGraphics by Murrell)
we could add themes, x axis, y axis in the basic plot() function to finetune the charts. And we also coudl combine them in one figure with
par() function.

The result is shown in the following figure:
![images](https://MinShiMia.github.io/images/BasicPlots.png)


# 3. How about with ggplot2? (use tidyverse package)
With ggplot2, we could plot the four OLS regression models and then use ggarrange() function in ggpubr package to combine the four plots.
The result is as follows:
![images](https://MinShiMia.github.io/images/4OLSggplot.png)



