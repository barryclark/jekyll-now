---
layout: post
title: Example Schedule C for Cryptocurrency Mining
tags: [money, tax, cryptocurrency]
keywords: [irs, bitcoin, cryptocurrencies]
hashtags: [taxes, bitcoin]
image: /images/antminer-s3.jpg
---

If you mine cryptocurrency such as bitcoin, you're making money. If you're also in the US (or are a US citizen abroad), Uncle Sam wants his cut.

People who mine cryptocurrency also incur expense as the result of mining. If you're like me, your only expense for cryptocurrency mining is the electricity involved. Thankfully you can deduct this expense from your tax bill. There may be a couple of other expenses that you may be able to deduct that I wasn't:

* Mining rig costs
* Home office deduction

## The Home Office Deduction

You can only use the home office deduction if you used part of your home exclusively for business purposes and you have not already taken this deduction elsewhere (such as another Schedule C).

The IRS has a [worksheet to determine the home office deduction](https://www.irs.gov/instructions/i1040sc#idm140495537472144) but the gist of it is this: you can deduct $5 per square foot, up to 300 square feet which is $1,500.

What the instructions don't say about the home office deduction is that it increases the likelihood of getting audited, or at least that's what I've heard. I've also heard that the likelihood gets significantly increased if you take the full $1,500. The moral of the story is only take what is actually used, and what could be proven to someone in the event of an audit.

## Calculating Cryptocurrency Mining Expenses

Like I said before, my only expense for cryptocurrency and bitcoin mining is electricity. Earlier in the year, I ran an Antminer S3+ but eventually turned it off since it generated less than I earned.

![My AntMiner S3+](/images/antminer-s3.jpg)
*My AntMiner S3+*

I figure out my electricity costs monthly, but this is only because I get billed monthly for electricity. To determine the costs, I take the power input of my unit's power supply (500 watts), multiply that number by how many hours I used the miner for in the billing period (so a 30-day billing period of constant use would be 30 days &times; 24 hours = 720 hours), divide that usage by my total usage reported to me on my bill, and finally multiply that number by my bill (the $$$).

Wow, that was quite a sentence. Let's break that down into numbered steps, and then show an equation and an example.

First, the steps:

1. Multiply the power input to the power supply by hours used.
2. Divide the answer to #1 by the usage reported to me on my bill.
3. Multiply the answer to #2 by the bill amount.

Next, the equation:

    (input × hours / usage) × bill = costs

Finally, an example:

Let's say this is for a 30-day billing cycle which I never turned off my 500 W miner. My bill states that I used 600 kW of electricity and I have an amount due of $100.

* 30 days times 24 hours a day means I used my miner for 720 hours.
* 720 hours times 500 watts mean I used 360,000 watt-hours of electricity.
* My bill is in kilowatt-hours, so I'll convert 360,000 watt-hours to 360 kilowatt-hours by simply dividing by 1,000 (a "kilo").
* Divide 360 KW by 600 kW and I get 0.6 (note that this means that 60% of my usage is due to mining).
* I multiply the 0.6 by the amount due of $100 to find that I spent $60 on mining that month.

My actual  monthly costs are as follows:

* January &rarr; $40.18
* February &rarr; $38.91
* March &rarr; $36.78
* April &rarr; $39.04
* May &rarr; $47.86
* Total &rarr; $202.76

(Remember I turned off my rig early in the year?)

## Taxable Cryptocurrency Mining Earnings

For mining earnings, I only count my earnings when the bitcoin or other coin hits my wallet. This is also when I determine the value. I received the following payments in my wallet for mining in 2018:

when | amount | value
--- | ---: | ---:
1/2/2018 | 0.05778881 LTC | $13.58 
2/22/2018 | 0.00108597 BTC | $11.04 
3/2/2018 | 0.00110602 BTC | $12.25 
4/6/2018 | 0.00125778 BTC | $8.29 
5/14/2018 | 0.00658800 BTC | $57.37 
5/18/2018 | 0.00115151 BTC | $9.33 
6/1/2018 | 0.00124444 BTC | $9.44 
7/6/2018 | 0.00167718 BTC | $10.97 
8/3/2018 | 0.00098904 BTC | $7.30 
9/7/2018 | 0.00097323 BTC | $6.28 
11/2/2018 | 0.00103678 BTC | $6.61 
 |  | $152.46 

## Principal Business or Professional Activity Code for Cryptocurrency Mining

On the top right of the Schedule C, there's a line that says "Enter code from instructions":

![Schedule C Line B](/images/taxes/cryptocurrency-mining/schedule-c-line-b.png)
*Schedule C Line B*

This is the line to enter your *Principal Business or Professional Activity Code*. Basically, this identifies your business type. I have no idea why the IRS needs this information since it has no bearing on how much tax you pay. The only clue I've found as to what the IRS does with this piece of data is from the instructions - they use your *Principal Business or Professional Activity Code* to "to facilitate the administration of the Internal Revenue Code."

Yeah, I don't think they need to know, and it's not really any of their business. Then again, Line A asks for "Principal business or profession, including product or service" which again, I don't think they need to know in order to collect taxes.

But I digress.

For Line A "Principal business or profession, including product or service" I put "**CRYPTOCURRENCY MINING (E.G. BITCOIN MINING)**". Generally, for this line, I try to describe my business with a possible example. The actual instructions from the IRS for this line are as follows:

> Describe the business or professional activity that provided your principal source of income reported on line 1. If you owned more than one business, you must complete a separate Schedule C for each business. Give the general field or activity and the type of product or service. If your general field or activity is wholesale or retail trade, or services connected with production services (mining, construction, or manufacturing), also give the type of customer or client. For example, "wholesale sale of hardware to retailers" or "appraisal of real estate for lending institutions."

Now onto Line B.

The IRS lists the Principal Business or Professional Activity Codes on its [instructions for the Schedule C](https://www.irs.gov/instructions/i1040sc#idm140495537006848) as well on its [TaxMap page](https://taxmap.irs.gov/taxmap/instr/i1040sc-016.htm). Many other sites list them as well.

I'm unsure if these numbers ever change. I doubt they do, or if they do, they probably don't change much. In either case, I would get the number straight from the IRS for the year filing rather than some other site.

Onto the question hinted at in the header of this section: What is the Principal Business or Professional Activity Code for cryptocurrency mining?

There is no code specifically for cryptocurrency or bitcoin mining. There are some [mining codes](https://www.irs.gov/instructions/i1040sc#idm140495536711984), but that's for literal mining, such as coal mining.

In my opinion, there are two potential codes.

The first is under [Data Processing Services](https://www.irs.gov/instructions/i1040sc#idm140495536798320): 518210 - Data processing, hosting, & related services.

The second is under [Computer Systems Design & Related Services](https://www.irs.gov/instructions/i1040sc#idm140495536635584) - which only has one option with the same name - code 541510.

In the end, I chose code 541510. I would suggest that whatever code you chose, you continue to use the same code each year, assuming the number and descriptions don't change in the IRS documents.

A potential third option is "999999-Unclassified establishments (unable to classify)." However, you may be [unable to efile](https://ttlc.intuit.com/questions/3280728-schedule-c-business-activity-code-of-999999-unclassified-establishment-means-i-am-not-eligible-to-e-file-why) if you chose this option.

## My Cryptocurrency Mining Schedule C

The following is essentially the first page of the Schedule C that I filed with the IRS. I anonymized my social security number and address. I don't show the second page because I left it blank.

![My Cryptocurrency Mining Schedule C](/images/taxes/cryptocurrency-mining/schedule-c.png)
*My Cryptocurrency Mining Schedule C*

## What About the Schedule C-EZ?

The [Schedule C-EZ](https://www.irs.gov/forms-pubs/about-schedule-c-ez-form-1040) is supposedly a shorter, easier form than the regular Schedule C. Except it's not shorter in the sense of pages - both the Schedule C and Schedule C-EZ are two pages - only in the number of lines. 17+ lines for the Schedule C-EZ as opposed to 59+ lines on the Schedule C.

In addition, the Schedule C-EZ has a number of restrictions listed on the first part of the form:

![Schedule C-EZ Part I](/images/taxes/cryptocurrency-mining/schedule-cez-part-i.png)
*Schedule C-EZ Part I*

I am ineligible to use the Schedule C-EZ because I have a net loss and I file additional Schedule C's. You cannot file multiple Schedule C-EZ's, but you can file multiple Schedule C's.

## Tax Software Affiliate Links

I have affiliate status for the following tax sites, but I'm not going to vouch for any of them:

* [eSmart Tax](http://esmarttax.com)
* [Liberty Tax](http://libertytax.com)
* [FreeTaxUSA](http://freetaxusa.com)
* [TaxACT](http://taxact.com)
* [Turbo Tax](http://turbotax.com)

I don't use any of them - I use [Free File Fillable Forms](https://www.freefilefillableforms.com/), which is an IRS product available to almost everyone regardless of circumstance - there is no income restriction. You can see it on the [IRS Free File Page](https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free). It is a bit more hands-on, however.

## Other Posts You May Like

* [How Do You Report Virtual Currency Transactions to the IRS?](https://hendrixjoseph.github.io/how-do-you-report-virtual-currency-transactions-to-the-irs/)
* [Cryptocurrency, Bitcoin, & AntMiner Hash Rates](https://hendrixjoseph.github.io/cryptocurrency-bitcoin-and-antminer-hash-rates/)
* [How to Read Your Electric Meter](https://hendrixjoseph.github.io/how-to-read-your-electric-meter/)