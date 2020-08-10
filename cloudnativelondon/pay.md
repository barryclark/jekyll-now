---
layout: page
title: Choose payment method
description: "Pay Cloud Native London by bank transfer, direct debit, credit or debit card."
---

<!-- Load Stripe.js on your website. -->
<script src="https://js.stripe.com/v3"></script>

### Set up monthly sponsorship

Direct debit has much lower transaction fees, so we appreciate you choosing direct debit if you are based in the UK, EU, Sweden, Denmark, Australia, New Zealand, or Canada.

<button class="gocardless" onclick="location.href='https://pay.gocardless.com/AL00022PZ8R1ZJ'" type="button">Direct debit</button> {% if jekyll.environment == "production" %}
{% include stripe-monthly.html %}
{% else %}
{% include stripe-monthly-test.html %}
{% endif %}

### Sponsor individual events

For bank transfers, please share your company name, billing email (e.g. accounts@example.com) and mailing address. We will invoice you on the 15th of the month prior to the event:

> **Payee name:** Cloud Native London Ltd  
> **Sort code:** 60-83-71  
> **Account number:** 57049586  
> **IBAN:** GB33SRLG60837157049586  
> **SWIFT/BIC:** SRLGGB2L  
> **Reference:** On invoice   

For credit card payments:

{% if jekyll.environment == "production" %}
{% include stripe.html %}
{% else %}
{% include stripe-test.html %}
{% endif %}
