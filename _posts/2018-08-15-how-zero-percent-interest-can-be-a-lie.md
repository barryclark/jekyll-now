---
layout: post
title: How 0% Interest Can Be A Lie
tags: [money]
keywords: [interest rate, negative interest]
hashtags: [money, finance]
image: /images/ford-f150.jpg
---

Recently my brother was telling me about a deal he received on financing a new truck. He had gone to the dealer to browse and possibly buy, and after a bit of negotiation with the salesperson, agreed to a price of $20,000* at 0% interest for 60 months. However, the dealer was unable to actually approve him for 0% interest, so my brother shrugged his shoulders and proceeded to walk.

![A Ford F150](/images/ford-f150.jpg)
*Not the exact truck my brother bought, but rather [an image from Wikimedia](https://commons.wikimedia.org/wiki/File:Ford-f150-2015-fx4-por-jesus.jpg)*

Desperate for a sale, the salesperson chased him out the door and said they could sell him the vehicle for  $17,664 - but at an interest rate of 5%.

**When my brother told me about this deal, he didn't provide any numbers, so I made up some (hopefully) realistic numbers to move the story along.*

The question, then, is did my brother get a better deal at the 5% interest rate than the 0% interest rate?

Both interest rates have the same monthly payments:

    $20,000 / 60 = $333.33 a month

---

       $17,664 * 0.05 / 12
    ------------------------- = $333.34 a month
    1 - (1 + 0.05 / 12) ^ -60

Note: That second formula is the **loan payment formula**:

       PRESENT_VALUE * INTEREST_RATE / PERIODS_YEAR
    ------------------------------------------------- = MONTHLY_PAYMENT
    1 - (1 + INTEREST_RATE / PERIODS_YEAR) ^ -PERIODS

So where exactly is the deal? What is the advantage?

With the 0% loan, there is no incentive - no advantage - to paying extra on the loan and paying the loan off early. With a positive interest loan, there is an incentive and advantage to paying extra on the loan and paying the loan off early.

In fact, there's a third possibility - a *negative interest loan* - which has an incentive and advantage to keeping the loan to full term.

Let's look at it this way: with a loan, you can either pay it immediately, which means you pay the full balance. Or you can hold it full term, which means you might pay a different amount than the full balance. Or, you pay it off sometime before the full term, but not immediately, which means you'll pay somewhere between the amount financed and the amount you would've paid full-term.

Let's construct a table that shows the amounts you'd pay immediately and full term for a $10,000 loan at 10%, 0%, and **-**10% interest, each for a period of 60 months:

interest rate | pay immediately | pay full term
---: | ---: | ---:
10% | $10,000.00  | $12,748.23 
0% | $10,000.00  | $10,000.00 
-10% | $10,000.00  | $7,666.61 

If we look at a graph of paying each one off by month, we also see that it's not a linear journey:

![Paid off graph.](/images/paid-off-graph.png)

Obviously, if the amount is not negotiable - for instance, if you go to a bank or credit union, or you're refinancing an existing debt - you want the lowest payment. But if the amount is negotiable, then you can actually benefit from having a higher interest but lower balance.

One last question before I finish - which of the following is best:

* A $20,000 loan at 0% interest.
* A $15,000 loan at 10% interest.
* A $25,000 loan at -10% interest.

Give you answer in the comment section below!
