---
layout: post
title: Will Making Twice-Monthly Half Mortgage Payments Save Money?
tags: [money]
keywords: [debt, loan, loan payments, payment, payments]
---

In the quest to pay debt off as quick as possible, people try to find unique ways ("hacks" if you will) to reduce the timeframe and interest charged. The most popular - and successful - method is [the snowball method](https://hendrixjoseph.github.io/charting_the_snowball_method_of_paying_off_debts/) or one of its variants. Another trick is to split the payments into two or more payments a month.

Does this method work? Is multiple partial loan payments any more efficient than making one payment a month? Will making twice-monthly half mortgage payments save money?

The short answer is yes, but not by much.

***This is all assuming there's no penalty for doing so, the interest is calculated daily, and the loan holder will properly apply the payment.***

## The Math Formula Side

First, let's look at the number of payments formula:

    =-LN(1-[i/n]*s/p)/LN(1+i/n)

Where ***i*** is the interest rate (annually), ***n*** is the number of payments a year, ***s*** is the starting balance, and ***p*** is the payment per period. ***LN*** is the natural logarithm, but any logarithm could be used so long as the same logarithm is used for both.

Since we're figuring out how much we'll save by making more (smaller) payments, and we typically know the monthly payment, we can figure out the payments with the following equation:

    p = m * 12 / n
    
Where ***m*** is the monthly payment (***n*** and ***p*** are the same as the previous equation).

If you're using Excel, you could just use the NPER function:

    =NPER(Rate,Payment,Start Value)

Let's look at what happens if you make once monthly, twice monthly, and four times monthly payments 15-year mortgage of $126,450 with 5% yearly interest rate and monthly payments of $1000 a month:

&nbsp; | Monthly | Twice Monthly | 4x Monthly
--- | ---: | ---: | ---:
pmts/year | 12 | 24 | 48
APR/pmnt | 0.42% | 0.21% | 0.10%
payment |  $1,000.00  |  $500.00  |  $250.00
numpayments | 179.9888957 | 359.6039823 | 718.8339615
years | 14.99907464 | 14.98349926 | 14.97570753
days saved | 0 | 5 | 8
total cost | $179,988.90 | $179,801.99 | $179,708.49
interest paid | $53,538.90  | $53,351.99  | $53,258.49
amount saved | 0 | $186.90 | $280.41 

$280 isn't a small amount of money, but compared to the size of the loan, it's not much - not even one percent of the balance.

## Looking at the first two months

Now let's look at the effects in the first two months of repayment, and then I'll make a final point.

### Monthly Payments

Month | Balance | Interest Charged
---: | ---: | ---:
0 | $126,450.00 |
1 | $125,976.88  | $526.88
2 | $125,501.78  | $524.90
&nbsp; | &nbsp; | $1,051.78

### Twice Monthly Payments

 Month | Balance | Interest Charged
---: | ---: | ---:
0 | $126,450.00
&nbsp; | $126,213.44  | $263.44
1 | $125,976.38  | $262.94
&nbsp; | $125,738.83  | $262.45
2 | $125,500.79  | $261.96
&nbsp; | &nbsp; | $1,050.79

### 4x Monthly Payments

 Month | Balance | Interest Charged
---: | ---: | ---:
0 | $126,450.00
&nbsp; | $126,331.72  | $131.72
&nbsp; | $126,213.31  | $131.60
&nbsp; | $126,094.79  | $131.47
1 | $125,976.14  | $131.35
&nbsp; | $125,857.36  | $131.23
&nbsp; | $125,738.46  | $131.10
&nbsp; | $125,619.44  | $130.98
2 | $125,500.29  | $130.85
&nbsp; | &nbsp; | $1,050.29

You'll notice that, in the first two months of payments, you'll only save about a buck and a half in interest by making four payments a month instead of the normal one.

Better than nothing, but let's look what happens if you make your initial full monthly payment two weeks early (i.e. two weeks after you take out the loan):

### First Initial Payment Two Weeks Early

 Month | Balance | Interest Charged
---: | ---: | ---:
0 | $126,450.00
&nbsp; | $125,450.00  | $263.44
1 | |
&nbsp; | $124,972.71  | $522.71
2 | |
&nbsp; | | $786.15

Here, you're saving $265.63 of interest right out of the gate!

## What Am I Getting At?

Any type of loan - mortgage, credit card debt, car loan - is like a reverse savings account. The sooner you put money in a savings account, the more time it has to grow. Similarly, the sooner you put money towards debt, the quicker it will shrink. That's why starting payments worked so great in the last example - you skipped a full two weeks of interest for that amount!

The key here is not to wait to make a payment on debt - make payments as soon as you can. The best way to do this (that I can think of) is to make payments "checkly." If you get paid once a month, make that monthly payment as soon as you get paid - don't wait for the due date. If you get paid weekly, make 1/4th of a payment every check.
