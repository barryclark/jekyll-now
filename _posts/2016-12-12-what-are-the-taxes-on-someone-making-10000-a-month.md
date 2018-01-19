---
layout: post
title: What are the Taxes on Someone Making $10,000 a Month?
tags: [politics, money, math, quora]
keywords: [income tax, property tax, fuel tax, tax, income tax bracket, tax bracket]
javascripts: [/js/d3.min.js, /js/c3.min.js]
csses: [/css/c3.min.css]
image: /images/covers/tax-cover.jpg
excerpt: $10,000 a month is $120,000 a year.
---

This is my answer to [this question](https://www.quora.com/If-I-earn-10-000-a-month-in-the-US-any-state-you-choose-how-much-will-go-to-taxes) on [Quora](https://www.quora.com).

$10,000 a month is $120,000 a year.

Assuming they’re single, they're in [the 28% tax bracket for Federal taxes](https://www.irs.com/articles/2016-federal-tax-rates-personal-exemptions-and-standard-deductions).

That doesn’t mean they pay 28% of the $120,000. Assuming they just take the standard deduction and have no other deductions or credits (which can be confusing), they’ll pay "$18,558.75 plus 28% of the amount over $91,150" - standard deduction - standard exemption. The formula for $120,000 looks something like this:

$18,558.75 + ($120,000 − $91,150 − $6,300 − $4,050) × 28%

[The Federal Tax is $23,738.75.](https://www.google.com/search?q=18558.75%2B(120000-91150-6300-4050)*0.28)

In addition to Federal, there are [Social Security and Medicare taxes](https://www.irs.gov/taxtopics/tc751.html). Social Security is 6.2% of you income up to $118,500. Medicare is 1.45% with no limit.

[These two are $9,087.](https://www.google.com/search?q=118500*0.062%2B120000*0.0145)

Okay, now how about state taxes? Most states have an income tax, a few don’t. The brackets are all over the place, as well. [In Ohio the rate for $120,000 is $3,231.96 + 4.597% of excess over $105,300.](http://www.tax.ohio.gov/ohio_individual/individual/annual_tax_rates.aspx) I’m not sure, but I believe the exemption for Ohio is $2,200. Ohio’s taxes are based on the Federal [AGI](https://en.wikipedia.org/wiki/Adjusted_gross_income), which is the amount after the standard deduction. Therefore, Ohio’s taxes would follow this formula:

$3,231.96 + ($120,000 − $105,300 − $6,300 − $2,200) × 4.597%

[The Ohio Tax is $3,516.97.](https://www.google.com/search?q=3231.96%2B(120%2C000-105300-6300-2200)*0.04597)

Next, there are local / city income taxes. In Ohio, this is levied on either the city you live in and/or the city you work. They range anywhere from no income tax to 2.5% (I don’t think there’s a limit they can be, but that’s the highest I’m aware of). This tax is based on the entire income - no deductions or exemptions of any kind. Let’s assume you live in a city with 1% tax. The formula is pretty straightforward here:

$120,000 × 1%

As expected, [city income tax is $1,200](https://www.google.com/search?q=120000*0.01).

But wait! There’s more! Making $120,000 probably means they own a home. Let’s say they own a home, and the county they live in says the house is worth $100,000. Property tax, at least in Ohio, is defined in "mills" or "millage." Mills are 1/1000 a dollar much the way cents are 1/100 a dollar - it used to be more common, but now they're typicaly only used with property tax and gas prices (you never see gas at $1.99, it’s more like $1.999). I took at quick peek at [Montgomery County Ohio’s millage rates](http://www.mcrealestate.org/pdffiles/taxrates/Taxrate_2015.pdf), and it looks like 100 mills are on the low end.

Now, for whatever reason, property not taxed on the whole value, but rather 35% of it. Thus the formula looks like, for a $100,000 house at 100 mills:

$100,000 × 35% × 0.100

[Property tax is $3,500.](https://www.google.com/search?q=100000*0.35*0.100)

Okay, right now they’re sitting at [$41,042.72](https://www.google.com/search?q=23738.75%2B9087%2B3516.97%2B1200%2B3500). That’s [over 34%](https://www.google.com/search?q=41042.72%2F120000) of their income. That’s it, right? No more tax?

Nope - those were just the easy ones to calculate. You also need to figure out sales tax, fuel tax, and embedded taxes. The first two are pretty easy. Sales tax is roughly 6% of everything spent - sales tax rates and what is taxed vary from city to city.

[The average fuel tax in the US is 48.18 cents per gallon for gas](https://en.wikipedia.org/wiki/Fuel_taxes_in_the_United_States). So, [if they drive the average amount (about 3,000 miles every 3 months) in a car that gets about 30 mpg they’d pay about $192.72 in fuel tax](https://www.google.com/search?q=0.4818*4*3000%2F30).

Embedded taxes are the taxes paid via merchants when they increase their price so that they can pay taxes that are levied upon them.

<div id="taxPie"></div>
<script>
$(document).ready(function() {
    var income = 120000.00;
    var federal = 18558.75 + (income - 91150 - 6300 - 4050) * 0.28;
    var ss = 118500 * 0.062;
    var medicare = income * 0.0145;
    var state = 3231.96 + (income - 105300 - 6300 - 2200) * 0.4597;
    var local = income * 0.01;
    var property = 100000 * 0.35 * 0.1;
    var fuel = 0.4818 * 4 * 3000 / 30;
    var remaining = income - federal - ss - medicare - state - local - property - fuel;

    c3.generate({
        bindto: '#taxPie',
        data: {
            columns: [
                ['Federal Tax', federal],
                ['Social Security Tax', ss],
                ['Medicare Tax', medicare],
                ['State Tax', state],
                ['Local Tax', local],
                ['Property Tax', property],
                ['Fuel Tax', fuel],
                ['Remaining', remaining]
            ],
            type: 'pie'
        }
    });
});
</script>
