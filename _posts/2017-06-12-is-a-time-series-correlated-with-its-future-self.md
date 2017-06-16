---
layout: post
title: Is a Time Series Correlated with its Future Self?
tags: [technology]
keywords: [time series, time series analysis, correlated, correlation, correlation coefficient]
image: /images/sports-almanac.jpg
---

I've recently been studying time series analysis and was curious as to whether a time series is correlated with its future self (or past self, as the case may be). This thought came about when studying stock market prediction: the best predictor for the stock market would be a crystal ball that told you the future values.

![Sports Almanac](/images/sports-almanac.jpg "Sports Almanac")
*A Crystal Ball, or a Sports Almanac*

### Experiment

I took [the opening values of the S&P100 for the final month of 2016](https://finance.yahoo.com/quote/%5ESP100/history?p=%5ESP100) and correlated it to the opening *n* days later. I used [Excel's CORREL function](https://support.office.com/en-us/article/CORREL-function-995dcef7-0c0a-4bed-a3fb-239d7b68ca92), which computes [the most traditional form of a correlation coefficient](https://en.wikipedia.org/wiki/Correlation_and_dependence#Pearson.27s_product-moment_coefficient). Since this method (both in reality and in Excel) expects both variables to have the same number of values, I lost a day for each *n* days I looked into the future. Alternatively, I could've used January's data.

I also created two other times series - a repeating series using [Excel's SIN (sine) function](https://support.office.com/en-us/article/SIN-function-cf0e3432-8b9e-483c-bc55-a76651c95602), and a completely random series using [Excel's RAND function](https://support.office.com/en-us/article/RAND-function-4cbfa695-8869-4788-8d90-021ea9f5be73).

### Results

As expected, the time series' correlation coefficient to itself (0 days later) is 1. For the S&P 100 data, each day the coefficient drops by about 0.06, and the amount of decrease increases each day. The correlation coefficient for the sine wave fluctuates just as the sine wave itself does.

I didn't include the result of the random function because it changes each time the Excel spreadsheet is updated.

days | SP100 | Sine
--- | --- | ---
0 | 1.000 | 1.000
1 | 0.944 | 0.210
2 | 0.901 | -0566
3 | 0.834 | -0.124
4 | 0.730 | 0.733
5 | 0.623 | 0.525
6 | 0.466 | -0.633

You can [download the Excel file I created here](/xlxs/future-series.xlsx).
