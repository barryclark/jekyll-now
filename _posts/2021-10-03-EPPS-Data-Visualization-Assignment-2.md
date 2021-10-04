# Run Paul Murrell’s RGraphics basic R programs (murrell01.R in Teams)
## Plotting functions
i. par()： The size and location of the diﬀerent regions are controlled either via the par() function, or using special functions for arranging plots.
In the base graphics system, every page is split up into three main regions: the outer margins, the current ﬁgure region, and the current plot region 
(as shown in Figure 3.1 and Figure 3.2).

![images](https://MinShiMia.github.io/images/PlotMargin1.png)

![images](https://MinShiMia.github.io/images/PlotMargin2.png)


Examples:
1) Setting the parameter (3 rows by 2 cols)
  par(mfrow=c(3, 2))
2) Setting label orientation, margins c(bottom, left, top, right) & text size
  par(las=1, mar=c(4, 4, 2, 4), cex=.7) 

ii. lines(): the lines() function draws a single line through several points. values in the (x, y) locations will create breaks in the line.
The lines() function draws lines between (x, y) locations.

iii. points(): the points() function draws data symbols at (x, y) locations.

iv. axis(): the axis() function can draw axes on any side of a plot (chosen by the side argument), and the user can specify the location along the axis of tick marks and the text to use for tick labels (using the at and labels arguments, respectively).

v. box(): box() draws a rectangle around the plot region.

vi. text(): text() function draws text in the plot region

vii. mtext(): the mtext() function draws text at any location in any of the margins.

viii. hist(): the hist() function produces a histogram.

ix. boxplot(): the boxplot() function produces a boxplot (or boxand-whisker plot).

x. legend(): legend() function adds a legend or key to a plot.

xi. persp(): The important step is to acquire the transformation matrix that the persp() function returns. This can be used to transform 3D locations into 2D locations, using the trans3d() function. The result can then be given to the standard annotation functions such as lines() and text(). The persp() function also has an add argument, which allows multiple persp() plots to be over-plotted.

xii. names(): label the pie chart. 
eg. names(pie.sales) <- c("Blueberry", "Cherry",
                      "Apple", "Boston Cream", "Other", "Vanilla")

xiii. pie(): the pie() function plots the values in a numeric vector as a pie chart.
