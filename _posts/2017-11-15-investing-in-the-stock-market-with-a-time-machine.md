---
layout: post
title: Investing in the Stock Market With a Time Machine
tags: [technology]
keywords: [microsoft excel, excel, stock market, stock, market, investment, invest, investing, time machine, time travel]
image: /images/stock-magic/2016-chart.png
---

One of the most challenging aspects of investing is lack of foreknowledge or future knowledge - we simply do not know what the performance of a stock or index fund will be. But what if we could print out a list of opening values of a stock and then take [a time machine](https://www.amazon.com/Back-Future-Complete-Adventures-Blu-ray/dp/B01LAQPGCO/?tag=hendrixjoseph-20) backward in time and invest with foreknowledge? Would we be able to make much more money than otherwise possible?

*If this blog post interests you, then check out [Is a Time Series Correlated with its Future Self?](http://hendrixjoseph.github.io/is-a-time-series-correlated-with-its-future-self/)*

###  Data

I used the daily opening values for the S&P 100 for three different time periods (discussed later). I got the data from [Yahoo Finance](https://finance.yahoo.com/) under the stock ticker [OEX](https://finance.yahoo.com/quote/%5EOEX?p=%5EOEX).

### Method

Day one I invest a fixed amount of money - $1000 in the experiments below. I chose this amount of money because it will show up better against the stock price in the charts and the math is easy to figure out the percent increase or decrease

Then, I check if the opening value of the S&P 100 index fund is higher or equal to the previous day's opening value. If so, then I hold. If not, I sell. This ensures that the number of shares and value can never go down - they'll either stay the same or go up.

I accomplished this in [Microsoft Excel](https://www.microsoft.com/en-us/p/excel/cfq7ttc0k7dx?activetab=pivot%3aoverviewtab). I set up Excel's IF function in a similar fashion to the following: `=IF(A3>=A2,B2,C2/A3)`. A more pseudocode variant of this is:

```
If PRICE ≥ PRICE YESTERDAY
    HOLD // Shares = Yesterday's Shares
Else
    SELL // Shares = Yesterday's Value / Today's Price
```

A quick table shows that this works:

Price | Shares | Value
--- | --- | ---
$100.00  | 1 |  $100.00
$101.00  | 1 |  $101.00
$102.00  | 1 |  $102.00
$100.00  | 1.02 |  $102.00
$99.00  | 1.03030303 |  $102.00
$98.00  | 1.040816327 |  $102.00
$100.00  | 1.040816327 |  $104.08

### Experiments

I tried this with three different time periods: last month (October 2017), last year (2016), and 2008. I chose last year because it was a good year for the stock market, whereas I chose 2008 because it was the last well-known crash. For each test, I started with an initial investment of $1000. Again, I chose $1000 for a couple of reasons: it will show up better against the stock price in the charts and the math is easy to figure out the percent increase or decrease

### Results

The first opening price for the S&P 100 in October was $1,113.24. October finished with an opening price on the 31st of $1,138.48. My initial investment of $1000 bought me 0.898279 shares, but I finished with 0.910583 shares valued at $1036.62.

![October 2017 Stock Chart](/images/stock-magic/2017-October-chart.png)

For 2016, the opening price was $909.53 and the final opening price was $996.97. The price did peak over $1,000 for a few days in December. My initial investment of $1000 bought me 1.099469 shares, and I finished with 2.032382 shares valued at $2,026.22.

![2016 Stock Chart](/images/stock-magic/2016-chart.png)

Finally, for 2008 the opening price was $685.47 and the final opening price was $426.45. My initial investment of $1000 bought me 1.458853 shares, and I finished with 14.05187 shares valued at $5,992.42.

![2008 Stock Chart](/images/stock-magic/2008-chart.png)

The following table provides an overview of how these three experiments performed in relation to one another, 

Experiment | Percent Gain | Market Gain
--- | --- | ---
October 2017 | 3.66% | 2.26%
2016 (good market) | 102.62% | 9.61%
2008 (bad market) | 499.24% | -37.79%

The percent gain is how much the experiment gained in value, whereas the market gain is how much the much improved (or not). The market gain would be the same gain if a buy-and-hold method was used instead.

### Conclusion

It makes sense that the longer I have, the more money I made - which is mostly why the two year-long experiments netted in more money than the one-month experiments. What was interesting is that the poor market performance of 2008 brought in more money than the good market performance of 2016, indicating that there is more money to be made when a market is in decline. Of course, if the stock market bottomed out at zero, I would have no money at the end regardless. If I had a time machine, then I would certainly have foreknowledge of the market hitting zero.

Of course, I don't have a [time machine](https://www.amazon.com/Doctor-Who-Complete-Blu-ray-Season/dp/B003XIIW2Y/?tag=hendrixjoseph-20), or oracle drive, or [crystal ball](https://www.amazon.com/Amlong-Crystal-Clear-Redwood-Resin/dp/B01BCS7J3Y/?tag=hendrixjoseph-20). Plus, there's the fact that investing in the stock market influences the stock market affects the performance of the stock market, so doing this with a [time machine](https://www.abebooks.com/products/isbn/9780486284729/30059231216) may change history, depending on what theory of time travel you may subscribe to.

Oh, and [here's the Excel spreadsheet I used to to conduct my experiments](/xlxs/stock-magic.xlsx).
