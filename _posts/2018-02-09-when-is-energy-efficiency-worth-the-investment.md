---
layout: post
title: When Is Energy Efficiency Worth the Investment?
tags: [money]
keywords: [energy efficient, financial, compound interest, investment, pays for itself]
---

Should you buy LED bulbs? What about replacing an old vehicle with a more fuel-efficient vehicle? When exactly is an energy efficient upgrade worth the investment? While part of these questions has environmental and safety considerations - making the answer a definite "it depends" - the financial aspects are a little more straight-forward. Essentially the answer is "yes" if the item - LED bulbs, a car, or what have you - pays for itself in a certain time frame.

When something "pays for itself" it has cost less to run or use the same amount of money that it cost to purchase than if you had not replaced the item. In essence, this is **the same as doubling your money**. If it pays for itself in exactly one year, that means it's the same as an equivalent investment that returns 100% APR. 

I like math, so let's do some math.

First, we look at the normal compound interest formula:

    fv = pv (1 + r) ^ t

Note that *pv* is present value, *fv* is final value, *r* is rate, and *t* is time in years.

Since we're looking at when our purchase pays for itself, essentially doubling the investment income, we know:

    fv = 2pv

And can plug that into our equation:

    2pv = pv (1 + r) ^ t

Solve for r:

    2pv = pv (1 + r) ^ t
    2 = (1 + r) ^ t
    2 ^ (1/t) = 1 + r
    2 ^ (1/t) - 1 = r
    r = 2 ^ (1/t) - 1

Remember that taking a number to the power of a reciprocal is the same as taking the root of that number. So `x ^ (1/2)` is the square root of x, `x ^ (1/3)` is the cube root of x, and so on.

I put my equation into Excel and figured out the equivalent rates for years 1 through 20:

years | rate
--- | ---
1 | 100%
2 | 41%
3 | 26%
4 | 19%
5 | 15%
6 | 12%
7 | 10%
8 | 9.1%
9 | 8.0%
10 | 7.2%
11 | 6.5%
12 | 5.9%
13 | 5.5%
14 | 5.1%
15 | 4.7%
16 | 4.4%
17 | 4.2%
18 | 3.9%
19 | 3.7%
20 | 3.5%

This means something that pays for itself in less than a year is definitely worth the investment. I'd even say something that pays for itself less than ten years is worth it. Your mileage may vary, of course. Note that I'm only compounding annually. An investment that compounds more often (e.g. monthly or daily) would get slightly better returns.

Now let's look at a couple of examples. I'm going to write these as math word problems. Sorry if it gives anyone flashbacks to math class!

> A [60-watt equivalent LED lightbulb](https://www.amazon.com/Philips-60-Watt-Equivalent-Light-White/dp/B00XNHGL28?tag=hendrixjoseph-20) costs $3.25 and uses 6.5 watts of electricity. Assuming the bulb is on for eight hours a day and electricity costs 11&cent; a kilowatt-hour, how soon will it pay for itself? What's the approximate rate of return and is it worth it?

    old daily cost: 60 watts * (1 kilowatt / 1000 watts) * 8 hours *  $0.11 = $0.0528
    new daily cost: 6.5 watts * (1 kilowatt / 1000 watts) * 8 hours *  $0.11 = $0.00572
    daily savings: $0.0528 - $0.00572 = $0.04708
    days to payoff:  $3.25 / $0.04708 = 69 days
    approximate rate of return = 2 ^ (1/[69/365]) - 1 = 1,333%

Is it worth it? Is over a 1000% return on your money worth it? Hell yeah!

> Your current car gets 20 mpg. You drive an average amount, which is 3,000 miles a quarter. Gas costs $2.00 a gallon. How much should you pay for a car that gets 50 mpg in order for it to pay for itself in ten years (7.2% interest)? Assume all other maintenance costs are the same, gas prices are constant, and your current car is worth zero.

    old yearly cost: 3,000 miles * (4 quarters / year) * (1 gallon / 20 miles) * $2.00 = $1,200
    new yearly cost: 3,000 miles * (4 quarters / year) *  (1 gallon / 50 miles) * $2.00 = $480
    yearly savings: $1,200 - $480 = $720
    ten-year savings = $720 * 10 years = $7,200

Oh, wow, I didn't even use the compound interest equation here! I just decided, based on the table above, that ten years was a reasonable time since it was equivalent to 7.2% interest. Of course, the assumptions in this question were bad: maintenance costs for a 50 mpg car is probably going to be higher than maintenance costs for a 20 mpg car (since the 50 mpg car is probably a hybrid), gas is probably going to go up, and you could probably sell your current car for at least $500 (if it's a crappy car).
