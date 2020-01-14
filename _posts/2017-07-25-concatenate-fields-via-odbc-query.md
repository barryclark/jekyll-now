---
layout: post
title: Concatenate Fields via ODBC Query
permalink: /general/concatenate-fields-via-odbc-query
post_id: 1554
categories:
- General
---

Today I wanted to concatenate some fields with some text. We are pulling some data from MYOB for import against a client record in SugarCRM and want to tidy it up as we go.<!--more-->

However, using concat didn't work.

Thus [this Stackoverflow answer](https://stackoverflow.com/a/7778685) came to the rescue with using `fn concat('some text', 'with more text')`

I've then nested it a little as this function only takes two arguments.select
<pre><code>
  Customers.CreditLimit,
  {fn concat (TermsOfPayment.Description,
    {fn concat (' (',
      {fn concat (Terms.BalanceDueDays, ' days)')}
    )}
  )} as TradingTerms
from
  Customers
  join Terms on Terms.TermsID = Customers.TermsID join
  TermsOfPayment on TermsOfPayment.TermsOfPaymentID = Terms.TermsOfPaymentID;
</code></pre>

That did the trick.
