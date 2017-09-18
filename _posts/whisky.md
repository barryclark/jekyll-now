``` r
library("ggplot2")
```

    ## Warning: package 'ggplot2' was built under R version 3.3.3

``` r
library("directlabels")
```

    ## Warning: package 'directlabels' was built under R version 3.3.3

``` r
library("plyr")
```

    ## Warning: package 'plyr' was built under R version 3.3.3

``` r
library("ggthemes")
```

    ## Warning: package 'ggthemes' was built under R version 3.3.3

\`\` <img src="single-malts-at-merlins.jpg" width="100%" />

Earlier this month, I went to a bar in Minneapolis called "Merlin's Rest" with one of the most impressive scotch collections I've ever seen compiled in a whisky bible (see: <http://merlinsrest.com/whiskywhiskey/the-whisky-bible/>). Certain whiskies aged about 30 years ran over $200 for a single pour. This got me thinking a lot about the relationship of the age and price of whisky.

So I did what any reasonable person did and found an API (<https://github.com/WhiskeyProject/whiskey-api>) to scrape the data and look at the relationship.

Once I gathered the data (for those interested: <https://github.com/GWarrenn/whisky/blob/master/whisky.py>), the first thing I wanted to do was to run a simple linear regression on price and age to show the relationship between the two.

``` r
whisky_data_w_years <- read.csv("whisky.csv")

y <- whisky_data_w_years$price
x <- whisky_data_w_years$year
```

The output below shows a coefficient of about 5.826, meaning that for every year you add onto a bottle of scotch, the price goes up about $5.83.

``` r
initial_model <- lm(y ~ x)

initial_model
```

    ## 
    ## Call:
    ## lm(formula = y ~ x)
    ## 
    ## Coefficients:
    ## (Intercept)            x  
    ##       4.972        4.374

We can then use this model as way to roughly predict what the average 15-year bottle of whisky would cost.

``` r
predict(initial_model,data.frame(x=15),interval="confidence")
```

    ##        fit      lwr      upr
    ## 1 70.58495 65.18556 75.98434

And here is the relationship plotted out. The data also contains an average user rating, more on that later.

![](whisky_files/figure-markdown_github/unnamed-chunk-5-1.png)

However, the r-squared for this model isn't incredibly high, indicating that something other than age is determining the price of the bottle.

``` r
summary(initial_model)$r.squared
```

    ## [1] 0.250382

However, once we control for the whisky's origin, we see a modest increase in the overall fit of the model. In some regions we actually see a negative coefficients, while regions like Japan have a crazy high coefficient.

``` r
y <- whisky_data_w_years$price
x <- whisky_data_w_years$year
r <- whisky_data_w_years$region

model_w_region <- lm(y ~ x + r)

model_w_region
```

    ## 
    ## Call:
    ## lm(formula = y ~ x + r)
    ## 
    ## Coefficients:
    ##  (Intercept)             x  rCampbeltown     rHighland        rIrish  
    ##      -2.4566        4.6775       33.3681       -6.3186        0.7621  
    ##      rIsland        rIslay        rJapan        rOther          rRye  
    ##      12.8047       -0.4906       30.6721      -47.3349       13.1925  
    ##    rSpeyside  
    ##       2.8071

``` r
summary(model_w_region)$r.squared
```

    ## [1] 0.3650731

We can also use the region to predict the value of an average bottle of 15 year whisky from various parts of the world.

``` r
predict(model_w_region,data.frame(x=15,r="Speyside"),interval="confidence")
```

    ##        fit      lwr      upr
    ## 1 70.51283 62.58164 78.44401

``` r
predict(model_w_region,data.frame(x=15,r="Japan"),interval="confidence")
```

    ##        fit     lwr      upr
    ## 1 98.37786 73.6761 123.0796

``` r
predict(model_w_region,data.frame(x=15,r="Highland"),interval="confidence")
```

    ##        fit      lwr      upr
    ## 1 61.38712 46.76915 76.00509

The next step was to use the rating data that users have contributed along with the prices to segment the whiskies by average price and rating.

Tip: Beware of the top-left and seek out the bottom right.

![](whisky_files/figure-markdown_github/unnamed-chunk-10-1.png)

Last but not least, I wanted to find good "value" whiskies, whisky's that are on the lower end of the price spectrum but have generally higher ratings. I measured this by dividing the rating by price to create a rough "best value" measure.

![](whisky_files/figure-markdown_github/unnamed-chunk-12-1.png)
