---
layout: page
title: Choose payment method
description: "Pay Cloud Native London by bank transfer, direct debit, credit or debit card."
---

After payment, you'll confirm which months your company is sponsoring.

## 1. Direct debit

Monthly sponsors usually pay through a direct debit.

<button onclick="location.href='https://pay.gocardless.com/AL00022PZ8R1ZJ'" type="button">
         Set up direct debit</button>

## 2. Bank transfer

> **Payee name:** Cloud Native London Ltd  
> **Sort code:** 60-83-71  
> **Account number:** 57049586  
> **IBAN:** GB33SRLG60837157049586  
> **SWIFT/BIC:** SRLGGB2L  
> **Reference:** On invoice   

Invoices are sent on the 15th of the month before each event.

<button onclick="location.href='/cloudnativelondon/success'" type="button">
         Request invoice</button>

## 3. Credit / debit card

{% if jekyll.environment == "production" %}
{% include stripe.html %}
{% else %}
{% include stripe-test.html %}
{% endif %}
