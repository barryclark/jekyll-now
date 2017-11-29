---
layout: post
title: Living off the Interest
tags: [math]
keywords: [lottery, interest, financial, financial independence, safe withdrawal rate, interest rate, rate]
image: /images/covers/2017-11-29-living-off-the-interest.png
---

A common topic of conversation is what people would do if they won the lottery. People often dream of winning it big any buying big houses, nice cars, and quitting their jobs. My brothers and I weren't immune to this topic, however, we often would have another answer as to what to do with lottery winnings: *put it in the bank and live off the interest.*

It's still a dream of many. Not winning the lottery, per se, but having enough money to live off the interest. Is it even possible? How much money would be required to do this, and at what interest rate?

Note that there's an entire community dedicated to this idea of putting away enough money so they can live off the interest - or more specifically, live off the money that money makes (it may be something similar to interest, such as stock dividends, or just the general increase in the value of stocks, so something more complex like rental income). Many of you may have heard of this and visited various sites such as the subreddit [/r/financialindependence](https://www.reddit.com/r/financialindependence/) or blogs like [Mr. Money Mostache](http://www.mrmoneymustache.com/).

This community, which often calls the concept under the acronym FIRE for financial independence / retire early, has somehow determined that the amount of money needed is 25 times your annual expenses, and the interest rate is 4%. The term for this is the safe withdrawal rate or SWR for short.

Note the relationship between the values 4% and 25: multiply these together and you get 100%. This is not a coincidence.

How did they come to these numbers? I'm not sure; part of me thinks it has to do with a conservative estimate of 5% returns in the market. The number is reduced by one percentage point to 4% just to create another buffer in the event of poor market performance.

I'm going to try to analyze this safe withdrawal rate number by some math. First, I'm going to define some single-letter variables for the next few equations:

```
p = principal
r = interest rate
b = balance after interest is applied
i = interest earned
```

Now let's define some equations. These are all finance equations that well should all know & love:

```
p + i = b
pr = i (for one period)
p(1 + r) = b (for one period)
```

Using these equations, let's answer our initial question:

> How much money and at what interest rate would be required to do live off the interest?

Now, if you're going to live off interest, you only need to have it cover expenses. However, it is sometimes assumed that expenses equal income. Hopefully, your expenses are less than your income, but at least that provides a baseline to go by.

Let's assume my household income is $100,000. We don't have an interest rate available to us, so let's use a few interest known interest rates:

> Typical savings account interest rate: 0.05%
>
> Ally Bank savings account rate about a year ago: 1.00%
>
> Ally Bank savings account now: 1.25%
>
> Safe withdrawal rate: 4.00%
>
> Excepted market growth: 5.00%
>
> S&P 500 1 Year Return: 20%
>
> Bitcoin 1 Year Return: 1000%

Only one equation makes sense for this, names `pr = i`. Since we're solving for how much money we need, let's solve for p: `p = i/r`.

Now, the results look something like:

```
$100,000 / 0.05% = $200,000,000
$100,000 / 1.00% = $10,000,000
$100,000 / 1.25% = $8,000,000
$100,000 / 4.00% = $2,500,000
$100,000 / 5.00% = $2,000,000
$100,000 / 20.00% = $500,000
$100,000 / 1000.00% = $10,000
```

If I just keep my money in a typical, crappy-rate savings account, I need a gigantic $200 million to live on the interest. Raising the interest rate to what Ally gave just a year ago, that amount is greatly reduced to only ten million dollars - or eight million dollars if you use today's rate. That little bit of interest goes a long way.

The safe withdrawal rate leaves me needing only $2.5 million. While that's still a rather large chunk of cash, it's a far cry from that original $200 million.

The S&P 500 return and bitcoin return were just for fun. Both are above average returns, but it's interesting to see how little you would need if somehow they managed to maintain those returns.

### One last bit

Note that above I assumed income equals expenses. Let's do three more assumptions: expenses are 75%, 50%, and 25% of income:

```
75% × $100,000 / 0.05% = $150,000,000
75% × $100,000 / 1.00% = $7,500,000
75% × $100,000 / 1.25% = $6,000,000
75% × $100,000 / 4.00% = $1,875,000
75% × $100,000 / 5.00% = $1,500,000
75% × $100,000 / 20% = $375,000
75% × $100,000 / 1000% = $7,500
```

```
50% × $100,000 / 0.05% = $100,000,000
50% × $100,000 / 1.00% = $5,000,000
50% × $100,000 / 1.25% = $4,000,000
50% × $100,000 / 4.00% = $1,250,000
50% × $100,000 / 5.00% = $1,000,000 
50% × $100,000 / 20% = $250,000
50% × $100,000 / 1000% = $5,000
```

```
25% × $100,000 / 0.05% = $50,000,000
25% × $100,000 / 1.00% = $2,500,000
25% × $100,000 / 1.25.00% = $2,000,000
25% × $100,000 / 4.00% = $625,000
25% × $100,000 / 5.00% = $500,000
25% × $100,000 / 20% = $125,000
25% × $100,000 / 1000% = $2,500
```
