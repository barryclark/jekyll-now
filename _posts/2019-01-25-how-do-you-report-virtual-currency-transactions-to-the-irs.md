---
layout: post
title: How Do You Report Virtual Currency Transactions to the IRS?
tags: [money, tax, cryptocurrency]
keywords: [irs, bitcoin, cryptocurrencies]
hashtags: [taxes, bitcoin]
image: /images/irs-and-bitcoin.png
---

Bitcoin, and all other cryptocurrencies in general, have had an exciting couple of years - from 2017's massive bull run to 2018's massive bear market. If you bought and sold any bitcoin or other currencies, Uncle Sam wants his cut - especially if you made money.

> This post is not intended to give advice, professional or otherwise, on how to file your or anyone else's taxes. It is intended for informational and entertainment purposes only. Consult a tax professional for real advice; if their advice contradicts anything in this post, assume the tax professional is correct.

![The IRS and Bitcoin logos](/images/irs-and-bitcoin.png)
*The IRS and Bitcoin logos.*

In fact, the IRS explicitly released a bulletin in 2014 called *[IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)* that called to attention the handling of "virtual currencies" - of which cryptocurrencies are one type, including Bitcoin, which is explicitly mentioned in that bulletin.

In March of 2018, [the IRS released another bulletin reminding US taxpayers to report virtual currency transactions](https://www.irs.gov/newsroom/irs-reminds-taxpayers-to-report-virtual-currency-transactions). I would expect another such bulletin from the IRS this year, that is, if the government ever reopens.

## How Do You Report Virtual Currency Transactions to the IRS?

So how do you report virtual currency transactions to the IRS? The easy, non-helpful answer is simply "on your tax return" (i.e. via the standard [Form 1040](https://www.irs.gov/forms-pubs/about-form-1040) or one of its many schedules). This points you in the right direction, but can still be confusing.

Conceivable, income derived from cryptocurrencies could be reported in one of four different places, at least on the 2018 Form 1040 or [Schedule 1](https://www.irs.gov/pub/irs-pdf/f1040s1.pdf):

1. Line 1 of Form 1040, if you were paid via cryptocurrencies and received a [Form W-2](https://www.irs.gov/forms-pubs/about-form-w-2). This is unlikely.
2. Line 12 of Schedule 1, which also requires the [Schedule C](https://www.irs.gov/forms-pubs/about-schedule-c-form-1040). This is self-employment income, which would be if you either mined cryptocurrency or got paid in cryptocurrency as an independent contractor (and possibly received a [Form 1099-MISC](https://www.irs.gov/forms-pubs/about-form-1099-misc) or some other type of 1099.).
3. Line 13 of Schedule 1, which also requires the [Schedule D](https://www.irs.gov/forms-pubs/about-schedule-d-form-1040) and possibly one more [Form 8949](https://www.irs.gov/forms-pubs/about-form-8949)s. This would be if you traded (mostly sold) cryptocurrencies during the tax year. You may receive a [Form 1099-B](https://www.irs.gov/forms-pubs/about-form-1099-b) from the exchange you traded on, although CoinBase/GDAX issued [Form 1099-K](https://www.irs.gov/forms-pubs/about-form-1099-k)s for the tax year 2017.
4. Line 21 of Schedule 1. This line is labeled "Other income. List type and amount." This line is just a "catch-all" line for any type of income otherwise not mentioned in any other form. I believe this is where illegal income would go, although a lot of it could be put on the Schedule C. Of course, no one actually reports illegal income, but it is technically taxable.

To my knowledge, none of the major tax programs handles cryptocurrencies, at least no easily. I have seen some advertisements for tax software specifically for cryptocurrency trading, but I don't know much about them and thus currently cannot endorse any of them.

## How Do I Report Virtual Currency Transactions to the IRS?

Last year (that is, Tax Year 2017 which was filed in early 2018) I completed both a Schedule C for mining and a Schedule D for trading. Several pages of Form 8949 accompanied the Schedule D.

I didn't fill out the forms by hand and mail them to the IRS, although that certainly was an option. Instead, I use a service from the IRS called [Free File Fillable Forms](https://www.irs.gov/filing/free-file-fillable-forms/free-file-fillable-forms-is-closed) (at least I think it's from the IRS - it may be contracted out).

Free File Fillable Forms doesn't do any heavy lifting - it doesn't import tax forms or ask you questions via a wizard. Instead, you have to manually enter almost every value yourself. It does do some very minor arithmetic, but that's it.

To help myself fill out the many Form 8949s, I wrote a short Java program that inputted my trades listed in a CSV file and outputted what I needed to put on the form as another CSV file. (CSV files, or **C**omma-**S**eparated-**V**alue file, is essentially a spreadsheet akin to an Excel file, except all text.)

There are many ways to fill out a Form 8949, and my Java program only calculates one way. This way may not be optimal, how you think it should be done, and even **GASP** how the IRS wants it done. That said, I received no audit or other negative communication from the IRS. There was no noticeable delay in my refund, either.

You can find [the source for my Java program on GitHub](https://github.com/hendrixjoseph/Form8949), but use it at your own risk. There is no warranty, implied or otherwise.

Over the next few posts and weeks, I intend to make additional posts on an example Schedule C for mining as well as an example Schedule D for trading. These examples will reflect the actual schedules I will (or have) file, although they'll be slightly modified either for simplicity or privacy (e.g. I'm not putting my social security number on the examples).

## If You Want To Buy Cryptocurrencies...

I buy cryptocurrencies via Coinbase Pro - formally GDAX. You need a Coinbase account to trade on Coinbase Pro. Use my [Coinbase referral link](https://hendrixjoseph.github.io/coinbase/) for some free bitcoin.

You can also buy cryptocurrencies, such as bitcoin and litecoin, on the Robinhood app if you're in one of the states [listed on this page](https://support.robinhood.com/hc/en-us/articles/360001284423-Free-Cryptocurrency-Investing). Robinhood also has commision-free stock investing. Use my [Robinhood referral link](https://hendrixjoseph.github.io/robinhood/) for a free stock.

## Further Reading

* [Got crypto? Here’s how to avoid an audit from the IRS](https://www.cnbc.com/2018/04/02/got-crypto-heres-how-to-avoid-an-audit-from-the-irs.html)
* [Cryptocurrency: Compliance challenges and IRS enforcement](https://www.thetaxadviser.com/issues/2018/oct/cryptocurrency-compliance-challenges-irs-enforcement.html)
* [How crypto traders can avoid the wrath of the IRS](https://hackernoon.com/how-crypto-traders-can-avoid-the-wrath-of-the-irs-2259567ef936)
* [Virtual Currencies](https://www.irs.gov/businesses/small-businesses-self-employed/virtual-currencies)
